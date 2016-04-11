var http = require('http'),
    fs = require('fs'),
    subscribers = [];

var server = new http.createServer(function (req, res) {
    if(req.url == '/subscribe'){
        if(subscribers.indexOf(res) == -1){
            subscribers.push(res);
        }
        
        res.on('close', function () {
            subscribers.splice(subscribers.indexOf(res), 1);
        });
    }
    

    if(req.url == '/publish'){
        var message = '';
        req
            .on('readable', function () {
                message += req.read();
            })
            .on('end', function () {
                for (var i = 0; i < subscribers.length; i++) {
                    var client = subscribers[i];
                    client.end(message);
                }
                res.end('ok');
            });
    }
}).listen(3000);