function updateOtherRow() {
    var rgbValue = "";
    var updatedRow = win.selectedRow;
    if (0 > txtR.value || 0 > txtG.value || 0 > txtB.value || txtR.value > 255 || txtG.value > 255 || txtB.value > 255) alert(L("WmsRgbOther_ErrorMessage")); else {
        var r = parseInt(txtR.value);
        var stringHexR = r.toString(16);
        var g = parseInt(txtG.value);
        var stringHexG = g.toString(16);
        var b = parseInt(txtB.value);
        var stringHexB = b.toString(16);
        rgbValue = "0x" + stringHexR.toUpperCase() + stringHexG.toUpperCase() + stringHexB.toUpperCase();
        updatedRow.children[1].text = rgbValue;
    }
}

var css = Ti.API.WxsCss;

var win = Titanium.UI.currentWindow;

var btnBack;

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var tblRGB = Titanium.UI.createTableView({
    minRowHeight: css.rowHeight,
    backgroundColor: css.bcTvColor,
    bottom: 0,
    separatorColor: css.separatorColor
});

var sectionRGB = Ti.UI.createTableViewSection({
    headerTitle: L("WmsRgbOther_section1")
});

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "rgb-row",
    height: css.rowHeight,
    backgroundColor: css.bcTvRowColor
});

var titleRow = Titanium.UI.createLabel({
    text: "R:",
    font: {
        fontSize: css.titleFontSize,
        fontWeight: "bold"
    },
    color: css.titleColor,
    left: 10,
    right: "10dp",
    height: css.titleHeight
});

var txtR = Ti.UI.createTextField({
    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
    font: {
        fontSize: css.descriptionFontSize,
        fontWeight: "normal"
    },
    color: css.descriptionColor,
    left: 45,
    right: "5dp",
    hintText: L("WmsRgbOther_rgb_hintText")
});

row.add(titleRow);

row.add(txtR);

sectionRGB.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "rgb-row",
    height: css.rowHeight,
    backgroundColor: css.bcTvRowColor
});

var titleRow = Titanium.UI.createLabel({
    text: "G:",
    font: {
        fontSize: css.titleFontSize,
        fontWeight: "bold"
    },
    color: css.titleColor,
    left: 10,
    right: "10dp",
    height: css.titleHeight
});

var txtG = Ti.UI.createTextField({
    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
    font: {
        fontSize: css.descriptionFontSize,
        fontWeight: "normal"
    },
    color: css.descriptionColor,
    left: 45,
    right: "5dp",
    hintText: L("WmsRgbOther_rgb_hintText")
});

row.add(titleRow);

row.add(txtG);

sectionRGB.add(row);

var row = Titanium.UI.createTableViewRow({
    hasChild: false,
    className: "rgb-row",
    height: css.rowHeight,
    backgroundColor: css.bcTvRowColor
});

var titleRow = Titanium.UI.createLabel({
    text: "B:",
    font: {
        fontSize: css.titleFontSize,
        fontWeight: "bold"
    },
    color: css.titleColor,
    left: 10,
    right: "10dp",
    height: css.titleHeight
});

var txtB = Ti.UI.createTextField({
    keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
    font: {
        fontSize: css.descriptionFontSize,
        fontWeight: "normal"
    },
    color: css.descriptionColor,
    left: 45,
    right: "5dp",
    hintText: L("WmsRgbOther_rgb_hintText")
});

row.add(titleRow);

row.add(txtB);

sectionRGB.add(row);

tblRGB.data = [ sectionRGB ];

win.add(tblRGB);

win.addEventListener("blur", updateOtherRow);