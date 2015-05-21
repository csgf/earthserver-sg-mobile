//var xmlData = arguments[0].xmlData;
var coverageId = arguments[0].coverageId;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.coverageInfoWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.coverageInfoWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.coverageInfoWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.coverageInfoWin.close();
	            };
	        };	        
	    };
	});	
};
$.coverageId.text = coverageId; //xmlData.documentElement.getElementsByTagName("CoverageSummary").item(arguments[0].rowID).getElementsByTagName("CoverageId").item(0).textContent;
$.coverageSubtype.text = "RectifieldGridCoverage"; //xmlData.documentElement.getElementsByTagName("CoverageSummary").item(arguments[0].rowID).getElementsByTagName("CoverageSubtype").item(0).textContent;
