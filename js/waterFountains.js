"use strict";

var app = app || {};

app.waterFountains = {
	WIDTH : 640,
	HEIGHT : 480,
	NUM_SAMPLES : 256,
	SOUND_1 :'media/New Adventure Theme.mp3',
	SOUND_2 :'media/Peanuts Theme.mp3',
	SOUND_3 :'media/The Picard Song.mp3',
	SOUND_4 :"media/Homestuck - Homestuck Vol. 9 - 08 Pumpkin Party in Sea Hitler's Water Apocalypse.mp3",
	audioElement: undefined,
	analyserNode: undefined,
	
	canvas: undefined,
	ctx : undefined,
	fountains:[],
	fountainImage : undefined,
	dt: 1/60.0,
	data: [],
	
	utils:undefined,
	
	
	init : function(){
		//get canvas set up properly
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		//console.log(this.ctx);
		this.fountains.push(new app.Fountain(100,400,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		this.fountains.push(new app.Fountain(540,400,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		this.fountains.push(new app.Fountain(320,300,40,90,this.WIDTH,this.HEIGHT,this.fountainImage,this.utils));
		
		this.audioElement = document.querySelector('audio');
		
		this.analyserNode = this.createWebAudioContextWithAnalyserNode(this.audioElement);
		
		this.setupUI();
		this.playStream(this.audioElement,this.SOUND_4);
		this.update();
	},
	
	update : function(){
		
		
		this.data = new Uint8Array(this.NUM_SAMPLES/2); 
			
			// populate the array with the frequency data
			// notice these arrays can be passed "by reference" 
		this.analyserNode.getByteFrequencyData(this.data);
		
			// OR
			//analyserNode.getByteTimeDomainData(data); // waveform data
			
			// DRAW!
			//ctx.clearRect(0,0,800,600);  
			
		for(var i = 0; i < this.fountains.length; i++){
			//console.log(this.dt);
			this.fountains[i].update(this.dt,80);
		}
		this.draw();
		requestAnimationFrame(this.update.bind(this));
	},
	
	draw : function(){
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0,0,640,480);
		/*var barWidth = 4;
		var barSpacing = 1;
		var barHeight = 100;
		var topSpacing = 50;
		
		// loop through the data and draw!
		for(var i=0; i<this.data.length; i++) { 
			this.ctx.fillStyle = 'rgba(0,255,0,0.6)'; 
			
			// the higher the amplitude of the sample (bin) the taller the bar
			// remember we have to draw our bars left-to-right and top-down
			//ctx.fillRect(i * (barWidth + barSpacing),topSpacing + 256-data[i],barWidth,barHeight); 
			//ctx.fillRect(640 - i * (barWidth + barSpacing), topSpacing + 256-data[i] - 20, barWidth,barHeight);
			
			
			this.ctx.beginPath();
			this.ctx.arc(i * (barWidth + barSpacing),(topSpacing + 256-this.data[i])+50,5,0,2*Math.PI);
			this.ctx.closePath();
			this.ctx.fill();
			
			this.ctx.beginPath();
			this.ctx.arc(640 - i * (barWidth + barSpacing),(topSpacing + 256-this.data[i])+50,5,0,2*Math.PI);
			this.ctx.closePath();
			this.ctx.fill();
			
			this.ctx.strokeStyle = "red";
			
			if(i+1 != this.data.length)
			{
				this.ctx.beginPath();
				this.ctx.moveTo(i * (barWidth + barSpacing),(topSpacing + 256-this.data[i])+50);
				this.ctx.lineTo((i+1) * (barWidth + barSpacing),(topSpacing + 256-this.data[i+1])+50);
				this.ctx.stroke();
			}
			
			this.ctx.strokeStyle="blue";
			if(i+1 != this.data.length)
			{
				this.ctx.beginPath();
				this.ctx.moveTo(640 - i * (barWidth + barSpacing),(topSpacing + 256-this.data[i])+50);
				this.ctx.lineTo(640 - (i+1) * (barWidth + barSpacing),(topSpacing + 256-this.data[i+1])+50);
				this.ctx.stroke();
			}
		}*/
		for(var i = 0; i < this.fountains.length; i++){
			this.fountains[i].draw(this.ctx);
		}
		
		var totalDroplets = 0;
		for(var i = 0; i < this.fountains.length; i++){
			totalDroplets+=this.fountains[i].droplets.length;
		}
		
		this.ctx.font = "25px Georgia";
		this.ctx.strokeText("Total Droplets: " + totalDroplets,10,30);
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