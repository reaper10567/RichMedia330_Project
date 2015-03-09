"use strict";

var app = app || {};

app.WaterDroplet = function(){
	
	function waterDroplet(x,y,radius,xVel,yVel,canvasWidth,canvasHeight){
		this.color = "#A2B";
		this.x = x;
		//console.log(this.x);
		this.y = y;
		this.radius = radius;
		this.xVel = xVel;
		//console.log(this.xVel);
		this.yVel = yVel;
		//console.log(this.yVel);
		this.yAccel = .11;
		this.active = true;
		this.canvasHeight = canvasHeight;
		this.canvasWidth = canvasWidth;
		this.age=0;
	};
	
	var wD = waterDroplet.prototype;
	
	wD.draw = function(ctx){
		//console.log("Drawing droplet!");
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	};
	
	wD.update = function(dt){
		this.yVel += this.yAccel;
		this.x+= this.xVel*dt;
		this.y+= this.yVel*dt;
		//console.log(dt);
		if(this.y >= this.canvasHeight){
			this.y = this.canvasHeight-this.radius;
		}
		if(this.x <= 0){
			this.x = this.radius;
		}
		if(this.x >= this.canvasWidth){
			this.x = this.canvasWidth-this.radius;
		}
		this.age++;
		if(this.age > 1500){
			this.active = false;
		}
	};
	

	return waterDroplet;
}();