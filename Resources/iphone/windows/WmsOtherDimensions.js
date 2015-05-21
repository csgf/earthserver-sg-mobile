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

var dimensionItem = Ti.XML.Element;

dimensionItem = win.xmlItem;

var str = "";

var tblDimension = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionDimensionAttribute = Ti.UI.createTableViewSection({
    headerTitle: L("WmsOtherDimensions_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row1_title"),
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
    text: dimensionItem.getAttribute("name"),
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row2_title"),
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
    text: dimensionItem.getAttribute("units"),
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row3_title"),
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
    text: dimensionItem.getAttribute("unitSymbol"),
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row4_title"),
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
    text: dimensionItem.getAttribute("default"),
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row5_title"),
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

str = L("string_no");

"1" === dimensionItem.getAttribute("multipleValues") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row6_title"),
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

str = L("string_no");

"1" === dimensionItem.getAttribute("nearestValue") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionDimensionAttribute.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblDimension.width,
    hasChild: false,
    className: "DimensionAttribute-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsOtherDimensions_row7_title"),
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

str = L("string_no");

"1" === dimensionItem.getAttribute("current") && (str = L("string_yes"));

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionDimensionAttribute.add(row);

var sectionValues = Ti.UI.createTableViewSection({
    headerTitle: L("WmsOtherDimensions_section2_title")
});

var values = dimensionItem.textContent.split(",");

for (var i = 0; values.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblDimension.width,
        hasChild: false,
        className: "Values-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: String.format(L("WmsOtherDimensions_row_title"), i.toString()),
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
        text: values[i],
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
    sectionValues.add(row);
}

var sectionRanges = Ti.UI.createTableViewSection({
    headerTitle: L("WmsOtherDimensions_section3_title")
});

tblDimension.data = [ sectionDimensionAttribute, sectionValues, sectionRanges ];

win.add(tblDimension);