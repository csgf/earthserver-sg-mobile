var metadata = arguments[0].metadata;
var id = arguments[0].id;


$.thumb.image = Ti.Utils.base64decode(metadata["/" + Alloy.Globals.repository + "/Thumbs:Data"]);

for (var i in metadata) {
	if (i.indexOf("/") != 0) {
		var row = Ti.UI.createTableViewRow({
			minRowHeight : 40
		});
		row.add(Ti.UI.createLabel({
			text : i,
			left : 5,
			height: 40,
			font : {
				fontWeight : "bold",
				fontSize : "12"
			},
			color : "#000"
		}));
		if (metadata[i]) {
			row.add(Ti.UI.createLabel({
				text : metadata[i],
				right : 5,
				left : 130,
				height : Ti.UI.SIZE,
				font : {
					fontSize : "12"
				},
				color : "#000"
			}));
		}

		$.details.appendRow(row);
	}
	//Ti.API.info(metadata.FileName)
	//Ti.API.info(i);
}

function downloadEntry() {
	var net = require('net');
	net.apiCall(Alloy.Globals.gateway + "glibrary/links2/" + Alloy.Globals.repository + "/" + id + "/", function(response) {
		var replicaWindow = Alloy.createController("replicaWindow", response).getView();
		if(OS_IOS){
			$.entryDetailWindow.navGroup.openWindow(replicaWindow);
			replicaWindow.title = metadata.FileName;
			replicaWindow.navGroup = $.entryDetailWindow.navGroup;
		}else{
			replicaWindow.title = metadata.FileName;
			replicaWindow.open();
		};
	});
}

$.entryDetailWindow.addEventListener('open', function() {
	if(OS_ANDROID){
		var actionBar;	
	    if (! $.entryDetailWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.entryDetailWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	                $.entryDetailWindow.close();
	            };
			    $.entryDetailWindow.getActivity().onCreateOptionsMenu = function(e) {
			        var filtersBtn = e.menu.add({
			            title : "Download",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : "/images/cloud_download.png"
			        });
			        filtersBtn.addEventListener('click', function(e) {
			            downloadEntry();
			        });
			    };
			    $.entryDetailWindow.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	};
});