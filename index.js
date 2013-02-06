//imports libs
module.exports = process.env.ELASTICSEARCHCLIENT_COV ? require('./lib-cov/elasticsearchclient/elasticSearchClient') : require('./lib/elasticsearchclient/elasticSearchClient');
