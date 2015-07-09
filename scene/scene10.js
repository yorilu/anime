;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){

  var scene = new anole.Scene(10, anole.canvas, false);

  scene.id = 10;
  scene.createDom = function() {
    this.ques = $('<div>?</div>').addClass('ques').appendTo(this.container);
    this.banner = $('<div>老外愿意为什么</div>').addClass('banner').appendTo(this.container);
    this.figure = $('<div></div>').addClass('figure').appendTo(this.container);
    this.text = $('<div></div>').addClass('text').appendTo(this.banner);
    this.man = $('<div></div>').addClass('man').appendTo(this.figure);
    this.bag1 = $('<div></div>').addClass('bag1 bag-green').appendTo(this.figure);
    this.bag2 = $('<div></div>').addClass('bag2 bag-green').appendTo(this.figure);
    this.bag3 = $('<div></div>').addClass('bag3 bag-red').appendTo(this.figure);
  }
  scene.animation = function() {
    // TODO: add disappearing of scene9's objests
    this.tl.set(this.ques, {fontSize: "8em"})
           .from(this.ques, 1, {top: "-100%", ease:Elastic.easeOut})
           .to(this.ques, 1, {fontSize: "4em", left: "63%", top: "18%"})
           .set(this.ques, {opacity: 0})
           .addLabel('show')
           .to(this.banner, 0.5, {opacity:1}, 'show')
           .to(this.figure, 0.5, {opacity:1}, 'show')
  }
  scene.cleanup = function() { // Called before entering next scene.
  }
  anole.addScene(scene);
})
