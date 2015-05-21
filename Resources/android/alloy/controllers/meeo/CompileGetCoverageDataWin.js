function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/CompileGetCoverageDataWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.compileGetCoverageDataWin = Ti.UI.createWindow({
        backgroundImage: "/images/bgImage.png",
        id: "compileGetCoverageDataWin",
        title: "Compiles data"
    });
    $.__views.compileGetCoverageDataWin && $.addTopLevelView($.__views.compileGetCoverageDataWin);
    var __alloyId88 = [];
    $.__views.__alloyId89 = Ti.UI.createTableViewSection({
        headerTitle: "Coverage info",
        id: "__alloyId89"
    });
    __alloyId88.push($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "true",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    showDescribeCoverage ? $.__views.__alloyId90.addEventListener("click", showDescribeCoverage) : __defers["$.__views.__alloyId90!click!showDescribeCoverage"] = true;
    $.__views.coverageName = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        id: "coverageName"
    });
    $.__views.__alloyId90.add($.__views.coverageName);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        text: "Show describeCoverage info",
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createTableViewSection({
        headerTitle: "Request parameters",
        id: "__alloyId92"
    });
    __alloyId88.push($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createLabel({
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
        id: "__alloyId94"
    });
    $.__views.__alloyId93.add($.__views.__alloyId94);
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
    $.__views.__alloyId93.add($.__views.longitude);
    $.__views.__alloyId95 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId95"
    });
    $.__views.__alloyId92.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createLabel({
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
        id: "__alloyId96"
    });
    $.__views.__alloyId95.add($.__views.__alloyId96);
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
    $.__views.__alloyId95.add($.__views.latitude);
    $.__views.__alloyId97 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId97"
    });
    $.__views.__alloyId92.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp",
        text: "Elevation (z)",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.d4 = Ti.UI.createLabel({
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp",
        id: "d4"
    });
    $.__views.__alloyId97.add($.__views.d4);
    $.__views.moreBtn = Ti.UI.createButton({
        height: "30dp",
        width: "30dp",
        borderWidth: "1",
        borderRadius: "5",
        borderColor: "#000",
        color: "#000",
        font: {
            fontSize: "20sp",
            fontWeight: "bold"
        },
        id: "moreBtn",
        title: "+",
        right: "10dp",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId97.add($.__views.moreBtn);
    more ? $.__views.moreBtn.addEventListener("click", more) : __defers["$.__views.moreBtn!click!more"] = true;
    $.__views.lessBtn = Ti.UI.createButton({
        height: "30dp",
        width: "30dp",
        borderWidth: "1",
        borderRadius: "5",
        borderColor: "#000",
        color: "#000",
        font: {
            fontSize: "20sp",
            fontWeight: "bold"
        },
        id: "lessBtn",
        title: "-",
        right: "50dp",
        backgroundColor: "#f0f0f0"
    });
    $.__views.__alloyId97.add($.__views.lessBtn);
    less ? $.__views.lessBtn.addEventListener("click", less) : __defers["$.__views.lessBtn!click!less"] = true;
    $.__views.__alloyId99 = Ti.UI.createTableViewSection({
        headerTitle: "Choose date (t)",
        id: "__alloyId99"
    });
    __alloyId88.push($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: "#fff",
        hasChild: "false",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        type: Ti.UI.PICKER_TYPE_DATE,
        backgroundColor: "#000"
    });
    $.__views.__alloyId100.add($.__views.picker);
    $.__views.tv = Ti.UI.createTableView({
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray",
        data: __alloyId88,
        id: "tv"
    });
    $.__views.compileGetCoverageDataWin.add($.__views.tv);
    $.__views.loadingView = Ti.UI.createView({
        id: "loadingView",
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
        opacity: "0.4",
        visible: "false",
        zIndex: "10"
    });
    $.__views.compileGetCoverageDataWin.add($.__views.loadingView);
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
    $.__views.compileGetCoverageDataWin.add($.__views.activityIndicatorView);
    $.__views.loadingForecastView = Ti.UI.createView({
        id: "loadingForecastView",
        backgroundColor: "#000",
        width: "300dp",
        height: "200dp",
        visible: "false",
        zIndex: "10",
        borderRadius: "15"
    });
    $.__views.compileGetCoverageDataWin.add($.__views.loadingForecastView);
    $.__views.activityIndicatorForecast = Ti.UI.createActivityIndicator({
        font: {
            fontSize: "26dp",
            fontWeight: "bold"
        },
        color: "#fff",
        message: "Loading...",
        visible: false,
        id: "activityIndicatorForecast",
        style: Ti.UI.ActivityIndicatorStyle.BIG,
        zIndex: "11",
        top: "0dp"
    });
    $.__views.loadingForecastView.add($.__views.activityIndicatorForecast);
    $.__views.pb = Ti.UI.createProgressBar({
        id: "pb",
        width: "250",
        height: "auto",
        min: "0",
        max: "97",
        value: "1",
        color: "#fff",
        message: "Downloading 1 of 97 images"
    });
    $.__views.loadingForecastView.add($.__views.pb);
    $.__views.stopDownloadBtn = Ti.UI.createButton({
        id: "stopDownloadBtn",
        title: "Stop download",
        bottom: "10dp"
    });
    $.__views.loadingForecastView.add($.__views.stopDownloadBtn);
    stopDownload ? $.__views.stopDownloadBtn.addEventListener("click", stopDownload) : __defers["$.__views.stopDownloadBtn!click!stopDownload"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var debug_mode = Alloy.Globals.debug_mode;
    $.longitude.text = arguments[0].x;
    $.latitude.text = arguments[0].y;
    $.d4.text = "0";
    $.picker.applyProperties({
        minDate: arguments[0].minDate,
        maxDate: arguments[0].maxDate,
        value: arguments[0].minDate
    });
    $.coverageName.text = arguments[0].coverageId;
    var d4Max = arguments[0].d4;
    var coverageId = arguments[0].coverageId;
    var xml = arguments[0].xml;
    var stopDownloadValue = false;
    var isDownloading = false;
    var imagesPng = [];
    var serversMeeo = [];
    Ti.App.Properties.hasProperty("serversMeeo") && (serversMeeo = Ti.App.Properties.getList("serversMeeo"));
    $.compileGetCoverageDataWin.addEventListener("open", function() {
        var actionBar;
        if ($.compileGetCoverageDataWin.activity) {
            actionBar = $.compileGetCoverageDataWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.compileGetCoverageDataWin.close();
                };
                $.compileGetCoverageDataWin.getActivity().onCreateOptionsMenu = function(e) {
                    var doneBtn = e.menu.add({
                        title: "Send",
                        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                    });
                    doneBtn.addEventListener("click", function() {
                        getCoverage();
                    });
                };
                $.compileGetCoverageDataWin.getActivity().invalidateOptionsMenu();
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.compileGetCoverageDataWin.addEventListener("close", function() {
        for (var i = 1; 96 >= i; i++) {
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, i + ".png");
            f.exists() && f.deleteFile();
        }
    });
    var showLoading = function() {
        $.activityIndicatorView.show();
        $.loadingView.show();
    };
    var hideLoading = function() {
        $.activityIndicatorView.hide();
        $.loadingView.hide();
    };
    var showForecastLoading = function() {
        $.activityIndicatorForecast.show();
        $.loadingView.show();
        $.pb.show();
        $.loadingForecastView.show();
    };
    var hideForecastLoading = function() {
        $.activityIndicatorForecast.hide();
        $.loadingView.hide();
        $.pb.hide();
        $.loadingForecastView.hide();
        stopDownloadValue = false;
    };
    var more = function() {
        var d4Value = parseInt($.d4.text);
        if (d4Max > d4Value) {
            $.lessBtn.backgroundColor = "#fff";
            $.d4.text = d4Value + 1 + "";
        }
        d4Value === d4Max - 1 && ($.moreBtn.backgroundColor = "#f0f0f0");
    };
    var less = function() {
        var d4Value = parseInt($.d4.text);
        if (d4Value > 0) {
            $.moreBtn.backgroundColor = "#fff";
            $.d4.text = d4Value - 1 + "";
        }
        1 === d4Value && ($.lessBtn.backgroundColor = "#f0f0f0");
    };
    var convertData = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        10 > m && (m = "0" + m);
        var d = date.getDate();
        10 > d && (d = "0" + d);
        return y + "-" + m + "-" + d;
    };
    var getTimeIndexFromDate = function(date, callback) {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var timeIndex = this.responseText;
            callback(timeIndex);
        };
        xhr.onerror = function() {
            Ti.API.error(this.status + " - " + this.statusText);
            callback(null);
        };
        xhr.timeout = 1e4;
        var strRequest = "http://glibrary.ct.infn.it/django/retrieveIndex/" + date;
        Ti.API.info("getTimeIndexFromDate : strRequest ---> " + strRequest);
        xhr.open("GET", strRequest);
        xhr.send();
    };
    var getCoverage = function() {
        if (isDownloading) return;
        imagesPng = [];
        var checkLongitude = $.longitude.text.split(",");
        var checkLatitude = $.latitude.text.split(",");
        if (debug_mode) {
            Ti.API.info(JSON.stringify(checkLongitude));
            Ti.API.info(JSON.stringify(checkLatitude));
        }
        if (!(1e6 * checkLongitude[0] == 1e6 * checkLongitude[1] && 1e6 * checkLatitude[0] == 1e6 * checkLatitude[1])) {
            hideLoading();
            showForecastLoading();
            var time = convertData($.picker.value);
            getTimeIndexFromDate(time, function(e) {
                if (e) {
                    Ti.API.info("\n\n\n********\n Ho ricevuto il timeIndex: " + e + "\n\n\n********\n");
                    timeIndex = e;
                    Ti.API.info("Il timeIndex è: " + timeIndex);
                    downloadPng(0, timeIndex);
                } else {
                    var alertDialog = Ti.UI.createAlertDialog({
                        title: "EarthServer",
                        message: "An error occurred, please try again"
                    });
                    alertDialog.show();
                    hideForecastLoading();
                }
            });
            return;
        }
        var time = convertData($.picker.value);
        var strRequest = "";
        strRequest = serversMeeo[0].url;
        strRequest += "?service=WCS";
        strRequest += "&request=GetCoverage";
        strRequest += "&version=" + serversMeeo[0].serviceTypeVersion;
        strRequest += "&subsetX=x(" + $.longitude.text.replace(/ /g, "") + ")";
        strRequest += "&subsetY=y(" + $.latitude.text.replace(/ /g, "") + ")";
        strRequest += "&subsetT=t(" + time + ")";
        strRequest += "&subset=d4(" + $.d4.text + ")";
        strRequest += "&CoverageId=" + coverageId;
        Ti.API.info("strRequest ----> " + strRequest);
        showLoading();
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var xmlText = this.responseText;
            debug_mode && Ti.API.info(this.responseText);
            var tuplesArray = [];
            var tupleValuesArray = [];
            var start = xmlText.indexOf("<tupleList>");
            var end = xmlText.indexOf("</tupleList>");
            tuplesArray = xmlText.slice(start + 11, end);
            debug_mode && Ti.API.info(tuplesArray.length);
            if (1e3 > tuplesArray.length) {
                tuplesArray = tuplesArray.split(",");
                tupleValuesArray = tuplesArray[0].split(" ");
                debug_mode && Ti.API.info(JSON.stringify(tupleValuesArray));
                for (i in tupleValuesArray) tupleValuesArray[i] = 1e3 * parseFloat(tupleValuesArray[i]).toFixed(3);
                debug_mode && Ti.API.info(JSON.stringify(tupleValuesArray));
                var startDate = [ $.picker.value.getFullYear(), $.picker.value.getMonth(), $.picker.value.getDate() ];
                var dateMax = new Date($.picker.value.getFullYear(), $.picker.value.getMonth(), $.picker.value.getDate() + 4);
                var dateRange = String.formatDate($.picker.value, "medium") + " - " + String.formatDate(dateMax, "medium");
                var x = $.longitude.text.split(",");
                var y = $.latitude.text.split(",");
                var chartData = {
                    coordinates: "x(" + x[0] + "), y(" + y[0] + "), z(" + $.d4.text + ")",
                    yAxis: coverageId.replace("HRES_ENS", "").replace("CONC_4326_01", "").replace("PM2P5", "PM2.5"),
                    dateRange: dateRange,
                    coverageId: coverageId,
                    tupleValues: tupleValuesArray,
                    startDate: startDate
                };
                var chartWin;
                var chartWin = Alloy.createController("/meeo/ChartWin", {
                    chartData: chartData
                }).getView();
                chartWin.open();
                hideLoading();
            }
        };
        xhr.onerror = function() {
            alert("There was an error retrieving the remote data.\nPlease, try again.");
            hideLoading();
        };
        xhr.autoEncodeUrl = false;
        xhr.setTimeout(6e4);
        xhr.open("GET", strRequest);
        xhr.send();
    };
    var showDescribeCoverage = function() {
        var describeCoverageWin;
        var describeCoverageWin = Alloy.createController("/meeo/DescribeCoverageWin", {
            xmlText: xml
        }).getView();
        describeCoverageWin.open();
    };
    var stopDownload = function() {
        stopDownloadValue = true;
        isDownloading = false;
    };
    var downloadPng = function(index, timeIndex) {
        if (stopDownloadValue) {
            hideForecastLoading();
            openShowPngWin();
            return;
        }
        isDownloading = true;
        $.pb.message = "Downloading " + (index + 1) + " of 97 images";
        $.pb.value = index + 1;
        var strRequest = "";
        strRequest = "http://earthserver.services.meeo.it/petascope/WCS";
        strRequest += "?query=for%20data%20in%20(" + coverageId + ")";
        strRequest += "%20return%20encode((data%5B%20x(" + $.longitude.text.replace(/ /g, "").replace(",", "%3A") + ")";
        strRequest += "%2C%20y(" + $.latitude.text.replace(/ /g, "").replace(",", "%3A") + ")";
        strRequest += "%2C%20t(" + timeIndex + ")";
        strRequest += "%2Cd4(" + $.d4.text + ")%5D)." + index + "%2C%22png%22)";
        Ti.API.info("downloadPng strRequest ---> " + strRequest);
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var png = this.responseData;
            var image = index + ".png";
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, image);
            f.write(png);
            imagesPng.push(Ti.Filesystem.applicationDataDirectory + image);
            if (96 > index) {
                index++;
                downloadPng(index, timeIndex);
            } else {
                hideForecastLoading();
                Ti.API.info("Download completed");
                openShowPngWin();
            }
        };
        xhr.onerror = function() {
            if (96 > index) {
                Ti.API.info("It was not possible to download the image with index ---> " + index);
                index++;
                downloadPng(index, timeIndex);
            } else {
                hideForecastLoading();
                Ti.API.info("Download completed");
                openShowPngWin();
            }
        };
        xhr.autoEncodeUrl = false;
        xhr.setTimeout(6e4);
        xhr.open("GET", strRequest);
        xhr.send();
    };
    var openShowPngWin = function() {
        isDownloading = false;
        $.longitude.text.split(",");
        $.latitude.text.split(",");
        var pngWinTitleLbl = coverageId.replace("HRES_ENS", "").replace("CONC_4326_01", "").replace("PM2P5", "PM2.5");
        pngWinTitleLbl += "\nx(" + $.longitude.text + ")";
        pngWinTitleLbl += "\ny(" + $.latitude.text + ")";
        pngWinTitleLbl += "\nz(" + $.d4.text + ")";
        pngWinTitleLbl += "\n" + String.formatDate($.picker.value, "medium") + " 00:00 ";
        var showPngWin;
        var showPngWin = Alloy.createController("/meeo/ShowPngWin", {
            imagesPng: imagesPng,
            pngWinTitleLbl: pngWinTitleLbl
        }).getView();
        showPngWin.open();
    };
    __defers["$.__views.__alloyId87!click!getCoverage"] && $.__views.__alloyId87.addEventListener("click", getCoverage);
    __defers["$.__views.__alloyId90!click!showDescribeCoverage"] && $.__views.__alloyId90.addEventListener("click", showDescribeCoverage);
    __defers["$.__views.moreBtn!click!more"] && $.__views.moreBtn.addEventListener("click", more);
    __defers["$.__views.lessBtn!click!less"] && $.__views.lessBtn.addEventListener("click", less);
    __defers["$.__views.stopDownloadBtn!click!stopDownload"] && $.__views.stopDownloadBtn.addEventListener("click", stopDownload);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;