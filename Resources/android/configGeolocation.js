var debug = Alloy.Globals.debug_mode;

exports.locationCallbackAndroid = function(e) {
    !e.success || e.error ? debug && Ti.API.info("error:" + JSON.stringify(e.error)) : debug && Ti.API.info("coords: " + JSON.stringify(e.coords));
};

if ("" === Ti.App.Properties.getString("geolocation")) ; else {
    var providerGps = Ti.Geolocation.Android.createLocationProvider({
        name: Ti.Geolocation.PROVIDER_GPS,
        minUpdateDistance: 100,
        minUpdateTime: 120
    });
    Ti.Geolocation.Android.addLocationProvider(providerGps);
    Ti.Geolocation.Android.manualMode = true;
    var gpsRule = Ti.Geolocation.Android.createLocationRule({
        provider: Ti.Geolocation.PROVIDER_GPS,
        accuracy: 100,
        maxAge: 3e5,
        minAge: 1e4
    });
    Ti.Geolocation.Android.addLocationRule(gpsRule);
}

Ti.Geolocation.locationServicesEnabled || Ti.UI.createAlertDialog({
    title: "EarthServer",
    message: "Enable location services to take advantage of all features"
}).show();