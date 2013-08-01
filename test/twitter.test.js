var assert = require('assert')
,   ElasticSearchClient = require('..')
,   should = require("chai").should()
,   elasticSearchClient, conf, serverOptions, riverData;

var indexName = 'your_index_name';
var objTypeName = 'status'
var riverName = 'ma_twitter_river'
//Number of tweets to collect before indexing
var bulkSize = 50

try{   
    conf = require('./conf').test;
    
    serverOptions = conf.es_server_options;

    elasticSearchClient = new ElasticSearchClient(serverOptions);

    riverData = {
        //This is the river type not the object type
        "type":"twitter",
        "twitter":conf.twitter,
        "index":{
            "index":indexName,
            "type":objTypeName,
            "bulk_size":bulkSize
        }
    };
}catch(e){
    console.log(e);
    console.log(" \n\
                *****************************************************************\n   \
                *   It seems you haven't provided ./test/conf.json              *\n   \
                *   Make sure to put the file in place, we have made a          *\n   \
                *   template available for you at ./test/conf.json.template     *\n   \
                *****************************************************************\n   \
    ");
}

describe('twitter api', function(){
    describe('#createOrModifyTwitterRiver', function(){
        it('should create/modify the twitter river', function(done){

            if(!conf || !elasticSearchClient) return done();

            elasticSearchClient.createOrModifyTwitterRiver(riverName, riverData)
                .on('data', function (data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    done();
                })
                .on('error', function (error) {

                }).exec()
        });
    });

    describe('#deleteTwitterRiver', function(){
        it('should delete the twitter river with given name', function(done){

            if(!conf || !elasticSearchClient) return done();

            elasticSearchClient.deleteTwitterRiver(riverName)
                .on('data', function (data) {
                    data = JSON.parse(data);
                    data.ok.should.be.ok;
                    done();
                })
                .on('error', function (error) {

                }).exec();
        });
    });
});
