"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.Image1 = content.Image1;
    model.HeadingRed1 = content.HeadingRed1;
    model.HeadingBlack1 = content.HeadingBlack1;
    model.flavour1 = content.flavour1;
    model.Description1 = content.Description1;
    model.ButtonName1 = content.ButtonName1;
    model.ButtonLink1 = content.ButtonLink1;

    model.Image2 = content.Image2;
    model.HeadingRed2 = content.HeadingRed2;
    model.HeadingBlack2 = content.HeadingBlack2;
    model.flavour2 = content.flavour2;
    model.Description2 = content.Description2;
    model.ButtonName2 = content.ButtonName2;
    model.ButtonLink2 = content.ButtonLink2;

    model.Image3 = content.Image3;
    model.HeadingRed3 = content.HeadingRed3;
    model.HeadingBlack3 = content.HeadingBlack3;
    model.flavour3 = content.flavour3;
    model.Description3 = content.Description3;
    model.ButtonName3 = content.ButtonName3;
    model.ButtonLink3 = content.ButtonLink3;

    model.Image4 = content.Image4;
    model.HeadingRed4 = content.HeadingRed4;
    model.HeadingBlack4 = content.HeadingBlack4;
    model.flavour4 = content.flavour4;
    model.Description4 = content.Description4;
    model.ButtonName4 = content.ButtonName4;
    model.ButtonLink4 = content.ButtonLink4;

    model.Image5 = content.Image5;
    model.HeadingRed5 = content.HeadingRed5;
    model.HeadingBlack5 = content.HeadingBlack5;
    model.flavour5 = content.flavour5;
    model.Description5 = content.Description5;
    model.ButtonName5 = content.ButtonName5;
    model.ButtonLink5 = content.ButtonLink5;

    model.Image6 = content.Image6;
    model.HeadingRed6 = content.HeadingRed6;
    model.HeadingBlack6 = content.HeadingBlack6;
    model.flavour6 = content.flavour6;
    model.Description6 = content.Description6;
    model.ButtonName6 = content.ButtonName6;
    model.ButtonLink6 = content.ButtonLink6;
    
    return new Template("experience/components/commerce_assets/slider").render(
        model
      ).text;
    
}