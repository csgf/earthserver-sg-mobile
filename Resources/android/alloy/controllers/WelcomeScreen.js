function Controller() {
    function signIn() {
        $.WelcomeScreen.close();
    }
    function register() {
        Ti.Platform.openURL("https://idpopen.garr.it/register");
    }
    function gotoESprojectSG() {
        Ti.Platform.openURL("https://earthserver-sg.consorzio-cometa.it/");
    }
    function gotoESproject() {
        Ti.Platform.openURL("http://www.earthserver.eu/");
    }
    function dismissWelcomeScreen(e) {
        Ti.App.Properties.setBool("welcome_screen", e.value);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WelcomeScreen";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.WelcomeScreen = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "WelcomeScreen"
    });
    $.__views.WelcomeScreen && $.addTopLevelView($.__views.WelcomeScreen);
    $.__views.welcomeImg = Ti.UI.createImageView({
        top: 0,
        height: "20%",
        id: "welcomeImg",
        image: "logo-earthserver.png"
    });
    $.__views.WelcomeScreen.add($.__views.welcomeImg);
    var __alloyId30 = [];
    $.__views.pag1 = Ti.UI.createView({
        layout: "vertical",
        width: "96%",
        id: "pag1"
    });
    __alloyId30.push($.__views.pag1);
    $.__views.title = Ti.UI.createLabel({
        top: "1%",
        font: {
            fontWeight: "bold",
            fontSize: "16dp"
        },
        textAlign: "center",
        text: "Welcome to the EarthServer Science Gateway Mobile",
        id: "title"
    });
    $.__views.pag1.add($.__views.title);
    $.__views.desc = Ti.UI.createLabel({
        top: "5%",
        font: {
            fontSize: "13dp"
        },
        text: "This app allows users to run on a mobile appliance the scientific applications contained in the Science Gateway of the EarthServer Project.",
        id: "desc"
    });
    $.__views.pag1.add($.__views.desc);
    $.__views.subdesc = Ti.UI.createLabel({
        top: "5%",
        font: {
            fontSize: "13dp"
        },
        text: "For more information on the EarthServer Science Gateway, visit",
        id: "subdesc"
    });
    $.__views.pag1.add($.__views.subdesc);
    $.__views.gotoESsg = Ti.UI.createButton({
        top: "2%",
        id: "gotoESsg",
        image: "ESSGBtn.png"
    });
    $.__views.pag1.add($.__views.gotoESsg);
    gotoESprojectSG ? $.__views.gotoESsg.addEventListener("click", gotoESprojectSG) : __defers["$.__views.gotoESsg!click!gotoESprojectSG"] = true;
    $.__views.__alloyId31 = Ti.UI.createLabel({
        top: "5%",
        font: {
            fontSize: "13dp"
        },
        text: "For more information on the EarthServer project, visit:",
        id: "__alloyId31"
    });
    $.__views.pag1.add($.__views.__alloyId31);
    $.__views.gotoESproject = Ti.UI.createButton({
        top: "2%",
        id: "gotoESproject",
        image: "ESinfoBtn.png"
    });
    $.__views.pag1.add($.__views.gotoESproject);
    gotoESproject ? $.__views.gotoESproject.addEventListener("click", gotoESproject) : __defers["$.__views.gotoESproject!click!gotoESproject"] = true;
    $.__views.pag2 = Ti.UI.createView({
        layout: "vertical",
        width: "96%",
        id: "pag2"
    });
    __alloyId30.push($.__views.pag2);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        top: "5%",
        font: {
            fontSize: "13dp"
        },
        text: "The access to the EarthServer Science Gateway requires federated credentials issued by an Identity Provider. If the organisation you belong to has an Identity Provider registered in an official Identity Federation, click on Sign In button below and select your federation and provider.",
        id: "__alloyId32"
    });
    $.__views.pag2.add($.__views.__alloyId32);
    $.__views.signInBtn = Ti.UI.createButton({
        top: "2%",
        height: "50dp",
        id: "signInBtn",
        image: "signInBtn.png",
        title: "Sign In"
    });
    $.__views.pag2.add($.__views.signInBtn);
    signIn ? $.__views.signInBtn.addEventListener("click", signIn) : __defers["$.__views.signInBtn!click!signIn"] = true;
    $.__views.__alloyId33 = Ti.UI.createLabel({
        top: "5%",
        font: {
            fontSize: "13dp"
        },
        text: "Otherwise you can get federated credentials registering to the open Identity Provider which belongs to the GrIDP federation",
        id: "__alloyId33"
    });
    $.__views.pag2.add($.__views.__alloyId33);
    $.__views.registerToGrIDP = Ti.UI.createButton({
        top: "2%",
        height: "50dp",
        id: "registerToGrIDP",
        image: "registerBtn.png",
        title: "Register"
    });
    $.__views.pag2.add($.__views.registerToGrIDP);
    register ? $.__views.registerToGrIDP.addEventListener("click", register) : __defers["$.__views.registerToGrIDP!click!register"] = true;
    $.__views.scrollableView = Ti.UI.createScrollableView({
        showPagingControl: "true",
        height: "330",
        pagingControlColor: "gray",
        views: __alloyId30,
        id: "scrollableView"
    });
    $.__views.WelcomeScreen.add($.__views.scrollableView);
    $.__views.welcomeSwitchView = Ti.UI.createView({
        layout: "absolute",
        width: "96%",
        top: 0,
        height: "50dp",
        id: "welcomeSwitchView"
    });
    $.__views.WelcomeScreen.add($.__views.welcomeSwitchView);
    $.__views.switchLabel = Ti.UI.createLabel({
        top: 2,
        font: {
            fontSize: "13dp"
        },
        left: "0",
        text: "Do not show this welcome page again",
        id: "switchLabel"
    });
    $.__views.welcomeSwitchView.add($.__views.switchLabel);
    $.__views.welcomeSwitch = Ti.UI.createSwitch({
        right: "0",
        top: 4,
        id: "welcomeSwitch"
    });
    $.__views.welcomeSwitchView.add($.__views.welcomeSwitch);
    dismissWelcomeScreen ? $.__views.welcomeSwitch.addEventListener("change", dismissWelcomeScreen) : __defers["$.__views.welcomeSwitch!change!dismissWelcomeScreen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.welcomeSwitch.value = Ti.App.Properties.getBool("welcome_screen", true);
    __defers["$.__views.gotoESsg!click!gotoESprojectSG"] && $.__views.gotoESsg.addEventListener("click", gotoESprojectSG);
    __defers["$.__views.gotoESproject!click!gotoESproject"] && $.__views.gotoESproject.addEventListener("click", gotoESproject);
    __defers["$.__views.signInBtn!click!signIn"] && $.__views.signInBtn.addEventListener("click", signIn);
    __defers["$.__views.registerToGrIDP!click!register"] && $.__views.registerToGrIDP.addEventListener("click", register);
    __defers["$.__views.welcomeSwitch!change!dismissWelcomeScreen"] && $.__views.welcomeSwitch.addEventListener("change", dismissWelcomeScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;