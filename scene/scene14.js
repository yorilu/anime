;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(14, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();
  scene.update_text_func = function(text){
    return function(){
      anole.setSubtitle(text);
    }
  }
  scene.createDom = function() {
    anole.setBackgroundColor('rgb(198, 60, 177)');
    this.marco = $("<div class='marco2'></div>").appendTo(this.container);
    this.m_body = $("<div class='marco2_body'></div>").appendTo(this.marco);
    this.head = $("<div class='marco2_head'></div>").appendTo(this.m_body);
    this.l_ctn = $("<div class='l_ctn'></div>").appendTo(this.m_body);
    this.arm1_l = $("<div class='marco2_arm1 left'></div>").appendTo(this.l_ctn);
    this.arm2_l = $("<div class='marco2_arm2 left wave'></div>").appendTo(this.arm1_l);
    this.arm1_r = $("<div class='marco2_arm1 right'></div>").appendTo(this.m_body);
    this.arm2_r = $("<div class='marco2_arm2 right'></div>").appendTo(this.arm1_r);
    this.hand_r = $("<div class='marco2_hand'></div>").appendTo(this.arm2_r);
    this.hand_l = $("<div class='marco2_hand left'></div>").appendTo(this.arm2_l);

    this.map = $("<div class='canada_map'></div>").appendTo(this.container);
  }
  scene.animation = function() {
      var msg = ['另外，八卦点你不知道的事：'];
      this.tl.call(this.update_text_func(msg[0]))
          .to(this.map,1.7,{scaleX:1.2,scaleY:1.2,opacity:1,ease:Elastic.easeOut})
          .to(this.map, 3.5, {});
  }
  scene.cleanup = function() {
  }
  anole.addScene(scene);
});
