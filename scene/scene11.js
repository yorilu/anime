require(['anole', 'zepto'], function(anole, Scene) {

    var TIME_DELTA = 0.25;  // better to have a global delta
    var STAGGER_LATENCY = 0.1;

    var LETTERS = [
        {img: 'korean_letter01.png', style: "left: 55px; top: -85px; transform: rotate(10deg) scale(0.6)"},
        {img: 'korean_letter02.png', style: "left: -10px; top: -70px; transform: rotate(10deg) scale(0.6)"},
        {img: 'korean_letter03.png', style: "left: -15px; top: -15px; transform: rotate(10deg) scale(0.6)"},
        {img: 'korean_letter04.png', style: "left: 45px; top: -40px; transform: rotate(10deg) scale(0.6)"},
        {img: 'korean_letter05.png', style: "left: 80px; top: -70px; transform: rotate(10deg) scale(0.5)"},
        {img: 'korean_letter06.png', style: "left: 125px; top: 50px; transform: rotate(10deg) scale(0.7)"},
        {img: 'korean_letter07.png', style: "left: 110px; top: -5px; transform: rotate(10deg) scale(0.6)"},
        {img: 'korean_letter08.png', style: "left: -35px; top: 25px; transform: rotate(10deg) scale(0.5)"},
        {img: 'korean_letter09.png', style: "left: 145px; top: -10px; transform: rotate(90deg) scale(0.7)"},
        {img: 'korean_letter10.png', style: "left: -45px; top: -30px; transform: rotate(-50deg) scale(0.5)"}
    ];

    var appendLetters = function(k0) {
        for (var idx in LETTERS) {
            $('<img class="letters" src="resource/' + LETTERS[idx].img + '" style="opacity: 0; position:absolute; ' + LETTERS[idx].style + '"></img>').appendTo(k0);
        }
    };
    var scene = new anole.Scene(11, anole.canvas, true);
    scene.name = 'scene11.js';
    scene.createDom = function() {
        this.disappear = [];
        this.disappear.push(this.container.find('.ques'));
        this.disappear.push(this.container.find('.banner'));
        this.disappear.push(this.container.find('.bag1'));
        this.disappear.push(this.container.find('.bag2'));
        this.disappear.push(this.container.find('.bag3'));

        this.bg = $("<div></div>").addClass("bg11").appendTo(this.container);
        this.canadianContainer = $("<div class='canadians'></div>").appendTo(this.bg);
        this.koreanContainer = $("<div class='koreans'></div>").appendTo(this.bg);
        // 3 canadians
        this.c00 = $("<div id='cana00'></div>").addClass("canadian").appendTo(this.canadianContainer);
        this.c10 = $("<div id='cana10'></div>").addClass("canadian").appendTo(this.canadianContainer);
        this.c20 = $("<div id='cana20'></div>").addClass("canadian").appendTo(this.canadianContainer);

        // 3 dressed canadians
        this.c01 = $("<div id='cana01'></div>").addClass("canadian umbrella").appendTo(this.canadianContainer);
        this.c11 = $("<div id='cana11'></div>").addClass("canadian umbrella").appendTo(this.canadianContainer);
        this.c21 = $("<div id='cana21'></div>").addClass("canadian lovechina").appendTo(this.canadianContainer);

        // 2 koreans
        this.k0 = $("<div id='k0'></div>").addClass("canadian k0").appendTo(this.koreanContainer);
        this.k1 = $("<div id='k1'></div>").addClass("canadian k1").appendTo(this.koreanContainer);

        // letters
        appendLetters(this.k0);
    };

    scene.animation = function() {
        var rotateCenter = "50% -100%";
        // shift c10 c20
        this.tl.to(this.disappear, 0.5, {display: 'none', opacity: 0})
            .set(this.c10, {opacity: 1})
            .set(this.container.find('.figure'), {display: 'none', opacity: 0})
            .addLabel("clone", '+=0.75')
            .set([this.c00, this.c10, this.c20], {opacity: 1}, "clone")
            .to(this.c00, TIME_DELTA * 2, {
                left: "15%",
                margin: "inherit",
                ease: Elastic.easeOut.config(1, 0.6)
            }, "clone")
            .to(this.c20, TIME_DELTA * 2, {
                right: "15%",
                left: 'inherit',
                margin: "inherit",
                ease: Elastic.easeOut.config(1, 0.6)
            }, "clone")
            // flip them over
            .to(this.c00, TIME_DELTA, {rotationY: 90, delay: TIME_DELTA})
            .to(this.c01, TIME_DELTA / 2, {rotationY: 0})
            .to(this.c10, TIME_DELTA, {rotationY: 90})
            .to(this.c11, TIME_DELTA / 2, {rotationY: 0})
            .to(this.c20, TIME_DELTA, {rotationY: 90})
            .to(this.c21, TIME_DELTA / 2, {rotationY: 0})
            // start rotate
            .addLabel('rotate', "+=1")
            .to(this.canadianContainer, TIME_DELTA * 2, {
                rotation: "-=180",
                transformOrigin: rotateCenter,
                ease: Elastic.easeIn.config(1, 0.6)
            }, "rotate")
            .set(this.koreanContainer, {rotation: 0}, "rotate")
            .to(this.koreanContainer, 0, {
                rotation: "+=180"
            })
            .to(this.k0, 0, {rotationY: 0})
            .to(this.k1, 0, {rotationY: 0})
            .to(this.koreanContainer, TIME_DELTA * 2, {
                rotation: "-=180",
                transformOrigin: rotateCenter,
                ease: Elastic.easeOut.config(1, 0.6)
            }, "+=0.25")
            // rotate done
            .staggerTo($(".letters"), TIME_DELTA, {opacity: 1}, STAGGER_LATENCY);
    };
    scene.cleanup = function() { // Called before entering next scene.
        this.container.find('.canadians').remove();
    };
    anole.addScene(scene);
});
