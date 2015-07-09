;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function (anole){
  var scene = new anole.Scene(4, anole.canvas, false);
  scene.createDom = function() {
  this.test = $("<div></div>").css({backgroundColor:"gray", width:"300px", height:"200px"}).appendTo(this.container);
    //this.prevScene = $("<div></div>").append("scene3").html()).appendTo(this.container);
  }
  scene.animation = function() {
    //this.tl.to(this.prevScene, 2, {color: #37474F; backgroundColor: #37474F; opacity: 0;});
    //TODO set the color of whole page to #37474F and rotate to fit a certain box.
    $("#scene3").hide();
    this.tl.to(this.test, 1, {scale: 2});
  }
  scene.cleanup = function() {

  }
  anole.addScene(scene);
});
