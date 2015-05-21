var path = arguments[0].path;
var typeName = arguments[0].name;

var visibleAttrs = arguments[0].visibleAttrs ? arguments[0].visibleAttrs.split(" ").splice(1) : [];

if (!visibleAttrs[0]) {
	visibleAttrs = ["FileName", "Size", "FileType", "Keywords", "LastModificationDate"];
}

var net = require('net');
var repoName = Alloy.Globals.repository;

var totalRows;

var filterQuery = "";




$.entryBrowserWindow.addEventListener('open', function() {
	loadMetadata();
	if(OS_ANDROID){
		var actionBar;	
	    if (! $.entryBrowserWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.entryBrowserWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	                $.entryBrowserWindow.close();
	            };
			    $.entryBrowserWindow.getActivity().onCreateOptionsMenu = function(e) {
			        var filtersBtn = e.menu.add({
			            title : "Filters",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : "/images/filter.png"
			        });
			        filtersBtn.addEventListener('click', function(e) {
			            applyFilters();
			        });
			    };
			    $.entryBrowserWindow.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	};
});

function loadMetadata(query) {
	Ti.API.info("entryBrowserWindow focus");
	$.itemBrowserTableView.hide();
	$.activityIndicator.show();
	//$.activityIndicator.show();
	Ti.API.info("query:" + query);
	var url = Alloy.Globals.gateway + "/glibrary/glib" + path;
	if (query) {
		filterQuery = query;
		url = url + "/?" + filterQuery;
		if(OS_IOS){
			var items = $.toolbar.items;
			items.push(clearBtn);
			$.toolbar.items = items;
		}else{
			var actionBar;	
		    if (! $.entryBrowserWindow.activity) {
		        Ti.API.error("Can't access action bar on a lightweight window.");
		    } else {
		        actionBar = $.entryBrowserWindow.activity.actionBar;
		        if (actionBar) {
		            actionBar.displayHomeAsUp = true;
		            actionBar.onHomeIconItemSelected = function() {
		                //Ti.API.info("Home icon clicked!");
		                $.entryBrowserWindow.close();
		            };
				    $.entryBrowserWindow.getActivity().onCreateOptionsMenu = function(e) {
				        var filtersBtn = e.menu.add({
				            title : "Filters",
				            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				            icon : "/images/filter.png"
				        });
				        filtersBtn.addEventListener('click', function(e) {
				            applyFilters();
				        });
				        var clearBtn = e.menu.add({
				            title : "Clear Filters",
				            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				            icon : "/images/filter_delete.png"
				        });
				        clearBtn.addEventListener('click', function()  {
							filterQuery = "";
							filtersWindow = null;
		 					$.entryBrowserWindow.getActivity().onCreateOptionsMenu = function(e) {
						        var filtersBtn = e.menu.add({
						            title : "Filters",
						            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
						            icon : "/images/filter.png"
						        });
						        filtersBtn.addEventListener('click', function(e) {
						            applyFilters();
						        });						        
						    };
						    $.entryBrowserWindow.getActivity().invalidateOptionsMenu();
							loadMetadata();						
						});
				    };
				    $.entryBrowserWindow.getActivity().invalidateOptionsMenu();
		        };	        
		    };			
		};
	};
	net.apiCall(url, function(response) {
		//Ti.API.info(response);
		var data = [];
		
		totalRows = response.total;
		//Ti.API.info(response.records);
		for (var i = 0; i < response.records.length; i++) {
			//Ti.API.info(response.records[i]);
			var row = Ti.UI.createTableViewRow({
				height : "90dp"
			});
			//Ti.API.info(response.records[i]);
			row.metadata = response.records[i];
			/*var title = response.records[i].FileName;
			row.add(Ti.UI.createLabel({
				text : title,
				top: 5,
				left : 85,
				font : {
					fontSize : 16,
					fontWeight : "bold"
				}
			})); */
			for (var j = 0; j< visibleAttrs.length; j++ ) {
				//Ti.API.info(visibleAttrs[j]);
				row.add(Ti.UI.createLabel({
					left: "80dp",
					text: (j == 0 /*|| j == 1*/) ? response.records[i][visibleAttrs[j]] : visibleAttrs[j] + ": " + response.records[i][visibleAttrs[j]],
					top: 5 + j*15,
					height : 20,
					color : "#000",
					//borderColor : "red",
					//height: (j == 0) ? 38 : 32,
					font: {
						fontSize: (j==0) ? "14sp" :"12sp",
						fontWeight: (j == 0 ? "bold" : "regular")
					},
					right: 5
					//borderWidth: 1
				}));
			}
			row.hasChild = true;
			row.add(Ti.UI.createImageView({
				left : "10dp",
				width : "60dp",
				borderRadius: "5dp",
				//height: 80,
				image : Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
			}));
			row.id = response.records[i][path + ":FILE"];
			//Ti.API.info(row.id);
			data.push(row);
		}
		$.activityIndicator.hide();
		//Ti.API.info(data);
		//$.browserWindow.title = e.row.children[0].text;
		$.entryBrowserWindow.title = typeName;
		$.itemBrowserTableView.setData(data);
		$.itemBrowserTableView.show();
	}); 

};

exports.loadMetadata = loadMetadata;


