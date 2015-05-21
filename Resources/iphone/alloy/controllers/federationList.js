function Controller() {
    function openIdpList(e) {
        if ("NotSure" == e.row.name) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Register", "Cancel" ],
                message: "In case you do not belong to any of the shown Identity Federations, or you are not sure you do, you are welcome to register to our Identity Provider Open. When registration procedure will be completed, you can sign in again and select GrIDP as your Identity Federation and then IDPOPEN GARR as your Identity Provider",
                title: "Suggestion"
            });
            dialog.addEventListener("click", function(e) {
                0 == e.index && Ti.Platform.openURL("https://idpopen.garr.it/register");
            });
            dialog.show();
            return;
        }
        var idpsData = [];
        if ("GrIDP" == e.row.name) for (var i = 0; e.row.idps.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                height: 70
            });
            row.add(Ti.UI.createImageView({
                image: encodeURI(e.row.idps[i].flag),
                left: "25dp",
                top: "5dp",
                width: "40dp"
            }));
            row.add(Ti.UI.createLabel({
                text: e.row.idps[i].country,
                textAlign: "center",
                bottom: 5,
                left: 0,
                width: "90dp",
                font: {
                    fontSize: "12dp"
                }
            }));
            row.add(Ti.UI.createLabel({
                text: e.row.idps[i].displayName,
                left: "90dp",
                right: "70dp",
                font: {
                    fontSize: "18dp",
                    fontWeight: "bold"
                }
            }));
            row.add(Ti.UI.createImageView({
                image: encodeURI(e.row.idps[i].logo),
                right: 5,
                width: "60dp"
            }));
            row.name = e.row.idps[i].displayName;
            row.origin = e.row.idps[i].origin;
            row.class = "IdpList";
            "IDPOPEN GARR" == row.name ? idpsData.unshift(row) : idpsData.push(row);
        } else for (var i = 0; e.row.idps.length > i; i++) idpsData[i] = {
            title: e.row.idps[i].displayName,
            name: e.row.idps[i].displayName,
            origin: e.row.idps[i].origin,
            color: "black",
            hasChild: true
        };
        var idpListWindow;
        var idpListWindow = Alloy.createController("IdpList", {
            data: idpsData,
            navGroup: $.federationList.navGroup
        }).getView();
        $.federationList.navGroup.openWindow(idpListWindow);
    }
    function openWelcomeScreen() {
        var welcomeWindow = Alloy.createController("WelcomeScreen").getView();
        welcomeWindow.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "federationList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.federationList = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Choose a Federation",
        id: "federationList"
    });
    $.__views.federationList && $.addTopLevelView($.__views.federationList);
    $.__views.__alloyId40 = Ti.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
        id: "__alloyId40"
    });
    openWelcomeScreen ? $.__views.__alloyId40.addEventListener("click", openWelcomeScreen) : __defers["$.__views.__alloyId40!click!openWelcomeScreen"] = true;
    $.__views.federationList.rightNavButton = $.__views.__alloyId40;
    $.__views.federationsTableView = Ti.UI.createTableView({
        id: "federationsTableView"
    });
    $.__views.federationList.add($.__views.federationsTableView);
    openIdpList ? $.__views.federationsTableView.addEventListener("click", openIdpList) : __defers["$.__views.federationsTableView!click!openIdpList"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var net = require("net");
    var entityId = Alloy.Globals.gateway + "shibboleth";
    net.retrieveIdpList(entityId, function(federations) {
        var federationData = [];
        for (var i = 0; federations.length > i; i++) {
            var row = Ti.UI.createTableViewRow();
            row.add(Ti.UI.createImageView({
                image: federations[i].flag,
                left: 15,
                top: 5,
                width: "50dp"
            }));
            row.add(Ti.UI.createLabel({
                text: federations[i].country,
                textAlign: "center",
                bottom: 5,
                left: 0,
                width: "80dp",
                font: {
                    fontSize: "14dp"
                }
            }));
            row.add(Ti.UI.createLabel({
                text: federations[i].name,
                left: 100,
                font: {
                    fontSize: "20dp",
                    fontWeight: "bold"
                }
            }));
            row.add(Ti.UI.createImageView({
                image: federations[i].logo,
                right: 5,
                width: 80
            }));
            row.height = "80dp";
            row.hasChild = true;
            row.color = "black";
            row.idps = federations[i].idps;
            row.className = "federationList";
            row.name = federations[i].name;
            "GrIDP" == row.name ? federationData.unshift(row) : federationData.push(row);
        }
        var notSureRow = Ti.UI.createTableViewRow({
            name: "NotSure",
            hasChild: true,
            height: "80dp"
        });
        notSureRow.add(Ti.UI.createLabel({
            text: "Not sure? Tap here",
            width: Ti.UI.FILL,
            textAlign: "center",
            font: {
                fontSize: "18dp",
                fontWeight: "bold"
            }
        }));
        federationData.push(notSureRow);
        $.federationsTableView.setData(federationData);
    });
    __defers["$.__views.__alloyId40!click!openWelcomeScreen"] && $.__views.__alloyId40.addEventListener("click", openWelcomeScreen);
    __defers["$.__views.federationsTableView!click!openIdpList"] && $.__views.federationsTableView.addEventListener("click", openIdpList);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;