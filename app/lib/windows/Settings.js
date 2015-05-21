/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');


//Remove addedServers array as global variable (le Properties rimangono in memoria anche ad app chiusa)
//Ti.App.addedServers = [];
/* 
 * uncomment to reset the WxS server
 */
var lastUpdate = Ti.App.Properties.getDouble("lastUpdateWxS", 0);

/*
Ti.API.info(lastUpdate);
Ti.API.info(new Date(lastUpdate));
Ti.API.info(new Date(new Date().getTime()));
Ti.API.info(new Date(lastUpdate + 86400000)); //---> one day after the last update
*/

if(new Date(new Date().getTime()) > new Date(lastUpdate + 86400000)){
	Ti.App.Properties.setDouble("lastUpdateWxS", new Date().getTime());

	if (Ti.App.Properties.hasProperty('addedServers')) {
		Ti.App.Properties.removeProperty('addedServers');
	};

	//Remove mapLayers array as global variable
	if (Ti.App.Properties.hasProperty('mapLayers')) {
		Ti.App.Properties.removeProperty('mapLayers');
	};
		
	//Remove avalaibleServers array as global variable
	if (Ti.App.Properties.hasProperty('avalaibleServers')) {
		Ti.App.Properties.removeProperty('avalaibleServers');
	};
};
/*****/ 

var css = Ti.API.WxsCss;

var isAndroid = false;
if (Ti.Platform.name === 'android'){
        isAndroid = true;
};
Ti.App.isAndroid = isAndroid;



if (!(Ti.App.Properties.hasProperty('avalaibleServers'))) {
	//Insert two servers into avalaible servers list
	var avalaibleServers = [];
	
	//Create an avalaibleServers array

	var availableServer1 = {
		name : 'EOxServer (CCI)',
		type : 'WCS',
		url : 'http://ows.eox.at/cci/ows'
	};
	avalaibleServers.push(availableServer1);
	var availableServer2 = {
		name : 'EOxServer (OFC)',
		type : 'WMS',
		url : 'http://ows.eox.at/ofc/ows'
	};
	avalaibleServers.push(availableServer2);
	Ti.App.Properties.setList('avalaibleServers', avalaibleServers);
};


/*
//Delete the ServerList.txt file
var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'servers');
if (! dir.exists()) {
dir.createDirectory();
}
var f = Ti.Filesystem.getFile(dir.resolve(), 'ServerList.txt');
if (f.exists()) {
f.deleteFile();
}
*/

/*
alert('Settings.js - Ti.App.mapLayers = ' + Ti.App.mapLayers);
var mapLayers = [];

if (Ti.App.mapLayers == undefined) {
	mapLayers = [];
	alert('Settings.js - mapLayers[] is undefined!');		
};
alert('Settings.js - mapLayers.length = ' + mapLayers.length);
*/


//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//Parent window = app.js
//reference the current window
var win = Titanium.UI.currentWindow;

/*
if(OS_IOS){
	var closeBtn = Ti.UI.createButton({
		//title: 'close'
		title: L('NavButton_close')
	});
	
	win.leftNavButton = closeBtn; 
	
	closeBtn.addEventListener('click', function() {
		win.padre.close();
	});
};
*/

