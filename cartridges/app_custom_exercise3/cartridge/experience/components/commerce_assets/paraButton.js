'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.Paragraph = content.Paragraph;
    model.ButtonName = content.ButtonName;
    model.ButtonLink = content.ButtonLink;

    return new Template('experience/components/commerce_assets/paraButton').render(model).text;
}