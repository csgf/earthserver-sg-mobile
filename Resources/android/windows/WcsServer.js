Titanium.UI.setBackgroundColor("#000");

Titanium.UI.setBackgroundImage("/images/bgImage.png");

var win = Titanium.UI.currentWindow;

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
    url: "/windows/WcsMetadata.js",
    title: L("WcsMetadata_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/CoverageInfo.js",
    title: L("CoverageInfo_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var tblWcsServer = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionMetadata = Ti.UI.createTableViewSection({
    headerTitle: L("WcsServer_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    height: 90,
    hasChild: false,
    className: "metadata-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsServer_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 35,
    width: row.width,
    height: "auto"
});

row.add(titleRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

sectionMetadata.add(row);

var sectionCoverages = Ti.UI.createTableViewSection({
    headerTitle: L("WcsServer_section2_title")
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

win2.xml = xmlData;

wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("wcs:CoverageSummary");

for (var i = 0; wcsCoverageSummary.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblWcsServer.width,
        height: 90,
        hasChild: false,
        className: "coverage-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageId").item(0).textContent,
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width - 60
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: wcsCoverageSummary.item(i).getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
        font: {
            fontSize: 20,
            fontWeight: "normal"
        },
        color: "#fff",
        left: 10,
        top: 35,
        height: 55,
        width: row.width - 60
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
    sectionCoverages.add(row);
}

tblWcsServer.data = [ sectionMetadata, sectionCoverages ];

win.add(tblWcsServer);

tblWcsServer.addEventListener("click", function(e) {
    if (0 == e.index) true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1); else {
        win2.rowID = e.index - 1;
        true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
    }
});