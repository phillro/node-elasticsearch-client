var querystring = require('querystring'),
ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.deleteTwitterRiver = function(riverName, options, cb) {
    var path = '/_river/'+riverName+'/_meta';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({path:path, method:'DELETE'}, this.clientOptions,cb);
}

ElasticSearchClient.prototype.createOrModifyTwitterRiver = function(riverName, riverData, options, cb) {

    var path = '/_river/'+riverName+'/_meta';
    var qs = '';
    if (options) {
        qs = querystring.stringify(options)
    }
    if (qs.length > 0) {
        path += "?" + qs;
    }
    return this.createCall({data:JSON.stringify(riverData),path:path,method: 'PUT'}, this.clientOptions, cb);
}