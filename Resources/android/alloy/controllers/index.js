function Controller() {
    function onNavDrawerWinOpen() {
        this.removeEventListener("open", onNavDrawerWinOpen);
        if (this.getActivity()) {
            var actionBar = this.getActivity().getActionBar();
            if (actionBar) {
                actionBar.setTitle(Alloy.Globals.repository);
                actionBar.setIcon("/menu-icon.png");
                actionBar.setOnHomeIconItemSelected(function() {
                    window.toggleLeftWindow();
                });
            }
        }
    }
    function openLeft() {
        window.toggleLeftWindow();
    }
    function loadLoginWindow() {
        var federetionListWindow = Alloy.createController("federationList").getView();
        federetionListWindow.fullscreen = false;
        federetionListWindow.open();
    }
    function loadTypeList() {
        if (net.loggedIn) {
            var url = Alloy.Globals.gateway + "glibrary/mountTree/" + Alloy.Globals.repository + "/?node=";
            net.apiCall(url + "0", function(response) {
                var data = [];
                for (var i = 0; response.length > i; i++) {
                    var type = {};
                    type.title = response[i].text;
                    type.isLeaf = response[i].leaf;
                    type.name = String(response[i].id);
                    type.leftImage = "/Folder-Add.png";
                    type.height = 60;
                    type.isLeaf || net.apiCall(url + response[i].id, function(response) {
                        for (var j = 0; response.length > j; j++) {
                            var row = Ti.UI.createTableViewRow();
                            row.add(Ti.UI.createLabel({
                                text: response[j].text,
                                left: 100,
                                font: {
                                    fontSize: 18
                                }
                            }));
                            row.add(Ti.UI.createImageView({
                                image: "folder.png",
                                width: 50,
                                left: 50
                            }));
                            row.id = "" + response[j].id;
                            row.typename = response[j].text;
                            row.path = response[j].path;
                            row.visibleAttrs = response[j].visibleAttrs;
                            row.hasChild = true;
                            row.height = 60;
                            var parentID = response[j].parentID;
                            var previousRow = $.typesTableView.getIndexByName(parentID);
                            $.typesTableView.insertRowAfter(previousRow, row);
                        }
                    });
                    type.typename = response[i].text;
                    type.path = response[i].path;
                    type.visibleAttrs = response[i].visibleAttrs;
                    type.hasChild = true;
                    data.push(type);
                }
                $.typesTableView.setData(data);
            });
        }
    }
    function loadEntries(e) {
        Ti.API.info(e.rowData.path);
        var entryBrowser = Alloy.createController("entryBrowserWindow", {
            path: e.rowData.path,
            name: e.rowData.typename,
            visibleAttrs: e.rowData.visibleAttrs
        }).getView();
        entryBrowser.open();
    }
    function logout() {
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
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.repo = Ti.UI.createView({
        backgroundColor: "white",
        id: "repo"
    });
    $.__views.repo && $.addTopLevelView($.__views.repo);
    loadTypeList ? $.__views.repo.addEventListener("open", loadTypeList) : __defers["$.__views.repo!open!loadTypeList"] = true;
    $.__views.typesTableView = Ti.UI.createTableView({
        bottom: "50",
        id: "typesTableView"
    });
    $.__views.repo.add($.__views.typesTableView);
    loadEntries ? $.__views.typesTableView.addEventListener("click", loadEntries) : __defers["$.__views.typesTableView!click!loadEntries"] = true;
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "50",
        bottom: "0",
        borderTop: "true",
        borderBottom: "false",
        id: "__alloyId51"
    });
    $.__views.repo.add($.__views.__alloyId51);
    $.__views.usarnameLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        text: "Logged as",
        id: "usarnameLbl",
        left: "10"
    });
    $.__views.__alloyId51.add($.__views.usarnameLbl);
    $.__views.username = Ti.UI.createLabel({
        color: "#666666",
        font: {
            fontWeight: "bold",
            fontSize: "12dp"
        },
        id: "username",
        left: "80"
    });
    $.__views.__alloyId51.add($.__views.username);
    $.__views.logout = Ti.UI.createButton({
        id: "logout",
        title: "Log Out",
        right: "10"
    });
    $.__views.__alloyId51.add($.__views.logout);
    logout ? $.__views.logout.addEventListener("click", logout) : __defers["$.__views.logout!click!logout"] = true;
    $.__views.leftWindow = Ti.UI.createView({
        top: 0,
        backgroundColor: "#fff",
        id: "leftWindow"
    });
    $.__views.leftWindow && $.addTopLevelView($.__views.leftWindow);
    var __alloyId52 = [];
    $.__views.__alloyId53 = Ti.UI.createTableViewRow({
        leftImage: "/earthserver.jpg",
        title: "ESA-MERIS repository",
        repo: "ESArep",
        header: "EarthServer repositories",
        id: "__alloyId53"
    });
    __alloyId52.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createTableViewRow({
        leftImage: "/earthserver.jpg",
        title: "WxS repositories",
        repo: "WxS",
        id: "__alloyId54"
    });
    __alloyId52.push($.__views.__alloyId54);
    $.__views.leftTable = Ti.UI.createTableView({
        top: "0",
        data: __alloyId52,
        id: "leftTable",
        rowHeight: "70"
    });
    $.__views.leftWindow.add($.__views.leftTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var net = require("net");
    Ti.API.info("lastLogin: " + net.lastLogin);
    Ti.API.info("shibCookie:" + net.shibCookie);
    Ti.API.info("username:" + net.username);
    $.repo.title = Alloy.Globals.repository;
    var window;
    var NappDrawerModule = require("dk.napp.drawer");
    var window = NappDrawerModule.createDrawer({
        fullscreen: false,
        leftWindow: $.leftWindow,
        centerWindow: $.repo,
        fading: .2,
        parallaxAmount: .2,
        shadowWidth: "40dp",
        leftDrawerWidth: 240,
        animationMode: NappDrawerModule.ANIMATION_NONE,
        closeDrawerGestureMode: NappDrawerModule.MODE_MARGIN,
        openDrawerGestureMode: NappDrawerModule.MODE_ALL
    });
    window.addEventListener("open", onNavDrawerWinOpen);
    $.leftTable.addEventListener("click", function(e) {
        window.toggleLeftWindow();
        if (0 == e.index) {
            Alloy.Globals.repository = e.rowData.repo;
            $.repo.title = e.rowData.title;
            loadTypeList();
        } else {
            var wxs_client = Ti.UI.createWindow({
                url: "/windows/Settings.js",
                title: "Settings",
                backgroundImage: "/images/bgImage.png"
            });
            wxs_client.open();
        }
    });
    $.repo.addEventListener("focus", function() {
        Ti.API.info("focused");
    });
    window.open();
    setTimeout(function() {
        window.setParallaxAmount(.4);
        window.toggleLeftWindow();
    }, 1e3);
    if (net.shibCookie) if (new Date() > new Date(net.lastLogin + 36e5)) loadLoginWindow(); else {
        net.loggedIn = true;
        $.username.text = net.username;
        Ti.API.info("già loggato ");
    } else loadLoginWindow();
    if (!Ti.App.Properties.getBool("welcome_screen", true)) {
        var welcomeWindow = Alloy.createController("WelcomeScreen").getView();
        welcomeWindow.open();
    }
    Ti.App.addEventListener("loggedIn", function(e) {
        loadTypeList();
        $.username.text = e.username;
    });
    exports.close = function() {
        $.index.close();
    };
    __defers["$.__views.repo!open!loadTypeList"] && $.__views.repo.addEventListener("open", loadTypeList);
    __defers["$.__views.__alloyId42!click!openLeft"] && $.__views.__alloyId42.addEventListener("click", openLeft);
    __defers["$.__views.typesTableView!click!loadEntries"] && $.__views.typesTableView.addEventListener("click", loadEntries);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    __defers["$.__views.repo!open!loadTypeList"] && $.__views.repo.addEventListener("open", loadTypeList);
    __defers["$.__views.typesTableView!click!loadEntries"] && $.__views.typesTableView.addEventListener("click", loadEntries);
    __defers["$.__views.logout!click!logout"] && $.__views.logout.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;