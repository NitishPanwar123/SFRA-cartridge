var File = require('dw/io/File');
var logger = require('dw/system/Logger');
var FileWriter = require('dw/io/FileWriter');
var FileReader = require('dw/io/FileReader');
var StringUtils = require('dw/util/StringUtils');
var Site = require("dw/system/Site");

function execute(args) {
    var file = new File(File.IMPEX + '/src/NpProduct.txt');
    var  base64Label = StringUtils.decodeBase64(file,"UTF-8");



  var mail: Mail = new dw.net.Mail();
  mail.addTo("panwarnitish1@gmail.com");
  mail.setFrom("nitish@cyntexa.com");
  mail.setSubject("Example Email");
  mail.setContent(base64Label);

  mail.send();

    return PIPELET_NEXT;
}



module.exports = {
    execute: execute
};
