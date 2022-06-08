'use strict';
var server = require('server');

server.get('Show', function (req, res, next) {
    var Site = require('dw/system/Site').getCurrent();
    res.render('mail', {mail : "panwarnitish1@gmail.com"});
    next();
});

server.post(
    'Submit',
    function (req, res, next) {
        var Site = require('dw/system/Site').getCurrent();
        var Mail = require('dw/net/Mail');
        var Logger = require('dw/system/Logger');
        var Encoding = require('dw/crypto/Encoding');dw.crypto.Encoding

        var template = new dw.util.Template("mailTemplate.isml");

        var o = new dw.util.HashMap();
        o.put("body", req.form.body);
        // o.put("data",  Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        Logger.info(req.form.data.split('base64,').pop());
        // Logger.info(Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        o.put("data", req.form.data.split('base64,').pop());
        // o.put("length", req.form.data.length);
        o.put("name", req.form.name);

        var content = template.render(o);

        var mail = new dw.net.Mail();
        mail.addTo("panwarnitish1@gmail.com");
        mail.setFrom("nitish@cyntexa.com");
        mail.setSubject("Mail with Attachment");
        // mail.setContent(req.form.body);
        mail.setContent(content);
        mail.send();

        res.print('Done');
        next();
    }
);

module.exports = server.exports();
