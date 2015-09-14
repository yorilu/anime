;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(6, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();

  scene.createDom = function() {
    anole.setBackgroundColor('#fbde43');
    this.video2 = $("<img class='video-base video2' src='./resource/video2.svg'/>").appendTo(this.container);
    this.video1 = $("<img class='video-base video1' src='./resource/video1.svg'/>").appendTo(this.container);
    this.video3 = $("<img class='video-base video3' src='./resource/video3.svg'/>").appendTo(this.container);
    this.video4 = $("<img class='video-base video4' src='./resource/video4.svg'/>").appendTo(this.container);
    this.video5 = $("<img class='video-base video5' src='./resource/video5.svg'/>").appendTo(this.container);
    this.video6 = $("<img class='video-base video6' src='./resource/video6.svg'/>").appendTo(this.container);
    this.mobile = $("<img class='mobile' src='./resource/mobile.svg'/>").appendTo(this.container);
    this.mobileScreen = $("<div class='mobile-screen'></div>").appendTo(this.container);
    this.video1_mobile = $("<div class='screen-video'/>").appendTo(this.mobileScreen);
    this.mvideo1 = $("<img class='mvideo1' src='./resource/video1_nobutton.svg'/>").appendTo(this.video1_mobile);
    this.silkRoad = $("<img class='silk-road' src='./resource/text_silkroad.svg'/>").appendTo(this.container);

    this.marco = $("<div class='marco2'></div>").appendTo(this.container);
    $("<div class='marco2_left_leg'></div>").appendTo(this.marco);
    $("<div class='marco2_right_leg'></div>").appendTo(this.marco);
    this.rightHand = $("<div class='marco2_hand_right'></div>").appendTo(this.marco);
    $("<div class='marco2_body'></div>").appendTo(this.marco);
    $("<div class='marco2_hand_left'></div>").appendTo(this.marco);
    $("<div class='marco2_head'></div>").appendTo(this.marco);
  }
  scene.animation = function() {
    var msg = '而我来中国的目的，自然是重访祖辈曾走过的丝绸之路。';
    anole.setSubtitle(msg);
    var move_delta = 0.3;
    var videos2 = [this.video2,this.video3,this.video4,this.video5,this.video6];

    this.tl.to(this.video4,move_delta,{top:"45%",left:"2%"})
            .to(this.video5,move_delta,{delay:-move_delta,top:"63%",left:"48%"})
            .to(this.video6,move_delta,{delay:-move_delta,top:"40%",left:"75%"})
            .to([this.video1,this.video2,this.video3],move_delta,{delay:-move_delta,opacity:1})

    this.tl.to($("#scene6 .main"),1,{opacity:0})
        .set(this.rightHand, {rotation:-120,delay: 0.1})
        .addLabel("loading")
        .fromTo(this.rightHand, 0.4, {rotation:-120}, {rotation:-150})
        .fromTo(this.rightHand, 0.4, {rotation:-150}, {rotation:-120})
        .to(videos2, 0.4, {scale:0, opacity:0}, "mobile")
        .to(this.marco, 1.0, {left:"-=60%", scale:1.2, ease: "Linear.easeNone"}, "mobile+=0.1")
        .to(this.video1, 1.0, {left:"-10%", top:"-10%", width:"120%", height: "120%",ease: "Linear.easeNone"}, "mobile+=0.1")
        .addLabel("video", "mobile+=1")
        .set(this.mobile, {width: "100%", top:"0%",left:"0%",height:"100%", ease: "Linear.easeNone"}, "video")
        .set(this.mobileScreen, {left:"-10%",top:"-10%",width:"120%",height:"120%", ease: "Linear.easeNone"}, "video")
        .set(this.video1, {opacity:0}, "video")
        .set([this.mobile,this.video1_mobile], {opacity:1}, "video")
        .to(this.mobile, 0.8, {left:"20%",top:"17%",width:"60%",height:"62%"}, "video")
        .to(this.mobileScreen, 0.8, {left:"36%",top:"16%",width:"28.2%",height:"62%"}, "video")
        .fromTo(this.silkRoad, 0.8, { scale:3, opacity:0 }, { scale:1, opacity:1, ease: "Linear.easeNone"}, "video")
        .addLabel("play", "video+=1")
        .to(this.mvideo1, 0, {opacity:1}, "play")
        .to(this.mvideo1, 1, {scale:1.6}, "play+=0.2")
        .to(this.mvideo1, 0.6, {css:{"margin-left":"-30%"},ease: "Linear.easeNone"}, "play+=1.2")
        .to(this.mvideo1, 0.7, {css:{"margin-left":"-86%"},ease: "Linear.easeNone"}, "play+=1.8")
        .to(this.mvideo1, 0.5, {scale:1, ease:"Power4.easeNone"}, "play+=2.5")
        .to(this.silkRoad, 0.5, {scale:0.3}, "play+=2.5")
        .to(this.mvideo1, 0, {opacity:0, ease:"Elastic.easeOut"}, "play+=3.4")
      ;
  }
  scene.cleanup = function() {
      this.container.find(".video-base").remove();
      this.container.find(".marco2").remove();
  }
  anole.addScene(scene);
});
