var css = Ti.API.WxsCss;
if(OS_IOS){
	var navWin = arguments[0].navWin;
};

if(OS_ANDROID){
	$.CoverageDescriptionListWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.CoverageDescriptionListWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.CoverageDescriptionListWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.CoverageDescriptionListWin.close();
	            };
	        };	        
	    };
	});	
};

var xmlData = Titanium.XML.parseString(arguments[0].xmlText);

//get the item nodelist from our response xml object
//items = xml.documentElement.getElementsByTagName("ows:ServiceIdentification");
var wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("CoverageSummary");
//win2.wcsCoverageSummary = wcsCoverageSummary;

var addedServers = [];
if (Ti.App.Properties.hasProperty('serversMeeo')) {
	addedServers = Ti.App.Properties.getList('serversMeeo');
};
/*
//Only the first time, we initializate the describeCoverageArray
if (addedServers[0].describeCoverageArray.length === 0) {	
	var covArray = [];
	for (var i = 0; i < wcsCoverageSummary.length; i++) {
		covArray.push("");
		//Ti.API.info("----> " + i);
		//covArray.push("");
	};
	//Ti.API.info("----> " + JSON.stringify(covArray));
	addedServers[0].describeCoverageArray = covArray;
	Ti.App.Properties.setList('serversMeeo', addedServers);
};
*/

Ti.API.info("addedServers[0].describeCoverageArray ----> " + JSON.stringify(addedServers[0].describeCoverageArray));

/* Definire in anticipo la lunghezza di un array
var x = 4;
var myArray = [];
myArray[x - 1] = undefined;
*/


var sectionCoverages = Ti.UI.createTableViewSection({
	//headerTitle : 'Coverages'
	headerTitle : L('WcsCoverageList_section1_title')
});
//loop each item in the xml
//for (var i = 0; i < wcsCoverageSummary.length; i++) {
var coverages = addedServers[0].describeCoverageArray;
for (var i = 0; i < coverages.length; i++) {	

	//create a table row
	var row = Titanium.UI.createTableViewRow({
		//width : tblCoverageList.width,
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
		top : 5,
		height : css.titleHeight,
		right : "10dp"
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
		bottom : 5,
		right : "10dp", //width : row.width - 20,
		height : css.descriptionHeight
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
	sectionCoverages.add(row);
}

//finally, set the data property of the tableView to our data[] object
$.coverageListTv.data = [sectionCoverages];


var showCoverageMetadata = function(e) {
	if(OS_IOS){
		var coverageMetadataWin = Alloy.createController("meeo/CoverageMetadataWin", {
			navWin: navWin,
			//xmlData : xmlData,
			rowID : e.index,
			coverageId : e.row.coverageId, //e.row.children[0].text,
			serverIndex : 0,
			ServiceTypeVersion : xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
		}).getView();
		navWin.openWindow(coverageMetadataWin);
	}else{
		var coverageMetadataWin = Alloy.createController("/meeo/CoverageMetadataWin",{
			//xmlData : xmlData,
			rowID : e.index,
			coverageId : e.row.coverageId, //e.row.children[0].text,
			serverIndex : 0,
			ServiceTypeVersion : xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
		}).getView();
		coverageMetadataWin.open();
	};	
};
