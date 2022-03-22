'use strict';

var server = require('server');
var Cookie = require('dw/web/Cookie');
var OrderMgr = require('dw/order/OrderMgr');
var BasketMgr = require('dw/order/BasketMgr');

server.get('Show', function (req, res, next)
 {
	var store = req.querystring.store;
	res.print(store);
	var cookie = new Cookie("nitish", store);
	
	
	response.addHttpCookie(cookie);
	//var cookie=request.getHttpCookies()[0].value;
	next();
});

module.exports = server.exports();