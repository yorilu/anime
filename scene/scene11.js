;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite', 'AttrPlugin'], function (anole){
  var scene = new anole.Scene(11, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  var worryPos = [{picTop: 0.4, picLeft: -0.54, textTop: 0.24, textLeft: -0.488, lineLeft: -0.32, lineTop: 0.39, rotation: 180},
                  {picTop: -0.26, picLeft: -0.264, textTop: -0.26, textLeft: -0.488, lineLeft: -0.17, lineTop: -0.052, rotation: 235},
                  {picTop: -0.26, picLeft: 0.264, textTop: -0.26, textLeft: 0.488, lineLeft: 0.17, lineTop: -0.052, rotation: -55},
                  {picTop: 0.4, picLeft: 0.54, textTop: 0.24, textLeft: 0.488, lineLeft: 0.32, lineTop: 0.39, rotation: 0}
                  ];
  var worryHeight = 0.154 * sceneH, worryTextHeight = 0.09 * sceneH, worryTextWidth = 0.22 * sceneH;
  var headCenterTop = 0.36 * sceneH, headCenterLeft = 0;//centered axis. auto center -> top of head = top of pic

  scene.createDom = function() {
    anole.setBackgroundColor("rgb(134, 204, 23)");
    this.marcoBody = $("<div class='worried-marco-body'></div>").appendTo(this.container);
    this.marcoHead = $("<div class='worried-marco-head'></div>").appendTo(this.container);
    this.marcoLeftArm1 = $("<div class='worried-marco-arm1'></div>").appendTo(this.container);
    this.marcoLeftArm2 = $("<div class='worried-marco-arm2'></div>").appendTo(this.marcoLeftArm1);
    this.marcoLeftHand = $("<div class='worried-marco-hand'></div>").appendTo(this.marcoLeftArm2);
    this.marcoRightArm1 = $("<div class='worried-marco-arm1'></div>").appendTo(this.container);
    this.marcoRightArm2 = $("<div class='worried-marco-arm2'></div>").appendTo(this.marcoRightArm1);
    this.marcoRightHand = $("<div class='worried-marco-hand'></div>").appendTo(this.marcoRightArm2);
    TweenLite.set(this.marcoRightArm1, {scaleX: -1, rotation: -90, left: 0.11 * sceneW});

    //svg lines
    this.lines = [];
    this.worries = [];
    this.worryTexts = [];
    for(var i = 0; i < 4; i++) {
      this.worries.push($("<div class='worry'><img src=" + resourceUrl + "worry" + (i + 1) + ".png></img></div>").appendTo(this.container));
      this.worryTexts.push($("<div class='worry-text'><img src=" + resourceUrl + "worry" + (i + 1) + "_text.png></img></div>").appendTo(this.container));
      this.lines.push($("<div class='svg-line'><svg viewBox='0 0 200 20'><line id='line" + (i + 1) + "' x1='10' x2='10' y1='10' y2='10' stroke='#FFFFFF' stroke-width='20' stroke-linecap='round' stroke-dasharray='1, 40' /></svg></div>").appendTo(this.container));
      TweenLite.set(this.worries[i], {top: worryPos[i].picTop * sceneH, left: worryPos[i].picLeft * sceneW});
      TweenLite.set(this.worryTexts[i], {top: worryPos[i].textTop * sceneH, left: worryPos[i].textLeft * sceneW});
      TweenLite.set(this.lines[i], {top: worryPos[i].lineTop * sceneH, left: worryPos[i].lineLeft * sceneW, rotation: worryPos[i].rotation});
    }
  }

  scene.animation = function() {
    var duration = 0.5;
    anole.setSubtitle("不过，我们对中国还是抱有一些顾虑。");
    this.tl.addLabel("worry1");
    for(var i = 0; i < 4; i++) {
      this.tl.from(this.lines[i].find("#line" + (i + 1)), duration / 4, {opacity: 0}, "worry" + (i + 1))
             .to(this.lines[i].find("#line" + (i + 1)), duration / 2, {attr:{x2: 200}}, "worry" + (i + 1) + "+=" + (duration / 4))
             .from(this.worries[i], duration, {opacity: 0}, "worry" + (i + 1) + "+=" + (duration * 0.45))
             .from(this.worryTexts[i], duration, {opacity: 0, scale: 10, ease: Power4.easeIn}, "worry" + (i + 1) + "+=" + (duration/2))
             .to(this.marcoLeftArm1, duration, {rotation: "-=10"}, "worry" + (i + 1))
             .to(this.marcoLeftArm1, duration, {rotation: "+=10"}, "worry" + (i + 1) + "+=" + duration)
             .to(this.marcoRightArm1, duration, {rotation: "+=10"}, "worry" + (i + 1))
             .to(this.marcoRightArm1, duration, {rotation: "-=10"}, "worry" + (i + 1) + "+=" + duration)
             .addLabel("worry" + (i + 2), '-='+duration/2)
    }
    this.tl.to(this.marcoRightArm1, 4, {});
  }

  scene.cleanup = function() {
  }

  anole.addScene(scene);
});