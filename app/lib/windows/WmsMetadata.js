/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WmsServer.js
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
	url : '/windows/ViewXml.js',
	//title : 'XML',
	title : L('ViewXml_win_title'),
	modal : OS_IOS ? true : false,
	//backgroundColor : '#fff',
	backgroundImage : '/images/bgImage.png',
	xml : win.xml
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

var str = '';

//Create the tableView
var tblWmsServer = Titanium.UI.createTableView({
	/*width : pWidth - 20,
	height : pHeight - 110,
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

var sectionXmlResponse = Ti.UI.createTableViewSection({
	//headerTitle : 'XML Server Response'
	headerTitle : L('WmsMetadata_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	//width : tblWmsServer.width,
	height : css.rowHeight,
	hasChild : true,
	backgroundColor : css.bcTvRowColor,
	className : 'response-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'View XML',
	text : L('WmsMetadata_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	//top : (row.height - 22) / 2,
	height : css.titleHeight,
	width : row.width
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
row.addEventListener('click', function(e) {
	if (Ti.App.isAndroid == true) {
		win1.open();
	} else {
		win.padre.openWindow(win1);	
	};
});
sectionXmlResponse.add(row);

var service = win.xml.documentElement.getElementsByTagName("Service");

var sectionServerInfo = Ti.UI.createTableViewSection({
	//headerTitle : 'Server Info'
	headerTitle : L('WmsMetadata_section2_title')
});

for(var j=2; j<=6; j++){
	var desctiptionText = "";
	switch(j){
		case 2:
			desctiptionText =  service.item(0).getElementsByTagName("Name").item(0).textContent;
			break;
		case 3:
			desctiptionText =  service.item(0).getElementsByTagName("Title").item(0).textContent;
			break;
		case 4:
			if (service.item(0).getElementsByTagName("Abstract").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("Abstract").item(0).textContent;
			};			
			break;
		case 5:
			desctiptionText =  service.item(0).getElementsByTagName("OnlineResource").item(0).getAttribute("xlink:href");
			break;
		case 6:
			if (service.item(0).getElementsByTagName("Keyword").item(0) != null) {
				//loop each keyword in the xml
				for (var i = 0; i < service.item(0).getElementsByTagName("Keyword").length; i++) {
					desctiptionText += service.item(0).getElementsByTagName("Keyword").item(i).textContent + "\n";
				}
			};
			break;
	};
		
	//create a Name row
	var row = Titanium.UI.createTableViewRow({
		width : tblWmsServer.width,
		//height : Ti.UI.SIZE,
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		//className : 'ServerInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Name',
		text : L('WmsMetadata_row'+j+'_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : desctiptionText,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		left : 10,
		top : 25,
		bottom : 5,
		right : "10dp", //width : row.width - 20,
		height : Ti.UI.SIZE
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionServerInfo.add(row);
};


/*
//create a Name row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Name',
	text : L('WmsMetadata_row2_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : service.item(0).getElementsByTagName("Name").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServerInfo.add(row);

//create a Title row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Title',
	text : L('WmsMetadata_row3_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : service.item(0).getElementsByTagName("Title").item(0).textContent,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServerInfo.add(row);

//create a Abstract row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Abstract',
	text : L('WmsMetadata_row4_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("Abstract").item(0) != null) {
	str = service.item(0).getElementsByTagName("Abstract").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServerInfo.add(row);

//create a Provider website row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Provider website',
	text : L('WmsMetadata_row5_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
var descriptionRow = Titanium.UI.createLabel({
	text : service.item(0).getElementsByTagName("OnlineResource").item(0).getAttribute("xlink:href"),
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServerInfo.add(row);

//create a Keywords row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServerInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Keywords',
	text : L('WmsMetadata_row6_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("Keyword").item(0) != null) {
	//loop each keyword in the xml
	for (var i = 0; i < service.item(0).getElementsByTagName("Keyword").length; i++) {
		str += service.item(0).getElementsByTagName("Keyword").item(i).textContent + "\n";
	}
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServerInfo.add(row);
*/

var sectionServiceInfo = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Info'
	headerTitle : L('WmsMetadata_section3_title')
});

