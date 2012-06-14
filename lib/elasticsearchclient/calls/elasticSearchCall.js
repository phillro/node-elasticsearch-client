var events = require('events'),
http = require('http'),
https = require('https'),
util = require('util');


module.exports = ElasticSearchCall;
function ElasticSearchCall(params, options) {
    var self = this
    self.host = options.host || 'localhost'
    self.port = options.port || 80
    self.secure = options.secure || false
    self.defaultMethod = options.defaultMethod || 'GET'
    self.auth = options.auth || false
    self.params = params || {}
    self.path = options.path || ''
    events.EventEmitter.call(this);
}

util.inherits(ElasticSearchCall, events.EventEmitter);

ElasticSearchCall.prototype.exec = function() {
    var self = this
    var reqOptions = {
        path:this.path + this.params.path,
        method:this.params.method || this.defaultMethod,
        host:this.host,
        port:this.port
    }

    var client = null;
    if (this.secure) {
        client = https;
    } else {
        client = http;
    }

    var request = client.request(reqOptions);
    request.on('error',function(error){
        self.emit("error", error)
    })

    request.on('response', function(response) {
        var body = "";
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            self.emit("data", body);
            self.emit("done", 0)
        });
        response.on('error', function(error) {
            self.emit("error", error)
        })
    });

    if (this.auth) {
        request.setHeader("Authorization", "Basic " + new Buffer(this.auth.username + ":" + this.auth.password).toString('base64'))
    }

    if (this.params.data) {
        if (typeof this.params.data != 'string') {
            this.params.data = JSON.stringify(this.params.data);
        }
        request.setHeader('Content-Type', 'application/json');
        request.end(this.params.data);
    } else {
        request.end('');
    }
}

/**
 * Wrap the default data event
 * @param callback
 */
ElasticSearchCall.prototype.data = function(callback) {
    this.on('data', callback);
}

/**
 * wrap the default done event
 * @param callback
 */
ElasticSearchCall.prototype.done = function(callback) {
    this.on('done', callback);
}

/**
 * wrap the default error event
 * @param callback
 */
ElasticSearchCall.prototype.error = function(callback) {
    this.on('error', callback);
}