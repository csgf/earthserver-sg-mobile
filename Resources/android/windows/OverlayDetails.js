var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

win.title = L("OverlayDetails_win_title");

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/app.js",
    title: "Map",
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

var mapLayers = [];

void 0 != Ti.App.mapLayers && (mapLayers = Ti.App.mapLayers);

if (mapLayers.length > win.mapLayerIndex) {
    var mapLayer = mapLayers[win.mapLayerIndex];
    var layerImage = Ti.Utils.base64decode(mapLayer.strImage);
    var tblOverlayDetails = Titanium.UI.createTableView({
        minRowHeight: css.rowHeight,
        backgroundColor: css.bcTvColor,
        bottom: 0,
        separatorColor: css.separatorColor
    });
    var sectionLayerImage = Ti.UI.createTableViewSection({
        headerTitle: L("OverlayDetails_section1_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "layerImage-row"
    });
    var imgViewLayer;
    var imgViewLayer = Titanium.UI.createImageView({
        width: "100%",
        opacity: 1
    });
    imgViewLayer.image = layerImage;
    row.add(imgViewLayer);
    sectionLayerImage.add(row);
    var sectionImageSettings = Ti.UI.createTableViewSection({
        headerTitle: L("OverlayDetails_section2_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        height: css.rowHeight,
        className: "imageSettings-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_label1"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        right: "10dp",
        height: css.titleHeight
    });
    row.add(titleRow);
    var basicSwitch = Ti.UI.createSwitch({
        titleOn: "ON",
        titleOff: "OFF",
        value: true,
        right: 10
    });
    basicSwitch.addEventListener("change", function() {
        Ti.API.info("Switch value: " + basicSwitch.value);
        opacitySlider.visible = true == basicSwitch.value ? true : false;
    });
    row.add(basicSwitch);
    sectionImageSettings.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        height: css.rowHeight,
        className: "imageSettings-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_label2"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    row.add(titleRow);
    var opacitySlider = Titanium.UI.createSlider({
        bottom: 5,
        left: 10,
        right: 10,
        min: 0,
        max: 100,
        value: 100
    });
    opacitySlider.addEventListener("change", function(e) {
        imgViewLayer.opacity = e.value / 100;
    });
    row.add(opacitySlider);
    sectionImageSettings.add(row);
    var sectionCoverageInfo = Ti.UI.createTableViewSection({
        headerTitle: L("OverlayDetails_section3_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "coverageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row1_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.layerId,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionCoverageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "coverageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row2_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.serverName,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionCoverageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "coverageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row3_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.serverUrl,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionCoverageInfo.add(row);
    var sectionImageInfo = Ti.UI.createTableViewSection({
        headerTitle: L("OverlayDetails_section4_title")
    });
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row4_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.crs,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row5_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.minLat,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row6_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.minLon,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row7_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.maxLat,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row8_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.maxLon,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row9_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.imgWidth,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row10_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: mapLayer.imgHeight,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        hasChild: false,
        className: "imageInfo-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("OverlayDetails_row11_title"),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        right: "10dp",
        height: css.titleHeight
    });
    var str = "";
    for (var i = 0; mapLayer.bands.length > i; i++) str += mapLayer.bands[i] + "\n";
    str = str.substr(0, str.length - 1);
    var descriptionRow = Titanium.UI.createLabel({
        text: str,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        botto: "5dp",
        height: Ti.UI.SIZE
    });
    row.add(titleRow);
    row.add(descriptionRow);
    sectionImageInfo.add(row);
    tblOverlayDetails.data = [ sectionLayerImage, sectionImageSettings, sectionCoverageInfo, sectionImageInfo ];
    win.add(tblOverlayDetails);
}