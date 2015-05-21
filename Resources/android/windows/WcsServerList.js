Titanium.UI.setBackgroundColor("#000");

Titanium.UI.setBackgroundImage("/images/bgImage.png");

var win = Titanium.UI.currentWindow;

win.title = L("WcsServerList_win_title");

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
    url: "/windows/WcsCoverageList.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var tblServers = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
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

for (var i = 0; addedServers.length > i; i++) if ("WCS" === addedServers[i].type) {
    var row = Titanium.UI.createTableViewRow({
        width: tblServers.width,
        height: 90,
        className: addedServers[i].type + "-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: addedServers[i].name,
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 10,
        height: 40,
        width: row.width - 70
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: addedServers[i].url,
        font: {
            fontSize: 20,
            fontWeight: "normal"
        },
        color: "#fff",
        left: 10,
        top: 50,
        width: row.width,
        height: 30
    });
    var serverNumber = Titanium.UI.createLabel({
        text: i,
        font: {
            fontSize: 12,
            fontWeight: "normal"
        },
        color: "#fff",
        left: 10,
        top: 50,
        width: 20,
        height: 20,
        visible: false
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    row.add(titleRow);
    row.add(descriptionRow);
    row.add(serverNumber);
    row.add(iconImage);
    data.push(row);
}

tblServers.data = data;