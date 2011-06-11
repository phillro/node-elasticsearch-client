var events = require('events'),
        http = require('http');
https = require('https');


module.exports = ElasticSearchCall;
function ElasticSearchCall(params, options) {
    var self = this
    self.host = options.host || 'localhost'
    self.port = options.port || 80
    self.secure = options.secure || false
    self.defaultMethod = options.defaultMethod || 'GET'
    self.auth = options.auth || false
    self.params = params || {}


}

ElasticSearchCall.super_ = events.EventEmitter;
ElasticSearchCall.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: ElasticSearchCall,
        enumerable: false
    }
});

ElasticSearchCall.prototype.exec = function() {
    self = this
    var reqOptions = {
        path:this.params.path,
        method:this.params.method || this.defaultMethod,
        host:this.host,
        port:this.port
    }

    var client
    if (this.secure) {
        client = https;
    } else {
        client = http
    }

    var request = client.request(reqOptions);
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
        request.end(this.params.data);
    } else {
        request.end('');
    }

}