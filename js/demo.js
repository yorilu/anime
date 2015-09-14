;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resourceUrl;

  var resource = {
    // It doesn't work with font files:
    // Just like videos, you need to USE them to
    // actually trigger them to load
    "map": "map.svg",
    "highlightchina": "highlightchina.svg",
    "italy-building": "italy-building.svg",
    "marco_left_arm1": "marco_left_arm1.svg",
    "marco_left_arm2": "marco_left_arm2.svg",
    "marco_body": "marco_body.svg",
    "marco_left_hand": "marco_left_hand.svg",
    "marco_head": "marco_head.svg",
    "marco_leg": "marco_leg.svg",
    "bgm":"bgm.mp3",
    "tree": "tree.svg",
    "trees_twolines": "trees_twolines.svg",
    "grass": "grass.svg",
    "bg-mountain": "bg-mountain.svg",
    "bg-castle": "bg-castle.svg",
    "bg-building": "bg-building.svg",
    "bg-greatwall": "bg-greatwall.svg",
    "bg-hut": "bg-hut.svg",
    "bg-huts": "bg-huts.svg",
    "bg-sand": "bg-sand.svg",
    "bg-temple": "bg-temple.svg",
    "book": "book.svg",
    /*"vo0": "Sound/0.mp3",
    "vo1": "Sound/1.mp3",
    "vo2": "Sound/2.mp3",
    "vo3": "Sound/3.mp3",
    "vo4": "Sound/4.mp3",
    "vo5": "Sound/5.mp3",
    "vo6": "Sound/6.mp3",
    "vo7": "Sound/7.mp3",
    "vo8": "Sound/8.mp3",
    "vo9": "Sound/9.mp3",
    "vo10": "Sound/10.mp3",
    "vo11": "Sound/11.mp3",
    "vo12": "Sound/12.mp3",
    "vo13": "Sound/13.mp3",
    "vo14": "Sound/14.mp3",
    "vo15": "Sound/15.mp3",
    "vo16": "Sound/16.mp3",
    "vo17": "Sound/17.mp3",
    */
    "vo":"Sound/vo01.mp3",
    // scene2
    "china": "china.png",
    "plane": "plane.png",
    "mobile_png": "mobile.png",
    "plane-withmarco": "plane_withmarco.png",
    "plane-withoutmarco": "plane_withoutmarco.png",
    "marco2-body": "marco2.0_body.png",
    "marco2-hand-left":"marco2.0_hand_leftwithmap.png",
    "marco2-hand-right":"marco2.0_hand_right.png",
    "marco2-head":"marco2.0_head.png",
    "marco2-leg":"marco2.0_leg.png",
    "paperpeople1": "paperpeople1.png",
    "paperpeople2": "paperpeople2.png",
    "paperpeople3": "paperpeople3.png",
    // scene 3 
    "manonchair_marco":"manonchair_marco.svg",
	  "hand_holdingmobile_svg":"hand_holdingmobile.svg",
    "hand_holdingmobile_thumb_svg":"hand_holdingmobile_thumb.svg",
    "hand_holdingmobile_palm_svg":"hand_holdingmobile_palm.svg",
    "mobile":"mobile.svg",
    "mobile_portrait":"mobile_portrait.png",
    "ui_search":"ui_search.svg",
    // scene 4
    "chair":"chair.png",
    "hand_holdingmobile_thumb":"hand_holdingmobile_thumb.png",
    "video1_png":"video1.png",
    "video1":"video1.svg",
    "hand_tap": "hand_tap.svg",
    "check":"check.png",
    "ui_youtube_appbar":"ui_youtube_appbar.png",
    "ui_youtube_list":"ui_youtube_list.png",
    "manonchair_arm_1":"manonchair_arm_1.png",
    "manonchair_arm_2":"manonchair_arm_2.png",
    "manonchair_arm_3":"manonchair_arm_3.png",
    "manonchair_arm_4":"manonchair_arm_4.png",
    "manonchair_body_1":"manonchair_body_1.png",
    "manonchair_body_2":"manonchair_body_2.png",
    "manonchair_body_3":"manonchair_body_3.png",
    "manonchair_body_4":"manonchair_body_4.png",
    "manonchair_head":"manonchair_head.png",
      // scene 6
    "video1": "video1.svg",
    "video2": "video2.svg",
    "video3": "video3.svg",
    "video4": "video4.svg",
    "video5": "video5.svg",
    "video6": "video6.svg",
    "video1_nobutton": "video1_nobutton.svg",
    "text_silkroad":"text_silkroad.svg",
      // scene 7
    "terra1":"terra1.png",
    "dunhuang_full":"dunhuang_full.png",
    "dunhuang_zoom":"dunhuang_zoom.png",
    "s7-google-search-bar-01_withmagnifier":"s7-google-search-bar-01_withmagnifier.png",
    "s7-fat-hand-01":"s7-fat-hand-01.png",
    "s7-badge-tcwarrior":"s7-badge-tcwarrior.png",
    "s7-badge-dunhuang":"s7-badge-dunhuang.png",
    "s7-mp-badge-01":"s7-mp-badge-01.png",
    "s7-mpolo-shadow":"s7-mpolo-shadow.png",
      // scene 9
    "s0-earth":"s0-earth.png",
    "dunhuang_zoom": "dunhuang_zoom.png",
    "guy_arm": "guy_arm.png",
    "guy_armless": "guy_armless.png",
    "guy_armless_dark": "guy_armless_dark.png",
    "s8-phone-frame-01": "s8-phone-frame-01.png",
    "s8-welcome-board-01": "s8-welcome-board-01.png",
    "marco2-hand-left2":"marco2.0_hand_leftwithoutmap.png",
    "worriedmarco2.0_arm1": "worriedmarco2.0_arm1.png",
    "worriedmarco2.0_arm2": "worriedmarco2.0_arm2.png",
    "worriedmarco2.0_body": "worriedmarco2.0_body.png",
    "worriedmarco2.0_hand": "worriedmarco2.0_hand.png",
    "worriedmarco2.0_head": "worriedmarco2.0_head.png",
    "worry1": "worry1.png",
    "worry1_text": "worry1_text.png",
    "worry2": "worry2.png",
    "worry2_text": "worry2_text.png",
    "worry3": "worry3.png",
    "worry3_text": "worry3_text.png",
    "worry4": "worry4.png",
    "worry4_text": "worry4_text.png",
    "building1":"building1.png",
    "building2":"building2.png",
    "building3":"building3.png",
    "building4":"building4.png",
    "building5":"building5.png",
    "building6":"building6.png",
    "building7":"building7.png",
    "building8":"building8.png",
    "building9":"building9.png",
    "building10":"building10.png",
    "building11":"building11.png",
    "building12":"building12.png",
    "building13":"building13.png",
    "building14":"building14.png",
    "building15":"building15.png",
      // scene 10
    "coupleonsofa":"coupleonsofa.png",
    "coupleonsofa_manarm1":"coupleonsofa_manarm1.png",
    "coupleonsofa_manarm2":"coupleonsofa_manarm2.png",
    "coupleonsofa_manhead":"coupleonsofa_manhead.png",
    "coupleonsofa_womanarm1":"coupleonsofa_womanarm1.png",
    "coupleonsofa_womanarm2":"coupleonsofa_womanarm2.png",
    "coupleonsofa_womanhead":"coupleonsofa_womanhead.png",
    "mobile_back":"mobile_back.png",
    "newspaper_hand":"newspaper_hand.png",
    "toilet": "toilet.video",
    "building":"build.png",
    "cloud":"cloud.png",
    "friendlychinese":"friendlychinese.png",
    "friendlymanarm1":"friendlymanarm1.png",
    "friendlymanarm2":"friendlymanarm2.png",
    "friendlymouth":"friendlymouth.png",
    "marco2.0_back":"marco2.0_back.png",
    "marco2.0_handwithmap":"marco2.0_handwithmap.png",
    "thumbsup1":"thumbsup1.png",
    "thumbsup2":"thumbsup2.png",
    "thumbsup3":"thumbsup3.png",
    "thumbsup4":"thumbsup4.png",
    "thumbsup5":"thumbsup5.png",
    "thumbsup6":"thumbsup6.png",
    "canada_map":"canada_map.png",
    "marco2_arm1":"marco2.0_arm1.png",
    "marco2_arm2":"marco2.0_arm2.png",
    "marco2_body_without_bag":"marco2.0_body_without_bag.png",
    "marco2_hand":"marco2.0_hand.png",
    "marco2_hand_shush":"marco2.0_hand_shush.png",
    "marco2_head_shush":"marco2.0_head_shush.png",
    "marco2_head_wow":"marco2.0_head_wow.png",
    "canadian":"canadian.png",
    "canadian_hand":"canadian_hand.png",
    "marco2.0_head_uh": "marco2.0_head_uh.png",
    "marco2.0_head_yeah": "marco2.0_head_yeah.png",
    "thinkwithgoogle": "thinktravelgoogle.png",
    "dialog": "dialog.png",
      // scene 13
    "emojismile":"emojismile.svg",
    "visa":"visa.svg",
    "pos":"pos.svg",
    "emojicry":"emojicry.svg",
    "coin":"coin.svg",
    "button_replay": "button_replay.png",
    "button_replay_hover": "button_replay_hover.png",
    "button_replay_press": "button_replay_press.png",
    "button_fullreport": "button_fullreport.png",
    "button_fullreport_hover": "button_fullreport_hover.png",
    "button_fullreport_press": "button_fullreport_press.png",
    "button_infograph": "button_infograph.png",
    "button_infograph_hover": "button_infograph_hover.png",
    "button_infograph_press": "button_infograph_press.png",
    "qrcode": "qrcode.png"
  };

