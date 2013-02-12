var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.health = function(options, callback) {
    var path = '/_cluster/health'
    var qs = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.state = function(options, callback) {
    var path = '/_cluster/state'
    var qs = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.nodesInfo = function(nodes, options, callback){
    var path = '/_cluster/nodes'
    if(nodes instanceof Array){
	for(n in nodes){
            if(n==0)
		path+='/'+nodes[n]
            else
		path+=','+nodes[n]
	}
    }
    var qs = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.nodesStats = function(nodes, options, callback) {
    var path = '/_cluster/nodes'
    if(nodes instanceof Array){
	for(n in nodes){
            if(n==0)
		path+='/'+nodes[n]
            else
		path+=','+nodes[n]
	}
    }
    
    path+='/stats'
    var qs = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.nodesShutdown = function(nodes, options, callback) {
    var path = '/_cluster/nodes'
    if(nodes instanceof Array){
	for(n in nodes){
            if(n==0)
		path+='/'+nodes[n]
            else
		path+=','+nodes[n]
	}
    }
    path+='/_shutdown'
    var qs = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'POST'}, this.clientOptions, callback);
}
