"use strict";

var app = app || {};

app.Fountain = function(){
	function Fountain(x,y,width,height,canvasWidth,canvasHeight,image){
		this.x=x;
		this.y=y;
		this.width = width;
		this.height = height;
		this.droplets = [];
		this.rate = 5;
		this.canvasHeight = canvasHeight;
		this.canvasWidth - canvasWidth;
		this.image = image;
	};
	
	var f = Fountain.prototype;
	
	f.update = function(dt,rate){
		this.rate = rate;
		for(int i = 0; i < rate*dt; i++){
			this.droplets.push(new app.waterDroplet(this.x,this.y,app.utils.getRandom(.1,5),app.utils.getRandom(3,9),this.canvasWidth,this.canvasHeight));
		}
	};
	
	f.draw = function(ctx){
		if(!this.image){
			
		}else{
			ctx.drawImage(this.image,this.x,this.y);
		}
	};
}();