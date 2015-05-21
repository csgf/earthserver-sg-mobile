/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WmsServer_addLayer.js
//reference the current window
var win = Titanium.UI.currentWindow;

/*if(OS_IOS){
	var btnBack = Ti.UI.createButton({
		//title: 'back'
		title: L('NavButton_back')
	});
	win.leftNavButton = btnBack; 
	btnBack.addEventListener('click', function() {
	    //win.remove(scrollView);
		win.close();
	});
};*/

win.addEventListener('android:back', function() {
    //alert('back');
    //win.remove(scrollView);
    win.close();
});

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

// Da modificare... poi dovrà aprirsi direttamente la mappa con il layer
var win1 = Titanium.UI.createWindow({
	url : '/windows/Overlays.js',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png',
	//xml : win.xml
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
	url : '/windows/WmsOtherDimensions_addLayer.js',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
	//xml : win.xml
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

/*
var win3 = Titanium.UI.createWindow({
	url : '/windows/WmsBackground_addLayer.js',
	title: 'Background',
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
	//xml : win.xml
});
win3.padre = win.padre;
if(OS_ANDROID){
	win3.addEventListener('open', function() {
		var actionBar;	
	    if (! win3.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = win3.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               win3.close();
	            };
	        };	        
	    };
	});	
};
*/

//retrieve the info from the server
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};
if (addedServers.length > 0) {
	var xmlData = Ti.XML;
	xmlData = Titanium.XML.parseString(addedServers[win.serverIndex].getCapabilities);
	
	var str = '';
	var layer = Ti.XML.Element;
	layer = xmlData.documentElement.getElementsByTagName("Layer").item(win.layerIndex);
	
	//create a button to save a server to the addedServers array
	var btnSend = Titanium.UI.createButton({
		//title : 'Send',
		title : L('WmsGetMap_button_title'),
		font : {
			fontSize : 18,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'bold'
		},
		top : 5,
		right : 10,
		//width : 190,
		height : 40,
		//width : Math.round(pWidth / 4),
		//height : Math.round(pHeight / 12),
		//backgroundImage : '/images/button.png'
	});
	//win.add(btnSend);
	
	//Create the tableView
	var tblGetMap = Titanium.UI.createTableView({
		/*width : pWidth - 20,
		height : pHeight - btnSend.height - 120,
		//height : pHeight - btnSend.height,
		//height : 'auto',
		//top : 20,
		top : btnSend.top + btnSend.height + 10,
		left : 10,
		minRowHeight : 90,
		backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2,*/
		top : OS_IOS ? 0 : "50dp",
		minRowHeight : css.rowHeight,
		backgroundColor : css.bcTvColor,
		bottom : 0,
		separatorColor : css.separatorColor		
	});
	
	var sectionBoundingBox = Ti.UI.createTableViewSection({
		//headerTitle : 'BoundingBox'
		headerTitle : L('WmsGetMap_section1_title')
	});
	
	//create a Available CRSes row
	var row = Titanium.UI.createTableViewRow({
		//width : tblGetMap.width,
		//height : 90,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : false,
		className : 'BoundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'CRS',
		text : L('WmsGetMap_row1_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		//text : layer.getElementsByTagName("CRS").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	
	str = '';
	if ((layer.getElementsByTagName("CRS").item(0) != null) && (layer.getElementsByTagName("CRS").length > 0)) {	
		str = layer.getElementsByTagName("CRS").item(0).textContent;
	};
	descriptionRow.text = str;
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);
	
	//create a South Latitude row
	var row = Titanium.UI.createTableViewRow({
		//width : tblGetMap.width,
		//height : 90,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : false,
		className : 'BoundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Min lat',
		text : L('WmsGetMap_row2_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("southBoundLatitude").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);
	
	//create a West Longitude row
	var row = Titanium.UI.createTableViewRow({
		//width : tblGetMap.width,
		//height : 90,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : false,
		className : 'BoundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Min lon',
		text : L('WmsGetMap_row3_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("westBoundLongitude").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);
	
	//create a North Latitude row
	var row = Titanium.UI.createTableViewRow({
		//width : tblGetMap.width,
		//height : 90,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : false,
		className : 'BoundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Max Lat',
		text : L('WmsGetMap_row4_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("northBoundLatitude").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);
	
	//create a East Longitude row
	var row = Titanium.UI.createTableViewRow({
		//width : tblGetMap.width,
		//height : 90,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : false,
		className : 'BoundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Max lon',
		text : L('WmsGetMap_row5_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : layer.getElementsByTagName("eastBoundLongitude").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);
	
	var sectionOtherDimensions = Ti.UI.createTableViewSection({
		//headerTitle : 'Other dimensions'
		headerTitle : L('WmsGetMap_section2_title')
	});
	
	//loop each item in the xml
	for (var i = 0; i < layer.getElementsByTagName("Dimension").length; i++) {
		//create a Dimension row
		var row = Titanium.UI.createTableViewRow({
			//width : tblGetMap.width,
			//height : 90,
			backgroundColor : css.bcTvRowColor,
			height : css.rowHeight,
			hasChild : true,
			className : 'Dimensions-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			text : layer.getElementsByTagName("Dimension").item(i).getAttribute("name"),
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'bold'
			},
			color : css.titleColor,
			left : 10,
			top : 5,
			height : css.titleHeight,
			right  :"10dp",
			//width : row.width - 20
		});
		//description row
		var descriptionRow = Titanium.UI.createLabel({
			text : '',
			font : {
				fontSize : css.descriptionFontSize,
				fontWeight : 'normal'
			},
			color : css.descriptionColor,
			//color : '#000',
			left : 10,
			right : "10dp",
			bottom : "5dp",
			//top : 35,
			//width : row.width - 20,
			height : css.descriptionHeight
		});
		row.dimensionItem = i;
		row.add(titleRow);
		row.add(descriptionRow);
		//add our little icon to the right of the row
		var iconImage = Titanium.UI.createImageView({
			image : '/images/next.png',
			width : 48,
			height : 48,
			right : 10,
			top : 20,
			visible : false
		});
		row.add(iconImage);
		sectionOtherDimensions.add(row);
	};
	
	var sectionImageSettings = Ti.UI.createTableViewSection({
		//headerTitle : 'MapImage'
		headerTitle : L('WmsGetMap_section3_title')
	});
	
	//create a table row - Width
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		height : OS_IOS ? 60 : 70,
		hasChild : false,
		className : 'imageSettings-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Width',
		text : L('WmsGetMap_row6_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var txtWidth = Ti.UI.createTextField({
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		//height : css.descriptionHeight,
		hintText : L('WmsGetMap_row6_hintText')
	});
	
	row.add(titleRow);
	row.add(txtWidth);
	sectionImageSettings.add(row);
	
	//create a table row - Height
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		height : OS_IOS ? 60 : 70,
		hasChild : false,
		className : 'imageSettings-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Height',
		text : L('WmsGetMap_row7_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var txtHeight = Ti.UI.createTextField({
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		//height : css.descriptionHeight,
		hintText : L('WmsGetMap_row7_hintText')
	});
	
	row.add(titleRow);
	row.add(txtHeight);
	sectionImageSettings.add(row);
	
	/*
	txtWidth.addEventListener('focus', function() {
		 //configWindow.animate({bottom: '30%', duration:500});
		 tblGetMap.top -= 300; 	 
	});
	txtHeight.addEventListener('blur', function() { 
		//configWindow.animate({bottom: 0, duration:500}); 
			 tblGetMap.top += 300; 
	});
	
	txtHeight.addEventListener('blur', function() { 
		//configWindow.animate({bottom: 0, duration:500}); 
		//scrollView.scrollTo(0, 0);
		//tblGetMap.focus();		  
		tblGetMap.scrollToTop;		  
	});
	*/
	
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : true,
		className : 'imageSettings-row',
		bgRow : true
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : 'Background color',
		//text : L('WmsGetMap_row7_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right  :"10dp",
		//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : 'Transparent',
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
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
	sectionImageSettings.add(row);
	
	tblGetMap.data = [sectionBoundingBox, sectionOtherDimensions, sectionImageSettings];
	
	if(OS_IOS){
		tblGetMap.addEventListener("scroll", function(){
			txtWidth.blur();
			txtHeight.blur();
		});
	};
	
	tblGetMap.addEventListener('click', function(e) {
		// e.row contains information about the row that was clicked.
		// e.row.title = Your Row Title
		// children = the objects added to your row.
		if ((e.index > tblGetMap.data[0].rowCount - 1) && (e.index <= tblGetMap.data[0].rowCount + tblGetMap.data[1].rowCount - 1) && (e.row.dimensionItem != null)) {
			win2.xmlItem = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem);
			win2.title = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem).getAttribute("name");
			win2.selectedRow = e.row;
			if (Ti.App.isAndroid == true) {
				win2.open();
			} else {
				win.padre.openWindow(win2);	
			};
		} else if (e.index >= tblGetMap.data[0].rowCount + tblGetMap.data[1].rowCount) {
			if(!e.row.bgRow)
				return;
			//win3.selectedRow = e.row;
			var selectedRow = e.row;
			var win3 = new(require('/windows/WmsBackground_addLayer'));
			win3.padre = win.padre;
			win3.addEventListener("updateBgColorRow", function(e){
				Ti.API.info("updateBgColorRow " + e.BgColorText);
				selectedRow.children[1].text = e.BgColorText;
				win3.removeEventListener("updateBgColorRow",arguments.callee);
			});
			if (Ti.App.isAndroid == true) {
				win3.open();
			} else {
				win.padre.openWindow(win3);	
			};
		};
	});
	
	/*var scrollView = Titanium.UI.createScrollView({
		//contentHeight: pHeight,
		top: 0,
		//contentHeight: tblGetMap.height + btnSend.height + 20,
		contentHeight: 'auto',
		showVerticalScrollIndicator: true
	});
	
	var totalRows = 0;
	for (var i = 0; i < tblGetMap.data.length; i++) {
	    totalRows = totalRows + tblGetMap.data[i].rowCount;
	};
	tblGetMap.height = totalRows * 90 + 90;	//90 = sections height
	
	scrollView.add(btnSend);
	scrollView.add(tblGetMap);
	win.add(scrollView);
	*/
	if(OS_IOS)
		win.rightNavButton = btnSend;
	else
		win.add(btnSend);
	win.add(tblGetMap);
	
	/*
	win.addEventListener('blur', removeObjects);
	function removeObjects() {  
		win.remove(scrollView);
		alert('remove scrollView');
	};
	*/
	//win.add(tblGetMap);
	
	/*
	txtHeight.addEventListener('blur', function() { 
		//configWindow.animate({bottom: 0, duration:500}); 
			 scrollView.scrollTo(0, 0);		  
	});
	*/
	
	/*btnSend.addEventListener('touchstart', function(e) {
		btnSend.backgroundImage = '/images/button_focused.png';
	});
	
	btnSend.addEventListener('touchend', function(e) {
		btnSend.backgroundImage = '/images/button.png';
	});*/

	// activity indicator for entertainment
	var indicatorStyle;
	//if (Ti.Platform.name === 'iPhone OS'){
	if (Ti.Platform.name != 'android'){
	  	indicatorStyle = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  	indicatorStyle = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var actIndBgView = Ti.UI.createView({
		backgroundColor : "#838383",
		opacity : 0.9,
		width : "100%",
		height : "100%",
		visible : false
	});
	var actIndView = Ti.UI.createView({
		backgroundColor : "#fff",
		width : "180dp",
		height : "180dp",
		borderRadius : 15
	});
	var wmsIV = Ti.UI.createImageView({
		image : "/images/wms.png",
		top : "30dp",
		width : "147dp",
		height : "60dp"
	});
	var actInd = Ti.UI.createActivityIndicator({
  		color: '#000',
  		font: {fontFamily:'Helvetica Neue', fontSize:"18sp", fontWeight:'bold'},
  		message: 'Loading data...',
  		style: indicatorStyle,
  		//top: 10,
  		//left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.SIZE,
  		bottom : "30dp",
  		visible : true
	});
	actIndView.add(wmsIV);
	actIndView.add(actInd);
	actIndBgView.add(actIndView);
	win.add(actIndBgView);
	
	btnSend.addEventListener('click', function() {
		if ((txtWidth.value<=0) || (txtHeight.value<=0)) {
			//alert('Insert the correct size image.');
			alert(L('WmsGetMap_ErrorMessage'));
			txtWidth.focus();
			//return;
		} else {

			actIndBgView.show();
		
			var layerId = layer.getElementsByTagName("Title").item(0).textContent;
			var layerCrs = tblGetMap.data[0].rows[0].children[1].text;
			var minLat = tblGetMap.data[0].rows[1].children[1].text;
			var minLon = tblGetMap.data[0].rows[2].children[1].text;
			var maxLat = tblGetMap.data[0].rows[3].children[1].text;
			var maxLon = tblGetMap.data[0].rows[4].children[1].text;
			var layerTime = '';
			for (var i=0; i < tblGetMap.data[1].rowCount; i++) {
			  	if (tblGetMap.data[1].rows[i].children[0].text == 'time') {
			  		layerTime = tblGetMap.data[1].rows[i].children[1].text;
			  	};
			};
			
			var bgColor = tblGetMap.data[2].rows[2].children[1].text;
			var boolTransparent = 'false';
			if (bgColor == 'Transparent') {
				boolTransparent = 'true';
			};
			
			var strRequest = '';
			strRequest = addedServers[win.serverIndex].url;
			strRequest += "?SERVICE=wms&VERSION=1.3.0";
			strRequest += "&REQUEST=GetMap";
			strRequest += "&LAYERS=" + layerId;	
			strRequest += "&CRS=" + layerCrs;
			strRequest += "&BBOX=" + minLat + "," + minLon + "," + maxLat + "," + maxLon;
			strRequest += "&WIDTH=" + txtWidth.value;
			strRequest += "&HEIGHT=" + txtHeight.value;
			strRequest += "&FORMAT=image/png";
			strRequest += "&TRANSPARENT=" + boolTransparent;
			if (bgColor != 'Transparent') {
				strRequest += "&BGCOLOR=" + bgColor;
			};
			if (layerTime != '') {
				strRequest += "&TIME=" + layerTime;
			};
			
			//strRequest += "&format=image/tiff";	//This format is not supported by ImageView???!!!
			
			//alert('strRequest = ' + strRequest);
			
			//declare the http client object to retrieve a png image
			var xhr = Titanium.Network.createHTTPClient();
			
			//this method will process the remote data
			xhr.onload = function() {
				// Image variable
				var strImageData = Ti.Utils.base64encode(this.responseData);
				
				alert(L('WmsGetMap_message'));
				
				//Append to mapLayers array the new layer
				var mapLayers = [];
				if (Ti.App.mapLayers != undefined) {
					mapLayers = Ti.App.mapLayers;			
				};
				
				var newLayer = {
					layerId: layerId,
					serverName: addedServers[win.serverIndex].name,
					serverUrl: addedServers[win.serverIndex].url,
					visible: true,
					opacity: 1.0,
					crs: layerCrs,
					minLat: minLat,
					minLon: minLon,
					maxLat: maxLat,
					maxLon: maxLon,
					strImage: strImageData,
					imgWidth: txtWidth.value,
					imgHeight: txtHeight.value,
					time: layerTime,
					bands: [],
					backgroundColor: bgColor,
					serverIndex: win.serverIndex,
					layerIndex: win.layerIndex
				};
				mapLayers.push(newLayer);
				//Ti.App.Properties.setList('mapLayers', mapLayers);		
				Ti.App.mapLayers = mapLayers;
				
				actIndBgView.hide();
				if (Ti.App.isAndroid == true) {
					win1.open();
				} else {
					win.padre.openWindow(win1);	
				};
			};
			
			//this method will fire if there's an error in accessing the remote data
			xhr.onerror = function() {
				//log the error to our titanium developer console
				Ti.API.error('ERROR: ' + this.status + ' - ' + this.statusText);
				alert('ERROR\n\n' + this.status + ' - ' + this.statusText);
			};
			
			xhr.open('GET', strRequest);
			
			//finally, execute the call to the remote feed
			xhr.send();
		};	
	});
};


var layersLen = function() {
 
	var parentLayer = Ti.XML.Element;
	parentLayer = win.xml.documentElement.getElementsByTagName("Layer").item(0);
	var numCrsParentLayerTot = parentLayer.getElementsByTagName("CRS").length;

	var numCrsChildrenLayer = 0;
	//layer = win.xml.documentElement.getElementsByTagName("Layer").item(win.rowID);

	//loop each keyword in the xml
	for (var i = 1; i < win.xml.documentElement.getElementsByTagName("Layer").length; i++) {
		numCrsChildrenLayer += win.xml.documentElement.getElementsByTagName("Layer").item(i).getElementsByTagName("CRS").length;		
	}
	var numCrsParentLayer =  numCrsParentLayerTot - numCrsChildrenLayer;
	Titanium.API.info("LayerMetadata - DENTRO layersLen - numCrsParentLayer: " + numCrsParentLayer);
	alert(numCrsParentLayer);
	/*
	Titanium.API.info("LayerMetadata - DENTRO layersLen - PRIMA DI length");
	var n = win.xml.documentElement.getElementsByTagName("Layer").length;
	Titanium.API.info("LayerMetadata - DENTRO layersLen - DOPO DI length");
	alert(n);
	return n;
	*/
 
};
