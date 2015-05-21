var net = require("net");
//net.retrieveIdpList("https://indicate-gw.consorzio-cometa.it/shibboleth", function(federations) {

var entityId = Alloy.Globals.gateway + "shibboleth";

var retrieveIdpList = function(){
	net.retrieveIdpList(entityId, function(federations) {
		//Ti.API.info("federations:");
		//Ti.API.info(federations);
		var federationData = [];
		//federationData[0] = {title: "All", hasChild: true}
		//federationData[0].idps = [];
		for (var i = 0; i < federations.length; i++) {
			//federationData[0].idps = federationData[0].idps.concat(federations[i].idps);
	
			/*federationData[i] = {
			 title: federations[i].name,
			 leftImage: federations[i].flag,
			 rightImage: federations[i].logo,
			 country: federations[i].country,
			 idps:  federations[i].idps,
			 color: "black", hasChild: true
			 }; */
	
			var row = Ti.UI.createTableViewRow();
			row.add(Ti.UI.createImageView({
				image : federations[i].flag,
				left : 15,
				top : 5,
				width : "50dp",
				//borderWidth: 1
			}));
			row.add(Ti.UI.createLabel({
				text : federations[i].country,
				textAlign : "center",
				bottom : 5,
				left : 0,
				width : "80dp",
				font : {
					fontSize : "14sp"
				},
				color : "#000"
				//borderWidth: 1
			}));
	
			row.add(Ti.UI.createLabel({
				text : federations[i].name,
				left : 100,
				//borderWidth: 1,
				font : {
					fontSize : "20sp",
					fontWeight : "bold"
				},
				color : "#000"
			}));
	
			row.add(Ti.UI.createImageView({
				image : federations[i].logo,
				right : 5,
				width : 80
			}));
			//row.title = federations[i].name;
			row.height = "80dp";
			row.hasChild = true;
			row.color = "black";
			row.idps = federations[i].idps;
			row.className = "federationList";
			row.name = federations[i].name;
	
			if (row.name == "GrIDP") {
				federationData.unshift(row);
				//$.federationsTableView.insertRowBefore(0, row);
			} else {
				federationData.push(row);
				//$.federationsTableView.appendRow(row);
			}
	
			//Ti.API.info(federationData[i]);
		}
		/* federationData[0].idps.sort(function(a, b) {
		 var nameA=a.displayName.toLowerCase(), nameB=b.displayName.toLowerCase();
		 if (nameA < nameB) //sort string ascending
		 return -1;
		 if (nameA > nameB)
		 return 1;
		 return 0; //default return value (no sorting)
		 }); */
		var notSureRow = Ti.UI.createTableViewRow({
			name : "NotSure",
			hasChild : true,
			height: "80dp"
		});
		notSureRow.add(Ti.UI.createLabel({
			text: "Not sure? Tap here",
			width: Ti.UI.FILL,
			textAlign: "center",
			font: {
				fontSize: "18sp",
				fontWeight: "bold"
			},
			color : "#000"
		}));
		
		federationData.push(notSureRow);
		$.federationsTableView.setData(federationData);
		//$.federationsTableView.selectRow(0);
		//$.federationsTableView.fireEvent('click', {row:federationData[0]});
	});
};
retrieveIdpList();

