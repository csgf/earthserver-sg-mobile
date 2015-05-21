var debug_mode = Alloy.Globals.debug_mode;
var cornerRegion = {}; // MapBounds object = {no:{lat:"",lng:""},ne:{lat:"",lng:""},so:{lat:"",lng:""},se:{lat:"",lng:""}};
var availableCoverage = [];
var notDownloadedCoverage = [];
var routeAdded = false;
var route;

$.currentCity.text = Ti.App.Properties.getString("cittaPredefinita", "Enter address...");

if(OS_IOS){
	var navWin = arguments[0].navWin;
	$.availableCoverageWin.addEventListener('close', function() {
		$.switchGeo.value = false;
		checkGeolocation({value:false});
	});
};
if(OS_ANDROID){
	$.availableCoverageWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.availableCoverageWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.availableCoverageWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
			       $.availableCoverageWin.remove($.mapview);
			       $.mapview = null;
			       $.tv.deleteRow(3);
	               $.availableCoverageWin.close();
	            };
			   /*$.availableCoverageWin.getActivity().onCreateOptionsMenu = function(e) {
			        var filtersBtn = e.menu.add({
			            title : "Done",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            //icon : "/images/add.png"
			        });
			        filtersBtn.addEventListener('click', function(e) {
			            showCompilesData();
			        });
			    };
			    $.availableCoverageWin.getActivity().invalidateOptionsMenu();*/
	        };	        
	    };
	});	
	$.availableCoverageWin.addEventListener('android:back', function() {
		$.switchGeo.value = false;
		checkGeolocation({value:false});
		$.availableCoverageWin.remove($.mapview);
		$.mapview = null;
		$.tv.deleteRow(3);
		$.availableCoverageWin.close();
	});
};

/*
$.picker.applyProperties({
	minDate : new Date(2009,0,1),
	maxDate : new Date(),
	value : new Date()	
});
*/

var getDateFromTimeIndex = function(timeIndex, callback){ // 12356 ---> "yyyy-mm-dd 00:00:00"
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var timeString = this.responseText;
			callback(timeString);
		};
		xhr.onerror = function() {
			Ti.API.error(this.status + ' - ' + this.statusText);
			callback(null);
		};
		xhr.timeout = 10000;
		var strRequest = "http://glibrary.ct.infn.it/django/convertTime/" + timeIndex;		
		Ti.API.info("getDateFromTimeIndex : strRequest ---> " + strRequest);		
		xhr.open('GET', strRequest);
		xhr.send();	
};

var updateSliderLabel = function(e){
	$.sliderLabel.text = "Degree: " + parseFloat(e.value/1000).toFixed(3) + "°";
};

var serversBgs = [];
var describeCoverageArray = [];
if (Ti.App.Properties.hasProperty('serversBgs')) {
	//Ti.API.info("serversBgs --->");
	serversBgs = Ti.App.Properties.getList('serversBgs');
	//Ti.API.info(JSON.stringify(serversBgs));
	describeCoverageArray = serversBgs[0].describeCoverageArray;
};

/**
 * Retrieve the describeCoverage response from remote or local server
 */
function retrieveDescribeCoverage(serverIndex, coverageIndex) {
	Ti.API.info('availableCoverageWin.js - serverIndex: ' + serverIndex);
	Ti.API.info('availableCoverageWin.js - coverageIndex: ' + coverageIndex);

	showLoading();

	//Verify if describeCoverage response is null for the server with index choosen
	var serversBgs = [];
	if (Ti.App.Properties.hasProperty('serversBgs')) {
		//Ti.API.info("serversBgs --->");
		serversBgs = Ti.App.Properties.getList('serversBgs');
		//Ti.API.info(JSON.stringify(serversBgs));
	};
	
	if(debug_mode)
		Ti.API.info("Selected coverage: ---> " + JSON.stringify(serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml));
	
	if (serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml === "") {
		if(debug_mode)
			Ti.API.info("Xml non presente: lo scarico dal server ----> ");
		//Inoltriamo la richiesta
		getDescribeCoverage(serversBgs, serverIndex, serversBgs[serverIndex].describeCoverageArray[coverageIndex].id, function(xmlText) {
			alert(L('WcsDescribeCoverage_message'));
			//now we have to use the variable `returnedData` any any other normal returned variable
	
			if (xmlText == null) {
				alert("error");
				hideLoading();
			} else {
				
				//alert(JSON.stringify(serversBgs[serverIndex].describeCoverageArray[coverageIndex]));				
				//alert(xmlText);
				//Update the addedArray and then the property
				serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml = xmlText;
				
				// Salvo i valori del lowerCorner e upperCorner
				var spatialEnvelope = {
					lowerCorner : [], 	// x,y,z,d4
					upperCorner : []	// x,y,z,d4		
				};
				
				var xmlData = Titanium.XML.parseString(xmlText);
				var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
				var numbersArray = [];
				numbersArray = str.split(" ");				
				for (var i = 0; i < numbersArray.length; i++) {
					spatialEnvelope.lowerCorner.push(parseFloat(numbersArray[i]).toFixed(6));
				};
								
				var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
				//str = str.replace(" ", "\n");
				var numbersArray = [];
				numbersArray = str.split(" ");				
				for (var i = 0; i < numbersArray.length; i++) {
					spatialEnvelope.upperCorner.push(parseFloat(numbersArray[i]).toFixed(6));
				};								
				serversBgs[serverIndex].describeCoverageArray[coverageIndex].spatialEnvelope = spatialEnvelope;
				// aggiorno l'array 
				describeCoverageArray = serversBgs[serverIndex].describeCoverageArray;
				
				if(debug_mode)
					Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));
				Ti.App.Properties.setList('serversBgs', serversBgs);
				
				checkAvailableCoverage();
				
				hideLoading();

				/*
				if(OS_IOS){
					var describeCoverageWin = Alloy.createController("bgs/DescribeCoverageWin", {
						navWin: navWin,
						xmlText : serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml
					}).getView();
					navWin.openWindow(describeCoverageWin);
				}else{
					var describeCoverageWin = Alloy.createController("/bgs/DescribeCoverageWin",{
						xmlText : serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml
					}).getView();
					describeCoverageWin.open();
				};
				*/
			};
		});
	} else {
		//alert("Xml già presente");	
		if(debug_mode)
			Ti.API.info("Xml già presente ----> " + JSON.stringify(serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml));
		//Set the xmlText win2 property
		hideLoading();		
		/*if(OS_IOS){
			var describeCoverageWin = Alloy.createController("bgs/DescribeCoverageWin", {
				navWin: navWin,
				xmlText : serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml
			}).getView();
			navWin.openWindow(describeCoverageWin);
		}else{
			var describeCoverageWin = Alloy.createController("/bgs/DescribeCoverageWin",{
				xmlText : serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml
			}).getView();
			describeCoverageWin.open();
		};*/
	};
};

