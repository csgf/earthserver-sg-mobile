function Controller() {
    function loadFromGallery() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                $.iv.image = e.media;
            }
        });
    }
    function loadFromCamera() {
        Ti.Media.showCamera({
            success: function(e) {
                $.iv.image = e.media;
            }
        });
    }
    function startUpload() {
        if (!$.titleTxt.value) {
            alert("Please set a title");
            return;
        }
        $.uploadBtn.enabled = false;
        var filename = $.titleTxt.value.replace(/ /g, "_") + ".jpg";
        var url = Alloy.Globals.gateway + "dm/put/vo.indicate-project.eu/" + filename + "/" + "infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/";
        Ti.API.info(url);
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            var response = JSON.parse(xhr.responseText);
            Ti.API.info(JSON.stringify(response));
            if ("409" == response.status) {
                alert(response.reason + ": file exists");
                $.uploadBtn.enabled = true;
            }
            "307" == response.status && uploadFile(response.redirect);
            Ti.API.info(JSON.stringify(response));
        };
        xhr.onerror = function(e) {
            alert(e);
            $.uploadBtn.enabled = true;
        };
        xhr.open("GET", url);
        xhr.send();
    }
    function storeMetadata(filename, _callback) {
        metadata = {};
        metadata.Title = $.titleTxt.value;
        metadata.Description = $.descTxt.value;
        metadata.Keywords = $.kwTxt.value;
        metadata.FileName = filename;
        metadata.Size = $.iv.image.length;
        metadata.FileType = "JPG";
        var net = require("net");
        metadata.User = net.username;
        var url = "https://infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + filename;
        metadata.Replica = url;
        var thumbFile = Ti.Filesystem.applicationDataDirectory + filename;
        var f = Ti.Filesystem.getFile(thumbFile).read();
        metadata.Thumbnail = Ti.Utils.base64encode(f).text.replace(/\r\n/g, "");
        Ti.API.info(JSON.stringify(metadata));
        Ti.API.info("in storeMetadata");
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            Ti.API.info(xhr.responseText);
            var resp = JSON.parse(xhr.responseText);
            resp.success && _callback(true);
        };
        xhr.onerror = function(e) {
            Ti.API.info(JSON.stringify(e.error));
            alert(e);
            $.uploadBtn.enabled = true;
        };
        xhr.open("POST", Alloy.Globals.gateway + "glibrary/addEntry/aginfra/Demo/");
        xhr.send(metadata);
    }
    function uploadFile(url) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            Ti.API.info(xhr.responseText);
            var filename = $.titleTxt.value.replace(/ /g, "_") + ".jpg";
            var thumbFile = Ti.Filesystem.applicationDataDirectory + filename;
            var f = Ti.Filesystem.getFile(thumbFile);
            f.write($.iv.image.imageAsThumbnail(70, 1, 5));
            Ti.API.info("prima di storeMetadata");
            storeMetadata(filename, function(e) {
                if (e) {
                    $.uploadBtn.enabled = true;
                    $.titleTxt.value = "";
                    $.descTxt.value = "";
                    $.kwTxt.value = "";
                    $.iv.image = "/appicon.png";
                    $.progress.value = 0;
                }
            });
        };
        xhr.onerror = function(e) {
            alert(e);
            $.uploadBtn.enabled = true;
        };
        xhr.onsendstream = function(e) {
            Ti.API.info("sono su onsendstream");
            Ti.API.info(JSON.stringify(e));
            $.progress.value = e.progress;
        };
        Ti.API.info("Upload URL:" + url);
        xhr.open("PUT", url);
        xhr.send($.iv.image);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "UploadWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.UploadWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        title: "Upload",
        id: "UploadWindow"
    });
    $.__views.UploadWindow && $.addTopLevelView($.__views.UploadWindow);
    var __alloyId22 = [];
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        id: "__alloyId23"
    });
    __alloyId22.push($.__views.__alloyId23);
    $.__views.titleTxt = Ti.UI.createTextField({
        height: "50dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Ti.UI.FILL,
        left: "5dp",
        id: "titleTxt",
        hintText: "Title"
    });
    $.__views.__alloyId23.add($.__views.titleTxt);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        id: "__alloyId24"
    });
    __alloyId22.push($.__views.__alloyId24);
    $.__views.descTxt = Ti.UI.createTextArea({
        height: "100dp",
        color: "grey",
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Ti.UI.FILL,
        id: "descTxt",
        value: "Description"
    });
    $.__views.__alloyId24.add($.__views.descTxt);
    $.__views.__alloyId25 = Ti.UI.createTableViewRow({
        id: "__alloyId25"
    });
    __alloyId22.push($.__views.__alloyId25);
    $.__views.kwTxt = Ti.UI.createTextField({
        height: "50dp",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        width: Ti.UI.FILL,
        left: "5dp",
        id: "kwTxt",
        hintText: "Keywords"
    });
    $.__views.__alloyId25.add($.__views.kwTxt);
    $.__views.__alloyId21 = Ti.UI.createTableView({
        height: "230dp",
        data: __alloyId22,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        id: "__alloyId21"
    });
    $.__views.UploadWindow.add($.__views.__alloyId21);
    $.__views.__alloyId26 = Ti.UI.createView({
        layout: "horizontal",
        height: "50dp",
        id: "__alloyId26"
    });
    $.__views.UploadWindow.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createButton({
        top: "10dp",
        height: "40dp",
        width: "145dp",
        left: "10dp",
        title: "Load from Gallery",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    loadFromGallery ? $.__views.__alloyId27.addEventListener("click", loadFromGallery) : __defers["$.__views.__alloyId27!click!loadFromGallery"] = true;
    $.__views.__alloyId28 = Ti.UI.createButton({
        top: "10dp",
        height: "40dp",
        width: "145dp",
        left: "10dp",
        title: "Load from Camera",
        id: "__alloyId28"
    });
    $.__views.__alloyId26.add($.__views.__alloyId28);
    loadFromCamera ? $.__views.__alloyId28.addEventListener("click", loadFromCamera) : __defers["$.__views.__alloyId28!click!loadFromCamera"] = true;
    $.__views.progress = Ti.UI.createProgressBar({
        top: "10dp",
        width: "95%",
        height: "auto",
        min: "0",
        max: "1",
        value: "0",
        id: "progress"
    });
    $.__views.UploadWindow.add($.__views.progress);
    $.__views.__alloyId29 = Ti.UI.createView({
        id: "__alloyId29"
    });
    $.__views.UploadWindow.add($.__views.__alloyId29);
    $.__views.iv = Ti.UI.createImageView({
        left: "10dp",
        top: "10dp",
        width: "50dp",
        height: "50dp",
        id: "iv",
        image: "/appicon.png"
    });
    $.__views.__alloyId29.add($.__views.iv);
    $.__views.uploadBtn = Ti.UI.createButton({
        top: "10dp",
        height: "50dp",
        right: "10dp",
        id: "uploadBtn",
        title: " Start Upload"
    });
    $.__views.__alloyId29.add($.__views.uploadBtn);
    startUpload ? $.__views.uploadBtn.addEventListener("click", startUpload) : __defers["$.__views.uploadBtn!click!startUpload"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.progress.show();
    __defers["$.__views.__alloyId27!click!loadFromGallery"] && $.__views.__alloyId27.addEventListener("click", loadFromGallery);
    __defers["$.__views.__alloyId28!click!loadFromCamera"] && $.__views.__alloyId28.addEventListener("click", loadFromCamera);
    __defers["$.__views.uploadBtn!click!startUpload"] && $.__views.uploadBtn.addEventListener("click", startUpload);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;