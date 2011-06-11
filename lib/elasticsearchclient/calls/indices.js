var querystring = require('querystring'),
        ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.aliases = function(alias, options) {
    var path = '/_aliases';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(alias), path:path, method:'POST'}, this.clientOptions);
}

ElasticSearchClient.prototype.analyze = function(indexName, textToAnalyze, options) {
    var path = '/' + indexName + '/_analyze';
    var qs = '';
    var opts = options || {}
    opts.text = textToAnalyze
    qs = querystring.stringify(opts)
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.createIndex = function(indexName, settings, options) {
    var path = '/' + indexName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions);
}

ElasticSearchClient.prototype.deleteIndex = function(indexName, options) {
    var path = '/' + indexName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'DELETE'}, this.clientOptions);
}


ElasticSearchClient.prototype.openIndex = function(indexName, options) {
    var path = '/' + indexName + '/_open';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}

ElasticSearchClient.prototype.closeIndex = function(indexName, options) {
    var path = '/' + indexName + '/_open';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}


ElasticSearchClient.prototype.updateSettings = function(indexName, options) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'PUT'}, this.clientOptions);
}

ElasticSearchClient.prototype.getSettings = function(indexName, options) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.updateSettings = function(indexName, settings, options) {
    var path = '/' + indexName + '/_settings';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(settings), path:path, method:'PUT'}, this.clientOptions);
}


ElasticSearchClient.prototype.getMapping = function(indexName, typeName, options) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'get'}, this.clientOptions);
}

ElasticSearchClient.prototype.putMapping = function(indexName, typeName, mapping, options) {
    var path = '/' + indexName + '/' + typeName + '/_mapping';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }

    return this.createCall({data:JSON.stringify(mapping), path:path, method:'PUT'}, this.clientOptions);
}

ElasticSearchClient.prototype.deleteMapping = function(indexName, typeName, options) {
    var path = '/' + indexName + '/' + typeName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'DELETE'}, this.clientOptions);
}

ElasticSearchClient.prototype.refresh = function(indexName, options) {
    var path = '/' + indexName + '/_refresh';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}

ElasticSearchClient.prototype.optimize = function(indexName, options) {
    var path = '/' + indexName + '/_optimize';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}

ElasticSearchClient.prototype.flush = function(indexName, options) {
    var path = '/' + indexName + '/_flush';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}

ElasticSearchClient.prototype.snapshot = function(indexName, options) {
    var path = '/' + indexName + '/_gateway/snapshot';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'POST'}, this.clientOptions);
}


ElasticSearchClient.prototype.defineTemplate = function(templateName, template, options) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(template), path:path, method:'PUT'}, this.clientOptions);
}

ElasticSearchClient.prototype.deleteTemplate = function(templateName, options) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'DELETE'}, this.clientOptions);
}

ElasticSearchClient.prototype.getTemplate = function(templateName, options) {
    var path = '/_template/' + templateName;
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.status = function(indexName, options) {
    var path = '/' + indexName + '/_status';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'GET'}, this.clientOptions);
}

ElasticSearchClient.prototype.clearCache = function(indexName, options) {
    var path = '/' + indexName + '/_cache/clear';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({ path:path, method:'POST'}, this.clientOptions);
}