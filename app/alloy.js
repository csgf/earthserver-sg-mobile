// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//Alloy.Globals.gateway = "https://aginfra-sg.ct.infn.it/";
Alloy.Globals.gateway = "https://earthserver-sg.consorzio-cometa.it/";
//Alloy.Globals.repository = 'deroberto2';
Alloy.Globals.repository = 'ESArep';
//Alloy.Globals.type = 'Demo';

//Alloy.Globals.gateway = "https://indicate-gw.consorzio-cometa.it/";
Alloy.Globals.Map = require('ti.map');

Alloy.Globals.debug_mode = false; // show console logs

Ti.API.WxsCss = {
	titleColor : "#000",
	titleFontSize : "16sp",
	descriptionColor : "#838383",
	descriptionFontSize : "12sp",
	bcTvColor : "transparent",
	bcTvRowColor : "#fff",
	separatorColor : OS_IOS ? "transparent" : "gray",
	rowHeight : "50dp",
	titleHeight  : "20dp",
	descriptionHeight : "20dp"
};

if (OS_ANDROID) {
    // Monkey patched to fix bug in throttle function on Titanium (3.1.3)
    // Android.
	getTime = (Date.now || function () {
      return new Date().getTime();
    });
    
    _.throttle = function (func, wait, options) {
      var context, args, result, timeout, previous, later;
      timeout = null;
      previous = 0;
      options = options || {};

      later = function () {
        previous = options.leading === false ? 0 : getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };

      return function () {
        var now, remaining;
        now = getTime();

        if (!previous && options.leading === false) {
          previous = now;
        }

        remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;

        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }

        return result;
      };
    };
  }