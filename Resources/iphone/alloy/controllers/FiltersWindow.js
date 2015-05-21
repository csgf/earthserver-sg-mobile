function Controller() {
    function chooseFilter() {
        $.pickerView.animate(slide_in);
        $.addFilter.enabled = false;
    }
    function hidePickerView() {
        $.pickerView.animate(slide_out);
        $.addFilter.enabled = true;
    }
    function filterChoosen() {
        $.pickerView.animate(slide_out);
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
            width: "45%"
        }));
        row.add(Ti.UI.createLabel({
            text: row.value,
            right: 10,
            width: "45%",
            textAlign: "right"
        }));
        $.filters.appendRow(row);
    }
    function filterValues(e) {
        var valuesListWindow = Alloy.createController("valueListWindow", {
            path: path,
            selectedRowIndex: e.index,
            tv: $.filters
        }).getView();
        $.FiltersWindow.navGroup.openWindow(valuesListWindow);
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
    $.__views.pickerView = Ti.UI.createView({
        height: 251,
        bottom: -251,
        id: "pickerView"
    });
    $.__views.FiltersWindow.add($.__views.pickerView);
    var __alloyId17 = [];
    $.__views.cancelBtn = Ti.UI.createButton({
        id: "cancelBtn",
        systemButton: Ti.UI.iPhone.SystemButton.CANCEL
    });
    __alloyId17.push($.__views.cancelBtn);
    hidePickerView ? $.__views.cancelBtn.addEventListener("click", hidePickerView) : __defers["$.__views.cancelBtn!click!hidePickerView"] = true;
    $.__views.__alloyId18 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId17.push($.__views.__alloyId18);
    $.__views.doneBtn = Ti.UI.createButton({
        id: "doneBtn",
        title: "Done",
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId17.push($.__views.doneBtn);
    filterChoosen ? $.__views.doneBtn.addEventListener("click", filterChoosen) : __defers["$.__views.doneBtn!click!filterChoosen"] = true;
    $.__views.__alloyId15 = Ti.UI.iOS.createToolbar({
        top: 0,
        items: __alloyId17,
        id: "__alloyId15"
    });
    $.__views.pickerView.add($.__views.__alloyId15);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var slide_in = Titanium.UI.createAnimation({
        bottom: 0
    });
    var slide_out = Titanium.UI.createAnimation({
        bottom: -251
    });
    var path = arguments[0].path;
    var entryBrowserController = arguments[0].parent;
    var filterQuery, lastFilterQuery;
    var picker = Ti.UI.createPicker({
        top: 43,
        selectionIndicator: true,
        type: Titanium.UI.PICKER_TYPE_PLAIN
    });
    var net = require("net");
    net.apiCall(Alloy.Globals.gateway + "/glibrary/metadata" + path, function(response) {
        var rows = [];
        for (j = 0; 10 > j; j++) for (var i = 0; response.filters.length > i; i++) rows.push(Ti.UI.createPickerRow({
            title: response.filters[i].dataIndex,
            index: i
        }));
        picker.add(rows);
        var opts = {
            title: "Delete File?"
        };
        opts.options = rows;
        opts.buttonNames = [ "Done", "Cancel" ];
        Ti.UI.createOptionDialog(opts).show();
        $.pickerView.add(picker);
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
    });
    __defers["$.__views.addFilter!click!chooseFilter"] && $.__views.addFilter.addEventListener("click", chooseFilter);
    __defers["$.__views.filters!click!filterValues"] && $.__views.filters.addEventListener("click", filterValues);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;