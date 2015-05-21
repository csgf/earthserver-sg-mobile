function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index_old";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId55 = [];
    $.__views.downloadWin = Alloy.createController("DownloadWindow", {
        id: "downloadWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.downloads = Ti.UI.createTab({
        window: $.__views.downloadWin.getViewEx({
            recurse: true
        }),
        id: "downloads",
        title: "Downloads",
        icon: "/download.png"
    });
    __alloyId55.push($.__views.downloads);
    $.__views.__alloyId59 = Alloy.createController("UploadWindow", {
        id: "__alloyId59",
        __parentSymbol: __parentSymbol
    });
    $.__views.__alloyId58 = Ti.UI.createTab({
        window: $.__views.__alloyId59.getViewEx({
            recurse: true
        }),
        title: "Upload",
        icon: "/upload.png",
        id: "__alloyId58"
    });
    __alloyId55.push($.__views.__alloyId58);
    $.__views.index_old = Ti.UI.createTabGroup({
        tabs: __alloyId55,
        id: "index_old"
    });
    $.__views.index_old && $.addTopLevelView($.__views.index_old);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;