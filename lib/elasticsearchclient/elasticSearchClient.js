var querystring = require('querystring'),
        events = require('events'),
        http = require('http');
https = require('https');

module.exports = ElasticSearchClient;
Core = require('./calls/core')
Cluster = require('./calls/cluster')
Indices = require('./calls/indices')
ElasticSearchCall = require('./calls/elasticSearchCall.js');

function ElasticSearchClient(options) {
    this.clientOptions = options || {}
}



ElasticSearchClient.prototype.createCall = function(params, options) {
    return new ElasticSearchCall(params, options)
}