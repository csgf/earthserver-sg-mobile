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

var boundingBoxItem = Ti.XML.Element;
boundingBoxItem = win.xmlItem;

//Create the tableView
var tblBox = Titanium.UI.createTableView({
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

var sectionBoundingBox = Ti.UI.createTableViewSection({
	//headerTitle : 'Bounding Box'
	headerTitle : L('WmsBoundingBox_section1_title')
});

//create a Minimun X row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Minimun X',
	text : L('WmsBoundingBox_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("minx"),
	//text : Ti.Math.parseFloat(boundingBoxItem.getAttribute("minx")).toFixed(6),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a Minimun Y row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Minimun Y',
	text : L('WmsBoundingBox_row2_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("miny"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a Maximun X row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Maximun X',
	text : L('WmsBoundingBox_row3_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("maxx"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

//create a Maximun Y row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Maximun Y',
	text : L('WmsBoundingBox_row4_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("maxy"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionBoundingBox.add(row);

var sectionResolution = Ti.UI.createTableViewSection({
	//headerTitle : 'Resolution'
	headerTitle : L('WmsBoundingBox_section2_title')
});

//create a Resolution X row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Resolution X',
	text : L('WmsBoundingBox_row5_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("resx"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionResolution.add(row);

//create a Resolution Y row
var row = Titanium.UI.createTableViewRow({
	//width : tblBox.width,
	//height : 90,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'BoundingBox-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Resolution Y',
	text : L('WmsBoundingBox_row6_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	//width : row.width - 20,
	right : "10dp"
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : boundingBoxItem.getAttribute("resy"),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#fff',
	color : css.descriptionColor,
	left : 10,
	bottom : 5,
	//width : row.width - 20,
	height : css.descriptionHeight,
	right : "10dp"
});
row.add(titleRow);
row.add(descriptionRow);
sectionResolution.add(row);

tblBox.data = [sectionBoundingBox, sectionResolution];
win.add(tblBox);
