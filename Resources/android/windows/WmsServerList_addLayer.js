var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

win.title = L("WmsServerList_win_title");

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/WmsServer_addLayer.js",
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

var tblServers = Titanium.UI.createTableView({
    backgroundColor: css.bcTvColor,
    bottom: 0,
    separatorColor: css.separatorColor
});

tblServers.addEventListener("click", function(e) {
    win1.title = e.row.children[0].text;
    win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
    win1.serverIndex = e.row.children[2].text;
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});

win.add(tblServers);

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

var data = [];

for (var i = 0; addedServers.length > i; i++) if ("WMS" === addedServers[i].type) {
    var row = Titanium.UI.createTableViewRow({
        height: css.rowHeight,
        backgroundColor: css.bcTvRowColor,
        hasChild: true,
        className: addedServers[i].type + "-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: addedServers[i].name,
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        right: "10dp",
        top: 10,
        height: css.titleHeight
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: addedServers[i].url,
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
    var serverIndexRow = Titanium.UI.createLabel({
        text: i,
        visible: false
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
    row.add(serverIndexRow);
    row.add(iconImage);
    data.push(row);
}

tblServers.data = data;