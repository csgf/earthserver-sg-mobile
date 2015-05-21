function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.n3wc.TiDrawableMap/" + s : s.substring(0, index) + "/com.n3wc.TiDrawableMap/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0001,
    key: "textColor",
    style: {
        color: "#000"
    }
}, {
    isClass: true,
    priority: 10000.0002,
    key: "meeoWin",
    style: {
        backgroundImage: "/images/bgImage.png"
    }
}, {
    isClass: true,
    priority: 10000.0005,
    key: "meeoTableViewRow",
    style: {
        height: "50dp",
        backgroundColor: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "meeoTitleRow",
    style: {
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "meeoOnlyTitleRow",
    style: {
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        height: Ti.API.WxsCss.titleHeight,
        right: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0008,
    key: "meeoDescriptionRow",
    style: {
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        bottom: "5dp",
        height: Ti.API.WxsCss.descriptionHeight,
        right: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "meeoTiSizeTableViewRow",
    style: {
        height: Ti.UI.SIZE,
        backgroundColor: "#fff"
    }
}, {
    isClass: true,
    priority: 10000.001,
    key: "meeoTiSizeTitleRow",
    style: {
        font: {
            fontSize: Ti.API.WxsCss.titleFontSize,
            fontWeight: "bold"
        },
        color: Ti.API.WxsCss.titleColor,
        left: "10dp",
        top: "5dp",
        height: Ti.UI.SIZE,
        right: "10dp"
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "meeoTiSizeDescriptionRow",
    style: {
        font: {
            fontSize: Ti.API.WxsCss.descriptionFontSize,
            fontWeight: "normal"
        },
        color: Ti.API.WxsCss.descriptionColor,
        left: "10dp",
        top: "25dp",
        bottom: "5dp",
        right: "10dp",
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10101.0004,
    key: "meeoTableView",
    style: {
        minRowHeight: "50dp",
        backgroundColor: "transparent",
        separatorColor: "gray"
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "TiDrawableMapContainer",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0014,
    key: "TiDrawableMapView",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        zIndex: 2
    }
}, {
    isId: true,
    priority: 100000.0015,
    key: "TiDrawableMapDrawingView",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        zIndex: 1
    }
} ];