var css = Ti.API.WxsCss;

var xmlData = arguments[0].xmlData;
var domainSet = xmlData.documentElement.getElementsByTagName("domainSet").item(0);

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.CoverageDomainWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.CoverageDomainWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.CoverageDomainWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.CoverageDomainWin.close();
	            };
	        };	        
	    };
	});	
};

// GridEnvelop Section
$.dimension.text = domainSet.getElementsByTagName("RectifiedGrid").item(0).getAttribute("dimension");
$.axisLabel.text = domainSet.getElementsByTagName("axisLabels").item(0).textContent.replace(/ /g, "\n");
$.lowerLimit.text = domainSet.getElementsByTagName("low").item(0).textContent.replace(/ /g, "\n");
$.upperLimit.text = domainSet.getElementsByTagName("high").item(0).textContent.replace(/ /g, "\n");

//Offsets Section
var offsets = Ti.XML.Node;
offsets = domainSet.getElementsByTagName("gml:offsetVector");
if (offsets != null) {
	Ti.API.info("WcsCoverageDomain.js - offsets.length: " + offsets.length);
	//loop each offset in the domain set
	for (var i = 0; i < offsets.length; i++) {

		//create a table row
		var row = Titanium.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild : false,
			backgroundColor : css.bcTvRowColor,
			className : 'domainSet-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			//text : 'SRS name',
			text : L('WcsCoverageDomain_row5_title'),
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
			text : offsets.item(i).getAttribute("srsName"),
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
		$.sectionOffsets.add(row);

		//create a table row
		var row = Titanium.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild : false,
			backgroundColor : css.bcTvRowColor,
			className : 'domainSet-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			//text : 'Offset',
			text : L('WcsCoverageDomain_row6_title'),
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
		str = offsets.item(i).textContent;
		//str = str.replace(" ", "\n");
		var numbersArray = [];
		numbersArray = str.split(" ");
		str = "";
		for (var j = 0; j < numbersArray.length; j++) {
			str += parseFloat(numbersArray[j]).toFixed(6) + "\n";
		};
		str = str.substr(0, str.length - 1);
		//description row
		var descriptionRow = Titanium.UI.createLabel({
			text : str,
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
		$.sectionOffsets.add(row);
	}
};

// Origin Section
var origin = Ti.XML.Element;

origin = domainSet.getElementsByTagName("gml:origin").item(0);
$.srsName.text = origin.getElementsByTagName("gml:Point").item(0).getAttribute("srsName");

var str = origin.getElementsByTagName("gml:Point").item(0).getElementsByTagName("gml:pos").item(0).textContent;
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
};
str = str.substr(0, str.length - 1);
$.position.text = str;