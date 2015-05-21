if(OS_ANDROID){	
	$.wv.applyProperties({scalesPageToFit:true, enableZoomControls:false});
	$.creditsWindow.addEventListener('open', function() {
		var actionBar;	
	    if (! $.creditsWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.creditsWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	              	$.creditsWindow.close();
	            };
	        };	        
	    };
	});
};

// InfoWin
var infoWin = Ti.UI.createWindow();
var wv = Ti.UI.createWebView();
infoWin.add(wv);

if(OS_ANDROID){
	wv.applyProperties({scalesPageToFit:true, enableZoomControls:false});
	infoWin.addEventListener('open', function() {
		var actionBar;	
	    if (! infoWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = infoWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	              	infoWin.close();
	            };
	        };	        
	    };
	});
};
		
var openInfoWin = function(e){
	infoWin.applyProperties({
		title : e.row.text
	});
	wv.applyProperties({
		url : e.row.name
	});
	if(OS_IOS){
		$.creditsWindow.navGroup.openWindow(infoWin);
	}else{
		infoWin.open();	
	};
};