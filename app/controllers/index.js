var net = require('net');
var loginLog;
Ti.API.info("lastLogin: " + net.lastLogin);
Ti.API.info("shibCookie:" + net.shibCookie);
Ti.API.info("username:" + net.username);

// remove addedServer at application boot
//alert("check removePropery");
/*
if (Ti.App.Properties.hasProperty('addedServers')) {
	//alert("cancella addedServers");
	Ti.App.Properties.removeProperty('addedServers');
}; */


//$.mainWindow.title = Alloy.Globals.repository;


if(Ti.Platform.osname === 'android'){
	$.esaMerisWindow.addEventListener('open', function() {
		var actionBar;	
	    if (! $.esaMerisWindow.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.esaMerisWindow.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.esaMerisWindow.close();
	            };
	        };	        
 			$.esaMerisWindow.getActivity().onCreateOptionsMenu = function(e) {
		        var infoBtn = e.menu.add({
		            title : "Info",
		            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
		            icon : Ti.Android.R.drawable.ic_menu_info_details
		        });
		        infoBtn.addEventListener('click', function(e) {
		            openInfoWin();
		        });
		    };
		    $.esaMerisWindow.getActivity().invalidateOptionsMenu();
	    };
	});	
	/*$.tabgroup.addEventListener('open', function(){
	    if($.tabgroup.activity){
	      actionBar = $.tabgroup.activity.actionBar;
	        if (actionBar){
	          actionBar.title = Alloy.Globals.repository;
	        };
	    };
	});*/
	/*var NappDrawerModule = require('dk.napp.drawer');
    var window = NappDrawerModule.createDrawer({
            fullscreen:false, 
            leftWindow: $.esaMerisWindow,
            centerWindow: $.mainWindow,
            fading: 0.2, // 0-1
            parallaxAmount: 0.2, //0-1
            shadowWidth:"40dp", 
            leftDrawerWidth: 240,
            animationMode: NappDrawerModule.ANIMATION_NONE,
            closeDrawerGestureMode: NappDrawerModule.MODE_MARGIN,
            openDrawerGestureMode: NappDrawerModule.MODE_ALL
    });*/
	var window = $.mainWindow;	
	window.addEventListener('open', onNavDrawerWinOpen);
	function onNavDrawerWinOpen(evt) {
		//alert(JSON.stringify(Alloy.Globals.WxsCss))
	    this.removeEventListener('open', onNavDrawerWinOpen);
	
	    if(this.getActivity()) {
	        // need to explicitly use getXYZ methods
	        var actionBar = this.getActivity().getActionBar();
	
	        if (actionBar) {
	            // Now we can do stuff to the actionbar  
	            //actionBar.setTitle(Alloy.Globals.repository);
	            
	            // show an angle bracket next to the home icon,
	            // indicating to users that the home icon is tappable
	           // actionBar.setDisplayHomeAsUp(true);
	            //actionBar.setIcon("/menu-icon.png");

			    this.getActivity().onCreateOptionsMenu = function(e) {
			        var logoutBtn = e.menu.add({
			            title : "Info",
			            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			            icon : Ti.Android.R.drawable.ic_menu_info_details
			        });
			        logoutBtn.addEventListener('click', function(e) {
			            openCreditsWin();
			        });
			    };
			   this.getActivity().invalidateOptionsMenu();
	
	            // toggle the left window when the home icon is selected
	            actionBar.setOnHomeIconItemSelected(function() {
	                //window.toggleLeftWindow();
	           });
	        }
	    }    
	}   
}else{
	/*var NappSlideMenu = require('dk.napp.slidemenu');
	
	var window = NappSlideMenu.createSlideMenuWindow({
	    centerWindow:$.mainNavGroup,
	    leftWindow:$.esaMerisWindow,
	    //rightWindow:$.rightWindow,
	    leftLedge:100
	});
	*/
	var window = $.mainNavGroup;
};

