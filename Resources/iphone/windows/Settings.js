var isAndroid = false;

Ti.App.isAndroid = isAndroid;

if (!Ti.App.Properties.hasProperty("avalaibleServers")) {
    var avalaibleServers = [];
    var availableServer1 = {
        name: "EOxServer (OFC)",
        type: "WMS",
        url: "http://ows.eox.at/ofc/ows"
    };
    avalaibleServers.push(availableServer1);
    var availableServer2 = {
        name: "EOxServer (CCI)",
        type: "WCS",
        url: "http://ows.eox.at/cci/ows"
    };
    avalaibleServers.push(availableServer2);
    Ti.App.Properties.setList("avalaibleServers", avalaibleServers);
}

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win = Titanium.UI.currentWindow;

var closeBtn = Ti.UI.createButton({
    title: L("NavButton_close")
});

win.leftNavButton = closeBtn;

closeBtn.addEventListener("click", function() {
    win.padre.close();
});

var win11 = Titanium.UI.createWindow({
    url: "/windows/Overlays.js",
    title: L("Overlays_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win11.padre = win.padre;

var win12 = Titanium.UI.createWindow({
    url: "/windows/WcsCoverageList2.js",
    title: L("WcsCoverageList2_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win12.padre = win.padre;

var win13 = Titanium.UI.createWindow({
    url: "/windows/WmsServerList_addLayer.js",
    title: L("WmsServerList_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win13.padre = win.padre;

var win21 = Titanium.UI.createWindow({
    url: "/windows/ServerCapabilities.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win21.padre = win.padre;

var win22 = Titanium.UI.createWindow({
    url: "/windows/AvailableServers.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win22.padre = win.padre;

var win31 = Titanium.UI.createWindow({
    url: "/windows/WcsServerList.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win31.padre = win.padre;

var win32 = Titanium.UI.createWindow({
    url: "/windows/WmsServerList.js",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win32.padre = win.padre;

var table1 = Ti.UI.createTableView({
    top: 20,
    left: 10,
    width: pWidth - 20,
    height: pHeight - 110,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionOverlays = Ti.UI.createTableViewSection({
    headerTitle: L("settings_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    hasChild: false,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row1_title"),
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
    text: L("settings_row1_description"),
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

row.add(titleRow);

row.add(descriptionRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win11.open() : win.padre.openWindow(win11);
});

sectionOverlays.add(row);

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    hasChild: false,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row2_title"),
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
    text: L("settings_row2_description"),
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

row.add(titleRow);

row.add(descriptionRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win12.open() : win.padre.openWindow(win12);
});

sectionOverlays.add(row);

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    hasChild: false,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row3_title"),
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
    text: L("settings_row3_description"),
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

row.add(titleRow);

row.add(descriptionRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win13.open() : win.padre.openWindow(win13);
});

sectionOverlays.add(row);

var sectionServers = Ti.UI.createTableViewSection({
    headerTitle: L("settings_section2_title")
});

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row4_title"),
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
    text: L("settings_row4_description"),
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

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(titleRow);

row.add(descriptionRow);

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win21.open() : win.padre.openWindow(win21);
});

sectionServers.add(row);

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row5_title"),
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
    text: L("settings_row5_description"),
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

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(titleRow);

row.add(descriptionRow);

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win22.open() : win.padre.openWindow(win22);
});

sectionServers.add(row);

var sectionQueries = Ti.UI.createTableViewSection({
    headerTitle: L("settings_section3_title")
});

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    hasChild: false,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row6_title"),
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
    text: L("settings_row6_description"),
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

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(titleRow);

row.add(descriptionRow);

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win31.open() : win.padre.openWindow(win31);
});

sectionQueries.add(row);

var row = Titanium.UI.createTableViewRow({
    width: table1.width,
    height: 90,
    hasChild: false,
    className: "table-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("settings_row7_title"),
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
    text: L("settings_row7_description"),
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

row.add(titleRow);

row.add(descriptionRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win32.open() : win.padre.openWindow(win32);
});

sectionQueries.add(row);

table1.data = [ sectionOverlays, sectionServers, sectionQueries ];

win.add(table1);