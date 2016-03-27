var http = require('http'),
    server  = new http.Server(),
    emit = server.emit;

server.listen(8080, '127.0.0.1');
server.emit = function(event){
    console.log(event);
    emit.apply(server, arguments)
};


var counter = 0;
server.on('request', function(req, res){
    res.end('Hello world ' + ++counter);
});