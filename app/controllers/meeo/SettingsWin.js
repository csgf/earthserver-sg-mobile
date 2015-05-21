var debug_mode = Alloy.Globals.debug_mode;
$.settingsWin.title = arguments[0].title;
var xmlText;

/* 
 * uncomment to reset the Meeo server
 */
var lastUpdate = Ti.App.Properties.getDouble("lastUpdate", 0);

/*
Ti.API.info(lastUpdate);
Ti.API.info(new Date(lastUpdate));
Ti.API.info(new Date(new Date().getTime()));
Ti.API.info(new Date(lastUpdate + 86400000)); //---> one day after the last update
*/

if(new Date(new Date().getTime()) > new Date(lastUpdate + 86400000)){
	Ti.App.Properties.setDouble("lastUpdate", new Date().getTime());
	Ti.API.info(JSON.stringify(Ti.App.Properties.getList('avalaibleServersMeeo')));
	Ti.API.info(JSON.stringify(Ti.App.Properties.getList('serversMeeo')));
	Ti.App.Properties.setList('avalaibleServersMeeo',[]);
	Ti.App.Properties.setList('serversMeeo',[]);
};
/****/

if(OS_IOS){
	var navWin = arguments[0].navWin;
	/*var closeBtn = Ti.UI.createButton({
		//title: 'close'
		title: L('NavButton_close')
	});
	$.settingsWin.leftNavButton = closeBtn; 
	closeBtn.addEventListener('click', function() {
		navWin.close();
	});*/
};
if(OS_ANDROID){
	$.settingsWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.settingsWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.settingsWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.settingsWin.close();
	            };
	        };	        
		   $.settingsWin.getActivity().onCreateOptionsMenu = function(e) {
		        var infoBtn = e.menu.add({
		            title : "Info",
		            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		            icon : Ti.Android.R.drawable.ic_menu_info_details
		        });
		        infoBtn.addEventListener('click', function(e) {
		            openInfoWin();
		        });
		    };
		    $.settingsWin.getActivity().invalidateOptionsMenu();
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

function addMeeoServerCompleted(){
	var dialog = Ti.UI.createAlertDialog({
		//message : 'New ' + win.service + ' server added',
		message : String.format(L('AddServer_OkDialog_message'), "MEEO"/*win.service*/),
		ok : 'OK',
		//title : 'Server added'
		title : L('AddServer_OkDialog_title')
	});
	dialog.addEventListener('click', function(e) {
		Ti.API.info('The cancel button was clicked');
		//win.close();
	});
	hideLoading();
	dialog.show();			
}; 

// Add Meeo Server
var addMeeoServer = function(){	

	//var avalaibleServers = Ti.App.Properties.getList('avalaibleServersMeeo', []);
	//if(avalaibleServers.length){		
		var serversMeeo = Ti.App.Properties.getList('serversMeeo', []);
		if(serversMeeo.length){
			xmlText = serversMeeo[0].getCapabilities;
			if(debug_mode){
				Ti.API.info("Meeo Server already exists");
				Ti.API.info(xmlText);
			};
			return;
		};
	//};

	// Send request to server and save response to xml text

	// activity indicator for entertainment
	showLoading();
	
	//declare the http client object to retrieve Capabilities XML
	var xhr = Titanium.Network.createHTTPClient({timeout: 120000});
	
	//this method will process the remote data
	xhr.onload = function() {
		xmlText = this.responseText;
		//Ti.API.info(xmlText);
	
		/*var avalaibleServers = [];
		//Append to avalaibleServers array the new server
		var meeoServer = {
			name : "MEEO server",
			type : "WCS",
			url : "http://earthserver.services.meeo.it/petascope/wcs2"
		};
		avalaibleServers.push(meeoServer);
		Ti.App.Properties.setList('avalaibleServersMeeo', avalaibleServers);
		*/
		
		//Append to serversMeeo array the new server
		var serversMeeo = [];
		if (Ti.App.Properties.hasProperty('serversMeeo')) {
			serversMeeo = Ti.App.Properties.getList('serversMeeo');
		};
		var covArray = [
			{id: "HRES_ENSCOCONC_4326_01", xml : ""},
			{id: "HRES_ENSNO2CONC_4326_01", xml : ""},
			{id: "HRES_ENSO3CONC_4326_01", xml : ""},
			{id: "HRES_ENSPM10CONC_4326_01", xml : ""},
			{id: "HRES_ENSPM2P5CONC_4326_01", xml : ""},
			{id: "HRES_ENSSO2CONC_4326_01", xml : ""}
		];
		var xmlData = Titanium.XML.parseString(xmlText);		
		var newServer = {
			name : "MEEO server",
			type : "WCS",
			serviceTypeVersion : xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent,
			url : "http://earthserver.services.meeo.it/petascope/wcs2",
			getCapabilities : xmlText,
			describeCoverageArray : covArray
			//describeCoverageArray : null
		};
		serversMeeo.push(newServer);
		Ti.App.Properties.setList('serversMeeo', serversMeeo);

/*******---->*/

		var serverIndex = 0;
		var coverageIndex = 0;
		
		/**
		 * Get describeCoverage response
		 */
		function getDescribeCoverage(serversMeeo, serverIndex,coverageId) {
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
					
					//alert(JSON.stringify(serversMeeo[serverIndex].describeCoverageArray[coverageIndex]));				
					//alert(xmlText);
					//Update the addedArray and then the property
					serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml = xmlText;
					
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
					serversMeeo[serverIndex].describeCoverageArray[coverageIndex].spatialEnvelope = spatialEnvelope;
					// aggiorno l'array 
					describeCoverageArray = serversMeeo[serverIndex].describeCoverageArray;
					
					if(debug_mode)
						Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));				
					
					if(coverageIndex<5){
						coverageIndex++;
						getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
					}else{
						Ti.App.Properties.setList('serversMeeo', serversMeeo);
						addMeeoServerCompleted();
					};
				};
		
				//this method will fire if there's an error in accessing the remote data
				xhr.onerror = function() {
					//log the error to our titanium developer console
					Ti.API.error(this.status + ' - ' + this.statusText);
					if(coverageIndex<5){
						coverageIndex++;
						getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
					}else{
						Ti.App.Properties.setList('serversMeeo', serversMeeo);
						addMeeoServerCompleted();
					};
				};
		
				//Set timeout in milliseconds
				xhr.timeout = 10000;
		
				//var coverageIdArray = win.coverageIdArray;
				//Create the request string for describeCoverage
				var strRequest = serversMeeo[serverIndex].url;
				strRequest += '?service=' + serversMeeo[serverIndex].type;
				strRequest += '&version=' + serversMeeo[serverIndex].serviceTypeVersion;
				strRequest += '&request=DescribeCoverage';
				strRequest += '&coverageId=' + coverageId;
				
				Ti.API.info("getDescribeCoverage url ---> " + strRequest);
		
				xhr.open('GET', strRequest);
				//Send request
				xhr.send();
			} catch(e) {
				//alert(e);
				if(coverageIndex<5){
					coverageIndex++;
					getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
				}else{
					Ti.App.Properties.setList('serversMeeo', serversMeeo);
					addMeeoServerCompleted();
				};
			}
		};
		getDescribeCoverage(serversMeeo, serverIndex,serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);		
