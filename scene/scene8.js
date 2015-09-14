;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  var scene = new anole.Scene(8, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  scene.createDom = function() {
    anole.setBackgroundColor('#fbde43');
    //copy from scene6
    this.mobile = $("<div class='mobile'>").appendTo(this.container);
    this.mobileScreen = $("<div class='mobile-screen'></div>").appendTo(this.mobile);
    this.dunhuang = $("<div class='dunhuang-zoom'></div>").appendTo(this.mobileScreen);
    this.marco = $("<div class='marco2'></div>").appendTo(this.container);
    $("<div class='marco2_left_leg'></div>").appendTo(this.marco);
    $("<div class='marco2_right_leg'></div>").appendTo(this.marco);
    this.rightHand = $("<div class='marco2_hand_right'></div>").appendTo(this.marco);
    this.welBoard = $("<div class='welcome-board'></div>").appendTo(this.rightHand);
    $("<div class='marco2_body'></div>").appendTo(this.marco);
    $("<div class='marco2_head'></div>").appendTo(this.marco);
    this.leftHand = $("<div class='marco2_hand_left'></div>").appendTo(this.marco);
    this.leftHand2 = $("<div class='marco2_hand_left2'></div>").appendTo(this.marco);
    TweenLite.set(this.marco, {scale: 1.2});
    TweenLite.set(this.rightHand, {rotation: -135});
    this.jbDark = $("<div class='jb-dark'></div>").appendTo(this.dunhuang);
    this.jb = $("<div class='jb'></div>").appendTo(this.container);
    this.jbHand = $("<div class='jb-hand'></div>").appendTo(this.jb);
  }

  scene.animation = function() {
    var duration = 0.8;
    anole.setSubtitle(/*"而且，"＋*/"每5个游客中就有1个听说过中国推出的丝绸之路旅游年。");
    this.tl.to(this.marco, duration / 4, {scale: 1.4, top: "54%", ease: Elastic.easeIn.config(1, 1)})
           .to(this.marco, duration, {top: "56%", left: "14%", ease: Power3.easeOut}, "+=" + duration)
           .addLabel("marcoDown")
           .to(this.leftHand, duration, {opacity: 0}, "marcoDown")
           .from(this.leftHand2, duration, {opacity: 0}, "marcoDown")
           .to(this.mobile, duration, {rotation: -90}, "marcoDown-=" + (duration / 2))
           .to(this.rightHand, duration, {rotation: -45}, "marcoDown")
           .to(this.dunhuang, duration, {rotation: 90, scale: 0.85, left: -0.512 * sceneW, top: -0.65 * sceneH}, "marcoDown")
           .to(this.dunhuang, duration * 2, {top: 0.78125 * sceneH}, "marcoDown+=" + duration)
           .to(this.welBoard, duration / 2, {opacity: 1}, "marcoDown+=" + (duration * 1.5))
           .to(this.rightHand, duration, {rotation: -135}, "marcoDown+=" + (duration * 2))
           .to(this.welBoard, duration, {rotation: 135}, "marcoDown+=" + (duration * 2));

    this.tl.to(this.jb, duration / 2, {opacity: 1})
           .to(this.jbHand, duration / 2, {rotation: 60})
           .to(this.jbHand, duration / 2, {rotation: 20});
  }

  scene.cleanup = function() {
  }

  anole.addScene(scene);
});