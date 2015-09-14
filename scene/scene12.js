;
require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function(anole) {

	var scene = new anole.Scene(12, anole.canvas, false);
	var sceneW = anole.getSceneW();
	var sceneH = anole.getSceneH();

	scene.createDom = function() {
		anole.setBackgroundColor('rgb(198,60,177)');
		this.building = $("<img src='resource/build.png'>").addClass('building').appendTo(this.container);
		this.clouds = $("<div class='clouds'></div>").appendTo(this.container);
		this.cloud1 = $("<img src='resource/cloud.png'>").addClass('cloud1').appendTo(this.clouds);
		this.cloud2 = $("<img src='resource/cloud.png'>").addClass('cloud2').appendTo(this.clouds);
		this.friendlychinese = $("<div class='friendlychinese'></div>").appendTo(this.container);
		this.friendlychinese_body = $("<img src='resource/friendlychinese.png'>").addClass('friendlychinese_body').appendTo(this.friendlychinese);
		this.left_hand = $("<div class='left_hand'></div>").appendTo(this.friendlychinese);
		this.right_hand = $("<div class='right_hand'></div>").appendTo(this.friendlychinese);
		this.friendlymanarm1 = $("<img src='resource/friendlymanarm1.png'>").addClass('friendlymanarm1');
		this.friendlymanarm2 = $("<img src='resource/friendlymanarm2.png'>").addClass('friendlymanarm2');
		this.friendlymanarm1.appendTo(this.left_hand);
		this.friendlymanarm2.appendTo(this.left_hand);
		this.friendlymanarm3 = $("<img src='resource/friendlymanarm1.png'>").addClass('friendlymanarm1');
		this.friendlymanarm4 = $("<img src='resource/friendlymanarm2.png'>").addClass('friendlymanarm2_right');
		this.friendlymanarm3.appendTo(this.right_hand);
		this.friendlymanarm4.appendTo(this.right_hand);
		this.friendlymouth1 = $("<img src='resource/friendlymouth.png'>").addClass('friendlymouth1').appendTo(this.friendlychinese);
		this.friendlymouth2 = $("<img src='resource/friendlymouth.png'>").addClass('friendlymouth2').appendTo(this.friendlychinese);
		this.marco2_back = $("<div class='marco2_back'></div>").appendTo(this.container);
		this.marco2_back_body = $("<img src='resource/marco2.0_back.png'>").addClass('marco2_back_body').appendTo(this.marco2_back);
		this.marco20_handwithmap = $("<img src='resource/marco2.0_handwithmap.png'>").addClass('marco2_handwithmap').appendTo(this.marco2_back);
		this.thumbsup1 = $("<img src='resource/thumbsup1.png'>").addClass('thumbsup1').appendTo(this.container);
		this.thumbsup2 = $("<img src='resource/thumbsup2.png'>").addClass('thumbsup2').appendTo(this.container);
		this.thumbsup3 = $("<img src='resource/thumbsup3.png'>").addClass('thumbsup3').appendTo(this.container);
		this.thumbsup4 = $("<img src='resource/thumbsup4.png'>").addClass('thumbsup4').appendTo(this.container);
		this.thumbsup5 = $("<img src='resource/thumbsup5.png'>").addClass('thumbsup5').appendTo(this.container);
		this.thumbsup6 = $("<img src='resource/thumbsup6.png'>").addClass('thumbsup6').appendTo(this.container);
		this.good_text = $("<div class='text1'>60<span>%</span></div><div class='text2'>点赞</div>").appendTo(this.container);
	}
	scene.animation = function() {
		var msg1 = "幸好，中国人的包容和友善，";
		var msg2 = "让近六成的游客体验超出预期。";
		anole.setSubtitle(msg1);
		this.tl = this.tl.addLabel("smile")
		    .to(this.marco20_handwithmap, 0.8, {
				bottom: "22%"
			},"smile")
			.staggerTo([this.friendlymouth1, this.friendlymouth2], 0.8, {
				height: "5%"
			},"smile")
			.set([this.building, this.clouds, this.friendlychinese, this.marco2_back], {
				display: "none",
				delay: 1
			})
			.call(function() {
				anole.setSubtitle(msg2);
			})
			.addLabel("show")
			.to(this.good_text, 0.5, {
				opacity: 1,
				ease: Linear.easeIn,
			}, "show")
			.to(this.thumbsup1, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=0.2")
			.to(this.thumbsup2, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=0.4")
			.to(this.thumbsup3, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=0.6")
			.to(this.thumbsup4, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=0.8")
			.to(this.thumbsup5, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=1")
			.to(this.thumbsup6, 0.1, {
				bottom: 0,
				ease: Elastic.easeOut
			}, "show+=1.2")
			.to(this.thumbsup6, 3.8, {});
	}
	scene.cleanup = function() {}
	anole.addScene(scene);
});