requirejs.config({
    enforceDefine: false,
    //urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
            'http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min',
            "libs/jquery-1.9.1.min"
        ],
        mustache: [
            'http://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min',
            'libs/mustache'
        ],
        apps: [
            'apps'
        ]
    }
});
require(['apps','mustache'], function(app) {
  //console.log("loading app.");
});
