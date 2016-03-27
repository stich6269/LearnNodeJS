/*var EventEmitter = require('events').EventEmitter;

 var server = new EventEmitter;

 server.on('request', function(request){
 request.approved = true;
 });

 server.on('request', function(request){
 console.log(request);
 });

 server.emit('request', {from: 'client'});
 server. emit('request', {from: 'another client'});*/

//console.log(lessons.listeners('request') );

var EventEmitter = require('events').EventEmitter,
    db = new EventEmitter;

function Request(){
    var self = this;
    this.bigData = new Array(1e6).join('*');
    
    this.send = function(data){
        console.log(data);
    };
    
    this.onError = function(){
        self.send('Sorry, we have some error');
    };

    function data (info){
        self.send('info');
    }

    db.on('data', data);

    this.end = function(){
        db.removeListener('data', data)
    };
}

setInterval(function(){
    var request = new Request();
    request.end();
    console.log(process.memoryUsage().heapUsed);
    //console.log(db);
}, 200);