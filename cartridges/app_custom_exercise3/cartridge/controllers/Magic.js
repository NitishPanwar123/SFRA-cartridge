var server = require('server');
var service = require('app_custom_exercise3/cartridge/services/dadjokeservice');

server.get('Show', function (req, res, next) {
    var properties = {};
    // var template = 'magic';
    //calling and storing the result of service call in svcResult variable
    var svcResult = service.dadJokeAPIService.call();
    // If the service call was successful, the svcResult’s object property will hold the JSON response from the service. This JSON response contains a joke property that holds the actual joke. We will save that property to a new property on our properties object called joke.
    if (svcResult.status === 'OK') {
        properties.joke = svcResult.object.joke;
    }

    res.render('magic', properties);
    next();
});

server.get('Search', function (req, res, next) {
    var properties = {};
    // var template = 'magicSearch';

    //Gets the term query parameter from the req object’s querystring object. This querystring object holds all the query parameters passed to the SFRA controller, and each query parameter can be accessed by specifying its name.
    var searchTerm = req.querystring.term || '';

    //The getURL() method returns the URL set in the Services Framework entity credentials. We can use the result of this method to append any path we wish for the service, and in our case, the search path.
    var url = service.dadJokeAPIService.getURL() + 'search';

    // setURL() is used to set the URL for the service call, overriding the static one defined in the Services Framework entity’s credentials.

    //addParams() is used to add parameters to the service call. If your service is using the GET method, the parameters will be added as query params. If your service is using the POST/PUT method , the parameters will be added as body parameters.
    var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        properties.jokes = svcResult.object.results;
    }

    res.render('magicSearch', properties);
    next();
});

module.exports = server.exports();