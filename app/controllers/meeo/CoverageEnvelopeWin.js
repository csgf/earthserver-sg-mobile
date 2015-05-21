var css = Ti.API.WxsCss;

var xmlData = arguments[0].xmlData;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.CoverageEnvelopeWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.CoverageEnvelopeWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.CoverageEnvelopeWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.CoverageEnvelopeWin.close();
	            };
	        };	        
	    };
	});	
};

$.srsName.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("srsName");
$.srsDomain.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("srsDimension");
$.axisLabel.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("axisLabels").replace(/ /g, "\n");
$.axisUoms.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("uomLabels").replace(/ /g, "\n");

var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
};
str = str.substr(0, str.length - 1);
$.lowerCorner.text = str;

var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
//str = str.replace(" ", "\n");
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
};
str = str.substr(0, str.length - 1);
$.upperCorner.text = str;

if(Alloy.Globals.debug_mode){
	Ti.API.info($.srsName.text);
	Ti.API.info($.srsName.text);
	Ti.API.info($.srsDomain.text);
	Ti.API.info($.axisLabel.text);
	Ti.API.info($.axisUoms.text);
	Ti.API.info($.lowerCorner.text);
	Ti.API.info($.upperCorner.text);
};
