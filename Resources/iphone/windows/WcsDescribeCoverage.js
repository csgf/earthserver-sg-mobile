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

alert(L("WcsDescribeCoverage_message"));

var xmlData = Ti.XML;

xmlData = Titanium.XML.parseString(win.xmlText);

var win1 = Titanium.UI.createWindow({
    url: "/windows/WcsCoverageEnvelope.js",
    title: "Envelope",
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/WcsCoverageDomain.js",
    title: L("WcsCoverageDomain_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var win3 = Titanium.UI.createWindow({
    url: "/windows/WcsCoverageRange.js",
    title: L("WcsCoverageRange_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win3.padre = win.padre;

win1.xmlData = xmlData;

win2.xmlData = xmlData;

win3.xmlData = xmlData;

var tblCoverageInfo = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2,
    minRowHeight: 90
});

var sectionCoverageId = Ti.UI.createTableViewSection({
    headerTitle: L("WcsDescribeCoverage_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "coverageId-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsDescribeCoverage_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    width: "auto",
    height: 30
});

var descriptionRow = Titanium.UI.createLabel({
    text: xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: "auto",
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoverageId.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "coverageId-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsDescribeCoverage_row2_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    width: "auto",
    height: 30
});

var descriptionRow = Titanium.UI.createLabel({
    text: xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: "auto",
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionCoverageId.add(row);

var sectionEnvelope = Ti.UI.createTableViewSection({
    headerTitle: L("WcsDescribeCoverage_section2_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "Envelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsDescribeCoverage_row3_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 25,
    width: "auto",
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

row.add(iconImage);

sectionEnvelope.add(row);

var sectionDomain = Ti.UI.createTableViewSection({
    headerTitle: L("WcsDescribeCoverage_section3_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "Domain-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsDescribeCoverage_row4_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 25,
    width: "auto",
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

row.add(iconImage);

sectionDomain.add(row);

var sectionRange = Ti.UI.createTableViewSection({
    headerTitle: L("WcsDescribeCoverage_section4_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "Range-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsDescribeCoverage_row5_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 25,
    width: "auto",
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

row.add(iconImage);

sectionRange.add(row);

tblCoverageInfo.data = [ sectionCoverageId, sectionEnvelope, sectionDomain, sectionRange ];

win.add(tblCoverageInfo);

tblCoverageInfo.addEventListener("click", function(e) {
    2 == e.index ? true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1) : 3 == e.index ? true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2) : 4 == e.index && (true == Ti.App.isAndroid ? win3.open() : win.padre.openWindow(win3));
});