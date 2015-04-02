"use strict";

var app = app || {};

app.WaterDroplet = function(){
	//static functions and variables!
	waterDroplet.internetExploder = false;
	waterDroplet.derp = false;
	waterDroplet.ieImage = undefined;
	waterDroplet.derpImage = undefined;
	waterDroplet.r = 0;
	waterDroplet.b = 255;
	waterDroplet.g = 0;
	waterDroplet.color = "blue";
	waterDroplet.changeColor = function(){
		waterDroplet.color = "rgba("+waterDroplet.r+","+waterDroplet.g+","+waterDroplet.b+",255)";
	}
	
	function waterDroplet(x,y,radius,ang,vel,canvasWidth,canvasHeight){
		this.x = x;
		//console.log(this.x);
		this.y = y;
		this.radius = radius;
		
		//realistic math for the velocity
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
		if(waterDroplet.derp){
			ctx.drawImage(waterDroplet.derpImage,this.x-10,this.y-20);
		}
		else if(waterDroplet.internetExploder){
			ctx.drawImage(waterDroplet.ieImage,this.x-10,this.y-20);
		}
		else{
			ctx.fillStyle = waterDroplet.color;
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}
		
	};
	
	wD.update = function(dt){
		this.yVel += this.yAccel;
		this.x+= this.xVel*dt;
		this.y+= this.yVel*dt;
		//console.log(dt);
		//hitting bottom of canvas
		if(this.y+this.radius >= this.canvasHeight){
			//this.active=false;
			if(Math.abs(this.yVel) > 5)
				this.yVel *= -.3;
			else{
				this.active = false;
			}
		}
		//hitting left side of canvas
		if(this.x-this.radius <= 0){
			this.xVel*=-0.8;
		}
		//hitting right side of canvas
		else if(this.x+this.radius >= this.canvasWidth){
			this.xVel*=-0.8;
		}
		this.age++;
		//droplets only stay active for 600 ticks or 10 seconds
		if(this.age > 600){
			this.active = false;
		}
	};
	

	return waterDroplet;
}();