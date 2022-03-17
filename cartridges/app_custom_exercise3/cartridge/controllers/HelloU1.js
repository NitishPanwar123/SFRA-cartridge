'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {

	/*within the function, render the hello.isml template,
	 and declare the value of param1 which you saw
	 in hello.isml.  param1 should equal "Hello from ISML"
	*/
	// res.render('helloU', {param1:"Hello from ISML"});
	res.render('testTemp');
	// res.print('hdfugd');
	next();
});

module.exports = server.exports();