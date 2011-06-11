//Core
var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient')

ElasticSearchClient.prototype.index = function(indexName, typeName, document, options) {
    var path = '/' + indexName + '/' + typeName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }

    var method = 'POST'
    //If the document has an id field, its an update.
    if (document.id) {
        path += "/" + document.id
        method = 'PUT'
        delete document.id
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(document),path:path,method: method}, this.clientOptions);
}


ElasticSearchClient.prototype.deleteDocument = function(indexName, typeName, documentId, options) {
    var path = '/' + indexName + '/' + typeName + '/' + documentId;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }

    if (qs.length > 0) {
        path += "?" + qs;
    }

    return this.createCall({path:path, method:'DELETE'}, this.clientOptions);
}

ElasticSearchClient.prototype.get = function(indexName, typeName, documentId, options) {
    var path = '/' + indexName + '/' + typeName + '/' + documentId;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }

    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions);
}


ElasticSearchClient.prototype.search = function(indexName, typeName, queryObj, options) {
    var path = '/' + indexName + '/' + typeName + '/_search';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path,method: 'POST',data:JSON.stringify(queryObj)}, this.clientOptions);
}

ElasticSearchClient.prototype.percolator = function(indexName, typeName, queryObj, options) {
    var path = '/_percolator/' + indexName + '/' + typeName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'PUT',data: JSON.stringify(queryObj)}, this.clientOptions);
}

ElasticSearchClient.prototype.percolate = function(indexName, typeName, doc, options) {
    var path = '/' + indexName + '/' + typeName+'/_percolate'
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET',data: JSON.stringify(doc)}, this.clientOptions);
}

//Elastic search takes the query as the body of a get for complex queries. How node httpclient isn't a fan of that it seems
ElasticSearchClient.prototype.count = function(indexName, typeName, queryStr, options) {
    var path = '/' + indexName + '/' + typeName + '/_count';
    var qs = '?q='+queryStr;
    if (options) {
        qs +='&'+ querystring.stringify(options)
    }

    console.log(path+qs);
    return this.createCall({path: path+qs, method: 'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.deleteByQuery = function(indexName, typeName, queryObj, options) {
    var path = '/' + indexName + '/' + typeName + '/_query';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'DELETE',data: JSON.stringify(queryObj)}, this.clientOptions);
}

ElasticSearchClient.prototype.moreLikeThis = function(indexName, typeName, documentId, options) {
    var path = '/' + indexName + '/' + typeName + '/'+documentId+'/';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}