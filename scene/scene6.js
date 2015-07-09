;require(['anole', 'zepto','TimelineLite'], function (anole){

	var scene = new anole.Scene(6, anole.canvas, false);
	
	var v_count = 7;
	var circle_init = function(){
		var c = $('<div class="loading"><svg viewBox="0 0 220 220">' +
				  '<path fill="none" stroke="#D07474" stroke-width="30" d = "M 109 30,A75 75,0,0,1,109 180"  class="right-half half-circle"></path>'+
				  '<path fill="none" stroke="#03A0A0" stroke-width="30" d = "M 110 180,A75 75,0,0,1,110 30"  class="left-half" half-circle></path>' + 
				  '</svg></div>');
		return c;
	};
	scene.createDom = function() {
		this.br_ctn_out = anole.$$("#ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.container);
		this.br_ctn_in = anole.$$("#ctn-browser-in",'<div id = "ctn-browser-in" class = "ctn-browser-in"></div>',this.br_ctn_out);
		this.browser = anole.$$("#browser",'<div id = "browser" class = "browser"></div>',this.br_ctn_in);
		this.topbar = anole.$$("#topbar",'<div id = "topbar" class = "topbar"></div>',this.br_ctn_in);
		this.br_content = anole.$$(".browser-content","<div class='browser-content'></div>",this.browser)
		this.br_left = anole.$$("#browser-left",'<div id = "browser-left" class = "browser-left"></div>',this.br_content);
		this.br_right = anole.$$("#browser-right",'<div id = "browser-right" class = "browser-right"></div>',this.br_content);
		this.youtube = anole.$$("#youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
		this.tag = anole.$$("#scene6 #ctn-browser-in .tag","<div class = 'tag'></div>",this.br_ctn_in);

		this.shade = anole.$$("#shade-youtube",'<div id = "shade-youtube" class = "shade-youtube"><img src="./resource/replay.png"></div>',this.youtube,{opacity:0});
		this.circle = anole.$$(".shade-circle",circle_init.bind(this),this.shade);
		this.loading_len = 238;
		this.loading_l = $(".left-half");
		this.loading_r = $(".right-half");
		this.loading_l.css("stroke-dashoffset",this.loading_len);
		this.loading_l.css("stroke-dasharray",this.loading_len);
		this.loading_r.css("stroke-dashoffset",this.loading_len);
		this.loading_r.css("stroke-dasharray",this.loading_len);
		if (this.topbar.find("youtube_l").length == 0){
				var y_l = $("<div></div>").addClass("youtubebar_l").appendTo(this.topbar);
				var y_r = $("<div></div>").addClass("youtubebar_r").appendTo(this.topbar);
				var y_m = $("<div></div>").addClass("youtubebar_m").appendTo(this.topbar);
		}
		if ($(".like-bar").length == 0) {
			var dot_count = 3;
			this.like_bar = anole.$$(".like-bar","<div class = 'like-bar'></div>",this.br_left);
			for (var i=0;i<dot_count;i++)
			$("<div></div>").addClass("dot").appendTo(this.like_bar);
		}
		if (this.br_right.find(".video").length == 0) {
			for (var i=0;i<v_count;i++){
				var dash_count = 3;
				var ctn = $("<div></div>").addClass("ctn-video c"+i);
				var video = $("<div></div>").addClass("video").append("<div class = 'board' ></div><div class = 'img v"+i%3+"'></div>").appendTo(ctn);
				var dashes = $("<div></div>").addClass("dashes").appendTo(ctn);
				for (var j=0;j<dash_count;j++)
				$("<div></div>").addClass("dash d"+j).appendTo(dashes);
				this.br_right.append(ctn);
			}
		}
		var comment_count = 5;
		if (this.br_left.find(".comments").length == 0) {
			this.comment_ctn = $("<div></div>").addClass("comment-ctn").appendTo(this.br_left);
			this.comments = $('<div></div>').addClass("comments").appendTo(this.comment_ctn);
			for (var i=0;i<comment_count;i++){
				var comment = $('<div></div>').addClass("comment").appendTo(this.comments);
				var head = $("<div></div>").addClass("comment-head").appendTo(comment);
				var content = $("<div></div>").addClass("comment-content").appendTo(comment);
				for (var j=0;j<3;j++)
				$("<div></div>").addClass("dash").appendTo(content);
			}
		}
		this.like_bar = anole.$$("#scene6 .like-bar","<div class='like-bar'></div>",this.br_left);
		this.like = anole.$$("#scene6 .like","<div class='like'></div>",this.like_bar);
		this.like_text = anole.$$("#scene6 .like-text","<div class='like-text'>+1</div>",this.like);
	}
	scene.animation =  function (finish){
		var new_h = this.comment_ctn.height()*160;
		var time_video = 1;
		var per_video = time_video / v_count;
		
		this.tl.to(this.br_ctn_out,0.2,{delay:0.05,scaleX:0.4,scaleY:0.4,x:"-14%",y:"-18%",ease:Linear.easeNone})
		.to(this.br_right,per_video,{"opacity":1,y:"0%",delay:0,ease:Linear.easeNone});
		
		for (var i=0;i<v_count;i++){
			this.tl.to($(".c"+i),per_video*(i+1),{y:(100*i)+"%",ease:Linear.easeNone,delay:-per_video*i})
			.to($(".c"+i).find(".video"),per_video*(i+1),{rotation:0,ease:Linear.easeNone,delay:-per_video*(i+1)});
		}
		 this.tl.to(this.loading_r,time_video/2,{"stroke-dashoffset":0,delay: -time_video,ease:Linear.easeNone})
		         .to(this.loading_l,time_video/2*3/4,{"stroke-dashoffset":this.loading_len/4,delay: -time_video/2,ease:Linear.easeNone})
				 .to(this.like,0.2,{opacity:1})
				 .to(this.like_text,0.4,{y:"-100%",opacity:0})
				 .to(this.comment_ctn,1,{height:new_h+"px",ease:Linear.easeNone},"+=0.1")
				 .to([this.br_left,this.br_right],0.8,{y:"-52%",ease:Linear.easeNone},"-=1")
				 .to(this.topbar,0.2,{width:"67%"})
				 .to(this.br_ctn_in,0.4,{scaleX:0.5,scaleY:0.5})
	}

	scene.cleanup = function() {
	}
	anole.addScene(scene);
});