$.esaMerisTable.addEventListener("click", function(e){
	/*if(OS_IOS)
		window.toggleLeftView();
	else
		window.toggleLeftWindow();*/
	if (e.index == 0) {
		if(OS_IOS){
			/*var navWin = Ti.UI.iOS.createNavigationWindow({
				modal:true
			});
			var meeoSettingsWin = Alloy.createController("meeo/SettingsWin", {title:e.rowData.name, navWin:navWin}).getView();
			navWin.setWindow(meeoSettingsWin);
			navWin.open();*/
			var meeoSettingsWin = Alloy.createController("bgs/SettingsWin", {title:e.rowData.name, navWin:$.mainNavGroup}).getView();
			$.mainNavGroup.openWindow(meeoSettingsWin);	
			var closeSettingsWin = function(){
				$.mainNavGroup.closeWindow(meeoSettingsWin);
				meeoSettingsWin.removeEventListener("closeSettingsWin", closeSettingsWin);	
				Ti.API.info("CHIUDO");
			};
			meeoSettingsWin.addEventListener("closeSettingsWin", closeSettingsWin);
			meeoSettingsWin.addEventListener("close", closeSettingsWin);	
		}else{
			var meeoSettingsWin = Alloy.createController("/bgs/SettingsWin", {title:e.rowData.name}).getView();
			meeoSettingsWin.open();
		};			
	} else if(e.index === 1){
		if(!loginLog){
			logout();
			return;
		};
		if(OS_IOS){
			/*var navWin = Ti.UI.iOS.createNavigationWindow({
				modal:true
			});
			var meeoSettingsWin = Alloy.createController("meeo/SettingsWin", {title:e.rowData.name, navWin:navWin}).getView();
			navWin.setWindow(meeoSettingsWin);
			navWin.open();*/
			var meeoSettingsWin = Alloy.createController("meeo/SettingsWin", {title:e.rowData.name, navWin:$.mainNavGroup}).getView();
			$.mainNavGroup.openWindow(meeoSettingsWin);	
			var closeSettingsWin = function(){
				$.mainNavGroup.closeWindow(meeoSettingsWin);
				meeoSettingsWin.removeEventListener("closeSettingsWin", closeSettingsWin);	
				Ti.API.info("CHIUDO");
			};
			meeoSettingsWin.addEventListener("closeSettingsWin", closeSettingsWin);
			meeoSettingsWin.addEventListener("close", closeSettingsWin);	
		}else{
			var meeoSettingsWin = Alloy.createController("/meeo/SettingsWin", {title:e.rowData.name}).getView();
			meeoSettingsWin.open();
		};			
	} else if(e.index === 2){
		if(!loginLog){
			logout();
			return;
		};
		var wxs_client = Ti.UI.createWindow({
			url: "/windows/Settings.js",
			title: "WxS Settings",
			backgroundImage: "/images/bgImage.png"
		});
		if(OS_IOS){
			/*var navWin = Ti.UI.iOS.createNavigationWindow({
				modal:true,
				window: wxs_client
			});
			wxs_client.padre = navWin;
			navWin.open();*/
			wxs_client.padre = $.mainNavGroup;
			$.mainNavGroup.openWindow(wxs_client);
			//wxs_client.open({});
			//alert("loading WxS");
		}else{
			wxs_client.open();
		};
	}else if(e.index === 3){		
		if(!loginLog){
			logout();
			return;
		};
		//openRight();
		Alloy.Globals.repository = e.rowData.repo;
		//$.mainWindow.title = e.rowData.name;
		$.esaMerisWindow.title = e.rowData.name;
		loadTypeList();
		if(OS_IOS)
			$.mainNavGroup.openWindow($.esaMerisWindow);
		else
			$.esaMerisWindow.open();
	};
	//Alloy.Globals.repository = e.rowData.repo;
	//$.mainWindow.title = e.rowData.title;
	//loadTypeList();
	//alert("You clicked " + e.rowData.repo)
	/* switch(e.index){
		case 0:
			window.toggleLeftView();
			Alloy.Globals.repository = 'ESArep';
			loadTypeList();
			//alert("You clicked " + e.rowData.title)
			break;
		case 1:
			window.toggleLeftView();
			Alloy.Globals.repository = 'deroberto2';
			loadTypeList();
			//alert("You clicked " + e.rowData.title );
			break;
	} */
});

