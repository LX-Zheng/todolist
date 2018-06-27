var express = require('express');
var app = express();
var router = require('./router')
var path = require('path');



app.use(express.static('public'));



app.use('/', router)


var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})