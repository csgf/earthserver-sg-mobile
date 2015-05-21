function Controller() {
    function pauseStart() {
        if (pause) {
            $.imagesPng.start();
            $.speedLbl.color = "#838383";
            $.imagesPng.images = images;
            $.sliderImages.enabled = false;
            pause = false;
            $.pauseStartBtn.backgroundImage = "/pause.png";
        } else {
            $.imagesPng.stop();
            $.speedLbl.color = "#000";
            $.pauseStartBtn.backgroundImage = "/play.png";
            $.sliderImages.enabled = true;
            pause = true;
        }
    }
    function changeSliderImages(e) {
        if (pause) {
            var value = parseInt(e.value);
            0 >= value ? value = 0 : value >= images.length && (value = images.length - 1);
            Ti.API.info(value);
            $.imagesPng.image = images[value];
            $.titleLbl.text = pngWinTitleLbl + " + " + value + " h";
        }
    }
    function changeSliderOpacity(e) {
        var value = parseFloat(e.value).toFixed(2);
        0 >= value ? value = 0 : value >= 1 && (value = 1);
        Ti.API.info(value);
        $.imagesPng.opacity = value;
    }
    function lessSpeed() {
        if (!pause) return;
        duration > 0 && (duration = parseInt(duration) - 50);
        $.speedLbl.text = "Frame speed: " + duration + "ms";
        $.imagesPng.setDuration(duration);
    }
    function moreSpeed() {
        if (!pause) return;
        duration = parseInt(duration) + 50;
        $.speedLbl.text = "Frame speed: " + duration + "ms";
        $.imagesPng.setDuration(duration);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "meeo/ShowPngWin";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.showPngWin = Ti.UI.createWindow({
        id: "showPngWin",
        backgroundColor: "#fff",
        title: "MACC RAQ"
    });
    $.__views.showPngWin && $.addTopLevelView($.__views.showPngWin);
    $.__views.__alloyId179 = Ti.UI.createScrollView({
        layout: "vertical",
        top: "0dp",
        bottom: "0dp",
        width: "100%",
        showVerticalScrollIndicator: "true",
        id: "__alloyId179"
    });
    $.__views.showPngWin.add($.__views.__alloyId179);
    $.__views.titleLbl = Ti.UI.createLabel({
        top: "10dp",
        font: {
            fontSize: "14sp",
            fontWeight: "normal"
        },
        color: "#000",
        left: "10dp",
        right: "10dp",
        textAlign: "center",
        id: "titleLbl"
    });
    $.__views.__alloyId179.add($.__views.titleLbl);
    $.__views.imagesPng = Ti.UI.createImageView({
        top: "20dp",
        id: "imagesPng"
    });
    $.__views.__alloyId179.add($.__views.imagesPng);
    $.__views.__alloyId180 = Ti.UI.createView({
        top: "10dp",
        height: "50dp",
        id: "__alloyId180"
    });
    $.__views.__alloyId179.add($.__views.__alloyId180);
    $.__views.pauseStartBtn = Ti.UI.createButton({
        left: "10dp",
        width: "30dp",
        height: "30dp",
        backgroundImage: "/pause.png",
        id: "pauseStartBtn"
    });
    $.__views.__alloyId180.add($.__views.pauseStartBtn);
    pauseStart ? $.__views.pauseStartBtn.addEventListener("click", pauseStart) : __defers["$.__views.pauseStartBtn!click!pauseStart"] = true;
    $.__views.sliderImages = Ti.UI.createSlider({
        left: "50dp",
        right: "10dp",
        id: "sliderImages",
        enabled: "false"
    });
    $.__views.__alloyId180.add($.__views.sliderImages);
    changeSliderImages ? $.__views.sliderImages.addEventListener("change", changeSliderImages) : __defers["$.__views.sliderImages!change!changeSliderImages"] = true;
    $.__views.__alloyId181 = Ti.UI.createView({
        top: "10dp",
        height: "50dp",
        id: "__alloyId181"
    });
    $.__views.__alloyId179.add($.__views.__alloyId181);
    $.__views.speedIV = Ti.UI.createImageView({
        left: "10dp",
        width: "30dp",
        height: "30dp",
        image: "/speed.png",
        id: "speedIV"
    });
    $.__views.__alloyId181.add($.__views.speedIV);
    $.__views.speedLbl = Ti.UI.createLabel({
        font: {
            fontSize: "12sp",
            fontWeight: "normal"
        },
        color: "#000",
        left: "50dp",
        right: "90dp",
        text: "Frame speed: 100ms",
        id: "speedLbl"
    });
    $.__views.__alloyId181.add($.__views.speedLbl);
    $.__views.lessBtn = Ti.UI.createButton({
        right: "50dp",
        width: "30dp",
        height: "30dp",
        backgroundImage: "/less.png",
        zIndex: "10",
        id: "lessBtn"
    });
    $.__views.__alloyId181.add($.__views.lessBtn);
    lessSpeed ? $.__views.lessBtn.addEventListener("click", lessSpeed) : __defers["$.__views.lessBtn!click!lessSpeed"] = true;
    $.__views.moreBtn = Ti.UI.createButton({
        right: "10dp",
        width: "30dp",
        height: "30dp",
        backgroundImage: "/more.png",
        zIndex: "10",
        id: "moreBtn"
    });
    $.__views.__alloyId181.add($.__views.moreBtn);
    moreSpeed ? $.__views.moreBtn.addEventListener("click", moreSpeed) : __defers["$.__views.moreBtn!click!moreSpeed"] = true;
    $.__views.__alloyId182 = Ti.UI.createView({
        top: "10dp",
        height: "50dp",
        id: "__alloyId182"
    });
    $.__views.__alloyId179.add($.__views.__alloyId182);
    $.__views.opacityIV = Ti.UI.createImageView({
        left: "10dp",
        width: "30dp",
        height: "30dp",
        image: "/opacity.png",
        id: "opacityIV"
    });
    $.__views.__alloyId182.add($.__views.opacityIV);
    $.__views.sliderOpacity = Ti.UI.createSlider({
        left: "50dp",
        right: "10dp",
        value: 1,
        min: 0,
        max: 1,
        id: "sliderOpacity"
    });
    $.__views.__alloyId182.add($.__views.sliderOpacity);
    changeSliderOpacity ? $.__views.sliderOpacity.addEventListener("change", changeSliderOpacity) : __defers["$.__views.sliderOpacity!change!changeSliderOpacity"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var debug_mode = Alloy.Globals.debug_mode;
    var images = arguments[0].imagesPng;
    var pngWinTitleLbl = arguments[0].pngWinTitleLbl;
    var duration = 100;
    $.showPngWin.addEventListener("open", function() {
        var actionBar;
        if ($.showPngWin.activity) {
            actionBar = $.showPngWin.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.showPngWin.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    for (var i in images) {
        var f = Ti.Filesystem.getFile(images[i]).read();
        var imgW = f.width;
        var imgH = f.height;
        debug_mode && Ti.API.info("frame size: ---> " + imgW + "x" + imgH);
        if (100 > imgW && 100 > imgH) {
            imgW *= 3;
            imgH *= 3;
            debug_mode && Ti.API.info("resize 3x: ---> " + imgW + "x" + imgH);
        } else if (200 > imgW && 200 > imgH) {
            imgW *= 2;
            imgH *= 2;
            debug_mode && Ti.API.info("resize 2x: ---> " + imgW + "x" + imgH);
        }
        if (imgW > 0 && imgH > 0) {
            $.imagesPng.applyProperties({
                width: imgW + "dp",
                height: imgH + "dp"
            });
            break;
        }
    }
    $.titleLbl.text = pngWinTitleLbl + " + 0 h";
    $.imagesPng.images = images;
    $.imagesPng.start();
    $.sliderImages.applyProperties({
        min: 0,
        max: images.length - 1
    });
    $.speedLbl.color = "#838383";
    $.imagesPng.addEventListener("change", function(e) {
        Ti.API.info(e.index);
        $.sliderImages.value = e.index;
        $.titleLbl.text = pngWinTitleLbl + " + " + e.index + " h";
    });
    var pause = false;
    __defers["$.__views.pauseStartBtn!click!pauseStart"] && $.__views.pauseStartBtn.addEventListener("click", pauseStart);
    __defers["$.__views.sliderImages!change!changeSliderImages"] && $.__views.sliderImages.addEventListener("change", changeSliderImages);
    __defers["$.__views.lessBtn!click!lessSpeed"] && $.__views.lessBtn.addEventListener("click", lessSpeed);
    __defers["$.__views.moreBtn!click!moreSpeed"] && $.__views.moreBtn.addEventListener("click", moreSpeed);
    __defers["$.__views.sliderOpacity!change!changeSliderOpacity"] && $.__views.sliderOpacity.addEventListener("change", changeSliderOpacity);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;