function Controller() {
    function openIdpLoginWindow(e) {
        var login_url = "https://gridp.garr.it/ds/WAYF?entityID=" + Alloy.Globals.gateway + "shibboleth&action=selection&origin=";
        var idpLoginWindow;
        var idpLoginWindow = Alloy.createController("IdpLoginWindow", {
            url: login_url + e.row.origin,
            navGroup: navGroup
        }).getView();
        navGroup.openWindow(idpLoginWindow);
        idpLoginWindow.setTitle(e.row.name);
        idpLoginWindow.backButtonTitle = "Back";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "IdpList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.IdpList = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Choose an IdP",
        id: "IdpList"
    });
    $.__views.IdpList && $.addTopLevelView($.__views.IdpList);
    $.__views.idpsTableView = Ti.UI.createTableView({
        id: "idpsTableView"
    });
    $.__views.IdpList.add($.__views.idpsTableView);
    openIdpLoginWindow ? $.__views.idpsTableView.addEventListener("click", openIdpLoginWindow) : __defers["$.__views.idpsTableView!click!openIdpLoginWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.idpsTableView.data = arguments[0].data;
    var navGroup = arguments[0].navGroup;
    $.IdpList.parentWin = arguments[0].parentWin;
    __defers["$.__views.idpsTableView!click!openIdpLoginWindow"] && $.__views.idpsTableView.addEventListener("click", openIdpLoginWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;