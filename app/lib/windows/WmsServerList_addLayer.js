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
win.title = L('WmsServerList_win_title');

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
	url : '/windows/WmsServer_addLayer.js',
	//title : e.row.children[0].text,
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
	//data : [sectionWCS, sectionWMS]
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.title = e.row.children[0].text;
	win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
	win1.serverIndex = e.row.children[2].text;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});

win.add(tblServers);

var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};

//Empty array for data table
var data = [];

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WMS') {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			//width : tblServers.width,
			height : css.rowHeight,
			backgroundColor :css.bcTvRowColor,
			hasChild : true,
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
			right : "10dp",
			top : 10,
			height : css.titleHeight,
			//width : row.width - 70
		});
		//description row
		var descriptionRow = Titanium.UI.createLabel({
			text : addedServers[i].url,
			font : {
				fontSize : css.descriptionFontSize,
				fontWeight : 'normal'
			},
			//color : '#2f4f4f',
			color : css.descriptionColor,
			left : 10,
			right : "10dp",
			bottom : "5dp",
			//width : row.width,
			height : css.descriptionHeight
		});
		//hidden row
		var serverIndexRow = Titanium.UI.createLabel({
			text : i,
			visible : false
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
		row.add(serverIndexRow);
		row.add(iconImage);
		data.push(row);
	};
};

tblServers.data = data;
