"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var carouselBuilder = require("*/cartridge/scripts/experience/utilities/carouselBuilderCustom.js");

/**
 * Render logic for storefront.carousel layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
  var model = modelIn || new HashMap();

  model = carouselBuilder.init(model, context);
  model.heading = context.content.heading;

  return new Template(
    "experience/components/commerce_assets/flavourSliderLayout"
  ).render(model).text;
};
