"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.Image = content.Image;
    model.Content = content.Content;

    return new Template("experience/components/commerce_assets/secondComp").render(
        model
      ).text;

}