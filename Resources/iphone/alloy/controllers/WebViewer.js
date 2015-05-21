function Controller() {
    function download(url, filename) {
        var xhr = Ti.Network.createHTTPClient({
            timeout: 1e4
        });
        xhr.onload = function() {
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
            f.write(this.responseData);
            $.pbar.hide();
            Ti.API.info(Ti.Filesystem.applicationDataDirectory + filename);
            $.wv.show();
            $.wv.url = Ti.Filesystem.applicationDataDirectory + filename;
        };
        xhr.ondatastream = function(e) {
            Ti.API.info(e.progress);
            $.pbar.value = e.progress;
        };
        xhr.onerror = function(e) {
            Ti.API.info(JSON.stringify(e));
            Ti.API.info(xhr.responseText);
            Ti.API.info(xhr.location);
            alert("Please check your internet connectivity");
        };
        xhr.open("GET", url);
        Ti.API.info("URL : " + url);
        Ti.API.info("cookie : " + net.shibCookie);
        xhr.setRequestHeader("Cookie", net.shibCookie);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WebViewer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.WebViewer = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "WebViewer"
    });
    $.__views.WebViewer && $.addTopLevelView($.__views.WebViewer);
    $.__views.pbar = Ti.UI.createProgressBar({
        id: "pbar",
        visible: "true",
        message: "Downloading...",
        width: "90%"
    });
    $.__views.WebViewer.add($.__views.pbar);
    $.__views.wv = Ti.UI.createWebView({
        id: "wv",
        visible: "false"
    });
    $.__views.WebViewer.add($.__views.wv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var url = arguments[0].url;
    alert(url);
    var net = require("net");
    $.pbar.show();
    var xhr = Ti.Network.createHTTPClient({
        timeout: 3e3,
        autoRedirect: false
    });
    xhr.onload = function() {
        Ti.API.info("redirect found");
        Ti.API.info(xhr.location);
        var redirectUrl = xhr.getResponseHeader("Location");
        Ti.API.info(redirectUrl);
        var urlTokens = url.split("/");
        var filename = urlTokens[urlTokens.length - 2];
        if (redirectUrl) download(redirectUrl, filename); else {
            $.pbar.hide();
            $.wv.show();
            $.wv.data = xhr.responseData;
        }
    };
    xhr.ondatastream = function(e) {
        Ti.API.info(e.progress);
        $.pbar.value = e.progress;
    };
    xhr.onerror = function(e) {
        Ti.API.info(JSON.stringify(e));
        Ti.API.info(xhr.responseText);
        Ti.API.info(xhr.location);
        alert("Please check your internet connectivity");
    };
    xhr.open("GET", url.replace(/\"/g, ""));
    alert(url);
    Ti.API.info("URL : " + url);
    Ti.API.info("cookie : " + net.shibCookie);
    xhr.setRequestHeader("Cookie", net.shibCookie);
    xhr.send();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;