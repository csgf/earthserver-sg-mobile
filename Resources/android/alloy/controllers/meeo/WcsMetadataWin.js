function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/WcsMetadataWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.wcsMetadataWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "wcsMetadataWin",
        title: L("WcsMetadata_win_title")
    });
    $.__views.wcsMetadataWin && $.addTopLevelView($.__views.wcsMetadataWin);
    $.__views.metadataTv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        id: "metadataTv"
    });
    $.__views.wcsMetadataWin.add($.__views.metadataTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var css = Ti.API.WxsCss;
    var xmlData = arguments[0].xmlData;
    $.wcsMetadataWin.addEventListener("open", function() {
        var actionBar;
        if ($.wcsMetadataWin.activity) {
            actionBar = $.wcsMetadataWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.wcsMetadataWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var sectionXmlResponse = Ti.UI.createTableViewSection({
        headerTitle: L("WcsMetadata_section1_title")
    });
    var row = Titanium.UI.createTableViewRow({
        height: css.rowHeight,
        hasChild: true,
        backgroundColor: css.bcTvRowColor,
        className: "response-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsMetadata_row1_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        height: css.titleHeight,
        right: "10dp"
    });
    row.add(titleRow);
    Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    row.addEventListener("click", function() {
        var viewXmlWin;
        var viewXmlWin = Alloy.createController("/meeo/ViewXmlWin", {
            xmlData: xmlData
        }).getView();
        viewXmlWin.open();
    });
    sectionXmlResponse.add(row);
    var sectionServiceIdentification = Ti.UI.createTableViewSection({
        headerTitle: L("WcsMetadata_section2_title")
    });
    var owsServiceIdentification = xmlData.documentElement.getElementsByTagName("ows:ServiceIdentification");
    var owsServiceProvider = xmlData.documentElement.getElementsByTagName("ows:ServiceProvider");
    for (var j = 2; 7 >= j; j++) {
        var desctiptionText = "";
        switch (j) {
          case 2:
            desctiptionText = owsServiceIdentification.item(0).getElementsByTagName("ows:Title").item(0).textContent;
            break;

          case 3:
            desctiptionText = owsServiceIdentification.item(0).getElementsByTagName("ows:Abstract").item(0).textContent;
            break;

          case 4:
            for (var i = 0; owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").length > i; i++) desctiptionText += owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").item(i).textContent + "\n";
            break;

          case 5:
            desctiptionText = owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceType").item(0).textContent;
            break;

          case 6:
            desctiptionText = owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent;
            break;

          case 7:
            for (var i = 0; owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").length > i; i++) desctiptionText += owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").item(i).textContent + "\n\n";
            desctiptionText = desctiptionText.substr(0, desctiptionText.length - 2);
        }
        var row = Titanium.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            hasChild: false,
            backgroundColor: css.bcTvRowColor
        });
        var titleRow = Titanium.UI.createLabel({
            text: L("WcsMetadata_row" + j + "_title"),
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
            text: desctiptionText,
            font: {
                fontSize: css.descriptionFontSize,
                fontWeight: "normal"
            },
            color: css.descriptionColor,
            left: 10,
            top: 25,
            bottom: 5,
            right: "10dp",
            height: Ti.UI.SIZE
        });
        row.add(titleRow);
        row.add(descriptionRow);
        sectionServiceIdentification.add(row);
    }
    var sectionServiceProvider = Ti.UI.createTableViewSection({
        headerTitle: L("WcsMetadata_section3_title")
    });
    for (var i = 10; 16 >= i; i++) {
        var titleText, desctiptionText;
        switch (i) {
          case 10:
            titleText = "Provider Name";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ProviderName").item(0).textContent;
            break;

          case 11:
            titleText = "Provider Site";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ProviderSite").item(0).getAttribute("xlink:href");
            break;

          case 12:
            titleText = "Individual Name";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:IndividualName").item(0).textContent;
            break;

          case 13:
            titleText = "City";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:City").item(0).textContent;
            break;

          case 14:
            titleText = "Postal Code";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:PostalCode").item(0).textContent;
            break;

          case 15:
            titleText = "Country";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:Country").item(0).textContent;
            break;

          case 16:
            titleText = "Mail";
            desctiptionText = owsServiceProvider.item(0).getElementsByTagName("ows:ServiceContact").item(0).getElementsByTagName("ows:ContactInfo").item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:ElectronicMailAddress").item(0).textContent;
        }
        var row = Titanium.UI.createTableViewRow({
            height: css.rowHeight,
            hasChild: false,
            backgroundColor: css.bcTvRowColor,
            className: "ServiceIdentification-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: titleText,
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
            text: desctiptionText,
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
        row.add(titleRow);
        row.add(descriptionRow);
        sectionServiceProvider.add(row);
    }
    $.metadataTv.data = [ sectionXmlResponse, sectionServiceIdentification, sectionServiceProvider ];
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;