/*******<----*/
		//addMeeoServerCompleted();
	};
	
	//this method will fire if there's an error in accessing the remote data
	xhr.onerror = function(e) {
		alert(L('AddServer_ErrorDialog_message'));
		hideLoading();
		setTimeout(function(){
			if(OS_IOS)
				$.settingsWin.fireEvent("closeSettingsWin");
				//navWin.close();
			else
				$.settingsWin.close();
		},OS_IOS ? 500 : 5000);
	};
	
	//Create the Request string for Capabilities
	var strRequest = 'http://earthserver.services.meeo.it/petascope/wcs2?Service=WCS&Request=GetCapabilities';
	
	xhr.open('GET', strRequest);
	
	//finally, execute the call to the remote feed
	xhr.send();
};

var showAvailableCoverage = function(){
	if(OS_IOS){
		var availableCoveragesWin = Alloy.createController("meeo/AvailableCoveragesWin", {
			navWin: navWin
		}).getView();
		navWin.openWindow(availableCoveragesWin);
	}else{
		var availableCoveragesWin = Alloy.createController("/meeo/AvailableCoveragesWin").getView();
		availableCoveragesWin.open();
	};	
};

var showServerCapabilities = function(){
	if(OS_IOS){
		var serverCapabilitiesWin = Alloy.createController("meeo/ServerCapabilitiesWin", {
			navWin: navWin
		}).getView();
		navWin.openWindow(serverCapabilitiesWin);
	}else{
		var serverCapabilitiesWin = Alloy.createController("/meeo/ServerCapabilitiesWin").getView();
		serverCapabilitiesWin.open();
	};	
};

var showCoverageDescriptionList = function(){
	if(OS_IOS){
		var coverageDescriptionListWin = Alloy.createController("meeo/CoverageDescriptionListWin", {
			navWin: navWin,
			xmlText : xmlText
		}).getView();
		navWin.openWindow(coverageDescriptionListWin);
	}else{
		var coverageDescriptionListWin = Alloy.createController("/meeo/CoverageDescriptionListWin",{
			xmlText : xmlText
		}).getView();
		coverageDescriptionListWin.open();
	};	
};


// InfoWin
var infoWin = Ti.UI.createWindow({
	title : "MEEO info"
});
var wv = Ti.UI.createWebView({url:"/MEEO.html"});
infoWin.add(wv);
if(OS_ANDROID){
	wv.applyProperties({scalesPageToFit:true, enableZoomControls:false});
	infoWin.addEventListener('open', function() {
		var actionBar;	
	    if (! infoWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = infoWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	              	infoWin.close();
	            };
	        };	        
	    };
	});
};
		
var openInfoWin = function(){
	if(OS_IOS){
		navWin.openWindow(infoWin);
	}else{
		infoWin.open();	
	};
};
