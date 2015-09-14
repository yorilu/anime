;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  var scene = new anole.Scene(17, anole.canvas, true);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  scene.createDom = function() {
    anole.setBackgroundColor("rgb(198, 60, 177)");
    this.marcoBody = this.container.find(".marco2_body");
    this.container.find(".marco2_head").hide();
    this.marcoHead = $("<div class='marco2_head_yeah'></div>").appendTo(this.marcoBody);
    this.leftArm1 = this.container.find(".scratch");
    this.rightArm1 = this.container.find(".right");
    TweenLite.set(this.marcoHead, {rotation: -20});
    TweenLite.set(this.rightArm1, {scaleX: 1, left: -0.21 * sceneW, top: 0.065 * sceneH});
    TweenLite.set(this.leftArm1, {scaleX: -1, rotation: 0, top: -0.065 * sceneH});
    TweenLite.set([this.leftArm1.find(".marco2_arm2"), this.rightArm1.find(".marco2_arm2")], {rotation: 0, left: 0, top: 0.17 * sceneH});
    this.googleBG = $("<div class='google-background'></div>").appendTo(this.container);
    this.googleText = $("<div class='google-text'></div>").appendTo(this.googleBG);
    this.buttons = [];
    this.buttons[0]= $("<div class='button-replay button'></div>").appendTo(this.googleBG);
    this.buttons[1]= $("<div class='button-infograph button'><a href='resource/infograph.jpg' target='_blank'></a></div>").appendTo(this.googleBG);
    this.buttons[2] = $("<div class='button-fullreport button'><a href='./fullreport.pdf' target='_blank'></a></div>").appendTo(this.googleBG);
    // this.ggzh = $("<div class='ggzh'>谷歌广告纵横</div>").appendTo(this.googleBG);
    this.qr_code = $("<div class='qr-code'></div>").appendTo(this.googleBG);
    this.buttons[0].on('click', function() {
      // this.onForward();
      // anole.playScene(1);
      anole.replay();
    }.bind(this));
  }

  scene.animation = function() {
    var duration = 2;
    anole.setSubtitle("更多来自歪果仁的八卦，Google 为你爆料！");
    anole.setBackgroundColor("#FFFFFF");
    this.tl.addLabel("google")
           .to(this.marcoBody, duration / 5, {scale: 1, top: 0.456 * sceneH, left: "+=" + 0.3 * sceneW}, "google")
           .to(this.leftArm1, duration / 2, {scaleX: 1, rotation: -160}, "google+=" + duration)
           .to(this.leftArm1, duration, {scaleX: -1, rotation: 0}, "google+=" + duration * 3 / 2)
           .set($('.mute-btn'), {display:'none'})
           .from(this.googleBG, duration, {top: -sceneW * 1.1}, "google+=" + duration * 3 / 2)
           .to(anole.getSubtitleCtn(), duration, {opacity: 0}, "google+=" + duration * 3 / 2)
           .fromTo(this.buttons, duration*2/3, {scale:0}, {scale:1, ease:Elastic.easeOut})
           .to(this.qr_code, duration*1.4, {opacity:1}, "-="+duration/2);
  }

  scene.cleanup = function() {
    this.tl.set(anole.getSubtitleCtn(), {clearProps: 'all'});
    this.container.remove();
  }

  anole.addScene(scene);
});