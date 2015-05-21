function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/ViewXmlWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.ViewXmlWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "ViewXmlWin",
        title: "XML Server Response"
    });
    $.__views.ViewXmlWin && $.addTopLevelView($.__views.ViewXmlWin);
    $.__views.xmlTxa = Ti.UI.createTextArea({
        id: "xmlTxa"
    });
    $.__views.ViewXmlWin.add($.__views.xmlTxa);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var css = Ti.API.WxsCss;
    var xmlData = arguments[0].xmlData;
    $.ViewXmlWin.addEventListener("open", function() {
        var actionBar;
        if ($.ViewXmlWin.activity) {
            actionBar = $.ViewXmlWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.ViewXmlWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.xmlTxa.applyProperties({
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.titleColor,
        backgroundColor: css.bcTvRowColor,
        left: 5,
        right: 5,
        top: 0,
        bottom: 0,
        autocorrect: false,
        editable: false,
        value: Titanium.XML.serializeToString(xmlData)
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;