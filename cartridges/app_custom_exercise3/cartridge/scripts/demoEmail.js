function orderCallBackFunction(order) {

    // var k=order;
    // var m=0;
    // var prevalue = Site.getCurrent().getCustomPreferenceValue("productOrderUniqueId ");
    // if(order.productLineItems[0].productID==prevalue.toString())
    if(order.shippingStatus==2){

        var data;
        data="<br>"+"orderNumber:"+order.orderNo+"<br>"+"totalGrossPrice" +order.totalGrossPrice+"<br>"+"currencyCode"+order.currencyCode;
        var Mail = require('dw/net/Mail');
        var mail = new Mail()
        mail.addTo("chirag@cyntexa.com");
        mail.setFrom("no-reply@salesforce.com");
        mail.setSubject("Example Email");
        mail.setContent(data,"text/html","UTF-8");

        mail.send();//returns either Status.ERROR or Status.OK, mail might not be sent yet, when this method returns

        orders[count] = {
            orderNumber: order.orderNo,
            totalCost: order.totalGrossPrice,
            currencyCode: order.currencyCode,
            productId:order.productLineItems[0].productID,
        };
        // orders[count] = order;
        count++;
    // orders += order;
    }
}

function writeFile(destFile, content) {
    var fileWriter = new FileWriter(destFile, "UTF-8");

    try {
        // var result = reactServices.reactCDNService.setRequestMethod('GET').call();
        // if (result) {
            fileWriter.writeLine(content);
        // }
    } catch (ex) {
        logger.error("[ERROR][Asset Updater Job] - " + ex);
    } finally {
        fileWriter.flush();
        fileWriter.close();
    }
}

function removeFile(filPath) {
    var file = new File(filPath);
    file.remove();
}

module.exports = {
    execute: execute
};





var File = require('dw/io/File');
var logger = require('dw/system/Logger');
var FileWriter = require('dw/io/FileWriter');
var FileReader = require('dw/io/FileReader');
var StringUtils = require('dw/util/StringUtils');
var Site = require("dw/system/Site");
var Iterator = require('dw/util/Iterator');

var StringWriter = require('dw/io/StringWriter');

var HashMap = require('dw/util/HashMap');
var Template = require('dw/util/Template');


var OrderMgr = require("dw/order/OrderMgr");

function execute(args) {
    var Mail = require('dw/net/Mail');
    var renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');
        var fileData = createAttachmentData({
            fileName: 'NpProduct'
        });

        var template = new dw.util.Template("emailsent.isml");

         var o = new dw.util.HashMap();
         o.put("fileData", fileData);
        // // o.put("data",  Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        // Logger.info(req.form.data.split('base64,').pop());
        // // Logger.info(Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        // o.put("data", req.form.data.split('base64,').pop());
        // // o.put("length", req.form.data.length);
        // o.put("name", req.form.name);

        var content = template.render(o);

       // emailsent.put("fileData", fileData);
       // var content = template.render("cartridge/templates/default/emailsent");
        var email = new Mail();
        email.addTo("panwarnitish1@gmail.com");
        email.setSubject("orders");
        email.setFrom("no-reply@testorganization.com");
        email.setContent(content);
        email.send();
        return PIPELET_NEXT;
}
function createAttachmentData(params) {
var fileName = params.fileName;
try {
    var Logger = require('dw/system/Logger');
    var csvMapBase64 = new HashMap();
    var file = new File(File.IMPEX+'/src/NpProduct.txt');
    var fileReader = new FileReader(file, 'ISO-8859-1');
    var csv = fileReader.string;
    var csvBase64 = encodeBase64ForEmail(csv, 'ISO-8859-1');
    csvMapBase64.put(fileName, csvBase64);
} catch (error) {
    Logger.error('Error in createAttachmentData, Message : {0}', error.message);
}
return { FileName: fileName, content: csvBase64 };
}
function encodeBase64ForEmail(str, characterEncoding) {
var strBase64 = StringUtils.encodeBase64(str, characterEncoding);
var strBase64LB = new String();
var stringWriter = new StringWriter();
var offset = 0;
var length = 76;
while (offset < strBase64.length) {
    var maxOffset = offset + length;
    if (strBase64.length >= maxOffset) {
        stringWriter.write(strBase64, offset, length);
        stringWriter.write("\n");
    }
    else {
        stringWriter.write(strBase64, offset, length - (maxOffset - strBase64.length));
    }
    offset += length;
}
stringWriter.flush();
strBase64LB = stringWriter.toString();
stringWriter.close();
return strBase64LB;
}
module.exports = {
    execute: execute
};
