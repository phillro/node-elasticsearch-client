assert = require('assert');
ElasticSearchClient = require('../../lib/elasticsearchclient/elasticSearchClient.js');
var conf = require('../etc/conf').test
var serverOptions = conf.es_server_options

var indexName = 'your_index_name';
var objTypeName = 'status'
var riverName = 'ma_twitter_river'
//Number of tweets to collect before indexing
var bulkSize = 50
var riverData = {
    //This is the river type not the object type
    "type":"twitter",
    "twitter":conf.twitter,
    "index":{
        "index":indexName,
        "type":objTypeName,
        "bulk_size":bulkSize
    }
}

var elasticSearchClient = new ElasticSearchClient(serverOptions);
var testDeleteTwitterRiver = function () {
    console.log('Test deleteTwitterRiver')
    elasticSearchClient.deleteTwitterRiver(riverName)
        .on('data', function (data) {
            console.log(data)
            assert.ok(JSON.parse(data).ok)
        })
        .on('error',
        function (error) {
            console.log(error)
            assert.ok(false)
        }).exec()
}

var testCreatewitterRiver = function () {
    console.log('Test createOrModifyTwitterRiver')
    elasticSearchClient.createOrModifyTwitterRiver(riverName, riverData)
        .on('data', function (data) {
            console.log(data)
            assert.ok(JSON.parse(data).ok)
        })
        .on('error',
        function (error) {
            console.log(error)
            assert.ok(false)
        }).exec()
}


testDeleteTwitterRiver()
testCreatewitterRiver()




