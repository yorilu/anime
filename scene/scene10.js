/**
 * Created by michael on 8/22/15.
 */
require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite', 'EasePack', 'TextPlugin'], function(anole) {
    var scene = new anole.Scene(10, anole.canvas, true);
    scene.createDom = function() {
        anole.setBackgroundColor('rgb(134, 204, 23)');
        this.groupContainer = $('<div class="group"></div>');
        this.chair = $('<div class="chair"></div>');
        this.man = $('<div class="person man"></div>');
        this.man.append($('<div class="right-arm"></div>'));
        this.man.append($('<div class="left"><div class="left-arm"></div><div class="left-hand"></div></div>'));
        this.man.append($('<div class="right-hand"></div>'));
        this.man.append($('<div class="head"></div>'));
        this.man.append($('<div class="mobile"></div>'));

        this.woman = $('<div class="person woman"></div>');
        this.woman.append($('<div class="newspaper"></div>'));
        this.woman.append($('<div class="left-arm"></div>'));
        this.woman.append($('<div class="right-arm"></div>'));
        this.woman.append($('<div class="right-hand"></div>'));
        this.woman.append($('<div class="head"></div>'));
        this.woman.append($('<div class="cocktail"></div>'));

        this.groupContainer.append(this.chair);
        this.groupContainer.append(this.man);
        this.groupContainer.append(this.woman);

        this.text = $('<div class="text"><p class="text-main"><span class="number">50</span><span class="percent">%</span></p><p class="text-sub">的游客用手机搜索旅游相关信息</p></div>');
        this.container.append(this.text);
        this.container.append(this.groupContainer);
    };


    scene.animation = function() {
        anole.setSubtitle('每两个人当中就有一个用手机搜索旅游相关信息。');
        this.tl
            .addLabel('start')
            .to(this.container.find('.main'), 0.5, {scale: 0}, 'start')
            .set(this.container.find('.main'), {display: 'none'})
            .fromTo(this.groupContainer, 1, {scale: 0}, {scale: 0.6, ease: Elastic.easeOut},'start')
            .fromTo(this.text, 0.5, {scale: 0}, {scale: 1}, 'start+=0.6')
            .to(this.text, 5, {})
    };
    scene.cleanup = function() {

    };
    anole.addScene(scene);
});