function loadMore(row) {
	updating = true;
	var style;
	if(OS_IOS){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}else{
	  style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
	};
	var loadingRow = Ti.UI.createTableViewRow({height : "50dp"});
	loadingRow.add(Ti.UI.createActivityIndicator({
	  color: '#000',
	  font: {fontSize:"14sp", fontWeight:'bold'},
	  message: 'Loading...',
	  style:style,	  
	  height:"50dp",
	  width:Ti.UI.SIZE,
	  visible : true
	}));
	$.itemBrowserTableView.appendRow(loadingRow);
	var url = Alloy.Globals.gateway + "/glibrary/glib" + path;
	if (filterQuery) {
		url = url + "/?" + filterQuery + "&start=" + row;
	} else {
		url = url + "?start=" + row;
	}
	Ti.API.info("loadMore");
	net.apiCall(url, function(response) {
		//Ti.API.info(response);
		$.itemBrowserTableView.deleteRow(lastRow/*,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE}*/);
		var data = [];
		//Ti.API.info(response.records);
		for (var i = 0; i < response.records.length; i++) {
			//Ti.API.info(response.records[i]);
			var row = Ti.UI.createTableViewRow({
				height : "90dp"
			});
			//Ti.API.info(response.records[i]);
			row.metadata = response.records[i];
			/*var title = response.records[i].FileName;
			row.add(Ti.UI.createLabel({
				text : title,
				left : 90,
				font : {
					fontSize : 16,
					fontWeight : "bold"
				}
			})); */
			for (var j = 0; j< visibleAttrs.length; j++ ) {
				//Ti.API.info(visibleAttrs[j]);
				row.add(Ti.UI.createLabel({
					left: "80dp",
					text: (j == 0 /*|| j == 1*/) ? response.records[i][visibleAttrs[j]] : visibleAttrs[j] + ": " + response.records[i][visibleAttrs[j]],
					top: 5 + j*15,
					height : 20,
					color : "#000",
					//borderColor : "red",
					//height: (j == 0) ? 38 : 32,
					font: {
						fontSize: (j==0) ? "14sp" :"12sp",
						fontWeight: (j == 0 ? "bold" : "regular")
					},
					right: 5
					//borderWidth: 1
				}));
			}
			row.hasChild = true;
			row.add(Ti.UI.createImageView({
				left : 10,
				width : 60,
				borderRadius: 5,
				//height: 80,
				image : Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
			}));
			row.id = response.records[i][path + ":FILE"];
			//Ti.API.info(row.id);
			$.itemBrowserTableView.appendRow(row);
			//data.push(row);
		}
		//$.activityIndicator.hide();
		//Ti.API.info(data);
		//$.browserWindow.title = e.row.children[0].text;
		//$.entryBrowserWindow.title = typeName;
		//$.itemBrowserTableView.setData(data);
		//$.itemBrowserTableView.show();
		updating = false;
		lastRow = lastRow + response.records.length;
		Ti.API.info("lastRow: " + lastRow);
	}); 
}

var lastRow = 50;
var lastDistance = 0;
var updating = false;

function loadOnScroll(e) {
 	if (OS_IOS){
	 	// calculate location to determine direction
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
	
		// going down is the only time we dynamically load,
		// going up we can safely ignore -- note here that
		// the values will be negative so we do the opposite	
		if(distance < lastDistance){
			// adjust the % of rows scrolled before we decide to start fetching
			var nearEnd = theEnd * .75;
	
			if (!updating && (total >= nearEnd) && lastRow < totalRows)
			{
				Ti.API.info("loadMore(lastRow); ---> "+lastRow);
				loadMore(lastRow);
			}
		};
		lastDistance = distance;
	}else if (OS_ANDROID && (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount + 3)){
		//Ti.API.info("e.totalItemCount < (e.firstVisibleItem + e.visibleItemCount + 3) --> " + e.totalItemCount +" < ( "+ e.firstVisibleItem + " "+  e.visibleItemCount + " " + 3 + ")");
		if (!updating && lastRow < totalRows)
		{
			Ti.API.info("loadMore(lastRow); ---> "+lastRow);
			loadMore(lastRow);
		}		
	};
}

var filtersWindow;

function applyFilters() {
	//alert("ci siamo");
	if (!filtersWindow) {
		filtersWindow = Alloy.createController("FiltersWindow", {path: path, parent: $}).getView();
	}
	
	if(OS_IOS){
		$.entryBrowserWindow.navGroup.openWindow(filtersWindow);
		filtersWindow.navGroup = $.entryBrowserWindow.navGroup;
	}else{
		filtersWindow.open();
	};	
}


var clearBtn = Ti.UI.createButton({
	title: "Clear Filters",
	style: Ti.UI.iPhone.SystemButtonStyle.BAR
});
clearBtn.addEventListener('click', function()  {
	filterQuery = "";
	filtersWindow = null;
	var items = $.toolbar.items;
	items.pop();
	$.toolbar.items = items;
	//$.cancel.visible = false;
	loadMetadata();

});

function showMetadata(e) {
	var entryDetailWindow = Alloy.createController("entryDetailWindow", {id: e.row.id, metadata: e.row.metadata}).getView();
	if(OS_IOS){
		$.entryBrowserWindow.navGroup.openWindow(entryDetailWindow);
		entryDetailWindow.navGroup = $.entryBrowserWindow.navGroup;
	}else{
		entryDetailWindow.open();
	};
}
