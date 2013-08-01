var ElasticSearchClient = require('../elasticSearchClient');

ElasticSearchClient.prototype.metaRiver = function(riverName, cb) {
    var path = '/_river/'+riverName+'/_meta';

    return this.createCall({path:path, method:'GET'}, this.clientOptions,cb);
}

ElasticSearchClient.prototype.deleteRiver = function(riverName, cb) {
    var path = '/_river/'+riverName+'/_meta';

    return this.createCall({path:path, method:'DELETE'}, this.clientOptions,cb);
}

ElasticSearchClient.prototype.createOrModifyRiver = function(riverName, riverData, options, cb) {
    var path = '/_river/'+riverName+'/_meta';

    return this.createCall({data:JSON.stringify(riverData),path:path,method: 'PUT'}, this.clientOptions, cb);
}
