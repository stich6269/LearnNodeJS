var fs = require('fs');

fs.readFile(__filename, {encoding: 'utf-8'}, function (err, data) {
    if (err) throw err;
    //console.log(data);
    //console.log(data.toString());
});

fs.writeFile('user/test.tmp', 'data', function (err) {
    if (err) throw err;
});

fs.rename('user/test.tmp', 'user/new.tmp', function (err) {
    if (err) throw err;
});

fs.unlink('user/new.tmp', function (err) {
    if (err) throw err;
});