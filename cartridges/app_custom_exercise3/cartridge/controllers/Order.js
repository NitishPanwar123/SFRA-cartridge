'use strict';

var server = require('server');
var Transaction = require('dw/system/Transaction');
var OrderMgr = require('dw/order/OrderMgr');

server.extend(module.superModule);

server.append('Confirm', function (req, res, next) {
    var order;

    if (!req.form.orderToken || !req.form.orderID) {
        res.render('/error', {
            message: Resource.msg('error.confirmation.error', 'confirmation', null)
        });

        return next();
    }

    order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);

 
    Transaction.wrap(function(){

        var cookie=request.getHttpCookies()[0].value;

        order.custom.NpWeeks = cookie ;
     
    })
    next();
});

module.exports = server.exports();