var detail = arguments[0];
//Ti.API.info(JSON.stringify(detail));

var downloadTableViewRow = Ti.UI.createTableViewRow({
	title : "Download",
	hasChild : true
});
$.tv.appendRow(downloadTableViewRow);

downloadTableViewRow.addEventListener('click', function() {

	//var url = "http://glibrary.ct.infn.it/dm/vo.indicate-project.eu/infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + detail.attributes.FileName;
	var url = Alloy.Globals.gateway + "dm/vo.indicate-project.eu/infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + detail.attributes.FileName;

	Ti.API.info(url);
	var viewer = Alloy.createController("WebViewer", {
		url : url
	}).getView();
	viewer.title = detail.attributes.FileName;
	$.ItemDetailWindow.currentTab.openWindow(viewer);

});


delete detail.attributes["/aginfra/Thumbs:Data"];
delete detail.attributes["Thumbnail"];
delete detail.attributes["/aginfra/Entries/Demo:FILE"];
delete detail.attributes["/aginfra/Entries/Demo:FileName"];

$.ItemDetailWindow.title = detail.attributes.Title;

for (var key in detail.attributes) {

	Ti.API.info(key);
	var row = Ti.UI.createTableViewRow();
	var lbl = Ti.UI.createLabel({
		left : "5dp",
		text : key
	});
	var meta = Ti.UI.createLabel({
		left : "140dp",
		text : detail.attributes[key]
	});
	row.add(lbl);
	row.add(meta);
	$.tv.appendRow(row);

}
