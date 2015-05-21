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
//win.backgroundColor = "white";
//win.title = L('Overlays_win_title');

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

var win1 = Titanium.UI.createWindow({
	url : '/windows/OverlayDetails.js',
	//title : 'OverlayDetails',
	title : L('OverlayDetails_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff'
	backgroundImage : '/images/bgImage.png',
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


//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

var tblLayers = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	//height : 100,
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
win.add(tblLayers);


//Read server list from "mapLayers" property
//Empty array
var mapLayers = [];
if (Ti.App.mapLayers != undefined) {
	mapLayers = Ti.App.mapLayers;
};

//empty data array
var data = [];

//Put data from array to table
//The array "serverArray" goes until length-1 because the last row is empty
for (var i = 0; i < mapLayers.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		//width : tblLayers.width,
		height : css.rowHeight,
		hasChild : true,
		backgroundColor : css.bcTvRowColor,
		className : 'layer-row'
	});
	//name
	var lblName = Titanium.UI.createLabel({
		text : mapLayers[i].layerId,
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		//top : (row.height - 22) / 2,
		height : css.titleHeight,
		right : "10dp" //row.width - 70
	});
	row.add(lblName);
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	//row.add(iconImage);
	//add the table row to our data[] object
	data.push(row);
};

tblLayers.data = data;

tblLayers.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	win1.mapLayerIndex = e.index;
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
	//win.close();
});
