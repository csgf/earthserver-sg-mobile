function Controller() {
    function retrieveDescribeCoverage(serverIndex, coverageIndex) {
        Ti.API.info("WcsCoverageMetadata.js - serverIndex: " + serverIndex);
        Ti.API.info("WcsCoverageMetadata.js - coverageIndex: " + coverageIndex);
        showLoading();
        var serversMeeo = [];
        Ti.App.Properties.hasProperty("serversMeeo") && (serversMeeo = Ti.App.Properties.getList("serversMeeo"));
        debug_mode && Ti.API.info("Selected coverage: ---> " + JSON.stringify(serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml));
        if ("" === serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml) {
            debug_mode && Ti.API.info("Xml non presente: lo scarico dal server ----> ");
            getDescribeCoverage(serversMeeo, serverIndex, function(xmlText) {
                alert(L("WcsDescribeCoverage_message"));
                if (null == xmlText) {
                    alert("error");
                    hideLoading();
                } else {
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
                    debug_mode && Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));
                    Ti.App.Properties.setList("serversMeeo", serversMeeo);
                    hideLoading();
                    var describeCoverageWin;
                    var describeCoverageWin = Alloy.createController("/meeo/DescribeCoverageWin", {
                        xmlText: serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml
                    }).getView();
                    describeCoverageWin.open();
                }
            });
        } else {
            debug_mode && Ti.API.info("Xml già presente ----> " + JSON.stringify(serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml));
            hideLoading();
            var describeCoverageWin;
            var describeCoverageWin = Alloy.createController("/meeo/DescribeCoverageWin", {
                xmlText: serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml
            }).getView();
            describeCoverageWin.open();
        }
    }
    function getDescribeCoverage(serversMeeo, serverIndex, callback) {
        try {
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onload = function() {
                var xmlText = this.responseText;
                callback(xmlText);
            };
            xhr.onerror = function() {
                Ti.API.error(this.status + " - " + this.statusText);
                callback(null);
            };
            xhr.timeout = 1e4;
            var strRequest = serversMeeo[serverIndex].url;
            strRequest += "?service=" + serversMeeo[serverIndex].type;
            strRequest += "&version=" + ServiceTypeVersion;
            strRequest += "&request=DescribeCoverage";
            strRequest += "&coverageId=" + coverageId;
            Ti.API.info("getDescribeCoverage url ---> " + strRequest);
            xhr.open("GET", strRequest);
            xhr.send();
        } catch (e) {
            callback(null);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageMetadataWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.CoverageMetadataWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "CoverageMetadataWin",
        title: "Coverage Metadata"
    });
    $.__views.CoverageMetadataWin && $.addTopLevelView($.__views.CoverageMetadataWin);
    var __alloyId139 = [];
    $.__views.selectedCoverageId = Ti.UI.createTableViewSection({
        id: "selectedCoverageId"
    });
    __alloyId139.push($.__views.selectedCoverageId);
    $.__views.__alloyId140 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId140"
    });
    $.__views.selectedCoverageId.add($.__views.__alloyId140);
    showCoverageInfo ? $.__views.__alloyId140.addEventListener("click", showCoverageInfo) : __defers["$.__views.__alloyId140!click!showCoverageInfo"] = true;
    $.__views.__alloyId141 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageMetadata_row1_title"),
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createLabel({
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
        text: L("WcsCoverageMetadata_row1_description"),
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId143"
    });
    $.__views.selectedCoverageId.add($.__views.__alloyId143);
    showDescribeCoverage ? $.__views.__alloyId143.addEventListener("click", showDescribeCoverage) : __defers["$.__views.__alloyId143!click!showDescribeCoverage"] = true;
    $.__views.__alloyId144 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageMetadata_row2_title"),
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createLabel({
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
        text: L("WcsCoverageMetadata_row2_description"),
        id: "__alloyId145"
    });
    $.__views.__alloyId143.add($.__views.__alloyId145);
    $.__views.__alloyId138 = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId139,
        id: "__alloyId138"
    });
    $.__views.CoverageMetadataWin.add($.__views.__alloyId138);
    $.__views.loadingView = Ti.UI.createView({
        id: "loadingView",
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
        opacity: "0.4",
        visible: "false",
        zIndex: "10"
    });
    $.__views.CoverageMetadataWin.add($.__views.loadingView);
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
    $.__views.CoverageMetadataWin.add($.__views.activityIndicatorView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.WxsCss;
    arguments[0].xmlData;
    var rowID = arguments[0].rowID;
    var coverageId = arguments[0].coverageId;
    var serverIndex = arguments[0].serverIndex;
    var ServiceTypeVersion = arguments[0].ServiceTypeVersion;
    var debug_mode = Alloy.Globals.debug_mode;
    $.selectedCoverageId.headerTitle = coverageId;
    $.CoverageMetadataWin.addEventListener("open", function() {
        var actionBar;
        if ($.CoverageMetadataWin.activity) {
            actionBar = $.CoverageMetadataWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.CoverageMetadataWin.close();
                };
            }
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
    var showCoverageInfo = function() {
        var coverageInfoWin;
        var coverageInfoWin = Alloy.createController("/meeo/CoverageInfoWin", {
            coverageId: coverageId
        }).getView();
        coverageInfoWin.open();
    };
    var showDescribeCoverage = function() {
        retrieveDescribeCoverage(serverIndex, rowID);
    };
    __defers["$.__views.__alloyId140!click!showCoverageInfo"] && $.__views.__alloyId140.addEventListener("click", showCoverageInfo);
    __defers["$.__views.__alloyId143!click!showDescribeCoverage"] && $.__views.__alloyId143.addEventListener("click", showDescribeCoverage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;