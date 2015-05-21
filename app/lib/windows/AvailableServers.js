/**
 * @author Francesco
 */

//Parent window = Settings.js
//reference the current window
var win = Titanium.UI.currentWindow;
win.backgroundColor = "white";
win.title = L('AvailableServers_win_title');

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

/*var win1 = Titanium.UI.createWindow({
	url : '/windows/AddServer.js',
	//title : 'Add server',
	title : L('AddServer_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
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
};*/

/*var win2 = Titanium.UI.createWindow({
	url : '/windows/AddNewServer.js',
	//title : 'Add new server',
	title : L('AddNewServer_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
	orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	//orientationModes : [Ti.UI.PORTRAIT]
});
win2.padre = win.padre;
if(OS_ANDROID){
	win2.addEventListener('open', function() {
		var actionBar;	
	    if (! win2.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win2.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win2.close();
	            };
	        };	        
	    };
	});	
};*/

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var tblServers = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	//height : 100,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2*/
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});
win.add(tblServers);


//Read server list from "avalaibleServers" property
//Empty array
var avalaibleServers = [];

if (Ti.App.Properties.hasProperty('avalaibleServers')) {
	avalaibleServers = Ti.App.Properties.getList('avalaibleServers');
};

var loadAvalaibleServers = function(){
	//empty data array
	var data = [];
	
	//Put data from array to table
	// The array "serverArray" goes until length-1 because the last row is empty
	for (var i = 0; i < avalaibleServers.length; i++) {
		//create a table row
		var row = Titanium.UI.createTableViewRow({
			width : tblServers.width,
			height : css.rowHeight,
			hasChild : true,
			className : 'server-row',
			backgroundColor : css.bcTvRowColor
		});
		//name
		var lblName = Titanium.UI.createLabel({
			text : avalaibleServers[i].name,
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'bold'
			},
			color : '#000',
			left : 10,
			top : 5,
			height : css.titleHeight,
			width : row.width - 70
		});
		//service
		var lblService = Titanium.UI.createLabel({
			text : avalaibleServers[i].type,
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'normal'
			},
			//color : '#000',
			color : '#2f4f4f',
			//color : '#fff',
			right : 10,
			//top : 5,
			width : 60,
			height : css.titleHeight
		});
		//url
		var lblUrl = Titanium.UI.createLabel({
			text : avalaibleServers[i].url,
			font : {
				fontSize : css.descriptionFontSize,
				fontWeight : 'normal'
			},
			//color : '#2f4f4f',
			color : css.descriptionColor,
			left : 10,
			bottom : 5,
			width : row.width,
			height : css.descriptionHeight
		});
		row.add(lblName);
		row.add(lblService);
		row.add(lblUrl);
		//add the table row to our data[] object
		data.push(row);
	};

	// Insert the last row (Other)
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblServers.width,
		height : css.rowHeight,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//name
	var lblName = Titanium.UI.createLabel({
		text : L('AvailableServers_last_row_title'),
		font : {
			fontFamily: 'Helvetica',
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : '#00CD00',
		left : 10,
		//top : 5,
		width : row.width - 70,
		height : css.titleHeight
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/addServer.png',
		width : 48,
		height : 48,
		right : 20,
		//top : 20
	});
	row.add(iconImage);
	row.add(lblName);
	
	//add the table row to our data[] object
	data.push(row);

	//tblServers.data = data;
	tblServers.setData(data);
};

tblServers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == tblServers.data[0].rowCount - 1) {
		//alert('clicked add new server');
		//alert('Ti.App.isAndroid = ' + Ti.App.isAndroid);
		//win2.open({modal:true});
		var win2Properties = {
			padre : win.padre
		};
		var win2 = require("/windows/AddNewServer")(win2Properties);
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};	
	} else {
		/*win1.padre = win.padre;
		win1.name = e.row.children[0].text;
		win1.service = e.row.children[1].text;
		win1.urlServer = e.row.children[2].text;*/
		var win1Properties = {
			padre : win.padre,
			name : e.row.children[0].text,
			service : e.row.children[1].text,
			urlServer : e.row.children[2].text		
		};
		var win1 = require("/windows/AddServer")(win1Properties);
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	};
});

win.addEventListener("focus", function(){
	Ti.API.info("AvailableServer.js --> loadAvalaibleServers");
	loadAvalaibleServers();
});
