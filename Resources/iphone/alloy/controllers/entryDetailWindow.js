function Controller() {
    function downloadEntry() {
        var net = require("net");
        net.apiCall(Alloy.Globals.gateway + "glibrary/links2/" + Alloy.Globals.repository + "/" + id + "/", function(response) {
            var replicaWindow = Alloy.createController("replicaWindow", response).getView();
            $.entryDetailWindow.navGroup.openWindow(replicaWindow);
            replicaWindow.title = metadata.FileName;
            replicaWindow.navGroup = $.entryDetailWindow.navGroup;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "entryDetailWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.entryDetailWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "entryDetailWindow"
    });
    $.__views.entryDetailWindow && $.addTopLevelView($.__views.entryDetailWindow);
    $.__views.downloadEntry = Ti.UI.createButton({
        id: "downloadEntry",
        title: "Download"
    });
    downloadEntry ? $.__views.downloadEntry.addEventListener("click", downloadEntry) : __defers["$.__views.downloadEntry!click!downloadEntry"] = true;
    $.__views.entryDetailWindow.rightNavButton = $.__views.downloadEntry;
    $.__views.thumb = Ti.UI.createImageView({
        top: 5,
        height: 120,
        id: "thumb"
    });
    $.__views.details = Ti.UI.createTableView({
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        headerView: $.__views.thumb,
        id: "details"
    });
    $.__views.entryDetailWindow.add($.__views.details);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var metadata = arguments[0].metadata;
    var id = arguments[0].id;
    $.thumb.image = Ti.Utils.base64decode(metadata["/" + Alloy.Globals.repository + "/Thumbs:Data"]);
    for (var i in metadata) if (0 != i.indexOf("/")) {
        var row = Ti.UI.createTableViewRow({
            minRowHeight: 40
        });
        row.add(Ti.UI.createLabel({
            text: i,
            left: 5,
            height: 40,
            font: {
                fontWeight: "bold",
                fontSize: "12"
            }
        }));
        metadata[i] && row.add(Ti.UI.createLabel({
            text: metadata[i],
            right: 5,
            left: 130,
            height: Ti.UI.SIZE,
            font: {
                fontSize: "12"
            }
        }));
        $.details.appendRow(row);
    }
    $.entryDetailWindow.addEventListener("open", function() {
    });
    __defers["$.__views.downloadEntry!click!downloadEntry"] && $.__views.downloadEntry.addEventListener("click", downloadEntry);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;