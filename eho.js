var http = require('http'),
    url = require('url'),
    console = require('loger')(module);

http.createServer(function(req, res){
    var parsedUrl = url.parse(req.url, true),
        link = parsedUrl.pathname,
        data = parsedUrl.query;

    data.method = req.method;

    if(link == '/'){
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    }else{
        res.statusCode = 404;
        res.end('Page not defined')
    }
    
}).listen(3000);

console.info('Some info data');
console.debug('Some debug data');
console.error('Some error data');