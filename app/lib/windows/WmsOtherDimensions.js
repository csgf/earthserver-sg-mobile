/**
 * @author Francesco
 */

//Parent window = LayerMetadata.js
//reference the current window
var win = Titanium.UI.currentWindow;

var css = Ti.API.WxsCss;

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

var dimensionItem = Ti.XML.Element;
dimensionItem = win.xmlItem;

var str = '';

//Create the tableView
var tblDimension = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,*/
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor	
});

var sectionDimensionAttribute = Ti.UI.createTableViewSection({
	//headerTitle : 'Dimension attribute'
	headerTitle : L('WmsOtherDimensions_section1_title')
});

//create a Name row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Name',
	text : L('WmsOtherDimensions_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : dimensionItem.getAttribute("name"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Units row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Units',
	text : L('WmsOtherDimensions_row2_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : dimensionItem.getAttribute("units"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Unit symbol row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Unit symbol',
	text : L('WmsOtherDimensions_row3_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : dimensionItem.getAttribute("unitSymbol"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Default value row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Default value',
	text : L('WmsOtherDimensions_row4_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : dimensionItem.getAttribute("default"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Multiple values allowed row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Multiple values allowed',
	text : L('WmsOtherDimensions_row5_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
str = L('string_no');
if (dimensionItem.getAttribute("multipleValues") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Nearest value row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Nearest value',
	text : L('WmsOtherDimensions_row6_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
str = L('string_no');
if (dimensionItem.getAttribute("nearestValue") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

//create a Current allowed row
var row = Titanium.UI.createTableViewRow({
	//width : tblDimension.width,
	//height : 90,
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvRowColor,
	hasChild : false,
	className : 'DimensionAttribute-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Current allowed',
	text : L('WmsOtherDimensions_row7_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right  :"10dp"
});
//description row
str = L('string_no');
if (dimensionItem.getAttribute("current") === '1') {
	str = L('string_yes');
};
var descriptionRow = Titanium.UI.createLabel({
	text : str, 
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : "5dp",
	right : "10dp",
	//width : row.width - 20,
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionDimensionAttribute.add(row);

var sectionValues = Ti.UI.createTableViewSection({
	//headerTitle : 'Values'
	headerTitle : L('WmsOtherDimensions_section2_title')
});

var values = dimensionItem.textContent.split(',');
for (var i = 0; i < values.length; i++) {
	//create a Value row
	var row = Titanium.UI.createTableViewRow({
		minRowHeight : css.rowHeight,
		backgroundColor : css.bcTvRowColor,
		//width : tblDimension.width,
		//height : 90,
		hasChild : false,
		className : 'Values-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Value',
		text : String.format(L('WmsOtherDimensions_row_title'), i.toString()),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		//width : row.width - 20,
		right  :"10dp"
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : values[i],
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#fff',
		color : css.descriptionColor,
		left : 10,
		top : "25dp",
		bottom : "5dp",
		right : "10dp",
		//width : row.width - 20,
		height : Ti.UI.SIZE
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionValues.add(row);
};

var sectionRanges = Ti.UI.createTableViewSection({
	//headerTitle : 'Ranges'
	headerTitle : L('WmsOtherDimensions_section3_title')
});

tblDimension.data = [sectionDimensionAttribute, sectionValues, sectionRanges];
win.add(tblDimension);
