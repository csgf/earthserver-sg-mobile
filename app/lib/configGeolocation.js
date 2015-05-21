var debug = Alloy.Globals.debug_mode;

if(OS_ANDROID){
	exports.locationCallbackAndroid = function(e) {
	    if (!e.success || e.error) {
	        if(debug)
	        	Ti.API.info('error:' + JSON.stringify(e.error));
	    } else {
			if(debug)
				Ti.API.info('coords: ' + JSON.stringify(e.coords));
		}
	};
		
	if(Ti.App.Properties.getString("geolocation") === ""){

	}else{
		var providerGps = Ti.Geolocation.Android.createLocationProvider({
		    name: Ti.Geolocation.PROVIDER_GPS,
		    minUpdateDistance: 100, // metri
		    minUpdateTime: 120 // secondi
		});
		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true;
		
		var gpsRule = Ti.Geolocation.Android.createLocationRule({
		    provider: Ti.Geolocation.PROVIDER_GPS,
		    // Updates should be accurate to 100m
		    accuracy: 100,
		    // Updates should be no older than 5m
		    maxAge: 300000,
		    // But  no more frequent than once per 10 seconds
		    minAge: 10000
		});
		Ti.Geolocation.Android.addLocationRule(gpsRule);
	};

}else{

	exports.locationCallbackIOS = function(e) {
        if (e.error) {
            if(debug)
            	Ti.API.info('Errore di localizzazione: ' + e.error);
        } else {
            if(debug){
	            Ti.API.info("Queste sono le tue coordinate: " + JSON.stringify(e));
	            Ti.API.info("lat: " + e.coords.latitude);
	            Ti.API.info("long: " + e.coords.longitude);
	        };
        }
    };
};

// verifica se la geolocalizzazione è attivata
if (Ti.Geolocation.locationServicesEnabled) {
    if(OS_IOS){
	    Ti.Geolocation.purpose = 'EarthServer use your position to get data';
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	    Ti.Geolocation.distanceFilter = 100;
	    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	    Ti.Geolocation.trackSignificantLocationChange = true;
    };
} else {	
	Ti.UI.createAlertDialog({
		title : "EarthServer",
		message : "Enable location services to take advantage of all features"
	}).show();
}