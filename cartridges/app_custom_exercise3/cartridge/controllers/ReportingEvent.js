'use strict';

var server = require('server');
server.extend(module.superModule);

server.prepend('MiniCart',function(req,res,next){

    res.render('addToCartProduct');
    next();
});

module.exports = server.exports();
