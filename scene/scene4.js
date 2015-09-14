require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite', 'EasePack', 'TextPlugin', 'BezierPlugin'], function (anole) {


    var checkTemplate = '<div class="tick-group"><div class="circle"><div class="tick"></div></div>' +
        '<ul class="dot">' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '<li></li>' +
        '</ul>' +
        '</div>';


    var scene = new anole.Scene(4, anole.canvas, false);
    scene.createDom = function () {
        // marco that from previous scene3
        anole.setBackgroundColor('rgb(255, 174, 42)');
        this.marco = this.container.find(".marco");

        this.chair1 = $('<div class="chair1"></div>');
        this.p_row1 = [];
        for (var i = 1; i <= 6; i++) {
            var p = $('<div class="person body row1-' + i + '"></div>');
            var pHead = $('<div class="person head row1-' + i + '"></div>');
            var pArm = $('<div class="person arm row1-' + i + '"></div>');
            var phone = $('<div class="mobile video1"><div></div></div>');
            var container = $('<div class="group ' + i + '"></div>');
            var hand = $('<div class="hand ' + i + '"></div>');
            container.append(p);
            container.append(pHead);
            container.append(pArm);
            container.append(hand);
            container.append(phone);
            this.chair1.append(container);
            this.p_row1.push(container);
        }

        this.chair2 = $('<div class="chair2"></div>');
        this.p_row2 = [];
        this.m_row2 = [];
        this.h_row2 = [];
        this.checks = [];
        this.arm_row2 = [];
        for (var i = 1; i <= 4; i++) {
            var p = $('<div class="person body row2-' + i + '"></div>');
            var pHead = $('<div class="person head row2-' + i + '"></div>');
            var pArm = $('<div class="person arm row2-' + i + '"></div>');
            var phone = $('<div class="mobile video1"><div></div></div>');
            var container = $('<div class="group"></div>');
            var hand = $('<div class="hand ' + i + '"></div>');
            var palm = $('<div class="palm ' + i + '""></div>');
            var check = $(checkTemplate);
            container.append(p);
            container.append(pHead);
            container.append(pArm);
            container.append(hand);
            container.append(palm);
            container.append(phone);
            container.append(check);

            this.chair2.append(container);
            this.m_row2.push(phone);
            this.h_row2.push(hand);
            this.p_row2.push(container);
            this.checks.push(check);
            this.arm_row2.push(pArm);
        }

        this.container.append(this.chair1);
        this.text = $('<div class="text"><p class="text-main"><span class="number">40</span><span class="percent">%</span></p><p class="text-sub">的游客在看完旅游视频后搜寻更多相关信息</p></div>');

        this.phoneContainer = $('<div class="main"></div>');
        var text = $('<div class="search-text"></div>');
        var phone = $('<div class="mobile video1"><div class="content"><div class="google"></div><div class="video-appbar"></div><div class="video-list"><div></div></div></div>');
        var hand = $('<div class="hand ' + i + '"></div>');
        var palm = $('<div class="palm ' + i + '""></div>');
        var rightHand = $('<div class="hand-right"></div>');
        this.phoneContainer.append(phone);
        this.phoneContainer.append(hand);
        this.phoneContainer.append(palm);
        this.phoneContainer.append(text);
        this.phoneContainer.append(rightHand);

        this.container.append(this.chair2);
        this.container.append(this.text);
        this.container.append(this.phoneContainer);

        // floating text
        this.floatingText1 = $('<div class="floating-text">popular spicy food in Sichuan</div>');
        this.floatingText2 = $('<div class="floating-text">travelling in Beijing</div>');
        this.floatingText3 = $('<div class="floating-text">best 2 day tour in Hangzhou</div>');
        this.floatingText4 = $('<div class="floating-text">cheap flights to Shanghai</div>');

        this.container.append(this.floatingText1);
        this.container.append(this.floatingText2);
        this.container.append(this.floatingText3);
        this.container.append(this.floatingText4);
    };

    scene.animation = function () {
        var check1 = this.checks[0].find('li').toArray().concat(this.checks[0].find('.circle').text("1"));
        var check2 = this.checks[1].find('li').toArray().concat(this.checks[1].find('.circle').text("2"));
        var check3 = this.checks[2].find('li').toArray().concat(this.checks[2].find('.circle').text("3"));
        var check4 = this.checks[3].find('li').toArray().concat(this.checks[3].find('.circle').text("4"));

        var marco = this.p_row2[0];
        var macroHand = this.p_row2[0].find('.hand');
        var macroPalm = this.p_row2[0].find('.palm');
        var toHide = marco.find('.person');
        var p_2 = this.p_row2.slice(1);

        var searchList = [this.phoneContainer.find('.video-appbar'), this.phoneContainer.find('.video-list')];
        anole.setSubtitle('实际上，40%的游客跟我一样');

        this.tl
            .set(this.p_row1.concat(this.chair1), {opacity: 1})
            .staggerFromTo(this.p_row1.concat(this.chair1), 0.5, {opacity: 1}, {opacity: 0}, 0.1)
            .addLabel("zoom", '+=0.2')
            .staggerTo(this.m_row2, 0.5, {
                rotation: '-=30',
                scale: 0.2,
                top: '-=30',
                left: '+=5',
                className: '+=google'
            }, 0.2, 'zoom')

            .staggerTo(this.h_row2, 0.5, {
                rotation: '-=30',
                scale: 0.15,
                left: '-=5',
                top: '-=5'
            }, 0.2, 'zoom')
            .staggerFromTo(check1, 0.1, {opacity: 0, scale: 0.5}, {
                opacity: 1,
                scale: 1,
                ease: Elastic.easeOut
            }, -0.02, 'zoom')
            .staggerFromTo(check2, 0.1, {opacity: 0, scale: 0.5}, {
                opacity: 1,
                scale: 1,
                ease: Elastic.easeOut
            }, -0.02, 'zoom+=0.2')
            .staggerFromTo(check3, 0.1, {opacity: 0, scale: 0.5}, {
                opacity: 1,
                scale: 1,
                ease: Elastic.easeOut
            }, -0.02, 'zoom+=0.4')
            .staggerFromTo(check4, 0.1, {opacity: 0, scale: 0.5}, {
                opacity: 1,
                scale: 1,
                ease: Elastic.easeOut
            }, -0.02, 'zoom+=0.6')

            .addLabel("back", '+=0.3')
            .to(this.m_row2, 0.5, {rotation: '+=30', scale: 0.1, left: '-=5', top: '+=30'}, 'back')
            .to(this.h_row2, 0.5, {rotation: '+=30', scale: 0.1, left: '+=5', top: '+=5'}, 'back')
            .to(this.arm_row2, 0.5, {
                rotation: '-=120'
            }, 'back')
            .staggerTo(check1, 0.05, {opacity: 0, ease: Elastic.easeInOut}, 0.02, 'back')
            .staggerTo(check2, 0.05, {opacity: 0, ease: Elastic.easeInOut}, 0.02, 'back')
            .staggerTo(check3, 0.05, {opacity: 0, ease: Elastic.easeInOut}, 0.02, 'back')
            .staggerTo(check4, 0.05, {opacity: 0, ease: Elastic.easeInOut}, 0.02, 'back')

            .addLabel("showText", '+=0.3')
            .call(function () {
                anole.setSubtitle('会在看完旅游视频后搜寻更多相关信息。');
            })
            // show text
            .fromTo(this.text, 0.3, {display: 'none'}, {display: 'block', ease: Elastic.easeInOut}, 'showText')

            //.to(this.text, 0.3, {display: 'none', ease: Elastic.easeInOut}, 'showText+=1')
            .to(this.floatingText1, 0.8, {
                bezier: {
                    type: "thru",
                    values: [
                        {left: 100, top: 80}
                    ]
                },
                scale: 1,
                opacity: 0.5
            }, 'showText+=0.5')
            .to(this.floatingText1, 2, {opacity:0, scale:1, top:40})
            .to(this.floatingText2, 0.8, {
                bezier: {
                    type: "thru",
                    values: [
                        {left: -100, top: 150}
                    ]
                },
                scale: 0.6,
                opacity: 0.8
            }, 'showText+=0.75')
            .to(this.floatingText2, 2.5, {opacity:0, left:-120},'-=2')
            .to(this.floatingText3, 0.8, {
                bezier: {
                    type: "thru",
                    values: [
                        {left: -80, top: 300}
                    ]
                },
                scale: 0.8,
                opacity: 0.8
            }, 'showText+=1')
            .to(this.floatingText3, 3, {opacity:0,left:-100, top: 320}, '-=2.8')
            .to(this.floatingText4, 0.8, {
                bezier: {
                    type: "thru",
                    values: [
                        {left: 300, top: 200}
                    ]
                },
                scale: 1,
                opacity: 0.5
            }, 'showText+=1.25')
            .to(this.floatingText4, 2, {opacity:0, left:280 }, '-=2.5')
            //.to(this.floatingText4, 0.5, {});
    };
    scene.cleanup = function () {
        this.phoneContainer.find('.search-text').remove();
        //this.container.find('.chair1').remove();
        //this.container.find('.chair2').remove();
    };
    anole.addScene(scene);
});
