function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "LoginWindow";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.federationListWindow = Alloy.createController("federationList", {
        id: "federationListWindow",
        __parentSymbol: __parentSymbol
    });
    $.__views.loginNavGroup = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.federationListWindow.getViewEx({
            recurse: true
        }),
        id: "loginNavGroup"
    });
    $.__views.loginNavGroup && $.addTopLevelView($.__views.loginNavGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loginNavGroup.parentWin = $.LoginWindow;
    var federationListWin = $.federationListWindow.getView();
    federationListWin.backButtonTitle = "Federations";
    federationListWin.navGroup = $.loginNavGroup;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;