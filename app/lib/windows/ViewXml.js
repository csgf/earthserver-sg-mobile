/**
 * @author Francesco
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Titanium.UI.setBackgroundColor('#000');
//Titanium.UI.setBackgroundImage('/images/bgImage.png');

var css = Ti.API.WxsCss;

//Parent window = WmsMetadata.js, WcsMetadata.js
//reference the current window
var win = Titanium.UI.currentWindow;

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

//Misaurazione dello schermo
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//title label
var txtXML = Titanium.UI.createTextArea({
	font : {
		fontSize : css.descriptionFontSize,
		fontWeight : 'normal'
	},
	/*backgroundColor : '#B0C4DE',
	borderRadius : 12,
	borderColor : '#AFEEEE',
	borderWidth : 2,
	color : '#000',
	//color : '#fff',*/
	color : css.titleColor,
	backgroundColor : css.bcTvRowColor,
	left : 5,
	right : 5,
	top : 0,
	bottom : 0,
	//width : pWidth - 20,
	//height : pHeight - 110,
	autocorrect: false,
	editable: false,
	//hintText: "Please wait..."
	hintText: L('ViewXml_wait_message')
});

//Converte un oggetto XML in un testo
txtXML.value = Titanium.XML.serializeToString(win.xml);

win.add(txtXML);
