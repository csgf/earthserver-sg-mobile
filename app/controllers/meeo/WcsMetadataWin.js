var css = Ti.API.WxsCss;
var xmlData = arguments[0].xmlData;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.wcsMetadataWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.wcsMetadataWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.wcsMetadataWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.wcsMetadataWin.close();
	            };
	        };	        
	    };
	});	
};

var sectionXmlResponse = Ti.UI.createTableViewSection({
	//headerTitle : 'XML Server Response'
	headerTitle : L('WcsMetadata_section1_title')
});

//create a table row
var row = Titanium.UI.createTableViewRow({
	height : css.rowHeight,
	hasChild : true,
	backgroundColor : css.bcTvRowColor,
	className : 'response-row'
});
//title row
var titleRow = Titanium.UI.createLabel({
	//text : 'View XML',
	text : L('WcsMetadata_row1_title'),
	font : {
		fontSize : css.titleFontSize,
		fontWeight : 'bold'
	},
	color : css.titleColor,
	left : 10,
	height : css.titleHeight,
	right : "10dp"
});
row.add(titleRow);
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
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if(OS_IOS){
		var viewXmlWin = Alloy.createController("meeo/ViewXmlWin", {
			navWin: navWin,
			xmlData : xmlData
		}).getView();
		navWin.openWindow(viewXmlWin);
	}else{
		var viewXmlWin = Alloy.createController("/meeo/ViewXmlWin",{
			xmlData : xmlData
		}).getView();
		viewXmlWin.open();
	};	
});
sectionXmlResponse.add(row);

var sectionServiceIdentification = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Identification'
	headerTitle : L('WcsMetadata_section2_title')
});

var owsServiceIdentification = xmlData.documentElement.getElementsByTagName("ows:ServiceIdentification");
var owsServiceProvider = xmlData.documentElement.getElementsByTagName("ows:ServiceProvider");

for(var j=2; j<=7; j++){
	
	var desctiptionText = "";
	switch(j){
		case 2:
			desctiptionText =  owsServiceIdentification.item(0).getElementsByTagName("ows:Title").item(0).textContent;
			break;
		case 3:
			desctiptionText =  owsServiceIdentification.item(0).getElementsByTagName("ows:Abstract").item(0).textContent;
			break;
		case 4:
			//loop each keyword in the xml
			for (var i = 0; i < owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").length; i++) {
				desctiptionText += owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").item(i).textContent + "\n";
			}			
			break;
		case 5:
			desctiptionText =  owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceType").item(0).textContent;
			break;
		case 6:
			desctiptionText =  owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent;
			break;
		case 7:
			//loop each Profile in the xml
			for (var i = 0; i < owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").length; i++) {
				desctiptionText += owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").item(i).textContent + "\n\n";
			}
			desctiptionText = desctiptionText.substr(0, desctiptionText.length - 2);
			break;
	};
	//create a Title row
	var row = Titanium.UI.createTableViewRow({		
		height : Ti.UI.SIZE,
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		//className : 'ServiceIdentification-row'
	});
	//title row
	//var tit =  L('WcsMetadata_row'+j+'_title');
	//Ti.API.info("row"+j+" -->title: " +  tit);
	//Ti.API.info(desctiptionText);
	var titleRow = Titanium.UI.createLabel({
		//text : 'Title',
		text : L('WcsMetadata_row'+j+'_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right : "10dp", //width : row.width
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
	sectionServiceIdentification.add(row);
};

var sectionServiceProvider = Ti.UI.createTableViewSection({
	//headerTitle : 'Service Provider'
	headerTitle : L('WcsMetadata_section3_title')
});

for(var i=10; i<=16; i++){
	
	var titleText, desctiptionText;
	switch(i){
		case 10:
			titleText = "Provider Name";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ProviderName").item(0).textContent;
			break;
		case 11:
			titleText = "Provider Site";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ProviderSite").item(0).getAttribute("xlink:href");
			break;
		case 12:
			titleText = "Individual Name";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:IndividualName").item(0).textContent;
			break;
		case 13:
			titleText = "City";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:City").item(0).textContent;
			break;
		case 14:
			titleText = "Postal Code";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:PostalCode").item(0).textContent;			break;						
		case 15:
			titleText = "Country";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:Country").item(0).textContent;			break;
		case 16:
			titleText = "Mail";
			desctiptionText =  owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:ElectronicMailAddress").item(0).textContent;			break;
	};

	//create a Provider name row
	var row = Titanium.UI.createTableViewRow({
		height : css.rowHeight,
		hasChild : false,
		backgroundColor : css.bcTvRowColor,
		className : 'ServiceIdentification-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Provider name',
		text : titleText,//L('WcsMetadata_row'+i+'_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		right : "10dp", //width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : desctiptionText,//owsServiceProvider.item(0).getElementsByTagName("ows:ProviderName").item(0).textContent,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		left : 10,
		//top : 25,
		bottom : 5,
		//width : row.width - 20,
		right : "10dp",
		height : css.descriptionHeight
	});
	row.add(titleRow);
	row.add(descriptionRow);
	sectionServiceProvider.add(row);	
};
$.metadataTv.data = [sectionXmlResponse, sectionServiceIdentification, sectionServiceProvider];