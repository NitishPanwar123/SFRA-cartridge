"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
  model.Heading = content.Heading;
  model.QuestionNumber = content.QuestionNumber;
  model.Question = content.Question;
  model.Answer = content.Answer;

  return new Template(
    "experience/components/commerce_assets/faq").render(model).text;
};
