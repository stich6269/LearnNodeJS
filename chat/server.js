var http = require('http'),
    fs = require('fs');

var server = new http.createServer(function (req, res) {
    console.log('request: ', re);
    if(req.url = '/'){;
        sendIndexHtml(res);
    }
}).listen(3000);

function sendIndexHtml(res) {
    var stream = fs.ReadStream('./index.html');
    
    stream.on('error', function (err) {
        if(err){
            res.statusCode = 404;
            res.end('Page not found');
        }
    });
    
    stream.pipe(res);
}