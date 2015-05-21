var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/WmsGetMap.js",
    title: L("WmsGetMap_win_title"),
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

var tblWmsServer = Titanium.UI.createTableView({
    minRowHeight: css.rowHeight,
    backgroundColor: css.bcTvColor,
    bottom: 0,
    separatorColor: css.separatorColor
});

var sectionLayers = Ti.UI.createTableViewSection({
    headerTitle: L("WmsServer_section2_title")
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

layer = xmlData.documentElement.getElementsByTagName("Layer");

var row = Titanium.UI.createTableViewRow({
    backgroundColor: css.bcTvRowColor,
    height: css.rowHeight,
    hasChild: false,
    className: "layer-row"
});

var descriptionRow = Titanium.UI.createLabel({
    text: layer.item(0).getElementsByTagName("Title").item(0).textContent,
    font: {
        fontSize: css.titleFontSize,
        fontWeight: "bold"
    },
    color: css.titleColor,
    left: 10,
    right: "10dp"
});

var layerIndexRow = Titanium.UI.createLabel({
    text: 0,
    visible: false
});

row.add(descriptionRow);

row.add(layerIndexRow);

sectionLayers.add(row);

for (var i = 1; layer.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: Ti.UI.SIZE,
        hasChild: true,
        className: "layer-row"
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: layer.item(i).getElementsByTagName("Title").item(0).textContent,
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        right: "10dp",
        height: Ti.UI.SIZE
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20,
        visible: false
    });
    var layerIndexRow = Titanium.UI.createLabel({
        text: i,
        visible: false
    });
    row.add(descriptionRow);
    row.add(iconImage);
    row.add(layerIndexRow);
    sectionLayers.add(row);
}

tblWmsServer.data = [ sectionLayers ];

win.add(tblWmsServer);

tblWmsServer.addEventListener("click", function(e) {
    if (e.index > 0) {
        win1.rowID = e.index;
        win1.serverIndex = win.serverIndex;
        win1.layerIndex = e.row.children[2].text;
        true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
    }
});