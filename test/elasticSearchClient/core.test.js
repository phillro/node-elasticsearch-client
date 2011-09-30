assert = require('assert');
ElasticSearchClient = require('../../lib/elasticsearchclient/elasticSearchClient.js');
var hashlib = require('hashlib')
var serverOptions = {
    host: 'localhost',
    port: 9200
    //secure: true,
    /*auth: {
     username:'username',
     password:'password'
     }*/
};

var indexName = 'your_index_name';
var objName = 'your_object_name'

var elasticSearchClient = new ElasticSearchClient(serverOptions);


testIndex = function() {
    elasticSearchClient.index(indexName, objName, {'name':'name', id:"1111"})
        .on('data', function(data) {
            console.log(data)
            assert.ok(JSON.parse(data), 'textIndex failed. ');

        })
        .exec()
}


testDelete = function() {
    elasticSearchClient.deleteDocument(indexName, objName, 1111)
        .on('data',
        function(data) {
            console.log(data)
        }).exec();
}

testGet = function() {
    elasticSearchClient.get(indexName, objName, 1111)
        .on('data', function(data) {
            assert.ok(JSON.parse(data)._source, "testGet failed.")
        })
        .exec()
}

testSearch = function() {
    var qryObj = {
        "query" : {
            "term" : { "name" : "sushi" }
        }
    };
    elasticSearchClient.search(indexName, objName, qryObj)
        .on('data', function(data) {
            console.log(data)
            assert.ok(JSON.parse(data), "testSearch failed.")
        })
        .exec()
}

testPercolate = function() {
    var doc = {
        "doc" : {
            "field1" : "value1"
        }
    }

    elasticSearchClient.percolate(indexName, objName, doc)
        .on('data',
        function(data) {
            assert.ok(JSON.parse(data), "testPercolate failed.")
        })
        .exec()
}

testPercolator = function() {
    var qryObj = {
        query: {
            bool: {
                should: [
                    {flt : {
                        fields : ["name"],
                        like_text : 'a name'
                    }
                    }
                ]
            }
        }
    };
    elasticSearchClient.percolator(indexName, objName, qryObj)
        .on('data',
        function(data) {
            assert.ok(JSON.parse(data), "testPercolator failed.")
        })
        .exec()
}

testBulk = function() {
    assert.ok(false, 'testBulk not implemented yet.')
}

testCount = function() {
    var qryStr = 'name:name'
    elasticSearchClient.count(indexName, objName, qryStr)
        .on('data',
        function(data) {
            console.log(data);
            assert.ok(JSON.parse(data), "testCount failed.")
        })
        .exec()
}

testDeleteByQuery = function() {
    var qryObj = {
        term : {
            name: 'name'
        }
    }
    elasticSearchClient.deleteByQuery(indexName, objName, qryObj)
        .on('data', function(data) {
            assert.ok(JSON.parse(data), "testDeleteByQuery failed.")
        })
        .exec()
}

testMoreLikeThis = function() {
    
    elasticSearchClient.moreLikeThis(indexName, objName, '4d714f52dd6a90842168b3d1',{})
        .on('data', function(data) {
            console.log(data);
            assert.ok(JSON.parse(data), "testMoreLikeThis failed.")
        })
        .exec()
}

testIndex();
testGet();
testDelete();


testMoreLikeThis();
testDeleteByQuery()
testMoreLikeThis();
testCount()