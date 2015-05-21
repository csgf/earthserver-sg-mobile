/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WmsServer.js
//reference the current window
var win = Titanium.UI.currentWindow;

/*if(OS_IOS){
	var btnBack = Ti.UI.createButton({
		//title: 'back'
		title: L('NavButton_back')
	});
	win.leftNavButton = btnBack; 
	btnBack.addEventListener('click', function() {
		win.close();
	});
};*/

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
	url : '/windows/WmsBoundingBox.js',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png',
	//xml : win.xml
});
win1.padre = win.padre;
if(OS_ANDROID){
	win1.addEventListener('open', function() {
		var actionBar;	
	    if (! win1.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win1.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win1.close();
	            };
	        };	        
	    };
	});	
};


var win2 = Titanium.UI.createWindow({
	url : '/windows/WmsOtherDimensions.js',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
	//xml : win.xml
});
win2.padre = win.padre;
if(OS_ANDROID){
	win2.addEventListener('open', function() {
		var actionBar;	
	    if (! win2.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win2.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win2.close();
	            };
	        };	        
	    };
	});	
};

var win3 = Titanium.UI.createWindow({
	url : '/windows/WmsStyle.js',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
	//xml : win.xml
});
win3.padre = win.padre;
if(OS_ANDROID){
	win3.addEventListener('open', function() {
		var actionBar;	
	    if (! win3.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win3.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win3.close();
	            };
	        };	        
	    };
	});	
};

var str = '';
var layer = Ti.XML.Element;
layer = win.xml.documentElement.getElementsByTagName("Layer").item(win.rowID - 1);

//Create the tableView
var tblLayer = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	minRowHeight : 90,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2*/
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor	
});

var sectionLayerAttributes = Ti.UI.createTableViewSection({
	//headerTitle : 'Layer Attributes'
	headerTitle : L('LayerMetadata_section1_title')
});