/**
 * Get describeCoverage response
 */
function getDescribeCoverage(serversBgs, serverIndex, coverageId, callback) {
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

		//var coverageIdArray = win.coverageIdArray;
		//Create the request string for describeCoverage
		var strRequest = serversBgs[serverIndex].url;
		strRequest += '?service=' + serversBgs[serverIndex].type;
		strRequest += '&version=' + serversBgs[serverIndex].serviceTypeVersion;
		strRequest += '&request=DescribeCoverage';
		strRequest += '&coverageId=' + coverageId;
		
		Ti.API.info("getDescribeCoverage url ---> " + strRequest);

		xhr.open('GET', strRequest);
		//Send request
		xhr.send();
	} catch(e) {
		//alert(e);
		callback(null);
	}
};

var tvClick = function(e){
	if(e.row.download){
		Ti.API.info("Scarica la coverage con describeCoverageArrayIndex = " + e.row.describeCoverageArrayIndex);
		retrieveDescribeCoverage(0,e.row.describeCoverageArrayIndex);
	}else if(e.row.compilesData){
		showCompilesData(e.row.coverageId, e.row.describeCoverageArrayIndex);	
	};
};

var checkAvailableCoverage = function(deltaBox){	
	Ti.API.info("checkAvailableCoverage ---->");
	//$.availableCoverage.text = "";
	$.tv.deleteSection(3);
	$.tv.deleteSection(2);
	$.tv.removeEventListener("click", tvClick);
	var availableCoverageSection = Ti.UI.createTableViewSection({headerTitle : "Available coverages in this area"});
	var notDownloadedCoverageSection = Ti.UI.createTableViewSection({headerTitle : ""/*"Coverages not yet downloaded"*/});
	availableCoverage = [];
	notDownloadedCoverage = [];
	if(debug_mode)
		Ti.API.info("describeCoverageArray ----> " + JSON.stringify(describeCoverageArray));
	
	// converto le coordinate lat/long in coordinate BNG easting/northing
	if(deltaBox){
		var coordsBNGMin = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.no.lat-(deltaBox/3),cornerRegion.no.lng-(deltaBox/2));
		var coordsBNGMax = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.se.lat+(deltaBox/3),cornerRegion.ne.lng+(deltaBox/2));
	}else{
		var coordsBNGMin = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.se.lat,cornerRegion.no.lng);
		var coordsBNGMax = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.no.lat,cornerRegion.ne.lng);
	};
	if(debug_mode){
		Ti.API.info("*********BNG CONVERTER***********");
		Ti.API.info("coordsBNGMin: minLat,minLng --> minN,minE ---> " + JSON.stringify(coordsBNGMin));
		Ti.API.info("coordsBNGMax: maxLat,maxLng --> maxN,maxE ---> " + JSON.stringify(coordsBNGMax));
		Ti.API.info("********************");
	};
				
	for(var i in describeCoverageArray){		
		if(describeCoverageArray[i].spatialEnvelope){
			var margine = 0; // introduco un margine di distanza massima (in BNG) entro cui può essere lontana una coverage dal bounding box scelto
								// così visualizzp nell'elenco delle coverage disponibili anche quelle che ricoprono solo una parte del bounding box
			if(debug_mode){
				Ti.API.info("VERIFICA: ---->");
				Ti.API.info("----> " + describeCoverageArray[i].id + " : " + JSON.stringify(describeCoverageArray[i].spatialEnvelope));
				
				/*Ti.API.info(coordsBNGMin.estr +" >= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[0])-margine));
				Ti.API.info(coordsBNGMax.estr +" <= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[0])+margine));
				Ti.API.info(coordsBNGMin.nstr +" >= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[1])-margine));
				Ti.API.info(coordsBNGMax.nstr +" <= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[1])+margine));*/
				Ti.API.info(coordsBNGMin.estr +" <= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[0])-margine));
				Ti.API.info(coordsBNGMax.estr +" >= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[0])+margine));
				Ti.API.info(coordsBNGMin.nstr +" <= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[1])-margine));
				Ti.API.info(coordsBNGMax.nstr +" >= "+ (parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[1])+margine));
				Ti.API.info("Landsat7 tile layers --> "+ (describeCoverageArray[i].id.indexOf("l7_refl_p") != -1));
			
			};			
			
			if( /*(coordsBNGMin.estr >= parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[0])-margine) &&
				(coordsBNGMax.estr <= parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[0])+margine) &&
				(coordsBNGMin.nstr >= parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[1])-margine) &&
				(coordsBNGMax.nstr <= parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[1])+margine) &&*/
				(coordsBNGMin.estr <= parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[0])-margine) &&
				(coordsBNGMax.estr >= parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[0])+margine) &&
				(coordsBNGMin.nstr <= parseFloat(describeCoverageArray[i].spatialEnvelope.upperCorner[1])-margine) &&
				(coordsBNGMax.nstr >= parseFloat(describeCoverageArray[i].spatialEnvelope.lowerCorner[1])+margine) &&
				(describeCoverageArray[i].id.indexOf("l7_refl_p") != -1)) // visualizzo solo i Landsat7 tile layers
				{
				Ti.API.info("----> VERIFICATO :)");
					availableCoverage.push({
						id: describeCoverageArray[i].id,
						describeCoverageArrayIndex : i
					});
			}else{
				Ti.API.info("----> NON VERIFICATO :(");
			};
		}else{			
			notDownloadedCoverage.push({
				id: describeCoverageArray[i].id,
				describeCoverageArrayIndex : i
			});
		};
	};
	for(var j in availableCoverage){
		if(debug_mode)
			Ti.API.info("availableCoverage ----> " + JSON.stringify(availableCoverage[j]));
		//$.availableCoverage.text += availableCoverage[j] + "\n"; 
		var row = Ti.UI.createTableViewRow({
			backgroundColor : "#fff",
			hasChild : true,
			coverageId : availableCoverage[j].id,
			describeCoverageArrayIndex : availableCoverage[j].describeCoverageArrayIndex,
			compilesData : true
		});
		var titleLbl = Ti.UI.createLabel({
			font : {
				fontSize : Ti.API.WxsCss.descriptionFontSize,
				fontWeight : 'bold'
			},
			color : Ti.API.WxsCss.titleColor,
			left : "10dp",			
			height : "40dp",
			right : "5dp",
			text : availableCoverage[j].id + 
						"\npath: " + availableCoverage[j].id.substring(9,12) +
						", row: " + availableCoverage[j].id.substring(13,16) +
						", date: " + availableCoverage[j].id.substring(23,25) + "-" + availableCoverage[j].id.substring(21,23) + "-" + availableCoverage[j].id.substring(17,21)
		});
		row.add(titleLbl);
		availableCoverageSection.add(row);
	};	
	$.tv.appendSection(availableCoverageSection);
	//var height = $.availableCoverageRow.setHeight(50 + (parseInt(availableCoverage.length) * 20) + "dp");
	//$.availableCoverageRow.setHeight(height);
	//$.availableCoverage.setHeight(Ti.UI.SIZE);
	//Ti.API.info("$.availableCoverage.text ----> \n" + $.availableCoverage.text);
	//Ti.API.info("$.availableCoverageRow.height ---->" + $.availableCoverageRow.height);
		
	for(var k in notDownloadedCoverage){
		if(debug_mode)
			Ti.API.info("notDownloadedCoveragee ----> " + JSON.stringify(notDownloadedCoverage[k]));
		var row = Ti.UI.createTableViewRow({
			backgroundColor : "#fff",
			coverageId : notDownloadedCoverage[k].id,
			describeCoverageArrayIndex : notDownloadedCoverage[k].describeCoverageArrayIndex,
			download : true
		});
		var titleLbl = Ti.UI.createLabel({
			font : {
				fontSize : Ti.API.WxsCss.descriptionFontSize,
				fontWeight : 'normal'
			},
			color : Ti.API.WxsCss.titleColor,
			left : "10dp",			
			height : "40dp",
			right : "5dp",
			text : notDownloadedCoverage[k].id + " (" + notDownloadedCoverage[k].id.replace("HRES_ENS","").replace("CONC_4326_01","").replace("PM2P5","PM2.5") + ")"
		});
		var downloadIV = Ti.UI.createImageView({
			right : "10dp",
			width : "30dp",
			height : "30dp",
			image : "/download.png"
		});
		row.add(titleLbl);
		row.add(downloadIV);
		notDownloadedCoverageSection.add(row);
	};
	$.tv.appendSection(notDownloadedCoverageSection);
	$.tv.addEventListener("click", tvClick);
};

