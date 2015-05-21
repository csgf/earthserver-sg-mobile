function removeTable() {
    win.remove(tblServer);
}

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

var w = 0;

var h = 0;

if (pHeight > pWidth) {
    w = pWidth;
    h = pHeight;
} else {
    h = pWidth;
    w = pHeight;
}

Ti.Gesture.addEventListener("orientationchange", function() {
    pWidth = Ti.Platform.displayCaps.platformWidth;
    pHeight = Ti.Platform.displayCaps.platformHeight;
    if (pHeight > pWidth) {
        w = pWidth;
        h = pHeight;
    } else {
        h = pWidth;
        w = pHeight;
    }
});

var data = [];

var tblServer = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: 272,
    top: 120,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2,
    moving: true,
    moveable: true
});

win.add(tblServer);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddServer_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width
});

var descriptionRow = Titanium.UI.createLabel({
    text: win.service,
    font: {
        fontSize: 22,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    height: 55,
    width: row.width
});

row.add(titleRow);

row.add(descriptionRow);

data.push(row);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddServer_row2_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width
});

var descriptionRow = Titanium.UI.createLabel({
    text: win.name,
    font: {
        fontSize: 22,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    height: 55,
    width: row.width
});

row.add(titleRow);

row.add(descriptionRow);

data.push(row);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddServer_row3_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    height: 30,
    width: row.width
});

var descriptionRow = Titanium.UI.createLabel({
    text: win.urlServer,
    font: {
        fontSize: 22,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    height: 55,
    width: row.width
});

row.add(titleRow);

row.add(descriptionRow);

data.push(row);

tblServer.data = data;

var btnAddServer = Titanium.UI.createButton({
    title: L("AddServer_button_title"),
    font: {
        fontSize: 18,
        fontFamily: "Helvetica Neue",
        fontWeight: "bold"
    },
    top: 10,
    right: 10,
    width: Math.round(w / 4),
    height: Math.round(h / 12),
    backgroundImage: "/images/button.png"
});

btnAddServer.addEventListener("click", function() {
    var addedServers = [];
    Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));
    var existServer = false;
    for (var i = 0; addedServers.length > i; i++) addedServers[i].url == win.urlServer && (existServer = true);
    if (true == existServer) Ti.UI.createAlertDialog({
        message: String.format(L("AddServer_existServer_message"), win.urlServer),
        ok: "OK",
        title: L("AddServer_existServer_title")
    }).show(); else {
        var indicatorStyle;
        indicatorStyle = Ti.UI.ActivityIndicatorStyle.DARK;
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
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var xmlText = this.responseText;
            var covArray = [];
            var newServer = {
                name: tblServer.data[0].rows[1].children[1].text,
                type: tblServer.data[0].rows[0].children[1].text,
                url: tblServer.data[0].rows[2].children[1].text,
                getCapabilities: xmlText,
                describeCoverageArray: covArray
            };
            addedServers.push(newServer);
            Ti.App.Properties.setList("addedServers", addedServers);
            var dialog = Ti.UI.createAlertDialog({
                message: String.format(L("AddServer_OkDialog_message"), win.service),
                ok: "OK",
                title: L("AddServer_OkDialog_title")
            });
            dialog.addEventListener("click", function() {
                Ti.API.info("The cancel button was clicked");
                win.close();
            });
            actInd.hide();
            dialog.show();
        };
        xhr.onerror = function() {
            alert(L("AddServer_ErrorDialog_message"));
        };
        var strRequest = win.urlServer + "?Service=" + win.service + "&Request=GetCapabilities";
        xhr.open("GET", strRequest);
        xhr.send();
    }
});

win.add(btnAddServer);

win.addEventListener("blur", removeTable);

btnAddServer.addEventListener("touchstart", function() {
    btnAddServer.backgroundImage = "/images/button_focused.png";
});

btnAddServer.addEventListener("touchend", function() {
    btnAddServer.backgroundImage = "/images/button.png";
});