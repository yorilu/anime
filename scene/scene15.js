;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(15, anole.canvas, true);
    scene.name = 'scene15.js';
	scene.createDom = function() {
		this.c_ctn = this.container.find(".content-ctn");
		this.map_ctn = this.container.find(".map-ctn");
		this.container.find(".mark").remove();
		this.container.find(".marco").remove();
		this.svg0 = this.map_ctn.find("svg");
		this.map = this.svg0.find("image");
		this.path = this.svg0.find("#content"); 
		//this.svg_bg = $("<div></div>").addClass("svg-bg").appendTo(this.container);
		path_val2 = "M -160 109 C 13 178 13 178 183 80 C271 178 271 178 355 110";
		var path_val = "M -800 545 C 65 890 65 890 915 400 C1295 890 1295 890 1695 550";
		var path_content_val = path_val + "L 1775 1550 L -800 1550 Z";
		this.svg_ctn = $("<div></div>").addClass("svg-ctn").appendTo(this.container);
		this.svg = $('<svg class="big-svg" viewBox="0 0 1800 1000"><path fill="none" stroke="#000000" stroke-width="55" d="'+path_val+'"></path>'+
			'<path id="content" fill="#ffab00" stroke="#FFA080" stroke-width="0" d="' + path_content_val + '""></path></svg>').appendTo(this.svg_ctn);
		this.tl.set(this.svg,{x:"-6%",y:"1%",scaleX:0.2,scaleY:0.2});
	//	this.key_point = this.map_ctn.find(".point.p1").appendTo(this.container);
		this.path_content = this.svg.find("#content");
		//this.path_content.css("opacity","0.5");
		this.items = $("<div></div>").addClass("items").appendTo(this.container);
		this.board = $("<div></div>").addClass("skate-board").appendTo(this.items);
		this.marco = $("<div></div>").addClass("marco").appendTo(this.items);
		this.count_ctn = $("<div>94%</div>").addClass("count").appendTo(this.items);
		this.count = {num:94,r:230,g:117,b:115};
		this.map_ctn.find("circle").hide();
		this.map_ctn.find(".name").hide();

		this.textl = $("<div></div>").addClass("text-sichou").appendTo(this.container);
		this.textr = $("<div></div>").addClass("text-lvyounian").appendTo(this.container);
	}
	
	scene.animation = function() {
		var dt = 0.4;
		this.tl.to(this.map_ctn.find("path")[1],dt,{"stroke-width":3})
				.to(this.map_ctn,dt,{scaleX:7.7,scaleY:8.7,x:"47%",y:"23%",delay:-dt})
				.to(this.map,dt,{opacity:0,delay:-dt})
				.to(this.svg,dt,{opacity:1,scaleX:1.6,scaleY:1.5,x:"-44.5%",y:"-0%"},"-="+dt)
				.to(this.svg.find("path")[0],dt,{"stroke-width":25,delay:-dt})
				.to([this.path_content,this.count_ctn],dt,{opacity:1},"-="+dt)
				.to([this.c_ctn,this.svg_ctn],dt,{width:"50%",height:"95%",delay:-dt})
				.to(this.items,dt,{opacity:1,left:"25%",top:"2.5%",delay:0})
				.to(this.board,dt,{rotation:10,delay:-dt})
				.to(this.textl,dt,{opacity:1,delay:0})
				.call(function(){this.map_ctn.remove()}.bind(this))
		var total = dt*3;				
		var deltas = [0.1,0.7,0.2];
		var degs = [49,38,10];
		var xs = ["28%","50%","57%"];
		var ys = ["5.5%","42.5%","46.5%"]
		this.tl.to(this.count,dt*6,{});//just delay
		for (var i in deltas){
			this.tl.to(this.board,deltas[i]*total,{rotation:degs[i]})
					.to(this.items,deltas[i]*total,{ease:Linear.easeNone,left:xs[i],top:ys[i],delay:-deltas[i]*total});

		}
		this.tl.to(this.count,total,{num:20,r:30,g:188,b:211,ease:Linear.easeNone,onUpdate:this.update_count.bind(this)},"-="+total)
				.to(this.textr,total*0.2,{opacity:1,delay:-total*0.2})
	}

	scene.update_count = function(){
		this.count_ctn.text(parseInt(this.count.num)+"%");
		var color = "rgb("+parseInt(this.count.r)+","+parseInt(this.count.g)+","+parseInt(this.count.b)+")";
		this.count_ctn.css("color",color);
	}
    scene.cleanup = function() { // Called before entering next scene.
        this.textl.remove();
        this.textr.remove();
        this.items.remove();
    };
	anole.addScene(scene);
})
