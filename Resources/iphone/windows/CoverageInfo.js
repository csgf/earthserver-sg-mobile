function removeTable() {
    win.remove(tblCoverageInfo);
}

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

var xml = Ti.XML;

xml = win.xml;

var sectionCoverageId = Ti.UI.createTableViewSection({
    headerTitle: L("CoverageInfo_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "coverageId-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("CoverageInfo_row1_title"),
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
    text: win.xml.documentElement.getElementsByTagName("wcs:CoverageSummary").item(win.rowID).getElementsByTagName("wcs:CoverageId").item(0).textContent,
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
    text: L("CoverageInfo_row2_title"),
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
    text: win.xml.documentElement.getElementsByTagName("wcs:CoverageSummary").item(win.rowID).getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
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

var sectionBoundingBox = Ti.UI.createTableViewSection({
    headerTitle: L("CoverageInfo_section2_title")
});

var tblCoverageInfo = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2,
    data: [ sectionCoverageId, sectionBoundingBox ]
});

win.add(tblCoverageInfo);

win.addEventListener("blur", removeTable);