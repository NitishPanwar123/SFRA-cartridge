'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.Advice = content.Advice;
    model.Name = content.Name;
    model.Image = content.Image;

    return new Template('experience/components/commerce_assets/Nutritionist').render(model).text;
}