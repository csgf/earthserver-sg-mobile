Titanium.UI.setBackgroundImage("/images/bgImage.png");

var win = Titanium.UI.currentWindow;

var btnBack = Ti.UI.createButton({
    title: L("NavButton_back")
});

win.leftNavButton = btnBack;

btnBack.addEventListener("click", function() {
    win.remove(scrollView);
    win.close();
});

win.addEventListener("android:back", function() {
    win.remove(scrollView);
    win.close();
});

var pWidth = Ti.Platform.displayCaps.platformWidth;

var pHeight = Ti.Platform.displayCaps.platformHeight;

var win1 = Titanium.UI.createWindow({
    url: "/windows/Overlays.js",
    title: L("Overlays_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png"
});

win1.padre = win.padre;

var addedServers = [];

Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));

if (addedServers.length > 0) {
    var xmlData = Ti.XML;
    xmlData = Titanium.XML.parseString(addedServers[win.serverIndex].describeCoverageArray[win.layerIndex]);
    var btnSend = Titanium.UI.createButton({
        title: L("WcsGetCoverage_button_title"),
        font: {
            fontSize: 18,
            fontFamily: "Helvetica Neue",
            fontWeight: "bold"
        },
        top: 10,
        right: 10,
        width: Math.round(pWidth / 4),
        height: Math.round(pHeight / 12),
        backgroundImage: "/images/button.png"
    });
    var tblGetCoverage = Titanium.UI.createTableView({
        width: pWidth - 20,
        height: pHeight - btnSend.height - 120,
        top: btnSend.top + btnSend.height + 10,
        left: 10,
        backgroundColor: "#B0C4DE",
        borderRadius: 12,
        borderColor: "#AFEEEE",
        borderWidth: 2,
        minRowHeight: 90
    });
    var sectionBoundingBox = Ti.UI.createTableViewSection({
        headerTitle: L("WcsGetCoverage_section1_title")
    });
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "boundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row1_title"),
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
    sectionBoundingBox.add(row);
    var minLat = 0;
    var maxLat = 0;
    var minLon = 0;
    var maxLon = 0;
    var str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("axisLabels");
    var data = [];
    data = str.split(" ");
    if ("lat" === data[0]) {
        str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
        var numbersArray = [];
        numbersArray = str.split(" ");
        minLat = parseFloat(numbersArray[0]).toFixed(6);
        minLon = parseFloat(numbersArray[1]).toFixed(6);
        str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
        numbersArray = [];
        numbersArray = str.split(" ");
        maxLat = parseFloat(numbersArray[0]).toFixed(6);
        maxLon = parseFloat(numbersArray[1]).toFixed(6);
    } else {
        str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:lowerCorner").item(0).textContent;
        var numbersArray = [];
        numbersArray = str.split(" ");
        minLon = parseFloat(numbersArray[0]).toFixed(6);
        minLat = parseFloat(numbersArray[1]).toFixed(6);
        str = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getElementsByTagName("gml:upperCorner").item(0).textContent;
        numbersArray = [];
        numbersArray = str.split(" ");
        maxLon = parseFloat(numbersArray[0]).toFixed(6);
        maxLat = parseFloat(numbersArray[1]).toFixed(6);
    }
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "boundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row2_title"),
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
        text: minLat,
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
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "boundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row3_title"),
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
        text: minLon,
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
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "boundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row4_title"),
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
        text: maxLat,
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
    sectionBoundingBox.add(row);
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "boundingBox-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row5_title"),
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
        text: maxLon,
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
    sectionBoundingBox.add(row);
    var sectionRangeSubsetting = Ti.UI.createTableViewSection({
        headerTitle: L("WcsGetCoverage_section2_title")
    });
    var rangeType = Ti.XML.Element;
    rangeType = xmlData.documentElement.getElementsByTagName("gmlcov:rangeType").item(0);
    if (null != rangeType.getElementsByTagName("swe:field")) for (var i = 0; rangeType.getElementsByTagName("swe:field").length > i; i++) {
        var row = Titanium.UI.createTableViewRow({
            hasChild: false,
            className: "bands-row"
        });
        var titleRow = Titanium.UI.createLabel({
            text: rangeType.getElementsByTagName("swe:field").item(i).getAttribute("name"),
            font: {
                fontSize: 22,
                fontWeight: "bold"
            },
            color: "#000",
            left: 10,
            top: 30,
            width: "auto",
            height: 30
        });
        var iconImage = Titanium.UI.createImageView({
            image: "/images/check.png",
            width: 48,
            height: 48,
            right: 10,
            top: 20,
            visible: true
        });
        row.add(titleRow);
        row.add(iconImage);
        row.addEventListener("click", function(e) {
            e.row.children[1].visible = !e.row.children[1].visible;
        });
        sectionRangeSubsetting.add(row);
    }
    var sectionImageSize = Ti.UI.createTableViewSection({
        headerTitle: L("WcsGetCoverage_section3_title")
    });
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "imageSize-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row6_title"),
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width
    });
    var txtWidth = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        font: {
            fontSize: 20,
            fontWeight: "normal"
        },
        color: "#fff",
        backgroundColor: "#B0C4DE",
        left: 0,
        top: 35,
        width: row.width,
        height: 55,
        hintText: L("WcsGetCoverage_row6_hintText")
    });
    row.add(titleRow);
    row.add(txtWidth);
    sectionImageSize.add(row);
    var row = Titanium.UI.createTableViewRow({
        hasChild: false,
        className: "imageSize-row"
    });
    var titleRow = Titanium.UI.createLabel({
        text: L("WcsGetCoverage_row7_title"),
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        color: "#000",
        left: 10,
        top: 5,
        height: 30,
        width: row.width
    });
    var txtHeight = Ti.UI.createTextField({
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        font: {
            fontSize: 20,
            fontWeight: "normal"
        },
        color: "#fff",
        backgroundColor: "#B0C4DE",
        left: 0,
        top: 35,
        width: row.width,
        height: 55,
        hintText: L("WcsGetCoverage_row7_hintText")
    });
    row.add(titleRow);
    row.add(txtHeight);
    sectionImageSize.add(row);
    tblGetCoverage.data = [ sectionBoundingBox, sectionRangeSubsetting, sectionImageSize ];
    var scrollView = Titanium.UI.createScrollView({
        top: 0,
        contentHeight: "auto",
        showVerticalScrollIndicator: true
    });
    var totalRows = 0;
    for (var i = 0; tblGetCoverage.data.length > i; i++) totalRows += tblGetCoverage.data[i].rowCount;
    tblGetCoverage.height = 90 * totalRows + 90;
    scrollView.add(btnSend);
    scrollView.add(tblGetCoverage);
    win.add(scrollView);
    btnSend.addEventListener("touchstart", function() {
        btnSend.backgroundImage = "/images/button_focused.png";
    });
    btnSend.addEventListener("touchend", function() {
        btnSend.backgroundImage = "/images/button.png";
    });
    btnSend.addEventListener("click", function() {
        if (0 >= txtWidth.value || 0 >= txtHeight.value) alert(L("WcsGetCoverage_ErrorMessage")); else {
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
            var coverageId = xmlData.documentElement.getElementsByTagName("wcs:CoverageId").item(0).textContent;
            var coverageCrs = xmlData.documentElement.getElementsByTagName("gml:Envelope").item(0).getAttribute("srsName");
            var colorsBands = [];
            var strBandsRequest = "";
            for (var i = 0; tblGetCoverage.data[1].rowCount > i; i++) if (true == tblGetCoverage.data[1].rows[i].children[1].visible) {
                colorsBands.push(tblGetCoverage.data[1].rows[i].children[0].text);
                strBandsRequest += tblGetCoverage.data[1].rows[i].children[0].text + ",";
            }
            strBandsRequest = strBandsRequest.substr(0, strBandsRequest.length - 1);
            strBandsRequest.length > 0 && (strBandsRequest = "&rangesubset=" + strBandsRequest);
            1 == colorsBands.length && (strBandsRequest += "," + colorsBands[0]);
            var strRequest = "";
            strRequest = addedServers[win.serverIndex].url;
            strRequest += "?service=wcs&version=2.0.0";
            strRequest += "&request=GetCoverage";
            strRequest += "&coverageid=" + coverageId;
            strRequest += "&size=long(" + txtWidth.value + ")";
            strRequest += "&size=lat(" + txtHeight.value + ")";
            strRequest += "&format=image/png";
            strRequest += strBandsRequest;
            strRequest += "&outputcrs=" + coverageCrs;
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onload = function() {
                var strImageData = Ti.Utils.base64encode(this.responseData);
                actInd.setMessage(L("WcsGetCoverage_message"));
                var mapLayers = [];
                void 0 != Ti.App.mapLayers && (mapLayers = Ti.App.mapLayers);
                var newLayer = {
                    layerId: coverageId,
                    serverName: addedServers[win.serverIndex].name,
                    serverUrl: addedServers[win.serverIndex].url,
                    visible: true,
                    opacity: 1,
                    crs: coverageCrs,
                    minLat: minLat,
                    minLon: minLon,
                    maxLat: maxLat,
                    maxLon: maxLon,
                    strImage: strImageData,
                    imgWidth: txtWidth.value,
                    imgHeight: txtHeight.value,
                    bands: colorsBands,
                    serverIndex: win.serverIndex,
                    layerIndex: win.layerIndex
                };
                mapLayers.push(newLayer);
                Ti.App.mapLayers = mapLayers;
                actInd.hide();
                true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
            };
            xhr.onerror = function() {
                Ti.API.error("ERROR: " + this.status + " - " + this.statusText);
                alert("ERROR\n\n" + this.status + " - " + this.statusText);
            };
            xhr.open("GET", strRequest);
            xhr.send();
        }
    });
}