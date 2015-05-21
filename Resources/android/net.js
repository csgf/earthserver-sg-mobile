exports.loggedIn = false;

exports.shibCookie = Ti.App.Properties.getString("shibCookie", "");

exports.lastLogin = Ti.App.Properties.getDouble("lastLogin", 0);

exports.username = Ti.App.Properties.getString("username", "none");

exports.retrieveIdpList = function(entityId, _callback) {
    Ti.API.info("entityId: " + entityId);
    var dsEndPoint = "https://gridp.garr.it/ds/WAYF?entityID=" + entityId + "&json=true";
    Ti.API.info("dsEndPoint: " + dsEndPoint);
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        try {
            var response = JSON.parse(this.responseText);
        } catch (err) {
            Ti.API.info(err);
        }
        _callback(response.federations);
    };
    xhr.onerror = function() {
        Ti.API.debug(e.error);
        Ti.API.info(e);
        alert("Please check your internet connectivity");
    };
    xhr.open("GET", dsEndPoint);
    xhr.send();
};

exports.apiCall = function(url, _callback) {
    Ti.API.info(url);
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        if (-1 != this.responseText.indexOf("<title>Access System Failure</title>")) _callback("session expired"); else {
            var response = JSON.parse(this.responseText);
            _callback(response);
        }
    };
    xhr.onerror = function(e) {
        Ti.API.info(xhr.status);
        Ti.API.info(e);
        alert("Please check your internet connectivity");
    };
    xhr.open("GET", url);
    Ti.API.info("Cookie:'" + exports.shibCookie + "'");
    xhr.setRequestHeader("Cookie", exports.shibCookie);
    xhr.send();
};