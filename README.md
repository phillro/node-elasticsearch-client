[![build status](https://secure.travis-ci.org/phillro/node-elasticsearch-client.png)](http://travis-ci.org/phillro/node-elasticsearch-client)
Elastic Search Client
=====================

A node.js client for elasticsearch (http://www.elasticsearch.com). 

## Installation

```
npm install elasticsearchclient
```

## Executing commands on elasticsearch

```javascript
ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
    host: 'localhost',
    port: 9200,
    pathPrefix:'optional pathPrefix',
    secure: true||false
};
```


OR specify multiple hosts

```javascript
var serverOptions = {
    hosts:[
        {
            host: 'localhost',
            port: 9200
        }]
};
```

```javascript
var elasticSearchClient = new ElasticSearchClient(serverOptions);

var qryObj = {
    field : term
}

elasticSearchClient.search('my_index_name', 'my_type_name', qryObj)
    .on('data', function(data) {
        console.log(JSON.parse(data))
    })
    .on('done', function(){
        //always returns 0 right now
    })
    .on('error', function(error){
        console.log(error)
    })
    .exec()

//Canonical search
 elasticSearchClient.search('my_index_name', 'my_type_name', qryObj, function(err, data){
    console.log(JSON.parse(data))
 })

//Search call as a reusable object with a canonical callback
mySearchCall = elasticSearchClient.search('my_index_name', 'my_type_name', qryObj);
//Do it once
mySearchCall.exec(function(err, data){
    console.log(JSON.parse(data))
})
//Do it twice
mySearchCall.exec(function(err, data){
    console.log(JSON.parse(data))
})



elasticSearchClient.index(indexName, typeName, document, id, options)
    .on('data', function(data) {
        console.log(data)
    })
    .exec()

//Bulk index example
var commands = []
commands.push({ "index" : { "_index" :'my_index_name', "_type" : "my_type_name"} })
commands.push({field1:'value',field2:'value'})


    elasticSearchClient.bulk(commands, {})
            .on('data', function(data) {})
            .on('done', function(done){})
            .on('error', function(error){})
            .exec();

```

Twitter stream:
Seems to be a problem in the es with deleting streams. May require a node restart for modifications/deletes to take effect


```javascript
elasticSearchClient.createOrModifyTwitterRiver(riverName, riverData)
    .on('data', function (data) {
        console.log(data)
        assert.ok(JSON.parse(data).ok)
    })
    .on('error',
    function (error) {
        console.log(error)
        assert.ok(false)
    }).exec()
```
## Code coverage

Run code coverage by executing:

	$npm run-script coverage

*Requires [visionmedia/jscoverage](https://github.com/visionmedia/node-jscoverage)

## What can i do?

Most of the API (http://www.elasticsearch.org/guide/reference/api/) is implemented. 

## License

Copyright (c) 2011 Phillip Rosen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
