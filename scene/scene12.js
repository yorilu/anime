require(['anole', 'zepto'], function(anole, Scene) {

    // The timing probably need to refine according to the script
    var TIME_DELTA = 0.25;
    var MOVE_LATENCY = 0.5;
    var VIDEO_LATENCY = 0;
    var SWITCH_LATENCY = 0.5;

    var background = $('<svg class="video-background" width="650" height="450"><polygon fill="grey" stroke="none" points="0,40 20,340 570,380 600,10"></polygon></path></svg>');

    var scene = new anole.Scene(12, anole.canvas, true);
    scene.name = 'scene12.js';

    scene.createDom = function() {
        this.koreanContainer = this.container.find('.koreans');
        this.bg = this.container.find('.bg11');

        this.frenchContainer = $("<div class='french'></div>").appendTo(this.bg);
        this.french = $("<div id='f1'></div>").addClass("canadian f1").appendTo(this.frenchContainer);
        this.videoBG = background.hide().appendTo(this.bg);
        this.youtubeLogo = $('<div class="youtube-logo"></div>').hide().appendTo(this.bg);
        this.video = $('<video webkit-playsinline="">' +
        '<source src="./resource/french.webm" type="video/webm">' +
        '<source src="./resource/french.mp4" type="video/mp4">' +
        'Your browser does not support the video tag.</video>').hide().appendTo(this.bg)
    };

    scene.animation = function() {
        var rotateCenter = "50% -100%";

        this.tl.addLabel('rotate', "+=" + SWITCH_LATENCY)
            // koreans go away
            .to(this.koreanContainer, TIME_DELTA * 2, {
                rotation: "-=180",
                transformOrigin: rotateCenter,
                ease: Elastic.easeIn.config(1, 0.6)
            }, "rotate")
            // setup french
            .set(this.frenchContainer, {rotation: 0}, "rotate")
            .to(this.frenchContainer, 0, {
                rotation: "+=180",
                transformOrigin: rotateCenter
            })
            .to(this.french, 0, {rotationY: 0})
            // french come in
            .to(this.frenchContainer, TIME_DELTA * 2, {
                rotation: "-=180",
                transformOrigin: rotateCenter,
                ease: Elastic.easeOut.config(1, 0.6)
            }, "+=0.25")
            // move to left bottom
            .to(this.french, TIME_DELTA * 2, {
                left: "-280",
                top: "+=120",
                scale: '0.8',
                ease: Power2.easeInOut
            }, "+=" + MOVE_LATENCY)
            .call(function() {
                // move french div one level up to workaround the z-index issue.
                this.french.appendTo(this.bg);
            }.bind(this))
            .addLabel('play', "+=" + VIDEO_LATENCY)
            .to([this.videoBG, this.youtubeLogo], 0, {display: "block"}, "play")
            .to([this.video], 0, {display: "block"}, "+=0.25")
            .call(function() {
                this.tl.pause(); // You can only do this when no other animation are being played.
                anole.playMedia(this.video[0]);
                this.video.on('ended', function() {
                    this.tl.resume();
                }.bind(this))
            }.bind(this))
            //hide elements
            .set([this.videoBG, this.youtubeLogo, this.video, this.french], {display: "none"})
    };
    scene.cleanup = function() {
        this.video[0].pause();
        this.videoBG.remove();
        this.koreanContainer.remove();
    };
    anole.addScene(scene);
});
