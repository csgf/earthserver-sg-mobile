var replicas = arguments[0];

$.mapview.setRegion({
	latitude: replicas[0].lat,
	longitude: replicas[0].lng,
	latitudeDelta: 12,
	longitudeDelta: 12
});

for (var i = 0; i < replicas.length; i++) {
	var ann = Alloy.Globals.Map.createAnnotation({
		latitude : replicas[i].lat,
		longitude : replicas[i].lng,
		title : replicas[i].name,
		pincolor : Alloy.Globals.Map.ANNOTATION_RED,
		animate : true,
		leftButton : '/storage.png'
	});

	if (replicas[i].enabled == "1") {
		//Ti.API.info(response[i].enabled);
		ann.pincolor = Alloy.Globals.Map.ANNOTATION_GREEN;
		ann.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE;
		ann.link = replicas[i].link;
		$.mapview.selectAnnotation(ann);

	}
	//$.mapview.entryID = e.row.id;
	$.mapview.addAnnotation(ann);

}
if(OS_ANDROID){
	$.replicaWindow.addEventListener('open', function() {
		var actionBar;	
	    if (! $.replicaWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.replicaWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.replicaWindow.close();
	            };
	        };	        
	    };
	});
};

function downloadReplica(e) {
	if (e.clicksource == 'rightButton' || e.clicksource == 'leftPane' || e.clicksource == 'title') {
		Ti.API.info("Annotation.link:" + e.annotation.link);
		// var url = e.annotation.link.split('=')[1].slice(1, -8);
		var url = e.annotation.link.split('=')[1].split(' ')[0];
		if(url.indexOf("/glibrary") > -1) {
		//if (url.indexOf("/glibrary") == 0) {
			url = Alloy.Globals.gateway + url;
		}
		Ti.API.info("Splitted URL:" + url);
		var fileType = url.substring(url.length - 3);
		var webView = Alloy.createController("WebViewer", {url:url}).getView();
		webView.backButtonTitle = "Replicas";
		webView.title = url.split("/")[url.split("/").length-1];
		webView.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT];
		if(OS_IOS){
			$.replicaWindow.navGroup.openWindow(webView);
		}else{
			webView.open();
		};
	}
}
