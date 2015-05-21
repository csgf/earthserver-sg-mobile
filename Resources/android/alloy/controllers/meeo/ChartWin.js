function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/ChartWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.chartWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        id: "chartWin",
        title: "Coverage Chart"
    });
    $.__views.chartWin && $.addTopLevelView($.__views.chartWin);
    $.__views.wv = Ti.UI.createWebView({
        top: "0dp",
        bottom: "0dp",
        left: "-5dp",
        right: "0dp",
        enableZoomControls: false,
        scalesPageToFit: true,
        overScrollMode: Titanium.UI.Android.OVER_SCROLL_NEVER,
        id: "wv",
        url: "/highcharts/chart.html"
    });
    $.__views.chartWin.add($.__views.wv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var chartData = arguments[0].chartData;
    $.chartWin.addEventListener("open", function() {
        var actionBar;
        if ($.chartWin.activity) {
            actionBar = $.chartWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.chartWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.wv.addEventListener("load", function() {
        Ti.API.info("ChartWin loaded");
        $.wv.evalJS("createChart('" + JSON.stringify(chartData) + "');");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;