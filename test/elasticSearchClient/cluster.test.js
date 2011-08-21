assert = require('assert');
ElasticSearchClient = require('../../lib/elasticsearchclient/elasticSearchClient.js');
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



testHealth = function() {
    elasticSearchClient.health()
            .on('data', function(data) {
                console.log(data);
                //assert.ok(JSON.parse(data).ok, "testHealth failed")
            })
            .exec()
}

testState = function() {
    elasticSearchClient.state({filter_nodes:true})
            .on('data', function(data) {
                assert.ok(JSON.parse(data).ok, "testState failed")
            })
            .exec()
}


testNodesInfo = function() {
    elasticSearchClient.nodesInfo([])
            .on('data', function( data) {
                assert.ok(JSON.parse(data).ok, "testNodesInfo failed")
            })
            .exec()
}

testNodeStats = function() {
elasticSearchClient.nodesStats([])
            .on('data', function( data) {
                assert.ok(JSON.parse(data), "testNodeStats failed")
            })
            .exec()
}

testNodesShutdown = function() {

    elasticSearchClient.nodesShutdown([])
            .on('data', function( data) {
                assert.ok(JSON.parse(data).ok, "testNodesShutdown failed")
            })
            .exec()
}

testHealth()
testState();
testNodesInfo();
testNodeStats();