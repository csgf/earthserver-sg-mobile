/**
 * @author Francesco
 */
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WcsCoverageList.js
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
	url : '/windows/CoverageInfo.js',
	//title : 'Coverage metadata',
	title : L('WcsCoverageMetadata_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png'
});
win1.xml = win.xml;
win1.rowID = win.rowID;
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
	url : '/windows/WcsDescribeCoverage.js',
	//title : 'Describe Coverage',
	title : L('WcsDescribeCoverage_win_title'),
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

//Create a choice table
var tblChoice = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : 182,
	top : 20,
	left : 10,
	backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2*/
	top : 0,
	backgroundColor : css.bcTvColor,
	bottom : 0,
	separatorColor : css.separatorColor		
});

//Empty data array
var data = [];

//create a table row
var row = Titanium.UI.createTableViewRow({
	//width : tblChoice.width,
	height : Ti.UI.SIZE,
	hasChild : true,
	backgroundColor : css.bcTvRowColor,
	className : 'CoverageInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'From getCapabilities'
	text : L('WcsCoverageMetadata_row1_title'),
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
	//text : 'Show coverage metadata included in getCapabilities contents section',
	text : L('WcsCoverageMetadata_row1_description'),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : 5,
	right : "10dp", //width : row.width - 20,
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
row.add(descriptionRow);
//row.add(iconImage);
data.push(row);

//create a table row
var row = Titanium.UI.createTableViewRow({
	//width : tblChoice.width,
	height : Ti.UI.SIZE,
	hasChild : true,
	backgroundColor : css.bcTvRowColor,
	className : 'CoverageInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'From describeCoverage'
	text : L('WcsCoverageMetadata_row2_title'),
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
	//text : 'Show coverage metadata returned by describeCoverage operation',
	text : L('WcsCoverageMetadata_row2_description'),
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	color : css.descriptionColor,
	left : 10,
	top : "25dp",
	bottom : 5,
	right : "10dp", //width : row.width - 20,
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
row.add(descriptionRow);
//row.add(iconImage);
data.push(row);

tblChoice.data = data;
win.add(tblChoice);

tblChoice.addEventListener('click', function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == 0) {
		if (Ti.App.isAndroid == true) {
			win1.open();
		} else {
			win.padre.openWindow(win1);	
		};
	} else {
		retrieveDescribeCoverage(win.serverIndex, win.rowID);
	};
});

/**
 * Retrieve the describeCoverage response from remote or local server
 */
function retrieveDescribeCoverage(serverIndex, coverageIndex) {
	Ti.API.info('WcsCoverageMetadata.js - serverIndex: ' + serverIndex);
	Ti.API.info('WcsCoverageMetadata.js - coverageIndex: ' + coverageIndex);

	// activity indicator for entertainment
	var indicatorStyle;
	if (Ti.Platform.name === 'iPhone OS'){
	  	indicatorStyle = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  	indicatorStyle = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var actInd = Ti.UI.createActivityIndicator({
  		color: 'black',
  		font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  		message: 'Loading data...',
  		style: indicatorStyle,
  		//top: 10,
  		//left: 10,
  		height: Ti.UI.SIZE,
  		width: Ti.UI.SIZE
	});
	win.add(actInd);
	actInd.show();

	//Verify if describeCoverage response is null for the server with index choosen
	var addedServers = [];
	if (Ti.App.Properties.hasProperty('addedServers')) {
		addedServers = Ti.App.Properties.getList('addedServers');
	};
	
	if (addedServers[serverIndex].describeCoverageArray[coverageIndex] == null) {
		//Inoltriamo la richiesta
		getDescribeCoverage(addedServers, serverIndex, function(xmlText) {
			//now we have to use the variable `returnedData` any any other normal returned variable

			if (xmlText == null) {
				alert("error");
			} else {
				//Update the addedArray and then the property
				addedServers[serverIndex].describeCoverageArray[coverageIndex] = xmlText;
				Ti.App.Properties.setList('addedServers', addedServers);

				actInd.hide();

				win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
				if (Ti.App.isAndroid == true) {
					win2.open();
				} else {
					win.padre.openWindow(win2);	
				};
			};
		});
	} else {
		//alert("Xml già presente");
		//Set the xmlText win2 property
		actInd.hide();
		win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
		if (Ti.App.isAndroid == true) {
			win2.open();
		} else {
			win.padre.openWindow(win2);	
		};
	};
};

/**
 * Get describeCoverage response
 */
function getDescribeCoverage(addedServers, serverIndex, callback) {
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
			callback(xmlText);
		};

		//this method will fire if there's an error in accessing the remote data
		xhr.onerror = function() {
			//log the error to our titanium developer console
			Ti.API.error(this.status + ' - ' + this.statusText);
			callback(null);
		};

		//Set timeout in milliseconds
		xhr.timeout = 10000;

		var coverageIdArray = win.coverageIdArray;
		//Create the request string for describeCoverage
		var strRequest = addedServers[serverIndex].url;
		strRequest += '?service=' + addedServers[serverIndex].type;
		strRequest += '&version=' + win.ServiceTypeVersion;
		strRequest += '&request=DescribeCoverage';
		strRequest += '&coverageId=' + win.coverageId;

		xhr.open('GET', strRequest);
		//Send request
		xhr.send();
	} catch(e) {
		//alert(e);
		callback(null);
	}
};
