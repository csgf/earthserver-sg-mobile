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

var win1 = Titanium.UI.createWindow({
    url: "/windows/ViewXml.js",
    title: L("ViewXml_win_title"),
    modal: true,
    backgroundImage: "/images/bgImage.png",
    xml: win.xml
});

win1.padre = win.padre;

var tblWcsServer = Titanium.UI.createTableView({
    width: pWidth - 20,
    height: pHeight - 110,
    top: 20,
    left: 10,
    backgroundColor: "#B0C4DE",
    borderRadius: 12,
    borderColor: "#AFEEEE",
    borderWidth: 2
});

var sectionXmlResponse = Ti.UI.createTableViewSection({
    headerTitle: L("WcsMetadata_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    height: 90,
    hasChild: false,
    className: "response-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row1_title"),
    font: {
        fontSize: 22,
        fontWeight: "bold"
    },
    color: "#000",
    left: 10,
    top: (row.height - 22) / 2,
    height: 30,
    width: row.width
});

row.add(titleRow);

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});

sectionXmlResponse.add(row);

var sectionServiceIdentification = Ti.UI.createTableViewSection({
    headerTitle: L("WcsMetadata_section2_title")
});

var owsServiceIdentification = win.xml.documentElement.getElementsByTagName("ows:ServiceIdentification");

var owsServiceProvider = win.xml.documentElement.getElementsByTagName("ows:ServiceProvider");

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row2_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:Title").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row3_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:Abstract").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row4_title"),
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
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

for (var i = 0; owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").length > i; i++) descriptionRow.text += owsServiceIdentification.item(0).getElementsByTagName("ows:Keyword").item(i).textContent + "\n";

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row5_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceType").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row6_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:ServiceTypeVersion").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row7_title"),
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
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

for (var i = 0; owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").length > i; i++) descriptionRow.text += owsServiceIdentification.item(0).getElementsByTagName("ows:Profile").item(i).textContent + "\n\n";

descriptionRow.text = descriptionRow.text.substr(0, descriptionRow.text.length - 2);

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row8_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:Fees").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceIdentification-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row9_title"),
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
    text: owsServiceIdentification.item(0).getElementsByTagName("ows:AccessConstraints").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceIdentification.add(row);

var sectionServiceProvider = Ti.UI.createTableViewSection({
    headerTitle: L("WcsMetadata_section3_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row10_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:ProviderName").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row11_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:ProviderSite").item(0).getAttribute("xlink:href"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row12_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:IndividualName").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row13_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:PositionName").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row14_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Role").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row15_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Phone").item(0).getElementsByTagName("ows:Voice").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row16_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Phone").item(0).getElementsByTagName("ows:Facsimile").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row17_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:DeliveryPoint").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row18_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:City").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row19_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:AdministrativeArea").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row20_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:PostalCode").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row21_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:Country").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row22_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:Address").item(0).getElementsByTagName("ows:ElectronicMailAddress").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row23_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:OnlineResource").item(0).getAttribute("xlink:href"),
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row24_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:HoursOfService").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWcsServer.width,
    hasChild: false,
    className: "ServiceProvider-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WcsMetadata_row25_title"),
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
    text: owsServiceProvider.item(0).getElementsByTagName("ows:ContactInstructions").item(0).textContent,
    font: {
        fontSize: 20,
        fontWeight: "normal"
    },
    color: "#fff",
    left: 10,
    top: 35,
    width: row.width - 20,
    height: "auto"
});

row.add(titleRow);

row.add(descriptionRow);

sectionServiceProvider.add(row);

tblWcsServer.data = [ sectionXmlResponse, sectionServiceIdentification, sectionServiceProvider ];

win.add(tblWcsServer);