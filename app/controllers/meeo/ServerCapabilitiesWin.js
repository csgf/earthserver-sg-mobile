var meeoServer = Ti.App.Properties.getList('serversMeeo', []);
var css = Ti.API.WxsCss;
var xmlData;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.serverCapabilitiesWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.serverCapabilitiesWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.serverCapabilitiesWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.serverCapabilitiesWin.close();
	            };
	        };	        
	    };
	});	
};

var loadCapabilities = function(){
	var sectionCoverages = Ti.UI.createTableViewSection({
		//headerTitle : 'Coverages'
		headerTitle : L('WcsServer_section2_title')
	});	
	for(var i in meeoServer){
		if(meeoServer[i].url === "http://earthserver.services.meeo.it/petascope/wcs2"){
			coverages = meeoServer[i].describeCoverageArray;
			xmlData = Titanium.XML.parseString(meeoServer[i].getCapabilities);
		};
		break;
	};

	if(xmlData){
		
		//get the item nodelist from our response xml object
		//var wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("CoverageSummary");
		
		//loop each item in the xml
		//for (var i = 0; i < wcsCoverageSummary.length; i++) {
		for (var i = 0; i < coverages.length; i++) {	
			//create a table row
			var row = Titanium.UI.createTableViewRow({
				height : css.rowHeight,
				hasChild : true,
				backgroundColor : css.bcTvRowColor,
				className : 'coverage-row',
				coverageId : coverages[i].id
			});
			//title row
			var titleRow = Titanium.UI.createLabel({
				text : coverages[i].id,//wcsCoverageSummary.item(i).getElementsByTagName("CoverageId").item(0).textContent,
				font : {
					fontSize : css.titleFontSize,
					fontWeight : 'bold'
				},
				color : css.titleColor,
				left : 10,
				tight : 10,
				top : 5,
				height : css.titleHeight
			});
			//description row
			var descriptionRow = Titanium.UI.createLabel({
				text : "RectifieldGridCoverage",//wcsCoverageSummary.item(i).getElementsByTagName("CoverageSubtype").item(0).textContent,
				font : {
					fontSize : css.descriptionFontSize,
					fontWeight : 'normal'
				},
				color : css.descriptionColor,
				left : 10,
				right : 10,
				bottom : 5,
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
			sectionCoverages.add(row);
		};
		
		$.capabilitiesTv.appendSection(sectionCoverages);
	};
};

var tvClick = function(e) {
	// e.row contains information about the row that was clicked.
	// e.row.title = Your Row Title
	// children = the objects added to your row.
	if (e.index == 0) {
		if(OS_IOS){
			var wcsMetadataWin = Alloy.createController("meeo/WcsMetadataWin", {
				navWin: navWin,
				xmlData : xmlData
				
			}).getView();
			navWin.openWindow(wcsMetadataWin);
		}else{
			var wcsMetadataWin = Alloy.createController("/meeo/WcsMetadataWin", {
				xmlData : xmlData
			}).getView();
			wcsMetadataWin.open();
		};		
	} else {

	
		if(OS_IOS){
			var coverageMetadataWin = Alloy.createController("meeo/CoverageMetadataWin", {
				navWin: navWin,
				//xmlData : xmlData,
				rowID : e.index-1,
				coverageId : e.row.coverageId, //e.row.children[0].text,
				serverIndex : 0,
				ServiceTypeVersion : xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
			}).getView();
			navWin.openWindow(coverageMetadataWin);
		}else{
			var coverageMetadataWin = Alloy.createController("/meeo/CoverageMetadataWin",{
				//xmlData : xmlData,
				rowID : e.index-1,
				coverageId : e.row.coverageId, //e.row.children[0].text,
				serverIndex : 0,
				ServiceTypeVersion : xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
			}).getView();
			coverageMetadataWin.open();
		};	

/*
		//Attenzione e.index (in questo caso il num di riga va da 1 a n), ma ci servirà un indice che parta da 0
		if(OS_IOS){
			var coverageInfoWin = Alloy.createController("meeo/CoverageInfoWin", {
				navWin: navWin,
				coverageId : e.row.coverageId
				//xmlData : xmlData,
				//rowID : e.index - 1
			}).getView();
			navWin.openWindow(coverageInfoWin);
		}else{
			var coverageInfoWin = Alloy.createController("/meeo/CoverageInfoWin",{
				coverageId : e.row.coverageId
				//xmlData : xmlData,
				//rowID : e.index - 1
			}).getView();
			coverageInfoWin.open();
		};	
*/

	};
};