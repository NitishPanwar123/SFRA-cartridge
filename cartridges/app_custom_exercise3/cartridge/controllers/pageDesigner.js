'use strict';

var server = require('server');


server.get('Start', function (req, res, next) {

let PageMgr = require('dw/experience/PageMgr');

    let page = PageMgr.getPage('assignmentnew')

    if (page.hasVisibilityRules()) {
        if (page.isVisible())
            res.print(PageMgr.renderPage(page.ID, 'assignmentnew'))
     }
     else{
             res.print(PageMgr.renderPage(page.ID, 'assignmentnew'));
     }

     next();

});

module.exports = server.exports();