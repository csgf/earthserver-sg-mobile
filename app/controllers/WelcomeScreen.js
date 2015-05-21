Ti.UI.setBackgroundColor("#fff");

$.welcomeSwitch.value = Ti.App.Properties.getBool("welcome_screen", true);


function signIn() {
	$.WelcomeScreen.close();
	$.WelcomeScreen.fireEvent("retrieveIdpList");
}

function register() {
	Ti.Platform.openURL("https://idpopen.garr.it/register");
}

function gotoESprojectSG() {
	Ti.Platform.openURL("https://earthserver-sg.consorzio-cometa.it/");
}

function gotoESproject() {
	Ti.Platform.openURL("http://www.earthserver.eu/");
}

function dismissWelcomeScreen(e) {
		Ti.App.Properties.setBool("welcome_screen", e.value);
}
Ti.App.Properties.setBool("welcome_screen", true);

if(OS_IOS)
	$.WelcomeScreen.top = "20dp";
$.WelcomeScreen.addEventListener('open', function() {
	if(OS_ANDROID){
		var actionBar;	
	    if (! $.WelcomeScreen.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.WelcomeScreen.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.WelcomeScreen.close();
	            };
	        };	        
	    };
	};
});