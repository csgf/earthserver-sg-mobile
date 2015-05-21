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

var win1 = Titanium.UI.createWindow({
    url: "/windows/WmsMetadata.js",
    title: L("WmsMetadata_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/LayerMetadata.js",
    title: L("LayerMetadata_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var tblWmsServer = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2,
    minRowHeight: 80
});

var sectionMetadata = Ti.UI.createTableViewSection({
    headerTitle: L("WmsServer_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    height: 80,
    className: "metadata-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsServer_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 20,
    width: row.width - 20,
    height: "auto"
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

sectionMetadata.add(row);

var sectionLayers = Ti.UI.createTableViewSection({
    headerTitle: L("WmsServer_section2_title")
});

var xmlData = Titanium.XML.parseString(win.xmlText);

win1.xml = xmlData;

win2.xml = xmlData;

layer = xmlData.documentElement.getElementsByTagName("Layer");

for (var i = 0; layer.length > i; i++) {
    var row = Titanium.UI.createTableViewRow({
        width: tblWmsServer.width,
        height: "auto",
        className: "layer-row"
    });
    var descriptionRow = Titanium.UI.createLabel({
        text: layer.item(i).getElementsByTagName("Title").item(0).textContent,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 10,
        width: row.width - 70,
        height: "auto"
    });
    var iconImage = Titanium.UI.createImageView({
        image: "/images/next.png",
        width: 48,
        height: 48,
        right: 10,
        top: 20
    });
    row.add(descriptionRow);
    row.add(iconImage);
    sectionLayers.add(row);
}

tblWmsServer.data = [ sectionMetadata, sectionLayers ];

win.add(tblWmsServer);

tblWmsServer.addEventListener("click", function(e) {
    if (0 == e.index) true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1); else {
        win2.rowID = e.index;
        true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
    }
});