var showLoading = function(){
	$.activityIndicator.show();	
	$.activityIndicatorView.show();
	$.loadingView.show();	
};

var hideLoading = function(){
	setTimeout(function(){
		$.activityIndicator.hide();	
		$.activityIndicatorView.hide();
		$.loadingView.hide();
	},OS_ANDROID ? 500 : 50);	
};

/**
 * Get the screen boundaries as latitude and longitude values 
 */

function getMapBounds(region) {
    b = {};
    b.no = {}; b.ne = {};
    b.so = {}; b.se = {};
 
    b.no.lat = parseFloat(region.latitude) + 
        parseFloat(region.latitudeDelta) / 2.0;
    b.no.lng = parseFloat(region.longitude) - 
        parseFloat(region.longitudeDelta) / 2.0;
 
    b.so.lat = parseFloat(region.latitude) - 
        parseFloat(region.latitudeDelta) / 2.0;
    b.so.lng = parseFloat(region.longitude) - 
        parseFloat(region.longitudeDelta) / 2.0;
 
    b.ne.lat = parseFloat(region.latitude) + 
        parseFloat(region.latitudeDelta) / 2.0;
    b.ne.lng = parseFloat(region.longitude) + 
        parseFloat(region.longitudeDelta) / 2.0;
 
    b.se.lat = parseFloat(region.latitude) - 
        parseFloat(region.latitudeDelta) / 2.0;
    b.se.lng = parseFloat(region.longitude) + 
        parseFloat(region.longitudeDelta) / 2.0;
 
    return b;
}

