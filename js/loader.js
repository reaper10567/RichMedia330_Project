"use strict";

var app = app || {};

app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_RIGHT":39,
	"KEY_SPACE":32
};

app.IMAGES ={

};

app.keydown = [];

window.onload = function(){
	
	app.waterFountains.app = app;
	app.waterFountains.utils = app.utils;
	//app.Fountain.app = app;
	//app.waterDroplet.app = app;
	
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	//app.queue.on("complete",function(){
		app.waterFountains.init();
	//});
	
	//app.queue.loadManifest([]);
	
	window.addEventListener("keydown",function(e){
		app.keydown[e.keyCode] = true;
	});
	
	window.addEventListener("keyup",function(e){
		app.keydown[e.keyCode] = false;
	});
}