var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var btnBack;

var win1 = Titanium.UI.createWindow({
    url: "/windows/OverlayDetails.js",
    title: L("OverlayDetails_win_title"),
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

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var tblLayers = Titanium.UI.createTableView({
    backgroundColor: css.bcTvColor,
    bottom: 0,
    separatorColor: css.separatorColor
});

win.add(tblLayers);

var mapLayers = [];

void 0 != Ti.App.mapLayers && (mapLayers = Ti.App.mapLayers);

var data = [];

for (var i = 0; mapLayers.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        height: css.rowHeight,
        hasChild: true,
        backgroundColor: css.bcTvRowColor,
        className: "layer-row"
    });
    var lblName = Titanium.UI.createLabel({
        text: mapLayers[i].layerId,
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        height: css.titleHeight,
        right: "10dp"
    });
    row.add(lblName);
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    data.push(row);
}

tblLayers.data = data;

tblLayers.addEventListener("click", function(e) {
    win1.mapLayerIndex = e.index;
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});