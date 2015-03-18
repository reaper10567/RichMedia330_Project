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
	
	f.update = function(dt,data,num){
		var newVelocity = 0;
		this.rate=0;
		for(var i = 0; i < data.length;i++)
		{
			if(i < num*(255.0/6))
			{
				if(data[i]>200)
				{
					this.rate +=2;
					if(num == 1)
					{
						newVelocity += 58;
					}
					if(num==2)
					{
						newVelocity += 49;
					}
					if(num==3)
					{
						newVelocity += 70;
					}
					
				}
				if(data[i] > 50 && data[i] < 200)
				{
					this.rate++;
					if(num == 1)
					{
						newVelocity += 36;
					}
					if(num==2)
					{
						newVelocity += 40
					}
					if(num==3)
					{
						newVelocity += 32
					}
					
				}
				if(data[i] <= 50)
				{
					this.rate--;
					if(num == 1)
					{
						newVelocity -= 20;
					}
					if(num==2)
					{
						newVelocity -= 30;
					}
					if(num==3)
					{
						newVelocity -= 42;
					}
					
				}
			}
		}
		if(this.rate < 0)
		{
			this.rate = 0;
		}
		if(this.rate > 400){
			this.rate=400;
		}
		if(newVelocity > 600)
		{
			newVelocity = 600;
		}
		//1/rate
		this.cooldown += dt;
		
		for(var i = 0; i < this.droplets.length; i++){
			this.droplets[i].update(dt);
		}
		
		this.droplets = this.droplets.filter(function(waterDroplet){
			return waterDroplet.active;
		});
		
		
		while(this.cooldown >= 1/this.rate){
			this.droplets.push(new app.WaterDroplet(this.x,this.y-this.height/2,3,app.utils.getRandom(-.4,.4),-newVelocity,this.canvasWidth,this.canvasHeight));
			this.cooldown -= 1/this.rate;
		}
		/*if(this.cooldown >= 1){
			for(var i = 0; i < this.cooldown; i++){
				this.droplets.push(new app.WaterDroplet(this.x,this.y-this.height/2,3,app.utils.getRandom(-.4,.4),-500,this.canvasWidth,this.canvasHeight));
			}
			this.cooldown = 0;
		}*/

		
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