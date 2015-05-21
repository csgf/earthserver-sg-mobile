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
    url: "/windows/WcsGetCoverage.js",
    title: L("WcsGetCoverage_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var tblCoverageList = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var data = [];

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

for (var i = 0; addedServers.length > i; i++) if (null != addedServers[i].describeCoverageArray && 0 != addedServers[i].describeCoverageArray.length) {
    var sectionServer = Ti.UI.createTableViewSection({
        headerTitle: addedServers[i].name
    });
    for (var j = 0; addedServers[i].describeCoverageArray.length > j; j++) {
        Ti.API.info("WcsCoverageList2.js - 1 - i, j = " + i + ", " + j);
        if (null != addedServers[i].describeCoverageArray[j]) {
            Ti.API.info("WcsCoverageList2.js - addedServers[i].describeCoverageArray[j]: " + addedServers[i].describeCoverageArray[j]);
            var xmlData = Titanium.XML.parseString(addedServers[i].describeCoverageArray[j]);
            var row = Titanium.UI.createTableViewRow({
                width: tblCoverageList.width,
                height: 90,
                hasChild: false,
                className: "coverageId-row"
            });
            var titleRow = Titanium.UI.createLabel({
                text: xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent,
                font: {
                    fontSize: 22,
                    fontWeight: "bold"
                },
                color: "#000",
                left: 10,
                top: 5,
                width: row.width - 70,
                height: 30
            });
            var descriptionRow = Titanium.UI.createLabel({
                text: xmlData.documentElement.getElementsByTagName("wcs:CoverageSubtype").item(0).textContent,
                font: {
                    fontSize: 20,
                    fontWeight: "normal"
                },
                color: "#fff",
                left: 10,
                top: 35,
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
            row.add(titleRow);
            row.add(descriptionRow);
            row.add(iconImage);
            var serverIndexRow = Titanium.UI.createLabel({
                text: i,
                visible: false
            });
            row.add(serverIndexRow);
            var layerIndexRow = Titanium.UI.createLabel({
                text: j,
                visible: false
            });
            row.add(layerIndexRow);
            sectionServer.add(row);
        }
    }
    data.push(sectionServer);
}

tblCoverageList.setData(data);

win.add(tblCoverageList);

tblCoverageList.addEventListener("click", function(e) {
    win1.serverIndex = e.row.children[3].text;
    win1.layerIndex = e.row.children[4].text;
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});