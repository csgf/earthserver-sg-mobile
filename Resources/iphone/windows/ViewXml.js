Titanium.UI.setBackgroundColor("#000");

Titanium.UI.setBackgroundImage("/images/bgImage.png");

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

var txtXML = Titanium.UI.createTextArea({
    font: {
        fontSize: 16,
        fontWeight: "normal"
    },
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2,
    color: "#000",
    left: 10,
    top: 20,
    width: pWidth - 20,
    height: pHeight - 110,
    autocorrect: false,
    editable: false,
    hintText: L("ViewXml_wait_message")
});

txtXML.value = Titanium.XML.serializeToString(win.xml);

win.add(txtXML);