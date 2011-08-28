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
    //If options.hosts round robin the hosts
    if (options.hosts) {
        var nextHost = options.hosts.shift()
        options.hosts.push(nextHost)
    }
    return new ElasticSearchCall(params, nextHost)
}