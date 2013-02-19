var querystring = require('querystring'),
        ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.aliases = function(alias, options, cb) {
    var path = '/_aliases';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(alias), path:path, method:'POST'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.analyze = function(indexName, textToAnalyze, options, cb) {
    var path = '/' + indexName + '/_analyze';
    var qs = '';
    var opts = options || {}
    opts.text = textToAnalyze
    qs = querystring.stringify(opts)
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.createIndex = function(indexName, settings, options, cb) {
    var path = '/' + indexName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.deleteIndex = function(indexName, options, cb) {
    var path = '/' + indexName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'DELETE'}, this.clientOptions, cb);
}


ElasticSearchClient.prototype.openIndex = function(indexName, options, cb) {
    var path = '/' + indexName + '/_open';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.closeIndex = function(indexName, options, cb) {
    var path = '/' + indexName + '/_open';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}


ElasticSearchClient.prototype.updateSettings = function(indexName, options, cb) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'PUT'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.getSettings = function(indexName, options, cb) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.updateSettings = function(indexName, settings, options, cb) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions, cb);
}


ElasticSearchClient.prototype.getMapping = function(indexName, typeName, options, cb) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'get'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.putMapping = function(indexName, typeName, mapping, options, cb) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }

    return this.createCall({data:JSON.stringify(mapping), path:path, method:'PUT'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.deleteMapping = function(indexName, typeName, options, cb) {
    var path = '/' + indexName + '/' + typeName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'DELETE'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.refresh = function(indexName, options, cb) {
    var path = '/' + indexName + '/_refresh';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.optimize = function(indexName, options, cb) {
    var path = '/' + indexName + '/_optimize';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.flush = function(indexName, options, cb) {
    var path = '/' + indexName + '/_flush';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.snapshot = function(indexName, options, cb) {
    var path = '/' + indexName + '/_gateway/snapshot';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions, cb);
}


ElasticSearchClient.prototype.defineTemplate = function(templateName, template, options, cb) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(template), path:path, method:'PUT'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.deleteTemplate = function(templateName, options, cb) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'DELETE'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.getTemplate = function(templateName, options, cb) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.status = function(indexName, options, cb) {
    if(toString.call(indexName) != '[object String]'){
      options = indexName;
      indexName = undefined;
    }

    var path = indexName ? '/' + indexName + '/_status' : '/_status';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'GET'}, this.clientOptions, cb);
}

ElasticSearchClient.prototype.clearCache = function(indexName, options, cb) {
    var path = '/' + indexName + '/_cache/clear';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'POST'}, this.clientOptions, cb);
}