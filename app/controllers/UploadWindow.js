$.progress.show();

function loadFromGallery() {
	Ti.Media.openPhotoGallery({
		success : function(e) {
			$.iv.image = e.media;
		}
	});
}

function loadFromCamera() {
	Ti.Media.showCamera({
		success : function(e) {
			$.iv.image = e.media;
		}
	});
}

function startUpload() {
	if (!$.titleTxt.value) {
		alert("Please set a title");
		return;
	}
	$.uploadBtn.enabled = false;
	var filename = $.titleTxt.value.replace(/ /g, "_") + ".jpg";

	//var url = "http://glibrary.ct.infn.it/dm/put/vo.indicate-project.eu/" + filename + "/" + "infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/";
	var url = Alloy.Globals.gateway + "dm/put/vo.indicate-project.eu/" + filename + "/" + "infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/";
	Ti.API.info(url);
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var response = JSON.parse(xhr.responseText);
		Ti.API.info(JSON.stringify(response));
		if (response.status == "409") {
			alert(response.reason + ": file exists");
			$.uploadBtn.enabled = true;
		}
		if (response.status == "307") {
			uploadFile(response.redirect);
		}
		Ti.API.info(JSON.stringify(response));
	};
	xhr.onerror = function(e) {
		alert(e);
		$.uploadBtn.enabled = true;
	};
	xhr.open("GET", url);
	xhr.send();
}

function storeMetadata(filename, _callback) {
	metadata = {};
	metadata.Title = $.titleTxt.value;
	metadata.Description = $.descTxt.value;
	metadata.Keywords = $.kwTxt.value;
	metadata.FileName = filename;
	metadata.Size = $.iv.image.length;
	metadata.FileType = "JPG";
	var net = require('net');
	metadata.User = net.username;
	var url = "https://infn-se-03.ct.pi2s2.it/dpm/ct.pi2s2.it/home/vo.indicate-project.eu/glibrary/" + filename;
	metadata.Replica = url;
	var thumbFile = Ti.Filesystem.applicationDataDirectory + filename;
	var f = Ti.Filesystem.getFile(thumbFile).read();
	metadata.Thumbnail = Ti.Utils.base64encode(f).text.replace(/\r\n/g, '');
	Ti.API.info(JSON.stringify(metadata));
	Ti.API.info("in storeMetadata");
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.info(xhr.responseText);
		var resp = JSON.parse(xhr.responseText);
		if (resp.success) {
			_callback(true);
		}

	};
	xhr.onerror = function(e) {
		Ti.API.info(JSON.stringify(e.error));
		alert(e);
		$.uploadBtn.enabled = true;
	};

	
	
	//xhr.open("POST", "http://glibrary.ct.infn.it/django/addEntry/aginfra/Demo/");
	xhr.open("POST", Alloy.Globals.gateway + "glibrary/addEntry/aginfra/Demo/");
	
	xhr.send(metadata);
	
	

}

function uploadFile(url) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.info(xhr.responseText);
		var filename = $.titleTxt.value.replace(/ /g, "_") + ".jpg";
		var thumbFile = Ti.Filesystem.applicationDataDirectory + filename;
		var f = Ti.Filesystem.getFile(thumbFile);
		f.write($.iv.image.imageAsThumbnail(70, 1, 5));
		Ti.API.info("prima di storeMetadata");
		storeMetadata(filename, function(e) {
			if (e) {
				$.uploadBtn.enabled = true;
				$.titleTxt.value = "";
				$.descTxt.value = "";
				$.kwTxt.value = "";
				$.iv.image = "/appicon.png";
				$.progress.value = 0;
			}
		});

		/*var newFile = Alloy.createModel("File", {
		 "name": filename,
		 "size": $.iv.image.length,
		 "thumb": thumbFile,
		 "upload_date": new Date()
		 });
		 newFile.save();
		 Alloy.Collections.File.add(newFile);	*/

	};
	xhr.onerror = function(e) {
		alert(e);
		$.uploadBtn.enabled = true;
	};
	xhr.onsendstream = function(e) {
		Ti.API.info("sono su onsendstream");
		Ti.API.info(JSON.stringify(e));
		//alert(JSON.stringify(e));
		$.progress.value = e.progress;
	};
	Ti.API.info("Upload URL:" + url);
	xhr.open("PUT", url);
	xhr.send($.iv.image);
}
