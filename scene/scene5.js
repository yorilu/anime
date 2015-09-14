require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite', 'EasePack', 'TextPlugin'], function(anole) {


  var scene = new anole.Scene(5, anole.canvas, true);
  scene.createDom = function() {
    // marco that from previous scene3
    anole.setBackgroundColor('rgb(251, 222, 67)');
    anole.setSubtitle('是什么吸引我们来中国的呢？');
    this.container.find(".floating-text").remove();
    this.container.find(".main").remove();
    this.originalText = this.container.find('.text');
    this.originalChair = this.container.find(".chair2")
    this.videos = Array();
    var texts = ["","","","","","","",""];// old codes
    this.titles = [];
    var video = []
    for (var i=1;i<=6;i++) {
      var val = i;
      if (i==1)
        val = i+"_nobutton"
      var v = $("<div><img src='./resource/video"+val+".svg'></img></div>").addClass("video").addClass("v"+i).appendTo(this.container);
      this.videos.push(v);
      this.titles.push($("<div></div>").addClass("title").addClass("t"+i).text(texts[i]).appendTo(v));
    }
    var texts_out = ["传统风俗","历史故事","民间工艺"];
    this.titles_out = [];
    for (var i in texts_out){
      this.titles_out.push($("<div></div>").addClass("title").addClass("o"+i).text(texts_out[i]).appendTo(this.container));
    }
  };

  scene.animation = function() { 
    // var tinyTl = new TimelineLite();
    var delta = 0.8;
    this.tl.addLabel('begin')
          .to([this.originalText], delta*2, {delay:delta, opacity:0}, 'begin')
          var x = ["13%","57%","36%"];
          var y = ["52%","55%","30%"];
          var x = ["36%","61%","1%","1%","47%","74%"];
          var y = ["32%","10%","10%","45%","63%","40%"];
          for (var i in this.videos){
            console.log(this.videos[i]);
            this.tl.to(this.videos[i],delta*2,{delay:-2*delta,opacity:1,left:x[i],top:y[i],y:"0%",scaleX:1,scaleY:1});
          }
          this.tl.to([this.originalChair], delta, {delay:-2*delta, opacity:0});
          this.tl.call(function() {
            anole.setSubtitle('是传统风俗，民间工艺，还是历史故事？');
          });
          this.tl.to(this.titles_out,delta*2, {opacity:1}, '+='+delta*2)
                 .to(this.titles_out, 3, {});
          
        //        .to(this.videos,delta*2,{y:"0%",delay:-delta})
          //      .call(function(){$("#scene5 .video").toggleClass("float-cloud")})
          /*
          .to(this.v_ctn, delta*2, {delay:delta, opacity:1}, 'begin')
          .to(this.hand, delta, {x:"-200%",delay: delta})
          .to(this.hand, delta, {x:"0%"})
          .to(this.v_ctn, 2*delta, {x:"90%",delay:-delta})
          .to(this.titles[0], 2*delta, {opacity:0,x:"50%", delay:-2*delta})
          .to(this.titles[1], 2*delta, {opacity:1,x:"0%", delay:-2*delta})
          .to(this.hand, delta, {x:"-200%",delay: 2*delta})
          .to(this.hand, delta, {x:"0%"})
          .to(this.v_ctn, 2*delta, {x:"180%",delay:-delta})
          .to(this.titles[1], 2*delta, {opacity:0,x:"50%",delay:-2*delta})
          .to(this.titles[2], 2*delta, {opacity:1,x:"0%",delay:-2*delta})*/
  };
  scene.cleanup = function() {
    this.originalText.remove();
    this.container.find(".chair2").remove();
    this.container.find(".chair1").remove();
    // this.tl.to(this.container,1,{opacity:0})
  };
  anole.addScene(scene);
});
