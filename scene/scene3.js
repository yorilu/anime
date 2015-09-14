;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite', 'EasePack'], function(anole) {
	var scene = new anole.Scene(3, anole.canvas, false);
	var sceneW = anole.getSceneW();
	var sceneH = anole.getSceneH();
	var resourceUrl = anole.getResourceUrl();
    var salmonColour = '#f78a64';
    var saffronColour = '#FFAD2A';
    var cellphoneColour = '#ffad29';

	scene.createDom = function() {
		// Part 1:
		this.container.addClass('salmon-bg');
        anole.setBackgroundColor(salmonColour);
		// Marco 2.0
		this.marco20 = $('<div></div>').addClass('marco20')
			.append($('<img src="resource/marco2.0_head.png">').addClass('marco20-head'))
			.append($('<img src="resource/marco2.0_body.png">').addClass('marco20-body'))
			.append($('<img src="resource/marco2.0_hand_leftwithmap.png">').addClass('marco20-hands marco20-hand-leftwithmap'))
			.append($('<img src="resource/marco2.0_hand_right.png">').addClass('marco20-hands marco20-hand-right'))
			.append($('<img src="resource/marco2.0_leg.png">').addClass('marco20-legs marco20-leg-left'))
			.append($('<img src="resource/marco2.0_leg.png">').addClass('marco20-legs marco20-leg-right'));
		
		this.marco20.appendTo(this.container);


		// Cellphone (portrait)
		this.cellphonePortrait = $('<img src="resource/mobile_portrait.png">').addClass('cellphonePortrait')
			.appendTo(this.marco20);


		// Part 2:
		this.part2Wrapper = $('<div></div>').addClass('wrapper-part2')
			.appendTo(this.container);


		// Marco watching video
		this.marcoBack = $('<img src="resource/manonchair_marco.svg">').addClass('marco-back')
			.appendTo(this.part2Wrapper);
		this.marcoHandHoldingMobilePalm = $('<img src="resource/hand_holdingmobile_palm.svg">').addClass('marco-hand-holding-mobile palm')
			.appendTo(this.part2Wrapper);
		this.marcoHandHoldingMobileThumb = $('<img src="resource/hand_holdingmobile_thumb.svg">').addClass('marco-hand-holding-mobile thumb')
			.appendTo(this.part2Wrapper);

		// Cellphone (landscape)
		this.cellphoneLandscape = $('<div></div>').addClass('cellphoneLandscape')
			.append($('<img src="resource/video1.png">').addClass('video-cover'))
			.appendTo(this.part2Wrapper);


		this.container.find('img').prop('draggable', false);
	}

	scene.animation = function() {
		anole.setSubtitle('从小我就被五花八门的旅游纪录片吸引。');
		
        this.tl
            .from(this.marco20, 0.5, {left: '5%', top: '12%', width: '30%', height: '86%', delay: 0.5})
            .to(this.cellphonePortrait, 0.5, {opacity: 1, scale:0.3, left: '60%', top: '-12%'})
            .addLabel('transitionBegin')
            .call(function() { anole.setBackgroundColor(cellphoneColour); })
            .to(this.marco20, 1, {left: '-10%', top:'20%', scale:1.2, opacity:0, ease: Power4.easeOut}, 'transitionBegin')
            .to(this.cellphonePortrait, 0.1, {scale: 5, zIndex: 100}, 'transitionBegin')
            .addLabel('transitionEnd')
            .addLabel('showMarcoBack','-=0.6')
            .set(this.marco20, {display: 'none'}, 'transitionEnd')
            .set(this.part2Wrapper, {display: 'block'}, 'showMarcoBack')
            //.call(function() { anole.setBackgroundColor(salmonColour); })
            //.addLabel('showMarcoBack', '-=0.2')
            .to(this.part2Wrapper, 0.2, {opacity: 1, top: 0}, 'showMarcoBack')
            .to(this.part2Wrapper, 2, {});
	}

	scene.cleanup = function() {
	}

	anole.addScene(scene);
});
