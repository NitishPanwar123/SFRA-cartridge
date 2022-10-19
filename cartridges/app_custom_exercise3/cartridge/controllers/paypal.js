var server = require('server');
var service = require('*/cartridge/services/paypalToken');


server.get('getToken', function (req, res, next) {
    var template = 'paypalToken';
    var properties;
    // var data = JSON.stringify({
    //     grant_type: 'client_credentials',
    //     ignoreCache: 'true',
    //     return_authn_schemes: 'true',
    //     return_client_metadata: 'true',
    //     return_unconsented_scopes: 'true'
    // });
    var raw = JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
            {
                items: [
                    {
                        name: 'T-Shirt',
                        description: 'Green XL',
                        quantity: '1',
                        unit_amount: {
                            currency_code: 'USD',
                            value: '100.00'
                        }
                    }
                ],
                amount: {
                    currency_code: 'USD',
                    value: '100.00',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '100.00'
                        }
                    }
                }
            }
        ],
        application_context: {
            return_url: 'https://www.bing.com/search?q=refused+to+because+it+violates+the+document%27s+Content+Security+Policy.&qs=n&form=QBRE&sp=-1&pq=refused+to+&sc=10-11&sk=&cvid=53F90F72CAF4451E95B1161B42557990&ghsh=0&ghacc=0&ghpl=',
            cancel_url: 'https://example.com/cancel'
        }
    });

    var svcResult = service.paypalToken.call(raw);
    if (svcResult.status === 'OK') {
        properties = svcResult;
    }
    res.render(template, properties);
    next();
});

module.exports = server.exports();
