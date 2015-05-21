function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/DescribeCoverageWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.DescribeCoverageWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "DescribeCoverageWin",
        title: "Describe Coverage"
    });
    $.__views.DescribeCoverageWin && $.addTopLevelView($.__views.DescribeCoverageWin);
    var __alloyId146 = [];
    $.__views.__alloyId147 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsDescribeCoverage_section1_title"),
        id: "__alloyId147"
    });
    __alloyId146.push($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsDescribeCoverage_row1_title"),
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    $.__views.coverageId = Ti.UI.createLabel({
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
        id: "coverageId"
    });
    $.__views.__alloyId148.add($.__views.coverageId);
    $.__views.__alloyId150 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId150"
    });
    $.__views.__alloyId147.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsDescribeCoverage_row2_title"),
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    $.__views.coverageType = Ti.UI.createLabel({
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
        id: "coverageType"
    });
    $.__views.__alloyId150.add($.__views.coverageType);
    $.__views.__alloyId152 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsDescribeCoverage_section2_title"),
        id: "__alloyId152"
    });
    __alloyId146.push($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    showCoverageEnvelope ? $.__views.__alloyId153.addEventListener("click", showCoverageEnvelope) : __defers["$.__views.__alloyId153!click!showCoverageEnvelope"] = true;
    $.__views.__alloyId154 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: L("WcsDescribeCoverage_row3_title"),
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsDescribeCoverage_section3_title"),
        id: "__alloyId155"
    });
    __alloyId146.push($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    showCoverageDomain ? $.__views.__alloyId156.addEventListener("click", showCoverageDomain) : __defers["$.__views.__alloyId156!click!showCoverageDomain"] = true;
    $.__views.__alloyId157 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: L("WcsDescribeCoverage_row4_title"),
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsDescribeCoverage_section4_title"),
        id: "__alloyId158"
    });
    __alloyId146.push($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    showCoverageRange ? $.__views.__alloyId159.addEventListener("click", showCoverageRange) : __defers["$.__views.__alloyId159!click!showCoverageRange"] = true;
    $.__views.__alloyId160 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: L("WcsDescribeCoverage_row5_title"),
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.describeCoverageTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId146,
        id: "describeCoverageTv"
    });
    $.__views.DescribeCoverageWin.add($.__views.describeCoverageTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.WxsCss;
    var xmlText = arguments[0].xmlText;
    var xmlData = Titanium.XML.parseString(xmlText);
    $.coverageId.text = xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent;
    $.coverageType.text = xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent;
    $.DescribeCoverageWin.addEventListener("open", function() {
        var actionBar;
        if ($.DescribeCoverageWin.activity) {
            actionBar = $.DescribeCoverageWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.DescribeCoverageWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var showCoverageEnvelope = function() {
        var coverageEnvelopeWin;
        var coverageEnvelopeWin = Alloy.createController("/meeo/CoverageEnvelopeWin", {
            xmlData: xmlData
        }).getView();
        coverageEnvelopeWin.open();
    };
    var showCoverageDomain = function() {
        var coverageDomainWin;
        var coverageDomainWin = Alloy.createController("/meeo/CoverageDomainWin", {
            xmlData: xmlData
        }).getView();
        coverageDomainWin.open();
    };
    var showCoverageRange = function() {
        var coverageRangeWin;
        var coverageRangeWin = Alloy.createController("/meeo/CoverageRangeWin", {
            xmlData: xmlData
        }).getView();
        coverageRangeWin.open();
    };
    __defers["$.__views.__alloyId153!click!showCoverageEnvelope"] && $.__views.__alloyId153.addEventListener("click", showCoverageEnvelope);
    __defers["$.__views.__alloyId156!click!showCoverageDomain"] && $.__views.__alloyId156.addEventListener("click", showCoverageDomain);
    __defers["$.__views.__alloyId159!click!showCoverageRange"] && $.__views.__alloyId159.addEventListener("click", showCoverageRange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;