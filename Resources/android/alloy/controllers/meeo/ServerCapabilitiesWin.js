function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/ServerCapabilitiesWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.serverCapabilitiesWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "serverCapabilitiesWin",
        title: "MEEO Capabilities"
    });
    $.__views.serverCapabilitiesWin && $.addTopLevelView($.__views.serverCapabilitiesWin);
    loadCapabilities ? $.__views.serverCapabilitiesWin.addEventListener("open", loadCapabilities) : __defers["$.__views.serverCapabilitiesWin!open!loadCapabilities"] = true;
    var __alloyId163 = [];
    $.__views.__alloyId164 = Ti.UI.createTableViewSection({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        headerTitle: L("WcsServer_section1_title"),
        id: "__alloyId164"
    });
    __alloyId163.push($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createTableViewRow({
        height: "50dp",
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId165"
    });
    __alloyId163.push($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: L("settings_row1_title"),
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.capabilitiesTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId163,
        id: "capabilitiesTv"
    });
    $.__views.serverCapabilitiesWin.add($.__views.capabilitiesTv);
    tvClick ? $.__views.capabilitiesTv.addEventListener("click", tvClick) : __defers["$.__views.capabilitiesTv!click!tvClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var meeoServer = Ti.App.Properties.getList("serversMeeo", []);
    var css = Ti.API.WxsCss;
    var xmlData;
    $.serverCapabilitiesWin.addEventListener("open", function() {
        var actionBar;
        if ($.serverCapabilitiesWin.activity) {
            actionBar = $.serverCapabilitiesWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.serverCapabilitiesWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var loadCapabilities = function() {
        var sectionCoverages = Ti.UI.createTableViewSection({
            headerTitle: L("WcsServer_section2_title")
        });
        for (var i in meeoServer) {
            if ("http://earthserver.services.meeo.it/petascope/wcs2" === meeoServer[i].url) {
                coverages = meeoServer[i].describeCoverageArray;
                xmlData = Titanium.XML.parseString(meeoServer[i].getCapabilities);
            }
            break;
        }
        if (xmlData) {
            for (var i = 0; coverages.length > i; i++) {
                var row = Titanium.UI.createTableViewRow({
                    height: css.rowHeight,
                    hasChild: true,
                    backgroundColor: css.bcTvRowColor,
                    className: "coverage-row",
                    coverageId: coverages[i].id
                });
                var titleRow = Titanium.UI.createLabel({
                    text: coverages[i].id,
                    font: {
                        fontSize: css.titleFontSize,
                        fontWeight: "bold"
                    },
                    color: css.titleColor,
                    left: 10,
                    tight: 10,
                    top: 5,
                    height: css.titleHeight
                });
                var descriptionRow = Titanium.UI.createLabel({
                    text: "RectifieldGridCoverage",
                    font: {
                        fontSize: css.descriptionFontSize,
                        fontWeight: "normal"
                    },
                    color: css.descriptionColor,
                    left: 10,
                    right: 10,
                    bottom: 5,
                    height: css.descriptionHeight
                });
                row.add(titleRow);
                row.add(descriptionRow);
                Titanium.UI.createImageView({
                    image: "/images/next.png",
                    width: 48,
                    height: 48,
                    right: 10,
                    top: 20
                });
                sectionCoverages.add(row);
            }
            $.capabilitiesTv.appendSection(sectionCoverages);
        }
    };
    var tvClick = function(e) {
        if (0 == e.index) {
            var wcsMetadataWin;
            var wcsMetadataWin = Alloy.createController("/meeo/WcsMetadataWin", {
                xmlData: xmlData
            }).getView();
            wcsMetadataWin.open();
        } else {
            var coverageMetadataWin;
            var coverageMetadataWin = Alloy.createController("/meeo/CoverageMetadataWin", {
                rowID: e.index - 1,
                coverageId: e.row.coverageId,
                serverIndex: 0,
                ServiceTypeVersion: xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
            }).getView();
            coverageMetadataWin.open();
        }
    };
    __defers["$.__views.serverCapabilitiesWin!open!loadCapabilities"] && $.__views.serverCapabilitiesWin.addEventListener("open", loadCapabilities);
    __defers["$.__views.capabilitiesTv!click!tvClick"] && $.__views.capabilitiesTv.addEventListener("click", tvClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;