/*
var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res){
    var info;
    if(req.url == '/'){
        try{
            info = fs.readFileSync('index.html');
        }catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Server has some error');
            return;
        }

        res.end(info);
    }else{
        /!* 404 *!/
    }

}).listen(3000);*/


var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res){
    var info;
    if(req.url == '/'){
        info = fs.readFile('index.html', function(err, info){
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.end('Server has some error');
                return;
            }

            res.end(info);
        });
    }else{
        /* 404 */
    }

}).listen(3000);
