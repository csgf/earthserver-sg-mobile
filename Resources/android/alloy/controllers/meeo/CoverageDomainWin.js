function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageDomainWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.CoverageDomainWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        title: "Domain set",
        id: "CoverageDomainWin"
    });
    $.__views.CoverageDomainWin && $.addTopLevelView($.__views.CoverageDomainWin);
    var __alloyId102 = [];
    $.__views.__alloyId103 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsCoverageDomain_section1_title"),
        id: "__alloyId103"
    });
    __alloyId102.push($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row1_title"),
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.dimension = Ti.UI.createLabel({
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
        id: "dimension"
    });
    $.__views.__alloyId104.add($.__views.dimension);
    $.__views.__alloyId106 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId106"
    });
    $.__views.__alloyId103.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row2_title"),
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
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
    $.__views.__alloyId106.add($.__views.axisLabel);
    $.__views.__alloyId108 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId108"
    });
    $.__views.__alloyId103.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row3_title"),
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.lowerLimit = Ti.UI.createLabel({
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
        id: "lowerLimit"
    });
    $.__views.__alloyId108.add($.__views.lowerLimit);
    $.__views.__alloyId110 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId110"
    });
    $.__views.__alloyId103.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row4_title"),
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    $.__views.upperLimit = Ti.UI.createLabel({
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
        id: "upperLimit"
    });
    $.__views.__alloyId110.add($.__views.upperLimit);
    $.__views.sectionOffsets = Ti.UI.createTableViewSection({
        id: "sectionOffsets",
        headerTitle: L("WcsCoverageDomain_section2_title")
    });
    __alloyId102.push($.__views.sectionOffsets);
    $.__views.__alloyId112 = Ti.UI.createTableViewSection({
        headerTitle: L("WcsCoverageDomain_section3_title"),
        id: "__alloyId112"
    });
    __alloyId102.push($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row7_title"),
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
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
    $.__views.__alloyId113.add($.__views.srsName);
    $.__views.__alloyId115 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId115"
    });
    $.__views.__alloyId112.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp",
        text: L("WcsCoverageDomain_row8_title"),
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.position = Ti.UI.createLabel({
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
        id: "position"
    });
    $.__views.__alloyId115.add($.__views.position);
    $.__views.__alloyId101 = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId102,
        id: "__alloyId101"
    });
    $.__views.CoverageDomainWin.add($.__views.__alloyId101);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var css = Ti.API.WxsCss;
    var xmlData = arguments[0].xmlData;
    var domainSet = xmlData.documentElement.getElementsByTagName("domainSet").item(0);
    $.CoverageDomainWin.addEventListener("open", function() {
        var actionBar;
        if ($.CoverageDomainWin.activity) {
            actionBar = $.CoverageDomainWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.CoverageDomainWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.dimension.text = domainSet.getElementsByTagName("RectifiedGrid").item(0).getAttribute("dimension");
    $.axisLabel.text = domainSet.getElementsByTagName("axisLabels").item(0).textContent.replace(/ /g, "\n");
    $.lowerLimit.text = domainSet.getElementsByTagName("low").item(0).textContent.replace(/ /g, "\n");
    $.upperLimit.text = domainSet.getElementsByTagName("high").item(0).textContent.replace(/ /g, "\n");
    var offsets = Ti.XML.Node;
    offsets = domainSet.getElementsByTagName("gml:offsetVector");
    if (null != offsets) {
        Ti.API.info("WcsCoverageDomain.js - offsets.length: " + offsets.length);
        for (var i = 0; offsets.length > i; i++) {
            var row = Titanium.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                hasChild: false,
                backgroundColor: css.bcTvRowColor,
                className: "domainSet-row"
            });
            var titleRow = Titanium.UI.createLabel({
                text: L("WcsCoverageDomain_row5_title"),
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
                text: offsets.item(i).getAttribute("srsName"),
                font: {
                    fontSize: css.descriptionFontSize,
                    fontWeight: "normal"
                },
                color: css.descriptionColor,
                left: 10,
                top: "25dp",
                bottom: 5,
                right: "10dp",
                height: Ti.UI.SIZE,
                zIndex: 1
            });
            row.add(titleRow);
            row.add(descriptionRow);
            $.sectionOffsets.add(row);
            var row = Titanium.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                hasChild: false,
                backgroundColor: css.bcTvRowColor,
                className: "domainSet-row"
            });
            var titleRow = Titanium.UI.createLabel({
                text: L("WcsCoverageDomain_row6_title"),
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
            str = offsets.item(i).textContent;
            var numbersArray = [];
            numbersArray = str.split(" ");
            str = "";
            for (var j = 0; numbersArray.length > j; j++) str += parseFloat(numbersArray[j]).toFixed(6) + "\n";
            str = str.substr(0, str.length - 1);
            var descriptionRow = Titanium.UI.createLabel({
                text: str,
                font: {
                    fontSize: css.descriptionFontSize,
                    fontWeight: "normal"
                },
                color: css.descriptionColor,
                left: 10,
                top: "25dp",
                bottom: 5,
                right: "10dp",
                height: Ti.UI.SIZE,
                zIndex: 1
            });
            row.add(titleRow);
            row.add(descriptionRow);
            $.sectionOffsets.add(row);
        }
    }
    var origin = Ti.XML.Element;
    origin = domainSet.getElementsByTagName("gml:origin").item(0);
    $.srsName.text = origin.getElementsByTagName("gml:Point").item(0).getAttribute("srsName");
    var str = origin.getElementsByTagName("gml:Point").item(0).getElementsByTagName("gml:pos").item(0).textContent;
    var numbersArray = [];
    numbersArray = str.split(" ");
    str = "";
    for (var i = 0; numbersArray.length > i; i++) str += parseFloat(numbersArray[i]).toFixed(6) + "\n";
    str = str.substr(0, str.length - 1);
    $.position.text = str;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;