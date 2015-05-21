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
    url: "/windows/WcsCoverageMetadata.js",
    title: L("WcsCoverageMetadata_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var tblCoverageList = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionCoverages = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageList_section1_title")
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

win1.serverIndex = win.serverIndex;

win1.ServiceTypeVersion = xmlData.documentElement.getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent;

wcsCoverageSummary = xmlData.documentElement.getElementsByTagName("wcs:CoverageSummary");

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

if (null == addedServers[win.serverIndex].describeCoverageArray) {
    var covArray = [];
    for (var i = 0; wcsCoverageSummary.length > i; i++) covArray.push(null);
    addedServers[win.serverIndex].describeCoverageArray = covArray;
    Ti.App.Properties.setList("addedServers", addedServers);
}

for (var i = 0; wcsCoverageSummary.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblCoverageList.width,
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
    sectionCoverages.add(row);
}

tblCoverageList.data = [ sectionCoverages ];

win.add(tblCoverageList);

tblCoverageList.addEventListener("click", function(e) {
    win1.rowID = e.index;
    win1.coverageId = e.row.children[0].text;
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});