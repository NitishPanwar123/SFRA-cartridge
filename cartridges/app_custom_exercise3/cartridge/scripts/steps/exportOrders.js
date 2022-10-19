
function execute()
{

    var File = require('dw/io/File');
    var FileWriter = require('dw/io/FileWriter');
    var OrderMgr = require('dw/order/OrderMgr');

    // var folderPath = File.IMPEX + '/src/';
    // var destFile = new File(folderPath + "Np.txt");

    var src = "src";
    var folderPath = File.IMPEX + "/" + src + "/ordercustom.txt";
    var file = new File(folderPath);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var query = 'creationDate <=' + date;

    OrderMgr.processOrders(orderCallBackFunction,'');
    var content = "";
    content += JSON.stringify(orders);


    var fileWriter = new FileWriter(file,"UTF-8");
    try {
        fileWriter.writeLine(content);
    } catch (ex) {

    } finally {
        fileWriter.flush();
        fileWriter.close();
    }

    
}

var count=0
var orders = {};

function orderCallBackFunction(order) {

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

exports.execute = execute;