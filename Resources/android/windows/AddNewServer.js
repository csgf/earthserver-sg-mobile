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

var data = [];

var tblServer = Titanium.UI.createTableView({
    width: w - 20,
    height: 272,
    top: btnAddServer.top + btnAddServer.height + 10,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

win.add(tblServer);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddNewServer_row1_title"),
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
    text: "WCS",
    font: {
        fontSize: 22,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    height: 55,
    width: 80
});

row.add(titleRow);

row.add(descriptionRow);

var updatedRow = row;

var optService = {
    cancel: 1,
    options: [ "WCS", "WMS" ],
    selectedIndex: 0,
    destructive: 0,
    title: L("AddNewServer_OptionDialog_title")
};

row.addEventListener("click", function() {
    var dialog = Ti.UI.createOptionDialog(optService);
    dialog.addEventListener("click", function(e) {
        if (0 == e.index) {
            optService.selectedIndex = 0;
            updatedRow.children[1].text = "WCS";
            tblServer.updateRow(0, updatedRow);
        } else {
            optService.selectedIndex = 1;
            updatedRow.children[1].text = "WMS";
            tblServer.updateRow(0, updatedRow);
        }
    });
    dialog.show();
});

data.push(row);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddNewServer_row2_title"),
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

var txtName = Ti.UI.createTextField({
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
    hintText: L("AddNewServer_row2_hintText")
});

row.add(titleRow);

row.add(txtName);

data.push(row);

var row = Titanium.UI.createTableViewRow({
    width: tblServer.width,
    height: 90,
    hasChild: false,
    className: "server-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("AddNewServer_row3_title"),
    font: {
        fontSize: 24,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: 5,
    width: row.width,
    height: 30
});

var txtUrl = Ti.UI.createTextField({
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
    hintText: L("AddNewServer_row3_hintText")
});

row.add(titleRow);

row.add(txtUrl);

data.push(row);

tblServer.data = data;

btnAddServer.addEventListener("click", function() {
    var emptyFields = false;
    "" === txtName.value && (emptyFields = true);
    "" === txtUrl.value && (emptyFields = true);
    if (false == emptyFields) {
        var avalaibleServers = [];
        Ti.App.Properties.hasProperty("avalaibleServers") && (avalaibleServers = Ti.App.Properties.getList("avalaibleServers"));
        var existServer = false;
        for (var i = 0; avalaibleServers.length > i; i++) avalaibleServers[i].url == txtUrl.value && avalaibleServers[i].type == optService.options[optService.selectedIndex] && (existServer = true);
        if (true == existServer) Ti.UI.createAlertDialog({
            message: String.format(L("AddServer_existServer_message"), txtUrl.value),
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
                var newAvailableServer = {
                    name: txtName.value,
                    type: optService.options[optService.selectedIndex],
                    url: txtUrl.value
                };
                avalaibleServers.push(newAvailableServer);
                Ti.App.Properties.setList("avalaibleServers", avalaibleServers);
                var addedServers = [];
                Ti.App.Properties.hasProperty("addedServers") && (addedServers = Ti.App.Properties.getList("addedServers"));
                var covArray = [];
                var newServer = {
                    name: txtName.value,
                    type: optService.options[optService.selectedIndex],
                    url: txtUrl.value,
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
            var strRequest = txtUrl.value + "?Service=" + optService.options[optService.selectedIndex] + "&Request=GetCapabilities";
            xhr.open("GET", strRequest);
            xhr.send();
        }
    } else Ti.UI.createAlertDialog({
        message: L("AddNewServer_EmptyFields_message"),
        ok: "OK",
        title: L("AddNewServer_EmptyFields_title")
    }).show();
});

win.add(btnAddServer);

btnAddServer.addEventListener("touchstart", function() {
    btnAddServer.backgroundImage = "/images/button_focused.png";
});

btnAddServer.addEventListener("touchend", function() {
    btnAddServer.backgroundImage = "/images/button.png";
});