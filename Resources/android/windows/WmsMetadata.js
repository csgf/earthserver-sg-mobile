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

var str = "";

var tblWmsServer = Titanium.UI.createTableView({
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
    headerTitle: L("WmsMetadata_section1_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    height: 90,
    className: "response-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row1_title"),
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

var iconImage = Titanium.UI.createImageView({
    image: "/images/next.png",
    width: 48,
    height: 48,
    right: 10,
    top: 20
});

row.add(titleRow);

row.add(iconImage);

row.addEventListener("click", function() {
    true == Ti.App.isAndroid ? win1.open() : win.padre.openWindow(win1);
});

sectionXmlResponse.add(row);

var service = win.xml.documentElement.getElementsByTagName("Service");

var sectionServerInfo = Ti.UI.createTableViewSection({
    headerTitle: L("WmsMetadata_section2_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row2_title"),
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
    text: service.item(0).getElementsByTagName("Name").item(0).textContent,
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

sectionServerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row3_title"),
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
    text: service.item(0).getElementsByTagName("Title").item(0).textContent,
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

sectionServerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row4_title"),
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

str = "";

null != service.item(0).getElementsByTagName("Abstract").item(0) && (str = service.item(0).getElementsByTagName("Abstract").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row5_title"),
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
    text: service.item(0).getElementsByTagName("OnlineResource").item(0).getAttribute("xlink:href"),
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

sectionServerInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServerInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row6_title"),
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

str = "";

if (null != service.item(0).getElementsByTagName("Keyword").item(0)) for (var i = 0; service.item(0).getElementsByTagName("Keyword").length > i; i++) str += service.item(0).getElementsByTagName("Keyword").item(i).textContent + "\n";

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServerInfo.add(row);

var sectionServiceInfo = Ti.UI.createTableViewSection({
    headerTitle: L("WmsMetadata_section3_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServiceInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row7_title"),
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

str = "";

null != service.item(0).getElementsByTagName("LayerLimit").item(0) && (str = service.item(0).getElementsByTagName("LayerLimit").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServiceInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServiceInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row8_title"),
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

str = "";

null != service.item(0).getElementsByTagName("MaxWidth").item(0) && (str = service.item(0).getElementsByTagName("MaxWidth").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServiceInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServiceInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row9_title"),
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

str = "";

null != service.item(0).getElementsByTagName("MaxHeight").item(0) && (str = service.item(0).getElementsByTagName("MaxHeight").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServiceInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServiceInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row10_title"),
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

str = "";

null != service.item(0).getElementsByTagName("Fees").item(0) && (str = service.item(0).getElementsByTagName("Fees").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServiceInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ServiceInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row11_title"),
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

str = "";

null != service.item(0).getElementsByTagName("AccessConstraints").item(0) && (str = service.item(0).getElementsByTagName("AccessConstraints").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionServiceInfo.add(row);

var contactInfo = win.xml.documentElement.getElementsByTagName("Service").item(0).getElementsByTagName("ContactInformation");

var sectionContactInfo = Ti.UI.createTableViewSection({
    headerTitle: L("WmsMetadata_section4_title")
});

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row12_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactPerson").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactPerson").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row13_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactOrganization").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row14_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactPosition").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactPosition").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row15_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("AddressType").item(0) && (str = contactInfo.item(0).getElementsByTagName("AddressType").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row16_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("Address").item(0) && (str = contactInfo.item(0).getElementsByTagName("Address").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row17_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("City").item(0) && (str = contactInfo.item(0).getElementsByTagName("City").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row18_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0) && (str = contactInfo.item(0).getElementsByTagName("StateOrProvince").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row19_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("PostCode").item(0) && (str = contactInfo.item(0).getElementsByTagName("PostCode").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row20_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("Country").item(0) && (str = contactInfo.item(0).getElementsByTagName("Country").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row21_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactVoiceTelephone").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row22_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactFacsimileTelephone").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

var row = Titanium.UI.createTableViewRow({
    width: tblWmsServer.width,
    hasChild: false,
    className: "ContactInfo-row"
});

var titleRow = Titanium.UI.createLabel({
    text: L("WmsMetadata_row23_title"),
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

str = "";

null != contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0) && (str = contactInfo.item(0).getElementsByTagName("ContactElectronicMailAddress").item(0).textContent);

var descriptionRow = Titanium.UI.createLabel({
    text: str,
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

sectionContactInfo.add(row);

tblWmsServer.data = [ sectionXmlResponse, sectionServerInfo, sectionServiceInfo, sectionContactInfo ];

win.add(tblWmsServer);