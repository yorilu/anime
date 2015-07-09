require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'BezierPlugin', 'EasePack'], function(anole, Scene) {


    var star_coordinate = {
        left: 190,
        top: 140
    };

    var scene = new anole.Scene(8, anole.canvas, true);

    var buildMovingPath = function($star, xOffset, yOffset, anchor) {
        // build a moving path to the stars on top
        var path = [];
        var sx = $star.offsetLeft + xOffset;
        var sy = $star.offsetTop + yOffset;
        // one anchor point
        anchor && path.push(anchor);
        path.push({left: sx, top: sy});
        return path;
    };

    scene.createDom = function() {
        // create character
        this.$marco = $('<div></div>').addClass('marco-shadow')
            .append($('<div><img id="mouth" src="./resource/mouth.png"></img></div>').addClass('marco-nomouth'));
        this.$marco.appendTo(this.container);

        this.$chineseA = $('<div></div>').addClass('chinese a').appendTo(this.container);
        this.$chineseB = $('<div></div>').addClass('chinese b').appendTo(this.container);
        this.$chineseC = $('<div></div>').addClass('chinese c').appendTo(this.container);

        // prepare bubbles
        this.commentList = this.container.find('.comment'); //length = 4
        this.bubbles = this.commentList.find('.worry-bubble'); // length = 4
        this.disbubbles = [];
        for (var i = 0; i < 4; i++) {
            var disbubble = $('<div id="bubble' + i + '"></div>').addClass('bubble-disappear').css('opacity', 0);
            disbubble.prependTo(this.commentList[i]);
            this.disbubbles.push(disbubble);
            var id = "comment" + i + "star";
            var top = star_coordinate.top + (i * 75);
            var left = star_coordinate.left;
            // we need to append the stars to container as they need to move around later.
            $('<div id="' + id + '1" class="bubble-star star1"></div>').css('opacity', 0).css('left', left).css('top', top).appendTo(this.container);
            $('<div id="' + id + '2" class="bubble-star star2"></div>').css('opacity', 0).css('left', left + 15).css('top', top + 10).appendTo(this.container);
            $('<div id="' + id + '3" class="bubble-star star3"></div>').css('opacity', 0).css('left', left + 15).css('top', top - 10).appendTo(this.container);
        }
    };

    scene._disappear = function() {
        this.circleStars = []; // keep track the starts which will be used in next stage

        var starIdx = {
            0: [0],
            1: [1, 2],
            2: [3],
            3: [4, 5]
        };

        for (var i = 0; i < 4; i++) {
            //calculate time
            var time = 'float+=' + (i * 0.25);
            var starDisplayTime = 'float+=' + (i * 0.25);
            var starMovingTime = 'float+=' + (i * 0.25 + 0.5);
            var star1 = $('#comment' + i + 'star1');
            var star2 = $('#comment' + i + 'star2');
            var star3 = $('#comment' + i + 'star3');

            var $comment = $(this.commentList[i]).find('.comment-bar');
            var $bubble = this.bubbles[i];
            var $disBubble = this.disbubbles[i];

            var starts = this.container.find('.star');
            // hide comment and bubble, show up dis bubble
            this.tl.to($comment, 0.5, {scale: 0}, time) // zoom in comment
                .to($bubble, 0.3, {scale: 0, ease: Elastic.easeOut}, time) // hide bubble
                .fromTo($disBubble, 0.3, {opacity: 0, scale: 0.6}, {
                    opacity: 1,
                    ease: Elastic.easeOut,
                    scale: 1.4
                }, starDisplayTime) // show disbubble
                .fromTo(star1, 0.3, {opacity: 0, scale: 0}, {
                    opacity: 1,
                    scale: 0.8,
                    ease: Elastic.easeOut
                }, starDisplayTime)
                .fromTo(star2, 0.3, {opacity: 0, scale: 0}, {
                    opacity: 1,
                    scale: 0.5,
                    ease: Elastic.easeOut
                }, starDisplayTime)
                .fromTo(star3, 0.3, {opacity: 0, scale: 0}, {
                    opacity: 1,
                    scale: 0.2,
                    ease: Elastic.easeOut
                }, starDisplayTime); // show stars

            if (starIdx[i].length == 1) {
                this.circleStars.push(star1);
                this.tl.set([star2, star3], {opacity: 0}, starMovingTime)
                    .to([star1], 1, {
                        bezier: {
                            type: "thru",
                            values: this.starPaths[starIdx[i]]
                        },
                        scale: 1.2
                    }, starMovingTime);
            }
            else {
                this.circleStars.push(star1);
                this.circleStars.push(star2);
                this.tl.set([star3], {opacity: 0}, starMovingTime)
                    .to([star1], 1, {
                        bezier: {
                            type: "thru",
                            values: this.starPaths[starIdx[i][0]]
                        },
                        scale: 1.2
                    }, starMovingTime)
                    .to([star2], 1, {
                        bezier: {
                            type: "thru",
                            values: this.starPaths[starIdx[i][1]]
                        },
                        scale: 1.2
                    }, starMovingTime);// move stars
            }
            this.tl.to($disBubble, 0.05, {opacity: 0}, starMovingTime);
        }
    };

    scene._moveMarco = function() {
        var fullPath = [
            {left: 460, top: 100},
            {left: 500, top: 190},
            {left: 470, top: 270},
            {left: 280, top: 270},
            {left: 250, top: 190},
            {left: 310, top: 110},
            {left: 430, top: 110}]; // magic, don't touch..

        this.tl.to(this.$marco, 0.5, {left: 330, top: 200, scale: 1.5, ease: Elastic.easeOut.config(1, 1)}, 'move')
            .staggerTo([this.$chineseA, this.$chineseB, this.$chineseC], 0.3, {opacity: 0}, 0.1, 'move')
            .to(this.$starts, 0.1, {opacity: 0}, 'move');

        var orderIdx = 0;  // from 0 to 6
        for (var i = this.circleStars.length; i--; i >= 0) {
            // i from 6 to 0
            var path = fullPath.slice(0, fullPath.length - orderIdx);
            this.tl.to(this.circleStars[i], 1, {
                bezier: {
                    type: "thru",
                    values: path
                }
            }, 'move');
            orderIdx++
        }
    };

    scene.animation = function() {
        // prepare star moving path
        this.starPaths = [];
        this.$starts = this.container.find('.star');
        // we only need to fill up 6 stars [0,5]
        this.starPaths.push(buildMovingPath(this.$starts[0], 0, 0));
        this.starPaths.push(buildMovingPath(this.$starts[1], 0, 0));
        this.starPaths.push(buildMovingPath(this.$starts[2], 0, 0));
        this.starPaths.push(buildMovingPath(this.$starts[3], 0, 0));
        this.starPaths.push(buildMovingPath(this.$starts[4], 0, 0));
        this.starPaths.push(buildMovingPath(this.$starts[5], 0, 0));

        // start animation
        var dt_float = 0.4;
        var dt_stagger = 0.2;
        var tl = this.tl.set(this.disbubbles, {opacity: 0})
            .addLabel('in', "+=0")
            .addLabel('float', "+=0.5")
            .fromTo(this.$marco, 0.75, {right: -200, opacity: 0, ease: Power3.easeIn}, {
                right: 140,
                opacity: 1,
                ease: Power3.easeIn
            }, 'in')
            .staggerTo([this.$chineseA, this.$chineseB, this.$chineseC], dt_float, {
                opacity: 1,
                scale: 1.1,
                ease: Elastic.easeOut
            }, dt_stagger, "in+=1")
            .to(this.$marco.find('#mouth'), 0.5, {rotation: 180, ease: Elastic.easeInOut}).addLabel('move', "+=0.5");
        this._disappear();
        this._moveMarco();
    };

    scene.cleanup = function() { // Called before entering next scene.
        this.container.find('.ctn-browser').remove();
        this.container.find('.ppl-ctn').remove();
        this.container.find('.bubble-star').remove();
        this.container.find('.stars').remove();
    };
    anole.addScene(scene);
});
