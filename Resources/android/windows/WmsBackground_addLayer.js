createWmsBackground_addLayer = function() {
    function updateBgColorRow() {
        var isTransparent = true;
        for (var i = 0; tblColors.data[0].rowCount > i; i++) if (true == tblColors.data[0].rows[i].children[2].visible) {
            isTransparent = false;
            win.fireEvent("updateBgColorRow", {
                BgColorText: tblColors.data[0].rows[i].children[1].text
            });
        }
        true == isTransparent && win.fireEvent("updateBgColorRow", {
            BgColorText: "Transparent"
        });
    }
    var css = Ti.API.WxsCss;
    var win = Ti.UI.createWindow({
        title: "Background",
        modal: false,
        backgroundImage: "/images/bgImage.png"
    });
    win.addEventListener("open", function() {
        var actionBar;
        if (win.activity) {
            actionBar = win.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    win.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var lastSelectedRow = "";
    win.addEventListener("android:back", function() {
        win.close();
    });
    win.addEventListener("close", function() {
        win.remove(tblTransparent);
        win.remove(tblColors);
    });
    Ti.Platform.displayCaps.platformWidth;
    Ti.Platform.displayCaps.platformHeight;
    var win1 = Titanium.UI.createWindow({
        title: L("WmsRgbOther_win_title"),
        url: "/windows/WmsRgbOther.js",
        modal: false,
        backgroundImage: "/images/bgImage.png"
    });
    win1.padre = win.padre;
    win1.addEventListener("open", function() {
        var actionBar;
        if (win1.activity) {
            actionBar = win1.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    win1.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    var bgColors = [ {
        text: "Black",
        value: "0x000000"
    }, {
        text: "Blue",
        value: "0x0000FF"
    }, {
        text: "Brown",
        value: "0xA52A2A"
    }, {
        text: "Cyan",
        value: "0x00FFFF"
    }, {
        text: "Gray",
        value: "0x808080"
    }, {
        text: "Green",
        value: "0x00FF00"
    }, {
        text: "Magenta",
        value: "0xFF00FF"
    }, {
        text: "Orange",
        value: "0xFFA500"
    }, {
        text: "Purple",
        value: "0x800080"
    }, {
        text: "Red",
        value: "0xFF0000"
    }, {
        text: "White",
        value: "0xFFFFFF"
    }, {
        text: "Yellow",
        value: "0xFFFF00"
    } ];
    var tblTransparent = Ti.UI.createView({
        top: "10dp",
        height: css.rowHeight,
        left: 0,
        right: 0
    });
    Ti.UI.createTableViewSection({});
    var titleRow = Titanium.UI.createLabel({
        text: L("WmsBackground_addLayer_row1_title"),
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        color: "#fff",
        left: 10,
        width: "auto",
        height: 30
    });
    var basicSwitch = Ti.UI.createSwitch({
        titleOn: "ON",
        titleOff: "OFF",
        value: true,
        right: 10,
        height: 40
    });
    basicSwitch.addEventListener("change", function() {
        tblColors.visible = true == basicSwitch.value ? false : true;
    });
    tblTransparent.add(titleRow);
    tblTransparent.add(basicSwitch);
    win.add(tblTransparent);
    var tblColors = Titanium.UI.createTableView({
        top: parseInt(css.rowHeight) + 10 + "dp",
        visible: false,
        minRowHeight: css.rowHeight,
        backgroundColor: css.bcTvColor,
        bottom: 0,
        separatorColor: css.separatorColor
    });
    var sectionColors = Ti.UI.createTableViewSection({
        headerTitle: L("WmsBackground_addLayer_section2")
    });
    for (var i = 0; bgColors.length > i; i++) {
        var row = Titanium.UI.createTableViewRow({
            backgroundColor: css.bcTvRowColor,
            height: css.rowHeight,
            hasChild: false,
            className: "bgColor-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: bgColors[i].text,
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
            text: bgColors[i].value,
            font: {
                fontSize: css.descriptionFontSize,
                fontWeight: "normal"
            },
            color: css.descriptionColor,
            left: 10,
            right: "10dp",
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
        sectionColors.add(row);
    }
    var row = Titanium.UI.createTableViewRow({
        backgroundColor: css.bcTvRowColor,
        height: css.rowHeight,
        hasChild: true,
        className: "other-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: "Other",
        font: {
            fontSize: css.titleFontSize,
            fontWeight: "bold"
        },
        color: "#00CD00",
        left: 10,
        top: 5,
        height: css.titleHeight,
        right: "10dp"
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: "",
        font: {
            fontSize: css.descriptionFontSize,
            fontWeight: "normal"
        },
        color: css.descriptionColor,
        left: 10,
        right: "10dp",
        bottom: "5dp",
        height: css.descriptionHeight
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/check.png",
        width: 48,
        height: 48,
        right: 10,
        visible: false
    });
    row.add(titleRow);
    row.add(descriptionRow);
    row.add(iconImage);
    sectionColors.add(row);
    tblColors.data = [ sectionColors ];
    win.add(tblColors);
    tblColors.addEventListener("click", function(e) {
        if ("" == lastSelectedRow) lastSelectedRow = e.row; else if (lastSelectedRow.children[0].text != e.row.children[0].text) {
            lastSelectedRow.children[2].visible = false;
            lastSelectedRow = e.row;
        }
        e.row.children[2].visible = !e.row.children[2].visible;
        if ("Other" == e.row.children[0].text && true == e.row.children[2].visible) {
            win1.selectedRow = e.row;
            true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
        }
    });
    win.addEventListener("close", updateBgColorRow);
    return win;
};

module.exports = createWmsBackground_addLayer;