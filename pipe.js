var fs = require('fs'),
    http = require('http');

var server = new http.createServer(function (req, res) {
    if(req.url == '/'){
        sendFile(res, new fs.ReadStream('public/doc.html'))
    }
}).listen(3000);

/*function sendFile(res, file) {

    file.on('readable', write);

    file.on('end', function () {
        console.log('End read');
        res.end('');
    });

    function write() {
        console.log('write');
        var data = file.read();
        
        if(data && !res.write(data)){
            file.removeListener('readable', write);
            res.once('drain', function () {
                console.log('drain');
                file.on('readable', write);
            })
        }
    }
};*/


function sendFile(res, file) {
    file.pipe(res);

    res.on('close', function () {
        file.destroy();
    });

    file.on('error', function (err) {
        if(err){
            res.statusCode = 500;
            res.end('File read error')
        }
    })
}
