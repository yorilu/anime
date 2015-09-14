/**
 * Created by michael on 8/22/15.
 */
require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite', 'EasePack', 'TextPlugin'], function(anole) {
    var scene = new anole.Scene(9, anole.canvas, false);
    var resourceUrl = anole.getResourceUrl();
    scene.createDom = function() {
        anole.setBackgroundColor('rgb(134, 204, 23)');
        this.earth = $('<div class="earth rotate"></div>');
        this.buildingContainer = $('<div class="buildings rotate"></div>');
        this.buildings = [];
        for (var i = 1; i <= 15; i++) {
            var building = $('<div class="building' + i + '"><img src="' + resourceUrl + 'building' + i + '.png"></img></div>').appendTo(this.buildingContainer);
            this.buildings.push(building);
        }

        this.phoneContainer = $('<div class="main"></div>');
        var text = $('<div class="search-text"></div>');
        var phone = $('<div class="mobile video1"><div class="content"><div class="google"></div><div class="video-appbar"></div><div class="video-list"><div></div></div></div>');
        var rightHand = $('<div class="hand-right"></div>');
        this.phoneContainer.append(phone);
        this.phoneContainer.append(text);
        this.phoneContainer.append(rightHand);

        this.container.append(this.earth);
        this.container.append(this.buildingContainer);
        this.container.append(this.phoneContainer);
    };

    scene.animation = function() {
        var searchList = [this.phoneContainer.find('.video-appbar'), this.phoneContainer.find('.video-list')];

        var self = this;
        var rotateBuilding = function(tl) {
            var rotate = [0, 40, 80, 100, 120, 140, 160, 175, 195, 215, 230, 250, 275, 300, 330];
            for (var i = 0; i <= 14; i++) {
                tl = tl.fromTo(self.buildings[i], 3, {scale: 0, rotation: 0, transformOrigin: "50% 165%"}, {
                    scale: 0.8,
                    rotation: '+=' + rotate[i],
                    transformOrigin: "50% 165%",
                    ease: Elastic.easeInOut
                }, 'start-=1')
            }
            return tl;
        };
        anole.setSubtitle('有了万能的手机，我们随时随地都可以为旅游做功课。');
        this.tl.delay(1)
            .addLabel('start')
            .fromTo(this.earth, 0.5, {scale: 0.3}, {scale: 0.8}, 'start');
        rotateBuilding(this.tl)
            .fromTo(this.phoneContainer, 0.5, {display: 'none', scale: 0}, {
                display: 'block',
                scale: 0.7,
                ease: Elastic.easeInOut
            })
            .addLabel('play')
            // search and text
            .to(this.phoneContainer.find('.search-text'), 1, {
                text: "Travel",
                ease: Linear.easeNone
            }, 'play+=0.2')
            // hand gesture of search text
            .to(this.phoneContainer.find('.hand-right'), 0.2, {
                top: "-=" + anole.getSceneH() * 0.5,
                left: "-=150"
            }, 'play+=0.3')
            .to(this.phoneContainer.find('.hand-right'), 0.2, {
                top: "+=" + anole.getSceneH() * 0.1,
                left: "-=150"
            }, 'play+=0.5')
            .to(this.phoneContainer.find('.hand-right'), 0.2, {
                top: "+=" + anole.getSceneH() * 0.1,
                left: "-=50"
            }, 'play+=0.7')
            .to(this.phoneContainer.find('.hand-right'), 0.2, {
                top: "-=" + anole.getSceneH() * 0.1,
                left: "+=180"
            }, 'play+=1')
            .to(this.phoneContainer.find('.hand-right'), 0.2, {
                top: "+=50",
                left: "+=130"
            }, 'play+=1.2')
            .to([this.buildingContainer,this.earth], 2.2, {top: '100%', ease: Elastic.easeIn}, 'play+=1.5')
            //.to(this.earth, 2.2, {top: '100%', ease: Elastic.easeIn}, 'play+=1.9')
            .to(this.phoneContainer, 2.2, {top: '80%', ease: Elastic.easeIn}, 'play+=2')
            .to(this.phoneContainer, 0.5, {});
    };
    scene.cleanup = function() {
        this.container.find('.earth').remove();
        this.container.find('.buildings').remove();
    };
    anole.addScene(scene);
});
