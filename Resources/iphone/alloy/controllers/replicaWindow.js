function Controller() {
    function downloadReplica(e) {
        if ("rightButton" == e.clicksource) {
            Ti.API.info("Annotation.link:" + e.annotation.link);
            var url = e.annotation.link.split("=")[1].slice(1, -8);
            0 == url.indexOf("/glibrary") && (url = Alloy.Globals.gateway + url);
            Ti.API.info("Splitted URL:" + url);
            url.substring(url.length - 3);
            var webView = Alloy.createController("WebViewer", {
                url: url
            }).getView();
            webView.backButtonTitle = "Replicas";
            webView.title = url.split("/")[url.split("/").length - 1];
            webView.orientationModes = [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ];
            $.replicaWindow.navGroup.openWindow(webView);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "replicaWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.replicaWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "replicaWindow"
    });
    $.__views.replicaWindow && $.addTopLevelView($.__views.replicaWindow);
    $.__views.mapview = Alloy.Globals.Map.createView({
        ns: "Alloy.Globals.Map",
        id: "mapview"
    });
    $.__views.replicaWindow.add($.__views.mapview);
    downloadReplica ? $.__views.mapview.addEventListener("click", downloadReplica) : __defers["$.__views.mapview!click!downloadReplica"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var replicas = arguments[0];
    $.mapview.setRegion({
        latitude: replicas[0].lat,
        longitude: replicas[0].lng,
        latitudeDelta: 12,
        longitudeDelta: 12
    });
    for (var i = 0; replicas.length > i; i++) {
        var ann = Alloy.Globals.Map.createAnnotation({
            latitude: replicas[i].lat,
            longitude: replicas[i].lng,
            title: replicas[i].name,
            pincolor: Alloy.Globals.Map.ANNOTATION_RED,
            animate: true,
            leftButton: "/storage.png"
        });
        if ("1" == replicas[i].enabled) {
            ann.pincolor = Alloy.Globals.Map.ANNOTATION_GREEN;
            ann.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE;
            ann.link = replicas[i].link;
            $.mapview.selectAnnotation(ann);
        }
        $.mapview.addAnnotation(ann);
    }
    __defers["$.__views.mapview!click!downloadReplica"] && $.__views.mapview.addEventListener("click", downloadReplica);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;