var updateMapDelta = function(){	

	if(routeAdded){
		$.mapview.removeRoute(route);
		routeAdded = false;
	};
	
	/*// modifico la regionFit in base al delta
	var addDelta = $.slider.value/3000;//0.1;	
	if(addDelta === 0){
		addDelta = 0.0001
	}
	if($.slider.value/1000 < 0.04){
		addDelta = 0.001;
	}else if($.slider.value/1000 < 0.05){
		addDelta = 0.01;
	}else if($.slider.value/1000 < 0.08){
		addDelta = 0.03;
	}else if($.slider.value/1000 < 0.1){
		addDelta = 0.05;
	}else if($.slider.value/1000 > 0.4){
		addDelta = 0.2;
	}*/
	var regionMappa = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 1,//$.slider.value/1000+addDelta,
		longitudeDelta: 1//$.slider.value/1000+addDelta
	};
	$.mapview.setRegion(regionMappa);

	// Adesso calcolo le coordinate degli angoli della regione di mappa, in base al delta scelto
	var regionBound = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0,//parseFloat($.slider.value/1000).toFixed(3),
		longitudeDelta: 0//parseFloat($.slider.value/1000).toFixed(3)
	};
	cornerRegion = getMapBounds(regionBound);
	
	/**BOUNDING BOX CURRENT POSITION**/
	var deltaBox = 0.5;
	if(routeAdded)
		$.mapview.removeRoute(route);
	var points = [
		{latitude: parseFloat(latitude)-(deltaBox/3), longitude:parseFloat(longitude)-(deltaBox/2)},
		{latitude: parseFloat(latitude)+(deltaBox/3), longitude:parseFloat(longitude)-(deltaBox/2)},
		{latitude: parseFloat(latitude)+(deltaBox/3), longitude:parseFloat(longitude)+(deltaBox/2)},
		{latitude: parseFloat(latitude)-(deltaBox/3), longitude:parseFloat(longitude)+(deltaBox/2)},
		{latitude: parseFloat(latitude)-(deltaBox/3), longitude:parseFloat(longitude)-(deltaBox/2)},
	];
	Ti.API.info(JSON.stringify(points));
	route = Alloy.Globals.Map.createRoute({
        name: 'Bgs draw map',
        points: points,
        color: '#c60000',
        width: 4
    });							
    routeAdded = true;
	$.mapview.removeAllAnnotations();
	$.mapview.addRoute(route);	
	// centro la mappa e adatto lo zoom
	var region = findZoomRegion(points);
	$.mapview.setRegion(region);	
	/**BOUNDING BOX CURRENT POSITION**/

	// Dopo aver calcolato la regionBound, verifico quali coverage sono disponibili all'interno
	checkAvailableCoverage(deltaBox);	
	if(debug_mode){
		Ti.API.info(JSON.stringify(regionMappa));
		Ti.API.info(JSON.stringify(cornerRegion));
	};
	/*$.mapview.removeAllAnnotations();
	var annNO = Alloy.Globals.Map.createAnnotation({
		latitude : cornerRegion.no.lat,
		longitude : cornerRegion.no.lng,
		//title : "no",
		image: "/images/cornerNO.png",
		//animate : true
	});				
	$.mapview.addAnnotation(annNO);

	var annNE = Alloy.Globals.Map.createAnnotation({
		latitude : cornerRegion.ne.lat,
		longitude : cornerRegion.ne.lng,
		//title : "ne",
		image: "/images/cornerNE.png",
		//animate : true
	});				
	$.mapview.addAnnotation(annNE);

	var annSO = Alloy.Globals.Map.createAnnotation({
		latitude : cornerRegion.so.lat,
		longitude : cornerRegion.so.lng,
		//title : "so",
		image: "/images/cornerSO.png",
		//animate : true
	});				
	$.mapview.addAnnotation(annSO);
	
	var annSE = Alloy.Globals.Map.createAnnotation({
		latitude : cornerRegion.se.lat,
		longitude : cornerRegion.se.lng,
		//title : "se",
		image: "/images/cornerSE.png",
		//animate : true
	});				
	$.mapview.addAnnotation(annSE);	*/		


	var currentPositionAnn = Alloy.Globals.Map.createAnnotation({
		latitude : latitude,
		longitude : longitude,
		title : $.currentCity.text,
		pincolor : Alloy.Globals.Map.ANNOTATION_RED,
		//animate : true
	});				
	$.mapview.addAnnotation(currentPositionAnn );
	$.mapview.selectAnnotation(currentPositionAnn );

	$.currentCoords.text = "lon: " + parseFloat(longitude).toFixed(4) + "; lat: " + parseFloat(latitude).toFixed(4);
	var coordsBNGMin = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.no.lat-(deltaBox/3),cornerRegion.no.lng-(deltaBox/2));
	var coordsBNGMax = require("/bgn_coordinates_converter").LLtoNE(cornerRegion.se.lat+(deltaBox/3),cornerRegion.ne.lng+(deltaBox/2));
	if(debug_mode){
		Ti.API.info("*********BNG CONVERTER***********");
		Ti.API.info("coordsBNGMin: minLat,minLng --> minN,minE ---> " + JSON.stringify(coordsBNGMin));
		Ti.API.info("coordsBNGMax: maxLat,maxLng --> maxN,maxE ---> " + JSON.stringify(coordsBNGMax));
		Ti.API.info("********************");
	};
	//$.longitude.text = parseFloat(cornerRegion.no.lng).toFixed(6) + ", " + parseFloat(cornerRegion.ne.lng).toFixed(6);
	//$.latitude.text = parseFloat(cornerRegion.se.lat).toFixed(6) + ", " + parseFloat(cornerRegion.no.lat).toFixed(6);
	$.longitude.text = parseFloat(coordsBNGMin.estr).toFixed(6) + ", " + parseFloat(coordsBNGMax.estr).toFixed(6);
	$.latitude.text = parseFloat(coordsBNGMin.nstr).toFixed(6) + ", " + parseFloat(coordsBNGMax.nstr).toFixed(6);
	$.width.text = parseFloat(parseFloat(coordsBNGMax.estr).toFixed(6) - parseFloat(coordsBNGMin.estr).toFixed(6)).toFixed(6);
	$.height.text = parseFloat(parseFloat(coordsBNGMax.nstr).toFixed(6) - parseFloat(coordsBNGMin.nstr).toFixed(6)).toFixed(6);
	$.area.text = parseFloat(parseFloat($.width.text) *  parseFloat($.height.text)).toFixed(6);
	//$.altitude.text = parseFloat(altitude).toFixed(2) || "0";
	
};