/*
$.mainWindow.addEventListener("focus", function() {
	Ti.API.info("focused");
	if(OS_IOS)
		window.setPanningMode("FullViewPanning");
});
*/
function openLeft(){
	/*if(OS_IOS)
		window.toggleLeftView();
	else
		window.toggleLeftWindow();*/
   
}
function openRight(){
	/*if(OS_IOS)
		window.toggleRightView();
	else
		window.toggleRightWindow();*/
}

//if(OS_IOS)
	window.open(); //open the app
//else
	//$.tabgroup.open();

/*if(OS_IOS){
	window.setCenterhiddenInteractivity("TouchDisabledWithTapToClose");
	window.setParallaxAmount(0.4);
	//window.bounceLeftView();
	window.toggleLeftView();
}else{	
	setTimeout(function(){
		window.setParallaxAmount(0.4);
		window.toggleLeftWindow();
	},1000);
}*/;



//$.index.open();
//$.downloadWin.getView().currentTab = $.index.activeTab;

function loadLoginWindow() {
	if (OS_IOS) {
		var loginWindow = Alloy.createController("LoginWindow").getView();
		loginWindow.open();
	} else {
		var federetionListWindow = Alloy.createController("federationList", {mainWindow : window}).getView();
		federetionListWindow.fullscreen = false;
		federetionListWindow.open();
	}
}

if (net.shibCookie) {
	if (new Date() > new Date(net.lastLogin + 3600000)) {
		//loadLoginWindow();
		loginLog = false;
	} else {
		loginLog = true;
		net.loggedIn = true;
		//Ti.App.fireEvent("set:login", {
		$.username.text = net.username;
		//});
		Ti.API.info("già loggato ");
		$.username.applyProperties({visible:true, zIndex:2});
		$.usarnameLbl.applyProperties({visible:true, zIndex:2});
		$.logout.title = "Log Out";
		$.meoLog.setImage("/images/unlock-icon.png");
		$.wxsLog.setImage("/images/unlock-icon.png");
		$.esaLog.setImage("/images/unlock-icon.png");
	}
} else {
	loginLog = false;
	//loadLoginWindow();
}

if (!Ti.App.Properties.getBool("welcome_screen", false)) {
	var welcomeWindow = Alloy.createController("WelcomeScreen").getView();
	welcomeWindow.open();
}

Ti.App.addEventListener('loggedIn', function(e) {
	
	//loadTypeList();
	loginLog = true;
	$.usarnameLbl.applyProperties({visible:true, zIndex:2});
	$.username.applyProperties({visible:true, zIndex:2});
	$.username.text = e.username;
	if(OS_IOS){
		$.logout.title = "Log Out";
	}else{
		$.logout.text = "Log Out";
	};	
	$.meoLog.setImage("/images/unlock-icon.png");
	$.wxsLog.setImage("/images/unlock-icon.png");
	$.esaLog.setImage("/images/unlock-icon.png");
});

