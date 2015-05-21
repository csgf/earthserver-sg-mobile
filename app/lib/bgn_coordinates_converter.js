//http://www.dorcus.co.uk/carabus/ll_ngr.html
exports.LLtoNE = function(lat, lon)
  {
    var deg2rad = Math.PI / 180;
    var rad2deg = 180.0 / Math.PI;
    var phi = lat * deg2rad;      // convert latitude to radians
    var lam = lon * deg2rad;   // convert longitude to radians
    
    /*if(1){
    	//Modified Airy	Ireland 65	Used for the OS Irish National Grid
		a = 6377340.189;      // OSI semi-major
	    b = 6356034.447;      // OSI semi-minor
	    e0 = 200000;          // OSI easting of false origin
	    n0 = 250000;          // OSI northing of false origin
	    f0 = 1.000035;        // OSI scale factor on central meridian
	    e2 = 0.00667054015;   // OSI eccentricity squared
	    lam0 = -0.13962634015954636615389526147909;   // OSI false east
	    phi0 = 0.93375114981696632365417456114141;    // OSI false north   	
    }else if(2){
		// International 1924	ED50	Used for the Channel Islands
		a = 6378388.000;       // INT24 ED50 semi-major
	    b = 6356911.946;       // INT24 ED50 semi-minor 
	    e0 = 500000;           // CI easting of false origin
	    n0 = 0;                // CI northing of false origin
	    f0 = 0.9996;           // INT24 ED50 scale factor on central meridian
	    e2 = 0.0067226700223333;  // INT24 ED50 eccentricity squared
	    lam0 = -0.0523598775598;  // CI false east
	    phi0 = 0 * deg2rad;       // CI false north    	
    }else*/
	    //Airy	OSGB36	Used for the OS British National Grid
	    var a = 6377563.396;       // OSGB semi-major axis
	    var b = 6356256.91;        // OSGB semi-minor axis
	    var e0 = 400000;           // OSGB easting of false origin
	    var n0 = -100000;          // OSGB northing of false origin
	    var f0 = 0.9996012717;     // OSGB scale factor on central meridian
	    var e2 = 0.0066705397616;  // OSGB eccentricity squared
	    var lam0 = -0.034906585039886591;  // OSGB false east
	    var phi0 = 0.85521133347722145;    // OSGB false north
	//};
    var af0 = a * f0;
    var bf0 = b * f0;
    // easting
    var slat2 = Math.sin(phi) * Math.sin(phi);
    var nu = af0 / (Math.sqrt(1 - (e2 * (slat2))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * slat2));
    var eta2 = (nu / rho) - 1;
    var p = lam - lam0;
    var IV = nu * Math.cos(phi);
    var clat3 = Math.pow(Math.cos(phi),3);
    var tlat2 = Math.tan(phi) * Math.tan(phi);
    var V = (nu / 6) * clat3 * ((nu / rho) - tlat2);
    var clat5 = Math.pow(Math.cos(phi), 5);
    var tlat4 = Math.pow(Math.tan(phi), 4);
    var VI = (nu / 120) * clat5 * ((5 - (18 * tlat2)) + tlat4 + (14 * eta2) - (58 * tlat2 * eta2));
    var east = e0 + (p * IV) + (Math.pow(p, 3) * V) + (Math.pow(p, 5) * VI);
    // northing
    var n = (af0 - bf0) / (af0 + bf0);
    var M = Marc(bf0, n, phi0, phi);
    var I = M + (n0);
    var II = (nu / 2) * Math.sin(phi) * Math.cos(phi);
    var III = ((nu / 24) * Math.sin(phi) * Math.pow(Math.cos(phi), 3)) * (5 - Math.pow(Math.tan(phi), 2) + (9 * eta2));
    var IIIA = ((nu / 720) * Math.sin(phi) * clat5) * (61 - (58 * tlat2) + tlat4);
    var north = I + ((p * p) * II) + (Math.pow(p, 4) * III) + (Math.pow(p, 6) * IIIA);
    //east = Math.round(east);       // round to whole number
    //north = Math.round(north);     // round to whole number
    east = parseFloat(east).toFixed(6);
    north = parseFloat(north).toFixed(6);     
    var nstr = String(north);      // convert to string
    var estr = String(east);       // ditto
    return {
    	nstr : nstr,
    	estr : estr
    };
  };
  
  function Marc(bf0, n, phi0, phi)
  {
    var Marc = bf0 * (((1 + n + ((5 / 4) * (n * n)) + ((5 / 4) * (n * n * n))) * (phi - phi0))
     - (((3 * n) + (3 * (n * n)) + ((21 / 8) * (n * n * n))) * (Math.sin(phi - phi0)) * (Math.cos(phi + phi0)))
     + ((((15 / 8) * (n * n)) + ((15 / 8) * (n * n * n))) * (Math.sin(2 * (phi - phi0))) * (Math.cos(2 * (phi + phi0))))
     - (((35 / 24) * (n * n * n)) * (Math.sin(3 * (phi - phi0))) * (Math.cos(3 * (phi + phi0)))));
    return(Marc);
  }