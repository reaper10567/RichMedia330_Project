"use strict";

var app = app || {};

app.waterFountains = {
	WIDTH : 640,
	HEIGHT : 480,
	NUM_SAMPLES : 256,
	//audio from the original audio visualiser (my base)
	SOUND_1 :'media/New Adventure Theme.mp3',
	SOUND_2 :'media/Peanuts Theme.mp3',
	SOUND_3 :'media/The Picard Song.mp3',
	//from the Homestuck Vol.9 album that i purchased and own
	SOUND_4 :"media/Homestuck - Homestuck Vol. 9 - 17 Minihoof's Adventure.mp3",
	audioElement: undefined,
	analyserNode: undefined,
	
	canvas: undefined,
	ctx : undefined,
	fountains:[],
	fountainImage : undefined,
	data : [],
	dt: 1/60.0,
	
	utils:undefined,
	
	
	init : function(){
		//get canvas set up properly
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		//console.log(this.ctx);
		this.fountains.push(new app.Fountain(100,400,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		this.fountains.push(new app.Fountain(320,300,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		this.fountains.push(new app.Fountain(540,400,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		
		
		this.audioElement = document.querySelector('audio');
		
		this.analyserNode = this.createWebAudioContextWithAnalyserNode(this.audioElement);
		
		this.setupUI();
		this.playStream(this.audioElement,this.SOUND_4);
		this.update();
	},
	
	update : function(){
		
		requestAnimationFrame(this.update.bind(this));
		this.data = new Uint8Array(this.NUM_SAMPLES/2); 
			
			// populate the array with the frequency data
			// notice these arrays can be passed "by reference" 
		this.analyserNode.getByteFrequencyData(this.data);
			

			
		//update all of the fountains then draw!
		this.fountains[0].update(this.dt,this.data,1);
		this.fountains[1].update(this.dt,this.data,2);
		this.fountains[2].update(this.dt,this.data,3);
		this.draw();
		
	},
	
	draw : function(){
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,640,480);
		//draw the cool circles
		for(var i=0; i < this.data.length; i++){
			var percent = this.data[i]/255;
			var maxRadius = 200;
			var circleRadius = percent*maxRadius;
			
			this.ctx.beginPath();
			this.ctx.fillStyle = this.makeColor(255,111,111,.34-percent/3.0);
			this.ctx.arc(this.canvas.width/2,this.canvas.height/2,circleRadius,0,2*Math.PI,false);
			this.ctx.fill();
			this.ctx.closePath();
			
			this.ctx.beginPath();
			this.ctx.fillStyle = this.makeColor(255,0,0,.10-percent/10.0);
			this.ctx.arc(this.canvas.width/2,this.canvas.height/2,circleRadius*1.5,0,2*Math.PI,false);
			this.ctx.fill();
			this.ctx.closePath();
			
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.fillStyle = this.makeColor(200,200,0,.5-percent/5.0);
			this.ctx.arc(this.canvas.width/2,this.canvas.height/2,circleRadius*.5,0,2*Math.PI,false);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.restore();
		}
		//draw all of the fountains (which call their droplets)
		for(var i = 0; i < this.fountains.length; i++){
			this.fountains[i].draw(this.ctx);
		}
	},
	
	createWebAudioContextWithAnalyserNode: function(audioElement) {
		var audioCtx, analyserNode, sourceNode;
		// create new AudioContext
		// The || is because WebAudio has not been standardized across browsers yet
		// http://webaudio.github.io/web-audio-api/#the-audiocontext-interface
		audioCtx = new (window.AudioContext || window.webkitAudioContext);
		
		// create an analyser node
		analyserNode = audioCtx.createAnalyser();
		
		/*
		We will request NUM_SAMPLES number of samples or "bins" spaced equally 
		across the sound spectrum.
		
		If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
		the third is 344Hz. Each bin contains a number between 0-255 representing 
		the amplitude of that frequency.
		*/ 

		// fft stands for Fast Fourier Transform
		analyserNode.fftSize = this.NUM_SAMPLES;
		
		// this is where we hook up the <audio> element to the analyserNode
		sourceNode = audioCtx.createMediaElementSource(audioElement); 
		sourceNode.connect(analyserNode);
		
		
		// here we connect to the destination i.e. speakers
		analyserNode.connect(audioCtx.destination);
		
		return analyserNode;
	},
		
	setupUI:function(){
		document.querySelector("#trackSelect").onchange = function(e){
			app.waterFountains.playStream(app.waterFountains.audioElement,e.target.value);
		};
		
		document.querySelector("#fsButton").onclick = function(){
			app.waterFountains.requestFullscreen(app.waterFountains.canvas);
		};
		document.getElementById("red").onchange = function(e){	
			app.WaterDroplet.r = e.target.value;
			app.WaterDroplet.changeColor();
		};
		document.getElementById("green").onchange = function(e){
			app.WaterDroplet.g = e.target.value;
			app.WaterDroplet.changeColor();
		};
		document.getElementById("blue").onchange = function(e){
			app.WaterDroplet.b = e.target.value;
			app.WaterDroplet.changeColor();
		};
		document.getElementById("derp").onchange = function(e){
			app.WaterDroplet.derp = e.target.checked;
			app.WaterDroplet.internetExploder = false;
		};
		document.getElementById("internetExploder").onchange = function(e){
			app.WaterDroplet.internetExploder = e.target.checked;
			app.WaterDroplet.derp = false;
		};
		document.getElementById("none").onchange = function(e){
			app.WaterDroplet.derp = false;
			app.WaterDroplet.internetExploder = false;
		}
	},
	
	playStream: function(audioElement,path){
		this.audioElement.src = path;
		this.audioElement.play();
		this.audioElement.volume = 0.2;
		document.querySelector('#status').innerHTML = "Now playing: " + path;
	},
		
	makeColor:function(red, green, blue, alpha){
   		var color='rgba('+red+','+green+','+blue+', '+alpha+')';
   		return color;
	},
		
	requestFullscreen:function(element) {
		if (element.requestFullscreen) {
		  element.requestFullscreen();
		} else if (element.mozRequestFullscreen) {
		  element.mozRequestFullscreen();
		} else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
		  element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
		  element.webkitRequestFullscreen();
		}
		// .. and do nothing if the method is not supported
	},
};