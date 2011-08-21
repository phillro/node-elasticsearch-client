assert = require('assert');
ElasticSearchClient = require('../../lib/elasticsearchclient/elasticSearchClient.js');
var hashlib = require('hashlib')
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
var objName = 'your_object_name'

var elasticSearchClient = new ElasticSearchClient(serverOptions);


var tweet = {"tweet" : {
    "properties" : {
        "message" : {"type" : "string", "store" : "yes"}
    }
}
}


testAliases = function() {
    var aliases = {
        "actions":
                [
                    { "add" : { "index" : "test1", "alias" : "alias1" } }
                ]
    }
    elasticSearchClient.createIndex(indexName, aliases)
            .on('data', function(data) {
                assert.ok(JSON.parse(data).ok, "testAliases failed")
            })
            .exec()

}

testAnalyze = function() {
    elasticSearchClient.analyze(indexName,'this is a test')
            .on('data', function(data) {
                console.log(data)
                //assert.ok(JSON.parse(data).ok, "testAnalyze failed")
            })
            .exec()
}

testCreateIndex = function() {
    elasticSearchClient.createIndex(indexName)
            .on('data', function(data) {
            console.log(data);
                //assert.ok(JSON.parse(data))
            })
            .exec()
}

testDeleteIndex = function() {
    elasticSearchClient.deleteIndex(indexName)
            .on('data', function(data) {
                assert.ok(JSON.parse(data))
            })
            .exec()
}

testOpenIndex = function() {
    elasticSearchClient.openIndex(indexName)
            .on('data', function(data) {
                assert.ok(JSON.parse(data).ok, 'testOpenIndex failed')
            })
            .exec()

}

testCloseIndex = function() {
    elasticSearchClient.openIndex(indexName)
            .on('data', function(data) {
                assert.ok(JSON.parse(data).ok, 'testCloseIndex failed')
            })
            .exec()

}

testGetSettings = function() {
    elasticSearchClient.getSettings(indexName)
            .on('data', function(data) {
                console.log(data);
                assert.ok(JSON.parse(data))
            })
            .exec()
}

testUpdateSettings = function() {
    var settings = {
        "index" : {
            "number_of_replicas" : 4
        }
    }
    elasticSearchClient.updateSettings(indexName, settings)
            .on('data', function(data) {
                //assert.ok(JSON.parse(data), 'testSnapshot failed')
                assert.ok(JSON.parse(data).ok, 'testUpdateSettings failed')

            })
            .exec()
}

testGetMapping = function() {
    elasticSearchClient.getMapping(indexName, objName)
            .on('data', function(data) {
            console.log(data);
                assert.ok(JSON.parse(data), 'testGetMapping failed')
            })
            .exec()
}

testPutMapping = function() {
    elasticSearchClient.putMapping(indexName, objName, tweet)
            .on('data',
            function(data) {
                assert.ok(JSON.parse(data), 'testPutMapping failed')
            }).on('done', function(data) {
            })
            .exec()
}

testDeleteMapping = function() {
    elasticSearchClient.deleteMapping(indexName, objName)
            .on('data', function(data) {
                assert.ok(JSON.parse(data), 'testDeleteMapping failed')
            })
            .exec()

}

testRefresh = function() {
    elasticSearchClient.refresh(indexName)
            .on('data', function(data) {
                console.log(data)
                assert.ok(JSON.parse(data), 'testRefresh failed')
            })
            .exec()
}

testOptimize = function() {

    elasticSearchClient.optimize(indexName)
            .on('data', function(data) {
                console.log(data)
                assert.ok(JSON.parse(data), 'testOptimize failed')
            })
            .exec()
}

testFlush = function() {
    elasticSearchClient.flush(indexName)
            .on('data', function(data) {
                console.log(data)
                assert.ok(JSON.parse(data), 'testFlush failed')
            })
            .exec()
}

testSnapShot = function() {

    elasticSearchClient.snapshot(indexName)
            .on('data', function(data) {
                //assert.ok(JSON.parse(data), 'testSnapshot failed')
                console.log(data)
            })
            .exec()
}


testDefineTemplate = function() {
    var template = {
        "template" : "te*",
        "settings" : {
            "number_of_shards" : 1
        }
    }
    elasticSearchClient.defineTemplate('testTemplate', template)
            .on('data', function(data) {
                //assert.ok(JSON.parse(data), 'testDefineTemplate failed')
                console.log(data)
            })
            .exec()
}

testGetTemplate = function() {
    elasticSearchClient.getTemplate('testTemplate', template)
            .on('data', function(data) {
                //assert.ok(JSON.parse(data), 'testGetTemplate failed')
                console.log(data)
            })
            .exec()
}

testDeleteTemplate = function() {
    elasticSearchClient.deleteTemplate('testTemplate', template)
            .on('data', function(data) {
                //assert.ok(JSON.parse(data), 'testDeleteTemplate failed')
                console.log(data)
            })
            .exec()
}

testStatus = function() {
    elasticSearchClient.status(indexName)
            .on('data', function(data) {
                //console.log(data)
                assert.ok(JSON.parse(data), 'testStatus failed')
            })
            .exec()
}

testClearCache = function() {
    elasticSearchClient.clearCache(indexName)
            .on('data', function(data) {
                assert.ok(JSON.parse(data), 'testClearCache failed')
            })
            .exec()
}

testGetMapping();

testCreateIndex()
testPutMapping();
testDeleteMapping();
testRefresh();
testOptimize();
testFlush();
testSnapShot();
testUpdateSettings();
testStatus();
testClearCache();
testCloseIndex();
testOpenIndex()
testAnalyze();
testDeleteIndex();



