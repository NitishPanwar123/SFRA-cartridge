'use strict';


exports.beforePATCH = function (order) {
    if (order.paymentInstrument.paymentMethod === 'PayPal') {
        order.setPaymentStatus(order.PAYMENT_STATUS_PAID);
    }
};
