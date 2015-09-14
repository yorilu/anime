;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  var scene = new anole.Scene(16, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  scene.createDom = function() {
    anole.setBackgroundColor("rgb(198, 60, 177)");
    this.mobile = $("<div class='mobile'>").appendTo(this.container);
    this.video = anole.getVideo('toilet');
    $(this.video).appendTo(this.mobile);
    this.dialog = $("<div class='dialog'></div>").appendTo(this.container);
    this.marcoBody = $("<div class='marco2_body'></div>").appendTo(this.container);
    this.head = $("<div class='marco2_head'></div>").appendTo(this.marcoBody);
    this.leftArm1 = $("<div class='marco2_arm1 scratch'></div>").appendTo(this.marcoBody);
    this.leftArm2 = $("<div class='marco2_arm2'></div>").appendTo(this.leftArm1);
    this.leftHand = $("<div class='marco2_hand'></div>").appendTo(this.leftArm2);
    this.rightArm1 = $("<div class='marco2_arm1 right'></div>").appendTo(this.marcoBody);
    this.rightArm2 = $("<div class='marco2_arm2'></div>").appendTo(this.rightArm1);
    this.rightHand = $("<div class='marco2_hand'></div>").appendTo(this.rightArm2); 
    TweenLite.set(this.rightArm1, {scaleX: -1, rotation: 90, left: -0.166 * sceneW});
  }


  scene.animation = function() {
    var duration = 0.2;
    anole.setSubtitle("还有，这个真的是马桶吗？");
    
    var videoPlay = (function() {
      return ( function() {
        anole.playMedia(this.video);
       }.bind(scene) );
    })();

    this.tl.addLabel("playVideo", "+=2")
          .to(this.mobile, duration, {scale: 1.5, left: 0}, "playVideo")
          .call(videoPlay)
          .to(this.dialog, duration*4, {opacity: 1}, "playVideo+=2.5")
          .to(this.marcoBody, duration * 3, {scale: 0.28, top: 0.66 * sceneH, /*left: "-=" + 0.2 * sceneW, */ ease: Linear.easeOut}, "playVideo-=0.4")
          .to(this.video, 4, {});
  }

  scene.cleanup = function() {
    if (this.video) {
      this.video.pause();
      this.video.currentTime = 0;
      anole.putbackVideo('toilet', this.video);
      TweenLite.set(this.video, {opacity: 1, scale: 1, left: -0.01 * sceneW});
    }
  }

  anole.addScene(scene);
});