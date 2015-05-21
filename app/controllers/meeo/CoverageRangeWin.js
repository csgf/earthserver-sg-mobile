var css = Ti.API.WxsCss;

var xmlData = arguments[0].xmlData;
var rangeType = Ti.XML.Element;
rangeType = xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.CoverageRangeWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.CoverageRangeWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.CoverageRangeWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.CoverageRangeWin.close();
	            };
	        };	        
	    };
	});	
};

var sectionBands = Ti.UI.createTableViewSection({
	//headerTitle : 'Bands'
	headerTitle : L('WcsCoverageRange_section1_title')
});

if (rangeType.getElementsByTagName("swe:field") != null) {
	//loop each offset in the domain set
	for (var i = 0; i < rangeType.getElementsByTagName("swe:field").length; i++) {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild : false,
			backgroundColor : css.bcTvRowColor,
			className : 'bands-row'
		});		
		//title row
		var titleRow = Titanium.UI.createLabel({
			//text : 'Band-i',
			text : String.format(L('WcsCoverageRange_row1_title'), i.toString()),
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'bold'
			},
			color : css.titleColor,
			left : 10,
			top : 5,
			height : css.titleHeight,
			right : "10dp"
		});
		//description row
		var descriptionRow = Titanium.UI.createLabel({
			text : rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
			font : {
				fontSize : css.descriptionFontSize,
				fontWeight : 'normal'
			},
			color : css.descriptionColor,
			left : 10,
			top : "25dp",
			bottom : 5,
			right : "10dp", //width : row.width - 20,
			height : Ti.UI.SIZE,
			zIndex : 1 
		});
		row.add(titleRow);
		row.add(descriptionRow);
		sectionBands.add(row);
	};
};

//finally, set the data property of the tableView to our sections
$.rangeTv.appendSection([sectionBands]);