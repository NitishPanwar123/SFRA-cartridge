"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.Heading = content.Heading;
    model.Content = content.Content;
    model.ButtonLink = content.ButtonLink;
    model.Image = content.Image;
    
    return new Template("experience/components/commerce_assets/LowCarbBars").render(
        model
      ).text;
    
}