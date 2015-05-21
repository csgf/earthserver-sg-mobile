/**
 * @author Francesco
 */

//Parent window = WmsGetMap.js
//reference the current window

createWmsBackground_addLayer = function(){
	var css = Ti.API.WxsCss;
	
	var win = Ti.UI.createWindow({
		title: 'Background',
		modal : OS_IOS ? true : false,
		backgroundImage : '/images/bgImage.png'
	});//Titanium.UI.currentWindow;
	
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
		        };	        
		    };
		});	
	};
	
	
	var lastSelectedRow = '';
	
	/*if(OS_IOS){
		var btnBack = Ti.UI.createButton({
			//title: 'back'
			title: L('NavButton_back')
		});
		win.leftNavButton = btnBack; 
		btnBack.addEventListener('click', function() {
			//win.remove(tblTransparent);
			//win.remove(tblColors);
			win.close();
		});
		};*/
	
	win.addEventListener('android:back', function() {
		//win.remove(tblTransparent);
		//win.remove(tblColors);
	    win.close();
	});
	
	win.addEventListener("close", function(){
		win.remove(tblTransparent);
		win.remove(tblColors);	
	});
	
	//Misaurazione dello schermo
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	
	var win1 = Titanium.UI.createWindow({
		title: L('WmsRgbOther_win_title'),
		url : '/windows/WmsRgbOther.js',
		modal : OS_IOS ? true : false,
		//backgroundColor : '#fff',
		backgroundImage : '/images/bgImage.png',
		//xml : win.xml
	});
	win1.padre = win.padre;
	if(OS_ANDROID){
		win1.addEventListener('open', function() {
			var actionBar;	
		    if (! win1.activity) {
		        Ti.API.error("Can't access action bar on a lightweight window.");
		    } else {
		        actionBar = win1.activity.actionBar;
		        if (actionBar) {
		            actionBar.displayHomeAsUp = true;
		            actionBar.onHomeIconItemSelected = function() {
		                //Ti.API.info("Home icon clicked!");
		               win1.close();
		            };
		        };	        
		    };
		});	
	};
	
	var bgColors = [
				{'text': 'Black', 'value': '0x000000'},
				{'text': 'Blue', 'value': '0x0000FF'},
				{'text': 'Brown', 'value': '0xA52A2A'},
				{'text': 'Cyan', 'value': '0x00FFFF'},
				{'text': 'Gray', 'value': '0x808080'},
				{'text': 'Green', 'value': '0x00FF00'},
				{'text': 'Magenta', 'value': '0xFF00FF'},
				{'text': 'Orange', 'value': '0xFFA500'},
				{'text': 'Purple', 'value': '0x800080'},
				{'text': 'Red', 'value': '0xFF0000'},
				{'text': 'White', 'value': '0xFFFFFF'},
				{'text': 'Yellow', 'value': '0xFFFF00'}
	];
	
	//Create the tableView
	/*var tblTransparent = Titanium.UI.createTableView({
		width : pWidth - 20,
		height : 90,
		top : 20,
		left : 10,
		backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2
	});
	*/
	var tblTransparent = Ti.UI.createView({
		top : "0dp",
		height : css.rowHeight,
		left : 0,
		right : 0,
		backgroundColor : css.bcTvRowColor
	});
	
	var sectionTransparent = Ti.UI.createTableViewSection({
		//headerTitle : 'Choose a color'
		//headerTitle : L('WmsBackground_addLayer_section1')
	});
	
	//create a table row
	/*var row = Titanium.UI.createTableViewRow({
		hasChild : false,
		width : tblTransparent.width,
		className : 'imageSetting-row'
	});*/
	//title row
	var titleRow = Titanium.UI.createLabel({
		//text : 'Transparent',
		text : L('WmsBackground_addLayer_row1_title'),
		font : {
			fontSize : css.titleFontSize,
			fontWeight : 'bold'
		},
		color : css.titleColor,
		left : 10,
		//top : 5,
		width : 'auto',
		height : 30
	});
	//row.add(titleRow);
	var basicSwitch = Ti.UI.createSwitch({
		titleOn:'ON',
	  	titleOff:'OFF',
	  	value: true,
		//top: 420, 
		//left: (w - 400)/2,
		right: 10,
		//top: 5,
	 	//width: 80, 
	  	height: 40
	});
	//win.add(basicSwitch);
	basicSwitch.addEventListener('change',function(e){
		//Ti.API.info('Switch value: ' + basicSwitch.value);
	  	if (basicSwitch.value == true) {
			tblColors.visible = false;
	  	} else {
			tblColors.visible = true;
	  	};
	});
	//row.add(basicSwitch);
	//sectionTransparent.add(row);
	//tblTransparent.data = [sectionTransparent];
	
	tblTransparent.add(titleRow);
	tblTransparent.add(basicSwitch);
	win.add(tblTransparent);
	
	
	//Create the tableView
	var tblColors = Titanium.UI.createTableView({
		//width : pWidth - 20,
		//height : pHeight - 210,
		top : parseInt(css.rowHeight) + "dp",
		//left : 10,
		visible : false,
		/*backgroundColor : '#B0C4DE',
		borderRadius : 12,
		borderColor : '#AFEEEE',
		borderWidth : 2,*/
		minRowHeight : css.rowHeight,
		backgroundColor : css.bcTvColor,
		bottom : 0,
		separatorColor : css.separatorColor			
	});
	
	var sectionColors = Ti.UI.createTableViewSection({
		headerTitle : 'Choose a color'
		//headerTitle : L('WmsBackground_addLayer_section2')
	});
	
	//var values = dimensionItem.textContent.split(',');
	for (var i = 0; i < bgColors.length; i++) {
		//create a Value row
		var row = Titanium.UI.createTableViewRow({
			//width : tblColors.width,
			//height : 90,
			backgroundColor : css.bcTvRowColor,
			height : css.rowHeight,
			hasChild : false,
			className : 'bgColor-row'
		});
		//title row
		var titleRow = Titanium.UI.createLabel({
			//text : 'Color',
			text : bgColors[i].text,
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'bold'
			},
			color : css.titleColor,
			left : 10,
			top : 5,
			height : css.titleHeight,
			right  :"10dp",
			//width : row.width - 20
		});
		//description row
		var descriptionRow = Titanium.UI.createLabel({
			text : bgColors[i].value,
			font : {
				fontSize : css.descriptionFontSize,
				fontWeight : 'normal'
			},
			color : css.descriptionColor,
			//color : '#000',
			left : 10,
			right : "10dp",
			bottom : "5dp",
			height : css.descriptionHeight
		});
		row.add(titleRow);
		row.add(descriptionRow);
		
		//add our little icon to the right of the row
		var iconImage = Titanium.UI.createImageView({
			image : '/images/check.png',
			width : 48,
			height : 48,
			right : 10,
			//top : 20,
			visible : false
		});
		row.add(iconImage);
		
		sectionColors.add(row);
	};
	
	//create a Other row
	var row = Titanium.UI.createTableViewRow({
		//width : tblColors.width,
		backgroundColor : css.bcTvRowColor,
		height : css.rowHeight,
		hasChild : true,
		className : 'other-row'
	});
	//title row
	var titleRow = Titanium.UI.createLabel({
		text : 'Other',
			font : {
				fontSize : css.titleFontSize,
				fontWeight : 'bold'
			},
			color : '#00CD00',
			left : 10,
			top : 5,
			height : css.titleHeight,
			right  :"10dp",
			//width : row.width - 20
	});
	//description row
	var descriptionRow = Titanium.UI.createLabel({
		text : '',
		font : {
			fontSize : css.descriptionFontSize,
			fontWeight : 'normal'
		},
		color : css.descriptionColor,
		//color : '#000',
		left : 10,
		right : "10dp",
		bottom : "5dp",
		//top : 35,
		//width : row.width - 20,
		height : css.descriptionHeight
	});
	//add our little icon to the right of the row
	var iconImage = Titanium.UI.createImageView({
		image : '/images/check.png',
		width : 48,
		height : 48,
		right : 10,
		//top : 20,
		visible : false
	});
	row.add(titleRow);
	row.add(descriptionRow);
	row.add(iconImage);
	sectionColors.add(row);
	
	tblColors.data = [sectionColors];
	win.add(tblColors);
	
	tblColors.addEventListener('click', function(e) {
		if (lastSelectedRow == '') {
			lastSelectedRow = e.row;
		} else if (lastSelectedRow.children[0].text != e.row.children[0].text) {
			lastSelectedRow.children[2].visible = false;
			lastSelectedRow = e.row;
		};
		e.row.children[2].visible = !e.row.children[2].visible;
		//alert(e.row.children[0] + ' - ' + e.row.children[2].visible);
		if ((e.row.children[0].text == 'Other') && (e.row.children[2].visible == true)) {
			win1.selectedRow = e.row;
			if (Ti.App.isAndroid == true) {
				win1.open();
			} else {
				win.padre.openWindow(win1);	
			};
		};
	});
	
	win.addEventListener('close', updateBgColorRow);
	function updateBgColorRow() {  
		var isTransparent = true;
		//var updatedRow = win.selectedRow;
		for (var i = 0; i < tblColors.data[0].rowCount; i++) {		
			if (tblColors.data[0].rows[i].children[2].visible == true) {
				//updatedRow.children[1].text = tblColors.data[0].rows[i].children[1].text;
				isTransparent = false;
				win.fireEvent("updateBgColorRow", {BgColorText:tblColors.data[0].rows[i].children[1].text});
				//return;
			};	
		};
		if (isTransparent == true) {
			win.fireEvent("updateBgColorRow", {BgColorText:'Transparent'});
			//updatedRow.children[1].text = 'Transparent';		
		};
	};
	
	return win;
};
module.exports = createWmsBackground_addLayer;