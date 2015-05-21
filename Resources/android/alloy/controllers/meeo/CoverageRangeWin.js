function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CoverageRangeWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.CoverageRangeWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        title: "Range type",
        id: "CoverageRangeWin"
    });
    $.__views.CoverageRangeWin && $.addTopLevelView($.__views.CoverageRangeWin);
    $.__views.rangeTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        id: "rangeTv"
    });
    $.__views.CoverageRangeWin.add($.__views.rangeTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var css = Ti.API.WxsCss;
    var xmlData = arguments[0].xmlData;
    var rangeType = Ti.XML.Element;
    rangeType = xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);
    $.CoverageRangeWin.addEventListener("open", function() {
        var actionBar;
        if ($.CoverageRangeWin.activity) {
            actionBar = $.CoverageRangeWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.CoverageRangeWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var sectionBands = Ti.UI.createTableViewSection({
        headerTitle: L("WcsCoverageRange_section1_title")
    });
    if (null != rangeType.getElementsByTagName("swe:field")) for (var i = 0; rangeType.getElementsByTagName("swe:field").length > i; i++) {
        var row = Titanium.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            hasChild: false,
            backgroundColor: css.bcTvRowColor,
            className: "bands-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: String.format(L("WcsCoverageRange_row1_title"), i.toString()),
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
            text: rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
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
        sectionBands.add(row);
    }
    $.rangeTv.appendSection([ sectionBands ]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;