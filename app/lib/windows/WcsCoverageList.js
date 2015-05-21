/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WcsServerList.js
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
	url : '/windows/WcsCoverageMetadata.js',
	//title : 'Coverage metadata',
	title : L('WcsCoverageMetadata_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
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


/*
win2.addEventListener('blur', winEvent);
win2.addEventListener('close', winEvent);
win2.addEventListener('focus', winEvent);
win2.addEventListener('open', winEvent);
function winEvent(e) {
Ti.API.info('window event> evt:' + e.type + ' window:' + e.source.name);
}
*/

//Create the tableView
var tblCoverageList = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor		
});

var sectionCoverages = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverages'
	headerTitle : L('WcsCoverageList_section1_title')
});

/*
 * Da riempire automaticamente con i tag "wcs:CoverageId" del relativo xml
 */
var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;
// Pass the server index of the added array server
win1.serverIndex = win.serverIndex;
//Pass the coverageId
win1.ServiceTypeVersion = xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent;

//get the item nodelist from our response xml object
//items = xml.documentElement.getElementsByTagName("ows:ServiceIdentification");
wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("wcs:CoverageSummary");
//win2.wcsCoverageSummary = wcsCoverageSummary;

var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};
//Only the first time, we initializate the describeCoverageArray
if (addedServers[win.serverIndex].describeCoverageArray == null) {
	var covArray = [];
	for (var i = 0; i < wcsCoverageSummary.length; i++) {
		covArray.push(null);
		//covArray.push("");
	};
	addedServers[win.serverIndex].describeCoverageArray = covArray;
	Ti.App.Properties.setList('addedServers', addedServers);
};

/* Definire in anticipo la lunghezza di un array
var x = 4;
var myArray = [];
myArray[x - 1] = undefined;
*/

//loop each item in the xml
for (var i = 0; i < wcsCoverageSummary.length; i++) {

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		//width : tblCoverageList.width,
		height : css.rowHeight,
		hasChild : true,
		backgroundColor : css.bcTvRowColor,
		className : 'coverage-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageId").item(0).textContent,
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
		text : wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		left : 10,
		bottom : 5,
		right : "10dp", //width : row.width - 20,
		height : css.descriptionHeight
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	row.add(titleRow);
	row.add(descriptionRow);
	//row.add(iconImage);
	sectionCoverages.add(row);
}

//finally, set the data property of the tableView to our data[] object
tblCoverageList.data = [sectionCoverages];

win.add(tblCoverageList);

tblCoverageList.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.rowID = e.index;
	win1.coverageId = e.row.children[0].text;
	//Titanium.API.info("WcsCoverageList.js - win1.rowID: " + win1.rowID);
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});
