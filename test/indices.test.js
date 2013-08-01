var ElasticSearchClient = require('..')
,   should = require("chai").should();

var serverOptions = {
    host: 'localhost',
    port: 9200,
    //secure: true,
    /*auth: {
     username:'username',
     password:'password'
     }*/
};


var indexName = 'your_index_name';
var objName = 'your_object_name';
var testIndex = "your_test_index_name"

var elasticSearchClient = new ElasticSearchClient(serverOptions);


var tweet = {"tweet" : {
        "properties" : {
            "message" : {"type" : "string", "store" : "yes"}
        }
    }
};

var template = {
                "template" : "te*",
                "settings" : {
                    "number_of_shards" : 1
                }
            };


describe("ElasticSearchClient indices api", function(){

    before(function(done){
        elasticSearchClient.index(indexName, objName, {"id": "sushi", name: "sushi"})
            .on('data', function(data) {
                done();
            })
            .exec();
    });

    describe("#createIndex", function(){
        it("should create an index", function(done){
            elasticSearchClient.createIndex(testIndex)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    if(data.error){
                        data.error.should.contain("IndexAlreadyExistsException");
                        data.status.should.equal(400);
                    }else{
                        data.ok.should.be.ok;
                        data.acknowledged.should.be.ok;
                    }
                    done();
                })
                .exec();
        });
    });

    describe("#deleteIndex @slow", function(){
        it("should delete index", function(done){
            elasticSearchClient.deleteIndex(testIndex)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;

                    if(data.error){
                        data.error.should.contain("IndexMissingException");
                        data.status.should.equal(404)
                    }else{
                        data.ok.should.be.ok;
                        data.acknowledged.should.be.ok;
                    }

                    done()
                })
                .exec();
        });
    });

    describe("Aliases", function(){
        it("should alias", function(done){
            var aliases = {
                "actions":
                        [
                            { "add" : { "index" : "1", "alias" : "alias1" } }
                        ]
            }
            elasticSearchClient.createIndex(indexName, aliases)
                .on('data', function(data) {
                    // console.log(data);
                    data = JSON.parse(data);
                    data.should.be.ok;
                    data.should.not.have.error;
                    done();
                })
                .exec();
        });

        it("should get global aliases", function(done){
            elasticSearchClient.getAliases()
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    data.should.not.have.error;
                    done();
                })
                .exec();
        });

        it("should get index aliases", function(done){
            elasticSearchClient.getAliases(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    data.should.not.have.error;
                    data[indexName].aliases.should.be.ok;
                    done();
                })
                .exec();
        });

    });


    describe("#analyze", function(){
        it("should analyze", function(done){
            elasticSearchClient.analyze(indexName,'this is a ')
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });

    describe("#openIndex", function(){
        it("should open the given index", function(done){
            elasticSearchClient.openIndex(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    data.acknowledged.should.be.ok;
                    done();
                })
                .exec();
        });
    });

    describe("#getSettings", function(){
    	it("should get settings", function(done){
            elasticSearchClient.getSettings(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    data[indexName].settings.should.be.ok.not.be.empty;
                    done();
                })
                .exec();
        });
    });

    
    describe("#putMapping", function(){
        var check = function(err, data, done) {
            data = JSON.parse(data);
            data.ok.should.be.ok;
            data.acknowledged.should.be.true;
            done(err);
        };
        var checkError = function(err, data, done) {
            data = JSON.parse(data);
            data.error.should.be.a('string');
            data.status.should.eql(500);
            done(err);
        };
        it("should put mappings one object one index", function(done){
            elasticSearchClient.putMapping(indexName, objName, tweet)
                .on('data', function(data) {
                    check(null, data, done);
                })
                .exec();
        });
        it("should put mappings one object one index canonical style no options", function(done){
            elasticSearchClient.putMapping(indexName, objName, tweet, function(err, data) {
                check(err, data, done);
            });
        });
        it("should put mappings one object one index canonical style with options", function(done){
            elasticSearchClient.putMapping(indexName, objName, tweet, {}, function(err, data) {
                check(err, data, done);
            });
        });
        it("should fail to put a mapping if the typeName is unspecified", function(done){
            elasticSearchClient.putMapping(indexName, null, { does_nothing: 'no matter'})
                .on('data', function(data) {
                    checkError(null, data, done);
                })
                .exec();
        });
        it("should fail to put a mapping if the typeName is unspecified canonical style", function(done){
            elasticSearchClient.putMapping(indexName, null, { does_nothing: 'no matter'}, function(err, data) {
                checkError(null, data, done);
            });
        });
        it("should fail to put a mapping if the typeName is unspecified canonical style with options", function(done){
            elasticSearchClient.putMapping(indexName, null, { does_nothing: 'no matter'}, { pretty: true }, function(err, data) {
                checkError(null, data, done);
            });
        });
    });
    

    describe("#getMapping", function(){
        var check = function(data, propertyToCheck, done) {
            data = JSON.parse(data);
            data.should.be.ok;
            data[propertyToCheck].should.exist;
            done(null, data);
        };
        it("should get mappings for one object in one index", function(done){
            elasticSearchClient.getMapping(indexName, objName)
                .on('data', function(data) {
                    check(data, objName, done);
                })
                .exec();
        });
        it("should get mappings for all objects in one index", function(done){
            elasticSearchClient.getMapping(indexName, null)
                .on('data', function(data) {
                    check(data, indexName, done);
                })
                .exec();
        });
        it("should get mappings for all indexes", function(done){
            elasticSearchClient.getMapping()
                .on('data', function(data) {
                    check(data, indexName, done);
                })
                .exec();
        });
        it("should get mappings for one object in one index canonical no options", function(done){
            elasticSearchClient.getMapping(indexName, objName, function(err, data) {
                    check(data, objName, done);
                });
        });
        it("should get mappings for one object in one index canonical with options", function(done){
            elasticSearchClient.getMapping(indexName, objName, {}, function(err, data) {
                    check(data, objName, done);
                });
        });
    });


    describe("#refresh", function(){
    	it("should refresh", function(done){
            elasticSearchClient.refresh(indexName)
                    .on('data', function(data) {
                        data = JSON.parse(data);
                        data.should.be.ok;
                        done();
                    })
                    .exec();
        });
    });


    describe("#optimize @slow", function(){
    	it("should optimize", function(done){
            elasticSearchClient.optimize(indexName)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#flush", function(){
    	it("should flush", function(done){
            elasticSearchClient.flush(indexName)
                .on('data', function(data) {
                    // console.log(data);
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#snapShot", function(){
    	it("should take a snapshot", function(done){
            elasticSearchClient.snapshot(indexName)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });

    describe("#defineTemplate", function(){
    	it("should define a template", function(done){
            elasticSearchClient.defineTemplate('Template', template)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#getTemplate", function(){
        	it("should get a template", function(done){
            elasticSearchClient.getTemplate('Template', template)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#deleteTemplate", function(){
    	it("should delete a template", function(done){
            elasticSearchClient.deleteTemplate('Template', template)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#status", function(){
    	it("should provide status", function(done){
            elasticSearchClient.status(indexName)
                .on('data', function(data) {
                    // console.log(data)
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#stats", function(){
        it("should provide stats", function(done){
            elasticSearchClient.stats(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#clearCache", function(){
    	it("should clear the cache", function(done){
            elasticSearchClient.clearCache(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    done();
                })
                .exec();
        });
    });

    describe("deleteMapping#", function(){
        it("should delete mappings", function(done){
            elasticSearchClient.deleteMapping(indexName, objName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#updateSettings", function(){
        it("should update settings", function(done){
            var settings = {
                "index" : {
                    "number_of_replicas" : 4
                }
            }
            elasticSearchClient.updateSettings(indexName, settings)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    done();

                })
                .exec();
        });
    });


    describe("#getSegments", function(){
        it("should get segments", function(done){
            elasticSearchClient.getSegments(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.should.be.ok;
                    data.indices[indexName].shards.should.be.ok.not.be.empty;
                    done();
                })
                .exec();
        });
    });


    describe("#closeIndex", function(){
        it("should close the given index", function(done){
            elasticSearchClient.closeIndex(indexName)
                .on('data', function(data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    data.acknowledged.should.be.ok;
                    done();
                })
                .exec();
        });
    });


    after(function(done){
        elasticSearchClient.deleteIndex(indexName)
            .on('data', function(data) {
                done();
            })
            .exec();
    });
});
