'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.DiscountText = content.DiscountText;
    model.Heading = content.Heading;
    model.Image = content.Image;
    model.linkName = content.linkName;
    model.Price = content.Price;
    model.ButtonName = content.ButtonName;
    model.ButtonLink = content.ButtonLink;
    model.ModalProductPoints = content.ModalProductPoints;
    model.ProductInfo = content.ProductInfo;

    return new Template('experience/components/commerce_assets/productDiscount').render(model).text;
}