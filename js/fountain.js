"use strict";

var app = app || {};

app.Fountain = function(){
	function Fountain(x,y,width,height){
		this.x=x;
		this.y=y;
		this.width = width;
		this.height = height;
		this.droplets = [];
		this.rate = 5;
	};
	
	var f = Fountain.prototype;
}();