var http = require('http'),
    url = require('url');

http.createServer(function(req, res){
    var parsedUrl = url.parse(req.url, true),
        link = parsedUrl.pathname,
        data = parsedUrl.query;

    data.method = req.method;
    console.log(link);

    if(link == '/'){
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    }else{
        res.statusCode = 404;
        res.end('Page not defined')
    }

    console.log(req);
}).listen(3000);