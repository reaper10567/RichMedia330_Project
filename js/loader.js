"use strict";

var app = app || {};

app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_RIGHT":39,
	"KEY_SPACE":32
};

app.IMAGES ={
	derp: undefined,
	internetExploder: undefined,
	fountainImage: undefined 
};

app.keydown = [];

window.onload = function(){
	
	app.waterFountains.app = app;
	app.waterFountains.utils = app.utils;
	//DerpyDerp is the image I made for SG1
	app.IMAGES.derp = new Image();
	app.IMAGES.derp.src = "media/DerpyDerp.png";
	//internet exploder picture from https://mentalbiscuits.wordpress.com/tag/internet-exploder/
	app.IMAGES.internetExploder = new Image();
	app.IMAGES.internetExploder.src="media/internet-exploder.png";
	//base fountain image found from DragoArt.com
	app.IMAGES.fountainImage = new Image();
	app.IMAGES.fountainImage.src = "media/fountain.png";
	
	app.Fountain.image = app.IMAGES.fountainImage;
	app.WaterDroplet.ieImage = app.IMAGES.internetExploder;
	app.WaterDroplet.derpImage = app.IMAGES.derp;

	app.waterFountains.init();

	
	
	window.addEventListener("keydown",function(e){
		app.keydown[e.keyCode] = true;
	});
	
	window.addEventListener("keyup",function(e){
		app.keydown[e.keyCode] = false;
	});
	
	
}