//create a Queryable row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//width : tblLayer.width,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Queryable',
	text : L('LayerMetadata_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = L('string_no');
if (layer.getAttribute("queryable") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

//create a Opaque row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Opaque',
	text : L('LayerMetadata_row2_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = L('string_no');
if (layer.getAttribute("opaque") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

//create a No Subsets row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'No Subsets',
	text : L('LayerMetadata_row3_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = L('string_no');
if (layer.getAttribute("noSubsets") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

//create a Cascade row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Cascade',
	text : L('LayerMetadata_row4_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = L('string_no');
if (layer.getAttribute("cascade") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

//create a Fixed width row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Fixed width',
	text : L('LayerMetadata_row5_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getAttribute("fixedWidth"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

//create a Fixed heigth row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'LayerAttributes-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Fixed heigth',
	text : L('LayerMetadata_row6_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getAttribute("fixedHeigth"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerAttributes.add(row);

var sectionLayerInfo = Ti.UI.createTableViewSection({
	//headerTitle : 'Layer info'
	headerTitle : L('LayerMetadata_section2_title')
});

//create a Name row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Name',
	text : L('LayerMetadata_row7_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("Name").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Title row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Title',
	text : L('LayerMetadata_row8_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("Title").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Abstract row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Abstract',
	text : L('LayerMetadata_row9_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = '';
if (layer.getElementsByTagName("Abstract").item(0) != null) {
	str = layer.getElementsByTagName("Abstract").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Keywords row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Keywords',
	text : L('LayerMetadata_row10_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : layer.getElementsByTagName("KeywordList").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
str = '';
if (layer.getElementsByTagName("KeywordList").item(0) != null) {
	//loop each keyword in the xml
	for (var i = 0; i < layer.getElementsByTagName("KeywordList").item(0).getElementsByTagName("Keyword").length; i++) {
		str += layer.getElementsByTagName("KeywordList").item(0).getElementsByTagName("Keyword").item(i).textContent + "\n";
	}
};
str = str.substr(0, str.length - 1);
descriptionRow.text = str;
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Available CRSes row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Available CRSes',
	text : L('LayerMetadata_row11_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : layer.getElementsByTagName("CRS").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});

str = '';
if (layer.getElementsByTagName("CRS").item(0) != null) {	//Da rivedere, prende anche tutti i tag CRS figli ??????
	/*Da sistemare
	var layersLen = function() {
	 
		Titanium.API.info("LayerMetadata - DENTRO layersLen - PRIMA DI length");
		var n = win.xml.documentElement.getElementsByTagName("Layer").length;
		Titanium.API.info("LayerMetadata - DENTRO layersLen - DOPO DI length");
		alert(n);
	 
	};
	Titanium.API.info("LayerMetadata - DOPO DI layersLen");
	alert(layersLen);
	*/
	//loop each keyword in the xml
	for (var i = 0; i < layer.getElementsByTagName("CRS").length; i++) {
		//Titanium.API.info("LayerMetadata - layer.getElementsByTagName(\"CRS\").item(i).TEXT_NODE: " + layer.getElementsByTagName("CRS").item(i).TEXT_NODE);
		//Titanium.API.info("LayerMetadata - layer.getElementsByTagName(\"CRS\").item(i).parentNode.firstChild.nodeValue: " + layer.getElementsByTagName("CRS").item(i).parentNode.firstChild.nodeValue);
		//Titanium.API.info("LayerMetadata - layer.getElementsByTagName(\"CRS\").item(i).hasChildNodes: " + layer.getElementsByTagName("CRS").item(i).hasChildNodes());
		
		str += layer.getElementsByTagName("CRS").item(i).textContent + "\n";
	}
};
descriptionRow.text = str;
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Min scale denominator row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Min scale denominator',
	text : L('LayerMetadata_row12_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = '';
if (layer.getElementsByTagName("MinScaleDenominator").item(0) != null) {
	str = layer.getElementsByTagName("MinScaleDenominator").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

//create a Max scale denominator row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	//className : 'LayerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Max scale denominator',
	text : L('LayerMetadata_row13_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
str = '';
if (layer.getElementsByTagName("MaxScaleDenominator").item(0) != null) {
	str = layer.getElementsByTagName("MaxScaleDenominator").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionLayerInfo.add(row);

var sectionCoveredArea = Ti.UI.createTableViewSection({
	//headerTitle : 'Covered area'
	headerTitle : L('LayerMetadata_section3_title')
});

//create a West Longitude row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'CoveredArea-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'West Longitude',
	text : L('LayerMetadata_row14_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("westBoundLongitude").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionCoveredArea.add(row);

//create a East Longitude row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'CoveredArea-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'East Longitude',
	text : L('LayerMetadata_row15_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("eastBoundLongitude").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionCoveredArea.add(row);

//create a South Latitude row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'CoveredArea-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'South Latitude',
	text : L('LayerMetadata_row16_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("southBoundLatitude").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionCoveredArea.add(row);

//create a North Latitude row
var row = Titanium.UI.createTableViewRow({
	backgroundColor : css.bcTvRowColor,
	//height : 90,
	hasChild : false,
	className : 'CoveredArea-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'North Latitude',
	text : L('LayerMetadata_row17_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : "5dp",//(row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.getElementsByTagName("northBoundLatitude").item(0).textContent,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	//color : '#000',
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionCoveredArea.add(row);

var sectionGeographicDimensions = Ti.UI.createTableViewSection({
	//headerTitle : 'Geographic dimensions'
	headerTitle : L('LayerMetadata_section4_title')
});

//loop each item in the xml
for (var i = 0; i < layer.getElementsByTagName("BoundingBox").length; i++) {
	//create a Bounding box row
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		//width : tblLayer.width,
		//height : 90,
		height : css.rowHeight,
		hasChild : true,
		className : 'GeographicDimensions-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("BoundingBox").item(i).getAttribute("CRS"),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		//top : (row.height - 22) / 2,
		height : css.titleHeight,
		//width : row.width
	});
	row.boundingBoxItem = i;
	row.add(titleRow);
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	//row.add(iconImage);
	sectionGeographicDimensions.add(row);
}

var sectionOtherDimensions = Ti.UI.createTableViewSection({
	//headerTitle : 'Other dimensions'
	headerTitle : L('LayerMetadata_section5_title')
});

//loop each item in the xml
for (var i = 0; i < layer.getElementsByTagName("Dimension").length; i++) {
	//create a Dimension row
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		//width : tblLayer.width,
		height : css.rowHeight,
		hasChild : true,
		className : 'Dimensions-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("Dimension").item(i).getAttribute("name"),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		//top : (row.height - 22) / 2,
		height : css.titleHeight,
		width : row.width
	});
	row.dimensionItem = i;
	row.add(titleRow);
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	//row.add(iconImage);
	sectionOtherDimensions.add(row);
};

var sectionStyles = Ti.UI.createTableViewSection({
	//headerTitle : 'Styles'
	headerTitle : L('LayerMetadata_section6_title')
});

//loop each item in the xml
for (var i = 0; i < layer.getElementsByTagName("Style").length; i++) {

	//create a Style row
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		//width : tblLayer.width,
		height : css.rowHeight,
		hasChild : true,
		className : 'Dimensions-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("Style").item(i).getAttribute("name"),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		//top : (row.height - 22) / 2,
		height : css.titleHeight,
		width : row.width
	});
	row.styleItem = i;
	row.add(titleRow);
	sectionStyles.add(row);
};

tblLayer.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.row.boundingBoxItem != null) {
		//alert("row.boundingBoxItem = " + e.row.boundingBoxItem);
		win1.xmlItem = layer.getElementsByTagName("BoundingBox").item(e.row.boundingBoxItem);
		win1.title = layer.getElementsByTagName("BoundingBox").item(e.row.boundingBoxItem).getAttribute("CRS");
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else if (e.row.dimensionItem != null) {
		win2.xmlItem = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem);
		win2.title = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem).getAttribute("name");
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	} else if (e.row.styleItem != null) {
		win3.xmlItem = layer.getElementsByTagName("Style").item(e.row.styleItem);
		win3.title = layer.getElementsByTagName("Style").item(e.row.styleItem).getElementsByTagName("Name").item(0).textContent;
		if (Ti.App.isAndroid == true) {
			win3.open();
		} else {
			win.padre.openWindow(win3);	
		};
	};
});

tblLayer.data = [sectionLayerAttributes, sectionLayerInfo, sectionCoveredArea, sectionGeographicDimensions, sectionOtherDimensions, sectionStyles];
win.add(tblLayer);

var layersLen = function() {
 
	var parentLayer = Ti.XML.Element;
	parentLayer = win.xml.documentElement.getElementsByTagName("Layer").item(0);
	var numCrsParentLayerTot = parentLayer.getElementsByTagName("CRS").length;

	var numCrsChildrenLayer = 0;
	//layer = win.xml.documentElement.getElementsByTagName("Layer").item(win.rowID - 1);

	//loop each keyword in the xml
	for (var i = 1; i < win.xml.documentElement.getElementsByTagName("Layer").length; i++) {
		numCrsChildrenLayer += win.xml.documentElement.getElementsByTagName("Layer").item(i).getElementsByTagName("CRS").length;		
	}
	var numCrsParentLayer =  numCrsParentLayerTot - numCrsChildrenLayer;
	Titanium.API.info("LayerMetadata - DENTRO layersLen - numCrsParentLayer: " + numCrsParentLayer);
	alert(numCrsParentLayer);
	/*
	Titanium.API.info("LayerMetadata - DENTRO layersLen - PRIMA DI length");
	var n = win.xml.documentElement.getElementsByTagName("Layer").length;
	Titanium.API.info("LayerMetadata - DENTRO layersLen - DOPO DI length");
	alert(n);
	return n;
	*/
 
};