// Calcolo la regione della mappa da visualizzare in base alle coordinate dei punti
var findZoomRegion = function(points) {
    var tmpDeltatLat = 0, tmpDeltatLong = 0, maxDeltatLat = 0, maxDeltatLong = 0, centerLat = 0, centerLong = 0;
	// 
    for(var i = 0; i <= Math.floor(points.length-1 / 2); i++) {
        for(var j = points.length-1; j >= Math.floor(points.length-1 / 2); j--) {
            if(j != i) {
            	//Ti.API.info("i=" + i + "; j=" + j);
                tmpDeltatLat = Math.abs(Math.abs(points[i].latitude) - Math.abs(points[j].latitude));
                if(tmpDeltatLat > maxDeltatLat) {
                    maxDeltatLat = tmpDeltatLat;
                    centerLat = Math.min(points[i].latitude, points[j].latitude) + maxDeltatLat / 2;
                };
                tmpDeltatLong = Math.abs(Math.abs(points[i].longitude) - Math.abs(points[j].longitude));
                if(tmpDeltatLong > maxDeltatLong) {
                    maxDeltatLong = tmpDeltatLong;
                    centerLong = Math.min(points[i].longitude, points[j].longitude) + maxDeltatLong / 2;
                };
            };
        };
    };
    if(OS_ANDROID){
	    maxDeltatLat = Math.floor(maxDeltatLat+1);
	    maxDeltatLong = Math.floor(maxDeltatLong+1);
	}
    var region = {
        latitude : centerLat,
        longitude : centerLong,
        latitudeDelta : maxDeltatLat+1,
        longitudeDelta : maxDeltatLong+1
    };
    return region;
};
    
// --> GEOLOCATION FUNCTIONS
var geolocation = require("/configGeolocation");
var latitude, longitude, altitude;

var updateMap = function(lon, lat){
	$.mapview.removeAllAnnotations();
	var region = {
		latitude: lat,
		longitude: lon,
		latitudeDelta: 0,//parseFloat($.slider.value/1000).toFixed(3),
		longitudeDelta: 0 //parseFloat($.slider.value/1000).toFixed(3)
	};
	updateMapDelta(region);
};

