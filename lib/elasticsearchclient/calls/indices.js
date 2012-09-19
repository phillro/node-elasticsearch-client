var querystring = require('querystring'),
        ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.aliases = function(alias, options, callback) {
    var path = '/_aliases';
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
    return this.createCall({data:JSON.stringify(alias), path:path, method:'POST'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.analyze = function(indexName, textToAnalyze, options, callback) {
    var path = '/' + indexName + '/_analyze';
    var qs = '';if (typeof options === 'function') {
        callback = options;
        options = undefined;
    }
    var opts = options || {}
    opts.text = textToAnalyze
    qs = querystring.stringify(opts)
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.createIndex = function(indexName, settings, options, callback) {
    var path = '/' + indexName;
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
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.deleteIndex = function(indexName, options, callback) {
    var path = '/' + indexName;
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


ElasticSearchClient.prototype.openIndex = function(indexName, options, callback) {
    var path = '/' + indexName + '/_open';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.closeIndex = function(indexName, options, callback) {
    var path = '/' + indexName + '/_open';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.updateSettings = function(indexName, options, callback) {
    var path = '/' + indexName + '/_settings';
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
    return this.createCall({path:path, method:'PUT'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.getSettings = function(indexName, options, callback) {
    var path = '/' + indexName + '/_settings';
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

ElasticSearchClient.prototype.updateSettings = function(indexName, settings, options, callback) {
    var path = '/' + indexName + '/_settings';
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
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.getMapping = function(indexName, typeName, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
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
    return this.createCall({path:path, method:'get'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.putMapping = function(indexName, typeName, mapping, options, callback) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
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

    return this.createCall({data:JSON.stringify(mapping), path:path, method:'PUT'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.deleteMapping = function(indexName, typeName, options, callback) {
    var path = '/' + indexName + '/' + typeName;
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

ElasticSearchClient.prototype.refresh = function(indexName, options, callback) {
    var path = '/' + indexName + '/_refresh';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.optimize = function(indexName, options, callback) {
    var path = '/' + indexName + '/_optimize';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.flush = function(indexName, options, callback) {
    var path = '/' + indexName + '/_flush';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.snapshot = function(indexName, options, callback) {
    var path = '/' + indexName + '/_gateway/snapshot';
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
    return this.createCall({path:path, method:'POST'}, this.clientOptions, callback);
}


ElasticSearchClient.prototype.defineTemplate = function(templateName, template, options, callback) {
    var path = '/_template/' + templateName;
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
    return this.createCall({data:JSON.stringify(template), path:path, method:'PUT'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.deleteTemplate = function(templateName, options, callback) {
    var path = '/_template/' + templateName;
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
    return this.createCall({ path:path, method:'DELETE'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.getTemplate = function(templateName, options, callback) {
    var path = '/_template/' + templateName;
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
    return this.createCall({ path:path, method:'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.status = function(indexName, options, callback) {
    if(toString.call(indexName) != '[object String]'){
      options = indexName;
      indexName = undefined;
    }
    if (typeof options === 'function') {
        callback = options;
        options = undefined;
    } 

    var path = indexName ? '/' + indexName + '/_status' : '/_status';
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
    return this.createCall({ path:path, method:'GET'}, this.clientOptions, callback);
}

ElasticSearchClient.prototype.clearCache = function(indexName, options, callback) {
    var path = '/' + indexName + '/_cache/clear';
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
    return this.createCall({ path:path, method:'POST'}, this.clientOptions, callback);
}