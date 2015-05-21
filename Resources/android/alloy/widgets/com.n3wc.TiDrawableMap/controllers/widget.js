function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.n3wc.TiDrawableMap/" + s : s.substring(0, index) + "/com.n3wc.TiDrawableMap/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    function finalizeDraw() {
        useConvexHull && calculateConvexHull();
        handlers.drawEnd();
    }
    function addPoint(x, y) {
        Ti.API.info(x + "," + y);
        Ti.API.info(topLeftLat + "," + topLeftLon);
        Ti.API.info(heightRatio + "," + widthRatio);
        $.allPoints.push({
            latitude: topLeftLat - y * heightRatio,
            longitude: topLeftLon + x * widthRatio
        });
        addDrawing();
    }
    function addDrawing(drawPoints) {
        routeAdded && $.TiDrawableMapView.removeRoute(route);
        route = Alloy.Globals.Map.createRoute({
            name: "Meeo draw map",
            points: "undefined" != typeof drawPoints ? drawPoints : $.allPoints,
            color: lineColor,
            width: lineWidth
        });
        $.TiDrawableMapView.addRoute(route);
        routeAdded = true;
    }
    function calculateConvexHull() {
        $.hullPoints = convexHull.convex_hull($.allPoints);
        addDrawing($.hullPoints);
        Ti.API.info(JSON.stringify($.allPoints));
        Ti.API.info(JSON.stringify($.hullPoints));
        var latitude = [];
        var longitude = [];
        for (i in $.hullPoints) {
            latitude.push(parseFloat($.hullPoints[i].latitude).toFixed(6));
            longitude.push(parseFloat($.hullPoints[i].longitude).toFixed(6));
        }
        Ti.API.info(JSON.stringify(latitude));
        Ti.API.info(JSON.stringify(longitude));
        var maxLat = Math.max.apply(Math, latitude);
        var minLat = Math.min.apply(Math, latitude);
        var maxLng = Math.max.apply(Math, longitude);
        var minLng = Math.min.apply(Math, longitude);
        Ti.API.info(minLat + "\n" + maxLat + "\n" + minLng + "\n" + maxLng);
        var points = [ {
            latitude: minLat,
            longitude: minLng
        }, {
            latitude: maxLat,
            longitude: minLng
        }, {
            latitude: maxLat,
            longitude: maxLng
        }, {
            latitude: minLat,
            longitude: maxLng
        }, {
            latitude: minLat,
            longitude: minLng
        } ];
        routeAdded && $.TiDrawableMapView.removeRoute(route);
        route = Alloy.Globals.Map.createRoute({
            name: "Meeo draw map",
            points: "undefined" != typeof points ? points : $.allPoints,
            color: lineColor,
            width: lineWidth
        });
        $.TiDrawableMapView.addRoute(route);
        routeAdded = true;
        $.boundingBoxPoints = points;
        $.coodinates = [ minLat, maxLat, minLng, maxLng ];
    }
    new (require("alloy/widget"))("com.n3wc.TiDrawableMap");
    this.__widgetId = "com.n3wc.TiDrawableMap";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.TiDrawableMapContainer = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "TiDrawableMapContainer"
    });
    $.__views.TiDrawableMapContainer && $.addTopLevelView($.__views.TiDrawableMapContainer);
    $.__views.TiDrawableMapView = Alloy.Globals.Map.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        zIndex: 2,
        id: "TiDrawableMapView",
        ns: "Alloy.Globals.Map"
    });
    $.__views.TiDrawableMapContainer.add($.__views.TiDrawableMapView);
    $.__views.TiDrawableMapDrawingView = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        zIndex: 1,
        id: "TiDrawableMapDrawingView"
    });
    $.__views.TiDrawableMapContainer.add($.__views.TiDrawableMapDrawingView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var convex_hull = require(WPATH("convex_hull"));
    var convexHull = new convex_hull();
    var useConvexHull = true;
    $.allPoints = $.hullPoints = [];
    var mapRegion;
    var route;
    var drawableWidth;
    var drawableHeight;
    var topLeftLat;
    var topLeftLon;
    var widthRatio;
    var heightRatio;
    var lineColor = "#c60000";
    var lineWidth = 4;
    var throttleTimer = 75;
    var routeAdded = false;
    var handlers = {};
    handlers.drawStart = function() {};
    handlers.drawEnd = function() {};
    exports.addEventListener = function(listenerName, listenerFunction) {
        switch (listenerName) {
          case "drawStart":
            handlers.drawStart = listenerFunction;
            break;

          case "drawEnd":
            handlers.drawEnd = listenerFunction;
        }
    };
    $.init = function(args) {
        _args = args || {};
        $.TiDrawableMapView.region = "undefined" != typeof _args.mapRegion ? _args.mapRegion : mapRegion;
        "undefined" != typeof _args.lineColor && (lineColor = _args.lineColor);
        "undefined" != typeof _args.lineWidth && (lineWidth = _args.lineWidth);
        "undefined" != typeof _args.throttleTimer && (throttleTimer = _args.throttleTimer);
    };
    $.setSizes = function() {
        Ti.API.info($.TiDrawableMapDrawingView.toImage().height + " >> " + $.TiDrawableMapDrawingView.toImage().width);
        drawableWidth = $.TiDrawableMapDrawingView.toImage().width;
        drawableHeight = $.TiDrawableMapDrawingView.toImage().height;
        Ti.API.info("set sizes::: drawableWidth: " + drawableWidth + " drawableHeight: " + drawableHeight);
    };
    $.clearRoute = function() {
        routeAdded && $.TiDrawableMapView.removeRoute(route);
        routeAdded = false;
    };
    $.startDraw = function(args) {
        var _args = args || {};
        "undefined" != typeof _args.useConvexHull && (useConvexHull = _args.useConvexHull);
        "undefined" != typeof _args.lineColor && (lineColor = _args.lineColor);
        "undefined" != typeof _args.lineWidth && (lineWidth = _args.lineWidth);
        "undefined" != typeof _args.throttleTimer && (throttleTimer = _args.throttleTimer);
        $.allPoints.length = $.hullPoints.length = 0;
        routeAdded && $.TiDrawableMapView.removeRoute(route);
        $.TiDrawableMapDrawingView.zIndex = 3;
        routeAdded = false;
    };
    $.TiDrawableMapView.addEventListener("regionchanged", function(e) {
        mapRegion = e;
        topLeftLat = mapRegion.latitude + mapRegion.latitudeDelta / 2;
        topLeftLon = mapRegion.longitude - mapRegion.longitudeDelta / 2;
        widthRatio = mapRegion.longitudeDelta / drawableWidth;
        heightRatio = mapRegion.latitudeDelta / drawableHeight;
        Ti.API.info("regionchanged::: topLeftLat: " + topLeftLat + " topLeftLon: " + topLeftLon + " topLeftLon: " + widthRatio + " heightRatio: " + heightRatio);
    });
    $.TiDrawableMapDrawingView.addEventListener("touchstart", function(e) {
        handlers.drawStart();
        addPoint(e.x, e.y);
    });
    $.TiDrawableMapDrawingView.addEventListener("touchend", function() {
        $.TiDrawableMapDrawingView.zIndex = 1;
        setTimeout(finalizeDraw, 1.25 * throttleTimer);
    });
    var touchMove = _.throttle(function(e) {
        addPoint(e.x, e.y);
    }, throttleTimer);
    $.TiDrawableMapDrawingView.addEventListener("touchmove", touchMove);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;