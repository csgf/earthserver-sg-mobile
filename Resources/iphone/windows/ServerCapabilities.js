Titanium.UI.setBackgroundColor("#000");

Titanium.UI.setBackgroundImage("/images/bgImage.png");

var win = Titanium.UI.currentWindow;

win.title = L("ServerCapabilities_win_title");

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
    url: "/windows/WcsServer.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/WmsServer.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var btnDeleteAllAddedServers = Titanium.UI.createButton({
    title: L("ServerCapabilities_button_title"),
    font: {
        fontSize: 18,
        fontFamily: "Helvetica Neue",
        fontWeight: "bold"
    },
    top: 10,
    right: 10,
    width: 200,
    height: 60,
    backgroundImage: "/images/button.png"
});

win.add(btnDeleteAllAddedServers);

btnDeleteAllAddedServers.addEventListener("touchstart", function() {
    btnDeleteAllAddedServers.backgroundImage = "/images/button_focused.png";
});

btnDeleteAllAddedServers.addEventListener("touchend", function() {
    btnDeleteAllAddedServers.backgroundImage = "/images/button.png";
    if (Ti.App.Properties.hasProperty("addedServers")) {
        Ti.App.Properties.removeProperty("addedServers");
        alert(L("ServerCapabilities_message"));
    }
    win.close();
});

var tblCapabilities = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 170,
    top: 70,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

tblCapabilities.addEventListener("click", function(e) {
    Ti.API.info("ServerCapabilities - e.index: " + e.index);
    if ("WCS" === addedServers[e.row.children[2].text].type) {
        win1.title = e.row.children[0].text;
        win1.xmlText = addedServers[e.row.children[2].text].getCapabilities;
        true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
    } else {
        win2.title = e.row.children[0].text;
        win2.xmlText = addedServers[e.row.children[2].text].getCapabilities;
        true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
    }
});

win.add(tblCapabilities);

var sectionWCS = Ti.UI.createTableViewSection({
    headerTitle: L("ServerCapabilities_section1_title")
});

var sectionWMS = Ti.UI.createTableViewSection({
    headerTitle: L("ServerCapabilities_section2_title")
});

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

for (var i = 0; addedServers.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblCapabilities.width,
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
    "WCS" === addedServers[i].type ? sectionWCS.add(row) : sectionWMS.add(row);
}

tblCapabilities.data = [ sectionWCS, sectionWMS ];