"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
  var content = context.content;

  var model = new HashMap();
 
  model.QuestionNumber = content.QuestionNumber;
  model.Question = content.Question;
  model.Answer = content.Answer;
  model.Id = content.Id;

  return new Template(
    "experience/components/commerce_assets/faq2").render(model).text;
};
