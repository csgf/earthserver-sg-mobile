function Controller() {
    function addMeeoServerCompleted() {
        var dialog = Ti.UI.createAlertDialog({
            message: String.format(L("AddServer_OkDialog_message"), "MEEO"),
            ok: "OK",
            title: L("AddServer_OkDialog_title")
        });
        dialog.addEventListener("click", function() {
            Ti.API.info("The cancel button was clicked");
        });
        hideLoading();
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/SettingsWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settingsWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "settingsWin"
    });
    $.__views.settingsWin && $.addTopLevelView($.__views.settingsWin);
    addMeeoServer ? $.__views.settingsWin.addEventListener("open", addMeeoServer) : __defers["$.__views.settingsWin!open!addMeeoServer"] = true;
    var __alloyId170 = [];
    $.__views.__alloyId171 = Ti.UI.createTableViewSection({
        headerTitle: "Queries the server",
        id: "__alloyId171"
    });
    __alloyId170.push($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
    showAvailableCoverage ? $.__views.__alloyId172.addEventListener("click", showAvailableCoverage) : __defers["$.__views.__alloyId172!click!showAvailableCoverage"] = true;
    $.__views.__alloyId173 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: "Available coverages",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        top: "25dp",
        bottom: "5dp",
        right: "10dp",
        height: Ti.UI.SIZE,
        text: "Show coverages available in your location",
        id: "__alloyId174"
    });
    $.__views.__alloyId172.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createTableViewSection({
        headerTitle: L("settings_section2_title"),
        id: "__alloyId175"
    });
    __alloyId170.push($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createTableViewRow({
        height: "50dp",
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    showServerCapabilities ? $.__views.__alloyId176.addEventListener("click", showServerCapabilities) : __defers["$.__views.__alloyId176!click!showServerCapabilities"] = true;
    $.__views.__alloyId177 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: L("settings_row4_title"),
        id: "__alloyId177"
    });
    $.__views.__alloyId176.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        text: L("settings_row4_description"),
        id: "__alloyId178"
    });
    $.__views.__alloyId176.add($.__views.__alloyId178);
    $.__views.__alloyId169 = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId170,
        id: "__alloyId169"
    });
    $.__views.settingsWin.add($.__views.__alloyId169);
    $.__views.loadingView = Ti.UI.createView({
        id: "loadingView",
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
        opacity: "0.4",
        visible: "false",
        zIndex: "10"
    });
    $.__views.settingsWin.add($.__views.loadingView);
    $.__views.activityIndicatorView = Ti.UI.createActivityIndicator({
        font: {
            fontSize: "26dp",
            fontWeight: "bold"
        },
        color: "#fff",
        message: "Loading...",
        visible: false,
        id: "activityIndicatorView",
        style: Ti.UI.ActivityIndicatorStyle.BIG,
        zIndex: "11"
    });
    $.__views.settingsWin.add($.__views.activityIndicatorView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var debug_mode = Alloy.Globals.debug_mode;
    $.settingsWin.title = arguments[0].title;
    var xmlText;
    var lastUpdate = Ti.App.Properties.getDouble("lastUpdate", 0);
    if (new Date(new Date().getTime()) > new Date(lastUpdate + 864e5)) {
        Ti.App.Properties.setDouble("lastUpdate", new Date().getTime());
        Ti.API.info(JSON.stringify(Ti.App.Properties.getList("avalaibleServersMeeo")));
        Ti.API.info(JSON.stringify(Ti.App.Properties.getList("serversMeeo")));
        Ti.App.Properties.setList("avalaibleServersMeeo", []);
        Ti.App.Properties.setList("serversMeeo", []);
    }
    $.settingsWin.addEventListener("open", function() {
        var actionBar;
        if ($.settingsWin.activity) {
            actionBar = $.settingsWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.settingsWin.close();
                };
            }
            $.settingsWin.getActivity().onCreateOptionsMenu = function(e) {
                var infoBtn = e.menu.add({
                    title: "Info",
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: Ti.Android.R.drawable.ic_menu_info_details
                });
                infoBtn.addEventListener("click", function() {
                    openInfoWin();
                });
            };
            $.settingsWin.getActivity().invalidateOptionsMenu();
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var showLoading = function() {
        $.activityIndicatorView.show();
        $.loadingView.show();
    };
    var hideLoading = function() {
        $.activityIndicatorView.hide();
        $.loadingView.hide();
    };
    var addMeeoServer = function() {
        var serversMeeo = Ti.App.Properties.getList("serversMeeo", []);
        if (serversMeeo.length) {
            xmlText = serversMeeo[0].getCapabilities;
            if (debug_mode) {
                Ti.API.info("Meeo Server already exists");
                Ti.API.info(xmlText);
            }
            return;
        }
        showLoading();
        var xhr = Titanium.Network.createHTTPClient({
            timeout: 12e4
        });
        xhr.onload = function() {
            function getDescribeCoverage(serversMeeo, serverIndex, coverageId) {
                try {
                    var xhr = Titanium.Network.createHTTPClient();
                    xhr.onload = function() {
                        var xmlText = this.responseText;
                        serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml = xmlText;
                        var spatialEnvelope = {
                            lowerCorner: [],
                            upperCorner: []
                        };
                        var xmlData = Titanium.XML.parseString(xmlText);
                        var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
                        var numbersArray = [];
                        numbersArray = str.split(" ");
                        for (var i = 0; numbersArray.length > i; i++) spatialEnvelope.lowerCorner.push(parseFloat(numbersArray[i]).toFixed(6));
                        var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
                        var numbersArray = [];
                        numbersArray = str.split(" ");
                        for (var i = 0; numbersArray.length > i; i++) spatialEnvelope.upperCorner.push(parseFloat(numbersArray[i]).toFixed(6));
                        serversMeeo[serverIndex].describeCoverageArray[coverageIndex].spatialEnvelope = spatialEnvelope;
                        describeCoverageArray = serversMeeo[serverIndex].describeCoverageArray;
                        debug_mode && Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));
                        if (5 > coverageIndex) {
                            coverageIndex++;
                            getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
                        } else {
                            Ti.App.Properties.setList("serversMeeo", serversMeeo);
                            addMeeoServerCompleted();
                        }
                    };
                    xhr.onerror = function() {
                        Ti.API.error(this.status + " - " + this.statusText);
                        if (5 > coverageIndex) {
                            coverageIndex++;
                            getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
                        } else {
                            Ti.App.Properties.setList("serversMeeo", serversMeeo);
                            addMeeoServerCompleted();
                        }
                    };
                    xhr.timeout = 1e4;
                    var strRequest = serversMeeo[serverIndex].url;
                    strRequest += "?service=" + serversMeeo[serverIndex].type;
                    strRequest += "&version=" + serversMeeo[serverIndex].serviceTypeVersion;
                    strRequest += "&request=DescribeCoverage";
                    strRequest += "&coverageId=" + coverageId;
                    Ti.API.info("getDescribeCoverage url ---> " + strRequest);
                    xhr.open("GET", strRequest);
                    xhr.send();
                } catch (e) {
                    if (5 > coverageIndex) {
                        coverageIndex++;
                        getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
                    } else {
                        Ti.App.Properties.setList("serversMeeo", serversMeeo);
                        addMeeoServerCompleted();
                    }
                }
            }
            xmlText = this.responseText;
            var serversMeeo = [];
            Ti.App.Properties.hasProperty("serversMeeo") && (serversMeeo = Ti.App.Properties.getList("serversMeeo"));
            var covArray = [ {
                id: "HRES_ENSCOCONC_4326_01",
                xml: ""
            }, {
                id: "HRES_ENSNO2CONC_4326_01",
                xml: ""
            }, {
                id: "HRES_ENSO3CONC_4326_01",
                xml: ""
            }, {
                id: "HRES_ENSPM10CONC_4326_01",
                xml: ""
            }, {
                id: "HRES_ENSPM2P5CONC_4326_01",
                xml: ""
            }, {
                id: "HRES_ENSSO2CONC_4326_01",
                xml: ""
            } ];
            var xmlData = Titanium.XML.parseString(xmlText);
            var newServer = {
                name: "MEEO server",
                type: "WCS",
                serviceTypeVersion: xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent,
                url: "http://earthserver.services.meeo.it/petascope/wcs2",
                getCapabilities: xmlText,
                describeCoverageArray: covArray
            };
            serversMeeo.push(newServer);
            Ti.App.Properties.setList("serversMeeo", serversMeeo);
            var serverIndex = 0;
            var coverageIndex = 0;
            getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id);
        };
        xhr.onerror = function() {
            alert(L("AddServer_ErrorDialog_message"));
            hideLoading();
            setTimeout(function() {
                $.settingsWin.close();
            }, 5e3);
        };
        var strRequest = "http://earthserver.services.meeo.it/petascope/wcs2?Service=WCS&Request=GetCapabilities";
        xhr.open("GET", strRequest);
        xhr.send();
    };
    var showAvailableCoverage = function() {
        var availableCoveragesWin;
        var availableCoveragesWin = Alloy.createController("/meeo/AvailableCoveragesWin").getView();
        availableCoveragesWin.open();
    };
    var showServerCapabilities = function() {
        var serverCapabilitiesWin;
        var serverCapabilitiesWin = Alloy.createController("/meeo/ServerCapabilitiesWin").getView();
        serverCapabilitiesWin.open();
    };
    var infoWin = Ti.UI.createWindow({
        title: "MEEO info"
    });
    var wv = Ti.UI.createWebView({
        url: "/MEEO.html"
    });
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
    var openInfoWin = function() {
        infoWin.open();
    };
    __defers["$.__views.settingsWin!open!addMeeoServer"] && $.__views.settingsWin.addEventListener("open", addMeeoServer);
    __defers["$.__views.__alloyId168!click!openInfoWin"] && $.__views.__alloyId168.addEventListener("click", openInfoWin);
    __defers["$.__views.__alloyId172!click!showAvailableCoverage"] && $.__views.__alloyId172.addEventListener("click", showAvailableCoverage);
    __defers["$.__views.__alloyId176!click!showServerCapabilities"] && $.__views.__alloyId176.addEventListener("click", showServerCapabilities);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;