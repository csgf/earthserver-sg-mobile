/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
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

//var xmlData = Ti.XML;
//xmlData = win.xmlData;
var domainSet = Ti.XML.Element;
domainSet = win.xmlData.documentElement.getElementsByTagName("gml:domainSet").item(0);

//Ti.API.info("WcsCoverageEnvelope.js - xmlData: " + xmlData);

//create the tableView
var tblCoverageDomain = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 90*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});

var str = "";

var sectionGridEnvelope = Ti.UI.createTableViewSection({
	//headerTitle : 'Grid Envelope'
	headerTitle : L('WcsCoverageDomain_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	height : Ti.UI.SIZE,
	hasChild : false,
	backgroundColor : css.bcTvRowColor,
	className : 'domainSet-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Dimensions',
	text : L('WcsCoverageDomain_row1_title'),
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
	text : domainSet.getElementsByTagName("gml:RectifiedGrid").item(0).getAttribute("dimension"),
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
sectionGridEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	height : Ti.UI.SIZE,
	hasChild : false,
	backgroundColor : css.bcTvRowColor,
	className : 'domainSet-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Axis labels',
	text : L('WcsCoverageDomain_row2_title'),
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
str = domainSet.getElementsByTagName("gml:axisLabels").item(0).textContent;
str = str.replace(/ /g, "\n");
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
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionGridEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	height : Ti.UI.SIZE,
	hasChild : false,
	backgroundColor : css.bcTvRowColor,
	className : 'domainSet-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Low limit',
	text : L('WcsCoverageDomain_row3_title'),
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
str = domainSet.getElementsByTagName("gml:low").item(0).textContent;
str = str.replace(/ /g, "\n");
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
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionGridEnvelope.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	height : Ti.UI.SIZE,
	hasChild : false,
	backgroundColor : css.bcTvRowColor,
	className : 'domainSet-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'High limit',
	text : L('WcsCoverageDomain_row4_title'),
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
str = domainSet.getElementsByTagName("gml:high").item(0).textContent;
str = str.replace(/ /g, "\n");
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
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionGridEnvelope.add(row);

var sectionOffsets = Ti.UI.createTableViewSection({
	//headerTitle : 'Offsets'
	headerTitle : L('WcsCoverageDomain_section2_title')
});

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
			height : Ti.UI.SIZE
		});
		row.add(titleRow);
		row.add(descriptionRow);
		sectionOffsets.add(row);

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
			height : Ti.UI.SIZE
		});
		row.add(titleRow);
		row.add(descriptionRow);
		sectionOffsets.add(row);
	}
};

var sectionOrigin = Ti.UI.createTableViewSection({
	//headerTitle : 'Origin'
	headerTitle : L('WcsCoverageDomain_section3_title')
});

var origin = Ti.XML.Element;
origin = domainSet.getElementsByTagName("gml:origin").item(0);

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
	text : L('WcsCoverageDomain_row7_title'),
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
	text : origin.getElementsByTagName("gml:Point").item(0).getAttribute("srsName"),
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
sectionOrigin.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	height : Ti.UI.SIZE,
	hasChild : false,
	backgroundColor : css.bcTvRowColor,
	className : 'domainSet-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Position',
	text : L('WcsCoverageDomain_row8_title'),
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
str = origin.getElementsByTagName("gml:Point").item(0).getElementsByTagName("gml:pos").item(0).textContent;
var numbersArray = [];
numbersArray = str.split(" ");
str = "";
for (var i = 0; i < numbersArray.length; i++) {
	str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
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
	height : Ti.UI.SIZE
});
row.add(titleRow);
row.add(descriptionRow);
sectionOrigin.add(row);

//finally, set the data property of the tableView to our sections
tblCoverageDomain.data = [sectionGridEnvelope, sectionOffsets, sectionOrigin];

win.add(tblCoverageDomain);

//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
win.addEventListener('blur', removeTable);
function removeTable(e) {
	win.remove(tblCoverageDomain);
};

