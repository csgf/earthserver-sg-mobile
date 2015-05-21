/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
///Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WcsDescribeCoverage.js
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

var rangeType = Ti.XML.Element;
rangeType = win.xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);

//create the tableView
var tblCoverageRange = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 90,*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor		
});

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
			height : Ti.UI.SIZE
		});
		row.add(titleRow);
		row.add(descriptionRow);
		sectionBands.add(row);
	};
};

//finally, set the data property of the tableView to our sections
tblCoverageRange.data = [sectionBands];

win.add(tblCoverageRange);

//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
	win.remove(tblCoverageRange);
};
