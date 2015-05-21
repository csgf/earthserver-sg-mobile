var css = Ti.API.WxsCss;
var xmlData = arguments[0].xmlData;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.ViewXmlWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.ViewXmlWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.ViewXmlWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.ViewXmlWin.close();
	            };
	        };	        
	    };
	});	
};

//title label
$.xmlTxa.applyProperties({
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.titleColor,
	backgroundColor : css.bcTvRowColor,
	left : 5,
	right : 5,
	top : 0,
	bottom : 0,
	autocorrect: false,
	editable: false,
	value : Titanium.XML.serializeToString(xmlData)
});