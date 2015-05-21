var debug_mode = Alloy.Globals.debug_mode;
var imageHeight = arguments[0].imageHeight;
var coverageId = arguments[0].coverageId;
var xml = arguments[0].xml;
var imageWidth = 300;
$.srsname.text = Titanium.XML.parseString(xml).documentElement.getElementsByTagName("Envelope").item(0).getAttribute("srsName");
$.longitude.text = arguments[0].x;
$.latitude.text = arguments[0].y;
$.coverageName.text = arguments[0].coverageId;
$.size.text = "300 x " + imageHeight;

var stopDownloadValue = false;
var isDownloading = false;
var serversBgs = [];
if (Ti.App.Properties.hasProperty('serversBgs')) {
	//Ti.API.info("serversBgs --->");
	serversBgs = Ti.App.Properties.getList('serversBgs');
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
	$.loadingForecastView.show();
};

var hideForecastLoading = function(){
	$.activityIndicatorForecast.hide();
	$.loadingView.hide();	
	$.loadingForecastView.hide();
	stopDownloadValue = false;	
};

var getCoverage = function(){
	
	if(isDownloading)
		return;
	
	var size = $.size.text.split(" x ");
	var strRequest = '';
	strRequest += 'http://earthserver.bgs.ac.uk/petascope/WCS?query=';
	strRequest += 'for v1 in ('+ coverageId+') ';	
	strRequest += 'return encode ( scale ( trim(struct { red : (char) v1.'+$.red.text+'; ';	
	strRequest += 'green : (char) v1.'+$.green.text+'; ';
	strRequest += 'blue : (char) v1.'+$.blue.text+' }, ';
	strRequest += '{x:"'+$.srsname.text+'"('+$.longitude.text.replace(/ /g,"").replace(",",":") + '), ';
	strRequest += 'y:"'+$.srsname.text+'"('+$.latitude.text.replace(/ /g,"").replace(",",":") + ')}), ';
	strRequest += '{x:"CRS:1"(0:'+size[0]+'), ';
	strRequest += 'y:"CRS:1"(0:'+size[1]+')}, {} ),"png", "nodata=0,0,0" )';
		
	Ti.API.info("strRequest ----> " + strRequest);
	strRequest = encodeURI(strRequest);
	Ti.API.info("URIstrRequest ----> " + strRequest);

	// activity indicator for entertainment
	showLoading();
	
	//declare the http client object to retrieve Capabilities XML
	var xhr = Titanium.Network.createHTTPClient();
	
	//this method will process the remote data
	xhr.onload = function() {		
		var png = this.responseData;
		//Ti.API.info(typeof png);
		var imageName = "/BGS_image_" + new Date().getTime() + ".jpeg";		
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, imageName);
		f.write(png);
		
		hideLoading();
		Ti.API.info("Download completed");
		openShowPngWin(imageName);
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
		var describeCoverageWin = Alloy.createController("bgs/DescribeCoverageWin", {
			navWin: navWin,
			xmlText : xml
		}).getView();
		navWin.openWindow(describeCoverageWin);
	}else{
		var describeCoverageWin = Alloy.createController("/bgs/DescribeCoverageWin",{
			xmlText : xml
		}).getView();
		describeCoverageWin.open();
	};
};

var changeSliderSize = function(e){		
	var value = parseInt(e.value);
	var newImageWidth;
	var newImageHeight;
	if(value<=0){
		value = 0;
	}else if(value>=200){
		value = 200;
	};	
	newImageWidth = parseInt(imageWidth) + parseInt((imageWidth*value)/100);
	newImageHeight = parseInt(imageHeight) + parseInt((imageHeight*value)/100);
	$.size.text = newImageWidth + " x " +  newImageHeight;
};

var openShowPngWin = function(imageName){
		
	isDownloading = false;
	var imageInformation = {
		coverageName : $.coverageName.text,
		longitude : $.longitude.text,
		latitude : $.latitude.text,
		size : $.size.text,
		red : $.red.text,
		green : $.green.text,
		blue : $.blue.text
	};	
	
	if(OS_IOS){
		var showPngWin = Alloy.createController("bgs/ShowPngWin", {
			navWin: navWin,
			imageInformation : imageInformation,
			imageName : imageName
		}).getView();
		navWin.openWindow(showPngWin);
	}else{
		var showPngWin = Alloy.createController("/bgs/ShowPngWin",{
			imageInformation : imageInformation,
			imageName : imageName
		}).getView();
		showPngWin.open();
	};	
};

var checkRgbRow = function(e){
	if(e.row.rgbrow){
		openRgbWin();
	};
};

var selectedRgb = {
	r : [1,0,0,0,0,0,0],
	g : [0,1,0,0,0,0,0],
	b : [0,0,1,0,0,0,0]
};
var openRgbWin = function(){	
	if(OS_IOS){
		var rbgWin = Alloy.createController("bgs/RgbWin", {
			navWin: navWin,
			selectedRgb : selectedRgb,
			red : $.red,
			green : $.green,
			blue : $.blue
		}).getView();
		navWin.openWindow(rbgWin);
	}else{
		var rbgWin = Alloy.createController("/bgs/RgbWin",{
			selectedRgb : selectedRgb,
			red : $.red,
			green : $.green,
			blue : $.blue
		}).getView();
		rbgWin.open();
	};
};