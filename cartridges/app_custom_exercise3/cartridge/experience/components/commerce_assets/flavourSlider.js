"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.image = content.image;
  model.color = content.color;
  model.heading = content.heading;
  model.para = content.para;
  model.link = content.link;
  model.btnText = content.btnText;
  return new Template(
    "experience/components/commerce_assets/flavourSlider"
  ).render(model).text;
};
