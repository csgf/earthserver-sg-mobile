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
win.title = L('WcsServerList_win_title');

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
	url : '/windows/WcsCoverageList.js',
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

var tblServers = Titanium.UI.createTableView({
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
	//data : [sectionWCS, sectionWMS]
});

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.title = e.row.children[0].text;
	win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;	
	//This index is to retrive (Capabilities and? NO) describeCoverage from the addedSever choose
	win1.serverIndex = e.row.children[2].text;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});

win.add(tblServers);

//Read added servers from Properties
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};

//Empty array for data table
var data = [];

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WCS') {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			//width : tblServers.width,
			height : css.rowHeight,
			hasChild : true,
			backgroundColor : css.bcTvRowColor,
			className : addedServers[i].type + '-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			text : addedServers[i].name,
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
			text : addedServers[i].url,
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

		//server number
		var serverNumber = Titanium.UI.createLabel({
			text : i,
			font : {
				fontSize : 12,
				fontWeight : 'normal'
			},
			//color : '#2f4f4f',
			color : '#fff',
			left : 10,
			top : 50,
			width : 20,
			height : 20,
			visible : false
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
		row.add(serverNumber);
		//row.add(iconImage);
		data.push(row);
	};
};

tblServers.data = data;

