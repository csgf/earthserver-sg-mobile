function retrieveDescribeCoverage(serverIndex, coverageIndex) {
    Ti.API.info("WcsCoverageMetadata.js - serverIndex: " + serverIndex);
    Ti.API.info("WcsCoverageMetadata.js - coverageIndex: " + coverageIndex);
    var indicatorStyle;
    indicatorStyle = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    var actInd = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading data...",
        style: indicatorStyle,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    win.add(actInd);
    actInd.show();
    var addedServers = [];
    Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));
    if (null == addedServers[serverIndex].describeCoverageArray[coverageIndex]) getDescribeCoverage(addedServers, serverIndex, function(xmlText) {
        if (null == xmlText) alert("error"); else {
            addedServers[serverIndex].describeCoverageArray[coverageIndex] = xmlText;
            Ti.App.Properties.setList("addedServers", addedServers);
            actInd.hide();
            win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
            true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
        }
    }); else {
        actInd.hide();
        win2.xmlText = addedServers[serverIndex].describeCoverageArray[coverageIndex];
        true == Ti.App.isAndroid ? win2.open() : win.padre.openWindow(win2);
    }
}

function getDescribeCoverage(addedServers, serverIndex, callback) {
    try {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var xmlText = this.responseText;
            callback(xmlText);
        };
        xhr.onerror = function() {
            Ti.API.error(this.status + " - " + this.statusText);
            callback(null);
        };
        xhr.timeout = 1e4;
        win.coverageIdArray;
        var strRequest = addedServers[serverIndex].url;
        strRequest += "?service=" + addedServers[serverIndex].type;
        strRequest += "&version=" + win.ServiceTypeVersion;
        strRequest += "&request=DescribeCoverage";
        strRequest += "&coverageId=" + win.coverageId;
        xhr.open("GET", strRequest);
        xhr.send();
    } catch (e) {
        callback(null);
    }
}

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
    url: "/windows/CoverageInfo.js",
    title: L("WcsCoverageMetadata_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.xml = win.xml;

win1.rowID = win.rowID;

win1.padre = win.padre;

var win2 = Titanium.UI.createWindow({
    url: "/windows/WcsDescribeCoverage.js",
    title: L("WcsDescribeCoverage_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win2.padre = win.padre;

var tblChoice = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: 182,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var data = [];

var row = Titanium.UI.createTableViewRow({
    width: tblChoice.width,
    height: 90,
    hasChild: false,
    className: "CoverageInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageMetadata_row1_title"),
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
    text: L("WcsCoverageMetadata_row1_description"),
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

data.push(row);

var row = Titanium.UI.createTableViewRow({
    width: tblChoice.width,
    height: 90,
    hasChild: false,
    className: "CoverageInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsCoverageMetadata_row2_title"),
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
    text: L("WcsCoverageMetadata_row2_description"),
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

data.push(row);

tblChoice.data = data;

win.add(tblChoice);

tblChoice.addEventListener("click", function(e) {
    0 == e.index ? true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1) : retrieveDescribeCoverage(win.serverIndex, win.rowID);
});