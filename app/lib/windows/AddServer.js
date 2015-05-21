/**
 * @author Francesco
 */

createAddServerWindow = function(win1Properties){
	//Parent window = AvailableServers.js
	//reference the current window
	//var win = Titanium.UI.currentWindow;
	var win = Titanium.UI.createWindow(win1Properties);
	win.applyProperties({
		//url : '/windows/AddServer.js',
		//title : 'Add server',
		title : L('AddServer_win_title'),
		modal : OS_IOS ? true : false,
		//backgroundColor : '#fff'
		backgroundImage : '/images/bgImage.png',
		orientationModes : [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
		//orientationModes : [Ti.UI.PORTRAIT]
	});
	
	if(OS_ANDROID){
		win.addEventListener('open', function() {
			var actionBar;	
		    if (! win.activity) {
		        Ti.API.error("Can't access action bar on a lightweight window.");
		    } else {
		        actionBar = win.activity.actionBar;
		        if (actionBar) {
		            actionBar.displayHomeAsUp = true;
		            actionBar.onHomeIconItemSelected = function() {
		                //Ti.API.info("Home icon clicked!");
		               win.close();
		            };
				    win.getActivity().onCreateOptionsMenu = function(e) {
				        var btnAddServer = e.menu.add({
				            title : L('AddServer_button_title'),
				            showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS			            
				        });
				        btnAddServer.addEventListener('click', function(e) {
				            btnAddServerClick();
				        });
				    };
				    win.getActivity().invalidateOptionsMenu();
		        };	        
		    };
		});	
	};
	
	var css = Ti.API.WxsCss;
	
	/*if(OS_IOS){
		var btnBack = Ti.UI.createButton({
			//title: 'back'
			title: L('NavButton_back')
		});
		win.leftNavButton = btnBack; 
		btnBack.addEventListener('click', function() {
			win.close();
		});
	};*/
	
/*	//Misaurazione dello schermo
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	var w = 0;
	var h = 0;
	if (pWidth < pHeight) {
		w = pWidth;
		h = pHeight;
	} else {
		h = pWidth;
		w = pHeight;
	};
	
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		// Rimisaurazione dello schermo
		pWidth = Ti.Platform.displayCaps.platformWidth;
		pHeight = Ti.Platform.displayCaps.platformHeight;
		if (pWidth < pHeight) {
			w = pWidth;
			h = pHeight;
		} else {
			h = pWidth;
			w = pHeight;
		};
	});
*/	
	var data = [];
	//empty data array
	
	var tblServer = Titanium.UI.createTableView({
		/*width : pWidth - 20,
		height : 272,
		top : 120,
		left : 10,
		backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2,*/
		top : 0,
		backgroundColor : css.bcTvColor,
		bottom : 0,
		separatorColor : css.separatorColor,
		moving : true, // solo per iPhone
		moveable : true	// solo per iPhone
	});
	win.add(tblServer);
	
	//create a table row - SERVICE
	var row = Titanium.UI.createTableViewRow({
		width : tblServer.width,
		height : css.rowHeight,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'SERVICE',
		text : L('AddServer_row1_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : css.titleHeight,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : win.service,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : css.descriptionColor,
		left : 10,
		bottom : 5,
		height : css.descriptionHeight,
		width : row.width
	});
	row.add(titleRow);
	row.add(descriptionRow);
	
	//add the table row to our data[] object
	data.push(row);
	
	//create a table row - NAME
	var row = Titanium.UI.createTableViewRow({
		width : tblServer.width,
		height : css.rowHeight,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'NAME',
		text : L('AddServer_row2_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : 30,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : win.name,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : css.descriptionColor,
		left : 10,
		bottom : 5,
		height : css.descriptionHeight,
		width : row.width
	});	
	row.add(titleRow);
	row.add(descriptionRow);
	
	//add the table row to our data[] object
	data.push(row);
	
	//create a table row - URL
	var row = Titanium.UI.createTableViewRow({
		width : tblServer.width,
		height : css.rowHeight,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'URL',
		text : L('AddServer_row3_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		height : 30,
		width : row.width
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : win.urlServer,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : css.descriptionColor,
		left : 10,
		bottom : 5,
		height : css.descriptionHeight,
		width : row.width
	});
	row.add(titleRow);
	row.add(descriptionRow);
	
	//add the table row to our data[] object
	data.push(row);
	
	//finally, set the data property of the tableView to our data[] object
	tblServer.data = data;
	
	//create a button to save a server to the addedServers array
	//
	var btnAddServer = Titanium.UI.createButton({
		//title : 'Confirm',
		title : L('AddServer_button_title'),
		font : {
			fontSize : 18,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'bold'
		},
		bottom : 5,
		right : 10,
		height : 40
		//width : 190,
		//height : 88,
		//width : Math.round(w / 4),
		//height : Math.round(h / 12),
		//backgroundImage : '/images/button.png'
	});
	
	//create event listener
	var btnAddServerClick = function(e) {
		//btnAddServer.backgroundImage = '/images/btnSettings_focused.png';
		//Verify if new server exists into addedServers
		var addedServers = [];
		if (Ti.App.Properties.hasProperty('addedServers')) {
			addedServers = Ti.App.Properties.getList('addedServers');
		};
		//Ti.API.info("AddServer - Verifica esistenza - addedServers.length: " + addedServers.length);
		var existServer = false;
		for (var i = 0; i < addedServers.length; i++) {
			if (addedServers[i].url == win.urlServer) {
				existServer = true;
			};
		};
		//If new server doesn't exist then we add it, otherwise nothing to do
		if (existServer == true) {
			var dialog = Ti.UI.createAlertDialog({
				//message : 'New ' + win.service + ' server added',
				message : String.format(L('AddServer_existServer_message'), win.urlServer),
				ok : 'OK',
				//title : 'Server added'
				title : L('AddServer_existServer_title')
			}).show();
		} else {
			// Send request to server and save response to xml text
	
			// activity indicator for entertainment
			var indicatorStyle;
			if (Ti.Platform.name === 'iPhone OS'){
			  	indicatorStyle = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
			}
			else {
			  	indicatorStyle = Ti.UI.ActivityIndicatorStyle.DARK;
			}
			var actInd = Ti.UI.createActivityIndicator({
		  		color: 'black',
		  		font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  		message: 'Loading data...',
		  		style: indicatorStyle,
		  		//top: 10,
		  		//left: 10,
		  		height: Ti.UI.SIZE,
		  		width: Ti.UI.SIZE
			});
			win.add(actInd);
			actInd.show();
	
			//declare the http client object to retrieve Capabilities XML
			var xhr = Titanium.Network.createHTTPClient();
	
			//this method will process the remote data
			xhr.onload = function() {
				var xmlText = this.responseText;
				var covArray = [];
				var newServer = {
					name : tblServer.data[0].rows[1].children[1].text,
					type : tblServer.data[0].rows[0].children[1].text,
					url : tblServer.data[0].rows[2].children[1].text,
					getCapabilities : xmlText,
					describeCoverageArray : covArray //resolve iOS problem
					//describeCoverageArray : null
				};
	
				//newServer.getCoverage = xmlText;
				addedServers.push(newServer);
				Ti.App.Properties.setList('addedServers', addedServers);
	
				var dialog = Ti.UI.createAlertDialog({
					//message : 'New ' + win.service + ' server added',
					message : String.format(L('AddServer_OkDialog_message'), win.service),
					ok : 'OK',
					//title : 'Server added'
					title : L('AddServer_OkDialog_title')
				});
				dialog.addEventListener('click', function(e) {
					Ti.API.info('The cancel button was clicked');
					win.close();
				});
				actInd.hide();
				dialog.show(); 
			};
	
			//this method will fire if there's an error in accessing the remote data
			xhr.onerror = function(e) {
				alert(L('AddServer_ErrorDialog_message'));
			};
	
			//Create the Request string for Capabilities
			var strRequest = win.urlServer + '?Service=' + win.service + '&Request=GetCapabilities';
	
			xhr.open('GET', strRequest);
	
			//finally, execute the call to the remote feed
			xhr.send();
	
		}
	
	};
	btnAddServer.addEventListener('click', btnAddServerClick);
	
	//win.add(btnAddServer);
	if(OS_IOS)
		win.rightNavButton = btnAddServer;
	
	//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
	/*win.addEventListener('blur', removeTable);
	function removeTable(e) {
		win.remove(tblServer);
	}*/
	
	/*
	btnAddServer.addEventListener('touchstart', function(e) {
		btnAddServer.backgroundImage = '/images/button_focused.png';
	});
	
	btnAddServer.addEventListener('touchend', function(e) {
		btnAddServer.backgroundImage = '/images/button.png';
	});
	*/
	return win;
};
module.exports = createAddServerWindow;