var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var logger = require('dw/system/Logger');
var Order = require('dw/order/Order');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

function execute(args) {
    var tdy = new Date();
    var endDate = new Date('2022-04-07T00:00:00.000Z');
    var openOrders = OrderMgr.searchOrders(
        'exportStatus={0} AND creationDate>={1}',
        'creationDate desc',
        Order.EXPORT_STATUS_EXPORTED,
        tdy
    );
    
    var OrderXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><orders>';
    while (openOrders.hasNext()) {
        let openOrder = openOrders.next();
        let orderXmlAsString = openOrder.getOrderExportXML(null, null);
        orderXmlAsString = orderXmlAsString.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','');
        OrderXML += orderXmlAsString;
        Transaction.wrap(function () {
            openOrder.setExportStatus(Order.EXPORT_STATUS_EXPORTED);
        });
    }
    OrderXML += '</orders>';
    logger.info("orders - {0}" , OrderXML);
    
    // var sharedLibrary = 'src/orderExport/';
    // var destinationPath = File.IMPEX + '/' + sharedLibrary;
    var folderPath = File.IMPEX + '/src/';

    var destinationFile = new File(folderPath + "Product.txt");
    var fileWriter = new FileWriter(destinationFile, 'UTF-8');
    try {
        fileWriter.writeLine(OrderXML);
    } catch (ex) {
        logger.error('[ERROR][Asset Updater Job] - ' + ex);
    } finally {
        fileWriter.flush();
        fileWriter.close();
    }

    return PIPELET_NEXT;
}

module.exports = {
    execute: execute
};