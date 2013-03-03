var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.health = function(options, cb) {
    //Pull the callback and set it falso to not clobber id.
    if(arguments.length > 0 && typeof arguments[arguments.length-1]=='function'){
        cb=arguments[arguments.length-1];
        arguments[arguments.length-1]=false;
    }

    var path = '/_cluster/health'
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.state = function(options, cb) {
    //Pull the callback and set it falso to not clobber id.
    if(arguments.length > 0 && typeof arguments[arguments.length-1]=='function'){
        cb=arguments[arguments.length-1];
        arguments[arguments.length-1]=false;
    }

    var path = '/_cluster/state'
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, cb);
}


ElasticSearchClient.prototype.nodesInfo = function(nodes, options, cb) {
    //Pull the callback and set it falso to not clobber id.
    if(arguments.length > 0 && typeof arguments[arguments.length-1]=='function'){
        cb=arguments[arguments.length-1];
        arguments[arguments.length-1]=false;
    }

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
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.nodesStats = function(nodes, options, cb) {
    //Pull the callback and set it falso to not clobber id.
    if(arguments.length > 0 && typeof arguments[arguments.length-1]=='function'){
        cb=arguments[arguments.length-1];
        arguments[arguments.length-1]=false;
    }

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
    return this.createCall({path: path, method: 'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.nodesShutdown = function(nodes,options, cb) {
    //Pull the callback and set it falso to not clobber id.
    if(arguments.length > 0 && typeof arguments[arguments.length-1]=='function'){
        cb=arguments[arguments.length-1];
        arguments[arguments.length-1]=false;
    }

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
    return this.createCall({path: path, method: 'POST'}, this.clientOptions, cb);
}
