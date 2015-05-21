var url = arguments[0].url; // "http://earth.eo.esa.int/ml3/a550/2009/L3_ENV_MER_A550_m__20090101_GLOB_SI_ESA_9277x9277_-90+90+-180+180_0000.xml";

var net = require('net');

if(OS_ANDROID){
	$.WebViewer.addEventListener('open', function() {
		var actionBar;	
	    if (! $.WebViewer.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.WebViewer.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.WebViewer.close();
	            };
	        };	        
	    };
	});
};

$.pbar.show();
var xhr = Ti.Network.createHTTPClient({timeout: 3000});
xhr.onload = function() {
		Ti.API.info("redirect found");
		Ti.API.info(xhr.location);

		var redirectUrl = xhr.getResponseHeader("Location");
		Ti.API.info(redirectUrl);
		
		var urlTokens = url.split("/");
		var	filename = urlTokens[urlTokens.length-2];

		if (redirectUrl) {
			//$.pbar.show();
			download(redirectUrl, filename);
		} else {
			$.pbar.hide();
			$.wv.show();
			$.wv.data = xhr.responseData;
		}
};

xhr.ondatastream = function(e) {
		Ti.API.info(e.progress);
		$.pbar.value = e.progress;
};

xhr.onerror = function(e) {
	Ti.API.info(JSON.stringify(e));
	Ti.API.info(xhr.responseText);
	Ti.API.info(xhr.location);
	//Ti.API.info(xhr.responseData);

	alert("Please check your internet connectivity");
};

xhr.open('GET', url.replace(/\"/g,""));
//Ti.API.info("URL : " + url);
//Ti.API.info("cookie : " + net.shibCookie);
xhr.setRequestHeader("Cookie", net.shibCookie);
xhr.send();

function download(url, filename) {
	var xhr = Ti.Network.createHTTPClient({timeout: 10000});
	xhr.onload = function() {
		
		

		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
		//Ti.API.info(Ti.Filesystem.applicationDataDirectory);
		f.write(this.responseData);
		$.pbar.hide();
		Ti.API.info(Ti.Filesystem.applicationDataDirectory + filename);
		$.wv.show();
		$.wv.url = Ti.Filesystem.applicationDataDirectory + filename;
		
	};

	xhr.ondatastream = function(e) {
		Ti.API.info(e.progress);
		$.pbar.value = e.progress;
	};

	xhr.onerror = function(e) {
		Ti.API.info(JSON.stringify(e));
		Ti.API.info(xhr.responseText);
		Ti.API.info(xhr.location);
		//Ti.API.info(xhr.responseData);
		alert("Please check your internet connectivity");
	};


	xhr.open('GET', url);
	Ti.API.info("URL : " + url);
	Ti.API.info("cookie : " + net.shibCookie);
	xhr.setRequestHeader("Cookie", net.shibCookie);
	xhr.send();
}


//$.wv.evalJS("document.cookie='" + net.shibCookie + "';");
//$.wv.url = url;