var posizioneCorrente = function(){
  	Titanium.Geolocation.getCurrentPosition(function(e){		
		if (e.error) {
            //alert(e.error);
        	var alertDialog = 	Ti.UI.createAlertDialog({
				title : "EarthServer",
				message : "Enable location services to take advantage of all features"
			});
        	alertDialog.show();
        	
			$.switchGeo.value = false;
			hideLoading();
			checkGeolocation({value:false});
			// posiziono la mappa sulla città predefinita. Se non esiste, la posiziono su Roma;
			var citta = Ti.App.Properties.getString("cittaPredefinita","Roma, Italia");
			Ti.API.info("La cittaPredefinita è: " + citta);
			$.address.value = citta;
			retriveAddressCoords(citta);
        }
        else {
	        Ti.API.info("getCurrentPosition Data: " + JSON.stringify(e));
	        var mylongitude = e.coords.longitude;
	       	var mylatitude = e.coords.latitude;
	       	altitude = e.coords.latitude;
				        
	        Titanium.Geolocation.reverseGeocoder(mylatitude, mylongitude, function(evt){	            
	            if(debug_mode){
	            	Ti.API.info(JSON.stringify(evt));
	            };
	            
	            if(evt.error || !evt.success){
	            						
					var url="http://maps.google.com/maps/api/geocode/json?latlng="+mylatitude+","+mylongitude+"&sensor=true";
					if(debug_mode)
						Ti.API.info('Titanium.Geolocation.reverseGeocoder error, try Google geocode service\n'+url);
					var xhr = Titanium.Network.createHTTPClient();
					xhr.open('GET',url);
					xhr.onerror = function() {
				    	var alertDialog = 	Ti.UI.createAlertDialog({
							title : "EarthServer",
							message : "A connection failure occurred. Please, try again."
						});
				    	alertDialog.show();
				    	
						$.switchGeo.value = false;
						hideLoading();
						// posiziono la mappa sulla città predefinita. Se non esiste, la posiziono su Roma;
						var citta = "Roma, Italia";					
						$.currentCity.text = citta;
						$.address.value = citta;		 			
						//updateMap(parseFloat(12.4831), parseFloat(41.8933));			    	
				    	longitude = 12.4831;
				    	latitude = 41.8933;	
				    	updateMap(longitude, latitude);			    	
				    	$.switchGeo.value = false;
				    	checkGeolocation({value:false});
						return;	
					};
					xhr.onload = function() {
					    var json = this.responseText;
					    var gotitems = eval('(' + json + ')');
					    if(gotitems.status === "OK"){
					        if(debug_mode)
					        	Ti.API.info('>ADR 1:'+ gotitems.results[0].formatted_address);
				            $.currentCity.text = gotitems.results[0].formatted_address;
				            $.currentCity.visible = true;
					    	longitude = mylongitude;
					    	latitude = mylatitude;			    	
							updateMap(longitude, latitude);
				            hideLoading();	
				            return;	                       
					     }else{
					     	xhr.onerror();
					     }
					};
					xhr.send();
					            	
	            }else{	
	            	            
		            var places = evt.places;
		            if(debug_mode){
			            for(i in places){
			                Ti.API.info("la mia posizione potrebbe essere : " + places[i].address);
			            };
			        };
		            if(places.length>0){
			            var citta = places[0].city.split(",");
			            var address = places[0].address.split(",");
			            $.currentCity.text = address[0] + ", " + citta[0] + ", " +  places[0].country;
			            $.currentCity.visible = true;
				    	longitude = places[0].longitude;
				    	latitude = places[0].latitude;			    	
						updateMap(longitude, latitude);					
		            };
		            hideLoading();
		            
				};
	        });	        	
        }
 
    });
};

// Creo una funzione per attivare/disattivare il GPS
 if(OS_IOS){
 	var locationCallbackIOS = geolocation.locationCallbackIOS;
 }else if(OS_ANDROID){
 	var locationCallbackAndroid = geolocation.locationCallbackAndroid;
 };
var configGeolocation = function(){
	if(Ti.App.Properties.getString("geolocation") != ""){
	    if(OS_IOS){
		    Ti.Geolocation.addEventListener('location', locationCallbackIOS);
		    if(debug_mode)
		    	Ti.API.info("Ti.Geolocation.addEventListener('location', locationCallbackIOS);");
		}else{
		    Ti.Geolocation.addEventListener('location', locationCallbackAndroid);
		    if(debug_mode)
		    	Ti.API.info("Ti.Geolocation.addEventListener('location', locationCallbackAndroid);");				
		};
		posizioneCorrente();
	}else{
		if(OS_IOS){
			Ti.Geolocation.removeEventListener('location', locationCallbackIOS);
			if(debug_mode)
				Ti.API.info("Ti.Geolocation.removeEventListener('location', locationCallbackIOS);");
		}else{
			Ti.Geolocation.removeEventListener('location', locationCallbackAndroid);
			if(debug_mode)
				Ti.API.info("Ti.Geolocation.removeEventListener('location', locationCallbackAndroid);");				
		};			
	}
};

