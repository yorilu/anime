;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'AttrPlugin', 'TimelineLite'], function (anole){

  var scene = new anole.Scene(7, anole.canvas, true);
  var sceneW = anole.getSceneW();
  var sceneH = anole.getSceneH();

  scene.createDom = function() {
    anole.setBackgroundColor('#fbde43');
    this.searchCtn = $("<div class='search-ctn'></div>").appendTo(this.container);
    this.searchText = $("<span class='search-text'></span>").appendTo(this.searchCtn);
    this.searchBar = $("<img class='search-bar' src='./resource/s7-google-search-bar-01_withmagnifier.png'></div>").appendTo(this.searchCtn);
    this.hand = $("<img class='hand' src='./resource/s7-fat-hand-01.png'>").appendTo(this.container);
    this.badge1 = $("<img class='badge' src='./resource/s7-badge-tcwarrior.png'>").appendTo(this.container);
    this.badge2 = $("<img class='badge' src='./resource/s7-badge-dunhuang.png'>").appendTo(this.container);
    this.badge3 = $("<img class='badge' src='./resource/s7-mp-badge-01.png'>").appendTo(this.container);
    this.bingmayong = $("<div class='screen-video bingmayong'></div>").appendTo(this.container.find(".mobile-screen"));
    this.dunhuang = $("<div class='screen-video dunhuang_full'></div>").appendTo(this.container.find(".mobile-screen"));
    this.dunhuang_zoom = $("<div class='screen-video dunhuang_zoom'></div>").appendTo(this.container.find(".mobile-screen"));
    this.mpolo_shadow = $("<img class='mpolo-shadow' src='./resource/s7-mpolo-shadow.png'/>").appendTo(this.dunhuang_zoom);
      this.marco = $("<div class='marco2'></div>").appendTo(this.dunhuang_zoom);
      $("<div class='marco2_left_leg'></div>").appendTo(this.marco);
      $("<div class='marco2_right_leg'></div>").appendTo(this.marco);
      $("<div class='marco2_hand_right'></div>").appendTo(this.marco);
      $("<div class='marco2_body'></div>").appendTo(this.marco);
      $("<div class='marco2_hand_left'></div>").appendTo(this.marco);
      $("<div class='marco2_head'></div>").appendTo(this.marco);
  }
  scene.animation = function() {
    var msg = '2015年，Google 搜索上最热门的丝路旅游元素是';
    var msgs = [['兵马俑','兵马俑、'],['敦煌','敦煌、'],['马可波罗','还有...马可波罗。']];

    var stext = this.searchText;
    var silkroadpage = [this.container.find(".screen-video"),
        this.container.find(".silk-road")];
    this.tl.addLabel("loading")
        .set(this.hand, {opacity:1})
        .call(function(){anole.setSubtitle(msg);})
        .fromTo(this.searchCtn,0.4,{left:"-100%"},{left:"0%"},"loading+=1.5")
    ;
    this.tl.addLabel("search1", "loading+=5")
        .set(this.hand, {opacity:1}, "search1")
        .call(function() {stext.html(msgs[0][0]);})
        .call(function() {anole.setSubtitle(msgs[0][1]);})
        .fromTo(this.hand, 0.1, {opacity:1}, {left:"-=20%"}, "search1")
        .fromTo(this.hand, 0.2, {opacity:1}, {left:"+=20%"}, "search1+=0.2")
        .fromTo(silkroadpage, 0.4, {opacity:1}, {left:"-=100%"}, "search1")
        .fromTo(this.badge1, 0.2, {opacity:0}, {opacity:1}, "search1+=0.2")
    ;
      this.tl.addLabel("search2", "search1+=0.8")
          .set(this.hand, {opacity:1}, "search2")
          .call(function() {stext.html(msgs[1][0]);})
          .call(function() {anole.setSubtitle(msgs[1][1]);})
          .to(this.badge1, 0.1, {opacity:0}, "search2")
          .fromTo(this.hand, 0.1, {opacity:1}, {left:"-=20%"}, "search2")
          .fromTo(this.hand, 0.2, {opacity:1}, {left:"+=20%"}, "search2+=0.2")
          .fromTo(silkroadpage, 0.4, {opacity:1}, {left:"-=100%"}, "search2")
          .fromTo(this.badge2, 0.2, {opacity:0}, {opacity:1}, "search2+=0.2")
      ;
      this.tl.addLabel("search3", "search2+=0.9")
          .set(this.hand, {opacity:1}, "search3")
          .call(function() {stext.html(msgs[2][0]);})
          .call(function() {anole.setSubtitle(msgs[2][1]);})
          .fromTo(this.hand, 0.1, {opacity:1}, {left:"-=20%"}, "search3")
          .fromTo(this.hand, 0.2, {opacity:1}, {left:"+=20%"}, "search3+=0.2")
          .fromTo(silkroadpage, 0.4, {opacity:1}, {left:"-=100%"}, "search3")
          .fromTo(this.badge3, 0.2, {opacity:0}, {opacity:1}, "search3+=0.2")
          .to(this.marco, 0.2, {opacity:1}, "search3+=0.6")
          .to(this.marco, 1, {})
      ;

  }
  scene.cleanup = function() {
  }
  anole.addScene(scene);
});
