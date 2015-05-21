function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "creditsWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.creditsWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Credits",
        id: "creditsWindow"
    });
    $.__views.creditsWindow && $.addTopLevelView($.__views.creditsWindow);
    $.__views.wv = Ti.UI.createWebView({
        top: "0dp",
        bottom: "120dp",
        url: "/info.html",
        id: "wv",
        visible: "true"
    });
    $.__views.creditsWindow.add($.__views.wv);
    var __alloyId34 = [];
    $.__views.__alloyId35 = Ti.UI.createTableViewRow({
        height: "40dp",
        text: "MEEO info",
        name: "/MEEO.html",
        hasChild: "true",
        id: "__alloyId35"
    });
    __alloyId34.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "MEEO info",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createTableViewRow({
        height: "40dp",
        text: "WxS info",
        name: "/WXS.html",
        hasChild: "true",
        id: "__alloyId37"
    });
    __alloyId34.push($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "WxS info",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createTableViewRow({
        height: "40dp",
        text: "MERIS info",
        name: "/MERIS.html",
        hasChild: "true",
        id: "__alloyId39"
    });
    __alloyId34.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "MERIS info",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.tv = Ti.UI.createTableView({
        height: "120dp",
        bottom: "0dp",
        rowHeight: "40dp",
        backgroundColor: "#f0f0f0",
        separatorColor: "#838383",
        data: __alloyId34,
        id: "tv"
    });
    $.__views.creditsWindow.add($.__views.tv);
    openInfoWin ? $.__views.tv.addEventListener("click", openInfoWin) : __defers["$.__views.tv!click!openInfoWin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.wv.applyProperties({
        scalesPageToFit: true,
        enableZoomControls: false
    });
    $.creditsWindow.addEventListener("open", function() {
        var actionBar;
        if ($.creditsWindow.activity) {
            actionBar = $.creditsWindow.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.creditsWindow.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var infoWin = Ti.UI.createWindow();
    var wv = Ti.UI.createWebView();
    infoWin.add(wv);
    wv.applyProperties({
        scalesPageToFit: true,
        enableZoomControls: false
    });
    infoWin.addEventListener("open", function() {
        var actionBar;
        if (infoWin.activity) {
            actionBar = infoWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    infoWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var openInfoWin = function(e) {
        infoWin.applyProperties({
            title: e.row.text
        });
        wv.applyProperties({
            url: e.row.name
        });
        infoWin.open();
    };
    __defers["$.__views.tv!click!openInfoWin"] && $.__views.tv.addEventListener("click", openInfoWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;