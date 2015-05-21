var debug_mode = Alloy.Globals.debug_mode;
$.longitude.text = arguments[0].x;
$.latitude.text = arguments[0].y;
$.d4.text = "0";
$.picker.applyProperties({
	minDate : arguments[0].minDate,
	maxDate : arguments[0].maxDate ,
	value : arguments[0].minDate
});
$.coverageName.text = arguments[0].coverageId;

var d4Max = arguments[0].d4;
var coverageId = arguments[0].coverageId;
var xml = arguments[0].xml;
var stopDownloadValue = false;
var isDownloading = false;
var imagesPng = [];
var serversMeeo = [];
if (Ti.App.Properties.hasProperty('serversMeeo')) {
	//Ti.API.info("serversMeeo --->");
	serversMeeo = Ti.App.Properties.getList('serversMeeo');
};

if(OS_IOS){
	var navWin = arguments[0].navWin;	
};
if(OS_ANDROID){
	$.compileGetCoverageDataWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.compileGetCoverageDataWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.compileGetCoverageDataWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.compileGetCoverageDataWin.close();
	            };
			   $.compileGetCoverageDataWin.getActivity().onCreateOptionsMenu = function(e) {
			        var doneBtn = e.menu.add({
			            title : "Send",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            //icon : "/images/add.png"
			        });
			        doneBtn.addEventListener('click', function(e) {
			            getCoverage();
			        });
			    };
			    $.compileGetCoverageDataWin.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	});	
};

$.compileGetCoverageDataWin.addEventListener('close', function() {
	for(var i=0; i<=96; i++){
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, i+".png");
		if(f.exists()){
			f.deleteFile();
		};
	};
});

var showLoading = function(){
	$.activityIndicatorView.show();
	$.loadingView.show();	
};

var hideLoading = function(){
	$.activityIndicatorView.hide();
	$.loadingView.hide();	
};

var showForecastLoading = function(){
	$.activityIndicatorForecast.show();
	$.loadingView.show();
	$.pb.show();
	$.loadingForecastView.show();
};

var hideForecastLoading = function(){
	$.activityIndicatorForecast.hide();
	$.loadingView.hide();	
	$.pb.hide();
	$.loadingForecastView.hide();
	stopDownloadValue = false;	
};

var more = function(){
	var d4Value = parseInt($.d4.text);
	if(d4Value < d4Max){
		$.lessBtn.backgroundColor = "#fff";
		$.d4.text = d4Value+1+"";
	};
	if(d4Value === d4Max-1){
		$.moreBtn.backgroundColor = "#f0f0f0";
	};
};
var less = function(){
	var d4Value = parseInt($.d4.text);
	if(d4Value > 0){
		$.moreBtn.backgroundColor = "#fff";
		$.d4.text = d4Value-1+"";
	};
	if(d4Value === 1){
		$.lessBtn.backgroundColor = "#f0f0f0";
	};
};

var convertData = function(date){ // Date object, return "yyyy-mm-dd"	
	//var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	if(m<10)
		m = "0"+m;
	var d = date.getDate();
	if(d<10)
		d = "0"+d;
	return (y+"-"+m+"-"+d);	
};

var getTimeIndexFromDate = function(date, callback){ // "yyyy-mm-dd" ---> 12356
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var timeIndex = this.responseText;
			callback(timeIndex);
		};
		xhr.onerror = function() {
			Ti.API.error(this.status + ' - ' + this.statusText);
			callback(null);
		};
		xhr.timeout = 10000;
		var strRequest = "http://glibrary.ct.infn.it/django/retrieveIndex/" + date;		
		Ti.API.info("getTimeIndexFromDate : strRequest ---> " + strRequest);		
		xhr.open('GET', strRequest);
		xhr.send();	
};

