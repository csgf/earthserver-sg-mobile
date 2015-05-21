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

var boundingBoxItem = Ti.XML.Element;

boundingBoxItem = win.xmlItem;

var tblBox = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionBoundingBox = Ti.UI.createTableViewSection({
    headerTitle: L("WmsBoundingBox_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("minx"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionBoundingBox.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row2_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("miny"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionBoundingBox.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row3_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("maxx"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionBoundingBox.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row4_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("maxy"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionBoundingBox.add(row);

var sectionResolution = Ti.UI.createTableViewSection({
    headerTitle: L("WmsBoundingBox_section2_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row5_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("resx"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionResolution.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblBox.width,
    hasChild: false,
    className: "BoundingBox-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsBoundingBox_row6_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width - 20
});

var descriptionRow = Titanium.UI.createLabel({
    text: boundingBoxItem.getAttribute("resy"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionResolution.add(row);

tblBox.data = [ sectionBoundingBox, sectionResolution ];

win.add(tblBox);