function Controller() {
    function setValue(e) {
        if (e.row.hasCheck) {
            e.row.hasCheck = false;
            filtersTv.data[0].rows[rowIndex].value = "";
            filtersTv.data[0].rows[rowIndex].children[1].text = "";
        } else {
            for (var j = 0; $.valuesTable.data[0].rowCount > j; j++) $.valuesTable.data[0].rows[j].hasCheck = false;
            e.row.hasCheck = true;
            selectedRow.value = e.row.title;
            selectedRow.children[1].text = e.row.title;
            for (var i = rowIndex + 1; filtersTv.data[0].rowCount > i; i++) {
                filtersTv.data[0].rows[i].value = "";
                filtersTv.data[0].rows[i].children[1].text = "";
            }
        }
    }
    function closeWindow() {
        $.valueListWindow.close();
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
        backgroundColor: "#282828",
        modal: true,
        navBarHidden: true,
        width: 250,
        height: 300,
        id: "valueListWindow"
    });
    $.__views.valueListWindow && $.addTopLevelView($.__views.valueListWindow);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading...",
        visible: "false"
    });
    $.__views.valueListWindow.add($.__views.activityIndicator);
    $.__views.valuesTableTitle = Ti.UI.createLabel({
        backgroundColor: "#282828",
        borderColor: "#32abd8",
        borderWidth: 2,
        width: 254,
        left: -2,
        height: 50,
        color: "#32abd8",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: -2,
        font: {
            fontSize: "22sp"
        },
        id: "valuesTableTitle",
        text: "Choose value"
    });
    $.__views.valueListWindow.add($.__views.valuesTableTitle);
    $.__views.valuesTable = Ti.UI.createTableView({
        top: 50,
        bottom: 50,
        id: "valuesTable"
    });
    $.__views.valueListWindow.add($.__views.valuesTable);
    setValue ? $.__views.valuesTable.addEventListener("click", setValue) : __defers["$.__views.valuesTable!click!setValue"] = true;
    $.__views.__alloyId61 = Ti.UI.createLabel({
        backgroundColor: "#282828",
        borderColor: "#343434",
        borderWidth: 1,
        width: 252,
        left: -1,
        height: 50,
        color: "#fff",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Done",
        id: "__alloyId61"
    });
    $.__views.valueListWindow.add($.__views.__alloyId61);
    closeWindow ? $.__views.__alloyId61.addEventListener("click", closeWindow) : __defers["$.__views.__alloyId61!click!closeWindow"] = true;
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
    $.activityIndicator.show();
    net.apiCall(url, function(response) {
        var data = [];
        for (var i = 0; response[filterIndex].length > i; i++) data.push({
            title: response[filterIndex][i][0],
            hasCheck: false
        });
        Ti.API.info(JSON.stringify(data));
        $.valuesTable.setData(data);
        $.activityIndicator.hide();
    });
    __defers["$.__views.valuesTable!click!setValue"] && $.__views.valuesTable.addEventListener("click", setValue);
    __defers["$.__views.__alloyId61!click!closeWindow"] && $.__views.__alloyId61.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;