function openIdpList(e) {
	//Ti.API.info("navGroup: " + JSON.stringify($.federationList.navGroup));
	//alert(JSON.stringify(e.row) + "\n\n\n" + JSON.stringify(e.rowData));
	
	if (e.row.name == "NotSure") {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Register', 'Cancel'],
			message : 'In case you do not belong to any of the shown Identity Federations, or you are not sure you do, you are welcome to register to our Identity Provider Open. When registration procedure will be completed, you can sign in again and select GrIDP as your Identity Federation and then IDPOPEN GARR as your Identity Provider',
			title : 'Suggestion'
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				Ti.Platform.openURL("https://idpopen.garr.it/register");
			}
		});
		dialog.show();
		return;
	}

	var idpsData = [];
	//detailNav.open(idpsListWindow);

	//alert(e.row.name);

	if (e.row.name == "GrIDP") {
		
		//Ti.API.info("idps data:");
		//Ti.API.info(e.row.idps);
		for (var i = 0; i < e.row.idps.length; i++) {

			var row = Ti.UI.createTableViewRow({
				height : 70
			});

			//Ti.API.info(encodeURI(e.row.idps[i].flag));
			//Ti.API.info(e.row.idps[i].logo);
			
			row.add(Ti.UI.createImageView({
				image : encodeURI(e.row.idps[i].flag),
				left : "25dp",
				top : "5dp",
				width : "40dp",
				//borderWidth: 1
			}));  
			row.add(Ti.UI.createLabel({
				text : e.row.idps[i].country,
				textAlign : "center",
				bottom : 5,
				left : 0,
				width : "90dp",
				font : {
					fontSize : "12sp"
				},
				color : "#000"
				//borderWidth: 1
			}));

			row.add(Ti.UI.createLabel({
				text : e.row.idps[i].displayName,
				left : "90dp",
				right : "70dp",
				//borderWidth: 1,
				font : {
					fontSize : "18sp",
					fontWeight : "bold"
				},
				color : "#000"
			}));

			row.add(Ti.UI.createImageView({
				image : encodeURI(e.row.idps[i].logo),
				right : 5,
				width : "60dp"
			})); 
			row.name = e.row.idps[i].displayName;
			row.origin = e.row.idps[i].origin;
			row.class = "IdpList";

			if (row.name == "IDPOPEN GARR") {
				idpsData.unshift(row);
			} else {
				idpsData.push(row);
			}

		}
	} else {

		for (var i = 0; i < e.row.idps.length; i++) {
			idpsData[i] = Ti.UI.createTableViewRow({
				title : e.row.idps[i].displayName,
				name : e.row.idps[i].displayName,
				origin : e.row.idps[i].origin,
				color : "black",
				hasChild : true,
				height : "70dp"
			});
		};
	}
	//Ti.API.info(JSON.stringify(idpsData));

	if (OS_IOS) {
		var idpListWindow = Alloy.createController("IdpList", {
			data : idpsData,
			navGroup : $.federationList.navGroup
		}).getView();
		$.federationList.navGroup.openWindow(idpListWindow);
	} else {
		var idpListWindow = Alloy.createController("IdpList", {
			data : idpsData,
			parentWin : $.federationList
		}).getView();
		idpListWindow.fullscreen = false;
		idpListWindow.open();

	}

}

function openWelcomeScreen() {
	var welcomeWindow = Alloy.createController("WelcomeScreen").getView();
	welcomeWindow.open();
	welcomeWindow.addEventListener("retrieveIdpList", function(){
		Ti.API.info("retrieveIdpList()");
		retrieveIdpList();
	});

	//$.federationList.navGroup.openWindow(welcomeWindow);
}
/*
if(OS_ANDROID){
	var mainWindow = arguments[0].mainWindow;
	var closeAppAlert = Ti.UI.createAlertDialog({
		title : "EarthServer",
		message : "Do you want to quit\nEarthServer SG Mobile?",
		buttonNames : ["YES", "NO"],
		cancel: 1
	});
	closeAppAlert.addEventListener("click", function(e){
		if(e.index === 0){
			setTimeout(function(){				
				mainWindow.close();
				mainWindow.hideCloseView();		
				Ti.API.info("CLOSE APP");
			},1000);			
			mainWindow.showCloseView();
			$.federationList.close();
		};
	});
};
function androidBack(){
	closeAppAlert.show();
};
*/

if(OS_ANDROID){
	$.federationList.addEventListener('open', function() {
		var actionBar;	
	    if (! $.federationList.activity) {
	        Ti.API.error("Can't access action bar on a lightweight window.");
	    } else {
	        actionBar = $.federationList.activity.actionBar;
	        if (actionBar) {
	            actionBar.displayHomeAsUp = true;
	            actionBar.onHomeIconItemSelected = function() {
	                //Ti.API.info("Home icon clicked!");
	               $.federationList.close();
	            };
	        };	        
	    };
	});
};

function closeWindow(){
	if(OS_IOS){
		$.federationList.navGroup.close();
	}else{
		$.federationList.close();
	};
};
