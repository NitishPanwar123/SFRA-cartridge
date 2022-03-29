'use strict';
var File = require('dw/io/File');
var FileReader = require('dw/io/FileReader');
var StringUtils = require('dw/util/StringUtils');
var server = require('server');
server.get('Show', function(req, res, next){
    res.render('customEmailTemplate');
    next();
});

server.get('Start', function(req, res, next){
 //   var data = req.httpParameterMap.requestBodyAsString;
    // var m=1;
    var file = new File(File.IMPEX + File.SEPARATOR + "src" + File.SEPARATOR + 'NpProduct.txt');
    var  base64Label = StringUtils.decodeBase64(file, "UTF-8");
    res.print(base64Label);
    // var filee = new FileReader(file);
    var mail: Mail = new dw.net.Mail();
  mail.addTo("panwarnitish1@gmail.com");
  mail.setFrom("nitish@cyntexa.com");
  mail.setSubject("Example Email");
  mail.setContent(base64Label);
  mail.send();
    res.print("done");
    res.print(base64Label);
    next();
});
