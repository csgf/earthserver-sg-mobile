function Controller() {
    function __alloyId13(e) {
        if (e && e.fromAdapter) return;
        __alloyId13.opts || {};
        var models = __alloyId12.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = {};
            var __alloyId7 = Ti.UI.createTableViewRow({
                hasChild: "true"
            });
            rows.push(__alloyId7);
            var __alloyId9 = Ti.UI.createImageView({
                left: "10dp",
                width: "70dp",
                height: "70dp",
                image: "undefined" != typeof __alloyId5.__transform["Thumbnail"] ? __alloyId5.__transform["Thumbnail"] : __alloyId5.get("Thumbnail")
            });
            __alloyId7.add(__alloyId9);
            var __alloyId10 = Ti.UI.createLabel({
                left: "90dp",
                top: "5dp",
                right: "5dp",
                font: {
                    fontSize: "16dp",
                    fontWeight: "bold"
                },
                text: "undefined" != typeof __alloyId5.__transform["Title"] ? __alloyId5.__transform["Title"] : __alloyId5.get("Title")
            });
            __alloyId7.add(__alloyId10);
            var __alloyId11 = Ti.UI.createLabel({
                left: "90dp",
                top: "30dp",
                right: "5dp",
                font: {
                    fontSize: "14dp"
                },
                color: "gray",
                text: "undefined" != typeof __alloyId5.__transform["Description"] ? __alloyId5.__transform["Description"] : __alloyId5.get("Description")
            });
            __alloyId7.add(__alloyId11);
        }
        $.__views.__alloyId4.setData(rows);
    }
    function openDetail(e) {
        var item = Alloy.Collections.Demo.at(e.index);
        var detailWin = Alloy.createController("ItemDetailWindow", item).getView();
        detailWin.currentTab = $.DownloadWindow.currentTab;
        $.DownloadWindow.currentTab.open(detailWin);
    }
    function logout() {
        var net = require("net");
        net.lastLogin = Ti.App.Properties.setDouble("lastLogin", 0);
        net.username = Ti.App.Properties.setString("username", "none");
        var path = Titanium.Filesystem.applicationDataDirectory;
        var searchKey = path.search("Documents");
        path = path.substring(0, searchKey);
        path += "Library/Cookies/";
        var f = Ti.Filesystem.getFile(path + "Cookies.binarycookies");
        f.deleteFile();
        var loginWindow = Alloy.createController("LoginWindow").getView();
        loginWindow.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DownloadWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("Demo");
    $.__views.DownloadWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Download",
        id: "DownloadWindow"
    });
    $.__views.DownloadWindow && $.addTopLevelView($.__views.DownloadWindow);
    $.__views.logout = Ti.UI.createButton({
        title: "Logout",
        id: "logout"
    });
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    $.__views.DownloadWindow.rightNavButton = $.__views.logout;
    $.__views.username = Ti.UI.createButton({
        width: "80",
        text: "none",
        borderWidth: 1,
        borderColor: "black",
        id: "username"
    });
    $.__views.DownloadWindow.leftNavButton = $.__views.username;
    $.__views.__alloyId4 = Ti.UI.createTableView({
        id: "__alloyId4"
    });
    $.__views.DownloadWindow.add($.__views.__alloyId4);
    var __alloyId12 = Alloy.Collections["Demo"] || Demo;
    __alloyId12.on("fetch destroy change add remove reset", __alloyId13);
    openDetail ? $.__views.__alloyId4.addEventListener("click", openDetail) : __defers["$.__views.__alloyId4!click!openDetail"] = true;
    exports.destroy = function() {
        __alloyId12.off("fetch destroy change add remove reset", __alloyId13);
    };
    _.extend($, $.__views);
    var net = require("net");
    Ti.App.addEventListener("set:login", function(e) {
        Ti.API.info("|" + e.username + "|");
        $.username.title = e.username;
    });
    $.DownloadWindow.addEventListener("focus", function() {
        if (net.loggedIn) {
            Ti.API.info("loading entries from repository");
            net.apiCall(Alloy.Globals.gateway + "glibrary/glib/" + Alloy.Globals.repository + "/Entries/" + Alloy.Globals.type + "/", function(response) {
                if (response.records.length > 0) {
                    var records = response.records;
                    Alloy.Collections.Demo.reset();
                    for (var i = 0; records.length > i; i++) {
                        var thumbdata = records[i]["/aginfra/Thumbs:Data"];
                        var thumbnail = Ti.Utils.base64decode(thumbdata);
                        records[i].Thumbnail = thumbnail;
                        var item = Alloy.createModel("Demo", records[i]);
                        Alloy.Collections.Demo.add(item);
                    }
                }
            });
        }
    });
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.__alloyId4!click!openDetail"] && $.__views.__alloyId4.addEventListener("click", openDetail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;