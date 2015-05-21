var slide_in =  Titanium.UI.createAnimation({bottom:0});
var slide_out =  Titanium.UI.createAnimation({bottom:-251});

var path = arguments[0].path;
//var filter = arguments[0].query;
var entryBrowserController = arguments[0].parent;
var filterQuery, lastFilterQuery;

var picker = Ti.UI.createPicker({top: OS_IOS ? 43 : 70, selectionIndicator: true, type: Titanium.UI.PICKER_TYPE_PLAIN});


var net = require('net');

net.apiCall(Alloy.Globals.gateway + "/glibrary/metadata" + path, function(response) {
	//Ti.API.info(response.filters);

	var rows = [];
	for (var i=0; i<response.filters.length; i++) {
		rows.push(Ti.UI.createPickerRow({title: response.filters[i].dataIndex, index: i, height: "40dp"}));
		//Ti.API.info(response.filters[i].dataIndex);
	}
	picker.add(rows);
	$.pickerView.add(picker);
});

function chooseFilter() {
	
	if(OS_IOS)
		$.pickerView.animate(slide_in);
	else{
		$.FiltersWindow.backgroundColor = "gray";
		$.pickerView.show();
	};
	$.addFilter.enabled = false;
	//Ti.API.info(JSON.stringify($.filterList));
}

function hidePickerView() {
	if(OS_IOS)
		$.pickerView.animate(slide_out);
	else{
		$.pickerView.hide();
		$.FiltersWindow.backgroundColor = "white";
	};
	$.addFilter.enabled = true;
}

function filterChoosen() {
	if(OS_IOS)
		$.pickerView.animate(slide_out);
	else{
		$.FiltersWindow.backgroundColor = "white";
		$.pickerView.hide();
	};
	$.addFilter.enabled = true;
	var selection = picker.getSelectedRow(0).title;
	var index = picker.getSelectedRow(0).index;
	var row = Ti.UI.createTableViewRow({
		name: selection, 
		value: "", 
		filterIndex: index, 
		hasChild: true,
		height: '60dp',
		className: "filters"
	});
	row.add(Ti.UI.createLabel({
		text: row.name,
		left: 10,
		font: {fontWeight: "bold"},
		width: "45%",
		color : "#000"
	}));
	row.add(Ti.UI.createLabel({
		text: row.value,
		right: 10,
		width: OS_IOS ? "45%" : "50%",
		textAlign: OS_IOS ? "right" : "left",
		color : "#000"
	}));
	$.filters.appendRow(row);
}

if(OS_ANDROID){
	var deleteFilterIndex;
	var deleteFilterAlert = Ti.UI.createAlertDialog({
		title : "Delete",
		message : "Delete selected filter?",
		buttonNames : ["YES","NO"]
	});
	deleteFilterAlert.addEventListener("click", function(e){
		if(e.index === 0)
			$.filters.deleteRow(deleteFilterIndex);
		else
			$.filters.data[0].rows[deleteFilterIndex].backgroundColor = "transparent";
	});
};
function deleteFilter(e) {
	if(OS_ANDROID){
		deleteFilterIndex = e.index;
		$.filters.data[0].rows[deleteFilterIndex].backgroundColor = "red";
		deleteFilterAlert.show();
	};	
};

function filterValues(e) {
	var valuesListWindow = Alloy.createController("valueListWindow", {path: path, selectedRowIndex: e.index, tv: $.filters}).getView();
	if(OS_IOS){
		$.FiltersWindow.navGroup.openWindow(valuesListWindow);
	}else{
		$.pickerView.hide();
		$.FiltersWindow.backgroundColor = "gray";
		valuesListWindow.open();
		valuesListWindow.addEventListener("close",function(){
			$.FiltersWindow.backgroundColor = "white";
			valuesListWindow.removeEventListener("close", arguments.callee);
		});
	};
}


$.FiltersWindow.addEventListener('close', function() {
	Ti.API.info("FilterWindow closing");
	//var filter = [];
	lastFilterQuery = filterQuery;
	if ($.filters.data[0]) {
		for (var i=0; i< $.filters.data[0].rowCount; i++) {
			if ($.filters.data[0].rows[i].value) {
				var f = "filter[" + i + "][field]=" + $.filters.data[0].rows[i].name +
					"&filter[" + i + "][data][type]=list" +
					"&filter[" + i + "][data][value]=" + $.filters.data[0].rows[i].value;
				if (i>0) {
					filterQuery = filterQuery + "&" + f; 
				} else {
					filterQuery = f;
				}
			}
			
		}
		Ti.API.info(filterQuery);
		if (lastFilterQuery != filterQuery) {
			lastFilterQuery = filterQuery;
			entryBrowserController.loadMetadata(filterQuery);
		}
		
	}
	$.FiltersWindow.backgroundColor = "white";
});

if(OS_ANDROID){
	$.FiltersWindow.addEventListener('open', function() {
		var actionBar;	
	    if (! $.FiltersWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.FiltersWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	                $.FiltersWindow.close();
	            };
			   $.FiltersWindow.getActivity().onCreateOptionsMenu = function(e) {
			        var filtersBtn = e.menu.add({
			            title : "Add",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : "/images/add.png"
			        });
			        filtersBtn.addEventListener('click', function(e) {
			            chooseFilter();
			        });
			    };
			    $.FiltersWindow.getActivity().invalidateOptionsMenu();
	        };	        
	    };
	});
	$.FiltersWindow.addEventListener('blur', function() {
		$.FiltersWindow.backgroundColor = "gray";
		$.pickerView.hide();
	});
};
