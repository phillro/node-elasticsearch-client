/**
 * Created with JetBrains WebStorm.
 * User: philliprosen
 * Date: 2/19/13
 * Time: 3:24 PM
 * To change this template use File | Settings | File Templates.
 */

var serverOptions = {
    hosts:[
        {
            host: 'localhost',
            port: 9200
        }]
};

ES = require('./');
client = new ES(serverOptions);

client.update('test-index', 'test-type', "5lDfD_c0RgWqdKFQ-PJU1g", {name: "jerky"}, function(err,data){
    data = JSON.parse(data);
    console.log(data)
})


console.log('stuff');