var getCoverage = function(){
	
	if(isDownloading)
		return;
	
	imagesPng = [];
	
	var checkLongitude = $.longitude.text.split(",");
	var checkLatitude = $.latitude.text.split(",");
	
	if(debug_mode){
		Ti.API.info(JSON.stringify(checkLongitude));
		Ti.API.info(JSON.stringify(checkLatitude));
	};
	
	// verifico se ho selezionato un solo punto o una regione
	if(!((checkLongitude[0]*1000000 == checkLongitude[1]*1000000) && (checkLatitude[0]*1000000 == checkLatitude[1]*1000000))){
		hideLoading();			
		showForecastLoading();	
		var time = convertData($.picker.value); // Date object ---> "yyyy-mm-dd"	
		getTimeIndexFromDate(time, function(e){
			if(e){
				Ti.API.info("\n\n\n********\n Ho ricevuto il timeIndex: " + e + "\n\n\n********\n");
				timeIndex = e;
				Ti.API.info("Il timeIndex è: " + timeIndex);
				downloadPng(0,timeIndex);
			}else{
	        	var alertDialog = 	Ti.UI.createAlertDialog({
					title : "EarthServer",
					message : "An error occurred, please try again"
				});
	        	alertDialog.show();
				hideForecastLoading();
			};
		});		
		return;				
	};

	var time = convertData($.picker.value);		
	var strRequest = '';
	strRequest = serversMeeo[0].url;
	strRequest += "?service=WCS";
	strRequest += "&request=GetCoverage";	
	strRequest += "&version="+serversMeeo[0].serviceTypeVersion;	
	strRequest += "&subsetX=x(" + $.longitude.text.replace(/ /g,"") + ")";
	strRequest += "&subsetY=y(" + $.latitude.text.replace(/ /g,"") + ")";		
	strRequest += "&subsetT=t(" + time + ")";
	strRequest += "&subset=d4(" + $.d4.text + ")";
	strRequest += "&CoverageId="+ coverageId;	
	
	Ti.API.info("strRequest ----> " + strRequest);

	// activity indicator for entertainment
	showLoading();
	
	//declare the http client object to retrieve Capabilities XML
	var xhr = Titanium.Network.createHTTPClient();
	
	//this method will process the remote data
	xhr.onload = function() {		
		var xmlText = this.responseText;
		if(debug_mode)
			Ti.API.info(this.responseText);
		var tuplesArray = [];
		var tupleValuesArray = [];
		
		var start = xmlText.indexOf("<tupleList>");
		var end = xmlText.indexOf("</tupleList>");		
		tuplesArray = xmlText.slice(start+11,end);
		//Ti.API.info(JSON.stringify(tuplesArray));
		
		if(debug_mode)
			Ti.API.info(tuplesArray.length);
		if(tuplesArray.length < 1000){			// nel caso di un solo punto, ottengo una sola  tupla di 97 valori, che
												// genera una "tuplesArray.length" di circa 770. In caso contrario vuol dire
												// he ho selezionato una regione di mappe, con un elenco variabile di tuple.
												// In tal caso anziché generare i grafici dovrò scaricare le 97 png.

			tuplesArray = tuplesArray.split(",");
			//Ti.API.info(JSON.stringify(tuplesArray));

			/*
			for(var i in tuplesArray){
				tupleValuesArray.push(tuplesArray[i].split(" "));
			};
			Ti.API.info(JSON.stringify(tupleValuesArray));
			*/
			tupleValuesArray = tuplesArray[0].split(" ");
			if(debug_mode)
				Ti.API.info(JSON.stringify(tupleValuesArray));
			for(i in tupleValuesArray){
				tupleValuesArray[i] = parseFloat(tupleValuesArray[i]).toFixed(3)*1000;
			}
			
			if(debug_mode)
				Ti.API.info(JSON.stringify(tupleValuesArray));
			
			var startDate = [$.picker.value.getFullYear(),$.picker.value.getMonth(),$.picker.value.getDate()];
			var dateMax = new Date($.picker.value.getFullYear(),$.picker.value.getMonth(),$.picker.value.getDate()+4);		
			var dateRange =  String.formatDate($.picker.value, "medium") + " - " + String.formatDate(dateMax, "medium"); 
			var x = $.longitude.text.split(",");
			var y = $.latitude.text.split(",");
			var chartData = {
				coordinates : "x(" + x[0] + "), y(" + y[0] + "), z(" + $.d4.text +")",
				yAxis : coverageId.replace("HRES_ENS","").replace("CONC_4326_01","").replace("PM2P5","PM2.5"),
				dateRange : dateRange,
				coverageId : coverageId,
				tupleValues : tupleValuesArray,
				startDate : startDate
			};				
		
			if(OS_IOS){
				var chartWin = Alloy.createController("meeo/ChartWin", {
					navWin: navWin,
					chartData : chartData
				}).getView();
				navWin.openWindow(chartWin);
			}else{
				var chartWin = Alloy.createController("/meeo/ChartWin",{
					chartData : chartData
				}).getView();
				chartWin.open();
			};
			
			hideLoading();						

		};/*else{
						
			hideLoading();			
			showForecastLoading();			
			downloadPng(1);			
		};*/				
		
		
		/*
		if(OS_IOS){
			var viewXmlWin = Alloy.createController("meeo/ViewXmlWin", {
				navWin: navWin,
				xmlData : xmlText
			}).getView();
			navWin.openWindow(viewXmlWin);
		}else{
			var viewXmlWin = Alloy.createController("/meeo/ViewXmlWin",{
				xmlData : xmlText
			}).getView();
			viewXmlWin.open();
		};
		*/
	};
	
	//this method will fire if there's an error in accessing the remote data
	xhr.onerror = function(e) {
		alert("There was an error retrieving the remote data.\nPlease, try again.");
		hideLoading();
	};	
	
	if(OS_ANDROID){
		xhr.autoEncodeUrl = false;	// altrimenti il carattere "," viene convertito in "%2C"
	};
	
	xhr.setTimeout(60000);
		
	xhr.open('GET', strRequest);
	
	//finally, execute the call to the remote feed
	xhr.send();

};

