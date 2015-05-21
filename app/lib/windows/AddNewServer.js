/**
 * @author Francesco
 */

createAddNewServerWindow = function(win2Properties){
	
	var css = Ti.API.WxsCss;
	
	//Parent window = AvailableServers.js
	//reference the current window
	//var win = Titanium.UI.currentWindow;
	var win = Titanium.UI.createWindow(win2Properties);
	win.applyProperties({
		//url : '/windows/AddNewServer.js',
		//title : 'Add new server',
		title : L('AddNewServer_win_title'),
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
	});*/
	
	//create a button to save a server to the addedServers array
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
	
	//empty data array
	var data = [];
	
	var tblServer = Titanium.UI.createTableView({
		//height : pHeight - 20,
		//height : 'auto',
		//width : w - 20,
		//height : 272,
		//top : 120,
		/*top : btnAddServer.top + btnAddServer.height + 10,
		left : 10,
		backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2,*/
		//moving : true, // solo per iPhone
		//moveable : true	// solo per iPhone
		top : 0,
		backgroundColor : css.bcTvColor,
		bottom : 0,
	});
	
	win.add(tblServer);
	
	//create a table row - SERVICE
	var row = Titanium.UI.createTableViewRow({
		//width : 'auto',
		width : tblServer.width,
		height : css.rowHeight,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'SERVICE',
		text : L('AddNewServer_row1_title'),
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
		text : 'WCS',
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#2f4f4f',
		color : css.descriptionColor,
		left : 10,
		bottom : 5,
		height : css.descriptionHeight,
		width : 80
		//width : row1.width
	});
	row.add(titleRow);
	row.add(descriptionRow);
	
	var updatedRow = row;
	
	var optService = {
		cancel : 2,
		options : ['WCS', 'WMS', 'Cancel'],
		selectedIndex : 0,
		destructive : 0,
		title : L('AddNewServer_OptionDialog_title')
	};
	row.addEventListener('click', function(e) {
		var dialog = Ti.UI.createOptionDialog(optService);
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				optService.selectedIndex = 0;
				updatedRow.children[1].text = 'WCS';
				tblServer.updateRow(0, updatedRow);
			} else if (e.index == 1){
				optService.selectedIndex = 1;
				updatedRow.children[1].text = 'WMS';
				tblServer.updateRow(0, updatedRow);
			};
		});
		dialog.show();
	});
	
	//add the table row to our data[] object
	data.push(row);
	
	//create a table row - NAME
	var row = Titanium.UI.createTableViewRow({
		//width : 'auto',
		width : tblServer.width,
		height : 60,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'NAME',
		text : L('AddNewServer_row2_title'),
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
	var txtName = Ti.UI.createTextField({
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#336699',
		color : css.descriptionColor,
		//backgroundColor : '#B0C4DE',
		left : 0,
		bottom : 5,
		width : row.width,
		//width : 'auto',
		height : 30,
		//minimumFontSize : 14,
		//paddingLeft : 0,
		hintText : L('AddNewServer_row2_hintText')
	});
	
	row.add(titleRow);
	row.add(txtName);
	
	//add the table row to our data[] object
	data.push(row);
	
	//create a table row - URL
	var row = Titanium.UI.createTableViewRow({
		//width : 'auto',
		width : tblServer.width,
		height : 60,
		hasChild : false,
		className : 'server-row',
		backgroundColor : css.bcTvRowColor
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'URL',
		text : L('AddNewServer_row3_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		top : 5,
		width : row.width,
		height : css.titleHeight
	});
	var txtUrl = Ti.UI.createTextField({
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		//borderStyle : 'none',
		//borderColor : 'red',
		//borderWidth : 1,
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		//color : '#336699',
		color : css.descriptionColor,
		//backgroundColor : '#B0C4DE',
		left : 0,
		bottom : 5,
		//width : Ti.UI.SIZE,
		//height : Ti.UI.SIZE,
		width : row.width,
		//width : 'auto',
		height : 30,
		//minimumFontSize : 14,
		//paddingLeft : 0,
		hintText : L('AddNewServer_row3_hintText')
	});
	row.add(titleRow);
	row.add(txtUrl);
	
	//add the table row to our data[] object
	data.push(row);
	
	//finally, set the data property of the tableView to our data[] object
	tblServer.data = data;
	
	//create event listener	
	var btnAddServerClick = function(e) {
		var emptyFields = false;
		if (txtName.value === '') {
			emptyFields = true;
		};
		if (txtUrl.value === '') {
			emptyFields = true;
		};
		if (emptyFields == false) {
			//Verify if new server exists into avalaibleServers
			var avalaibleServers = [];
			if (Ti.App.Properties.hasProperty('avalaibleServers')) {
				avalaibleServers = Ti.App.Properties.getList('avalaibleServers');
			};
			var existServer = false;
			for (var i = 0; i < avalaibleServers.length; i++) {
				if ((avalaibleServers[i].url == txtUrl.value) && (avalaibleServers[i].type == optService.options[optService.selectedIndex]))
				{
					existServer = true;
				};
			};
			//If new server doesn't exist then we add it, otherwise nothing to do
			if (existServer == true) {
				var dialog = Ti.UI.createAlertDialog({
					//message : 'New ' + win.service + ' server added',
					message : String.format(L('AddServer_existServer_message'), txtUrl.value),
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
	
					//Append to avalaibleServers array the new server
					var newAvailableServer = {
						name : txtName.value,
						type : optService.options[optService.selectedIndex],
						url : txtUrl.value
					};
					avalaibleServers.push(newAvailableServer);
					Ti.App.Properties.setList('avalaibleServers', avalaibleServers);
	
					//Append to addedServers array the new server
					var addedServers = [];
					if (Ti.App.Properties.hasProperty('addedServers')) {
						addedServers = Ti.App.Properties.getList('addedServers');
					};
					var covArray = [];
					var newServer = {
						name : txtName.value,
						type : optService.options[optService.selectedIndex],
						url : txtUrl.value,
						getCapabilities : xmlText,
						describeCoverageArray : covArray //resolve iOS problem
						//describeCoverageArray : null
					};
					addedServers.push(newServer);
					Ti.App.Properties.setList('addedServers', addedServers);
					var dialog = Ti.UI.createAlertDialog({
						//message : 'New ' + win.service + ' server added',
						message : String.format(L('AddServer_OkDialog_message'), optService.options[optService.selectedIndex]/*win.service*/),
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
					actInd.hide();
				};
	
				//Create the Request string for Capabilities
				var strRequest = txtUrl.value + '?Service=' + optService.options[optService.selectedIndex] + '&Request=GetCapabilities';
	
				xhr.open('GET', strRequest);
	
				//finally, execute the call to the remote feed
				xhr.send();
			}
		} else {
			var dialog = Ti.UI.createAlertDialog({
				//message : 'Name or URL missed.',
				message : L('AddNewServer_EmptyFields_message'),
				ok : 'OK',
				//title : 'Information'
				title : L('AddNewServer_EmptyFields_title')
			}).show();
		};
	
	};
	btnAddServer.addEventListener('click', btnAddServerClick);
	
	//win.add(btnAddServer);
	if(OS_IOS)
		win.rightNavButton = btnAddServer;
	/*
	//Questo evento serve a rimuovere la tabella, che altrimenti rimarrebbe come sfondo, creando righe sovrapposte
	win.addEventListener('blur', removeTable);
	function removeTable(e) {
		win.remove(tblServer);
	}
	*/
	
	/*btnAddServer.addEventListener('touchstart', function(e) {
		btnAddServer.backgroundImage = '/images/button_focused.png';
	});
	
	btnAddServer.addEventListener('touchend', function(e) {
		btnAddServer.backgroundImage = '/images/button.png';
	});*/
	
	return win;
};

module.exports = createAddNewServerWindow;