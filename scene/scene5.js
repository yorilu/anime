;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin'], function (anole){
  var scene = new anole.Scene(5, anole.canvas, false);
  scene.createDom = function() {
    this.container.css("overflow", "visible");
    this.youtube_logo = $("<div><img src='./resource/youtube.png'></img></div>").addClass("youtube-logo").appendTo(this.container);
    this.browser_l = $("<div></div>").addClass("browser-left").appendTo(this.container);
    this.browser_r = $("<div></div>").addClass("browser-right").appendTo(this.container);
    this.youtube = $("<div></div>").addClass("youtube").appendTo(this.browser_l);
    this.boardinfo = $("<div><img src='./resource/boardinfowithbutton.png'></img></div>").addClass("boardinfo").appendTo(this.browser_l);
    for (var i = 0; i < 3; i++) {
      var profile = $("<div><img src='./resource/profileimagewithshadow.png'></img></div>").addClass("profile-list p" + i);
      $("<div></div>").addClass("profile-dash").appendTo(profile);
      $("<div></div>").addClass("profile-dash").appendTo(profile);
      profile.appendTo(this.browser_l);
    }
    for (var i = 1; i < 6; i++) {
      var video = $("<div><img src='./resource/videolist_image" + i + "withshadow.png'></img></div>").addClass("video-list v" + (i - 1));
      $("<div></div>").addClass("video-dash").appendTo(video);
      $("<div></div>").addClass("video-dash").appendTo(video);
      $("<div></div>").addClass("video-dash").appendTo(video);
      video.appendTo(this.browser_r);
    }
    this.youtube_fly = $("<div></div>").addClass("youtube-flyin").appendTo(this.container);
  }
	scene.animation = function() {
    var duration = 0.05;
    this.tl.to(this.youtube_fly, 0.5, {top: 0.0133 * anole.getSceneH(), left: 0.1 * anole.getSceneW(), height: 0.267 * anole.getSceneH(), width: 0.36 * anole.getSceneW(), opacity: 1})
            //.from(this.youtube, duration, {opacity: 0})
            .from(this.boardinfo, duration, {opacity: 0});
    //iterate through profile and video
    var profileCount = this.container.find(".profile-list").length;
    var videoCount = this.container.find(".video-list").length;
    //common variables
    var profileDashHeight = anole.getSceneH() * 0.04;
    var profileDashWidth = anole.getSceneW() * 0.25;
    var videoDashHeight = anole.getSceneH() * 0.03;
    var videoDashWidth = anole.getSceneW() * 0.1;

    for(var i = 0; i < profileCount; i++) {
      var thisProfile = this.container.find(".profile-list.p" + i);
      this.tl.from(thisProfile, duration, {opacity: 0});
      var profileDash = this.container.find(".p" + i + " .profile-dash");
      for(var j = 0; j < profileDash.length; j++) {
        this.tl.set(profileDash[j], {top: j * profileDashHeight, width: Math.floor((Math.random() * profileDashWidth) + 1)})
        .from(profileDash[j], duration, {scaleX:0, transformOrigin:"left"});
      }
    }
    for(var i = 0; i < videoCount; i++) {
      var thisVideo = this.container.find(".video-list.v" + i);
      this.tl.from(thisVideo, duration, {opacity: 0});
      var videoDash = thisVideo.find(".v" + i + " .video-dash");
      for(var j = 0; j < videoDash.length; j++) {
        this.tl.set(videoDash[j], {top: j * videoDashHeight, width: Math.floor((Math.random() * videoDashWidth) + 1)})
        .from(videoDash[j], duration, {scaleX:0, transformOrigin:"left"});
      }
    }
  }
	scene.cleanup = function() {
    this.container.removeClass("over-logo");
  }
  anole.addScene(scene);
});
