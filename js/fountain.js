"use strict";

app.Fountain = function(){
	Fountain.image = undefined;
	function Fountain(x,y,width,height,canvasWidth,canvasHeight, utils){
		this.x=x;
		this.y=y;
		this.width = width;
		this.height = height;
		this.droplets = [];
		this.rate = 10.0;
		this.canvasHeight = canvasHeight;
		this.canvasWidth = canvasWidth;
		
		this.utils = utils;
		this.cooldown = 0;
	};
	
	var f = Fountain.prototype;
	
	f.update = function(dt,data,num){
		var newVelocity = 0;
		this.rate=0;
		//use data in order to set the rate and velocity of the fountain
		for(var i = 0; i < data.length;i++)
		{
			//console.log(num*(255.0/3));
			if(i < num*(255.0/6) && i > num-1*(255.0/6))
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
		if(this.rate > 300){
			this.rate=300;
		}
		if(newVelocity > 600)
		{
			newVelocity = 600;
		}
		//cooldown for making droplets
		this.cooldown += dt;
		//update all of the owned droplets
		for(var i = 0; i < this.droplets.length; i++){
			this.droplets[i].update(dt);
		}
		//remove inactive droplets
		this.droplets = this.droplets.filter(function(waterDroplet){
			return waterDroplet.active;
		});
		
		//make appropriate number of new droplets per the rate
		while(this.cooldown >= 1/this.rate){
			this.droplets.push(new app.WaterDroplet(this.x,this.y-this.height/2,3,app.utils.getRandom(-.4,.4),-newVelocity,this.canvasWidth,this.canvasHeight));
			this.cooldown -= 1/this.rate;
		}

		
	};
	
	f.draw = function(ctx){
		//console.log("drawing fountain!");
		var halfW = this.width/2;
		var halfH = this.height/2;
		
		if(!Fountain.image){
			//console.log("drawing fountain placeholder");
			ctx.fillStyle = "red";
			ctx.fillRect(this.x-halfW,this.y-halfH,this.width,this.height);
		}else{
			ctx.drawImage(Fountain.image,this.x-halfW-15,this.y-halfH+5);
		}
		
		for(var i = 0; i < this.droplets.length; i++){
			this.droplets[i].draw(ctx);
		}
	};
	
	return Fountain;
}();