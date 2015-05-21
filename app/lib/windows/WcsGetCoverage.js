/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WcsCoverageList2.js
//reference the current window
var win = Titanium.UI.currentWindow;

/*if(OS_IOS){
 var btnBack = Ti.UI.createButton({
 //title: 'back'
 title: L('NavButton_back')
 });
 win.leftNavButton = btnBack;
 btnBack.addEventListener('click', function() {
 // win.remove(scrollView);
 win.close();
 });
 };*/

win.addEventListener('android:back', function() {
	// win.remove(scrollView);
	win.close();
});

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
/*
var w = 0;
var h = 0;
if (pWidth < pHeight) {
w = pWidth;
h = pHeight;
} else {
h = pWidth;
w = pHeight;
};

Ti.Gesture.addEventListener('orientationchange', function(e) {
// Rimisaurazione dello schermo
pWidth = Ti.Platform.displayCaps.platformWidth;
pHeight = Ti.Platform.displayCaps.platformHeight;
if (pWidth < pHeight) {
w = pWidth;
h = pHeight;
} else {
h = pWidth;
w = pHeight;
};
});
*/

// Da modificare... poi dovrà aprirsi direttamente la mappa con il layer
var win1 = Titanium.UI.createWindow({
	url : '/windows/Overlays.js',
	//title : 'Overlays',
	title : L('Overlays_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.padre = win.padre;
if (OS_ANDROID) {
	win1.addEventListener('open', function() {
		var actionBar;
		if (!win1.activity) {
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

//retrieve the info from the server
var addedServers = [];
if (Ti.App.Properties.hasProperty('addedServers')) {
	addedServers = Ti.App.Properties.getList('addedServers');
};
if (addedServers.length > 0) {
	var xmlData = Ti.XML;
	xmlData = Titanium.XML.parseString(addedServers[win.serverIndex].describeCoverageArray[win.layerIndex]);

	//create a button to save a server to the addedServers array
	var btnSend = Titanium.UI.createButton({
		//title : 'Send',
		title : L('WcsGetCoverage_button_title'),
		font : {
			fontSize : 18,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'bold'
		},
		top : 5,
		right : 10,
		height : "40dp",
		//width : 190,
		//height : 88,
		//width : Math.round(pWidth / 4),
		//height : Math.round(pHeight / 12),
		//backgroundImage : '/images/button.png'
	});
	//win.add(btnSend);

	//create the tableView
	var tblGetCoverage = Titanium.UI.createTableView({
		/*width : pWidth - 20,
		 height : pHeight - btnSend.height - 120,
		 //top : 20,
		 top : btnSend.top + btnSend.height + 10,
		 left : 10,
		 backgroundColor : '#B0C4DE',
		 borderRadius : 12,
		 borderColor : '#AFEEEE',
		 borderWidth : 2,
		 minRowHeight : 90*/
		top : OS_IOS ? 0 : "50dp",
		backgroundColor : css.bcTvColor,
		bottom : 0,
		separatorColor : css.separatorColor,
		minRowHeight : css.rowHeight
	});

	var sectionBoundingBox = Ti.UI.createTableViewSection({
		//headerTitle : 'BoundingBox'
		headerTitle : L('WcsGetCoverage_section1_title')
	});
	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'boundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'CRS',
		text : L('WcsGetCoverage_row1_title'),
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
		text : xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsName"),
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
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);

	//Retrieve latitude and longitude measures
	var minLat = 0;
	var maxLat = 0;
	var minLon = 0;
	var maxLon = 0;
	var str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("axisLabels");
	var data = [];
	data = str.split(" ");
	if (data[0] === "lat") {
		str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
		var numbersArray = [];
		numbersArray = str.split(" ");
		minLat = parseFloat(numbersArray[0]).toFixed(6);
		minLon = parseFloat(numbersArray[1]).toFixed(6);

		str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
		numbersArray = [];
		numbersArray = str.split(" ");
		maxLat = parseFloat(numbersArray[0]).toFixed(6);
		maxLon = parseFloat(numbersArray[1]).toFixed(6);
	} else {
		str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
		var numbersArray = [];
		numbersArray = str.split(" ");
		minLon = parseFloat(numbersArray[0]).toFixed(6);
		minLat = parseFloat(numbersArray[1]).toFixed(6);

		str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
		numbersArray = [];
		numbersArray = str.split(" ");
		maxLon = parseFloat(numbersArray[0]).toFixed(6);
		maxLat = parseFloat(numbersArray[1]).toFixed(6);
	};

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'boundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Min latitude',
		text : L('WcsGetCoverage_row2_title'),
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
		text : minLat,
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
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'boundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Min longitude',
		text : L('WcsGetCoverage_row3_title'),
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
		text : minLon,
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
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'boundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Max latitude',
		text : L('WcsGetCoverage_row4_title'),
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
		text : maxLat,
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
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'boundingBox-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Max longitude',
		text : L('WcsGetCoverage_row5_title'),
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
		text : maxLon,
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
	row.add(titleRow);
	row.add(descriptionRow);
	sectionBoundingBox.add(row);

	var sectionRangeSubsetting = Ti.UI.createTableViewSection({
		//headerTitle : 'BoundingBox'
		headerTitle : L('WcsGetCoverage_section2_title')
	});
	var rangeType = Ti.XML.Element;
	rangeType = xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);
	if (rangeType.getElementsByTagName("swe:field") != null) {
		//loop each offset in the domain set
		for (var i = 0; i < rangeType.getElementsByTagName("swe:field").length; i++) {
			//create a table row
			var row = Titanium.UI.createTableViewRow({
				hasChild : false,
				backgroundColor : css.bcTvRowColor,
				className : 'bands-row'
			});
			//title row
			var titleRow = Titanium.UI.createLabel({
				text : rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
				font : {
					fontSize : css.titleFontSize,
					fontWeight : 'bold'
				},
				color : css.titleColor,
				left : 10,
				//top : 5,
				//width : 'auto',
				//width : row.width - 70,
				right : "10dp",
				height : css.titleHeight
			});
			//add our little icon to the right of the row
			var iconImage = Titanium.UI.createImageView({
				image : '/images/check.png',
				width : 48,
				height : 48,
				right : 10,
				//top : 20,
				visible : true
			});
			row.add(titleRow);
			row.add(iconImage);
			row.addEventListener('click', function(e) {
				e.row.children[1].visible = !e.row.children[1].visible;
			});
			sectionRangeSubsetting.add(row);
		};
	};

	var sectionImageSize = Ti.UI.createTableViewSection({
		//headerTitle : 'Coverage image'
		headerTitle : L('WcsGetCoverage_section3_title')
	});
	//create a table row - Width
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'imageSize-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Width',
		text : L('WcsGetCoverage_row6_title'),
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
	var txtWidth = Ti.UI.createTextField({
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
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
		height : Ti.UI.SIZE,
		hintText : L('WcsGetCoverage_row6_hintText')
	});

	row.add(titleRow);
	row.add(txtWidth);
	sectionImageSize.add(row);

	//create a table row - Width
	var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'imageSize-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Height',
		text : L('WcsGetCoverage_row7_title'),
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
	var txtHeight = Ti.UI.createTextField({
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
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
		height : Ti.UI.SIZE,
		hintText : L('WcsGetCoverage_row7_hintText')
	});

	row.add(titleRow);
	row.add(txtHeight);
	sectionImageSize.add(row);

	//finally, set the data property of the tableView to our sections
	tblGetCoverage.data = [sectionBoundingBox, sectionRangeSubsetting, sectionImageSize];

	/*var scrollView = Titanium.UI.createScrollView({
	//contentHeight: pHeight,
	top: 0,
	//top : btnSend.top + btnSend.height + 10,
	//contentHeight: tblGetCoverage.height + btnSend.height + 20,
	contentHeight: 'auto',
	showVerticalScrollIndicator: true
	});

	var totalRows = 0;
	for (var i = 0; i < tblGetCoverage.data.length; i++) {
	totalRows = totalRows + tblGetCoverage.data[i].rowCount;
	};
	tblGetCoverage.height = totalRows * 90 + 90;	//90 = sections height*/

	//scrollView.add(btnSend);
	//scrollView.add(tblGetCoverage);
	//win.add(scrollView);
	//win.add(tblGetCoverage);
	if (OS_IOS)
		win.rightNavButton = btnSend;
	else
		win.add(btnSend);
	win.add(tblGetCoverage);

	/*
	//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
	win.addEventListener('blur', removeTable);
	function removeTable(e) {
	win.remove(tblGetCoverage);
	};
	*/

	/*
	win.addEventListener('blur', removeObjects);
	function removeObjects() {
	win.remove(scrollView);
	alert('remove scrollView');
	};
	*/
	/*btnSend.addEventListener('touchstart', function(e) {
	btnSend.backgroundImage = '/images/button_focused.png';
	});

	btnSend.addEventListener('touchend', function(e) {
	btnSend.backgroundImage = '/images/button.png';
	});
	*/

	// activity indicator for entertainment
	var indicatorStyle;
	//if (Ti.Platform.name === 'iPhone OS'){
	if (Ti.Platform.name != 'android') {
		indicatorStyle = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
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
	var wcsIV = Ti.UI.createImageView({
		image : "/images/wcs.png",
		top : "30dp",
		width : "147dp",
		height : "60dp"
	});
	var actInd = Ti.UI.createActivityIndicator({
		color : '#000',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : "18sp",
			fontWeight : 'bold'
		},
		message : 'Loading data...',
		style : indicatorStyle,
		//top: 10,
		//left: 10,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		bottom : "30dp",
		visible : true
	});
	actIndView.add(wcsIV);
	actIndView.add(actInd);
	actIndBgView.add(actIndView);
	win.add(actIndBgView);

	btnSend.addEventListener('click', function() {
		if ((txtWidth.value <= 0) || (txtHeight.value <= 0)) {
			alert(L('WcsGetCoverage_ErrorMessage'));
			txtWidth.focus();
		} else {

			actIndBgView.show();

			var coverageId = xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent;
			var coverageCrs = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsName");

			// Bands array
			var colorsBands = [];
			var strBandsRequest = '';
			for (var i = 0; i < tblGetCoverage.data[1].rowCount; i++) {
				if (tblGetCoverage.data[1].rows[i].children[1].visible == true) {
					colorsBands.push(tblGetCoverage.data[1].rows[i].children[0].text);
					strBandsRequest += tblGetCoverage.data[1].rows[i].children[0].text + ',';
				};
			};
			strBandsRequest = strBandsRequest.substr(0, strBandsRequest.length - 1);
			if (strBandsRequest.length > 0) {
				strBandsRequest = '&rangesubset=' + strBandsRequest;
			};
			// A workaround to a server bug about a single color png image (the server retrieve a tiff image in this case)
			if (colorsBands.length == 1) {
				strBandsRequest += ',' + colorsBands[0];
			};

			var strRequest = '';
			strRequest = addedServers[win.serverIndex].url;
			strRequest += "?service=wcs&version=2.0.0";
			strRequest += "&request=GetCoverage";
			strRequest += "&coverageid=" + coverageId;
			strRequest += "&size=long(" + txtWidth.value + ")";
			strRequest += "&size=lat(" + txtHeight.value + ")";
			strRequest += "&format=image/tiff";
			//This format is not supported by ImageView???!!!
			//strRequest += "&format=image/png";
			strRequest += strBandsRequest;
			//strRequest += "&outputcrs=http://www.opengis.net/def/crs/EPSG/0/3857";
			//strRequest += "&outputcrs=http://www.opengis.net/def/crs/EPSG/0/4326";
			strRequest += "&outputcrs=" + coverageCrs;

			//declare the http client object to retrieve a png image
			var xhr = Titanium.Network.createHTTPClient();

			//this method will process the remote data
			xhr.onload = function() {

				if (OS_ANDROID) {
					var path = saveDataFile(coverageId, this.responseData);
					try {
						var f = Ti.Filesystem.getFile(path);

						Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
							action : Ti.Android.ACTION_VIEW,
							type : 'image/tiff',
							data : f.getNativePath()
						})); 

					} catch (err) {
						var alertDialog = Titanium.UI.createAlertDialog({
							title : 'No TIFF Viewer',
							message : 'We tried to open a TIFF but failed. Do you want to search the marketplace for a TIFF viewer?',
							buttonNames : ['Yes', 'No'],
							cancel : 1
						});
						alertDialog.show();
						alertDialog.addEventListener('click', function(evt) {
							if (evt.index == 0) {
								Ti.Platform.openURL('market://search?q=tiff%20viewer');
							}
						});
					}
					actIndBgView.hide();
				} else {

					// Image variable
					var strImageData = Ti.Utils.base64encode(this.responseData);

					alert(L('WcsGetCoverage_message'));

					//Append to mapLayers array the new layer
					var mapLayers = [];
					if (Ti.App.mapLayers != undefined) {
						mapLayers = Ti.App.mapLayers;
					};

					var newLayer = {
						layerId : coverageId,
						serverName : addedServers[win.serverIndex].name,
						serverUrl : addedServers[win.serverIndex].url,
						visible : true,
						opacity : 1.0,
						crs : coverageCrs,
						minLat : minLat,
						minLon : minLon,
						maxLat : maxLat,
						maxLon : maxLon,
						strImage : strImageData,
						imgWidth : txtWidth.value,
						imgHeight : txtHeight.value,
						bands : colorsBands,
						serverIndex : win.serverIndex,
						layerIndex : win.layerIndex
					};
					mapLayers.push(newLayer);
					Ti.App.mapLayers = mapLayers;

					actIndBgView.hide();
					if (Ti.App.isAndroid == true) {
						win1.open();
					} else {
						win.padre.openWindow(win1);
					};
				}
			};

			//this method will fire if there's an error in accessing the remote data
			xhr.onerror = function() {
				//log the error to our titanium developer console
				Ti.API.error('ERROR: ' + this.status + ' - ' + this.statusText);
				alert('ERROR\n\n' + this.status + ' - ' + this.statusText);
			};

			Ti.API.info("strRequest ----> " + strRequest);
			xhr.open('GET', strRequest);

			//finally, execute the call to the remote feed
			xhr.send();
		};
	});

	if (OS_IOS) {
		tblGetCoverage.addEventListener("scroll", function() {
			txtWidth.blur();
			txtHeight.blur();
		});
	};
};

function saveDataFile(filename, content) {
	filename += ".tiff";
	var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, filename);
	var imageLocation = Titanium.Filesystem.externalStorageDirectory + filename;
	f.write(content);
	f = null;
	return imageLocation;
}