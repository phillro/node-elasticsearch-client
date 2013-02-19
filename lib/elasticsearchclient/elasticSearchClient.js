var querystring = require('querystring'),
    events = require('events'),
    http = require('http');
https = require('https');

module.exports = ElasticSearchClient;
Core = require('./calls/core')
Cluster = require('./calls/cluster')
Indices = require('./calls/indices')
Twitter = require('./calls/twitter')
ElasticSearchCall = require('./calls/elasticSearchCall.js');

function ElasticSearchClient(options) {
    this.clientOptions = options || {}
}

ElasticSearchClient.prototype.createCall = function(params, options, cb) {
    //If options.hosts round robin the hosts
    if (options.hosts) {
        var nextHost = options.hosts.shift();
        options.hosts.push(nextHost);
    }else{
        nextHost=options;
    }
    if(typeof cb=='function'){
        var call = new ElasticSearchCall(params, nextHost, cb);
        call.exec();
    }else{
        return new ElasticSearchCall(params, nextHost);
    }

}

var inetRE = /inet\[\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,5})\]/

/**
 * Discover nodes of the elasticsearch cluster.
 * Call this function to automatically add all nodes of the 
 * cluster in the hosts list.
 */
ElasticSearchClient.prototype.discoverNodes = function(){
    var self = this;
    var query = this.nodesInfo();
    var hosts = [];
    query.on('data', function(data){
	var obj = JSON.parse(data);
	var nodes = obj.nodes;
	for(n in nodes){
	    node = nodes[n];
	    if(!"http_address" in node){
		continue;
	    }
	    
	    address = inetRE.exec(node.http_address);
	    if(!address){
		continue;
	    }

	    hosts.push({ host : address[1], port : address[2] });
	}

	if(hosts.length > 0){
	    self.clientOptions.hosts = hosts;
	}
    });
    query.exec();
}