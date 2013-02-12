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




var elasticSearchClient = new ElasticSearchClient(serverOptions);

describe("ElasticSearchClient Cluster apis", function(){
    describe("#health", function(){
        it("should provide health stats", function(done){
            elasticSearchClient.health(function(err, data) {
                    should.equal(err, null);
                    data.status.should.be.ok;
                    done();
                });
        });
    });


    describe("#state", function(){
        it("should test state", function(done){
            elasticSearchClient.state({filter_nodes:true}, function(err, data) {
                    should.equal(err, null);
                    data.routing_nodes.should.be.ok;
                    done();
                });
        });
    });

    describe("#nodesInfo", function(){
        it("should provide nodes' info", function(done){
            elasticSearchClient.nodesInfo([], function(err, data) {
                    should.equal(err, null);
                    data.ok.should.be.ok;
                    done();
                });
        });
    });

    describe("#nodesStats", function(){
        it("should provide node statistics", function(done){
            elasticSearchClient.nodesStats([], function(err, data) {
                should.equal(err, null);
                data.nodes.should.be.ok;
                done();
            });
        });
    });

    describe("#nodeShutdown", function(){
        /*
        *  Temporarily disabled so that other tests have chance to succeed before
        *   the node shuts down
        */

        it.skip("should shut down the node", function(done){
            elasticSearchClient.nodesShutdown([], function( data) {
                    should.equal(err, null);
                    data.ok.should.be.ok;
                    done();
                });
        });
    });

});
