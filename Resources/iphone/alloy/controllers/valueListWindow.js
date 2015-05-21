function Controller() {
    function setValue(e) {
        if (e.row.hasCheck) e.row.hasCheck = false; else {
            e.row.hasCheck = true;
            selectedRow.value = e.row.title;
            selectedRow.children[1].text = e.row.title;
            for (var i = rowIndex + 1; filtersTv.data[0].rowCount > i; i++) {
                filtersTv.data[0].rows[i].value = "";
                filtersTv.data[0].rows[i].children[1].text = "";
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "valueListWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.valueListWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "valueListWindow"
    });
    $.__views.valueListWindow && $.addTopLevelView($.__views.valueListWindow);
    $.__views.valuesTable = Ti.UI.createTableView({
        id: "valuesTable"
    });
    $.__views.valueListWindow.add($.__views.valuesTable);
    setValue ? $.__views.valuesTable.addEventListener("click", setValue) : __defers["$.__views.valuesTable!click!setValue"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var path = arguments[0].path;
    var rowIndex = arguments[0].selectedRowIndex;
    var filtersTv = arguments[0].tv;
    var selectedRow = filtersTv.data[0].rows[rowIndex];
    var filterIndex = selectedRow.filterIndex;
    $.valueListWindow.title = selectedRow.name;
    Ti.API.info(rowIndex);
    Ti.API.info(selectedRow.name);
    Ti.API.info(selectedRow.filterIndex);
    var filterData = [];
    for (var i = 0; rowIndex > i; i++) if (filtersTv.data[0].rows[i].value) {
        var filter = {
            field: filtersTv.data[0].rows[i].name,
            data: {
                type: "list",
                value: [ filtersTv.data[0].rows[i].value ]
            }
        };
        filterData.push(filter);
    }
    Ti.API.info(JSON.stringify(filterData));
    var net = require("net");
    var url = Alloy.Globals.gateway + "/glibrary/test" + path + "/?filterData=" + JSON.stringify(filterData);
    Ti.API.info(url);
    net.apiCall(url, function(response) {
        var data = [];
        for (var i = 0; response[filterIndex].length > i; i++) data.push({
            title: response[filterIndex][i][0]
        });
        Ti.API.info(JSON.stringify(data));
        $.valuesTable.setData(data);
    });
    __defers["$.__views.valuesTable!click!setValue"] && $.__views.valuesTable.addEventListener("click", setValue);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;