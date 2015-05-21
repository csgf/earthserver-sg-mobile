var win = Titanium.UI.currentWindow;

win.backgroundColor = "white";

win.title = L("AvailableServers_win_title");

var btnBack = Ti.UI.createButton({
    title: L("NavButton_back")
});

win.leftNavButton = btnBack;

btnBack.addEventListener("click", function() {
    win.close();
});

var win1 = Titanium.UI.createWindow({
    url: "/windows/AddServer.js",
    title: L("AddServer_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png",
    orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/AddNewServer.js",
    title: L("AddNewServer_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png",
    orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ]
});

win2.padre = win.padre;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

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

win.add(tblServers);

var avalaibleServers = [];

Ti.App.Properties.hasProperty("avalaibleServers") && (avalaibleServers = Ti.App.Properties.getList("avalaibleServers"));

var data = [];

for (var i = 0; avalaibleServers.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblServers.width,
        height: 90,
        hasChild: false,
        className: "server-row"
    });
    var lblName = Titanium.UI.createLabel({
        text: avalaibleServers[i].name,
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
    var lblService = Titanium.UI.createLabel({
        text: avalaibleServers[i].type,
        font: {
            fontSize: 22,
            fontWeight: "normal"
        },
        color: "#2f4f4f",
        right: 10,
        top: 10,
        width: 60,
        height: 40
    });
    var lblUrl = Titanium.UI.createLabel({
        text: avalaibleServers[i].url,
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
    row.add(lblName);
    row.add(lblService);
    row.add(lblUrl);
    data.push(row);
}

var row = Titanium.UI.createTableViewRow({
    width: tblServers.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var lblName = Titanium.UI.createLabel({
    text: L("AvailableServers_last_row_title"),
    font: {
        fontFamily: "Helvetica",
        fontSize: 24,
        fontWeight: "bold"
    },
    color: "#00CD00",
    left: 10,
    top: 10,
    width: row.width - 70,
    height: 70
});

var iconImage = Titanium.UI.createImageView({
    image: "/images/addServer.png",
    width: 48,
    height: 48,
    right: 20,
    top: 20
});

row.add(iconImage);

row.add(lblName);

data.push(row);

tblServers.data = data;

tblServers.addEventListener("click", function(e) {
    if (e.index == tblServers.data[0].rowCount - 1) true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2); else {
        win1.name = e.row.children[0].text;
        win1.service = e.row.children[1].text;
        win1.urlServer = e.row.children[2].text;
        true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
    }
});