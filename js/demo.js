;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resourceUrl;

  var resource = {
	  "ribbon01": "ribbon_01.png",
	  "ribbon02": "ribbon_02.png",
	  "ribbon03": "ribbon_03.png",
	  "ribbon04": "ribbon_04.png",
	  "ribbon05": "ribbon_05.png",
	  "bridge": "bridge.png",
	  "gate": "gate.png",
	  "boat": "boat.png",
	  "oar": "oar.png",
	  "marco1": "marco1.png",
	  "marco2": "marco2.png",
	  "paperman": "paperman.png",
	  "font":"SansGBW3_min.ttf",
	  "sub-block": "subway.png",
	  "sub-left-gate": "subwayl.png",
	  "sub-right-gate": "subwayr.png",
	  "tag": "tag.png",
	  "youtube-logo": "youtube-logo.png",
	  "profile": "profile.png",
	  "board_video": "board_video.png",
	  "v0": "v0.png",
	  "v1": "v1.png",
	  "v2": "v2.png",
	  'like':"like.png",
	  "worry1": "worry1.png",
	  "worry2": "worry2.png",
	  "worry3": "worry3.png",
	  "worry4": "worry4.png",
	  "chinese1": "friendlychinese1.png",
	  "chinese2": "friendlychinese2.png",
	  "chinese3": "friendlychinese3.png",
	  "bubble_disappear": "bubble_disappear.png",
	  "marco_nomouth": "marco_nomouth.png",
	  "mouth": "mouth.png",
	  "dollar": "dollar.png",
	  "dollar_big": "dollar_big.png",
	  "dollar_top": "dollar_top.png",
	  "dollar_mid": "dollar_mid.png",
	  "dollar_bottom": "dollar_bottom.png",
	  "dollar_outer": "dollar_outer.png",
	  "dollar_outer_big": "dollar_outer_big.png",
	  "happy": "happy.png",
	  "shoppingbag1": "shoppingbag1.png",
	  "shoppingbag2": "shoppingbag2.png",
	  "satisfaction_happy": "satisfaction_happy.png",
	  "satisfaction_sad": "satisfaction_sad.png",
	  "shoppingbag": "shoppingbag.png",
	  "canadian0":"canadian0.png",
	  "canadian1":"canadian1.png",
	  "canadian2":"canadian2.png",
	  "KoreanG":"KoreanG.png",
	  "KoreanR":"KoreanR.png",
	  "koreanLetter1":"korean_letter01.png",
	  "koreanLetter2":"korean_letter02.png",
	  "koreanLetter3":"korean_letter03.png",
	  "koreanLetter4":"korean_letter04.png",
	  "koreanLetter5":"korean_letter05.png",
	  "koreanLetter6":"korean_letter06.png",
	  "koreanLetter7":"korean_letter07.png",
	  "koreanLetter8":"korean_letter08.png",
	  "koreanLetter9":"korean_letter09.png",
	  "koreanLetter10":"korean_letter10.png",
	  "map":"map.png",
	  "mark1":"mark1.png",
	  "mark2":"mark2.png",
	  "mark3":"mark3.png",
	  "mark0":"mark0.png",
	  "map_mark_pin":"map_mark_pin.png",
	  "map_mark_pin_shadow":"map_mark_pin_shadow.png",
	  "text_sichouzhilu":"text_sichouzhilu.png",
	  "text_lvyounian":"text_lvyounian.png",
	  "browsertab":"browstab.png",
	  "w1d":"wifi1_dark.png",
	  "w1l":"wifi1_light.png",
	  "w2d":"wifi2_dark.png",
	  "w2l":"wifi2_light.png",
	  "w3d":"wifi3_dark.png",
	  "w3l":"wifi3_light.png",
	  "glogo":"googlelogowithshadow.png",
	  "searchbar":"searchbarwithshadow.png",
	  "progbar":"progressbar.png",
	  "nexus":"nexuswithshadow.png",
	  "tag_blue": "tag_blue.png",
	  "tag_red": "tag_red.png",
	  "tag_yellow": "tag_yellow.png",
	  "chn_food":"chn_food.png",
	  "west_food":"west_food.png",
	  "lung_tab":"lung_tab.png",
	  "plate":"plate.png",
	  "lung_m":"lung_m.png",
	  "lung_f":"lung_f.png",
	  "gsvg":"g.svg",
	  "googlelogo": "googlelogo.png",
	  //scene5
	  "youtube": "youtube.png",
	  "replay": "replay.png",
	  "profileimagewithshadow": "profileimagewithshadow.png",
	  "replaywithbutton": "replaywithbutton.png",
	  "boardinfowithbutton": "boardinfowithbutton.png",
	  //scene6
	  "text":"text_pay.png",
	  "star0":"star0.png",
	  "star1":"star1.png",
	  "text":"text_pay.png",
	  "star0":"star0.png",
	  "star1":"star1.png",
	  'pie_blackloop':'pie_blackloop.png',
	  'pie':'pie.png',
	  'pie_focus':'pie_focus.png',
	  'pie_pin':'pie_pin.png',
	  'map':'map.png',
	  'android':'android.png',
	  'phone':'phone.png',
	  'toilet': 'toilet.png',
	  /* Videos */
	  /*"french":"french.mp4",
		"french_webm": "french.webm",
		"food":"food.mp4",
		"food_webm":"food.webm",
		"toilet":"toilet.mp4",
		"toilet_webm":"toilet.webm",
		*/
  }

  //videolist images in scene 5 and 6
  $(function(){
    var videolistFileNamePrefix = "videolist_image";
    var videolistFileNameShadowSuffix = "withshadow";
    var videolistFocusFileName = "_focus";
    var videolistShadowFileName = "_shadow";
    for(var i = 1; i < 6; i++) {
      resource[videolistFileNamePrefix + i] = videolistFileNamePrefix + i + ".png";
      resource[videolistFileNamePrefix + i + videolistFileNameShadowSuffix] = videolistFileNamePrefix + i + videolistFileNameShadowSuffix + ".png";
      resource[videolistFileNamePrefix + i + videolistFocusFileName] = videolistFileNamePrefix + i + videolistFocusFileName + ".png";
      resource[videolistFileNamePrefix + i + videolistShadowFileName] = videolistFileNamePrefix + i + videolistShadowFileName + ".png";
    }
  });

  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: ["bridge","gate","boat","oar","marco1", "ribbon01"] //depend resources.
      },
      {
        fileName:'scene2.js',
        res: ["gate","boat","oar","marco1","paperman",'marco2']
      },
      {
        fileName:'scene3.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","font", "ribbon02"]
      },
      {
        fileName:'scene4.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","font"]
      },
      {
        fileName:'scene5.js',
        res: ["youtube", "replay", "profileimagewithshadow",
        "videolist_image1withshadow", "videolist_image2withshadow", "videolist_image3withshadow", "videolist_image4withshadow", "videolist_image5withshadow",
        "replaywithbutton", "boardinfowithbutton"]
      },
      {
        fileName:'scene6.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay","like", "ribbon04"]
      },
      {
        fileName:'scene7.js',
          res: ["profile", "youtube-logo", "tag", "board_video", "v0", "v1", "v2", "worry1", "worry2", "worry3", "worry4", "star0", "star1"]
      },
      {
        fileName:'scene8.js',
          res: ["ribbon05", "bubble_disappear", "marco_nomouth", "mouth", "chinese1", "chinese2", "chinese3", "star0", "star1"]
      },
      {
        fileName:'scene9.js',
        res: ["dollar", "dollar_big", "dollar_top", "dollar_mid", "dollar_bottom", "dollar_outer", "dollar_outer_big", "satisfaction_happy", "satisfaction_sad"]
      },
      {
        fileName:'scene10.js',
        res: ["shoppingbag1", "shoppingbag2", "text", "canadian0"]
      },
      {
        fileName:'scene11.js',
        res: ["canadian0", "canadian1", "canadian2", "KoreanR", "KoreanG", "koreanLetter1", "koreanLetter2", "koreanLetter3", "koreanLetter4", "koreanLetter5", "koreanLetter6", "koreanLetter7", "koreanLetter8", "koreanLetter9", "koreanLetter10"]
      },
      {
        fileName: 'scene12.js',
        res: []
      },
      {
        fileName:'scene13.js',
        res: ["gate","boat","marco2"]
      },
      {
        fileName:'scene14.js',
        res: ["map","mark1","mark2","mark3","mark0","map_mark_pin","map_mark_pin_shadow"]
      },
      {
        fileName:'scene15.js',
        res: ["map","marco2","text_sichouzhilu","text_lvyounian"]
      },
      {
        fileName:'scene16.js',
        res: ['pie_blackloop','pie','pie_focus','pie_pin','map']
      },
      {
        fileName:'scene17.js',
        res: ['android','phone']
      },
      {
        fileName:'scene18.js',
        res: []
      },
      {
        fileName: 'scene19.js',
        res: ["tag_blue","tag_yellow","tag_red"]
      },
      {
        fileName:'scene20.js',
        res: ["chn_food","west_food"]
      },
      {
        fileName:'scene21.js',
        res: ["lung_f","lung_m","lung_tab","plate"]
      },
      {
        fileName: 'scene22.js',
        res: ["toilet"]
      },
      {
        fileName: 'scene23.js',
        res: ["gsvg", "googlelogo"]
      },
    ]
    // baseUrl = 'http://gtravel.b0.upaiyun.com/scene/';
    baseUrl = '/scene/';
    // resourceUrl = "http://gtravel.b0.upaiyun.com/resource/";
    resourceUrl = "/resource/";
  //}

  $(function (){
	// Push voiceover files to sceneQueue.
    for (i=1; i<=sceneQueue.length; i++) {
		resource['vo'+i] = 'Sound/' + i + '.mp3';
		(sceneQueue[i-1].res).push('vo'+i);
	}
	var config = {
      baseUrl:baseUrl,// root url
      resourceUrl: resourceUrl,// resource url like jpg/mp3
      resource: resource,//resource
      maxQueueLength: 18,//TODO load serval scenes at first
      sceneQueue: sceneQueue,//anime scene queue
      autoPlay: false,//auto play with no event
      flipType: 'click',//flip type eg:click, swipe, wheel
      containerTemplate: '<div class="container"><div class="canvas scene-wrapper"></div></div>',//scene root container, it will be appended to body.
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>',//next button dom
      startBtnTemplate: '<div class="start-btn btn J_StartBtn">start</div>', //start button dom
	  showLoading: function (){
        $(".mask").show();
        console.log("loading resource, show loading message.");
      },
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide loading message.")
      },
	  showFirstLoading: function() {
        $(".opening").show();
        console.log("loading first several scenes, show opening animation.");
	  },
      hideFirstLoading: function (){
        $(".opening").hide();
        console.log("First batch of scencs loaded, hide opening animations.")
      },
      showError: function (msg){ console.log(msg); }
    };

    if(anole.isMobile()) {
		config.flipType = 'swipe';
		config.autoPlay = false;
	}
	anole.config(config);
    anole.start();
    var window_w = document.body.clientWidth;
    var window_h = document.body.clientHeight;
	var container = anole.container;
    var canvas_w = container.width();
    var canvas_h = container.height();
	var loading = $('.mask');
	var opening = $('.opening');
	loading.appendTo(container);
	opening.appendTo(container);
	var container_w;
	var container_h;
	var ratio = 0.75;
	var scale = 1;
	if (anole.isMobile()) {
		container_w = window_w;
		container_h = window_w/ratio;
		scale = 1;
	} else {
		if (window_h / window_w < ratio) {
			container_h = window_h;
			container_w = ratio * window_h;
			scale = window_h / canvas_h + "";
		} else {
			container_w = window_w;
			container_h = window_w / ratio;
			scale = window_w / canvas_w + "";
		}
	}
    function getSupportedPropertyName() {
      var properties = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
      for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
          return properties[i];
        }
      }
      return null;
    }
    var transformProperty = getSupportedPropertyName();
    if (anole.isMobile()) {
		container.css(transformProperty,"translate3d(-50%, 0, 0) top:0 left:0");
	} else {
		container.css(transformProperty,"translate3d(-50%,"+((scale-1)*canvas_h/2)+"px,0) scale("+scale+","+scale+")");
		// container.css(transformProperty,"translate3d(-50%,"+((scale-1)*canvas_h/2)+"px,0)");
	}
  })
});
