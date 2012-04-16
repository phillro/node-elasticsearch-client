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

//                                                indexName, queryObject, options
ElasticSearchClient.prototype.search = function(indexName, typeName, queryObj, options) {
    var objArgs=[]
    var path=''
    for(var i=0;i<arguments.length;i++){
        switch(typeof arguments[i]){
            case 'object':
                objArgs.push(arguments[i]);
            break;
            case 'string':
                path+='/'+arguments[i]
            break;
        }
    }
    path+='/_search';
    if(objArgs[1]){
       path += "?" + querystring.stringify(objArgs[1])
    }
    var data = objArgs[0] || {};
    return this.createCall({path:path,method: 'POST',data:JSON.stringify(data)}, this.clientOptions);
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

ElasticSearchClient.prototype.count = function(indexName, typeName, query, options) {
    var path = '/' + indexName + '/' + typeName + '/_count';
    
    switch(typeof query){
    case 'string':	
	var qs = '?q=' + querystring.stringify(query);
	if (options) {
            qs +='&'+ querystring.stringify(options)
	}	
	return this.createCall({path: path+qs, method: 'GET'}, this.clientOptions);
    case 'object':
	return this.createCall({path : path, method : 'POST', data : JSON.stringify(query)}, this.clientOptions);
    }

    throw "unsupported query type: " + typeof(query); 
} 


ElasticSearchClient.prototype.bulk = function(commandArray, options) {
    var path = '/_bulk'
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    var commandBuffer=''


    for(var i =0; i<commandArray.length;i++){
        commandBuffer+=JSON.stringify(commandArray[i])+'\n'
    }
    return this.createCall({path: path, method: 'POST',data:commandBuffer}, this.clientOptions);
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
    var path = '/' + indexName + '/' + typeName + '/'+documentId+'/_mlt';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path: path, method: 'GET'}, this.clientOptions);
}