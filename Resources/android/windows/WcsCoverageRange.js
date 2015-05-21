function removeTable() {
    win.remove(tblCoverageRange);
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

var rangeType = Ti.XML.Element;

rangeType = win.xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);

var tblCoverageRange = Titanium.UI.createTableView({
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

var sectionBands = Ti.UI.createTableViewSection({
    headerTitle: L("WcsCoverageRange_section1_title")
});

if (null != rangeType.getElementsByTagName("swe:field")) for (var i = 0; rangeType.getElementsByTagName("swe:field").length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "bands-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: String.format(L("WcsCoverageRange_row1_title"), i.toString()),
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
        text: rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
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
    sectionBands.add(row);
}

tblCoverageRange.data = [ sectionBands ];

win.add(tblCoverageRange);

win.addEventListener("blur", removeTable);