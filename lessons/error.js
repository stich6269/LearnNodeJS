var util = require('util');
var phrase = {
    hello: "Привет",
    world: "мир"
};

function HttpError(status, message){
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


function CodeError(message){
    this.message = message;
    Error.captureStackTrace(this, CodeError);
}
util.inherits(CodeError, Error);
CodeError.prototype.name = 'CodeError';



function getPhrase(name){
    if(!phrase[name]){
        throw new CodeError("Нет такой фразы " + name);
    }

    return phrase[name]
}

function makePage(url){
    if(url != 'index.html'){
        throw new HttpError(404, "Нет такой страницы " + url);
    }

    return util.format('%s %s', getPhrase('hello'), getPhrase('world'))
}

try {
    var page = makePage('index2.html');
    console.log(page);
}catch(e) {
    if(e instanceof HttpError){
        console.log(e.status, e.message,  e.stack.split('\n'));
    }else{
        console.log('Ошибка %s \n сообщение %s', e.name, e.message, typeof e.stack);
    }
}
