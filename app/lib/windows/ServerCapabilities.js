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
win.title = L('ServerCapabilities_win_title');

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
	url : '/windows/WcsServer.js',
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

var win2 = Titanium.UI.createWindow({
	url : '/windows/WmsServer.js',
	//title : e.row.children[0].text,
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
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
};

//create a button to save a server to the addedServers array
var btnDeleteAllAddedServers = Titanium.UI.createButton({
	//title : 'Delete all added servers',
	title : L('ServerCapabilities_button_title'),
	font : {
		fontSize : 18,
		fontFamily : 'Helvetica Neue',
		fontWeight : 'bold'
	},
	bottom : 5,
	right : 10,
	width : 200,
	height : 40,
	//width : Math.round(pWidth / 4),
	//height : Math.round(pHeight / 12),
	//backgroundImage : '/images/button.png'
});
if(OS_IOS)
	win.rightNavButton = btnDeleteAllAddedServers;
else
	win.add(btnDeleteAllAddedServers);

/*btnDeleteAllAddedServers.addEventListener('touchstart', function(e) {
	btnDeleteAllAddedServers.backgroundImage = '/images/button_focused.png';
});
*/

btnDeleteAllAddedServers.addEventListener('click', function(e) {
	//btnDeleteAllAddedServers.backgroundImage = '/images/button.png';
	//Remove addedServers array as global variable (le Properties rimangono in memoria anche ad app chiusa)
	if (Ti.App.Properties.hasProperty('addedServers')) {
		Ti.App.Properties.removeProperty('addedServers');
		alert(L('ServerCapabilities_message'));
	};
	setTimeout(function(){
		win.close();
	},2000);
});

var tblCapabilities = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 170,
	top : 70,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : OS_IOS ? 0 : "50dp",
	separatorColor : css.separatorColor
	//data : [sectionWCS, sectionWMS]
});

tblCapabilities.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.

	Ti.API.info("ServerCapabilities - e.index: " + e.index);

	if (addedServers[e.row.children[2].text].type === 'WCS') {
		win1.title = e.row.children[0].text;
		win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else {
		win2.title = e.row.children[0].text;
		win2.xmlText = addedServers[e.row.children[2].text].getCapabilities;
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	};

});

win.add(tblCapabilities);

//Create table sections
var sectionWCS = Ti.UI.createTableViewSection({
	//headerTitle : 'WCS Servers'
	headerTitle : L('ServerCapabilities_section1_title')
});
var sectionWMS = Ti.UI.createTableViewSection({
	//headerTitle : 'WMS Servers'
	headerTitle : L('ServerCapabilities_section2_title')
});

//Read added servers from Properties
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};

//Put data from array to table
for (var i = 0; i < addedServers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblCapabilities.width,
		className : addedServers[i].type + '-row',
		height : css.rowHeight,
		hasChild : true,
		backgroundColor : css.bcTvRowColor
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
		width : row.width - 70
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
		bottom : 5,
		width : row.width,
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
		color : css.descriptionColor,
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

	//L'operatore === compara sia il tipo che il valore, == compara solo il valore
	if (addedServers[i].type === 'WCS') {
		sectionWCS.add(row);
	} else {
		sectionWMS.add(row);
	};
}

tblCapabilities.data = [sectionWCS, sectionWMS];

