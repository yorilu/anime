;
require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function(anole) {

	var scene = new anole.Scene(2, anole.canvas, false);
	var sceneW = anole.getSceneW();
	var sceneH = anole.getSceneH();
	var planePosition = [
		["15%", "15%", 1],
		["60%", "20%", 1],
		["75%", "40%", 1],
		["65%", "45%", 1],
		["10%", "80%", -1],
		["65%", "70%", -1],
		["85%", "60%", -1]
	];

	var creatItem = function(html, number) {
		var source = '';
		for (n = 0; n < number; n++) {
			source += html;
		}
		return source;
	}

	var listCollect = function(objs, list) {
		var return_list = [];
		for (var i = 0; i < list.length; i++) {
			return_list.push(objs[list[i]]);
		}
		return return_list;
	}

	var setFinalPosition = function(index) {
		var position = {};
		position["top"] = planePosition[index][0];
		position["left"] = planePosition[index][1];
		if (planePosition[index][2] === -1) {
			position["scaleX"] = -1;
		}
		return position;
	}

	var setOriginPosition = function(index) {
		var position = {};
		if (planePosition[index][2] === 1) {
			position["left"] = "-100%";
		}
		if (planePosition[index][2] === -1) {
			position["left"] = "200%";
		}
		return position;
	}

	scene.createDom = function() {
		anole.setBackgroundColor('rgb(247,138,100)');
		this.china = $('<div class="china"></div>').appendTo(this.container);
		this.paperpeoples = $('<div class="paperpeoples"></div>').appendTo(this.container);
		for (var i = 0; i < 40; i++) {
			$('<div class="paperpeople"></div>').appendTo(this.paperpeoples);
		}
		this.paperpeople = this.paperpeoples.find('.paperpeople');
		this.paperpeople1 = $('<div class="paperpeople1"></div>').appendTo(this.paperpeople);
		this.paperpeople2 = $('<div class="paperpeople2"></div>').appendTo(this.paperpeople);
		this.paperpeople3 = $('<div class="paperpeople3"></div>').appendTo(this.paperpeople);
		this.planes = $(creatItem('<div class="plane"></div>', 7)).appendTo(this.china);
		this.plane = this.container.find('.plane');
		this.summary_text = $('<div class="summary"><div>2014年 中国入境游客人数</div><div class="number">128,498,301</div></div>').appendTo(this.china);
		this.plane_with_marco2 = $('<div class="plane_withmarco"></div>').appendTo(this.china);
		this.plane_without_marco2 = $('<div class="plane_withoutmarco"></div>').appendTo(this.china);
		this.marco2 = $('<div></div>').addClass('marco20')
			.append($('<img src="resource/marco2.0_head.png">').addClass('marco20-head'))
			.append($('<img src="resource/marco2.0_body.png">').addClass('marco20-body'))
			.append($('<img src="resource/marco2.0_hand_leftwithmap.png">').addClass('marco20-hands marco20-hand-leftwithmap'))
			.append($('<img src="resource/marco2.0_hand_right.png">').addClass('marco20-hands marco20-hand-right'))
			.append($('<img src="resource/marco2.0_leg.png">').addClass('marco20-legs marco20-leg-left'))
			.append($('<img src="resource/marco2.0_leg.png">').addClass('marco20-legs marco20-leg-right'));
		this.left_hand = this.marco2.find('.marco20-hand-leftwithmap');
		this.right_hand = this.marco2.find('.marco20-hand-right');
		this.left_leg = this.marco2.find('.marco20-leg-left');
		this.right_leg = this.marco2.find('.marco20-leg-right');
		this.head = this.marco2.find('.marco20-head');
		this.marco2.appendTo(this.container);
		this.hello_box = $('<div class="hello_box">Hi, 我是马可波罗2.0</div>').appendTo(this.container);
		this.triangle = $('<div class="triangle"></div>').appendTo(this.hello_box);
	}

	scene.animation = function() {
		var msg1 = "700年后的今天，作为第128,498,301个来到中国的外国游客，";
		var msg2 = "我的名字也叫马可波罗。";
		anole.setSubtitle(msg1);
		var time = 2;
		this.tl = this.tl.set(this.marco2, {
				display: "none"
			})
			.set(this.right_hand, {
				rotation: -40
			})
			.to(this.china, 1, {
				scale: 1.1,
				ease: Elastic.easeOut
			})
			.set(this.plane_with_marco2, {
				opacity: 1
			})
			.addLabel("show")
			.staggerTo(listCollect(this.paperpeople, [0]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [1, 8, 9]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [2, 9, 16, 17, 18]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [3, 10, 11, 19, 24, 25, 26, 27]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [4, 12, 20, 28, 32, 33, 34, 35, 36]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [5, 13, 21, 29, 37]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [6, 14, 22, 30, 38]), 0.1, {
				opacity: 1
			}, "show")
			.staggerTo(listCollect(this.paperpeople, [7, 15, 23, 31, 39]), 0.1, {
				opacity: 1
			}, "show")
			.to(this.plane_with_marco2, time, {
				left: "45%",
				scale: 0.5,
				ease: Linear.easeNone
			}, "show")
			.to(this.summary_text, 0.5, {
				opacity: 1,
				ease: Linear.easeIn
			}, "show");

		for (var i = 0; i < this.plane.length; i++) {
			this.tl = this.tl.fromTo(this.plane[i], 1, setOriginPosition(i), setFinalPosition(i), "show+=1");
		};

		this.tl = this.tl.to(this.plane_with_marco2, 0.2, {
				rotation: 0,
				ease: Linear.easeNone
			})
			.staggerTo([this.summary_text, this.paperpeople, this.plane], 0.5, {
				opacity: 0,
				ease: Linear.easeIn,
				delay: 0.8
			})
			.set(this.plane_with_marco2, {
				display: "none"
			})
			.set(this.plane_without_marco2, {
				display: "block"
			})
			.set(this.marco2, {
				display: "block"
			})
			.to(this.marco2, 0.5, {
				y: -20,
				ease: Power4.easeNone
			})
			.to(this.marco2, 0.2, {
				y: 30,
				ease: Power4.easeNone
			})
			.addLabel("running")
			.to(this.china, 1, {
				scale: 0.7
			}, "running")
			.fromTo(this.marco2, 1, {
				scale: 0.1,
				left: "40%",
				top: "-15%"
			}, {
				scale: 0.8,
				left: 0,
				top: "-5%"
			}, "running");
		var deg = -30;
		for (var i = 0; i < 4; i++) {
			this.tl = this.tl.to(this.left_hand, 0.2, {
					rotation: deg,
					ease: Power4.easeNone
				}, "running+=" + String(i / 5))
				.to(this.right_hand, 0.2, {
					rotation: deg * 1.5,
					ease: Power4.easeNone
				}, "running+=" + String(i / 5))
				.to(this.left_leg, 0.2, {
					y: deg / 1.5,
					ease: Power4.easeNone
				}, "running+=" + String(i / 5))
				.to(this.right_leg, 0.2, {
					y: -deg / 1.5,
					ease: Power4.easeNone
				}, "running+=" + String(i / 5))
				.to(this.head, 0.2, {
					rotation: deg / 6,
					ease: Power4.easeNone
				}, "running+=" + String(i / 5));
			deg = -deg;
		}
		this.tl = this.tl.set([this.left_hand, this.head], {
				rotation: 0
			})
			.set([this.left_leg, this.right_leg], {
				y: 0
			})
			.call(function() {
				anole.setSubtitle(msg2);
			})
			.set(this.right_hand, {
				"z-index": 145
			})
			.to(this.right_hand, 0.5, {
				rotation: -130,
				ease: Power4.easeNone
			})
			.set(this.hello_box, {
				display: "block"
			})
			.to(this.hello_box, 3, {});
	}
	scene.cleanup = function() {}
	anole.addScene(scene);
});