for(var j=7; j<=11; j++){
	var desctiptionText = "";
	switch(j){
		case 7:
			if (service.item(0).getElementsByTagName("LayerLimit").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("LayerLimit").item(0).textContent;
			};
			break;
		case 8:
			if (service.item(0).getElementsByTagName("MaxWidth").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("MaxWidth").item(0).textContent;
			};
			break;
		case 9:
			if (service.item(0).getElementsByTagName("MaxHeight").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("MaxHeight").item(0).textContent;
			};			
			break;
		case 10:
			if (service.item(0).getElementsByTagName("Fees").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("Fees").item(0).textContent;
			};
			break;
		case 11:
			if (service.item(0).getElementsByTagName("AccessConstraints").item(0) != null) {
				desctiptionText = service.item(0).getElementsByTagName("AccessConstraints").item(0).textContent;
			};
			break;
	};
		
	//create a Name row
	var row = Titanium.UI.createTableViewRow({
		width : tblWmsServer.width,
		//height : Ti.UI.SIZE,
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		//className : 'ServiceInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Name',
		text : L('WmsMetadata_row'+j+'_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : desctiptionText,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		left : 10,
		top : 25,
		bottom : 5,
		right : "10dp", //width : row.width - 20,
		height : Ti.UI.SIZE
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionServiceInfo.add(row);
};

/*
//create a Layer Limit row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Layer Limit',
	text : L('WmsMetadata_row7_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("LayerLimit").item(0) != null) {
	str = service.item(0).getElementsByTagName("LayerLimit").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceInfo.add(row);

//create a Max width row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Max width',
	text : L('WmsMetadata_row8_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("MaxWidth").item(0) != null) {
	str = service.item(0).getElementsByTagName("MaxWidth").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceInfo.add(row);

//create a Max height row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Max height',
	text : L('WmsMetadata_row9_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("MaxHeight").item(0) != null) {
	str = service.item(0).getElementsByTagName("MaxHeight").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceInfo.add(row);

//create a Fees row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Fees',
	text : L('WmsMetadata_row10_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("Fees").item(0) != null) {
	str = service.item(0).getElementsByTagName("Fees").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceInfo.add(row);

//create a Access constraints row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ServiceInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Access constraints',
	text : L('WmsMetadata_row11_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (service.item(0).getElementsByTagName("AccessConstraints").item(0) != null) {
	str = service.item(0).getElementsByTagName("AccessConstraints").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionServiceInfo.add(row);
*/

var contactInfo = win.xml.documentElement.getElementsByTagName("Service").item(0).getElementsByTagName("ContactInformation");

var sectionContactInfo = Ti.UI.createTableViewSection({
	//headerTitle : 'Contact Info'
	headerTitle : L('WmsMetadata_section4_title')
});


for(var j=12; j<=23; j++){
	var desctiptionText = "";
	switch(j){
		case 12:
			if (contactInfo.item(0).getElementsByTagName("ContactPerson").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactPerson").item(0).textContent;
			};
			break;
		case 13:
			if (contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0).textContent;
			};
			break;
		case 14:
			if (contactInfo.item(0).getElementsByTagName("ContactPosition").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactPosition").item(0).textContent;
			};			
			break;
		case 15:
			if (contactInfo.item(0).getElementsByTagName("AddressType").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("AddressType").item(0).textContent;
			};
			break;
		case 16:
			if (contactInfo.item(0).getElementsByTagName("Address").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("Address").item(0).textContent;
			};
			break;
		case 17:
			if (contactInfo.item(0).getElementsByTagName("City").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("City").item(0).textContent;
			};
			break;
		case 18:
			if (contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0).textContent;
			};
			break;
		case 19:
			if (contactInfo.item(0).getElementsByTagName("PostCode").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("PostCode").item(0).textContent;
			};
			break;
		case 20:
			if (contactInfo.item(0).getElementsByTagName("Country").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("Country").item(0).textContent;
			};
			break;
		case 21:
			if (contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0).textContent;
			};
			break;
		case 22:
			if (contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0).textContent;
			};
			break;
		case 23:
			if (contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0) != null) {
				desctiptionText = contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0).textContent;
			};
			break;
	};
		
	//create a Name row
	var row = Titanium.UI.createTableViewRow({
		width : tblWmsServer.width,
		//height : Ti.UI.SIZE,
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		//className : 'ServiceInfo-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Name',
		text : L('WmsMetadata_row'+j+'_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : desctiptionText,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		left : 10,
		top : 25,
		bottom : 5,
		right : "10dp", //width : row.width - 20,
		height : Ti.UI.SIZE
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionContactInfo.add(row);
};

/*
//create a Person row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Person',
	text : L('WmsMetadata_row12_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactPerson").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactPerson").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a Organization row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Organization',
	text : L('WmsMetadata_row13_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a Position row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Position',
	text : L('WmsMetadata_row14_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactPosition").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactPosition").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a Address type row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Address type',
	text : L('WmsMetadata_row15_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("AddressType").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("AddressType").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a Address row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Address',
	text : L('WmsMetadata_row16_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("Address").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("Address").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a City row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'City',
	text : L('WmsMetadata_row17_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("City").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("City").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a StateOrProvince row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'StateOrProvince',
	text : L('WmsMetadata_row18_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a PostCode row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'PostCode',
	text : L('WmsMetadata_row19_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("PostCode").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("PostCode").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a Country row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Country',
	text : L('WmsMetadata_row20_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("Country").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("Country").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a ContactVoiceTelephone row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Telephone',
	text : L('WmsMetadata_row21_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a ContactFacsimileTelephone row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'Facsimile',
	text : L('WmsMetadata_row22_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);

//create a ContactElectronicMailAddress row
var row = Titanium.UI.createTableViewRow({
	width : tblWmsServer.width,
	//height : 90,
	hasChild : false,
	className : 'ContactInfo-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'E-mail',
	text : L('WmsMetadata_row23_title'),
	font : {
		fontSize : 22,
		fontWeight : 'bold'
	},
	color : '#000',
	left : 10,
	top : 5,
	height : 30,
	width : row.width
});
//description row
str = '';
if (contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0) != null) {
	str = contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0).textContent;
};
var descriptionRow = Titanium.UI.createLabel({
	text : str,
	font : {
		fontSize : 20,
		fontWeight : 'normal'
	},
	color : '#fff',
	//color : '#000',
	left : 10,
	top : 35,
	width : row.width - 20,
	height : 'auto'
});
row.add(titleRow);
row.add(descriptionRow);
sectionContactInfo.add(row);
*/

tblWmsServer.data = [sectionXmlResponse, sectionServerInfo, sectionServiceInfo, sectionContactInfo];
win.add(tblWmsServer);
