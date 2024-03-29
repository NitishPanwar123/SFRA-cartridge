var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var logger = require('dw/system/Logger');
var OrderMgr = require("dw/order/OrderMgr");
var Site = require("dw/system/Site");



function execute(args){
  
	// var orderList= OrderMgr.queryOrders();
	// var a=0;
    


    var folderPath = File.IMPEX + '/src/';
    var destFile = new File(folderPath + "NpProduct.txt");

    var today = new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     var query = 'creationDate >=' + date;

    

    OrderMgr.processOrders(orderCallBackFunction,query);
    var content = "";
    content += JSON.stringify(orders);
    // destFile.mkdirs()
    writeFile(destFile, content);
    var cc=destFile;
    // removeFile(fileToRemove);
       return PIPELET_NEXT;


}
var count=0
var orders = {};
function orderCallBackFunction(order) {

        var prevalue = Site.getCurrent().getCustomPreferenceValue("ProductIdNp");
        if(order.productLineItems[0].productID==prevalue.toString()  )
        orders[count] = {
            orderNumber: order.orderNo,
            customerName: order.customerName,
            totalCost: order.totalGrossPrice,
            currencyCode: order.currencyCode,
            productId:order.productLineItems[0].productID,
            creationDate: order.creationDate,
        };
        // orders[count] = order;
        count++;
    // orders += order;
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

function exportorder(orders){
    var order = orders;
    var a =0;
    var b=0;
}



module.exports = {
    execute: execute
};