var checkGeolocation = function(e){
	if(e.value){			
		//$.city.color = "#838383";
		//$.currentCity.color = "#838383";
		$.currentCity.visible = false;
		$.currentCityRow.hasChild = true;
		//posizioneCorrenteLbl.visible = true;
		$.currentCity.enabled = true;
		//$.drawMapLbl.color = "#838383";
		$.drawMapRow.hasChild = true;
		Ti.App.Properties.setString("geolocation", "GPSPosition");
		showLoading();
	}else{
		Ti.App.Properties.setString("geolocation", "");			
		//posizioneCorrenteLbl.text = "";
		//posizioneRow.height = "50dp";
		$.city.color = "#000";
		$.currentCity.color = "#000";
		$.currentCity.visible = true;
		$.currentCityRow.hasChild = true;
		//posizioneCorrenteLbl.visible = false;
		$.drawMapLbl.color = "#000";
		$.drawMapRow.hasChild = true;
		hideLoading();
		$.currentCity.enabled = true;
	};
	configGeolocation();
};




var slide_in =  Titanium.UI.createAnimation({top:0});
var slide_out =  Titanium.UI.createAnimation({top:-251});

function chooseFilter() {		
	/*if($.switchGeo.value)
		return;*/
	$.address.focus();
	if(OS_IOS)
		$.pickerView.animate(slide_in);
	else{
		$.availableCoverageWin.backgroundColor = "gray";
		$.pickerView.show();
	};
	//Ti.API.info(JSON.stringify($.filterList));
}

function hidePickerView() {
	if(OS_IOS)
		$.pickerView.animate(slide_out);
	else{
		$.pickerView.hide();
		$.availableCoverageWin.backgroundColor = "white";
	};
	$.address.blur();
}

function filterChoosen() {
	if(OS_IOS)
		$.pickerView.animate(slide_out);
	else{
		$.availableCoverageWin.backgroundColor = "white";
		$.pickerView.hide();
	};
	$.address.blur();
	showLoading();
	retriveAddressCoords($.address.value);
}


var retriveAddressCoords = function(citta){
	Titanium.Geolocation.forwardGeocoder(citta, function(evt){	    
	    currentLocation = {
	    	longitude : evt.longitude,
	    	latitude : evt.latitude
	    };
	   	if(debug_mode){
	        Ti.API.info("Le coordinate della città '" + $.address.value + "' sono: " + JSON.stringify(currentLocation));
			Ti.API.info(JSON.stringify(evt));			
	    };
	    if(evt.success){
	    	
	    	$.currentCity.text = $.address.value;
			longitude = evt.longitude;
	    	latitude = evt.latitude;
 			altitude = "0";
 			updateMap(longitude, latitude);
	    	var citta = Ti.App.Properties.setString("cittaPredefinita", $.address.value);// + ", Italia";
	    	$.switchGeo.value = false;
	    	checkGeolocation({value:false});
	    	
	    }else if(evt.error || !evt.success){
			
			var url="http://maps.google.com/maps/api/geocode/json?address="+$.address.value+"&sensor=true";
			if(debug_mode)
				Ti.API.info('Titanium.Geolocation.forwardGeocoder error, try Google geocode service\n' + url);
			var xhr = Titanium.Network.createHTTPClient();
			xhr.open('GET',url);
			xhr.onerror = function() {
	        	var alertDialog = 	Ti.UI.createAlertDialog({
					title : "EarthServer",
					message : "Address not found. \nPlease try a different address."
				});
				alertDialog.show();

		    	/*$.currentCity.text = $.address.value;
				longitude = evt.longitude;
		    	latitude = evt.latitude;
	 			altitude = "0";
	 			updateMap(longitude, latitude);
		    	var citta = Ti.App.Properties.setString("cittaPredefinita", $.address.value);// + ", Italia";
		    	$.switchGeo.value = false;
		    	checkGeolocation({value:false});*/	    	
				return;	
			};
			xhr.onload = function() {
			    var json = this.responseText;
			    var gotitems = eval('(' + json + ')');			    
			    if(gotitems.status === "OK"){
			    	if(debug_mode)
			    		Ti.API.info(JSON.stringify(gotitems.results[0].geometry.location));
			    	$.currentCity.text = $.address.value;
					longitude = gotitems.results[0].geometry.location.lng;
			    	latitude = gotitems.results[0].geometry.location.lat;
		 			altitude = "0";
		 			updateMap(longitude, latitude);
			    	var citta = Ti.App.Properties.setString("cittaPredefinita", $.address.value);// + ", Italia";
			    	$.switchGeo.value = false;
			    	checkGeolocation({value:false});		            	                       
			     }else{
		        	xhr.onerror();	     	
			     };
			};
			xhr.send();
			
	    };
	    hideLoading();
	});
};

// GEOLOCATION FUNCTIONS <---

// Se ho impostato la posizione da GPS, all'avvio rilevo la posizione
//if(Ti.App.Properties.getString("geolocation"))
if($.switchGeo.value){
	checkGeolocation({value:true});
};

