function removeTable() {
    win.remove(tblCoverageDomain);
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

var domainSet = Ti.XML.Element;

domainSet = win.xmlData.documentElement.getElementsByTagName("gml:domainSet").item(0);

var tblCoverageDomain = Titanium.UI.createTableView({
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

var sectionGridEnvelope = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageDomain_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row1_title"),
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
    text: domainSet.getElementsByTagName("gml:RectifiedGrid").item(0).getAttribute("dimension"),
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

sectionGridEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row2_title"),
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

str = domainSet.getElementsByTagName("gml:axisLabels").item(0).textContent;

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

sectionGridEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row3_title"),
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

str = domainSet.getElementsByTagName("gml:low").item(0).textContent;

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

sectionGridEnvelope.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row4_title"),
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

str = domainSet.getElementsByTagName("gml:high").item(0).textContent;

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

sectionGridEnvelope.add(row);

var sectionOffsets = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageDomain_section2_title")
});

var offsets = Ti.XML.Node;

offsets = domainSet.getElementsByTagName("gml:offsetVector");

if (null != offsets) {
    Ti.API.info("WcsCoverageDomain.js - offsets.length: " + offsets.length);
    for (var i = 0; offsets.length > i; i++) {
        var row = Titanium.UI.createTableViewRow({
            hasChild: false,
            className: "domainSet-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: L("WcsCoverageDomain_row5_title"),
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
            text: offsets.item(i).getAttribute("srsName"),
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
        sectionOffsets.add(row);
        var row = Titanium.UI.createTableViewRow({
            hasChild: false,
            className: "domainSet-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: L("WcsCoverageDomain_row6_title"),
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
        str = offsets.item(i).textContent;
        var numbersArray = [];
        numbersArray = str.split(" ");
        str = "";
        for (var j = 0; numbersArray.length > j; j++) str += parseFloat(numbersArray[j]).toFixed(6) + "\n";
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
        sectionOffsets.add(row);
    }
}

var sectionOrigin = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageDomain_section3_title")
});

var origin = Ti.XML.Element;

origin = domainSet.getElementsByTagName("gml:origin").item(0);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row7_title"),
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
    text: origin.getElementsByTagName("gml:Point").item(0).getAttribute("srsName"),
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

sectionOrigin.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "domainSet-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageDomain_row8_title"),
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

str = origin.getElementsByTagName("gml:Point").item(0).getElementsByTagName("gml:pos").item(0).textContent;

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

sectionOrigin.add(row);

tblCoverageDomain.data = [ sectionGridEnvelope, sectionOffsets, sectionOrigin ];

win.add(tblCoverageDomain);

win.addEventListener("blur", removeTable);