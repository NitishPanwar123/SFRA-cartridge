var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');
var StringUtils = require('dw/util/StringUtils');
var paypalToken = LocalServiceRegistry.createService('PwaPaypalService', {
    createRequest: function (svc, params) {
        var clientID = Site.current.getCustomPreferenceValue('pClientID');
        var clientSecret = Site.current.getCustomPreferenceValue('pClientSecret');
        var base64encodedKey = StringUtils.encodeBase64(clientID + ':' + clientSecret);
        svc.setRequestMethod('POST');
        svc.addHeader('Prefer', 'return=representation');
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Authorization', 'Basic ' + base64encodedKey);
        return params;
    },
    parseResponse: function (svc, httpClient) {
        var result;

        try {
            result = JSON.parse(httpClient.text);
        } catch (e) {
            result = httpClient.text;
        }
        return result;
    }
});

module.exports = {
    paypalToken: paypalToken
};
