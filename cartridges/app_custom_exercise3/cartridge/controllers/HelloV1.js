'use strict';


var server = require('server');
var OrderMgr = require('dw/order/OrderMgr');
var sc=require('../scripts/assetUpdater');

server.get('Start', function (req, res, next)
{
    
    sc.execute();

	res.print('<html><body><h1>Hello World N</h1></body></html>');
    next();
	 
});

module.exports = server.exports();


