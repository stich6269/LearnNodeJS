var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    ROOT = __dirname + '/public',
    mime = require('mime'),
    path = require('path');

var server = new http.createServer(function (req, res) {
    if(checkAccess(req)){
        sendFileSafe(req, res);
    }else{
        res.statusCode = 403;
        res.end('Access denied');
    }
}).listen(3000);

function checkAccess(req) {
    var urlParsed = url.parse(req.url, true);
    return urlParsed.query.access == '555355';
}

function sendFileSafe(req, res) {
    var filePath = url.parse(req.url, true).pathname;
    
    try {
        filePath = decodeURIComponent(filePath);
    } catch(err){
        res.statusCode = 404;
        res.end('Bad request');
        return
    }



    if(filePath.indexOf('\0') != -1){
        res.statusCode = 404;
        res.end('Bad request');
        return
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if(filePath.indexOf(ROOT) != 0){
        res.statusCode = 404;
        res.end('Bad request');
        return
    }



    fs.stat(filePath, function (err, stats) {
        if(err || !stats.isFile()){
            res.statusCode = 200;
            fs.readFile('public/index.html', function (err, data) {
                if (err) throw err;
                res.end(data.toString())
            });
        }else{
            fs.readFile(filePath, function (err, data) {
                res.setHeader('Content-Type:', mime.lookup(filePath) + '; charset=utf8');
                res.end(data);
            })
        }
    })


}