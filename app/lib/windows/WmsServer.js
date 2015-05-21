/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = ServerCapabilities.js

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
	url : '/windows/WmsMetadata.js',
	//title : 'Metadata',
	title : L('WmsMetadata_win_title'),
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
	url : '/windows/LayerMetadata.js',
	//title : 'Layer',
	title : L('LayerMetadata_win_title'),
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

//Create the tableView
var tblWmsServer = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	minRowHeight : 80,*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor
});

var sectionMetadata = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Metadata'
	headerTitle : L('WmsServer_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({	
	width : tblWmsServer.width,
	height : css.rowHeight,
	hasChild : true,
	backgroundColor : css.bcTvRowColor,
	className : 'metadata-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'View Server Metadata',
	text : L('WmsServer_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	//color : '#fff',
	color : '#000',
	left : 10,
	//top : 20,
	//width : row.width - 20,
	right : "10dp",
	height : Ti.UI.SIZE
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
//row.add(iconImage);
sectionMetadata.add(row);

var sectionLayers = Ti.UI.createTableViewSection({
	//headerTitle : 'Layers'
	headerTitle : L('WmsServer_section2_title')
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;
win2.xml = xmlData;

//get the item nodelist from our response xml object
layer = xmlData.documentElement.getElementsByTagName("Layer");

//loop each item in the xml
for (var i = 0; i < layer.length; i++) {
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		width : tblWmsServer.width,
		height : css.rowHeight,
		hasChild : true,
		backgroundColor : css.bcTvRowColor,
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
		//top : 10,
		//top : titleRow.top + titleRow.height + 5,
		//width : row.width - 60,
		//width : row.width - 70,
		//height : 55,
		right : "10dp",
		height : Ti.UI.SIZE
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/next.png',
		width : 48,
		height : 48,
		right : 10,
		top : 20
	});
	row.add(descriptionRow);
	//row.add(iconImage);
	sectionLayers.add(row);
}

//finally, set the data property of the tableView to our data[] object
tblWmsServer.data = [sectionMetadata, sectionLayers];

win.add(tblWmsServer);

tblWmsServer.addEventListener('click', function(e) {
	//Attenzione e.index (in questo caso il num di riga va da 1 a n)
	//Attenzione, occorre escludere la riga 0 perchè appartiene alla sezione Metadata
	if (e.index == 0) {
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else {
		win2.rowID = e.index;
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	};
});
