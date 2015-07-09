;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(14, anole.canvas, true);
    scene.name = 'scene14.js';
	scene.createDom = function() {
		this.content_ctn = $("<div></div>").addClass("content-ctn").appendTo(this.container);
		this.map_ctn = $("<div></div>").addClass("map-ctn").appendTo(this.content_ctn);
		var path_val = "M 380 544 L 410 509 "
		path_val += "C 583 578 583 578 753 480 C841 578 841 578 925 510 C1057 522 1057 522 1177 419 C1185 480 1108 597 1003 674"
		path_val += "L895 822 C 833 884 863 934 959 872 C 992 777 992 777 1102 666"
		var path_val2 = "M 1200 532 C 1213 603 1213 603 1248 670 C 1265 744 1265 744 1233 820";

		var childs = '<image xlink:href="../resource/map.png" x=130 y=95 width=1620 height=911 />'

		var pval = "M 410 509 C 583 578 583 578 753 480 C841 578 841 578 925 510 L925 700 L700 700Z";
		childs += '<path id="content" fill="#ffab00" stroke-width="0" d="' + pval + '""></path>';

		childs += '<path fill="none" stroke="#000000" stroke-width="15" d="'+path_val+'"></path>' +
			'<path fill="none" stroke="#000000" stroke-width="15" d="'+path_val2+'"></path>';
		xs = [410,753,925,991,1177,/*1003,*/895,/*1248,*/1233];
		ys = [509,480,510,517,419,/*674,*/822,/*670,*/820];
		this.ps = [];
		for (var i=0;i<xs.length;i++)
			childs+='<circle cx="'+xs[i]+'" cy="'+ys[i]+'" r=20 fill=#1fbad3 />';
		this.svg = $('<svg viewBox="300 0 1270 1080">'+childs+'</svg>').appendTo(this.map_ctn);
		name_xs = [37,40.5,45.7,49.9,63,45.8,66.5];
		name_ys = [61,48,42,50.3,34,60,60];
		names = ["西藏","甘肃","宁夏","陕西","河北","云南","福建"];
		this.names = [];
		for (var i=0;i<names.length;i++)
			this.names[i] = $("<div>"+names[i]+"</div>").addClass("name").css({"left":name_xs[i]+"%","top":name_ys[i]+"%"}).appendTo(this.map_ctn);
		this.path = this.svg.find("path");
		this.path.each(function(idx,elm){
			var len = elm.getTotalLength()
			elm.style["stroke-dashoffset"] = len;
			elm.style["stroke-dasharray"] = len;
		});
		this.points = this.svg.find("circle");
		console.log(this.points);
		this.points.hide();
		this.mark = Array();
		this.imgs = Array();
		this.marks = {};
		var is = [-1,1,2,3];
		for (var i=0;i<4;i++)
		{
			this.mark[i] = $("<div></div>").addClass("mark m"+i).appendTo(this.map_ctn)
			if (i==0)
				this.mark[i].append("<img src='./resource/mark"+i+".png'/>");
			else{
				this.mark[i].append($("<div></div>").addClass("marker shadow")
					.append($("<div></div>").addClass("marker body").append('<img src="./resource/mark'+i+'.png"/>')));
				this.imgs[i] = this.mark[i].find("img");
			}
			this.marks[is[i]] = this.mark[i];
		}
	}
	
	scene.animation = function() {
		var time_delta = 0.5;
		var line_delta = 5*time_delta;
		this.tl.set(this.map_ctn,{scaleX:5,scaleY:5})
		    .addLabel('begin')
			.to($("#scene14 .marco"),0.3*time_delta,{opacity:0})
			.to([$("#scene14 .gate-ctn .up"),$("#scene14 .gate-ctn .down"),],0.3*time_delta,{opacity: 0,ease:Linear.easeNone},"begin")
			.to($("#scene14 .building"), time_delta,{opacity:0,scaleX:0.1,scaleY:0.1,ease:Linear.easeNone},"begin")
			.to(this.map_ctn,2*time_delta,{scaleX:1,scaleY:1,ease:Linear.easeNone},'begin')
			.addLabel('draw')
			.to($("#scene14 .gate-ctn"),0.6*time_delta,{opacity:0,ease:Linear.easeNone})
			.to(this.path[1],line_delta,{"stroke-dashoffset":0,ease:Linear.easeNone},"draw")
		var ts1 = [0.03,0.23,0.33,0.38,0.48,/*0.65,*/0.75]
		console.log(this.points);
		for (var i=0;i<ts1.length;i++)
		{
			var delay_delta = (ts1[i]-1)*line_delta;
			this.tl.to(this.points[i],0.1,{"display":"block","opacity":1,delay:delay_delta});
			this.tl.to(this.names[i],0.1,{"opacity":1,delay:delay_delta});
			if (this.marks[i])
				this.tl.to(this.marks[i],time_delta/3,{opacity:1,scaleX:1,scaleY:1,delay:delay_delta});
		}
		var ts2 = [/*0.5,*/1];
		var line_delta2 = line_delta/10;
		this.tl.to(this.path[2],line_delta2,{"stroke-dashoffset":0,ease:Linear.easeNone,delay:time_delta/8})
		for (var i=0;i<ts2.length;i++)
		{
			var idx = ts1.length+i;
			var delay_delta = (ts2[i]-1)*line_delta2;
			this.tl.to(this.points[ts1.length+i],0.1,{"opacity":1,"display":"block",delay:delay_delta});
			this.tl.to(this.names[idx],0.1,{"opacity":1,delay:delay_delta});
			if (this.marks[idx])
				this.tl.to(this.marks[idx],time_delta/3,{opacity:1,scaleX:1,scaleY:1,delay:delay_delta});
		}
		this.tl.call(function(){$("#scene14 .gate-ctn").remove();})
			.set(this.mark[0],{x:"-100%"})
			.to(this.mark[0],time_delta,{opacity:1,x:"0%"})
			.to(this.mark,time_delta,{rotation:0})
			.to(this.imgs,time_delta,{rotation:0,delay:-time_delta})
			.to($(".marker.body"),time_delta,{top:"1px",left:"1px",delay:-time_delta})
			.to([this.mark[1],this.mark[2],this.mark[3],],time_delta*3,{y:"-300px"},"+=0")
			.to([this.mark[0]],time_delta,{y:"-400%"},"-="+time_delta*2)
	}
	anole.addScene(scene);
})
