var css = Ti.API.WxsCss;

var xmlData = arguments[0].xmlData;
var rowID = arguments[0].rowID;
var coverageId = arguments[0].coverageId;
var serverIndex =arguments[0].serverIndex;
var ServiceTypeVersion = arguments[0].ServiceTypeVersion;
var debug_mode = Alloy.Globals.debug_mode;

$.selectedCoverageId.headerTitle = coverageId;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.CoverageMetadataWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.CoverageMetadataWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.CoverageMetadataWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.CoverageMetadataWin.close();
	            };
	        };	        
	    };
	});	
};

var showLoading = function(){
	$.activityIndicatorView.show();
	$.loadingView.show();	
};

var hideLoading = function(){
	$.activityIndicatorView.hide();
	$.loadingView.hide();	
};

var showCoverageInfo = function(e){
	if(OS_IOS){
		var coverageInfoWin = Alloy.createController("bgs/CoverageInfoWin", {
			navWin: navWin,
			coverageId : coverageId
			//xmlData : xmlData,
			//rowID : rowID 
		}).getView();
		navWin.openWindow(coverageInfoWin);
	}else{
		var coverageInfoWin = Alloy.createController("/bgs/CoverageInfoWin",{
			coverageId : coverageId
			//xmlData : xmlData,
			//rowID : rowID
		}).getView();
		coverageInfoWin.open();
	};
};

var showDescribeCoverage = function(){
	retrieveDescribeCoverage(serverIndex, rowID);
};


/**
 * Retrieve the describeCoverage response from remote or local server
 */
function retrieveDescribeCoverage(serverIndex, coverageIndex) {
	Ti.API.info('WcsCoverageMetadata.js - serverIndex: ' + serverIndex);
	Ti.API.info('WcsCoverageMetadata.js - coverageIndex: ' + coverageIndex);

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
		getDescribeCoverage(serversBgs, serverIndex, function(xmlText) {
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
				
				if(debug_mode){
					Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));					
				};
				Ti.App.Properties.setList('serversBgs', serversBgs);
								
				hideLoading();

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
			};
		});
	} else {
		//alert("Xml già presente");	
		if(debug_mode)
			Ti.API.info("Xml già presente ----> " + JSON.stringify(serversBgs[serverIndex].describeCoverageArray[coverageIndex].xml));
		//Set the xmlText win2 property
		hideLoading();		
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
	};
};

/**
 * Get describeCoverage response
 */
function getDescribeCoverage(serversBgs, serverIndex, callback) {
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
		strRequest += '&version=' + ServiceTypeVersion;
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
