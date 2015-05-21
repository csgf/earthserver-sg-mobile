var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var btnBack;

win.addEventListener("android:back", function() {
    win.close();
});

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/Overlays.js",
    modal: false,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

win1.addEventListener("open", function() {
    var actionBar;
    if (win1.activity) {
        actionBar = win1.activity.actionBar;
        if (actionBar) {
            actionBar.displayHomeAsUp = true;
            actionBar.onHomeIconItemSelected = function() {
                win1.close();
            };
        }
    } else Ti.API.error("Can't access action bar on a lightweight window.");
});

var win2 = Titanium.UI.createWindow({
    url: "/windows/WmsOtherDimensions_addLayer.js",
    modal: false,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

win2.addEventListener("open", function() {
    var actionBar;
    if (win2.activity) {
        actionBar = win2.activity.actionBar;
        if (actionBar) {
            actionBar.displayHomeAsUp = true;
            actionBar.onHomeIconItemSelected = function() {
                win2.close();
            };
        }
    } else Ti.API.error("Can't access action bar on a lightweight window.");
});

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

if (addedServers.length > 0) {
    var xmlData = Ti.XML;
    xmlData = Titanium.XML.parseString(addedServers[win.serverIndex].getCapabilities);
    var str = "";
    var layer = Ti.XML.Element;
    layer = xmlData.documentElement.getElementsByTagName("Layer").item(win.layerIndex);
    var btnSend = Titanium.UI.createButton({
        title: L("WmsGetMap_button_title"),
        font: {
            fontSize: 18,
            fontFamily: "Helvetica Neue",
            fontWeight: "bold"
        },
        top: 5,
        right: 10,
        height: 40
    });
    var tblGetMap = Titanium.UI.createTableView({
        top: "50dp",
        minRowHeight: css.rowHeight,
        backgroundColor: css.bcTvColor,
        bottom: 0,
        separatorColor: css.separatorColor
    });
    var sectionBoundingBox = Ti.UI.createTableViewSection({
        headerTitle: L("WmsGetMap_section1_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "BoundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row1_title"),
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
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    str = "";
    null != layer.getElementsByTagName("CRS").item(0) && layer.getElementsByTagName("CRS").length > 0 && (str = layer.getElementsByTagName("CRS").item(0).textContent);
    descriptionRow.text = str;
    row.add(titleRow);
    row.add(descriptionRow);
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "BoundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row2_title"),
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
        text: layer.getElementsByTagName("southBoundLatitude").item(0).textContent,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "BoundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row3_title"),
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
        text: layer.getElementsByTagName("westBoundLongitude").item(0).textContent,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "BoundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row4_title"),
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
        text: layer.getElementsByTagName("northBoundLatitude").item(0).textContent,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "BoundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row5_title"),
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
        text: layer.getElementsByTagName("eastBoundLongitude").item(0).textContent,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionBoundingBox.add(row);
    var sectionOtherDimensions = Ti.UI.createTableViewSection({
        headerTitle: L("WmsGetMap_section2_title")
    });
    for (var i = 0; layer.getElementsByTagName("Dimension").length > i; i++) {
        var row = Titanium.UI.createTableViewRow({
            backgroundColor: css.bcTvRowColor,
            height: css.rowHeight,
            hasChild: true,
            className: "Dimensions-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: layer.getElementsByTagName("Dimension").item(i).getAttribute("name"),
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
            text: "",
            font: {
                fontSize: css.descriptionFontSize,
                fontWeight: "normal"
            },
            color: css.descriptionColor,
            left: 10,
            right: "10dp",
            bottom: "5dp",
            height: css.descriptionHeight
        });
        row.dimensionItem = i;
        row.add(titleRow);
        row.add(descriptionRow);
        var iconImage = Titanium.UI.createImageView({
            image: "/images/next.png",
            width: 48,
            height: 48,
            right: 10,
            top: 20,
            visible: false
        });
        row.add(iconImage);
        sectionOtherDimensions.add(row);
    }
    var sectionImageSettings = Ti.UI.createTableViewSection({
        headerTitle: L("WmsGetMap_section3_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: 70,
        hasChild: false,
        className: "imageSettings-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row6_title"),
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
    var txtWidth = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        hintText: L("WmsGetMap_row6_hintText")
    });
    row.add(titleRow);
    row.add(txtWidth);
    sectionImageSettings.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: 70,
        hasChild: false,
        className: "imageSettings-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsGetMap_row7_title"),
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
    var txtHeight = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        hintText: L("WmsGetMap_row7_hintText")
    });
    row.add(titleRow);
    row.add(txtHeight);
    sectionImageSettings.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: true,
        className: "imageSettings-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: "Background color",
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
        text: "Transparent",
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20,
        visible: false
    });
    row.add(titleRow);
    row.add(descriptionRow);
    row.add(iconImage);
    sectionImageSettings.add(row);
    tblGetMap.data = [ sectionBoundingBox, sectionOtherDimensions, sectionImageSettings ];
    tblGetMap.addEventListener("click", function(e) {
        if (e.index > tblGetMap.data[0].rowCount - 1 && e.index <= tblGetMap.data[0].rowCount + tblGetMap.data[1].rowCount - 1 && null != e.row.dimensionItem) {
            win2.xmlItem = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem);
            win2.title = layer.getElementsByTagName("Dimension").item(e.row.dimensionItem).getAttribute("name");
            win2.selectedRow = e.row;
            true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
        } else if (e.index >= tblGetMap.data[0].rowCount + tblGetMap.data[1].rowCount) {
            var selectedRow = e.row;
            var win3 = new (require("/windows/WmsBackground_addLayer"))();
            win3.addEventListener("updateBgColorRow", function(e) {
                Ti.API.info("updateBgColorRow " + e.BgColorText);
                selectedRow.children[1].text = e.BgColorText;
                win3.removeEventListener("updateBgColorRow", arguments.callee);
            });
            true == Ti.App.isAndroid ? win3.open() : win.padre.openWindow(win3);
        }
    });
    win.add(btnSend);
    win.add(tblGetMap);
    btnSend.addEventListener("click", function() {
        if (0 >= txtWidth.value || 0 >= txtHeight.value) alert(L("WmsGetMap_ErrorMessage")); else {
            var indicatorStyle;
            indicatorStyle = Ti.UI.ActivityIndicatorStyle.DARK;
            var actInd = Ti.UI.createActivityIndicator({
                color: "black",
                font: {
                    fontFamily: "Helvetica Neue",
                    fontSize: 26,
                    fontWeight: "bold"
                },
                message: "Loading data...",
                style: indicatorStyle,
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE
            });
            win.add(actInd);
            actInd.show();
            win.add(actInd);
            actInd.show();
            var layerId = layer.getElementsByTagName("Title").item(0).textContent;
            var layerCrs = tblGetMap.data[0].rows[0].children[1].text;
            var minLat = tblGetMap.data[0].rows[1].children[1].text;
            var minLon = tblGetMap.data[0].rows[2].children[1].text;
            var maxLat = tblGetMap.data[0].rows[3].children[1].text;
            var maxLon = tblGetMap.data[0].rows[4].children[1].text;
            var layerTime = "";
            for (var i = 0; tblGetMap.data[1].rowCount > i; i++) "time" == tblGetMap.data[1].rows[i].children[0].text && (layerTime = tblGetMap.data[1].rows[i].children[1].text);
            var bgColor = tblGetMap.data[2].rows[2].children[1].text;
            var boolTransparent = "false";
            "Transparent" == bgColor && (boolTransparent = "true");
            var strRequest = "";
            strRequest = addedServers[win.serverIndex].url;
            strRequest += "?SERVICE=wms&VERSION=1.3.0";
            strRequest += "&REQUEST=GetMap";
            strRequest += "&LAYERS=" + layerId;
            strRequest += "&CRS=" + layerCrs;
            strRequest += "&BBOX=" + minLat + "," + minLon + "," + maxLat + "," + maxLon;
            strRequest += "&WIDTH=" + txtWidth.value;
            strRequest += "&HEIGHT=" + txtHeight.value;
            strRequest += "&FORMAT=image/png";
            strRequest += "&TRANSPARENT=" + boolTransparent;
            "Transparent" != bgColor && (strRequest += "&BGCOLOR=" + bgColor);
            "" != layerTime && (strRequest += "&TIME=" + layerTime);
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onload = function() {
                var strImageData = Ti.Utils.base64encode(this.responseData);
                actInd.setMessage(L("WmsGetMap_message"));
                var mapLayers = [];
                void 0 != Ti.App.mapLayers && (mapLayers = Ti.App.mapLayers);
                var newLayer = {
                    layerId: layerId,
                    serverName: addedServers[win.serverIndex].name,
                    serverUrl: addedServers[win.serverIndex].url,
                    visible: true,
                    opacity: 1,
                    crs: layerCrs,
                    minLat: minLat,
                    minLon: minLon,
                    maxLat: maxLat,
                    maxLon: maxLon,
                    strImage: strImageData,
                    imgWidth: txtWidth.value,
                    imgHeight: txtHeight.value,
                    time: layerTime,
                    bands: [],
                    backgroundColor: bgColor,
                    serverIndex: win.serverIndex,
                    layerIndex: win.layerIndex
                };
                mapLayers.push(newLayer);
                Ti.App.mapLayers = mapLayers;
                actInd.hide();
                true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
            };
            xhr.onerror = function() {
                Ti.API.error("ERROR: " + this.status + " - " + this.statusText);
                alert("ERROR\n\n" + this.status + " - " + this.statusText);
            };
            xhr.open("GET", strRequest);
            xhr.send();
        }
    });
}

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