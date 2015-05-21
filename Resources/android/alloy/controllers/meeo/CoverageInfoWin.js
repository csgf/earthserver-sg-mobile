function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageInfoWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.coverageInfoWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "coverageInfoWin",
        title: "Coverage Information"
    });
    $.__views.coverageInfoWin && $.addTopLevelView($.__views.coverageInfoWin);
    var __alloyId132 = [];
    $.__views.__alloyId133 = Ti.UI.createTableViewSection({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        headerTitle: "Coverage ID and Type",
        id: "__alloyId133"
    });
    __alloyId132.push($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createTableViewRow({
        height: "50dp",
        backgroundColor: "#fff",
        id: "__alloyId134"
    });
    __alloyId132.push($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Id",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    $.__views.coverageId = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "coverageId"
    });
    $.__views.__alloyId134.add($.__views.coverageId);
    $.__views.__alloyId136 = Ti.UI.createTableViewRow({
        height: "50dp",
        backgroundColor: "#fff",
        id: "__alloyId136"
    });
    __alloyId132.push($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Type",
        id: "__alloyId137"
    });
    $.__views.__alloyId136.add($.__views.__alloyId137);
    $.__views.coverageSubtype = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "coverageSubtype"
    });
    $.__views.__alloyId136.add($.__views.coverageSubtype);
    $.__views.coverageTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId132,
        id: "coverageTv"
    });
    $.__views.coverageInfoWin.add($.__views.coverageTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var coverageId = arguments[0].coverageId;
    $.coverageInfoWin.addEventListener("open", function() {
        var actionBar;
        if ($.coverageInfoWin.activity) {
            actionBar = $.coverageInfoWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.coverageInfoWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.coverageId.text = coverageId;
    $.coverageSubtype.text = "RectifieldGridCoverage";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;