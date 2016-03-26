var User = require('./user');

function run() {
    var petya = new User.user('Petya'),
        vasya = new User.user('Vasya');

    petya.hello(vasya);
}


if(module.parent){
    exports.run = run;
}else {
    run()
}