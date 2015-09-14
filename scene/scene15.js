;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(15, anole.canvas, true);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  scene.update_text_func = function(text){
    return function(){
      anole.setSubtitle(text);
    }
  }
  scene.createDom = function() {
    anole.setBackgroundColor('rgb(198, 60, 177)');
    this.head = this.container.find(".marco2_head");
    this.head.toggleClass("wow");
    this.map = this.container.find(".canada_map");
    this.cana_ctn = $("<div class='cana_ctn'></div>").appendTo(this.map);
    this.canadian_hand = $("<div class='canadian_hand'></div>").appendTo(this.cana_ctn);
    this.canadian = $("<div class='canadian'></div>").appendTo(this.cana_ctn);

    this.arm1 = this.container.find(".marco2_arm1.left");
    this.arm2 = this.arm1.find(".marco2_arm2");
    this.arm2.toggleClass("wave");
    this.hand = this.arm2.find(".marco2_hand");
    this.hand.toggleClass("left");

    this.dialog = $("<div class='dialog_box'></div>").appendTo(this.container);
    this.content = $("<div class='content'>Hi, 请叫我<span>贾比伯</span></div>").appendTo(this.dialog);
    this.triangle = $("<div class='triangle'></div>").appendTo(this.dialog);
  }
  scene.animation = function() {
      var msg = ['三个加拿大来华游客中就有一个取了中文名。'];
      var delta = 0.5;
      this.tl.to(this.arm1,delta,{width:"25%",height:"35%",rotation:115})
              .to(this.arm2,delta,{rotation:0},"-="+delta)
              .to(this.map,0.2,{scaleX:1.4,scaleY:1.4,opacity:1})
              .to(this.cana_ctn,0.5,{scaleX:1,scaleY:1,opacity:1},"-=0.1")
              .call(this.update_text_func(msg[0]))
              .to(this.dialog,0.3,{scaleX:1,scaleY:1,opacity:1})
              .to(this.dialog, 4, {});
  }
  scene.cleanup = function() {
  }
  anole.addScene(scene);
});