var showDescribeCoverage = function(){
	if(OS_IOS){
		var describeCoverageWin = Alloy.createController("meeo/DescribeCoverageWin", {
			navWin: navWin,
			xmlText : xml
		}).getView();
		navWin.openWindow(describeCoverageWin);
	}else{
		var describeCoverageWin = Alloy.createController("/meeo/DescribeCoverageWin",{
			xmlText : xml
		}).getView();
		describeCoverageWin.open();
	};
};

var stopDownload = function(){
	stopDownloadValue = true;
	isDownloading = false;	
};

var downloadPng = function(index, timeIndex){

	//Ti.API.info(stopDownloadValue);
	if(stopDownloadValue){		
		hideForecastLoading();
		openShowPngWin();
		return;
	};
	isDownloading = true;
		
	$.pb.message = "Downloading " + (index+1) + " of 97 images";
	$.pb.value = (index+1);

	var strRequest = ''; //	(esempio di url con png 105x94) http://earthserver.services.meeo.it/petascope/WCS?query=for%20data%20in%20(HRES_ENSCOCONC_4326_01)%20return%20encode((data%5B%20x(7.789616%3A18.190698)%2C%20y(35.398892%3A44.666556)%2C%20t(150895)%2Cd4(0)%5D).15%2C%22png%22)
	strRequest = "http://earthserver.services.meeo.it/petascope/WCS";
	strRequest += "?query=for%20data%20in%20("+ coverageId + ")";
	strRequest += "%20return%20encode((data%5B%20x(" + $.longitude.text.replace(/ /g,"").replace(",","%3A") + ")";
	strRequest += "%2C%20y(" + $.latitude.text.replace(/ /g,"").replace(",","%3A") + ")";		
	strRequest += "%2C%20t(" + timeIndex + ")";
	strRequest += "%2Cd4(" + $.d4.text + ")%5D)."+index+"%2C%22png%22)";

	Ti.API.info("downloadPng strRequest ---> " + strRequest);

	//declare the http client object to retrieve Capabilities XML
	var xhr = Titanium.Network.createHTTPClient();
	
	//this method will process the remote data
	xhr.onload = function() {		
		var png = this.responseData;
		//Ti.API.info(typeof png);
		var image = index + ".png";		
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, image);
		f.write(png);
		imagesPng.push(Ti.Filesystem.applicationDataDirectory + image);				
		
		if(index<96){
			index++;
			downloadPng(index, timeIndex);
		}else{
			hideForecastLoading();
			Ti.API.info("Download completed");
			openShowPngWin();
		};
	};

	//this method will fire if there's an error in accessing the remote data
	xhr.onerror = function(e) {
		if(index<96){
			Ti.API.info("It was not possible to download the image with index ---> " + index);
			index++;
			downloadPng(index, timeIndex);
		}else{
			hideForecastLoading();
			Ti.API.info("Download completed");
			openShowPngWin();
		};
	};	
	
	if(OS_ANDROID){
		xhr.autoEncodeUrl = false;	// altrimenti il carattere "," viene convertito in "%2C"
	};
	
	xhr.setTimeout(60000);
		
	xhr.open('GET', strRequest);
	
	//finally, execute the call to the remote feed
	xhr.send();
};

var openShowPngWin = function(){
	
	isDownloading = false;
	
	var x = $.longitude.text.split(",");
	var y = $.latitude.text.split(",");
	
	var pngWinTitleLbl = coverageId.replace("HRES_ENS","").replace("CONC_4326_01","").replace("PM2P5","PM2.5");		
	pngWinTitleLbl += "\n" + "x(" + $.longitude.text + ")";
	pngWinTitleLbl += "\n" + "y(" + $.latitude.text + ")";
	pngWinTitleLbl += "\n" + "z("+ $.d4.text + ")";
	pngWinTitleLbl += "\n" + String.formatDate($.picker.value,"medium") + " 00:00 ";

	if(OS_IOS){
		var showPngWin = Alloy.createController("meeo/ShowPngWin", {
			navWin: navWin,
			imagesPng : imagesPng,
			pngWinTitleLbl : pngWinTitleLbl
		}).getView();
		navWin.openWindow(showPngWin);
	}else{
		var showPngWin = Alloy.createController("/meeo/ShowPngWin",{
			imagesPng : imagesPng,
			pngWinTitleLbl : pngWinTitleLbl
		}).getView();
		showPngWin.open();
	};	
};
