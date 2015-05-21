var debug_mode = Alloy.Globals.debug_mode;
var imageInformation = arguments[0].imageInformation;
var imageName = arguments[0].imageName;

$.pngIV.image = Ti.Filesystem.tempDirectory + imageName;
$.coverageName.text = imageInformation.coverageName;
$.longitude.text = imageInformation.longitude;
$.latitude.text = imageInformation.latitude;
$.size.text = imageInformation.size;
$.red.text = imageInformation.red;
$.green.text = imageInformation.green;
$.blue.text = imageInformation.blue;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.showPngWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.showPngWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.showPngWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.showPngWin.close();
	            };
	        };	        
	    };
	});	
};

var showImage = function(){
	if (OS_IOS) {
		Ti.UI.iOS.createDocumentViewer({
			url : Ti.Filesystem.tempDirectory + imageName
		}).show();
	}else{
    	var w = Ti.UI.createWindow();

		w.addEventListener('open', function() {
			var actionBar;	
		    if (! w.activity) {
		        Ti.API.error("Can't access action bar on a lightweight window.");
		    } else {
		        actionBar = w.activity.actionBar;
		        if (actionBar) {
		            actionBar.displayHomeAsUp = true;
		            actionBar.onHomeIconItemSelected = function() {
		                //Ti.API.info("Home icon clicked!");
		               w.close();
		            };
		        };	        
			   w.getActivity().onCreateOptionsMenu = function(e) {
			        var infoBtn = e.menu.add({
			            title : "Share",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : "/images/ic_action_share.png"
			        });
			        infoBtn.addEventListener('click', function(e) {
			            shareImage();
			        });
			    };
			    w.getActivity().invalidateOptionsMenu();
		    };
		});	

    	var imagePath = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory + imageName).nativePath;
		/*var imageIV = Ti.UI.createImageView({
			image: Ti.Filesystem.tempDirectory + imageName
		});
		var imageBlob = imageIV.toImage();		
		var widthIV = parseFloat(imageBlob.width);
		var heightIV = parseFloat(imageBlob.height);*/
		
		var html = /*"<html><head>" + 
					'<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=4, user-scalable=yes">'+
					"</head><body>" + 
					"<div style='zoom: 50%; ' >"+
					"<img src='"+imagePath+"' style='position: absolute; top: 50%; left: 50%; width: "+widthIV+"; height: "+heightIV+"; margin-left: -"+widthIV/2+"; margin-top: -"+heightIV/2+";'/>"+
					"</div></body></html>"; //" <img src='"+imagePath+"'/>";*/
					"<img src='"+imagePath+"' style='position: absolute; top: 10px; left: 10px;'/>";
    	var wv = Ti.UI.createWebView({        		
    		scalesPageToFit : true,
    		enableZoomControls : true,
    		showScrollbars : true,
    		left : "0dp",
    		right : "0dp",
    		top : "0dp",
    		bottom : "0dp",
    		backgroundColor : "#fff",
    		html : html
    	});
		if(debug_mode){
    		//Ti.API.info(widthIV + " x " + heightIV);
    		Ti.API.info(html);
		};		
			
		w.add(wv);
		w.open();
    };		
};

if(OS_ANDROID){
	var shareImage = function(){
	        var imagePath = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory + imageName).nativePath;
	        var shareIntent = Ti.Android.createIntent({
	            action: Ti.Android.ACTION_SEND,
	            type: "image/jpeg"
	        });
	        shareIntent.putExtra(Ti.Android.EXTRA_TITLE, "EarthServer SG Mobile");
	        shareIntent.putExtra(Ti.Android.EXTRA_SUBJECT, 'EarthServer SG Mobile');
	        shareIntent.putExtra(Ti.Android.EXTRA_TEXT, "EarthServer SG Mobile: BGS Landsat image");
	        shareIntent.putExtraUri(Ti.Android.EXTRA_STREAM, imagePath);
	        Ti.Android.currentActivity.startActivity(Ti.Android.createIntentChooser(shareIntent, "Share image"));
	};
};

var removePng = function(){
	var image = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory + imageName);
	if(image.exists()){
		Ti.API.info("Remove " + imageName + " image from device");
		image.deleteFile();
	};
};
