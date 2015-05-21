var firstLoad = true;

var net = require('net');

var idpUrl = arguments[0].url;
if (OS_IOS) {
	var loginWindow = arguments[0].navGroup;//.parentWin;
} else {
	$.IdpLoginWindow.parentWin = arguments[0].parentWin;
	var title = arguments[0].title;
}

$.IdpLoginWindow.addEventListener('open', function() {
	if (net.loggedIn) {
		//alert("eseguo logout");
		//$.wv.hide();
		$.wv.url = Alloy.Globals.gateway + "/c/portal/logout";
		$.wv.addEventListener('load', function(e) {
			net.loggedIn = false;
			$.wv.removeEventListener('load', arguments.callee);
			Ti.API.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!in load: " + e.url);
			
			setTimeout(function() {
				$.wv.addEventListener('load', authenticate);
				//alert("url: " + idpUrl);
				$.wv.url = idpUrl;
				
			}, 500);

		});
		//$.wv.url = e.url;

	} else {
		$.wv.addEventListener('load', authenticate);
		$.wv.url = idpUrl;
	}

});

$.IdpLoginWindow.addEventListener('close', function() {
	$.wv.removeEventListener('load', authenticate);
});

if(OS_ANDROID){
	var actionBar;	
	$.IdpLoginWindow.addEventListener("open", function() {
	    if (! $.IdpLoginWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.IdpLoginWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.title = title;
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                Ti.API.info("Home icon clicked!");
	                $.IdpLoginWindow.close();
	            };
	        };	
	    };
	});	
};

function hideWv(e) {
	//alert("prima di load");
	//$.activityIndicator.show();
	$.wv.hide();
}

function authenticate(e) {

	//Ti.API.info("into load event");
	//Ti.API.info("Call to authenticate function");
	Ti.API.info("Loaded: " + e.url);

	$.wv.show();
	//Ti.API.info(JSON.stringify(wv.getCookiesForURL(e.url)));
	//loadingInd.hide();
	// log the user out

	var net = require('net');
	Ti.API.info("firstLoad: " + firstLoad);
	Ti.API.info("net.loggedId: " + net.loggedIn);
	Ti.API.info("net.shibCookie: " + net.shibCookie);
	if (firstLoad || net.loggedIn) {

		//alert(firstLoad + ":" + net.shibCookie);
		//Ti.API.info("logging out before logging in: " + net.shibCookie);
		//$.wv.evalJS("document.cookie=" + net.shibCookie + "'; expires=Thu, 01-Jan-70 00:00:01 GMT;';");
		//Ti.API.info(wv.evalJS("document.cookie"));
		//net.shibCookie == "";
		//Ti.App.Properties.setString("shibCookie", "");
		firstLoad = false;
		return;
	} else {
		
		//alert(net.shibCookie);
		Ti.API.info('check cookies');
		var raw_cookies = $.wv.evalJS("document.cookie");
		Ti.API.info("cookie: " + raw_cookies);
		if(!raw_cookies){
			return;
		};
		if (raw_cookies.indexOf("_shibsession_") != -1) {
			Ti.API.info("ho trovato shibsession");
			var cookies = raw_cookies.split(";");
			for ( i = 0; i <= cookies.length - 1; i++) {
				Ti.API.info("cookie -> " + cookies[i]);
				if (cookies[i].indexOf("_shibsession_") != -1) {
					var shibCookie = cookies[i];
					Ti.API.info("Shibboleth Session:" + shibCookie);
					Ti.App.Properties.setString("shibCookie", shibCookie);
					net.shibCookie = shibCookie;

					//net.setCookie(shibCookie);
					//loginSplitWindow.close();
					var net = require('net');
					var loginUrl = Alloy.Globals.gateway + "api/login/";
					Ti.API.info("login URL: " + loginUrl);
					net.apiCall(loginUrl, function(response) {
						if (OS_IOS) {
							loginWindow.close();
						} else {
							$.IdpLoginWindow.parentWin.parentWin.close();
							$.IdpLoginWindow.parentWin.close();
							$.IdpLoginWindow.close();
						}
						//$.wv.evalJS("document.cookie="+shibCookie+"'; expires=Thu, 01-Jan-70 00:00:01 GMT;';");

						//$.wv.evalJS('document.cookie = "' + shibCookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";');

						Ti.API.info("logged in");
						//Ti.API.info($.wv.evalJS("document.cookie"));
						//$.wv = null;

						net.loggedIn = true;

						net.lastLogin = Ti.App.Properties.setDouble("lastLogin", new Date().getTime());

						//alert("logged as " + response.cn);
						var currentUser = response.cn;
						net.username = Ti.App.Properties.setString("username", currentUser);
						//userInfoLabel.text = "Logged as: "  + response.cn;
						//Ti.App.Properties.setString("username", currentUser);
						Ti.App.fireEvent("loggedIn", {username: currentUser});
						//Ti.App.fireEvent("set:login", {
						//	username : currentUser
						//});
						Ti.API.info(currentUser);
					});

					//mainSplitWindow.open();
					//populateRepos();
					break;
				}
			}
		}
	}
}