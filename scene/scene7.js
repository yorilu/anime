;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene) {

    var DATA = [{
        label: '饮食安全',
        percent: 61
    }, {
        label: '如厕不便',
        percent: 51
    }, {
        label: '欺诈宰客',
        percent: 35
    }, {
        label: '人多拥挤',
        percent: 33
    }];

    var scene = new anole.Scene(7, anole.canvas, true);
    scene.createDom = function() {
        this.container.find('.topbar').remove();
        this.container.find('.tag').remove();
        this.container.find('#browser-right').remove();
        this.container.find('#youtube').remove();
        this.container.find('.like-bar').children().remove();
        this.container.find('.page-ctn').remove(); // TODO: Use tween.
        this.container.find('.shade').remove();
        this.comments = this.container.find('.comments');
        var heads = this.comments.find('.comment-head');

        // prepare data
        this.commentList = this.container.find('.comment');
        this.bubbles = [];
        this.$dataBars = [];
        this.$dataLabels = [];
        this.$dataPercents = [];

        for (var i = 0; i < 4; i++) {
            var bubble = $('<div></div>').addClass('worry-bubble').addClass('worry' + (i + 1))
                .css('opacity', '0');
            bubble.insertBefore(heads[i]);
            this.bubbles.push(bubble);

            var $comment = this.commentList[i];
            var $commentBar = $('<div class="comment-bar"></div>').appendTo($comment);
            var $commentLabel = $('<div class="comment-label">' + DATA[i].label + '</div>').appendTo($commentBar);
            var $commentPercent = $('<div class="comment-percent">' + DATA[i].percent + '%s</div>').appendTo($commentBar);
            this.$dataBars.push($commentBar);
            this.$dataLabels.push($commentLabel);
            this.$dataPercents.push($commentPercent);
        }

        this.$stars = $('<div class="stars"></div>').appendTo(this.container);
        for (var i = 0; i < 10; i++) {
            $('<div class="star"></div>').appendTo(this.$stars);
        }
    };

    scene.animation = function() {
        var all = this.comments.find('.comment');
        var pgroup = []; // Ancenster elements to be background removed.
        var group = []; // Elements to be set invisible
        for (i = 4; i < all.length; i++) {
            group.push(all[i]);
        }

        // Tracking back to find all siblings of parents.
        // We need to fade them.
        var p = this.comments;
        if (p[0]) {
            while (!p.hasClass('scene-content')) {
                var others = p.siblings();
                if (others.length) {
                    group.push(others);
                }
                pgroup.push(p);
                p = p.parent();
            }
        }

        this.tl.set(pgroup, {backgroundSize: '0'})  // Cannot tween background-size :(.
            .addLabel('fade')
            .to(group, 0.5, {opacity: 0})
            .to(pgroup, 0.5, {backgroundColor: 'transparent'}, 'fade')
            .addLabel('bigger')
            .to(this.container.find('.ctn-browser'), 0.3, {scale: 0.68, top: '+=50'}, 'bigger')
            // hide comments
            .addLabel('change')
            .to(this.comments.find('.comment-head'), 0.3, {opacity: 0})
            .to(this.comments.find('.comment-content'), 0.1, {scale: 0, opacity: 0}, 'change')
            .addLabel('bubbles')
            .to(this.$stars, 0.3, {opacity: 1}, 'bubbles+=0.3')

        for (var idx in DATA) {
            var interval = 0.15;
            var $dataBar = this.$dataBars[idx];
            var $bubble = this.bubbles[idx];
            var $percent = this.$dataPercents[idx];
            var delay = "bubbles+=" + (0.3 + interval * idx);
            this.tl
                .fromTo($bubble, interval, {scale: 0, opacity: 0},
                {scale: 1, opacity: 1, ease: Elastic.easeOut}, delay)
                .fromTo($dataBar, interval, {width: 0, opacity: 0}, {
                    width: DATA[idx].percent * 14,
                    opacity: 1
                }, delay)
                .fromTo($percent, interval, {opacity: 0, left: 0}, {
                    opacity: 1,
                    left: DATA[idx].percent * 14 + 50 // offset = 50
                }, delay);
        }
    };
    scene.cleanup = function() { // Called before entering next scene.
        this.comments.find('.comment-head').remove();
        this.comments.find('.dash').remove();
        var list = this.comments.children();
        list[4].remove();
    };
    anole.addScene(scene);
});
