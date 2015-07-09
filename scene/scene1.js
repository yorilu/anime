console.log("scene1.js running");
;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	console.log("scene1.js required. add scene");
	var scene = new anole.Scene(1, anole.canvas, false);
	scene.createDom = function() {
		if (!this.places){
			this.container.find(".places").remove();
			this.places = anole.$$('.places','<div class="places"></div>', this.container);
			var bridgeCtn = $('<div></div>').addClass('building-ctn bridge-ctn');
			var up = $('<div></div>').addClass('up');
			var year_1 = $('<img src="./resource/s1_1271.png"></img>').addClass('year').appendTo(up);
			var bridge = $('<div class ="building"><img src="./resource/bridge.png"></div>').appendTo(up);
			var down = $('<div></div>').addClass('down');
			this.marco = $('<div class="marco shadow center"></div>').appendTo(down);
			this.marco_body = $('<div class="marco body"></div>').appendTo(this.marco);
			this.boat = $('<div class="boat shadow center"></div>').appendTo(down);
			this.marco_body = $('<div class="boat body"></div>').appendTo(this.boat);

			up.appendTo(bridgeCtn);
			down.appendTo(bridgeCtn);
			bridgeCtn.appendTo(this.places);

			var gateCtn = $('<div></div>').addClass('building-ctn gate-ctn');
			var up2 = $('<div></div>').addClass('up');
			var year_2 = $('<img src="./resource/s2_1271.png"></img>').addClass('year').appendTo(up2);
			var down2 = $('<div></div>').addClass('down');
			var jiayu = $('<div class="building"><img src="./resource/gate.png"></div>').appendTo(up2);
			up2.appendTo(gateCtn);	
			down2.appendTo(gateCtn);
			gateCtn.appendTo(this.places);
		}
		this.places.removeAttr("style");
		this.places.find(".boat").removeAttr("style");
		this.places.find(".marco").removeAttr("style");
	}
	scene.animation = function() {
		this.tl.to(this.places, 0.3, {top:"-100%", ease:Linear.easeNone,delay:4})
		    .set(this.marco, {"z-index":501});
	}
	scene.cleanup = function() {
	}
	anole.addScene(scene);
});
