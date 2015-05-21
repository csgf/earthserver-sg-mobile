/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = Settings.js
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
	url : '/windows/WcsGetCoverage.js',
	//title : 'Get Coverage',
	title : L('WcsGetCoverage_win_title'),
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

//Create the tableView
var tblCoverageList = Titanium.UI.createTableView({
	//width : pWidth - 20,
	//height : pHeight - 110,
	//top : 20,
	//left : 10,
	//backgroundColor : '#B0C4DE',
	//borderRadius : 12,
	//borderColor : '#AFEEEE',
	//borderWidth : 2
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});
//Empty array containing sections
var data = [];

var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};
for (var i = 0; i < addedServers.length; i++) {
	if ((addedServers[i].describeCoverageArray != null) && (addedServers[i].describeCoverageArray.length != 0)) {
		var sectionServer = Ti.UI.createTableViewSection({
			//headerTitle : 'Coverages'
			headerTitle : addedServers[i].name
		});
		//Add the coverages to the section
		for (var j = 0; j < addedServers[i].describeCoverageArray.length; j++) {
			Ti.API.info('WcsCoverageList2.js - 1 - i, j = ' + i + ', ' + j);
			//get the item nodelist from our xml object
			if (addedServers[i].describeCoverageArray[j] != null) {
				Ti.API.info("WcsCoverageList2.js - addedServers[i].describeCoverageArray[j]: " + addedServers[i].describeCoverageArray[j]);
				var xmlData = Titanium.XML.parseString(addedServers[i].describeCoverageArray[j]);
				//create a table row
				var row = Titanium.UI.createTableViewRow({
					//width : tblCoverageList.width,
					//height : css.rowHeight,
					backgroundColor : css.bcTvRowColor,
					hasChild : true,
					className : 'coverageId-row'
				});
				//title row
				var titleRow = Titanium.UI.createLabel({
					//text : 'Id',
					text : xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent,
					font : {
						fontSize : css.titleFontSize,
						fontWeight : 'bold'
					},
					color : css.titleColor,
					left : 10,
					top : 5,
					//width : 'auto',
					//width : row.width - 70,
					right : "10dp",
					height : css.titleHeight
				});
				//description row
				var descriptionRow = Titanium.UI.createLabel({
					text : xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
					font : {
						fontSize : css.descriptionFontSize,
						fontWeight : 'normal'
					},
					color : css.descriptionColor,
					left : 10,
					top : "25dp",
					bottom : "5dp",
					//width : 'auto',
					//width : row.width - 70,
					height : Ti.UI.SIZE
				});
				//add our little icon to the right of the row
				var iconImage = Titanium.UI.createImageView({
					image : '/images/next.png',
					width : 48,
					height : 48,
					right : 10,
					top : 20,
					visible : false
				});
				row.add(titleRow);
				row.add(descriptionRow);
				row.add(iconImage);
				//hidden row
				var serverIndexRow = Titanium.UI.createLabel({
					text : i,
					//text : addedServers[i].describeCoverageArray[j],
					visible : false
				});
				row.add(serverIndexRow);
				//hidden row
				var layerIndexRow = Titanium.UI.createLabel({
					text : j,
					//text : addedServers[i].url,
					visible : false
				});
				row.add(layerIndexRow);
				sectionServer.add(row);
			};
		};
		//Insert the server section
		data.push(sectionServer);
	};
};
tblCoverageList.setData(data);
win.add(tblCoverageList);

tblCoverageList.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.serverIndex = e.row.children[3].text;
	win1.layerIndex = e.row.children[4].text;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});