'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.paragraph = content.paragraph;

    return new Template('experience/components/commerce_assets/paraText2').render(model).text;
}