"use strict";

var app = app || {};

app.WaterDroplet = function(){
	
	function waterDroplet(x,y,radius,ang,vel,canvasWidth,canvasHeight){
		this.color = "blue";
		this.x = x;
		//console.log(this.x);
		this.y = y;
		this.radius = radius;
		//this.xVel = xVel;
		//console.log(this.xVel);
		//this.yVel = yVel;
		//console.log(this.yVel);
		this.xVel = vel*Math.sin(ang);
		this.yVel = vel*Math.cos(ang);
		this.yAccel = 10.0;
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
		if(this.y+this.radius >= this.canvasHeight){
			//this.active=false;
			if(Math.abs(this.yVel) > 5)
				this.yVel *= -.3;
			else{
				this.active = false;
			}
		}
		if(this.x-this.radius <= 0){
			this.xVel*=-0.8;
		}
		else if(this.x+this.radius >= this.canvasWidth){
			this.xVel*=-0.8;
		}
		this.age++;
		if(this.age > 500){
			this.active = false;
		}
	};
	

	return waterDroplet;
}();