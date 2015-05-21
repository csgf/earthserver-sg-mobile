function removeTable() {
    win.remove(tblCoverageEnvelope);
}

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

var xmlData = Ti.XML;

xmlData = win.xmlData;

var tblCoverageEnvelope = Titanium.UI.createTableView({
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

var str = "";

var sectionSpatialEnvelope = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageEnvelope_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row1_title"),
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
    text: xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsName"),
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

sectionSpatialEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row2_title"),
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
    text: xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsDimension"),
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

sectionSpatialEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row3_title"),
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

str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("axisLabels");

str = str.replace(" ", "\n");

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionSpatialEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row4_title"),
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

str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("uomLabels");

str = str.replace(" ", "\n");

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionSpatialEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row5_title"),
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

str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;

var numbersArray = [];

numbersArray = str.split(" ");

str = "";

for (var i = 0; numbersArray.length > i; i++) str += parseFloat(numbersArray[i]).toFixed(6) + "\n";

str = str.substr(0, str.length - 1);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionSpatialEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "spatialEnvelope-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageEnvelope_row6_title"),
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

str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;

var numbersArray = [];

numbersArray = str.split(" ");

str = "";

for (var i = 0; numbersArray.length > i; i++) str += parseFloat(numbersArray[i]).toFixed(6) + "\n";

str = str.substr(0, str.length - 1);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionSpatialEnvelope.add(row);

tblCoverageEnvelope.data = [ sectionSpatialEnvelope ];

win.add(tblCoverageEnvelope);

win.addEventListener("blur", removeTable);