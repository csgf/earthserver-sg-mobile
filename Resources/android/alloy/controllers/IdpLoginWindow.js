function Controller() {
    function hideWv() {
        $.wv.hide();
    }
    function authenticate(e) {
        Ti.API.info("Loaded: " + e.url);
        $.wv.show();
        var net = require("net");
        Ti.API.info("firstLoad: " + firstLoad);
        Ti.API.info("net.loggedId: " + net.loggedIn);
        Ti.API.info("net.shibCookie: " + net.shibCookie);
        if (firstLoad || net.loggedIn) {
            firstLoad = false;
            return;
        }
        Ti.API.info("check cookies");
        var raw_cookies = $.wv.evalJS("document.cookie");
        Ti.API.info("cookie: " + raw_cookies);
        if (-1 != raw_cookies.indexOf("_shibsession_")) {
            Ti.API.info("ho trovato shibsession");
            var cookies = raw_cookies.split(";");
            for (i = 0; cookies.length - 1 >= i; i++) {
                Ti.API.info("cookie -> " + cookies[i]);
                if (-1 != cookies[i].indexOf("_shibsession_")) {
                    var shibCookie = cookies[i];
                    Ti.API.info("Shibboleth Session:" + shibCookie);
                    Ti.App.Properties.setString("shibCookie", shibCookie);
                    net.shibCookie = shibCookie;
                    var net = require("net");
                    var loginUrl = Alloy.Globals.gateway + "api/login/";
                    Ti.API.info("login URL: " + loginUrl);
                    net.apiCall(loginUrl, function(response) {
                        $.IdpLoginWindow.parentWin.parentWin.close();
                        $.IdpLoginWindow.parentWin.close();
                        $.IdpLoginWindow.close();
                        Ti.API.info("logged in");
                        net.loggedIn = true;
                        net.lastLogin = Ti.App.Properties.setDouble("lastLogin", new Date().getTime());
                        var currentUser = response.cn;
                        net.username = Ti.App.Properties.setString("username", currentUser);
                        Ti.App.fireEvent("loggedIn", {
                            username: currentUser
                        });
                        Ti.API.info(currentUser);
                    });
                    break;
                }
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "IdpLoginWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.IdpLoginWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "IdpLoginWindow"
    });
    $.__views.IdpLoginWindow && $.addTopLevelView($.__views.IdpLoginWindow);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator",
        message: "Loading...",
        visible: "true"
    });
    $.__views.IdpLoginWindow.add($.__views.activityIndicator);
    $.__views.wv = Ti.UI.createWebView({
        id: "wv"
    });
    $.__views.IdpLoginWindow.add($.__views.wv);
    hideWv ? $.__views.wv.addEventListener("beforeload", hideWv) : __defers["$.__views.wv!beforeload!hideWv"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var firstLoad = true;
    var net = require("net");
    var idpUrl = arguments[0].url;
    $.IdpLoginWindow.parentWin = arguments[0].parentWin;
    var title = arguments[0].title;
    var firstFocus = false;
    $.IdpLoginWindow.addEventListener("open", function() {
        firstFocus = true;
        if (net.loggedIn) {
            $.wv.url = Alloy.Globals.gateway + "/c/portal/logout";
            $.wv.addEventListener("load", function(e) {
                net.loggedIn = false;
                $.wv.removeEventListener("load", arguments.callee);
                Ti.API.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!in load: " + e.url);
                setTimeout(function() {
                    $.wv.addEventListener("load", authenticate);
                    $.wv.url = idpUrl;
                }, 500);
            });
        } else {
            alert("load");
            $.wv.addEventListener("load", authenticate);
            $.wv.url = idpUrl;
        }
    });
    $.IdpLoginWindow.addEventListener("close", function() {
        $.wv.removeEventListener("load", authenticate);
    });
    var actionBar;
    $.IdpLoginWindow.addEventListener("open", function() {
        if ($.IdpLoginWindow.activity) {
            actionBar = $.IdpLoginWindow.activity.actionBar;
            if (actionBar) {
                actionBar.title = title;
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    Ti.API.info("Home icon clicked!");
                    $.IdpLoginWindow.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    __defers["$.__views.wv!beforeload!hideWv"] && $.__views.wv.addEventListener("beforeload", hideWv);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;