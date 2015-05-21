var debug_mode = Alloy.Globals.debug_mode;
var images = arguments[0].imagesPng;
var pngWinTitleLbl = arguments[0].pngWinTitleLbl;
var duration = 100; // animation duration ms

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

for(var i in images){
	// check the size of the frames
	var f = Ti.Filesystem.getFile(images[i]).read();
	var imgW = f.width;
	var imgH = f.height;
	if(debug_mode)
		Ti.API.info("frame size: ---> " + imgW + "x" + imgH);

	if(imgW<100 && imgH<100){
		imgW *= 3;
		imgH *= 3;
		if(debug_mode)
			Ti.API.info("resize 3x: ---> " + imgW + "x" + imgH);
	}else if(imgW<200 && imgH<200){
		imgW *= 2;
		imgH *= 2;
		if(debug_mode)
			Ti.API.info("resize 2x: ---> " + imgW + "x" + imgH);
	};		

	if(imgW>0 && imgH>0){
		$.imagesPng.applyProperties({
			width : imgW + "dp",
			height : imgH + "dp"
		});
		break;
	};
};

$.titleLbl.text = pngWinTitleLbl + " + 0 h";
$.imagesPng.images = images;
$.imagesPng.start();
$.sliderImages.applyProperties({
	min : 0,
	max : images.length-1
});
if(OS_ANDROID){
	$.speedLbl.color = "#838383";
};

$.imagesPng.addEventListener("change", function(e){
	Ti.API.info(e.index);
	$.sliderImages.value = e.index;
	$.titleLbl.text = pngWinTitleLbl + " + " + e.index + " h";
});
//Ti.API.info(JSON.stringify(arguments[0].imagesPng));

var pause = false;
function pauseStart(){
	if(!pause){
		$.imagesPng.stop();		
		if(OS_ANDROID){
			$.speedLbl.color = "#000";
		};
		$.pauseStartBtn.backgroundImage = "/play.png";		
		$.sliderImages.enabled = true;
		pause = true;
	}else{
		$.imagesPng.start();
		if(OS_ANDROID){
			$.speedLbl.color = "#838383";
		};
		$.imagesPng.images = images;
		$.sliderImages.enabled = false;				
		pause = false;
		$.pauseStartBtn.backgroundImage = "/pause.png";		
	};
};
function changeSliderImages (e){
	if(pause){
		var value = parseInt(e.value);
		if(value<=0){
			value = 0;
		}else if(value>=images.length){
			value = images.length-1;
		};
		Ti.API.info(value);
		$.imagesPng.image = images[value];
		$.titleLbl.text = pngWinTitleLbl + " + " + value + " h";
	};
};

function changeSliderOpacity(e){
	var value = parseFloat(e.value).toFixed(2);
	if(value<=0){
		value = 0;
	}else if(value>=1){
		value = 1;
	};
	Ti.API.info(value);
	$.imagesPng.opacity = value;
};

function lessSpeed(){
	if(OS_ANDROID){
		if(!pause)
			return;
	};
	if(duration>0)
		duration = parseInt(duration) - 50;
	$.speedLbl.text = "Frame speed: " + duration + "ms";
	$.imagesPng.setDuration(duration);
};
function moreSpeed(){
	if(OS_ANDROID){
		if(!pause)
			return;
	};
	duration = parseInt(duration) + 50;
	$.speedLbl.text = "Frame speed: " + duration + "ms";
	$.imagesPng.setDuration(duration);
};