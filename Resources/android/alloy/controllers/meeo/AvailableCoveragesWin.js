function Controller() {
    function retrieveDescribeCoverage(serverIndex, coverageIndex) {
        Ti.API.info("availableCoverageWin.js - serverIndex: " + serverIndex);
        Ti.API.info("availableCoverageWin.js - coverageIndex: " + coverageIndex);
        showLoading();
        var serversMeeo = [];
        Ti.App.Properties.hasProperty("serversMeeo") && (serversMeeo = Ti.App.Properties.getList("serversMeeo"));
        debug_mode && Ti.API.info("Selected coverage: ---> " + JSON.stringify(serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml));
        if ("" === serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml) {
            debug_mode && Ti.API.info("Xml non presente: lo scarico dal server ----> ");
            getDescribeCoverage(serversMeeo, serverIndex, serversMeeo[serverIndex].describeCoverageArray[coverageIndex].id, function(xmlText) {
                alert(L("WcsDescribeCoverage_message"));
                if (null == xmlText) {
                    alert("error");
                    hideLoading();
                } else {
                    serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml = xmlText;
                    var spatialEnvelope = {
                        lowerCorner: [],
                        upperCorner: []
                    };
                    var xmlData = Titanium.XML.parseString(xmlText);
                    var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("lowerCorner").item(0).textContent;
                    var numbersArray = [];
                    numbersArray = str.split(" ");
                    for (var i = 0; numbersArray.length > i; i++) spatialEnvelope.lowerCorner.push(parseFloat(numbersArray[i]).toFixed(6));
                    var str = xmlData.documentElement.getElementsByTagName("Envelope").item(0).getElementsByTagName("upperCorner").item(0).textContent;
                    var numbersArray = [];
                    numbersArray = str.split(" ");
                    for (var i = 0; numbersArray.length > i; i++) spatialEnvelope.upperCorner.push(parseFloat(numbersArray[i]).toFixed(6));
                    serversMeeo[serverIndex].describeCoverageArray[coverageIndex].spatialEnvelope = spatialEnvelope;
                    describeCoverageArray = serversMeeo[serverIndex].describeCoverageArray;
                    debug_mode && Ti.API.info("spatialEnvelope: " + JSON.stringify(spatialEnvelope));
                    Ti.App.Properties.setList("serversMeeo", serversMeeo);
                    checkAvailableCoverage();
                    hideLoading();
                }
            });
        } else {
            debug_mode && Ti.API.info("Xml già presente ----> " + JSON.stringify(serversMeeo[serverIndex].describeCoverageArray[coverageIndex].xml));
            hideLoading();
        }
    }
    function getDescribeCoverage(serversMeeo, serverIndex, coverageId, callback) {
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
            var strRequest = serversMeeo[serverIndex].url;
            strRequest += "?service=" + serversMeeo[serverIndex].type;
            strRequest += "&version=" + serversMeeo[serverIndex].serviceTypeVersion;
            strRequest += "&request=DescribeCoverage";
            strRequest += "&coverageId=" + coverageId;
            Ti.API.info("getDescribeCoverage url ---> " + strRequest);
            xhr.open("GET", strRequest);
            xhr.send();
        } catch (e) {
            callback(null);
        }
    }
    function getMapBounds(region) {
        b = {};
        b.no = {};
        b.ne = {};
        b.so = {};
        b.se = {};
        b.no.lat = parseFloat(region.latitude) + parseFloat(region.latitudeDelta) / 2;
        b.no.lng = parseFloat(region.longitude) - parseFloat(region.longitudeDelta) / 2;
        b.so.lat = parseFloat(region.latitude) - parseFloat(region.latitudeDelta) / 2;
        b.so.lng = parseFloat(region.longitude) - parseFloat(region.longitudeDelta) / 2;
        b.ne.lat = parseFloat(region.latitude) + parseFloat(region.latitudeDelta) / 2;
        b.ne.lng = parseFloat(region.longitude) + parseFloat(region.longitudeDelta) / 2;
        b.se.lat = parseFloat(region.latitude) - parseFloat(region.latitudeDelta) / 2;
        b.se.lng = parseFloat(region.longitude) + parseFloat(region.longitudeDelta) / 2;
        return b;
    }
    function chooseFilter() {
        $.address.focus();
        $.availableCoverageWin.backgroundColor = "gray";
        $.pickerView.show();
    }
    function hidePickerView() {
        $.pickerView.hide();
        $.availableCoverageWin.backgroundColor = "white";
        $.address.blur();
    }
    function filterChoosen() {
        $.availableCoverageWin.backgroundColor = "white";
        $.pickerView.hide();
        $.address.blur();
        showLoading();
        retriveAddressCoords($.address.value);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/AvailableCoveragesWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.availableCoverageWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "availableCoverageWin",
        title: "Available coverages"
    });
    $.__views.availableCoverageWin && $.addTopLevelView($.__views.availableCoverageWin);
    var __alloyId71 = [];
    $.__views.__alloyId72 = Ti.UI.createTableViewSection({
        headerTitle: "Geolocation",
        id: "__alloyId72"
    });
    __alloyId71.push($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Current location",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.currentCoords = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "currentCoords"
    });
    $.__views.__alloyId73.add($.__views.currentCoords);
    $.__views.switchGeo = Ti.UI.createSwitch({
        value: true,
        id: "switchGeo",
        right: "10dp"
    });
    $.__views.__alloyId73.add($.__views.switchGeo);
    checkGeolocation ? $.__views.switchGeo.addEventListener("change", checkGeolocation) : __defers["$.__views.switchGeo!change!checkGeolocation"] = true;
    $.__views.currentCityRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        id: "currentCityRow",
        hasChild: "false"
    });
    $.__views.__alloyId72.add($.__views.currentCityRow);
    chooseFilter ? $.__views.currentCityRow.addEventListener("click", chooseFilter) : __defers["$.__views.currentCityRow!click!chooseFilter"] = true;
    $.__views.city = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        text: "City",
        left: "10dp",
        id: "city"
    });
    $.__views.currentCityRow.add($.__views.city);
    $.__views.currentCity = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        right: "10dp",
        left: "50dp",
        id: "currentCity",
        textAlign: "right"
    });
    $.__views.currentCityRow.add($.__views.currentCity);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        right: "10dp",
        message: "Loading...",
        visible: false,
        id: "activityIndicator",
        style: Ti.UI.ActivityIndicatorStyle.DARK
    });
    $.__views.currentCityRow.add($.__views.activityIndicator);
    $.__views.drawMapRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        id: "drawMapRow",
        hasChild: "true"
    });
    $.__views.__alloyId72.add($.__views.drawMapRow);
    openDrawableMap ? $.__views.drawMapRow.addEventListener("click", openDrawableMap) : __defers["$.__views.drawMapRow!click!openDrawableMap"] = true;
    $.__views.drawMapLbl = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        text: "Draw a region on the map",
        left: "10dp",
        id: "drawMapLbl"
    });
    $.__views.drawMapRow.add($.__views.drawMapLbl);
    $.__views.__alloyId75 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId75"
    });
    $.__views.__alloyId72.add($.__views.__alloyId75);
    $.__views.mapview = Alloy.Globals.Map.createView({
        mapType: Alloy.Globals.Map.NORMAL_TYPE,
        height: "200dp",
        left: "0dp",
        right: "0dp",
        bottom: "0dp",
        top: "0dp",
        ns: "Alloy.Globals.Map",
        id: "mapview"
    });
    $.__views.__alloyId75.add($.__views.mapview);
    $.__views.__alloyId76 = Ti.UI.createTableViewSection({
        headerTitle: "Coordinates",
        id: "__alloyId76"
    });
    __alloyId71.push($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Longitude (x)",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.longitude = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "longitude"
    });
    $.__views.__alloyId77.add($.__views.longitude);
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId79"
    });
    $.__views.__alloyId76.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Latitude (y)",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.latitude = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "latitude"
    });
    $.__views.__alloyId79.add($.__views.latitude);
    $.__views.availableCoverageSection = Ti.UI.createTableViewSection({
        headerTitle: "Available coverages in this area",
        id: "availableCoverageSection"
    });
    __alloyId71.push($.__views.availableCoverageSection);
    $.__views.notDownloadedCoverageSection = Ti.UI.createTableViewSection({
        headerTitle: "Coverages not yet downloaded",
        id: "notDownloadedCoverageSection"
    });
    __alloyId71.push($.__views.notDownloadedCoverageSection);
    $.__views.tv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId71,
        id: "tv"
    });
    $.__views.availableCoverageWin.add($.__views.tv);
    tvClick ? $.__views.tv.addEventListener("click", tvClick) : __defers["$.__views.tv!click!tvClick"] = true;
    $.__views.pickerView = Ti.UI.createView({
        height: 200,
        width: 250,
        backgroundColor: "#282828",
        visible: false,
        id: "pickerView"
    });
    $.__views.availableCoverageWin.add($.__views.pickerView);
    $.__views.address = Ti.UI.createTextField({
        hintText: "Enter address....",
        color: "#fff",
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "normal"
        },
        height: "60dp",
        left: "10dp",
        right: "10dp",
        id: "address"
    });
    $.__views.pickerView.add($.__views.address);
    $.__views.pickerViewTitle = Ti.UI.createLabel({
        font: {
            fontSize: "22sp"
        },
        color: "#32abd8",
        backgroundColor: "#282828",
        borderColor: "#32abd8",
        borderWidth: 2,
        top: -2,
        left: -2,
        height: 50,
        width: 254,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "pickerViewTitle",
        text: "Enter address"
    });
    $.__views.pickerView.add($.__views.pickerViewTitle);
    $.__views.__alloyId85 = Ti.UI.createView({
        bottom: "0",
        height: "50",
        id: "__alloyId85"
    });
    $.__views.pickerView.add($.__views.__alloyId85);
    $.__views.doneBtn = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: "#fff",
        backgroundColor: "#282828",
        borderColor: "#343434",
        borderWidth: 1,
        width: 126,
        height: "100%",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "doneBtn",
        text: "Done",
        left: "-1"
    });
    $.__views.__alloyId85.add($.__views.doneBtn);
    filterChoosen ? $.__views.doneBtn.addEventListener("click", filterChoosen) : __defers["$.__views.doneBtn!click!filterChoosen"] = true;
    $.__views.cancelBtn = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: "#fff",
        backgroundColor: "#282828",
        borderColor: "#343434",
        borderWidth: 1,
        width: 126,
        height: "100%",
        bottom: -1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "cancelBtn",
        text: "Cancel",
        right: "-1"
    });
    $.__views.__alloyId85.add($.__views.cancelBtn);
    hidePickerView ? $.__views.cancelBtn.addEventListener("click", hidePickerView) : __defers["$.__views.cancelBtn!click!hidePickerView"] = true;
    $.__views.loadingView = Ti.UI.createView({
        id: "loadingView",
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
        opacity: "0.4",
        visible: "false",
        zIndex: "10"
    });
    $.__views.availableCoverageWin.add($.__views.loadingView);
    $.__views.activityIndicatorView = Ti.UI.createActivityIndicator({
        font: {
            fontSize: "26dp",
            fontWeight: "bold"
        },
        color: "#fff",
        message: "Loading...",
        visible: false,
        id: "activityIndicatorView",
        style: Ti.UI.ActivityIndicatorStyle.BIG,
        zIndex: "11"
    });
    $.__views.availableCoverageWin.add($.__views.activityIndicatorView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var debug_mode = Alloy.Globals.debug_mode;
    var cornerRegion = {};
    var availableCoverage = [];
    var notDownloadedCoverage = [];
    var routeAdded = false;
    var route;
    $.currentCity.text = Ti.App.Properties.getString("cittaPredefinita", "Enter address...");
    $.availableCoverageWin.addEventListener("open", function() {
        var actionBar;
        if ($.availableCoverageWin.activity) {
            actionBar = $.availableCoverageWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.availableCoverageWin.remove($.mapview);
                    $.mapview = null;
                    $.tv.deleteRow(3);
                    $.availableCoverageWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.availableCoverageWin.addEventListener("android:back", function() {
        $.switchGeo.value = false;
        checkGeolocation({
            value: false
        });
        $.availableCoverageWin.remove($.mapview);
        $.mapview = null;
        $.tv.deleteRow(3);
        $.availableCoverageWin.close();
    });
    var getDateFromTimeIndex = function(timeIndex, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var timeString = this.responseText;
            callback(timeString);
        };
        xhr.onerror = function() {
            Ti.API.error(this.status + " - " + this.statusText);
            callback(null);
        };
        xhr.timeout = 1e4;
        var strRequest = "http://glibrary.ct.infn.it/django/convertTime/" + timeIndex;
        Ti.API.info("getDateFromTimeIndex : strRequest ---> " + strRequest);
        xhr.open("GET", strRequest);
        xhr.send();
    };
    var serversMeeo = [];
    var describeCoverageArray = [];
    if (Ti.App.Properties.hasProperty("serversMeeo")) {
        serversMeeo = Ti.App.Properties.getList("serversMeeo");
        describeCoverageArray = serversMeeo[0].describeCoverageArray;
    }
    var tvClick = function(e) {
        if (e.row.download) {
            Ti.API.info("Scarica la coverage con describeCoverageArrayIndex = " + e.row.describeCoverageArrayIndex);
            retrieveDescribeCoverage(0, e.row.describeCoverageArrayIndex);
        } else e.row.compilesData && showCompilesData(e.row.coverageId, e.row.describeCoverageArrayIndex);
    };
    var checkAvailableCoverage = function() {
        Ti.API.info("checkAvailableCoverage ---->");
        $.tv.deleteSection(3);
        $.tv.deleteSection(2);
        $.tv.removeEventListener("click", tvClick);
        var availableCoverageSection = Ti.UI.createTableViewSection({
            headerTitle: "Available coverages in this area"
        });
        var notDownloadedCoverageSection = Ti.UI.createTableViewSection({
            headerTitle: "Coverages not yet downloaded"
        });
        availableCoverage = [];
        notDownloadedCoverage = [];
        debug_mode && Ti.API.info("describeCoverageArray ----> " + JSON.stringify(describeCoverageArray));
        for (var i in describeCoverageArray) if (describeCoverageArray[i].spatialEnvelope) {
            if (debug_mode) {
                Ti.API.info("VERIFICA: ---->");
                Ti.API.info("----> " + JSON.stringify(describeCoverageArray[i].spatialEnvelope));
                Ti.API.info(cornerRegion.no.lng + " >= " + describeCoverageArray[i].spatialEnvelope.lowerCorner[0]);
                Ti.API.info(cornerRegion.ne.lng + " <= " + describeCoverageArray[i].spatialEnvelope.upperCorner[0]);
                Ti.API.info(cornerRegion.se.lat + " >= " + describeCoverageArray[i].spatialEnvelope.lowerCorner[1]);
                Ti.API.info(cornerRegion.no.lat + " <= " + describeCoverageArray[i].spatialEnvelope.upperCorner[1]);
            }
            if (cornerRegion.no.lng >= describeCoverageArray[i].spatialEnvelope.lowerCorner[0] && cornerRegion.ne.lng <= describeCoverageArray[i].spatialEnvelope.upperCorner[0] && cornerRegion.se.lat >= describeCoverageArray[i].spatialEnvelope.lowerCorner[1] && cornerRegion.no.lat <= describeCoverageArray[i].spatialEnvelope.upperCorner[1]) {
                Ti.API.info("----> VERIFICATO :)");
                availableCoverage.push({
                    id: describeCoverageArray[i].id,
                    describeCoverageArrayIndex: i
                });
            } else Ti.API.info("----> NON VERIFICATO :(");
        } else notDownloadedCoverage.push({
            id: describeCoverageArray[i].id,
            describeCoverageArrayIndex: i
        });
        for (var j in availableCoverage) {
            debug_mode && Ti.API.info("availableCoverage ----> " + JSON.stringify(availableCoverage[j]));
            var row = Ti.UI.createTableViewRow({
                backgroundColor: "#fff",
                hasChild: true,
                coverageId: availableCoverage[j].id,
                describeCoverageArrayIndex: availableCoverage[j].describeCoverageArrayIndex,
                compilesData: true
            });
            var titleLbl = Ti.UI.createLabel({
                font: {
                    fontSize: Ti.API.WxsCss.descriptionFontSize,
                    fontWeight: "bold"
                },
                color: Ti.API.WxsCss.titleColor,
                left: "10dp",
                height: "40dp",
                right: "5dp",
                text: availableCoverage[j].id + " (" + availableCoverage[j].id.replace("HRES_ENS", "").replace("CONC_4326_01", "").replace("PM2P5", "PM2.5") + ")"
            });
            row.add(titleLbl);
            availableCoverageSection.add(row);
        }
        $.tv.appendSection(availableCoverageSection);
        for (var k in notDownloadedCoverage) {
            debug_mode && Ti.API.info("notDownloadedCoveragee ----> " + JSON.stringify(notDownloadedCoverage[k]));
            var row = Ti.UI.createTableViewRow({
                backgroundColor: "#fff",
                coverageId: notDownloadedCoverage[k].id,
                describeCoverageArrayIndex: notDownloadedCoverage[k].describeCoverageArrayIndex,
                download: true
            });
            var titleLbl = Ti.UI.createLabel({
                font: {
                    fontSize: Ti.API.WxsCss.descriptionFontSize,
                    fontWeight: "normal"
                },
                color: Ti.API.WxsCss.titleColor,
                left: "10dp",
                height: "40dp",
                right: "5dp",
                text: notDownloadedCoverage[k].id + " (" + notDownloadedCoverage[k].id.replace("HRES_ENS", "").replace("CONC_4326_01", "").replace("PM2P5", "PM2.5") + ")"
            });
            var downloadIV = Ti.UI.createImageView({
                right: "10dp",
                width: "30dp",
                height: "30dp",
                image: "/download.png"
            });
            row.add(titleLbl);
            row.add(downloadIV);
            notDownloadedCoverageSection.add(row);
        }
        $.tv.appendSection(notDownloadedCoverageSection);
        $.tv.addEventListener("click", tvClick);
    };
    var showLoading = function() {
        $.activityIndicator.show();
        $.activityIndicatorView.show();
        $.loadingView.show();
    };
    var hideLoading = function() {
        setTimeout(function() {
            $.activityIndicator.hide();
            $.activityIndicatorView.hide();
            $.loadingView.hide();
        }, 500);
    };
    var updateMapDelta = function() {
        if (routeAdded) {
            $.mapview.removeRoute(route);
            routeAdded = false;
        }
        var regionMappa = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 1,
            longitudeDelta: 1
        };
        $.mapview.setRegion(regionMappa);
        var regionBound = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0,
            longitudeDelta: 0
        };
        cornerRegion = getMapBounds(regionBound);
        checkAvailableCoverage();
        if (debug_mode) {
            Ti.API.info(JSON.stringify(regionMappa));
            Ti.API.info(JSON.stringify(cornerRegion));
        }
        $.mapview.removeAllAnnotations();
        var currentPositionAnn = Alloy.Globals.Map.createAnnotation({
            latitude: latitude,
            longitude: longitude,
            title: $.currentCity.text,
            pincolor: Alloy.Globals.Map.ANNOTATION_RED
        });
        $.mapview.addAnnotation(currentPositionAnn);
        $.mapview.selectAnnotation(currentPositionAnn);
        $.currentCoords.text = "lon: " + parseFloat(longitude).toFixed(4) + "; lat: " + parseFloat(latitude).toFixed(4);
        $.longitude.text = parseFloat(cornerRegion.no.lng).toFixed(6) + ", " + parseFloat(cornerRegion.ne.lng).toFixed(6);
        $.latitude.text = parseFloat(cornerRegion.se.lat).toFixed(6) + ", " + parseFloat(cornerRegion.no.lat).toFixed(6);
    };
    var findZoomRegion = function(points) {
        var tmpDeltatLat = 0, tmpDeltatLong = 0, maxDeltatLat = 0, maxDeltatLong = 0, centerLat = 0, centerLong = 0;
        for (var i = 0; Math.floor(points.length - .5) >= i; i++) for (var j = points.length - 1; j >= Math.floor(points.length - .5); j--) if (j != i) {
            tmpDeltatLat = Math.abs(Math.abs(points[i].latitude) - Math.abs(points[j].latitude));
            if (tmpDeltatLat > maxDeltatLat) {
                maxDeltatLat = tmpDeltatLat;
                centerLat = Math.min(points[i].latitude, points[j].latitude) + maxDeltatLat / 2;
            }
            tmpDeltatLong = Math.abs(Math.abs(points[i].longitude) - Math.abs(points[j].longitude));
            if (tmpDeltatLong > maxDeltatLong) {
                maxDeltatLong = tmpDeltatLong;
                centerLong = Math.min(points[i].longitude, points[j].longitude) + maxDeltatLong / 2;
            }
        }
        maxDeltatLat = Math.floor(maxDeltatLat + 1);
        maxDeltatLong = Math.floor(maxDeltatLong + 1);
        var region = {
            latitude: centerLat,
            longitude: centerLong,
            latitudeDelta: maxDeltatLat + 1,
            longitudeDelta: maxDeltatLong + 1
        };
        return region;
    };
    var geolocation = require("/configGeolocation");
    var latitude, longitude, altitude;
    var updateMap = function(lon, lat) {
        $.mapview.removeAllAnnotations();
        var region = {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0,
            longitudeDelta: 0
        };
        updateMapDelta(region);
    };
    var posizioneCorrente = function() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error) {
                var alertDialog = Ti.UI.createAlertDialog({
                    title: "EarthServer",
                    message: "Enable location services to take advantage of all features"
                });
                alertDialog.show();
                $.switchGeo.value = false;
                hideLoading();
                checkGeolocation({
                    value: false
                });
                var citta = Ti.App.Properties.getString("cittaPredefinita", "Roma, Italia");
                Ti.API.info("La cittaPredefinita è: " + citta);
                $.address.value = citta;
                retriveAddressCoords(citta);
            } else {
                Ti.API.info("getCurrentPosition Data: " + JSON.stringify(e));
                var mylongitude = e.coords.longitude;
                var mylatitude = e.coords.latitude;
                altitude = e.coords.latitude;
                Titanium.Geolocation.reverseGeocoder(mylatitude, mylongitude, function(evt) {
                    debug_mode && Ti.API.info(JSON.stringify(evt));
                    if (evt.error) {
                        var alertDialog = Ti.UI.createAlertDialog({
                            title: "EarthServer",
                            message: "A connection failure occurred. Please, try again."
                        });
                        alertDialog.show();
                        $.switchGeo.value = false;
                        hideLoading();
                        var citta = "Roma, Italia";
                        $.currentCity.text = citta;
                        $.address.value = citta;
                        longitude = 12.4831;
                        latitude = 41.8933;
                        updateMap(longitude, latitude);
                        $.switchGeo.value = false;
                        checkGeolocation({
                            value: false
                        });
                        return;
                    }
                    var places = evt.places;
                    if (debug_mode) for (i in places) Ti.API.info("la mia posizione potrebbe essere : " + places[i].address);
                    if (places.length > 0) {
                        var citta = places[0].city.split(",");
                        var address = places[0].address.split(",");
                        $.currentCity.text = address[0] + ", " + citta[0] + ", " + places[0].country;
                        $.currentCity.visible = true;
                        longitude = places[0].longitude;
                        latitude = places[0].latitude;
                        updateMap(longitude, latitude);
                    }
                    hideLoading();
                });
            }
        });
    };
    var locationCallbackAndroid = geolocation.locationCallbackAndroid;
    var configGeolocation = function() {
        if ("" != Ti.App.Properties.getString("geolocation")) {
            Ti.Geolocation.addEventListener("location", locationCallbackAndroid);
            debug_mode && Ti.API.info("Ti.Geolocation.addEventListener('location', locationCallbackAndroid);");
            posizioneCorrente();
        } else {
            Ti.Geolocation.removeEventListener("location", locationCallbackAndroid);
            debug_mode && Ti.API.info("Ti.Geolocation.removeEventListener('location', locationCallbackAndroid);");
        }
    };
    var checkGeolocation = function(e) {
        if (e.value) {
            $.currentCity.visible = false;
            $.currentCityRow.hasChild = true;
            $.currentCity.enabled = true;
            $.drawMapRow.hasChild = true;
            Ti.App.Properties.setString("geolocation", "GPSPosition");
            showLoading();
        } else {
            Ti.App.Properties.setString("geolocation", "");
            $.city.color = "#000";
            $.currentCity.color = "#000";
            $.currentCity.visible = true;
            $.currentCityRow.hasChild = true;
            $.drawMapLbl.color = "#000";
            $.drawMapRow.hasChild = true;
            hideLoading();
            $.currentCity.enabled = true;
        }
        configGeolocation();
    };
    {
        Titanium.UI.createAnimation({
            top: 0
        });
    }
    {
        Titanium.UI.createAnimation({
            top: -251
        });
    }
    var retriveAddressCoords = function(citta) {
        Titanium.Geolocation.forwardGeocoder(citta, function(evt) {
            currentLocation = {
                longitude: evt.longitude,
                latitude: evt.latitude
            };
            if (debug_mode) {
                Ti.API.info("Le coordinate della città '" + $.address.value + "' sono: " + JSON.stringify(currentLocation));
                Ti.API.info(JSON.stringify(evt));
            }
            if (evt.success) {
                $.currentCity.text = $.address.value;
                longitude = evt.longitude;
                latitude = evt.latitude;
                altitude = "0";
                updateMap(longitude, latitude);
                Ti.App.Properties.setString("cittaPredefinita", $.address.value);
                $.switchGeo.value = false;
                checkGeolocation({
                    value: false
                });
            } else {
                var alertDialog = Ti.UI.createAlertDialog({
                    title: "EarthServer",
                    message: "Address not found. \nPlease try a different address."
                });
                alertDialog.show();
            }
            hideLoading();
        });
    };
    $.switchGeo.value && checkGeolocation({
        value: true
    });
    var openDrawableMap = function() {
        if (!$.drawMapRow.hasChild) return;
        var retriveMapData = function(e) {
            drawableMapWin.close();
            Ti.API.info(JSON.stringify(e.mapData));
            drawableMapWin.removeEventListener("mapData", retriveMapData);
            if (e.mapData) {
                $.currentCity.text = "";
                var mapData = e.mapData;
                routeAdded && $.mapview.removeRoute(route);
                route = Alloy.Globals.Map.createRoute({
                    name: "Meeo draw map",
                    points: mapData.boundingBoxPoints,
                    color: "#c60000",
                    width: 4
                });
                cornerRegion.no.lng = mapData.coordinates[2];
                cornerRegion.ne.lng = mapData.coordinates[3];
                cornerRegion.se.lat = mapData.coordinates[0];
                cornerRegion.no.lat = mapData.coordinates[1];
                checkAvailableCoverage();
                routeAdded = true;
                $.mapview.removeAllAnnotations();
                $.mapview.addRoute(route);
                var region = findZoomRegion(mapData.boundingBoxPoints);
                $.mapview.setRegion(region);
                $.longitude.text = mapData.coordinates[2] + ", " + mapData.coordinates[3];
                $.latitude.text = mapData.coordinates[0] + ", " + mapData.coordinates[1];
                $.switchGeo.value = false;
                checkGeolocation({
                    value: false
                });
            }
        };
        var drawableMapWin;
        var drawableMapWin = Alloy.createController("/meeo/DrawableMapWin", {}).getView();
        drawableMapWin.open();
        drawableMapWin.addEventListener("mapData", retriveMapData);
    };
    var stringToDate = function(dateString) {
        var dateArray = dateString.replace(" 00:00:00", "");
        dateArray = dateArray.split("-");
        Ti.API.info(dateArray);
        return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    };
    var showCompilesData = function(coverageId, describeCoverageArrayIndex) {
        showLoading();
        var minDate = parseInt(describeCoverageArray[describeCoverageArrayIndex].spatialEnvelope.lowerCorner[2]);
        var maxDate = parseInt(describeCoverageArray[describeCoverageArrayIndex].spatialEnvelope.upperCorner[2]);
        var xml = describeCoverageArray[describeCoverageArrayIndex].xml;
        Ti.API.info("\n\n\n********\n Converto le date:\n" + minDate + "\n" + maxDate + "\n\n\n********\n");
        getDateFromTimeIndex(minDate, function(e) {
            if (e) {
                Ti.API.info("\n\n\n********\n Ho ricevuto la data minima: " + e + "\n\n\n********\n");
                stringToDate(e);
                minDate = stringToDate(e);
                Ti.API.info("La minDate è:" + minDate);
                getDateFromTimeIndex(maxDate, function(e) {
                    if (e) {
                        Ti.API.info("\n\n\n********\n Ho ricevuto la data massima: " + e + "\n\n\n********\n");
                        maxDate = stringToDate(e);
                        Ti.API.info("La maxDate è:" + maxDate);
                        var compileGetCoverageDataWin;
                        var compileGetCoverageDataWin = Alloy.createController("/meeo/CompileGetCoverageDataWin", {
                            x: $.longitude.text,
                            y: $.latitude.text,
                            d4: parseInt(describeCoverageArray[describeCoverageArrayIndex].spatialEnvelope.upperCorner[3]),
                            maxDate: maxDate,
                            minDate: minDate,
                            coverageId: coverageId,
                            xml: xml
                        }).getView();
                        compileGetCoverageDataWin.open();
                        hideLoading();
                    } else {
                        hideLoading();
                        var alertDialog = Ti.UI.createAlertDialog({
                            title: "EarthServer",
                            message: "A connection failure occurred. Please, try again."
                        });
                        alertDialog.show();
                    }
                });
            } else {
                var alertDialog = Ti.UI.createAlertDialog({
                    title: "EarthServer",
                    message: "A connection failure occurred. Please, try again."
                });
                alertDialog.show();
                hideLoading();
            }
        });
    };
    __defers["$.__views.switchGeo!change!checkGeolocation"] && $.__views.switchGeo.addEventListener("change", checkGeolocation);
    __defers["$.__views.currentCityRow!click!chooseFilter"] && $.__views.currentCityRow.addEventListener("click", chooseFilter);
    __defers["$.__views.drawMapRow!click!openDrawableMap"] && $.__views.drawMapRow.addEventListener("click", openDrawableMap);
    __defers["$.__views.tv!click!tvClick"] && $.__views.tv.addEventListener("click", tvClick);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    __defers["$.__views.doneBtn!click!filterChoosen"] && $.__views.doneBtn.addEventListener("click", filterChoosen);
    __defers["$.__views.cancelBtn!click!hidePickerView"] && $.__views.cancelBtn.addEventListener("click", hidePickerView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;