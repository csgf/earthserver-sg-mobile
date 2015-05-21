function Controller() {
    function chooseFilter() {
        $.FiltersWindow.backgroundColor = "gray";
        $.pickerView.show();
        $.addFilter.enabled = false;
    }
    function hidePickerView() {
        $.pickerView.hide();
        $.FiltersWindow.backgroundColor = "white";
        $.addFilter.enabled = true;
    }
    function filterChoosen() {
        $.FiltersWindow.backgroundColor = "white";
        $.pickerView.hide();
        $.addFilter.enabled = true;
        var selection = picker.getSelectedRow(0).title;
        var index = picker.getSelectedRow(0).index;
        var row = Ti.UI.createTableViewRow({
            name: selection,
            value: "",
            filterIndex: index,
            hasChild: true,
            height: "60dp",
            className: "filters"
        });
        row.add(Ti.UI.createLabel({
            text: row.name,
            left: 10,
            font: {
                fontWeight: "bold"
            },
            width: "45%",
            color: "#000"
        }));
        row.add(Ti.UI.createLabel({
            text: row.value,
            right: 10,
            width: "50%",
            textAlign: "left",
            color: "#000"
        }));
        $.filters.appendRow(row);
    }
    function deleteFilter(e) {
        deleteFilterIndex = e.index;
        $.filters.data[0].rows[deleteFilterIndex].backgroundColor = "red";
        deleteFilterAlert.show();
    }
    function filterValues(e) {
        var valuesListWindow = Alloy.createController("valueListWindow", {
            path: path,
            selectedRowIndex: e.index,
            tv: $.filters
        }).getView();
        $.pickerView.hide();
        $.FiltersWindow.backgroundColor = "gray";
        valuesListWindow.open();
        valuesListWindow.addEventListener("close", function() {
            $.FiltersWindow.backgroundColor = "white";
            valuesListWindow.removeEventListener("close", arguments.callee);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "FiltersWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.FiltersWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "FiltersWindow"
    });
    $.__views.FiltersWindow && $.addTopLevelView($.__views.FiltersWindow);
    $.__views.addFilter = Ti.UI.createButton({
        id: "addFilter",
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
    });
    chooseFilter ? $.__views.addFilter.addEventListener("click", chooseFilter) : __defers["$.__views.addFilter!click!chooseFilter"] = true;
    $.__views.FiltersWindow.rightNavButton = $.__views.addFilter;
    $.__views.filters = Ti.UI.createTableView({
        id: "filters",
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        editable: "true"
    });
    $.__views.FiltersWindow.add($.__views.filters);
    filterValues ? $.__views.filters.addEventListener("click", filterValues) : __defers["$.__views.filters!click!filterValues"] = true;
    deleteFilter ? $.__views.filters.addEventListener("longclick", deleteFilter) : __defers["$.__views.filters!longclick!deleteFilter"] = true;
    $.__views.pickerView = Ti.UI.createView({
        height: 200,
        width: 250,
        backgroundColor: "#282828",
        visible: false,
        id: "pickerView"
    });
    $.__views.FiltersWindow.add($.__views.pickerView);
    $.__views.pickerViewTitle = Ti.UI.createLabel({
        backgroundColor: "#282828",
        borderColor: "#32abd8",
        borderWidth: 2,
        width: 254,
        height: 50,
        color: "#32abd8",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: -2,
        left: -2,
        font: {
            fontSize: "22sp"
        },
        id: "pickerViewTitle",
        text: "Choose filter"
    });
    $.__views.pickerView.add($.__views.pickerViewTitle);
    $.__views.__alloyId19 = Ti.UI.createView({
        bottom: "0",
        height: "50",
        id: "__alloyId19"
    });
    $.__views.pickerView.add($.__views.__alloyId19);
    $.__views.doneBtn = Ti.UI.createLabel({
        backgroundColor: "#282828",
        borderColor: "#343434",
        borderWidth: 1,
        width: 126,
        height: "100%",
        color: "#fff",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "doneBtn",
        text: "Done",
        left: "-1"
    });
    $.__views.__alloyId19.add($.__views.doneBtn);
    filterChoosen ? $.__views.doneBtn.addEventListener("click", filterChoosen) : __defers["$.__views.doneBtn!click!filterChoosen"] = true;
    $.__views.cancelBtn = Ti.UI.createLabel({
        backgroundColor: "#282828",
        borderColor: "#343434",
        borderWidth: 1,
        width: 126,
        height: "100%",
        color: "#fff",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "cancelBtn",
        text: "Cancel",
        right: "-1"
    });
    $.__views.__alloyId19.add($.__views.cancelBtn);
    hidePickerView ? $.__views.cancelBtn.addEventListener("click", hidePickerView) : __defers["$.__views.cancelBtn!click!hidePickerView"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    {
        Titanium.UI.createAnimation({
            bottom: 0
        });
    }
    {
        Titanium.UI.createAnimation({
            bottom: -251
        });
    }
    var path = arguments[0].path;
    var entryBrowserController = arguments[0].parent;
    var filterQuery, lastFilterQuery;
    var picker = Ti.UI.createPicker({
        top: 70,
        selectionIndicator: true,
        type: Titanium.UI.PICKER_TYPE_PLAIN
    });
    var net = require("net");
    net.apiCall(Alloy.Globals.gateway + "/glibrary/metadata" + path, function(response) {
        var rows = [];
        for (var i = 0; response.filters.length > i; i++) rows.push(Ti.UI.createPickerRow({
            title: response.filters[i].dataIndex,
            index: i
        }));
        picker.add(rows);
        $.pickerView.add(picker);
    });
    var deleteFilterIndex;
    var deleteFilterAlert = Ti.UI.createAlertDialog({
        title: "Delete",
        message: "Delete selected filter?",
        buttonNames: [ "YES", "NO" ]
    });
    deleteFilterAlert.addEventListener("click", function(e) {
        0 === e.index ? $.filters.deleteRow(deleteFilterIndex) : $.filters.data[0].rows[deleteFilterIndex].backgroundColor = "transparent";
    });
    $.FiltersWindow.addEventListener("close", function() {
        Ti.API.info("FilterWindow closing");
        lastFilterQuery = filterQuery;
        if ($.filters.data[0]) {
            for (var i = 0; $.filters.data[0].rowCount > i; i++) if ($.filters.data[0].rows[i].value) {
                var f = "filter[" + i + "][field]=" + $.filters.data[0].rows[i].name + "&filter[" + i + "][data][type]=list" + "&filter[" + i + "][data][value]=" + $.filters.data[0].rows[i].value;
                filterQuery = i > 0 ? filterQuery + "&" + f : f;
            }
            Ti.API.info(filterQuery);
            if (lastFilterQuery != filterQuery) {
                lastFilterQuery = filterQuery;
                entryBrowserController.loadMetadata(filterQuery);
            }
        }
        $.FiltersWindow.backgroundColor = "white";
    });
    $.FiltersWindow.addEventListener("open", function() {
        var actionBar;
        if ($.FiltersWindow.activity) {
            actionBar = $.FiltersWindow.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.FiltersWindow.close();
                };
                $.FiltersWindow.getActivity().onCreateOptionsMenu = function(e) {
                    var filtersBtn = e.menu.add({
                        title: "Add",
                        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                        icon: "/add.png"
                    });
                    filtersBtn.addEventListener("click", function() {
                        chooseFilter();
                    });
                };
                $.FiltersWindow.getActivity().invalidateOptionsMenu();
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.FiltersWindow.addEventListener("blur", function() {
        $.FiltersWindow.backgroundColor = "gray";
        $.pickerView.hide();
    });
    __defers["$.__views.addFilter!click!chooseFilter"] && $.__views.addFilter.addEventListener("click", chooseFilter);
    __defers["$.__views.filters!click!filterValues"] && $.__views.filters.addEventListener("click", filterValues);
    __defers["$.__views.filters!longclick!deleteFilter"] && $.__views.filters.addEventListener("longclick", deleteFilter);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;