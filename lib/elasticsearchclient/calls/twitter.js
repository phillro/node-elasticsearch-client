var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.deleteTwitterRiver = function(){
    return ElasticSearchClient.prototype.deleteRiver.apply(this,arguments);
}

ElasticSearchClient.prototype.createOrModifyTwitterRiver = function(riverName, riverData, options, cb) {
    return ElasticSearchClient.prototype.createOrModifyRiver.apply(this,arguments);
}