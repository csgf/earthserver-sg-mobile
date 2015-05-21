var css = Ti.API.WxsCss;

var xmlText = arguments[0].xmlText;

var xmlData = Titanium.XML.parseString(xmlText);
$.coverageId.text = xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent;
$.coverageType.text = xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.DescribeCoverageWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.DescribeCoverageWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.DescribeCoverageWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.DescribeCoverageWin.close();
	            };
	        };	        
	    };
	});	
};

var showCoverageEnvelope = function(){
	if(OS_IOS){
		var coverageEnvelopeWin = Alloy.createController("meeo/CoverageEnvelopeWin", {
			navWin: navWin,
			xmlData : xmlData
		}).getView();
		navWin.openWindow(coverageEnvelopeWin);
	}else{
		var coverageEnvelopeWin = Alloy.createController("/meeo/CoverageEnvelopeWin",{
			xmlData : xmlData
		}).getView();
		coverageEnvelopeWin.open();
	};	
};

var showCoverageDomain = function(){
	if(OS_IOS){
		var coverageDomainWin = Alloy.createController("meeo/CoverageDomainWin", {
			navWin: navWin,
			xmlData : xmlData
		}).getView();
		navWin.openWindow(coverageDomainWin);
	}else{
		var coverageDomainWin = Alloy.createController("/meeo/CoverageDomainWin",{
			xmlData : xmlData
		}).getView();
		coverageDomainWin.open();
	};	
};

var showCoverageRange = function(){
	if(OS_IOS){
		var coverageRangeWin = Alloy.createController("meeo/CoverageRangeWin", {
			navWin: navWin,
			xmlData : xmlData
		}).getView();
		navWin.openWindow(coverageRangeWin);
	}else{
		var coverageRangeWin = Alloy.createController("/meeo/CoverageRangeWin",{
			xmlData : xmlData
		}).getView();
		coverageRangeWin.open();
	};	
};


