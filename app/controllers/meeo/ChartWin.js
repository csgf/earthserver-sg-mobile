var chartData = arguments[0].chartData;

if(OS_IOS){
	var navWin = arguments[0].navWin;	
};
if(OS_ANDROID){
	$.chartWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.chartWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.chartWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.chartWin.close();
	            };
	        };	        
	    };
	});	
};

$.wv.addEventListener("load", function(){
	Ti.API.info("ChartWin loaded");
	$.wv.evalJS("createChart('" + JSON.stringify(chartData) + "');");
});

/*
if(OS_ANDROID){
	$.wv.addEventListener("doubletap", function(){
		Ti.API.info("doupletap");
	});
	$.wv.addEventListener("dblclick", function(){
		Ti.API.info("dblclick");
	});
};
*/