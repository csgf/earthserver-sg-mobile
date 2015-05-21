function Controller() {
    function loadMetadata(query) {
        Ti.API.info("entryBrowserWindow focus");
        $.itemBrowserTableView.hide();
        $.activityIndicator.show();
        Ti.API.info("query:" + query);
        var url = Alloy.Globals.gateway + "/glibrary/glib" + path;
        if (query) {
            filterQuery = query;
            url = url + "/?" + filterQuery;
            var items = $.toolbar.items;
            items.push(clearBtn);
            $.toolbar.items = items;
        }
        net.apiCall(url, function(response) {
            var data = [];
            totalRows = response.total;
            for (var i = 0; response.records.length > i; i++) {
                var row = Ti.UI.createTableViewRow({
                    height: 100
                });
                row.metadata = response.records[i];
                for (var j = 0; visibleAttrs.length > j; j++) row.add(Ti.UI.createLabel({
                    left: 80,
                    text: 0 == j || 1 == j ? response.records[i][visibleAttrs[j]] : visibleAttrs[j] + ": " + response.records[i][visibleAttrs[j]],
                    top: 5 + 34 * j,
                    font: {
                        fontSize: 0 == j ? "10dp" : "13dp",
                        fontWeight: 0 == j ? "bold" : "regular"
                    },
                    width: 220
                }));
                row.hasChild = true;
                row.add(Ti.UI.createImageView({
                    left: 10,
                    width: 60,
                    borderRadius: 5,
                    image: Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
                }));
                row.id = response.records[i][path + ":FILE"];
                data.push(row);
            }
            $.activityIndicator.hide();
            $.entryBrowserWindow.title = typeName;
            $.itemBrowserTableView.setData(data);
            $.itemBrowserTableView.show();
        });
    }
    function loadMore(row) {
        updating = true;
        $.itemBrowserTableView.appendRow(Ti.UI.createTableViewRow({
            title: "Loading..."
        }));
        var url = Alloy.Globals.gateway + "/glibrary/glib" + path;
        url = filterQuery ? url + "/?" + filterQuery + "&start=" + row : url + "?start=" + row;
        Ti.API.info("loadMore");
        net.apiCall(url, function(response) {
            $.itemBrowserTableView.deleteRow(lastRow, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            for (var i = 0; response.records.length > i; i++) {
                var row = Ti.UI.createTableViewRow({
                    height: 100
                });
                row.metadata = response.records[i];
                for (var j = 0; visibleAttrs.length > j; j++) row.add(Ti.UI.createLabel({
                    left: 80,
                    text: 0 == j || 1 == j ? response.records[i][visibleAttrs[j]] : visibleAttrs[j] + ": " + response.records[i][visibleAttrs[j]],
                    top: 5 + 34 * j,
                    font: {
                        fontSize: 0 == j ? "10dp" : "13dp",
                        fontWeight: 0 == j ? "bold" : "regular"
                    },
                    width: 220
                }));
                row.hasChild = true;
                row.add(Ti.UI.createImageView({
                    left: 10,
                    width: 60,
                    borderRadius: 5,
                    image: Ti.Utils.base64decode(response.records[i]["/" + repoName + "/Thumbs:Data"])
                }));
                row.id = response.records[i][path + ":FILE"];
                $.itemBrowserTableView.appendRow(row);
            }
            updating = false;
            lastRow += response.records.length;
            Ti.API.info("lastRow: " + lastRow);
        });
    }
    function loadOnScroll(e) {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
        if (lastDistance > distance) {
            var nearEnd = .75 * theEnd;
            if (!updating && total >= nearEnd && totalRows > lastRow) {
                Ti.API.info("loadMore(lastRow); ---> " + lastRow);
                loadMore(lastRow);
            }
        }
        lastDistance = distance;
    }
    function applyFilters() {
        filtersWindow || (filtersWindow = Alloy.createController("FiltersWindow", {
            path: path,
            parent: $
        }).getView());
        $.entryBrowserWindow.navGroup.openWindow(filtersWindow);
        filtersWindow.navGroup = $.entryBrowserWindow.navGroup;
    }
    function showMetadata(e) {
        var entryDetailWindow = Alloy.createController("entryDetailWindow", {
            id: e.row.id,
            metadata: e.row.metadata
        }).getView();
        $.entryBrowserWindow.navGroup.openWindow(entryDetailWindow);
        entryDetailWindow.navGroup = $.entryBrowserWindow.navGroup;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "entryBrowserWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.entryBrowserWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "entryBrowserWindow"
    });
    $.__views.entryBrowserWindow && $.addTopLevelView($.__views.entryBrowserWindow);
    $.__views.itemBrowserTableView = Ti.UI.createTableView({
        bottom: "44dp",
        id: "itemBrowserTableView",
        visible: "false"
    });
    $.__views.entryBrowserWindow.add($.__views.itemBrowserTableView);
    showMetadata ? $.__views.itemBrowserTableView.addEventListener("click", showMetadata) : __defers["$.__views.itemBrowserTableView!click!showMetadata"] = true;
    loadOnScroll ? $.__views.itemBrowserTableView.addEventListener("scroll", loadOnScroll) : __defers["$.__views.itemBrowserTableView!scroll!loadOnScroll"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator",
        message: "Loading...",
        visible: "true"
    });
    $.__views.entryBrowserWindow.add($.__views.activityIndicator);
    var __alloyId35 = [];
    $.__views.send = Ti.UI.createButton({
        id: "send",
        title: "Apply Filters",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId35.push($.__views.send);
    applyFilters ? $.__views.send.addEventListener("click", applyFilters) : __defers["$.__views.send!click!applyFilters"] = true;
    $.__views.__alloyId36 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId35.push($.__views.__alloyId36);
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        items: __alloyId35,
        id: "toolbar",
        bottom: "0",
        borderTop: "true",
        borderBottom: "false"
    });
    $.__views.entryBrowserWindow.add($.__views.toolbar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var path = arguments[0].path;
    var typeName = arguments[0].name;
    var visibleAttrs = arguments[0].visibleAttrs ? arguments[0].visibleAttrs.split(" ").splice(1) : [];
    visibleAttrs[0] || (visibleAttrs = [ "FileName", "Size", "FileType", "Keywords", "LastModificationDate" ]);
    var net = require("net");
    var repoName = Alloy.Globals.repository;
    var totalRows;
    var filterQuery = "";
    $.entryBrowserWindow.addEventListener("open", function() {
        loadMetadata();
    });
    exports.loadMetadata = loadMetadata;
    var lastRow = 50;
    var lastDistance = 0;
    var updating = false;
    var filtersWindow;
    var clearBtn = Ti.UI.createButton({
        title: "Clear Filters",
        style: Ti.UI.iPhone.SystemButtonStyle.BAR
    });
    clearBtn.addEventListener("click", function() {
        filterQuery = "";
        filtersWindow = null;
        var items = $.toolbar.items;
        items.pop();
        $.toolbar.items = items;
        loadMetadata();
    });
    __defers["$.__views.itemBrowserTableView!click!showMetadata"] && $.__views.itemBrowserTableView.addEventListener("click", showMetadata);
    __defers["$.__views.itemBrowserTableView!scroll!loadOnScroll"] && $.__views.itemBrowserTableView.addEventListener("scroll", loadOnScroll);
    __defers["$.__views.send!click!applyFilters"] && $.__views.send.addEventListener("click", applyFilters);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;