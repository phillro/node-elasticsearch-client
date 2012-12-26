var ElasticSearchClient = require('../../lib/elasticsearchclient/elasticSearchClient.js')
,   mocha = require("mocha")
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
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });



    describe("#analyze", function(){
        it("should analyze", function(done){
            elasticSearchClient.analyze(indexName,'this is a ')
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#createIndex", function(){
        it("should create an index", function(done){
            elasticSearchClient.createIndex(indexName)
                .on('data', function(data) {
                    console.log(data);
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#deleteIndex", function(){
        it("should delete index", function(done){
            elasticSearchClient.deleteIndex(indexName)
                .on('data', function(data) {
                     JSON.parse(data).should.be.ok;
                     done()
                })
                .exec();
        });
    });


    describe("#openIndex", function(){
        it("should open the given index", function(done){
            elasticSearchClient.openIndex(indexName)
                .on('data', function(data) {
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#closeIndex", function(){
        it("should close the given index", function(done){
            elasticSearchClient.openIndex(indexName)
                .on('data', function(data) {
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#getSettings", function(){
    	it("should get settings", function(done){
            elasticSearchClient.getSettings(indexName)
                .on('data', function(data) {
                    console.log(data);
                    JSON.parse(data).should.be.ok;
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
                    JSON.parse(data).should.be.ok;
                    done();

                })
                .exec();
        });
    });


    describe("#getMapping", function(){
    	it("should get mappings", function(done){
            elasticSearchClient.getMapping(indexName, objName)
                .on('data', function(data) {
                    console.log(data);
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#putMapping", function(){
    	it("should put mappings", function(done){
            elasticSearchClient.putMapping(indexName, objName, tweet)
                .on('data', function(data) {
                    JSON.parse(data).should.be.ok;
                    done();
                }).on('done', function(data) {

                })
                .exec();
        });
    });


    describe("deleteMapping#", function(){
    	it("should delete mappings", function(done){
            elasticSearchClient.deleteMapping(indexName, objName)
                .on('data', function(data) {
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#refresh", function(){
    	it("should refresh", function(done){
            elasticSearchClient.refresh(indexName)
                    .on('data', function(data) {
                        JSON.parse(data).should.be.ok;
                        done();
                    })
                    .exec();
        });
    });


    describe("#optimize", function(){
    	it("should optimize", function(done){
            elasticSearchClient.optimize(indexName)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#flush", function(){
    	it("should flush", function(done){
            elasticSearchClient.flush(indexName)
                .on('data', function(data) {
                    console.log(data);
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#snapShot", function(){
    	it("should take a snapshot", function(done){
            elasticSearchClient.snapshot(indexName)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });

    describe("#defineTemplate", function(){
    	it("should define a template", function(done){
            elasticSearchClient.defineTemplate('Template', template)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#getTemplate", function(){
        	it("should get a template", function(done){
            elasticSearchClient.getTemplate('Template', template)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#deleteTemplate", function(){
    	it("should delete a template", function(done){
            elasticSearchClient.deleteTemplate('Template', template)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#status", function(){
    	it("should provide status", function(done){
            elasticSearchClient.status(indexName)
                .on('data', function(data) {
                    console.log(data)
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });


    describe("#clearCache", function(){
    	it("should clear the cache", function(done){
            elasticSearchClient.clearCache(indexName)
                .on('data', function(data) {
                    JSON.parse(data).should.be.ok;
                    done();
                })
                .exec();
        });
    });
});
