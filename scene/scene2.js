;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
   var scene = new anole.Scene(2, anole.canvas, true);
   scene.createDom = function() {
	   var paperman_init = function() {
		   var ppdiv = $("#papermans");
		   if (ppdiv.find(".paperman").length>0)
			   return;
		   var h = ppdiv.height();
		   var w = ppdiv.width();
		   var ph = 0.135*h;
		   var pw = 0.18*h;
		   var n = parseInt(h/ph)-1;
		   var m = parseInt(w/pw)+2;
		   for (var i=0;i<n;i++) {
			   var line = $("<div class = 'paperman-line l"+ (i%2)+ "'></div>");
			   for (var j=0;j<m;j++) {
				   var elm = $("<div class = 'paperman greyman hide'></div>");
				   if (i == parseInt(n/2)+1 && j==parseInt(m/2)) {
					   $("<div></div>").addClass("paperman marco shadow")
					                   .append("<div class = 'marco body'></div>")
									   .appendTo(line);
				   }
				   line.append(elm);
			   }
			   ppdiv.append(line[0]);
		   }
		   return n*m;
	   }

	   this.shade = anole.$$("#shade-scene2",'<div id = "shade-scene2" class = "shade-scene2"></div>',this.container,{opacity:0});
	   this.places = anole.$$('#scene2 .places','<div class="places"></div>',this.container);
	   this.ditch = anole.$$('#scene2 .ditch','<div class="ditch"></div>',this.container);
	   this.marco = this.container.find(".marco.shadow");
	   this.boat = this.container.find(".boat.shadow");
	   this.paperman = anole.$$("#scene2 #papermans","<div id='papermans' class='papermans'></div>",this.container);
	   paperman_init();
	   this.paperman.hide();
   };

  scene.animation = function() {
	   var display_delta = 5;
	   var display_ppm = function(){
		   var hides = $("#scene2 .paperman.hide");
		   if (hides.length<1)
			   return;
		   var idx = parseInt(hides.length * Math.random());
		   hides[idx].classList.toggle("hide",false);
		   hides[idx].classList.toggle("open",true);
		   // setTimeout(display_ppm,display_delta);
	   }
	  var papermans = function(delta,callback){
		  display_ppm();
		  // if (callback)
			  // setTimeout(callback,delta);
	  };
	  
	  var deg = -20;
	  this.tl = this.tl.to(this.boat, 0.3, {top:"188%", ease:Linear.easeNone})
	                   .to(this.marco, 0.3, {top:"185%", ease:Linear.easeNone}, "-=0.5")
					   .set(this.ditch,{"opacity":1});
	
	  for (var i=0;i<5;i++){
		  this.tl = this.tl.to(this.boat,0.1,{rotation:deg,ease:Linear.easeNone})
		                   .to(this.marco,0.1,{rotation:deg,ease:Linear.easeNone},"-=0.1");
		  deg = -deg;
      }
	  this.tl = this.tl.to(this.marco,0.3,{rotation:0,ease:Linear.easeNone,delay:0.2})
	                   .to(this.marco, 0.3, {top:"198%",left:"6%", ease:Linear.easeNone, delay:0.2})
					   .to(this.shade, 0.2, {opacity:1, ease:Linear.easeNone})
					   .to([this.boat,this.ditch],0.4,{opacity:0,delay:-0.2})
					   .call(function(){
						   this.paperman.show();
						   this.places.hide();
					   }.bind(this));
  };
   anole.addScene(scene);
});