function loadTypeList() {
	
	if(!Ti.Network.getOnline()){
		return;
	};
	
	if (net.loggedIn) {
		var url = Alloy.Globals.gateway + 'glibrary/mountTree/' + Alloy.Globals.repository + "/?node=";
		net.apiCall(url + "0" , function(response) {
			//Ti.API.info(url);
			//Ti.API.info(response);
			//alert(response);
			var data = [];
			for (var i = 0; i < response.length; i++) {
				var type = Ti.UI.createTableViewRow();
				//type.title = response[i].text;
				type.add(Ti.UI.createLabel({
					left : "70dp",
					right : "5dp",
					text : response[i].text,
					font : {fontSize : "14sp"},
					color : "#000"
				}));
				type.isLeaf = response[i].leaf;
				type.name = String(response[i].id);
				//type.leftImage = "/Folder-Add.png";
				type.add(Ti.UI.createImageView({
					left : "10dp",
					width : "50dp",
					image : "/Folder-Add.png"
				}));
				type.height = 50;
				if (!type.isLeaf) {
					net.apiCall(url + response[i].id, function(response) {
						//Ti.API.info(url);
						//Ti.API.info(response);
						for (var j = 0; j < response.length; j++) {
							var row = Ti.UI.createTableViewRow();
							row.add(Ti.UI.createLabel({
								text : response[j].text,
								left : 100,
								font : {
									fontSize : 18
								},
								color : "#000"
							}));
							row.add(Ti.UI.createImageView({
								image : "folder.png",
								width : 50,
								left : 50
							})); 
							//row.leftImage = "Folder-Add.png";
							row.id = "" + response[j].id;
							row.typename = response[j].text;
							row.path = response[j].path;
							row.visibleAttrs = response[j].visibleAttrs;
							row.hasChild = true;
							row.height = 60;
							//row.indentionLevel = 1;
							//row.title = row.typename;
							var parentID = response[j].parentID;
							//Ti.API.info(type.name);
							var previousRow = $.typesTableView.getIndexByName(parentID);
							//Ti.API.info(previousRow);
							$.typesTableView.insertRowAfter(previousRow, row);
						}
					});
				}
				type.typename = response[i].text;
				type.path = response[i].path;
				type.visibleAttrs = response[i].visibleAttrs;
				type.hasChild = true;
				//typesTableView.appendRow(type);
				data.push(type);
			}
			$.typesTableView.setData(data);
			//$.mainWindow.title = Alloy.Globals.repository;
			//typesWindow.title = e.rowData.children[0].text;
			//repoNav.open(typesWindow);
		});
	}
}

function loadEntries(e) {
	//Ti.API.info(JSON.stringify(e));
	Ti.API.info(e.row.path);
	//alert("index.js\n\n" + JSON.stringify(e.row));
	//alert("visibleAttrs: " + e.row.visibleAttrs);
	var entryBrowser = Alloy.createController("entryBrowserWindow", {path: e.row.path, name: e.row.typename, visibleAttrs: e.row.visibleAttrs}).getView();
	if(OS_IOS){
		entryBrowser.navGroup = $.mainNavGroup;
		//window.setPanningMode("NavigationBarOrOpenCenterPanning");
		$.mainNavGroup.openWindow(entryBrowser);
	}else{
		entryBrowser.open();
	};
}

function logout() {
	
	//net.loggedIn = false;
	loginLog = false;
	net.lastLogin = Ti.App.Properties.setDouble("lastLogin", 0);
	net.username = Ti.App.Properties.setString("username", "none");    
	var path = Titanium.Filesystem.applicationDataDirectory;
	var searchKey = path.search('Documents');
	path = path.substring(0, searchKey);
	path = path + 'Library/Cookies/';
	//alert(path);
	var f = Ti.Filesystem.getFile(path + "Cookies.binarycookies");
	f.deleteFile();
	if(OS_IOS){
		var loginWindow = Alloy.createController("LoginWindow").getView();
		loginWindow.open();
	}else{
		var federetionListWindow = Alloy.createController("federationList", {mainWindow : window}).getView();
		federetionListWindow.fullscreen = false;
		federetionListWindow.open();	
		if (!Ti.App.Properties.getBool("welcome_screen", false)) {
			var welcomeWindow = Alloy.createController("WelcomeScreen").getView();
			welcomeWindow.open();
		}	
		//alert(Ti.App.Properties.getBool("welcome_screen"));
	};
	$.username.applyProperties({visible:false});
	$.usarnameLbl.applyProperties({visible:false});
	if(OS_IOS){
		$.logout.title = "Log In";
	}else{
		$.logout.text = "Log In";
	};
	$.meoLog.setImage("/images/lock-icon.png");
	$.wxsLog.setImage("/images/lock-icon.png");
	$.esaLog.setImage("/images/lock-icon.png");
	Ti.API.info("\n\n******************\nlogout\n\n******************\n");
}

