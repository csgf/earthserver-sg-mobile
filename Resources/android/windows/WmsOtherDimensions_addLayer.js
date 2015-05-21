function updateDimensionRow() {
    var isCheched = false;
    var updatedRow = win.selectedRow;
    for (var i = 0; tblDimension.data[0].rowCount > i; i++) if (true == tblDimension.data[0].rows[i].children[2].visible) {
        updatedRow.children[1].text = tblDimension.data[0].rows[i].children[1].text;
        isCheched = true;
    }
    false == isCheched && (updatedRow.children[1].text = "");
}

var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var lastSelectedRow = "";

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var dimensionItem = Ti.XML.Element;

dimensionItem = win.xmlItem;

var str = "";

var tblDimension = Titanium.UI.createTableView({
    backgroundColor: css.bcTvColor,
    bottom: 0,
    separatorColor: css.separatorColor
});

var sectionValues = Ti.UI.createTableViewSection({
    headerTitle: L("WmsOtherDimensions_section2_title")
});

var values = dimensionItem.textContent.split(",");

for (var i = 0; values.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: false,
        className: "Values-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: String.format(L("WmsOtherDimensions_row_title"), i.toString()),
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: css.titleColor,
        left: 10,
        top: 5,
        height: css.titleHeight,
        right: "10dp"
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: values[i],
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        top: "25dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    row.add(titleRow);
    row.add(descriptionRow);
    var iconImage = Titanium.UI.createImageView({
        image: "/images/check.png",
        width: 48,
        height: 48,
        right: 10,
        visible: false
    });
    row.add(iconImage);
    sectionValues.add(row);
}

tblDimension.addEventListener("click", function(e) {
    if ("" == lastSelectedRow) lastSelectedRow = e.row; else if (lastSelectedRow.children[0].text != e.row.children[0].text) {
        lastSelectedRow.children[2].visible = false;
        lastSelectedRow = e.row;
    }
    e.row.children[2].visible = !e.row.children[2].visible;
});

tblDimension.data = [ sectionValues ];

win.add(tblDimension);

win.addEventListener("blur", updateDimensionRow);