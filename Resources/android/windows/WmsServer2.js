var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/LayerMetadata.js",
    title: L("LayerMetadata_win_title"),
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

for (var i = 0; layer.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: true,
        className: "layer-row"
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: layer.item(i).getElementsByTagName("Title").item(0).textContent,
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        right: "10dp"
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20,
        visible: false
    });
    row.add(descriptionRow);
    row.add(iconImage);
    sectionLayers.add(row);
}

tblWmsServer.data = [ sectionLayers ];

win.add(tblWmsServer);

tblWmsServer.addEventListener("click", function(e) {
    win1.rowID = e.index + 1;
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});