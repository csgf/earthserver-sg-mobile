/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WmsServerList_addLayer.js

//reference the current window
var win = Titanium.UI.currentWindow;
//win.title = win.serverName;

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
	url : '/windows/WmsGetMap.js',
	//title : 'GetMap',
	title : L('WmsGetMap_win_title'),
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
var tblWmsServer = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,*/
	minRowHeight : css.rowHeight,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});

var sectionLayers = Ti.UI.createTableViewSection({
	//headerTitle : 'Layers'
	headerTitle : L('WmsServer_section2_title')
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

//get the item nodelist from our response xml object
layer = xmlData.documentElement.getElementsByTagName("Layer");

// Layer 0
//create a table row
var row = Titanium.UI.createTableViewRow({
	//width : tblWmsServer.width,
	//height : 80,
	backgroundColor : css.bcTvRowColor,
	height : css.rowHeight,
	hasChild : false,
	className : 'layer-row'
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : layer.item(0).getElementsByTagName("Title").item(0).textContent,
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	//color : '#fff',
	color : css.titleColor,
	left : 10,
	right : "10dp",
	//top : 10,
	//width : row.width - 70,
	//height : 55,
	//height : 'auto'
});
//hidden row
var layerIndexRow = Titanium.UI.createLabel({
	text : 0,
	visible : false
});
row.add(descriptionRow);
row.add(layerIndexRow);
sectionLayers.add(row);

// other layers
//loop each item in the xml
for (var i = 1; i < layer.length; i++) {

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		//width : tblWmsServer.width,
		//height : 80,
		backgroundColor : css.bcTvRowColor,
		height : Ti.UI.SIZE,
		hasChild : true,
		className : 'layer-row'
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.item(i).getElementsByTagName("Title").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'bold'
		},
		//color : '#fff',
		color : css.titleColor,
		left : 10,
		right : "10dp",
		//width : row.width - 70,
		//height : 55,
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
	//hidden row
	var layerIndexRow = Titanium.UI.createLabel({
		text : i,
		visible : false
	});
	row.add(descriptionRow);
	row.add(iconImage);
	row.add(layerIndexRow);
	sectionLayers.add(row);
}

//finally, set the data property of the tableView to our data[] object
tblWmsServer.data = [sectionLayers];

win.add(tblWmsServer);

tblWmsServer.addEventListener('click', function(e) {
	if (e.index > 0) {
		win1.rowID = e.index;
		win1.serverIndex = win.serverIndex;
		win1.layerIndex = e.row.children[2].text;
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	};
});
