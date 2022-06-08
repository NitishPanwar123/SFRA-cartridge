// var File = require('dw/io/File');
// var logger = require('dw/system/Logger');
// var FileWriter = require('dw/io/FileWriter');
// var FileReader = require('dw/io/FileReader');
// var StringUtils = require('dw/util/StringUtils');
// var Site = require("dw/system/Site");
// var Iterator = require('dw/util/Iterator');

// var OrderMgr = require("dw/order/OrderMgr");

// function execute(args) {
//     // var file = new File(File.IMPEX + '/src/NpProduct.txt');
//     // var  base64Label = StringUtils.decodeBase64(file,"UTF-8");
      

//     OrderMgr.processOrders(orderCallBackFunction, "");
//     var content = "";
//     content += JSON.stringify(orders);
//     // var tdys = new Date();
//     // var query='creationDate<='+tdys+'AND creationDate>=2022-04-05T00:00:00.000Z';
//     // var ol=OrderMgr.queryOrders(query,'');
//     // var con = JSON.stringify(ol);

//     var sendTo = Site.getCurrent().getCustomPreferenceValue("NpEmail");


//   var mail: Mail = new dw.net.Mail();
//   mail.addTo(sendTo);
//   mail.setFrom("nitish@cyntexa.com");
//   mail.setSubject("Example Email new");
//   mail.setContent(content);

//   mail.send();

//     return PIPELET_NEXT;
// }

// var count=0
// var orders = {};
// function orderCallBackFunction(order) {
//     var tdy = new Date();
//    // var d = new Date(tdy.getFullYear(), tdy.getMonth(), tdy.getDate(), 00, 00, 00, 0000);
//     var endDate = new Date('2022-04-06T00:00:00.000Z');

//         var prevalue = Site.getCurrent().getCustomPreferenceValue("ProductIdNp");
//         if(order.productLineItems[0].productID==prevalue.toString() && order.creationDate<=tdy && order.creationDate>=endDate)
//         orders[count] = {
//             orderNumber: order.orderNo,
//             customerName: order.customerName,
//             totalCost: order.totalGrossPrice,
//             currencyCode: order.currencyCode,
//             productId:order.productLineItems[0].productID,
//             creationDate: order.creationDate,
//         };
//         // orders[count] = order;
//         count++;
//     // orders += order;
// }




// module.exports = {
//     execute: execute
// };




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
    var Site = require('dw/system/Site').getCurrent();
    var Mail = require('dw/net/Mail');
    var Logger = require('dw/system/Logger');
    var Encoding = require('dw/crypto/Encoding');dw.crypto.Encoding

    var template = new dw.util.Template("mailTemplate.isml");
        var fileData = createAttachmentData({
            fileName: 'NpProduct'
        });
       

        var o = new dw.util.HashMap();
        o.put("body", 'hi');
        // o.put("data",  Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        // Logger.info(req.form.data.split('base64,').pop());
        // Logger.info(Encoding.toBase64(Encoding.fromBase64(req.form.data)));
        o.put("data",fileData.content);
        // o.put("length", req.form.data.length);
        o.put("name", fileData.FileName);

        var content = template.render(o);

        var mail = new dw.net.Mail();
        mail.addTo("panwarnitish1@gmail.com");
        mail.setFrom("nitish@cyntexa.com");
        mail.setSubject("Mail with Attachment");
        // mail.setContent(req.form.body);
        mail.setContent(content);
        mail.send();

     
    
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