//if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene0.js',//loading
        res: ["map", "italy-building"] //depend resources.
      },
      {
        fileName: 'scene1.js',
        res: ["marco_left_arm1", "marco_left_arm2", "marco_body", "marco_left_hand", "marco_head", "marco_leg"/*, "marco_right_arm1", "marco_right_arm2", "marco_right_hand"*/,
              "tree", "trees_twolines", "grass", "bg-mountain", "bg-castle", "bg-building", "bg-greatwall", "bg-hut", "bg-huts", "bg-sand", "bg-temple", "book"]
      },
      {
        fileName:'scene2.js',
        res: ["china", "plane", "plane-withmarco", "plane-withoutmarco", "marco2-body", "marco2-hand-left",  "marco2-hand-right", "marco2-head", "marco2-leg", "paperpeople1","paperpeople2", "paperpeople3"]
      },
      {
        fileName:'scene3.js',
        res: ['mobile_png','marco2-body', 'marco2-hand-left', 'marco2-hand-right', 'marco2-head', 'marco2-leg', 'mobile_portrait', 'manonchair_marco', 'hand_holdingmobile_svg', 'video1_png']
      },
      {
        fileName: 'scene4.js',
        res: [
            "hand_tap",
            "hand_holdingmobile_thumb_svg",
            "hand_holdingmobile_palm_svg",
            "mobile", "ui_search",
            "chair",
            "hand_holdingmobile_thumb",
            "video1",
            "check",
            "manonchair_arm_1",
            "manonchair_arm_2",
            "manonchair_arm_3",
            "manonchair_arm_4",
            "manonchair_body_1",
            "manonchair_body_2",
            "manonchair_body_3",
            "manonchair_body_4",
            "manonchair_head",
            "ui_youtube_appbar",
            "ui_youtube_list"
        ]
      },
      {
        fileName: 'scene5.js',
        res: ['video4','video5','video6','video1_nobutton','video2','video3']
      },
      {
        fileName:'scene6.js',
        res: ["mobile","video1","video2","video3","video4","video5","video6","video1_nobutton","text_silkroad",
            "marco2-body","marco2-hand-left","marco2-hand-right","marco2-head","marco2-leg"]
      },
      {
        fileName:'scene7.js',
        res: ["mobile","video1","terra1","dunhuang_full","dunhuang_zoom",
            "s7-google-search-bar-01_withmagnifier","s7-fat-hand-01","s7-badge-tcwarrior",
            "s7-badge-dunhuang","s7-mp-badge-01","s7-mpolo-shadow",
            "marco2-body","marco2-hand-left","marco2-hand-right","marco2-head","marco2-leg"]
      },
      {
        fileName:'scene8.js',
        res: ["dunhuang_zoom", "guy_arm", "s8-phone-frame-01", "guy_armless", "guy_armless_dark", "s8-welcome-board-01",
              'marco2-body', 'marco2-hand-left', 'marco2-hand-right', 'marco2-head', 'marco2-leg', "marco2-hand-left2"]
      },
      {
          fileName:'scene9.js',
          res: [
              "building1",
              "building2",
              "building3",
              "building4",
              "building5",
              "building6",
              "building7",
              "building8",
              "building9",
              "building10",
              "building11",
              "building12",
              "building13",
              "building14",
              "building15",
              "s0-earth"
          ]
      },
      {
          fileName:'scene10.js',
          res: [
              "coupleonsofa",
              "coupleonsofa_manarm1",
              "coupleonsofa_manarm2",
              "coupleonsofa_womanarm1",
              "coupleonsofa_womanarm2",
              "coupleonsofa_manhead",
              "coupleonsofa_womanhead",
              "mobile_back",
              "newspaper_hand"
          ]
      },
      {
        fileName:'scene11.js',
        res: ["worriedmarco2.0_arm1", "worriedmarco2.0_arm2", "worriedmarco2.0_body", "worriedmarco2.0_hand", "worriedmarco2.0_head",
              "worry1", "worry1_text", "worry2", "worry2_text", "worry3", "worry3_text", "worry4", "worry4_text"]
      },
      {
          fileName:'scene12.js',
          res: [
          "building",
          "cloud",
          "friendlychinese",
          "friendlymanarm1",
          "friendlymanarm2",
          "friendlymouth",
          "marco2.0_back",
          "marco2.0_handwithmap",
          "thumbsup1",
          "thumbsup2",
          "thumbsup3",
          "thumbsup4",
          "thumbsup5",
          "thumbsup6"
          ]
      },
      {
          fileName:'scene13.js',
          res: ["emojismile","visa","pos","emojicry","coin"]
      },
      {
          fileName: 'scene14.js',
          res: ["canada_map","marco2_arm1","marco2_arm2",
          "marco2_body_without_bag","marco2_hand","marco2_hand_shush",
          "marco2_head_shush"]
      },
      {
          fileName: 'scene15.js',
          res: ["canada_map","canadian","canadian_hand","marco2_head_wow"]
      },
      {
        fileName:'scene16.js',
        res: ["toilet", "marco2_arm1","marco2_arm2",
          "marco2_body_without_bag","marco2_hand", "marco2.0_head_uh",
          "mobile", "dialog"]
      },
      {
        fileName: 'scene17.js',
        res: ["marco2.0_head_yeah", "marco2_arm1","marco2_arm2",
          "marco2_body_without_bag","marco2_hand", "qrcode",
          "thinkwithgoogle", "button_replay", "button_replay_press", "button_replay_hover", "button_infograph",
          "button_fullreport", "button_infograph_hover", "button_infograph_press", "button_fullreport_hover", "button_fullreport_press"]
      }
    ]
    // baseUrl = 'http://gtravel.b0.upaiyun.com/scene/';
    baseUrl = 'scene/';
    // resourceUrl = "http://gtravel.b0.upaiyun.com/resource/";
    resourceUrl = "resource/";
  //}

  $(function () {
	  var config = {
      baseUrl:baseUrl,// root url
      resourceUrl: resourceUrl,// resource url like jpg/mp3
      resource: resource,//resource
      maxQueueLength: 17,//TODO load serval scenes at first time.
      sceneQueue: sceneQueue,//anime scene queue
      autoPlay: true, //auto play with no event
      autoBtnTemplate: '<div class="start-btn btn J_StartBtn"></div>', //start button dom
      /*
      flipType: 'click', //flip type eg:click, swipe, wheel
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn"></div>',//prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn"></div>',//next button dom
      startBtnTemplate: '<div class="start-btn btn J_StartBtn"></div>', //start button dom
      autoBtnTemplate: '<div class="btn auto-btn">Auto Play</div>',
      */      
      subtitleTemplate: '<div class="subtitle-ctn"><span class="subtitle"></span></div>', // Subtitle box.
      
      muteBtnTemplate: '<div class="mute-btn btn" value="Mute"></div>',
      // testMode: 'single',
      // testScene: 3,
      // TODO: Define the abstract functions outside of config
      bgmRes: 'vo',
      showLoading: function (){
        $(".mask").show();
        console.log("loading resource, show loading message.");
      },
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide loading message.")
      },
      showFirstLoading: function() {
        console.log("loading first several scenes, show opening animation.");
      },
      hideFirstLoading: function (){
        console.log("First batch of scencs loaded, hide opening animations.")
      },
      showError: function (msg){ console.log(msg); }
    };

    if(anole.isMobile()) {
      config.flipType = 'swipe';
      // config.autoPlay = false;
    }
    anole.config(config);
    anole.start();

    var canvas_w = 1024;  // default: 1024
    var canvas_h = 768; // default: 768
    anole.setCanvasW(canvas_w);
    anole.setCanvasH(canvas_h);
    
    var container = anole.getContainer();
    
    var window_w = document.body.clientWidth;
    var window_h = document.body.clientHeight;
    var ratio = window_w / window_h;
    var s_scale = ratio / 1.33;

   
    

    // Virtual size beofre scaling.
 
    // Real size after scaling.
    var canvas_real_w;  // default: 1024
    var canvas_real_h; // default: 768
    
    

    //var loading = $('.mask');
    //loading.appendTo(container);   

    // var container_w;
    // var container_h;
    
   var ratio = 0.75; // Width/Height ratio
   var scale = 1;
   var font_size = window_w /30 * 1.1;

    if (window_h / window_w < ratio) {
      canvas_real_h = window_h;
      canvas_real_w = window_h / ratio;
      scale = canvas_real_h / canvas_h + "";
      font_size = window_h / 22.5 * 1.1;
    } else {
      canvas_real_w = window_w;
      canvas_real_h = window_w * ratio;
      scale = canvas_real_w / canvas_w + "";
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
    // var scale = container.data('scale');
    
    if (anole.isMobile()) {
      // container.css(transformProperty,"translate3d(-50%, -50%, 0)");
      // $('.subtitle-ctn').css('bottom', '14%');
      $('.subtitle').css('fontSize', font_size * 1.4);
      $('.subtitle-ctn').css('height', font_size* 2.8);
    } else {
      $('.subtitle').css('fontSize', font_size);
    $('.subtitle-ctn').css('height', font_size*2);
    }
    
    /*
    if (anole.isMobile()) {
      // $('meta[name=viewport]').attr('content','user-scalable=no, width=device-width'+',initial-scale='+scale*5/4);
      // container.css(transformProperty,"translate3d(-50%, -50%, 0)");
      // $('.subtitle-ctn').css('bottom', '14%');
      //$('.subtitle').css(transformProperty, 'scale('+scale*1.2+')');     
    } else {
      // container.css(transformProperty,"translate3d(-50%, -50%, 0) scale("+scale+")");
      //$('.subtitle').css(transformProperty, 'scale('+scale+')');
    } */
  })
});
