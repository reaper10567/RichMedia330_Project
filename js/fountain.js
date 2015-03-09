"use strict";

app.Fountain = function(){
	function Fountain(x,y,width,height,canvasWidth,canvasHeight, utils){
		this.x=x;
		this.y=y;
		this.width = width;
		this.height = height;
		this.droplets = [];
		this.rate = 10.0;
		this.canvasHeight = canvasHeight;
		this.canvasWidth = canvasWidth;
		this.image = undefined;
		this.utils = utils;
		this.cooldown = 0;
	};
	
	var f = Fountain.prototype;
	
	f.update = function(dt,rate){
		this.rate = rate;
		this.cooldown += dt*rate;
		
		for(var i = 0; i < this.droplets.length; i++){
			this.droplets[i].update(dt);
		}
		
		this.droplets = this.droplets.filter(function(waterDroplet){
			return waterDroplet.active;
		});
		
		
		/*while(this.cooldown > 60*this.rate*dt){
			this.droplets.push(new app.WaterDroplet(this.x,this.y-this.height/2,3,app.utils.getRandom(-.4,.4),-500,this.canvasWidth,this.canvasHeight));
			this.cooldown -= 60*this.rate*dt;
		}*/
		if(this.cooldown >= 1){
			this.droplets.push(new app.WaterDroplet(this.x,this.y-this.height/2,3,app.utils.getRandom(-.4,.4),-500,this.canvasWidth,this.canvasHeight));
			this.cooldown = 0;
		}

		
	};
	
	f.draw = function(ctx){
		//console.log("drawing fountain!");
		var halfW = this.width/2;
		var halfH = this.height/2;
		
		if(!this.image){
			//console.log("drawing fountain placeholder");
			ctx.fillStyle = "red";
			ctx.fillRect(this.x-halfW,this.y-halfH,this.width,this.height);
		}else{
			ctx.drawImage(this.image,this.x,this.y);
		}
		
		for(var i = 0; i < this.droplets.length; i++){
			this.droplets[i].draw(ctx);
		}
	};
	
	return Fountain;
}();