var mapData;

var useConvexHull = true;
$.btnClear.enabled = false;

if(OS_IOS){
	var navWin = arguments[0].navWin;
};
if(OS_ANDROID){
	$.drawableMapWin.addEventListener('open', function() {
		var actionBar;	
	    if (! $.drawableMapWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.drawableMapWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.drawableMapWin.close();
	            };
			   $.drawableMapWin.getActivity().onCreateOptionsMenu = function(e) {
			        var doneBtn = e.menu.add({
			            title : "Done",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            //icon : "/images/add.png"
			        });
			        doneBtn.addEventListener('click', function(e) {
			            retriveMapData();
			        });
			    };
			    $.drawableMapWin.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	});
};

function startDraw(){
	$.btnDraw.enabled = false;
	$.DrawableMap.startDraw({useConvexHull:useConvexHull,lineWidth:4,lineColor:"#0000ff",throttleTimer:75});
	//$.lblRoute.text='';
}
function clearRoute(){
	$.DrawableMap.clearRoute();
	$.btnClear.enabled=false;
	//$.lblRoute.text='';
}
function ConvexHull(){
	useConvexHull=!useConvexHull;
}
$.DrawableMap.addEventListener('drawEnd',function(e){
	$.btnDraw.enabled = true;
	$.btnClear.enabled=true;
	//$.lblRoute.text=useConvexHull?JSON.stringify($.DrawableMap.hullPoints):JSON.stringify($.DrawableMap.allPoints);
	//$.lblRoute.text = $.DrawableMap.boundingBoxPoints;
	//$.lblRoute.text += $.DrawableMap.coodinates;
	mapData = {
		boundingBoxPoints : $.DrawableMap.boundingBoxPoints,
		coordinates : $.DrawableMap.coodinates
	};
});
$.drawableMapWin.addEventListener('open', function() {
    $.DrawableMap.setSizes();
    //$.DrawableMap.TiDrawableMapView.setRegion({latitude:36.9167, longitude:-76.2,latitudeDelta:2.0, longitudeDelta:2.0});
});
function retriveMapData(){
	$.drawableMapWin.fireEvent("mapData", {mapData : mapData});
};
