;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(1, anole.canvas, true);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  var mapHeight = 0.12 * sceneH;
  var circleRadius = Math.floor(sceneH * 0.15);
  var marcoHeight = 0.13 * sceneH;
  var earthScale = 0.05;
  var marcoScale = 0.1;

  scene.createDom = function() {
    anole.setBackgroundColor('#4BC5E0');
    this.earth = this.container.find(".earth-ctn");
    this.map2 = this.container.find(".map-two");
    this.italyBuilding = this.container.find(".italy-building");
    this.year = this.container.find(".year-ctn");
    this.svg_ctn = this.container.find(".svg-circle");
    this.movingCircle = this.container.find(".circle");

    this.marco = $("<div class='marco'></div>").appendTo(this.container);
    //following order is critical
    this.marcoLeftLeg = $("<div class='marco-left-leg'></div>").appendTo(this.marco);
    this.marcoRightLeg = $("<div class='marco-right-leg'></div>").appendTo(this.marco);
    this.marcoBody = $("<div class='marco-body'></div>").appendTo(this.marco);
    this.marcoHead = $("<div class='marco-head'></div>").appendTo(this.marco);
    //to cover body
    this.marcoLeftArm1 = $("<div class='marco-left-arm1'></div>").appendTo(this.marco);
    this.marcoLeftArm2 = $("<div class='marco-left-arm2'></div>").appendTo(this.marcoLeftArm1);
    this.marcoLeftHand = $("<div class='marco-left-hand'></div>").appendTo(this.marcoLeftArm2);
    TweenLite.set(this.marcoLeftArm1, {rotation: 45, transformOrigin: "100% 0%"});
    TweenLite.set(this.marcoLeftArm2, {rotation: -40, transformOrigin: "50% 0%"});
    this.marcoRightArm1 = $("<div class='marco-right-arm1'></div>").appendTo(this.marco);
    this.marcoRightArm2 = $("<div class='marco-right-arm2'></div>").appendTo(this.marcoRightArm1);
    this.marcoRightHand = $("<div class='marco-right-hand'></div>").appendTo(this.marcoRightArm2);
    TweenLite.set(this.marcoRightArm1, {scaleX: -1, rotation: -30, transformOrigin: "0% 0%"});
    TweenLite.set(this.marcoRightArm2, {rotation: 5, transformOrigin: "50% 0%"});
    //shadow underneath
    this.marcoShadow = $("<div class='marco-shadow'></div>").appendTo(this.marco);
    TweenLite.set(this.marco, {scale: marcoScale, zIndex: 4});
    //bg-1
    this.treeOne = $("<div class='tree-one-line'><img src='" + resourceUrl + "tree.svg' /><img src='" + resourceUrl + "tree.svg' /><img src='" + resourceUrl + "tree.svg' /><img src='" + resourceUrl + "tree.svg' /></div>").appendTo(this.container);
    this.treeTwo = $("<div class='tree-two-line'></div>").appendTo(this.container);
    this.mountain = $("<div class='mountain'></div>").appendTo(this.container);
    var grasses = [{top: 0.65, left: -0.44},
                   {top: 0.465, left: -0.244},
                   {top: 0.65, left: 0.342}];
    for (var i = 0; i < 3; i++) {
      $("<div class='grass' style='top: " + grasses[i].top * sceneH + "px; left: " + grasses[i].left * sceneW + "px'></div>").appendTo(this.container);
    }
    this.bgBuilding = $("<div class='bg-building'></div>").appendTo(this.container);
    //talk
    this.hello_box = $('<div class="hello-box">Hi, 我是马可波罗君</div>').appendTo(this.container);
    this.triangle = $('<div class="triangle"></div>').appendTo(this.hello_box);
    //bg-2
    this.bgCastle = $("<div class='bg-castle'></div>").appendTo(this.container);
    this.bgGreatWall = $("<div class='bg-greatwall'></div>").appendTo(this.container);
    this.bgHuts = $("<div class='bg-huts'></div>").appendTo(this.container);
    this.bgSand = $("<div class='bg-sand'></div>").appendTo(this.container);
    this.bgTemple = $("<div class='bg-temple'></div>").appendTo(this.container);
    this.book = $("<div class='book'></div>").appendTo(this.container);
    //red mask
    this.bgShadow = $("<div class='bg-shadow'></div>").appendTo(this.container);
  }
  scene.animation = function() {
    var bgm = anole.getAudio(anole.bgmRes);
    if (bgm) {
      anole.bgm = bgm;
    }

    anole.bgm && anole.playMedia(anole.bgm);
    // Begin play background music.

    anole.setSubtitle('700年前，马可波罗揭开了中国的神秘面纱。');
    var duration = 2;
    this.tl.set(this.marco, {opacity: 1});
    this.tl.addLabel("marcoRunning");
    this.tl.to([this.year, this.svg_ctn, this.movingCircle], duration / 4, {opacity: 0}, "marcoRunning")
           .to(this.marco, duration, {scale: 0.55 * sceneH / marcoHeight * marcoScale, ease: Power0.easeNone}, "marcoRunning")
           .to(this.earth, duration, {scale: sceneH  * 2 / mapHeight * 1.1 * earthScale, top: sceneH * 2.02, ease: Linear.easeNone}, "marcoRunning");
    var legCount = 4;
    for(var i = 0; i < legCount; i++){
      if(i % 2 == 0){
        this.tl.to(this.marcoLeftLeg, duration / legCount, {top: 0.0716 * sceneH / marcoScale}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoRightLeg, duration / legCount, {top: 0.045 * sceneH / marcoScale}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoLeftArm1, duration / legCount, {rotation: 90, transformOrigin: "100% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoLeftArm2, duration / legCount, {rotation: -60, transformOrigin: "50% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoRightArm1, duration / legCount, {rotation: -15, transformOrigin: "0% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoRightArm2, duration / legCount, {rotation: 5, transformOrigin: "50% 0%"}, "marcoRunning+=" + i * duration / legCount);
      }
      else {
        this.tl.to(this.marcoRightLeg, duration / legCount, {top: 0.0716 * sceneH / marcoScale}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoLeftLeg, duration / legCount, {top: 0.045 * sceneH / marcoScale}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoLeftArm1, duration / legCount, {rotation: 30, transformOrigin: "100% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoLeftArm2, duration / legCount, {rotation: -5, transformOrigin: "50% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoRightArm1, duration / legCount, {rotation: -60, transformOrigin: "0% 0%"}, "marcoRunning+=" + i * duration / legCount)
               .to(this.marcoRightArm2, duration / legCount, {rotation: 65, transformOrigin: "50% 0%"}, "marcoRunning+=" + i * duration / legCount);
      }
    }
    this.tl.from([this.treeOne, this.treeTwo], duration, {opacity: 0, top: 0.13 * sceneH, left: 0, scale: 0.1, ease: Bounce.easeIn}, "marcoRunning")
           .from(this.container.find(".grass"), duration, {opacity: 0, ease: Back.easeIn.config(1.7)}, "marcoRunning")
           .from(this.mountain, duration, {opacity: 0, left: 0, scale: 0.1, ease: Elastic.easeOut.config(1, 0.3)}, "marcoRunning");
    this.tl.addLabel("marcoIntro");
    this.tl.to(this.marco, duration / 4, {left: -0.6 * sceneW, scale: sceneH / marcoHeight * marcoScale, ease: Power0.easeNone}, "marcoIntro")
           .to(this.marcoShadow, duration / 4, {opacity: 0}, "marcoIntro")
           .to([this.marcoLeftLeg, this.marcoRightLeg], duration / 4, {top: 0.0716 * sceneH / marcoScale}, "marcoIntro")
           .to(this.marcoLeftArm1, duration / 4, {scaleX: -1, rotation: 120, transformOrigin: "100% 0%"}, "marcoIntro")
           .to(this.marcoLeftArm2, duration / 4, {rotation: -30, transformOrigin: "50% 0%"}, "marcoIntro")
           .to(this.marcoRightArm1, duration / 4, {rotation: -10, transformOrigin: "0% 0%"}, "marcoIntro")
           .to(this.marcoRightArm2, duration / 4, {rotation: 0, transformOrigin: "50% 0%"}, "marcoIntro")
           .from(this.bgBuilding, duration / 4, {opacity: 0}, "marcoIntro")
           .to(this.treeTwo, duration / 4, {top: "+=" + 0.05 * sceneH, left: "-=" + 0.05 * sceneW, scale: 1.1}, "marcoIntro")
           .to(this.hello_box, duration / 2, {opacity: 1}, "marcoIntro+=" + duration / 4)
           .to(this.marcoLeftArm1, duration / 4, {rotation: 90, transformOrigin: "100% 0%"}, "marcoIntro+=" + duration / 4)
           .to(this.marcoLeftArm1, duration / 4, {rotation: 120, transformOrigin: "100% 0%"}, "marcoIntro+=" + duration / 2);
    this.tl.addLabel("mapEarth");
    this.tl.to(this.hello_box, duration / 2, {opacity: 0}, "mapEarth")
           .to(this.map2, duration / 2, {left: -mapHeight / earthScale, ease: Linear.easeNone}, "mapEarth")
           .to([this.treeOne, this.treeTwo, this.italyBuilding, this.bgBuilding, this.mountain], duration / 2, {left: - sceneH, opacity: 0}, "mapEarth")
           .to(this.container.find(".grass"), duration / 2, {left: -sceneH / 2, opacity: 0 /*, ease: Elastic.easeIn.config(1, 0.3)*/}, "mapEarth")
           .set(this.treeTwo, {top: 0.52 * sceneH, left: 0})
           .to(this.treeTwo, duration * 2 / 3, {opacity:1} )
           .from([this.bgCastle, this.bgGreatWall, this.bgHuts, this.bgSand, this.bgTemple], duration, {opacity: 0, left: sceneW, scale: 0.1/*, ease: Elastic.easeOut.config(1, 0.3)*/}, "mapEarth");
    this.tl.addLabel("marcoBook");
    this.tl.from(this.book, duration / 4, {opacity: 0, top: 0, left: 0})
           .to(this.book, duration / 4, {scale: 1.25})
           .to(this.book, duration / 4, {scale: 1})
           .to(this.marcoLeftArm1, duration / 4, {scaleX: 1, rotation: -20, transformOrigin: "100% 0%"}, "marcoBook")
           //.to(this.marcoLeftArm2, duration / 4, {rotation: -30, transformOrigin: "50% 0%"}, "marcoBook")
           .to(this.marcoRightArm1, duration / 4, {left: 0.0234 * sceneH / marcoScale, rotation: -120, transformOrigin: "0% 0%"}, "marcoBook");
           //.to(this.marcoRightArm2, duration / 4, {rotation: 0, transformOrigin: "50% 0%"}, "marcoBook");
    //red mask
    this.tl.call(function(){anole.setBackgroundColor('rgb(247,138,100)');})
          .from(this.bgShadow, 0.5, {borderWidth: 0, width: 3 * sceneH, height: 3 * sceneH})
          .to(this.book, 1, {});
  }

  scene.cleanup = function() {
  }
  anole.addScene(scene);
});