var openDrawableMap = function(){
	
	if(!$.drawMapRow.hasChild)
		return;
		
	var retriveMapData = function(e){
		if(OS_IOS){
			navWin.closeWindow(drawableMapWin);
		}else{
			drawableMapWin.close();
		};		
		Ti.API.info(JSON.stringify(e.mapData));
		drawableMapWin.removeEventListener("mapData", retriveMapData);
		if(e.mapData){			
			$.currentCity.text = "";			
			var mapData = e.mapData;
			if(routeAdded)
				$.mapview.removeRoute(route);
			route = Alloy.Globals.Map.createRoute({
	            name: 'Bgs draw map',
	            points: mapData.boundingBoxPoints,
	            color: '#c60000',
	            width: 4
	        });			
			
			cornerRegion.no.lng = mapData.coordinates[2]; // mapData.coordinates = [minLat,maxLat,minLng,maxLng];
			cornerRegion.ne.lng = mapData.coordinates[3];
			cornerRegion.se.lat = mapData.coordinates[0];
			cornerRegion.no.lat = mapData.coordinates[1];			
			
			checkAvailableCoverage();
			
	        routeAdded = true;
			$.mapview.removeAllAnnotations();
			$.mapview.addRoute(route);	
			// centro la mappa e adatto lo zoom
			var region = findZoomRegion(mapData.boundingBoxPoints);
			$.mapview.setRegion(region);
			
			//$.longitude.text = mapData.coordinates[2] + ", " + mapData.coordinates[3];
			//$.latitude.text = mapData.coordinates[0] + ", " + mapData.coordinates[1];

			var coordsBNGMin = require("/bgn_coordinates_converter").LLtoNE(mapData.coordinates[0],mapData.coordinates[2]);
			var coordsBNGMax = require("/bgn_coordinates_converter").LLtoNE(mapData.coordinates[1],mapData.coordinates[3]);
			if(debug_mode){
				Ti.API.info("*********BNG CONVERTER***********");
				Ti.API.info("coordsBNGMin: minLat,minLng --> minN,minE ---> " + JSON.stringify(coordsBNGMin));
				Ti.API.info("coordsBNGMax: maxLat,maxLng --> maxN,maxE ---> " + JSON.stringify(coordsBNGMax));
				Ti.API.info("********************");
			};			
			$.longitude.text = parseFloat(coordsBNGMin.estr).toFixed(6) + ", " + parseFloat(coordsBNGMax.estr).toFixed(6);
			$.latitude.text = parseFloat(coordsBNGMin.nstr).toFixed(6) + ", " + parseFloat(coordsBNGMax.nstr).toFixed(6);
			$.width.text =  parseFloat(parseFloat(coordsBNGMax.estr).toFixed(6) - parseFloat(coordsBNGMin.estr).toFixed(6)).toFixed(6);
			$.height.text =  parseFloat(parseFloat(coordsBNGMax.nstr).toFixed(6) - parseFloat(coordsBNGMin.nstr).toFixed(6)).toFixed(6);
			$.area.text = parseFloat(parseFloat($.width.text) *  parseFloat($.height.text)).toFixed(6);
						
			$.switchGeo.value = false;
	    	checkGeolocation({value:false});	
		};
	};

	if(OS_IOS){
		var drawableMapWin = Alloy.createController("bgs/DrawableMapWin", {
			navWin: navWin
		}).getView();
		navWin.openWindow(drawableMapWin);
	}else{
		var drawableMapWin = Alloy.createController("/bgs/DrawableMapWin", {
			
		}).getView();
		drawableMapWin.open();
	};
	drawableMapWin.addEventListener("mapData", retriveMapData);
};

var stringToDate = function(dateString){
	var dateArray = dateString.replace(" 00:00:00","");
	dateArray = dateArray.split("-");
	Ti.API.info(dateArray);
	return new Date(dateArray[0],dateArray[1]-1,dateArray[2]);
};
var showCompilesData = function(coverageId, describeCoverageArrayIndex){
	showLoading();	
	var xml = describeCoverageArray[describeCoverageArrayIndex].xml;
	
	// Calcolo l'height dell'immagine nel caso in cui il width è 300. In questo modo, utilizzando la
	// imageRatio (width/height) posso calcolare proporzionalmente il width al variare dell'height e viceversa
	var imageRatioXY = parseFloat(parseFloat($.width.text)/parseFloat($.height.text)).toFixed(2);
	var imageHeight = parseInt(300 / imageRatioXY);

	if(OS_IOS){
		var compileGetCoverageDataWin = Alloy.createController("bgs/CompileGetCoverageDataWin", {
			navWin: navWin,
			x : $.longitude.text,
			y : $.latitude.text,
			imageHeight : imageHeight,
			coverageId : coverageId,			
			xml : xml
		}).getView();
		navWin.openWindow(compileGetCoverageDataWin);
	}else{
		var compileGetCoverageDataWin = Alloy.createController("/bgs/CompileGetCoverageDataWin", {
			x : $.longitude.text,
			y : $.latitude.text,
			imageHeight : imageHeight,
			coverageId : coverageId,
			xml : xml
		}).getView();
		compileGetCoverageDataWin.open();
	};
	hideLoading();

};

var changeSwitchGeolocation = function(){
	$.switchGeo.setValue(!$.switchGeo.getValue());
};