var win11 = Titanium.UI.createWindow({
	url : '/windows/Overlays.js',
	//title : 'Overlays settings',
	title : L('Overlays_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win11.padre = win.padre;
if(OS_ANDROID){
	win11.addEventListener('open', function() {
		var actionBar;	
	    if (! win11.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win11.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win11.close();
	            };
	        };	        
	    };
	});	
};

var win12 = Titanium.UI.createWindow({
	url : '/windows/WcsCoverageList2.js',
	//title : 'Coverages list',
	title : L('WcsCoverageList2_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win12.padre = win.padre;
if(OS_ANDROID){
	win12.addEventListener('open', function() {
		var actionBar;	
	    if (! win12.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win12.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win12.close();
	            };
	        };	        
	    };
	});	
};

var win13 = Titanium.UI.createWindow({
	url : '/windows/WmsServerList_addLayer.js',
	//title : 'Wms Server list',
	title : L('WmsServerList_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win13.padre = win.padre;
if(OS_ANDROID){
	win13.addEventListener('open', function() {
		var actionBar;	
	    if (! win13.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win13.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win13.close();
	            };
	        };	        
	    };
	});	
};

var win21 = Titanium.UI.createWindow({
	url : '/windows/ServerCapabilities.js',
	//title: 'Capabilities',
	//title: L('ServerCapabilities_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});
win21.padre = win.padre;
if(OS_ANDROID){
	win21.addEventListener('open', function() {
		var actionBar;	
	    if (! win21.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win21.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win21.close();
	            };
	        };	        
	    };
	});	
};


var win22 = Titanium.UI.createWindow({
	url : '/windows/AvailableServers.js',
	//title: 'All of servers',
	//title: L('AllServers_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});
win22.padre = win.padre;
if(OS_ANDROID){
	win22.addEventListener('open', function() {
		var actionBar;	
	    if (! win22.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win22.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win22.close();
	            };
	        };	        
	    };
	});	
};

var win31 = Titanium.UI.createWindow({
	url : '/windows/WcsServerList.js',
	//title: 'WCS Servers',
	//title: L('WmsServerList_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});
win31.padre = win.padre;
if(OS_ANDROID){
	win31.addEventListener('open', function() {
		var actionBar;	
	    if (! win31.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win31.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win31.close();
	            };
	        };	        
	    };
	});	
};

var win32 = Titanium.UI.createWindow({
	url : '/windows/WmsServerList.js',
	//title: 'WMS Servers',
	//title: L('WmsServerList_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor: '#fff'
	backgroundImage : '/images/bgImage.png'
});
win32.padre = win.padre;
if(OS_ANDROID){
	win32.addEventListener('open', function() {
		var actionBar;	
	    if (! win32.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win32.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win32.close();
	            };
	        };	        
	    };
	});	
};

var table1 = Ti.UI.createTableView({
	/*top : 20,
	left : 10,	
	width : pWidth - 20,
	height : pHeight - 110,
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,*/
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});

var sectionOverlays = Ti.UI.createTableViewSection({
	//headerTitle : 'Overlays'
	headerTitle : L('settings_section1_title')
});
//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Overlays settings',
	text : L('settings_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Set overlays order and opacity',
	text : L('settings_row1_description'),
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
row.add(titleRow);
row.add(descriptionRow);
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
//row.add(iconImage);
row.addEventListener('click', function(e) {
	//win11.open();
	if (Ti.App.isAndroid == true) {
		win11.open();
	} else {
		win.padre.openWindow(win11);	
	};
});
sectionOverlays.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add coverage',
	text : L('settings_row2_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Add a WCS coverage to the overlays',
	text : L('settings_row2_description'),
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
row.add(titleRow);
row.add(descriptionRow);
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
//row.add(iconImage);
row.addEventListener('click', function(e) {
	//alert("Hai cliccato!");
	//win12.open();
	if (Ti.App.isAndroid == true) {
		win12.open();
	} else {
		win.padre.openWindow(win12);	
	};
});
sectionOverlays.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add layer',
	text : L('settings_row3_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Add a WMS layer to the overlays',
	text : L('settings_row3_description'),
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
row.add(titleRow);
row.add(descriptionRow);
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
//row.add(iconImage);
row.addEventListener('click', function(e) {
	//win13.open();
	if (Ti.App.isAndroid == true) {
		win13.open();
	} else {
		win.padre.openWindow(win13);	
	};
});
sectionOverlays.add(row);

var sectionServers = Ti.UI.createTableViewSection({
	//headerTitle : 'Servers'
	headerTitle : L('settings_section2_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Server capabilities',
	text : L('settings_row4_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Show server capabilities',
	text : L('settings_row4_description'),
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

row.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	//win21.open();
	if (Ti.App.isAndroid == true) {
		win21.open();
	} else {
		win.padre.openWindow(win21);	
	};
});
sectionServers.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Add server',
	text : L('settings_row5_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Add a WCS or WMS server',
	text : L('settings_row5_description'),
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

row.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (Ti.App.isAndroid == true) {
		win22.open();
	} else {
		win.padre.openWindow(win22);	
	};
	//win22.open();
	//win.padre.openWindow(win22);
});

sectionServers.add(row);

var sectionQueries = Ti.UI.createTableViewSection({
	//headerTitle : 'Queries Metadata'
	headerTitle : L('settings_section3_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Coverages description',
	text : L('settings_row6_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Show WCS coverage metadata',
	text : L('settings_row6_description'),
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
row.addEventListener('click', function(e) {
	//win31.open();
	if (Ti.App.isAndroid == true) {
		win31.open();
	} else {
		win.padre.openWindow(win31);	
	};
});
sectionQueries.add(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	width : table1.width,
	height : css.rowHeight,
	hasChild : true,
	className : 'table-row',
	backgroundColor : css.bcTvRowColor
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Layers description',
	text : L('settings_row7_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	top : 5,
	height : css.titleHeight,
	width : row.width - 70
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	//text : 'Show WMS layer metadata',
	text : L('settings_row7_description'),
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
row.add(titleRow);
row.add(descriptionRow);
//add our little icon to the right of the row
var iconImage = Titanium.UI.createImageView({
	image : '/images/next.png',
	width : 48,
	height : 48,
	right : 10,
	top : 20
});
//row.add(iconImage);
row.addEventListener('click', function(e) {
	//win32.open();
	if (Ti.App.isAndroid == true) {
		win32.open();
	} else {
		win.padre.openWindow(win32);	
	};
});
sectionQueries.add(row);

table1.data = [sectionOverlays, sectionServers, sectionQueries];
win.add(table1);

if(OS_ANDROID){
	win.addEventListener('open', function() {
		var actionBar;	
	    if (! win.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win.close();
	            };
	        };	        
 			win.getActivity().onCreateOptionsMenu = function(e) {
		        var infoBtn = e.menu.add({
		            title : "Info",
		            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		            icon : Ti.Android.R.drawable.ic_menu_info_details
		        });
		        infoBtn.addEventListener('click', function(e) {
		            openInfoWin();
		        });
		    };
		    win.getActivity().invalidateOptionsMenu();
	    };
	});
}else if(OS_IOS){
	var infoBtn = Ti.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.INFO_LIGHT
	});
	infoBtn.addEventListener("click", function(){
		openInfoWin();
	});
	win.rightNavButton = infoBtn;
};


// InfoWin
var infoWin = Ti.UI.createWindow({
	title : "WxS info"
});
var wv = Ti.UI.createWebView({url:"/WXS.html"});
infoWin.add(wv);
if(OS_ANDROID){
	wv.applyProperties({scalesPageToFit:true, enableZoomControls:false});
	infoWin.addEventListener('open', function() {
		var actionBar;	
	    if (! infoWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = infoWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	              	infoWin.close();
	            };
	        };	        
	    };
	});
};
		
var openInfoWin = function(){
	if(OS_IOS){
		win.padre.openWindow(infoWin);
	}else{
		infoWin.open();	
	};
};


/***** LOAD COVERAGES AND DATA OF THE TWO EXEMPLE SERVERS AT FIRST APP START ******/

var debug_mode = false;

var loadingView = Ti.UI.createView({
	backgroundColor : "#000",
	width : "100%",
	height: "100%",
	opacity : 0.4,
	visible : false,
	zIndex : 10
});
if(isAndroid){
	var style=Ti.UI.ActivityIndicatorStyle.BIG;
}else{
	var style=Titanium.UI.iPhone.ActivityIndicatorStyle.BIG;
};
var activityIndicatorView = Ti.UI.createActivityIndicator({
	font : {
		fontSize : "26dp",
		fontWeight : 'bold'
	},
	color : "#fff",	
	message : "Loading...",
	visible : false	,
	style : style,
	zIndex : 11
});
win.add(loadingView);
win.add(activityIndicatorView);

var showLoading = function(){
	activityIndicatorView.show();
	loadingView.show();
};

var hideLoading = function(){
	activityIndicatorView.hide();
	loadingView.hide();
};

function addServerCompleted(serverName){
	// Add WMS sample server
	addServer(avalaibleServers[1],1);
	
	var dialog = Ti.UI.createAlertDialog({
		//message : 'New ' + win.service + ' server added',
		message : String.format(L('AddServer_OkDialog_message'), serverName/*win.service*/),
		ok : 'OK',
		//title : 'Server added'
		title : L('AddServer_OkDialog_title')
	});
	dialog.addEventListener('click', function(e) {
		Ti.API.info('The cancel button was clicked');
		//win.close();
	});
	hideLoading();
	dialog.show();			
}; 

// Add Server
var addServer = function(server,serverIndex){	

	//var avalaibleServers = Ti.App.Properties.getList('avalaibleServersBgs', []);
	//if(avalaibleServers.length){		
		var addedServers = Ti.App.Properties.getList('addedServers', []);
		for(var i in addedServers){
			if(addedServers[i].url === server.url){
				var xmlText = addedServers[i].getCapabilities;
				if(debug_mode){
					Ti.API.info(addedServers[i].name + " server already exists");
					Ti.API.info(xmlText);
				};
				return;
			};
		};
	//};

	// Send request to server and save response to xml text

	// activity indicator for entertainment
	showLoading();
	
	//declare the http client object to retrieve Capabilities XML
	var xhr = Titanium.Network.createHTTPClient({timeout: 120000});
	
	//this method will process the remote data
	xhr.onload = function() {
		xmlText = this.responseText;
		if(debug_mode){
			Ti.API.info("Risposta del server alla GetCapabilities: ---->");
			Ti.API.info(xmlText);
		};
		var xmlData = Titanium.XML.parseString(xmlText);
		
		/*var avalaibleServers = [];
		//Append to avalaibleServers array the new server
		var bgsServer = {
			name : "BGS server",
			type : "WCS",
			url : "http://earthserver.bgs.ac.uk/petascope/wcs2"
		};
		avalaibleServers.push(bgsServer);
		Ti.App.Properties.setList('avalaibleServersBgs', avalaibleServers);
		*/
		
		//Append to avalaibleServers array the new server
		var addedServers = [];
		if (Ti.App.Properties.hasProperty('addedServers')) {
			addedServers = Ti.App.Properties.getList('addedServers');
		};
		var covArray = [
			//xmlText
		];
		//get the item nodelist from our response xml object
		var wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("wcs:CoverageSummary");
		//loop each item in the xml
		for (var i = 0; i < wcsCoverageSummary.length; i++) {
			//Ti.API.info("----> " + wcsCoverageSummary.item(i).getElementsByTagName("CoverageId").item(0).textContent);
			covArray.push("");
		};
		if(debug_mode)
			Ti.API.info(JSON.stringify(covArray));
		
		var serviceTypeVersion = "2.0.0";//xmlData.documentElement.getElementsByTagName("ows:ServiceIdentification").item(0).getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent;
				
		var newServer = {
			name : server.name,
			type : server.type,
			serviceTypeVersion : serviceTypeVersion, //xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent,
			url : server.url,
			getCapabilities : xmlText,
			describeCoverageArray : covArray
			//describeCoverageArray : null
		};
		addedServers.push(newServer);
		Ti.App.Properties.setList('addedServers', addedServers);

/*******---->*/

		//var serverIndex = 0;
		var coverageIndex = 0;
		
		/**
		 * Get describeCoverage response
		 */
		function getDescribeCoverage(addedServers, serverIndex,coverageId) {
			//Output data
			var xmlText = null;
			try {
				//declare the http client object
				var xhr = Titanium.Network.createHTTPClient();
				//this method will process the remote data
				xhr.onload = function() {
					var xmlText = this.responseText;
					//Return xmlText
					//No need to return. This will work and sends your data to your calling function
					
					//alert(JSON.stringify(addedServers[serverIndex].describeCoverageArray[coverageIndex]));				
					//alert(xmlText);
					//Update the addedArray and then the property
					addedServers[serverIndex].describeCoverageArray[coverageIndex] = xmlText;
					
					/*
					// Salvo i valori del lowerCorner e upperCorner
					var spatialEnvelope = {
						lowerCorner : [], 	// x,y,z,d4
						upperCorner : []	// x,y,z,d4		
					};
					
					var xmlData = Titanium.XML.parseString(xmlText);
					var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
					var numbersArray = [];
					numbersArray = str.split(" ");				
					for (var i = 0; i < numbersArray.length; i++) {
						spatialEnvelope.lowerCorner.push(parseFloat(numbersArray[i]).toFixed(6));
					};
									
					var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
					//str = str.replace(" ", "\n");
					var numbersArray = [];
					numbersArray = str.split(" ");				
					for (var i = 0; i < numbersArray.length; i++) {
						spatialEnvelope.upperCorner.push(parseFloat(numbersArray[i]).toFixed(6));
					};								
					addedServers[serverIndex].describeCoverageArray[coverageIndex].spatialEnvelope = spatialEnvelope;
					// aggiorno l'array 
					describeCoverageArray = addedServers[serverIndex].describeCoverageArray;
					
					if(debug_mode)
						Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));				
					*/
					if(debug_mode)
						Ti.API.info("----> coverageIndex < addedServers[serverIndex].describeCoverageArray.length-1 ---> " + coverageIndex + " < " + (addedServers[serverIndex].describeCoverageArray.length-1));
					
					if(coverageIndex<addedServers[serverIndex].describeCoverageArray.length-1){
						coverageIndex++;
						getDescribeCoverage(addedServers, serverIndex, wcsCoverageSummary.item(coverageIndex).getElementsByTagName("wcs:CoverageId").item(0).textContent);
					}else{
						Ti.App.Properties.setList('addedServers', addedServers);
						addServerCompleted(addedServers[serverIndex].type + " (" + addedServers[serverIndex].name + ")");
					};
				};
		
				//this method will fire if there's an error in accessing the remote data
				xhr.onerror = function() {
					//log the error to our titanium developer console
					Ti.API.error(this.status + ' - ' + this.statusText);
					if(coverageIndex<addedServers[serverIndex].describeCoverageArray.length-1){
						coverageIndex++;
						getDescribeCoverage(addedServers, serverIndex, wcsCoverageSummary.item(coverageIndex).getElementsByTagName("wcs:CoverageId").item(0).textContent);
					}else{
						Ti.App.Properties.setList('addedServers', addedServers);
						addServerCompleted(addedServers[serverIndex].type + " (" + addedServers[serverIndex].name + ")");
					};
				};
		
				//Set timeout in milliseconds
				xhr.timeout = 10000;
		
				//var coverageIdArray = win.coverageIdArray;
				//Create the request string for describeCoverage
				var strRequest = addedServers[serverIndex].url;
				strRequest += '?service=' + addedServers[serverIndex].type;
				strRequest += '&version=' + addedServers[serverIndex].serviceTypeVersion;
				strRequest += '&request=DescribeCoverage';
				strRequest += '&coverageId=' + coverageId;
				
				Ti.API.info("getDescribeCoverage url ---> " + strRequest);
		
				xhr.open('GET', strRequest);
				//Send request
				xhr.send();
			} catch(e) {
				//alert(e);
				if(coverageIndex<addedServers[serverIndex].describeCoverageArray.length-1){
					coverageIndex++;
					getDescribeCoverage(addedServers, serverIndex, wcsCoverageSummary.item(coverageIndex).getElementsByTagName("wcs:CoverageId").item(0).textContent);
				}else{
					Ti.App.Properties.setList('addedServers', addedServers);
					addServerCompleted(addedServers[serverIndex].type + " (" + addedServers[serverIndex].name + ")");
				};
			}
		};
		if(server.type === "WCS"){
			getDescribeCoverage(addedServers, serverIndex, wcsCoverageSummary.item(coverageIndex).getElementsByTagName("wcs:CoverageId").item(0).textContent);		
		}else{
			addServerCompleted(addedServers[serverIndex].type + " (" + addedServers[serverIndex].name + ")");
		};
/*******<----*/
		//addServerCompleted();
	};
	
	//this method will fire if there's an error in accessing the remote data
	xhr.onerror = function(e) {
		alert(L('AddServer_ErrorDialog_message'));
		hideLoading();
		/*setTimeout(function(){
			if(OS_IOS)
				$.settingsWin.fireEvent("closeSettingsWin");
				//navWin.close();
			else
				$.settingsWin.close();
		},OS_IOS ? 500 : 5000);*/
	};
	
	//Create the Request string for Capabilities
	var strRequest = server.url + '?Service=' + server.type + '&Request=GetCapabilities';
	Ti.API.info(strRequest);
	
	xhr.open('GET', strRequest);
	
	//finally, execute the call to the remote feed
	xhr.send();
};


var avalaibleServers = Ti.App.Properties.getList('avalaibleServers', []);
if(avalaibleServers.length){
	addServer(avalaibleServers[0],0);
};