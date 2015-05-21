function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageEnvelopeWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.CoverageEnvelopeWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        title: "Envelope",
        id: "CoverageEnvelopeWin"
    });
    $.__views.CoverageEnvelopeWin && $.addTopLevelView($.__views.CoverageEnvelopeWin);
    var __alloyId118 = [];
    $.__views.__alloyId119 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsCoverageEnvelope_section1_title"),
        id: "__alloyId119"
    });
    __alloyId118.push($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row1_title"),
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.srsName = Ti.UI.createLabel({
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
        id: "srsName"
    });
    $.__views.__alloyId120.add($.__views.srsName);
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId122"
    });
    $.__views.__alloyId119.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row2_title"),
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.srsDomain = Ti.UI.createLabel({
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
        id: "srsDomain"
    });
    $.__views.__alloyId122.add($.__views.srsDomain);
    $.__views.__alloyId124 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId124"
    });
    $.__views.__alloyId119.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row3_title"),
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.axisLabel = Ti.UI.createLabel({
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
        id: "axisLabel"
    });
    $.__views.__alloyId124.add($.__views.axisLabel);
    $.__views.__alloyId126 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId126"
    });
    $.__views.__alloyId119.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row4_title"),
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    $.__views.axisUoms = Ti.UI.createLabel({
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
        id: "axisUoms"
    });
    $.__views.__alloyId126.add($.__views.axisUoms);
    $.__views.__alloyId128 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId128"
    });
    $.__views.__alloyId119.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row5_title"),
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.lowerCorner = Ti.UI.createLabel({
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
        id: "lowerCorner"
    });
    $.__views.__alloyId128.add($.__views.lowerCorner);
    $.__views.__alloyId130 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId130"
    });
    $.__views.__alloyId119.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageEnvelope_row6_title"),
        id: "__alloyId131"
    });
    $.__views.__alloyId130.add($.__views.__alloyId131);
    $.__views.upperCorner = Ti.UI.createLabel({
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
        id: "upperCorner"
    });
    $.__views.__alloyId130.add($.__views.upperCorner);
    $.__views.__alloyId117 = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId118,
        id: "__alloyId117"
    });
    $.__views.CoverageEnvelopeWin.add($.__views.__alloyId117);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.WxsCss;
    var xmlData = arguments[0].xmlData;
    $.CoverageEnvelopeWin.addEventListener("open", function() {
        var actionBar;
        if ($.CoverageEnvelopeWin.activity) {
            actionBar = $.CoverageEnvelopeWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.CoverageEnvelopeWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.srsName.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("srsName");
    $.srsDomain.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("srsDimension");
    $.axisLabel.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("axisLabels").replace(/ /g, "\n");
    $.axisUoms.text = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getAttribute("uomLabels").replace(/ /g, "\n");
    var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
    var numbersArray = [];
    numbersArray = str.split(" ");
    str = "";
    for (var i = 0; numbersArray.length > i; i++) str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
    str = str.substr(0, str.length - 1);
    $.lowerCorner.text = str;
    var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
    var numbersArray = [];
    numbersArray = str.split(" ");
    str = "";
    for (var i = 0; numbersArray.length > i; i++) str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
    str = str.substr(0, str.length - 1);
    $.upperCorner.text = str;
    if (Alloy.Globals.debug_mode) {
        Ti.API.info($.srsName.text);
        Ti.API.info($.srsName.text);
        Ti.API.info($.srsDomain.text);
        Ti.API.info($.axisLabel.text);
        Ti.API.info($.axisUoms.text);
        Ti.API.info($.lowerCorner.text);
        Ti.API.info($.upperCorner.text);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;