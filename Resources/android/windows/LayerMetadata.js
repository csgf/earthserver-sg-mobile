var win = Titanium.UI.currentWindow;

var btnBack = Ti.UI.createButton({
    title: L("NavButton_back")
});

win.leftNavButton = btnBack;

btnBack.addEventListener("click", function() {
    win.close();
});

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/WmsBoundingBox.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/WmsOtherDimensions.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var win3 = Titanium.UI.createWindow({
    url: "/windows/WmsStyle.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win3.padre = win.padre;

var str = "";

var layer = Ti.XML.Element;

layer = win.xml.documentElement.getElementsByTagName("Layer").item(win.rowID - 1);

var tblLayer = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    minRowHeight: 90,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionLayerAttributes = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = L("string_no");

"1" === layer.getAttribute("queryable") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row2_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = L("string_no");

"1" === layer.getAttribute("opaque") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row3_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = L("string_no");

"1" === layer.getAttribute("noSubsets") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row4_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = L("string_no");

"1" === layer.getAttribute("cascade") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row5_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getAttribute("fixedWidth"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerAttributes-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row6_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getAttribute("fixedHeigth"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerAttributes.add(row);

var sectionLayerInfo = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section2_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row7_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("Name").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row8_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("Title").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row9_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = "";

null != layer.getElementsByTagName("Abstract").item(0) && (str = layer.getElementsByTagName("Abstract").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row10_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

str = "";

if (null != layer.getElementsByTagName("KeywordList").item(0)) for (var i = 0; layer.getElementsByTagName("KeywordList").item(0).getElementsByTagName("Keyword").length > i; i++) str += layer.getElementsByTagName("KeywordList").item(0).getElementsByTagName("Keyword").item(i).textContent + "\n";

str = str.substr(0, str.length - 1);

descriptionRow.text = str;

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row11_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

str = "";

if (null != layer.getElementsByTagName("CRS").item(0)) for (var i = 0; layer.getElementsByTagName("CRS").length > i; i++) str += layer.getElementsByTagName("CRS").item(i).textContent + "\n";

descriptionRow.text = str;

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row12_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = "";

null != layer.getElementsByTagName("MinScaleDenominator").item(0) && (str = layer.getElementsByTagName("MinScaleDenominator").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "LayerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row13_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

str = "";

null != layer.getElementsByTagName("MaxScaleDenominator").item(0) && (str = layer.getElementsByTagName("MaxScaleDenominator").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionLayerInfo.add(row);

var sectionCoveredArea = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section3_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "CoveredArea-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row14_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("westBoundLongitude").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoveredArea.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "CoveredArea-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row15_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("eastBoundLongitude").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoveredArea.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "CoveredArea-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row16_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("southBoundLatitude").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoveredArea.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblLayer.width,
    hasChild: false,
    className: "CoveredArea-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("LayerMetadata_row17_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.getElementsByTagName("northBoundLatitude").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoveredArea.add(row);

var sectionGeographicDimensions = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section4_title")
});

for (var i = 0; layer.getElementsByTagName("BoundingBox").length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblLayer.width,
        hasChild: false,
        className: "GeographicDimensions-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: layer.getElementsByTagName("BoundingBox").item(i).getAttribute("CRS"),
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width - 20
    });
    row.boundingBoxItem = i;
    row.add(titleRow);
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    row.add(iconImage);
    sectionGeographicDimensions.add(row);
}

var sectionOtherDimensions = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section5_title")
});

for (var i = 0; layer.getElementsByTagName("Dimension").length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblLayer.width,
        hasChild: false,
        className: "Dimensions-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: layer.getElementsByTagName("Dimension").item(i).getAttribute("name"),
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width - 20
    });
    row.dimensionItem = i;
    row.add(titleRow);
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    row.add(iconImage);
    sectionOtherDimensions.add(row);
}

var sectionStyles = Ti.UI.createTableViewSection({
    headerTitle: L("LayerMetadata_section6_title")
});

for (var i = 0; layer.getElementsByTagName("Style").length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblLayer.width,
        hasChild: false,
        className: "Dimensions-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: layer.getElementsByTagName("Style").item(i).getAttribute("name"),
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width - 20
    });
    row.styleItem = i;
    row.add(titleRow);
    sectionStyles.add(row);
}

tblLayer.addEventListener("click", function(e) {
    if (null != e.row.boundingBoxItem) {
        win1.xmlItem = layer.getElementsByTagName("BoundingBox").item(e.row.boundingBoxItem);
        win1.title = layer.getElementsByTagName("BoundingBox").item(e.row.boundingBoxItem).getAttribute("CRS");
        true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
    } else if (null != e.row.dimensionItem) {
        win2.xmlItem = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem);
        win2.title = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem).getAttribute("name");
        true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
    } else if (null != e.row.styleItem) {
        win3.xmlItem = layer.getElementsByTagName("Style").item(e.row.styleItem);
        win3.title = layer.getElementsByTagName("Style").item(e.row.styleItem).getElementsByTagName("Name").item(0).textContent;
        true == Ti.App.isAndroid ? win3.open() : win.padre.openWindow(win3);
    }
});

tblLayer.data = [ sectionLayerAttributes, sectionLayerInfo, sectionCoveredArea, sectionGeographicDimensions, sectionOtherDimensions, sectionStyles ];

win.add(tblLayer);

var layersLen = function() {
    var parentLayer = Ti.XML.Element;
    parentLayer = win.xml.documentElement.getElementsByTagName("Layer").item(0);
    var numCrsParentLayerTot = parentLayer.getElementsByTagName("CRS").length;
    var numCrsChildrenLayer = 0;
    for (var i = 1; win.xml.documentElement.getElementsByTagName("Layer").length > i; i++) numCrsChildrenLayer += win.xml.documentElement.getElementsByTagName("Layer").item(i).getElementsByTagName("CRS").length;
    var numCrsParentLayer = numCrsParentLayerTot - numCrsChildrenLayer;
    Titanium.API.info("LayerMetadata - DENTRO layersLen - numCrsParentLayer: " + numCrsParentLayer);
    alert(numCrsParentLayer);
};