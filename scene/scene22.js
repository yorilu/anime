;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(22, anole.canvas, false);
	
	var TIME_DELTA = 0.25;
	var MOVE_LATENCY = 0.5;
	var VIDEO_LATENCY = 0.5;
	var SWITCH_LATENCY = 0.5;
	
	var background = $('<svg class="video-background" width="650" height="450"><polygon fill="grey" stroke="none" points="0,40 20,340 570,380 600,10"></polygon></path></svg>');
	
	scene.createDom = function() {
        this.toiletContainer = $("<div class='toilet-ctn'></div>").appendTo(this.container);
        this.toilet = $("<div></div>").addClass("toilet").appendTo(this.toiletContainer);
        this.videoBG = background.hide().appendTo(this.container);
        this.youtubeLogo = $('<div class="youtube-logo"></div>').hide().appendTo(this.container);
        this.video = $('<video webkit-playsinline="">' +
        '<source src="resource/toilet.webm" type="video/webm">' +
        '<source src="resource/toilet.mp4" type="video/mp4">' +
        'Your browser does not support the video tag.</video>').hide().appendTo(this.container)
	}
	
	scene.animation = function() {
        var centerX = this.container.offset().left;
        var centerY = this.container.offset().top - 200; // control the circle radius
        this.rotateCenter = centerX + "px " + centerY + "px";

        this.tl.set([this.videoBG, this.youtubeLogo, this.video], {display: "none"})
		       /*.set(this.toiletContainer, {rotation: 0}, "rotate")
		       .to(this.toiletContainer, 0, {
				   rotation: "+=180",
				   transformOrigin: this.rotateCenter
			   })
			   .to(this.toilet, 0, {rotationY: 0})
			   .to(this.toiletContainer, TIME_DELTA * 2, {
				   rotation: "-=180",
				   transformOrigin: this.rotateCenter,
				   ease: Elastic.easeOut.config(1, 0.6)
			   }, "+=0.25")
			   // move to left bottom
			   .to(this.toilet, TIME_DELTA * 2, {
				   left: "-280",
				   top: "+=120",
				   scale: '0.8',
				   ease: Power2.easeInOut
			   }, "+=" + MOVE_LATENCY)
			   
			   .call(function() {
				   // move french div one level up to workaround the z-index issue.
				   this.toilet.appendTo(this.bg);
			   }.bind(this))
			   */
			   .addLabel('play', "+=" + VIDEO_LATENCY)
			   .to([this.videoBG, this.youtubeLogo, this.video], 0, {display: "block"}, "play")
			   .call(function() {
				   this.tl.pause(); // You can only do this when no other animation are being played.
					   anole.playMedia(this.video[0]);
				   this.video.on('ended', function() {
					   this.tl.resume();
				   }.bind(this))
			   }.bind(this))
			   //hide elements
			   .to([this.videoBG, this.youtubeLogo, this.video, this.toilet], TIME_DELTA * 2, {opacity: 0, delay:1})
	}
	scene.cleanup = function() {
		this.video[0].pause();
	}
	anole.addScene(scene);
})
