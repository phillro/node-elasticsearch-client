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

ElasticSearchClient.prototype.nodesInfo = function(nodes, options) {
    var path = '/_cluster/nodes'
    for(i=0;i<nodes;i++){
        if(i==0)
            path+='/'+nodes[i]
        else
            path+=','+nodes[i]
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
    for(i=0;i<nodes;i++){
        if(i==0)
            path+='/'+nodes[i]
        else
            path+=','+nodes[i]
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
    for(i=0;i<nodes;i++){
        if(i==0)
            path+='/'+nodes[i]
        else
            path+=','+nodes[i]
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