exports.close = function() {
	//Other cleanups here.
	$.index.close();
};

/*
setTimeout(function(){
	var w = Ti.UI.createWindow({
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT]
	});
	var wv = Ti.UI.createWebView({
		top : "20dp",
		url : "/highcharts/chart.html",
		bottom : "0dp"
	});
	w.add(wv);
	w.open();
},2000);
*/

var winNoConnection = Ti.UI.createWindow({
	backgroundColor : "#fff"
});
var noConnectionLbl = Ti.UI.createLabel({
	text : "EarthServer requires an internet connection.\nPlease check your connection.",
	font : {
		fontSize : Ti.API.WxsCss.titleFontSize,
		fontWeight : 'bold'
	},
	color : Ti.API.WxsCss.titleColor,	
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE	,
	textAlign : "center"
});
winNoConnection.add(noConnectionLbl);
var alertDialog = 	Ti.UI.createAlertDialog({
	title : "EarthServer",
	message : "EarthServer requires an internet connection.\nPlease check your connection."
});

if(!Titanium.Network.getOnline()){
	alertDialog.show();
	winNoConnection.open();
};
Titanium.Network.addEventListener("change", function(e){
	Ti.API.info("Connection change. Is online? ----> " + e.online);
	if(e.online){
		winNoConnection.close();
	}else{
		alertDialog.show();
		winNoConnection.open();		
	};
});


$.esaMerisTable.addEventListener("postlayout", function(e){
	//Ti.API.info(JSON.stringify(e.source));
	if(OS_ANDROID)
		var h = ((e.source.rect.height-50)/4);
	else
		var h = ((e.source.rect.height-42)/4);
	Ti.API.info("La nuova altezza è: " + (e.source.rect.height) + "; rowHeight ----> " + (h));
	
	$.bgsRow.setHeight(h);
	$.meoRow.setHeight(h);
	$.esaRow.setHeight(h);
	$.wxsRow.setHeight(h);	
});
if(OS_IOS){
	$.esaMerisTable.fireEvent("postlayout"); // to trigger postlayout
};


// InfoWin
var infoWin = Ti.UI.createWindow({
	title : "MERIS info"
});
var wv = Ti.UI.createWebView({url:"/MERIS.html"});
infoWin.add(wv);
if(OS_ANDROID){
	wv.applyProperties({scalesPageToFit:true, enableZoomControls:false});
	infoWin.addEventListener('open', function() {
		var actionBar;	
	    if (! infoWin.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = infoWin.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	              	infoWin.close();
	            };
	        };	        
	    };
	});
};
		
var openInfoWin = function(){
	if(OS_IOS){
		$.mainNavGroup.openWindow(infoWin);
	}else{
		infoWin.open();	
	};
};

var openCreditsWin = function(){
	var creditsWindow = Alloy.createController("creditsWindow").getView();
	if(OS_IOS){
		creditsWindow.navGroup = $.mainNavGroup;		
		$.mainNavGroup.openWindow(creditsWindow);
	}else{
		creditsWindow.open();
	};	
};

if(OS_ANDROID){
	var closeAppAlert = Ti.UI.createAlertDialog({
		title : "EarthServer",
		message : "Do you want to quit\nEarthServer SG Mobile?",
		buttonNames : ["YES", "NO"],
		cancel: 1
	});
	closeAppAlert.addEventListener("click", function(e){
		if(e.index === 0){			
			window.close();			
			Ti.API.info("CLOSE APP");
			if(window.getActivity()){
				var activity = window.getActivity();
				activity.finish();
			};
		};
	});
	var closeView = Ti.UI.createView({
		backgroundColor : "#000",
		opacity : 0.5,
		zIndex : 10,
		visible : false
	});
	window.add(closeView);
	window.showCloseView = function(){closeView.visible = true;};
	window.hideCloseView = function(){closeView.visible = false;};
};
function androidBack(){
	closeAppAlert.show();
};