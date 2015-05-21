function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageDescriptionListWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.CoverageDescriptionListWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "CoverageDescriptionListWin",
        title: "MEEO Coverages List"
    });
    $.__views.CoverageDescriptionListWin && $.addTopLevelView($.__views.CoverageDescriptionListWin);
    $.__views.coverageListTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        id: "coverageListTv"
    });
    $.__views.CoverageDescriptionListWin.add($.__views.coverageListTv);
    showCoverageMetadata ? $.__views.coverageListTv.addEventListener("click", showCoverageMetadata) : __defers["$.__views.coverageListTv!click!showCoverageMetadata"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var css = Ti.API.WxsCss;
    $.CoverageDescriptionListWin.addEventListener("open", function() {
        var actionBar;
        if ($.CoverageDescriptionListWin.activity) {
            actionBar = $.CoverageDescriptionListWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.CoverageDescriptionListWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var xmlData = Titanium.XML.parseString(arguments[0].xmlText);
    xmlData.documentElement.getElementsByTagName("CoverageSummary");
    var addedServers = [];
    Ti.App.Properties.hasProperty("serversMeeo") && (addedServers = Ti.App.Properties.getList("serversMeeo"));
    Ti.API.info("addedServers[0].describeCoverageArray ----> " + JSON.stringify(addedServers[0].describeCoverageArray));
    var sectionCoverages = Ti.UI.createTableViewSection({
        headerTitle: L("WcsCoverageList_section1_title")
    });
    var coverages = addedServers[0].describeCoverageArray;
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
            top: 5,
            height: css.titleHeight,
            right: "10dp"
        });
        var descriptionRow = Titanium.UI.createLabel({
            text: "RectifieldGridCoverage",
            font: {
                fontSize: css.descriptionFontSize,
                fontWeight: "normal"
            },
            color: css.descriptionColor,
            left: 10,
            bottom: 5,
            right: "10dp",
            height: css.descriptionHeight
        });
        Titanium.UI.createImageView({
            image: "/images/next.png",
            width: 48,
            height: 48,
            right: 10,
            top: 20
        });
        row.add(titleRow);
        row.add(descriptionRow);
        sectionCoverages.add(row);
    }
    $.coverageListTv.data = [ sectionCoverages ];
    var showCoverageMetadata = function(e) {
        var coverageMetadataWin;
        var coverageMetadataWin = Alloy.createController("/meeo/CoverageMetadataWin", {
            rowID: e.index,
            coverageId: e.row.coverageId,
            serverIndex: 0,
            ServiceTypeVersion: xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent
        }).getView();
        coverageMetadataWin.open();
    };
    __defers["$.__views.coverageListTv!click!showCoverageMetadata"] && $.__views.coverageListTv.addEventListener("click", showCoverageMetadata);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;