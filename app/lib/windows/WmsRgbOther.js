/**
 * @author Francesco
 */

//Parent window = WmsBackground_addLayer.js
//reference the current window

var css = Ti.API.WxsCss;

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

//Create the tableView
var tblRGB = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : 272,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,*/
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor		
});

var sectionRGB = Ti.UI.createTableViewSection({
	headerTitle : 'Choose RGB color',
	//headerTitle : L('WmsRgbOther_section1')
});

//create a table row - R
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'rgb-row',
	//width : tblRGB.width,
	height : css.rowHeight,
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	text : 'R:',
	//text : L('WmsRgbOther_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	right : "10dp",
	//top : 10,
	height : css.titleHeight,
	//width : 30
});
//description row
var txtR = Ti.UI.createTextField({
	keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#336699',
	color : css.descriptionColor,
	//backgroundColor : '#B0C4DE',
	left : 45,
	right : "5dp",
	//top : 25,
	//width : 'auto',
	//width : row.width - 45,
	//height : css.titleHeight,
	hintText : L('WmsRgbOther_rgb_hintText')
});
row.add(titleRow);
row.add(txtR);
sectionRGB.add(row);

//create a table row - G
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'rgb-row',
	//width : tblRGB.width,
	height : css.rowHeight,
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	text : 'G:',
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	right : "10dp",
	//top : 10,
	height : css.titleHeight,
	//width : 30
});
//description row
var txtG = Ti.UI.createTextField({
	keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#336699',
	color : css.descriptionColor,
	//backgroundColor : '#B0C4DE',
	left : 45,
	right : "5dp",
	//top : 25,
	//width : 'auto',
	//width : row.width - 45,
	//height : css.titleHeight,
	hintText : L('WmsRgbOther_rgb_hintText')
});
row.add(titleRow);
row.add(txtG);
sectionRGB.add(row);

//create a table row - B
var row = Titanium.UI.createTableViewRow({
	hasChild : false,
	className : 'rgb-row',
	//width : tblRGB.width,
	height : css.rowHeight,
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	text : 'B:',
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	right : "10dp",
	//top : 10,
	height : css.titleHeight,
	//width : 30
});
//description row
var txtB = Ti.UI.createTextField({
	keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	//color : '#336699',
	color : css.descriptionColor,
	//backgroundColor : '#B0C4DE',
	left : 45,
	right : "5dp",
	//top : 25,
	//width : 'auto',
	//width : row.width - 45,
	//height : css.titleHeight,
	hintText : L('WmsRgbOther_rgb_hintText')
});
row.add(titleRow);
row.add(txtB);
sectionRGB.add(row);

tblRGB.data = [sectionRGB];
win.add(tblRGB);

win.addEventListener('blur', updateOtherRow);
function updateOtherRow() {  
	var rgbValue = '';
	var updatedRow = win.selectedRow;
	if ((txtR.value<0) || (txtG.value<0) || (txtB.value<0) || (txtR.value>255) || (txtG.value>255) || (txtB.value>255)) {
		alert(L('WmsRgbOther_ErrorMessage'));
		//return;
	} else {
		var r = parseInt(txtR.value);
		var stringHexR = r.toString(16);
		var g = parseInt(txtG.value);
		var stringHexG = g.toString(16);
		var b = parseInt(txtB.value);
		var stringHexB = b.toString(16);
		rgbValue = '0x' + stringHexR.toUpperCase() + stringHexG.toUpperCase() + stringHexB.toUpperCase();
		updatedRow.children[1].text = rgbValue;		
	};
};
