;require(['anole', 'zepto', 'TweenLite', 'EasePack','CSSPlugin', 'AttrPlugin', 'TimelineLite', 'BezierPlugin'], function (anole){

  var scene = new anole.Scene(13, anole.canvas, false);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();

  scene.createDom = function() {
      anole.setBackgroundColor('rgb(198, 60, 177)');
      var smilePoint = [{top:"10%", left:"10%"},{top:"40%",left:"8%"},{top:"60%",left:"11%"},
          {top:"25%",left:"20%"},{top:"13%",left:"35%"},{top:"10%",left:"50%"},{top:"45%",left:"52%"},
          {top:"45%",left:"22%"},{top:"33%",left:"30%"},{top:"30%",left:"47%"},{top:"55%",left:"42%"},
          {top:"9%",left:"75%"},{top:"21%",left:"70%"},{top:"35%",left:"70%"},{top:"25%",left:"85%"},{top:"54%",left:"83%"}];
      this.smiles = [];
      for(var i=0;i<smilePoint.length;i++){
          this.smiles.push($("<div class='emoji-smile'></div>").appendTo(this.container));
          this.smiles[i].css("top",smilePoint[i].top);
          this.smiles[i].css("left",smilePoint[i].left);
      }
      this.visa = $("<div class='visa'></div>").appendTo(this.container);
      this.pos = $("<div class='pos'></div>").appendTo(this.container);
      this.splitLine = $("<div class='split-line'></div>").appendTo(this.container);
      this.cry = $("<div class='emoji-cry'></div>").appendTo(this.container);
      var coinsPoint = [{left:"18.5%"},{left:"28.5%"},{left:"38.5%"},{left:"63.5%"}];
      this.coins = [];
      for(var i=0;i<coinsPoint.length;i++){
          this.coins.push($("<div class='coin'></div>").appendTo(this.container));
          this.coins[i].css("left",coinsPoint[i].left);
      }
      this.coinText1 = $("<span class='money'>$3,400</span>").css("left","26%").appendTo(this.container);
      this.coinText2 = $("<span class='money'>$1,799</span>").css("right","26%").appendTo(this.container);
      this.coinText3 = $("<span class='money morethan'>+￥10,000</span>").appendTo(this.container);
  }
  scene.animation = function() {
      var msg = ['玩得越开心，越爱买！买！买！',
                 '表示满意的游客比不太满意的游客平均多消费1万元'];
      var orbit = [ 
          {left:"80%", top:"40%"},
          {left:"74%", top:"55%"},
          {left:"69%", top:"45%"},
          {left:"69%", top:"45%"},
          {left:"64%", top:"55%"},
          {left:"64%", top:"50%"},
          {left:"64%", top:"55%"},
         ];
      this.tl.addLabel("begin")
          .set(this.smiles[0], {opacity:0}, "begin")
          .set(this.cry, {opacity:0}, "begin")
          .call(function(){anole.setSubtitle(msg[0]);})
          .staggerFromTo(this.smiles, 0.1, {opacity:0}, {opacity:1}, 0.1, "begin")
          .addLabel("pos", "begin+=1.6")
          .set(this.pos, {opacity:1}, "pos")
          .set(this.visa, {opacity:1, scale: 1.5}, "pos")
          .fromTo(this.visa, 0.4, {top:"-=10%"}, {top:"+=10%"}, "pos+=0.4")
          .fromTo(this.visa, 0.4, {left:"-=5%"}, {left:"+=45%"}, "pos+=0.8")
          .fromTo(this.visa, 0.4, {left:"-=0%"}, {left:"+=45%"}, "pos+=1.2")
          .fromTo(this.visa, 0.4, {left:"-=0%"}, {left:"+=45%", ease: Linear.easeOut}, "pos+=1.6")
          .addLabel("coins", "pos+=2")
          .set(this.smiles[0], {opacity:0}, "coins")
          .call(function(){anole.setSubtitle(msg[1]);})
          .to(this.smiles.slice(1), 0.4, {opacity:0}, "coins")
          .to([this.pos, this.visa], 0.4, {opacity:0}, "coins")
          .fromTo(this.smiles[0], 0.4, {opacity:1}, {width:"25%",height:"30%",left:"20%",top:"20%"}, "coins+=0.4")
          .fromTo(this.cry, 0.4, {opacity:0}, {opacity:1,width:"25%",height:"30%",right:"20%",top:"20%"}, "coins+=0.4")
          .to(this.splitLine, 0.4, {opacity:1}, "coins+=0.4")
          .to(this.coins.slice(0,3), 0.4, {opacity:1}, "coins+=0.8")
          .set(this.coins[3], {left:"105%", top:"0%", opacity:1}, "coins+=0.8")
          .to(this.coins[3], 2, {bezier:{curvinessspecial:1, values:orbit}, ease:"Power4.easeInOut"}, "coins+=0.8")
          .to([this.coinText1,this.coinText2], 0.4, {opacity:1}, "coins+=0.8")
          // .to(this.coinText3, 0.4, {opacity:1}, "coins+=0.8")
          .fromTo(this.coinText3, 2, {scale:0.1, opacity:0, top:'40%'}, {opacity:1, top:'10%', scale:1, ease:Bounce.easeOut}, "coins+=0.8")     
          .to(this.coinText3, 1.5, {});
  }
  scene.cleanup = function() {
  }
  anole.addScene(scene);
});