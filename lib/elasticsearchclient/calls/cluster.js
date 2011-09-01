var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.health = function(options) {
    var path = '/_cluster/health'
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.state = function(options) {
    var path = '/_cluster/state'
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}


ElasticSearchClient.prototype.nodesInfo = function(nodes, options){
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
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.nodesStats = function(nodes, options) {
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
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.nodesShutdown = function(nodes, options) {
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
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'POST'}, this.clientOptions);
}
