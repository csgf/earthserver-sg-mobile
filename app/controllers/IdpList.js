$.idpsTableView.data = arguments[0].data;
var navGroup = arguments[0].navGroup;
$.IdpList.parentWin = arguments[0].parentWin;

//Ti.Platform.osname

function openIdpLoginWindow(e) {
	
	var login_url = "https://gridp.garr.it/ds/WAYF?entityID="+ Alloy.Globals.gateway + "shibboleth&action=selection&origin=";
	//idpsListWindow.setTitle("Back");
	
	if (OS_IOS) {
		var idpLoginWindow = Alloy.createController("IdpLoginWindow", {url: login_url + e.row.origin, navGroup: navGroup}).getView();
		navGroup.openWindow(idpLoginWindow);
	} else {
		var idpLoginWindow = Alloy.createController("IdpLoginWindow", {url: login_url + e.row.origin, parentWin: $.IdpList, title : e.row.name}).getView();
		idpLoginWindow.fullscreen = false;
		idpLoginWindow.open();
	}
	//alert(JSON.stringify(e.row));
	idpLoginWindow.setTitle(e.row.name);
	idpLoginWindow.backButtonTitle = 'Back';
	//loginWindow.leftNavButton = Titanium.UI.createButton({title:'Back'});
	//Ti.API.info(e.row.origin);
	
	
};

if(OS_ANDROID){
	var actionBar;	
	$.IdpList.addEventListener("open", function() {
	    if (! $.IdpList.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.IdpList.activity.actionBar;
	        if (actionBar) {
	            //actionBar.title = e.row.name;
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                Ti.API.info("Home icon clicked!");
	                $.IdpList.close();
	            };
	        };	
	    };
	});	
};