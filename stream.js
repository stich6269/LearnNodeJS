var fs = require('fs');

var stream = new fs.ReadStream(__filename);

stream.on('readable', function () {
    var data = stream.read();
    console.log(data);
});

stream.on('end', function () {
    console.log('End reading');
});