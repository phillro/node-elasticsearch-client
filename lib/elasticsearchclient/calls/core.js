//Core
var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient')

ElasticSearchClient.prototype.index = function(indexName, typeName, document, id, options, callback) {
    var path = '/' + indexName + '/' + typeName;
    var qs = '';
    var method = 'POST'

    if (typeof id === 'function') {
        callback = id;
    }
    if (options === 'function') {
        callback = options;
    };

    if(typeof id === 'object'){
        options = id;
        id = undefined;
    }

    if (id) {
        path += "/" + id
        method = 'PUT'
    }

    if (options) {
        qs = querystring.stringify(options)
    }

    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(document),path:path,method: method}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.deleteDocument = function(indexName, typeName, documentId, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/' + documentId;
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

    return this.createCall({path:path, method:'DELETE'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.get = function(indexName, typeName, documentId, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/' + documentId;
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
    return this.createCall({path:path, method:'GET'}, this.clientOptions, callback);
}


//                                              indexName, typeName, queryObj, options
// TODO: Not a very robust piece of code - need to be refactored to be more tolerant to input
//                                                indexName, queryObject, options
ElasticSearchClient.prototype.search = function(indexName, typeName, queryObj, options, callback) {
    var objArgs=[]
    var path=''

    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
	
	// Assumes quite a lot about the input
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

	// Is options sent as an object or a string
	// Assumes that objArgs[0] is the queryObj
	if (options !== undefined){
		switch(typeof options){
			case 'object':
				objArgs.push(options);
				path += "?" + querystring.stringify(objArgs[1]);
				break;
			case 'string':
				path += "?" + options;
				break;
		}
	}
	
    var data = objArgs[0] || {};
    return this.createCall({path:path,method: 'POST',data:JSON.stringify(data)}, this.clientOptions, callback);
}


//                                                queryObject, options
//                                                indexName, queryObject, options
ElasticSearchClient.prototype.multiget = function(indexName, typeName, documentArray, options, callback) {
    var objArgs = [];
    var path = '';
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    for (var i=0; i<arguments.length; i++) {
        switch (typeof arguments[i]) {
            case 'object':
                objArgs.push(arguments[i]);
            break;
            case 'string':
                path += '/'+arguments[i];
            break;
        }
    }

    path += '/_mget';
    if (objArgs[1]) {
       path += "?" + querystring.stringify(objArgs[1]);
    }

    var data = {docs: []};

    for (var i=0; i<objArgs[0].length; i++) {
        data.docs.push(objArgs[0][i]);
    }
    return this.createCall({path: path, method: 'GET', data: JSON.stringify(data)}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.multisearch = function(commandArray, options, callback) {
    var path = '/_msearch';
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

    var commandBuffer=''
    for(var i =0; i<commandArray.length;i++){
        commandBuffer+=JSON.stringify(commandArray[i])+'\n'
    }
    return this.createCall({path: path, method: 'POST',data:commandBuffer}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.percolator = function(indexName, typeName, queryObj, options, callback) {
    var path = '/_percolator/' + indexName + '/' + typeName;
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
    return this.createCall({path: path, method: 'PUT',data: JSON.stringify(queryObj)}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.percolate = function(indexName, typeName, doc, options, callback) {
    var path = '/' + indexName + '/' + typeName+'/_percolate'
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
    return this.createCall({path: path, method: 'GET',data: JSON.stringify(doc)}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.count = function(indexName, typeName, query, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/_count';
    
    switch(typeof query){
    case 'string':	
	var qs = '?q=' + querystring.stringify(query);
	if (options) {
            qs +='&'+ querystring.stringify(options)
	}	
	return this.createCall({path: path+qs, method: 'GET'}, this.clientOptions, callback);
    case 'object':
	return this.createCall({path : path, method : 'POST', data : JSON.stringify(query)}, this.clientOptions, callback);
    }

    throw "unsupported query type: " + typeof(query); 
} 


ElasticSearchClient.prototype.bulk = function(commandArray, options, callback) {
    var path = '/_bulk'
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
    var commandBuffer=''


    for(var i =0; i<commandArray.length;i++){
        commandBuffer+=JSON.stringify(commandArray[i])+'\n'
    }
    return this.createCall({path: path, method: 'POST',data:commandBuffer}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.deleteByQuery = function(indexName, typeName, queryObj, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/_query';
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
    return this.createCall({path: path, method: 'DELETE',data: JSON.stringify(queryObj)}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.moreLikeThis = function(indexName, typeName, documentId, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/'+documentId+'/_mlt';
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

ElasticSearchClient.prototype.update = function(indexName, typeName, documentId, document, options, callback) {
    document = document || {};
    document = {"doc": document};

    var path = '/' + indexName + '/' + typeName + '/'+documentId+'/_update';
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
    return this.createCall({data: JSON.stringify(document), path: path, method: 'POST'}, this.clientOptions);
}


