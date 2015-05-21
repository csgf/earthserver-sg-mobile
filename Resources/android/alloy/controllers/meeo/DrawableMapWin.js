function Controller() {
    function startDraw() {
        $.btnDraw.enabled = false;
        $.DrawableMap.startDraw({
            useConvexHull: useConvexHull,
            lineWidth: 4,
            lineColor: "#0000ff",
            throttleTimer: 75
        });
    }
    function clearRoute() {
        $.DrawableMap.clearRoute();
        $.btnClear.enabled = false;
    }
    function retriveMapData() {
        $.drawableMapWin.fireEvent("mapData", {
            mapData: mapData
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/DrawableMapWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.drawableMapWin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "drawableMapWin",
        title: "Draw a region"
    });
    $.__views.drawableMapWin && $.addTopLevelView($.__views.drawableMapWin);
    $.__views.btnView = Ti.UI.createView({
        top: "0dp",
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#CCCCCC",
        id: "btnView"
    });
    $.__views.drawableMapWin.add($.__views.btnView);
    $.__views.btnDraw = Ti.UI.createButton({
        left: "25dp",
        title: "Start Draw",
        id: "btnDraw"
    });
    $.__views.btnView.add($.__views.btnDraw);
    startDraw ? $.__views.btnDraw.addEventListener("click", startDraw) : __defers["$.__views.btnDraw!click!startDraw"] = true;
    $.__views.btnClear = Ti.UI.createButton({
        right: "25dp",
        title: "Clear",
        id: "btnClear"
    });
    $.__views.btnView.add($.__views.btnClear);
    clearRoute ? $.__views.btnClear.addEventListener("click", clearRoute) : __defers["$.__views.btnClear!click!clearRoute"] = true;
    $.__views.mapViewContainer = Ti.UI.createView({
        top: "40dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "mapViewContainer"
    });
    $.__views.drawableMapWin.add($.__views.mapViewContainer);
    $.__views.DrawableMap = Alloy.createWidget("com.n3wc.TiDrawableMap", "widget", {
        id: "DrawableMap",
        __parentSymbol: $.__views.mapViewContainer
    });
    $.__views.DrawableMap.setParent($.__views.mapViewContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var mapData;
    var useConvexHull = true;
    $.btnClear.enabled = false;
    $.drawableMapWin.addEventListener("open", function() {
        var actionBar;
        if ($.drawableMapWin.activity) {
            actionBar = $.drawableMapWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.drawableMapWin.close();
                };
                $.drawableMapWin.getActivity().onCreateOptionsMenu = function(e) {
                    var doneBtn = e.menu.add({
                        title: "Done",
                        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                    });
                    doneBtn.addEventListener("click", function() {
                        retriveMapData();
                    });
                };
                $.drawableMapWin.getActivity().invalidateOptionsMenu();
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.DrawableMap.addEventListener("drawEnd", function() {
        $.btnDraw.enabled = true;
        $.btnClear.enabled = true;
        mapData = {
            boundingBoxPoints: $.DrawableMap.boundingBoxPoints,
            coordinates: $.DrawableMap.coodinates
        };
    });
    $.drawableMapWin.addEventListener("open", function() {
        $.DrawableMap.setSizes();
    });
    __defers["$.__views.__alloyId162!click!retriveMapData"] && $.__views.__alloyId162.addEventListener("click", retriveMapData);
    __defers["$.__views.btnDraw!click!startDraw"] && $.__views.btnDraw.addEventListener("click", startDraw);
    __defers["$.__views.btnClear!click!clearRoute"] && $.__views.btnClear.addEventListener("click", clearRoute);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;