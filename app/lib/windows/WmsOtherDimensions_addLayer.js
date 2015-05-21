/**
 * @author Francesco
 */

//Parent window = WmsGetMap.js
//reference the current window

var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var lastSelectedRow = '';

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

var sectionValues = Ti.UI.createTableViewSection({
	//headerTitle : 'Values'
	headerTitle : L('WmsOtherDimensions_section2_title')
});

var values = dimensionItem.textContent.split(',');
for (var i = 0; i < values.length; i++) {
	//create a Value row
	var row = Titanium.UI.createTableViewRow({
		//width : tblDimension.width,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
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
		right  :"10dp",
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : values[i],
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		top : "25dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/check.png',
		width : 48,
		height : 48,
		right : 10,
		//top : 20,
		visible : false
	});
	row.add(iconImage);
	
	sectionValues.add(row);
};

tblDimension.addEventListener('click', function(e) {
	if (lastSelectedRow == '') {
		lastSelectedRow = e.row;
	} else if (lastSelectedRow.children[0].text != e.row.children[0].text) {
		lastSelectedRow.children[2].visible = false;
		lastSelectedRow = e.row;
	};
	e.row.children[2].visible = !e.row.children[2].visible;
});

tblDimension.data = [sectionValues];
win.add(tblDimension);

win.addEventListener('blur', updateDimensionRow);
function updateDimensionRow() {  
	var isCheched = false;
	var updatedRow = win.selectedRow;
	for (var i = 0; i < tblDimension.data[0].rowCount; i++) {
		if (tblDimension.data[0].rows[i].children[2].visible == true) {
			updatedRow.children[1].text = tblDimension.data[0].rows[i].children[1].text;
			//return;
			isCheched = true;
		};	
	};
	if (isCheched == false) {
		updatedRow.children[1].text = '';
	};
};
