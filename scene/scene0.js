;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'EasePack', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(0, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  var resourceUrl = anole.getResourceUrl();

  var yearStart = 2015;
  var yearEnd = 1275;
  var yearObject = {currentYear: yearStart, playToYear: yearEnd};

  var updateYear = function() {
    var time = 1;
    var tween = TweenLite.to(this.tl, time, {progress: (anole.loadingProgress/100) /*, delay: '-='+time/2*/ }, '-=0.5');
    this.year.text(parseInt(yearObject.currentYear));
  }
  var mapHeight = 0.12 * sceneH;
  var circleRadius = Math.floor(sceneH * 0.15);
  var strokeLength = Math.floor(2*(circleRadius-5)*3.14+1);
  var marcoHeight = 0.13 * sceneH;
  var earthScale = 0.05;
  var marcoScale = 0.1;
  // do not use scale transform as it messes up with keyframe animation.
  // instead, calculate height width rounded by hand.
  //
  // width: 0.12 * $scene_h;
  // height: 0.06 * $scene_h;
  // @include rounded(0.06 * $scene_h 0.06 * $scene_h 0 0);
  var cloudHeight = 0.06 * sceneH, cloudWidth = 0.12 * sceneH;//scale = 1

  var cloudsCord = [{top: 0.325, left: -0.195, scale: 1, opacity: 0.7, toTop: 0.65, toLeft: -0.78, toScale: 1.7},
                    {top: 0.365, left: -0.137, scale: 0.8, opacity: 0.7, toTop: 0.69, toLeft: -0.68, toScale: 1.4},
                    {top: 0.21, left: 0.29, scale: 0.8, opacity: 0.7, toTop: -0.039, toLeft: 0.488, toScale: 1.6},
                    {top: 0.39, left: 0.185, scale: 0.6, opacity: 0.7, toTop: 0.52, toLeft: 0.683, toScale: 1.5},
                    {top: 0.13, left: -0.264, scale: 0.4, opacity: 0.8, toTop: -0.36, toLeft: -0.44, toScale: 1.4},
                    {top: 0.143, left: -0.332, scale: 0.3, opacity: 0.6, toTop: -0.33, toLeft: -0.7, toScale: 1.2},
                    {top: 0.183, left: 0.254, scale: 0.3, opacity: 1, toTop: -0.065, toLeft: 0.39, toScale: 0.6},
                    {top: 0.183, left: 0.215, scale: 0.3, opacity: 1, toTop: -0.065, toLeft: 0.31, toScale: 0.6},
                    {top: 0.156, left: -0.29, scale: 0.2, opacity: 1, toTop: -0.27, toLeft: -0.537, toScale: 0.7},
                    {top: 0.156, left: -0.31, scale: 0.2, opacity: 1, toTop: -0.27, toLeft: -0.615, toScale: 0.7},
                    {top: 0.423, left: 0.136, scale: 0.2, opacity: 0.7, toTop: 0.6, toLeft: 0.63, toScale: 0.5},
                    {top: 0.423, left: 0.166, scale: 0.2, opacity: 0.7, toTop: 0.6, toLeft: 0.55, toScale: 0.5},
                  ];



  scene.createDom = function() {
    anole.setBackgroundColor('#4BC5E0');
    this.year = $("<div class='year-ctn'>" + yearStart + "</div>").appendTo(this.container);

    this.svg_ctn = $("<div class='svg-circle'></div>").appendTo(this.container);
    //inline svg, two cirlces, draw the latter one.
    $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + circleRadius * 2 + ' ' + circleRadius * 2
      + '"><circle fill="none" stroke="#80D6E9" stroke-width="2" cx="' + circleRadius + '" cy="' + circleRadius + '" r="' + (circleRadius - 5)
      + '"/><circle class="loading" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="' + Math.floor(2*(circleRadius - 5)*3.14+1) + '" stroke-dashoffset="-' + Math.floor(2*(circleRadius-5)*3.14+1) + '" cx="' + circleRadius + '" cy="' + circleRadius + '" r="' + (circleRadius - 5) + '" transform="rotate(-90 ' + circleRadius + ' ' + circleRadius + ')"/></svg>')
    .appendTo(this.svg_ctn);
    this.movingCircle = $("<div class='circle'></div>").appendTo(this.container);
    $("<div class='pointer'></div>").appendTo(this.movingCircle);
    $("<div class='loading-text'>LOADING...</div>").appendTo(this.container);

    this.earth = $("<div class='earth-ctn'></div>").appendTo(this.container);
    this.map2 = $("<div class='map-two'><img src='" + resourceUrl + "map.svg' style='top: 0px; left: 0px;' /><img src='" + resourceUrl + "map.svg' style='top: 0px; right:0px;' /></div>").appendTo(this.earth);
    TweenLite.set(this.earth, {scale: earthScale, left: - sceneW / 4, zIndex: 2});//no idea why it isn't in the center.

    this.italyBuilding = $("<div class='italy-building'></div>").appendTo(this.container);
    TweenLite.set(this.italyBuilding, {scale: marcoScale, left: - sceneW / 16, zIndex: 3}); //no idea 2

    this.clouds = [];
    for(var i = 0; i < cloudsCord.length; i++) {
      this.clouds.push($("<div class='white-cloud'></div>").appendTo(this.container));
      TweenLite.set(this.clouds[i], {
        top: cloudsCord[i].top * sceneH, left: cloudsCord[i].left * sceneW,
        height: cloudHeight * cloudsCord[i].scale, width: cloudWidth * cloudsCord[i].scale,
        borderRadius: cloudHeight * cloudsCord[i].scale + "px " + cloudHeight * cloudsCord[i].scale + "px 0px 0px"});
    }
  }
  scene.updateLoadingProgress = function (progress) {
    //yearObject.paused = false;
    //console.log(progress);
    yearObject.playToYear =  yearStart - Math.round (( progress / 100 ) * 740);
    this.tl.play();
  };
  anole.updateLoadingProgress = scene.updateLoadingProgress.bind(scene);
  scene.animation = function() {
    //TODO switch-case 4 quarters as parameter.
    var loadingTime = this.loadingTime = 30;
    $('.canvas-loading').hide();

    this.tl.addLabel("loading", 0.5);
    // quarter 1
    this.tl.to(yearObject, loadingTime, {currentYear: yearEnd, onUpdate: updateYear.bind(this)}, "loading")
           .to(this.movingCircle, loadingTime, {rotation: -360, transformOrigin: "50% 50%", ease: Linear.easeNone}, "loading")
           .to($(".loading"), loadingTime, {attr:{'stroke-dashoffset': 0}, ease: Linear.easeNone}, "loading")
           .to(this.map2, loadingTime / 2, {left: -mapHeight * 2 / earthScale, ease: Linear.easeNone}, "loading")
    //quarter 2
           .set(this.map2, {left: 0}, "loading+=" + loadingTime / 2)
           .to(this.earth, loadingTime / 8, {scale: circleRadius / mapHeight * 2.2 * earthScale, top: 0.22 * sceneH, ease: Linear.easeNone}, "loading+=" + loadingTime / 2)
    //quarter 3
           .to(this.italyBuilding, loadingTime / 8, {opacity: 1}, "loading+=" + loadingTime / 8 * 5);
    for(var i = 0; i < cloudsCord.length; i++) {
      this.tl.to(this.clouds[i], loadingTime / 8 / cloudsCord.length, {opacity: cloudsCord[i].opacity}, "loading+=" + loadingTime / 8 * 5);
    }
    //quarter 4
    this.tl.to(this.earth, loadingTime / 4, {scale: sceneH * 0.7 * 2 / mapHeight * earthScale, top: sceneH + circleRadius * 2, ease: Linear.easeNone}, "loading+=" + loadingTime / 4 * 3)
           .to(this.italyBuilding, loadingTime / 2, {scale: 2 * marcoScale /*circleRadius * 2 / (0.15 * sceneH)*/, top: 0, ease: Bounce.easeOut}, "loading+=" + loadingTime / 4 * 3)
           .set($('.loading-text'), {display: 'none'}, "loading+=" + loadingTime / 4 * 3);
    for(var i = 0; i < cloudsCord.length; i++) {
      this.tl.to(this.clouds[i], loadingTime / 4, {top: cloudsCord[i].toTop * sceneH, left: cloudsCord[i].toLeft * sceneW,
           height: cloudHeight * cloudsCord[i].toScale, width: cloudWidth * cloudsCord[i].toScale,
           borderRadius: cloudHeight * cloudsCord[i].toScale + "px " + cloudHeight * cloudsCord[i].toScale + "px 0px 0px"}, "loading+=" + loadingTime / 2);
    }

  }
  scene.cleanup = function() {
  }
  anole.addScene(scene);
});
