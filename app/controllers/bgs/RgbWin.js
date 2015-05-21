var debug_mode = Alloy.Globals.debug_mode;
var selectedRgb = arguments[0].selectedRgb; // {r:[1,0,0,0,0,0,0],g:[1,0,0,0,0,0,0],b:[1,0,0,0,0,0,0]}
var red = arguments[0].red;
var green = arguments[0].green;
var blue = arguments[0].blue;

if(OS_IOS){
	var navWin = arguments[0].navWin;	
};
if(OS_ANDROID){
	$.rgbWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.rgbWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.rgbWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.rgbWin.close();
	            };
			   $.rgbWin.getActivity().onCreateOptionsMenu = function(e) {
			        var infoBtn = e.menu.add({
			            title : "Info",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : Ti.Android.R.drawable.ic_menu_info_details
			        });
			        infoBtn.addEventListener('click', function(e) {
			           showInfo();
			        });
			    };
			    $.rgbWin.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	});	
};

$.tvRgb.addEventListener("click", function(e){
	var index = e.source.id[2]-1;	
	switch(e.source.text){
		case "R":
			if(selectedRgb.r[index]){
				selectedRgb.r[index] = 0;
			}else{
				selectedRgb.r[index] = 1;
			};
			checkRed();
			break;
		case "G":
			if(selectedRgb.g[index]){
				selectedRgb.g[index] = 0;
			}else{
				selectedRgb.g[index] = 1;
			};
			checkGreen();
			break;
		case "B":
			if(selectedRgb.b[index]){
				selectedRgb.b[index] = 0;
			}else{
				selectedRgb.b[index] = 1;
			};
			checkBlue();
			break;
	};
});

var checkRgb = function(){
	checkRed();
	checkGreen();
	checkBlue();	
};

var checkRed = function(){
	$.red.text = "";
	for(var i in selectedRgb.r){
		if(selectedRgb.r[i] && i!=5){
			$["rb"+(parseInt(i)+1)].opacity = 1;
			$.red.text += "b"+(parseInt(i)+1)+",";
		}else if(i!=5){
			$["rb"+(parseInt(i)+1)].opacity = 0.3;
		};
	};
	if(!$.red.text){
		$.rb1.opacity = 1;
		$.red.text = "b1";
		red.text = $.red.text;
		selectedRgb.r = [1,0,0,0,0,0,0];
	}else{
		$.red.text = $.red.text.substring(0,$.red.text.length-1); //elimino l'ultima virgola
		red.text = $.red.text;
	}	
};

var checkGreen = function(){
	$.green.text = "";
	for(var i in selectedRgb.g){
		if(selectedRgb.g[i] && i!=5){
			$["gb"+(parseInt(i)+1)].opacity = 1;
			$.green.text += "b"+(parseInt(i)+1)+",";
		}else if(i!=5){
			$["gb"+(parseInt(i)+1)].opacity = 0.3;
		};
	};
	if(!$.green.text){
		$.gb2.opacity = 1;
		$.green.text = "b2";
		green.text = $.green.text;
		selectedRgb.g = [0,1,0,0,0,0,0];
	}else{
		$.green.text = $.green.text.substring(0,$.green.text.length-1); //elimino l'ultima virgola
		green.text = $.green.text;
	}	
};

var checkBlue = function(){
	$.blue.text = "";
	for(var i in selectedRgb.b){
		if(selectedRgb.b[i] && i!=5){
			$["bb"+(parseInt(i)+1)].opacity = 1;
			$.blue.text += "b"+(parseInt(i)+1)+",";
		}else if(i!=5){
			$["bb"+(parseInt(i)+1)].opacity = 0.3;
		};
	};
	if(!$.blue.text){
		$.bb3.opacity = 1;
		$.blue.text = "b3";
		blue.text = $.blue.text;
		selectedRgb.b = [0,0,1,0,0,0,0];
	}else{
		$.blue.text = $.blue.text.substring(0,$.blue.text.length-1); //elimino l'ultima virgola
		blue.text = $.blue.text;
	}	
};

var showInfo = function(){
	Ti.UI.createAlertDialog({
    	title : "EarthServer SG",
    	message : "Click on the colored buttons to assign any data band to RGB for the rendered image, or type in more complex multi-band calculations"
    }).show();	
};
