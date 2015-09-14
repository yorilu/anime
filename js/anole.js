// Done:
// 1. the loadedScene index should be updated together with playScene when play scene-to-play.
// 2. fix the onStart without finish in timeline end issue.
// 3. for each scene: set a index for each scene to fix the multi-scene-load-order-can-be-wrong issue
// 4. for each scene: expose its timeline to make it easy to manage.
//
// TODO:
// 1. Add test tools for anole, features including: single scene run/debugging.
// 2. Easier way to manage resource, allow different path for different kind of resource.
// 3. Add resource management for font files.

;define(['zepto', 'hammer', 'TimelineLite'], function (zepto, Hammer) {
  /* user agent and device setting */
  var ua = navigator.userAgent;
  var device = {
  	os: {
  		isAndroid: ua.indexOf('Android') > 0,
  		isIOS: /iP(ad|hone|od)/.test(ua)
  	},
  	browser: {
  		QQ: ua.indexOf('MQQBrowser') > 0,
  		UC: ua.indexOf('UCBrowser') > 0,
  		MIUI: ua.indexOf('MiuiBrowser') > 0,
  		WeiXin: ua.indexOf('MicroMessage') > 0,
  		Chrome: !!window.chrome,
  		Opera: /opera.([\d.]+)/i.test(ua),
  		Safari: /version\/([\d.]+)/i.test(ua),
  		FireFox: /firefox\/([\d.]+)/i.test(ua),
  		IE: /msie ([\d.]+)/i.test(ua)
  	}
  };

  /* Define Class Anole */
  function Anole() {
  	var _container  = null;
  	/* Buttons */
  	var _startBtn = null;
  	var _prevBtn = null;
  	var _nextBtn = null;
  	var _autoBtn = null;
  	var _muteBtn = null;
  	var _subtitle = null;


  	var _loadFirstFinish = false;
	  // TODO: Getter / Setter
	  var _loadedSceneScript = 0;
	  // var _playedScene = 0;

    // Resource Cache.
    var _resourceLoaded = {};
	  var _videoList = $('<div id="anoleVideo">');
	  var _audioList = {}; // Array of all registered audio objets.

    // TODO: Static values??
	  var _sceneH = 768;  // Default height pixel.
	  var _sceneW = 1024;  // Default width pixel.
	  var _canvasH = 768; // Default canvas height in pixel.
	  var _canvasW = 1024; // Default canvas width in pixel.


    // Throttled methods for event handler.
    var _playPrevThrottled = Anole.throttle(this.playPrev.bind(this), 500);
	  var _playNextThrottled = Anole.throttle(this.playNext.bind(this), 500);
	  var _startAnimeThrottled = Anole.throttle(_startAnime.bind(this), 500);

    var _config = {};


		// var _scriptBit = 5 ; // default value
		var _resourceBit = 5 ; // default value
	  /* Private Methods */
	  function _init() { // Initiated essential elements and properties.
		  this.removeCanvas();
		  if (_config.containerTemplate) {
		    _container = $(_config.containerTemplate);
		    $('body').append(_container);
		  } else {
        _container = $('.container');
		  }
		  this.canvas = _container.find('.canvas');
	    // Use a div in document to cache all video elements.
	    // So they can be loaded asynchronously using native features of html5 video.
	    _videoList.css({
	    	position: 'absolute',
	      left: -10000 // Make the video div invisible.
	    });
	    $("body").append(_videoList);
	    // Use throttle to prevent the same event handler being called many times
	    // when several click or scrolling events are fired at the same time.

	    /* Define universal control buttons */
	    var muteBtn = (!device.os.isIOS) && ( _config.muteBtnTemplate ||
	      '<div class="mute-btn btn J_MuteBtn" value="MuteMusic"></div>');
	    // Show no mute button on iOS
	    this.muteBtn = _muteBtn = $(muteBtn);
	    _muteBtn.on('click', this.toggleMuteAll.bind(this));
	    _muteBtn.appendTo($('body'));

	    if ($(_config.startBtnTemplate)) {
	      _startBtn =  $(_config.startBtnTemplate);
	      // else leave the button null.
	      $('body').append(_startBtn);
	      _startBtn.hide();
	      _startBtn.on('click', _startAnimeThrottled);
      }
		  if (_config.autoBtnTemplate && (device.os.isIOS) && (device.browser.Safari)) { // only add autoplay button to safari on iOS.
		  	_autoBtn = $(_config.autoBtnTemplate);
		  	_autoBtn.appendTo('body');
		  	_autoBtn.hide();
		  	_config.autoPlay = false;
		    _autoBtn.on('click', function() {
		  	  _config.flipType = 'auto';
		  	  _config.autoPlay = true;
		  	  _startAnimeThrottled();
		  	  if (_prevBtn) {
		  		  _prevBtn.hide();
		  	  }
		  	  if (_nextBtn) {
		  		  _nextBtn.hide();
		  	  }
		    }.bind(this));
		  }

      if (_config.subtitleTemplate) {
		   // _subtitle = $(_config.subtitleTemplate).appendTo(_container);
		    _subtitle = $(_config.subtitleTemplate).appendTo('body');

		    _subtitle.hide();
		  }

		  if (_config.flipType == 'click') {
		  	_prevBtn = $(_config.prevBtnTemplate);
		  	_nextBtn =  $(_config.nextBtnTemplate);
		  	$('body').append(_prevBtn).append(_nextBtn);
				// Disable prev & next before playing.
				_prevBtn.addClass('disabled');
				_nextBtn.addClass('disabled');
				_prevBtn.on('click', _playPrevThrottled);
				_nextBtn.on('click', _playNextThrottled);
			} else if (_config.flipType == 'swipe') {
				var hammer = new Hammer(_container[0]);
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
				hammer.on('swipe', function(ev) {
					var d = ev.offsetDirection;
					if (d == 2 || d == 8){
						_playPrevThrottled();
					} else {
						_playNextThrottled();
					}
				}.bind(this));
			} else if (_config.flipType == 'wheel') {
				$(document).bind('mousewheel DOMMouseScroll', function(event) {
					event.preventDefault();
					var delta;
					delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
					if (delta < 0) {
						_playNextThrottled();
					} else {
						_playPrevThrottled();
					}
				}.bind(this));
			}

			if (_config.bgmRes) {
				this.bgmRes = _config.bgmRes;
				_loadOneResource.call(this, this.bgmRes, function() {
					this.bgm = this.getAudio(this.bgmRes);
				}.bind(this));
			}

			this.sceneNumber = _config.sceneQueue.length;
	    // if maxQueueLength = i, we will have scene[1...i] at one time
	    //
		  if (_config.maxQueueLength > this.sceneNumber) {
		  	_config.maxQueueLength = this.sceneNumber;
		  }
		  // How much laoding one script counts.
		  _scriptBit = (1 / _config.maxQueueLength) * 100;
		  var totalResource = 0;
		  for (var i = _config.maxQueueLength - 1; i >= 0; i--) {
         totalResource += (_config.sceneQueue[i].res.length + 1);
		  };
		  _resourceBit = (1 / totalResource) * 100;

		  // Call showLoading at the beginning of loading.
		  // this.showFirstLoading();

		  if (_config.testScene) {
		  	// if (_config.testMode == 'single') {
  			// _config.autoPlay = true;
            _config.maxQueueLength = _config.testScene + 1;
      
		  	//}

		  }
		  _loadScene.call(this, 0);
	  };

    function _startAnime() {
	    _startBtn && _startBtn.hide();
	    _autoBtn && _autoBtn.hide();
	    // Never call playScene directly.
	    // Because that scene may not be added yet!
	    // this.playScene(0);
	    this.playNext();
    };
    
		function _loadScene(sceneIndex) {
			console.log("loadScene, index: " + sceneIndex +
				" sceneQueueLength: " + this.sceneNumber);
			if (sceneIndex > this.sceneNumber - 1) {
				return;
			}

			var nextScene = _config.sceneQueue[sceneIndex];
			var fileName = nextScene.fileName;
			var res = nextScene.res || [];

			if (typeof this.sceneNameIndexMap[fileName] != 'undefined'){
				return;
			}

			this.sceneNameIndexMap[fileName] = sceneIndex;

			if (this.currentScene == sceneIndex){
			  // Call showLoading at the beginning of loading.
			  this.showLoading();
			}

		  //TODO load resource and scene at the same time;
		  _loadResource.call(this, res, function() {
		  	var url = _config.baseUrl + fileName;
		  	_getScript.call(this, url, sceneIndex);
		  }.bind(this));

	  };

		function _loadResource(res, callback) {
		  // var resourceBit = _scriptBit / (res.length + 1); //count script as one resource
			if (!res.length) {
			// console.log("loadResource: run callback when res.length is 0");
			  callback && callback();
			  return;
		  };
      
		  function loadNext(){
			  _loadOneResource.call(this, res.pop(), function () {
			  	this.loadingProgress += _resourceBit;
					if (!res.length){
						callback && callback();
					} else {
						loadNext.bind(this)();
					}
			  }.bind(this));
			}
			loadNext.bind(this)();
		};

		function _loadOneResource(res, callback) {
			console.log('_loadOneResource: ' + res);
			if (_resourceLoaded[res]){
				callback && callback();
				return;
			}
			var src = _config.resourceUrl + _config.resource[res];
			var error = function () {
				this.showError("Error loading " + src);
				callback && callback(); // Load the next, WHATAVER!
			};

			if (/\.mp3|\.wav|\.ogg|\.music$/.test(src)) {
				//console.log(this);
				//console.log(this.transfer2Media);
				src = this.transfer2Media(src);
				var audio = new Audio(src);
				audio.src = src;
				audio.controls = false;
				audio.preload = true;
				audio.load();
				_resourceLoaded[res] = true;
				$(audio).on("canplay", function() {
					_audioList[res] = audio;
					callback && callback();
					$(this).unbind();
				}).on("error", function() {
					$(this).unbind();
					callback && callback();
				});
			} else if (/\.video$/.test(src)){
				if (_videoList.find("#" + res)[0]) {
					return ;
				}
				var mp4Src = src.replace(".video",".mp4");
				var webmSrc = src.replace(".video",".webm");
				var html = '<video preload="load" webkit-playsinline="" id="' + res + '" width="800" height="374">' +
				'<source src="' + mp4Src + '" type="video/mp4" />' +
				'<source src="' + webmSrc + '" type="video/webm" />' +
				'</video>';
				var $html = $(html);
				_videoList.append($html);
				callback && callback();
			} else {
				var obj;
				obj = document.createElement("img");
				obj.src = src;

				var load = function() {
					_resourceLoaded[res] = true;
					callback && callback();
					$(obj).off("load", load);
					$(obj).off("error", error);
				};
				$(obj).on("load", load.bind(this));
				$(obj).on("error", error.bind(this));
			}
		};
		// Script is load when all resources on this scene is being loaded. (async)
		function _getScript(src, sceneIndex, callback) {
			var script = document.createElement('script');
			script.async = "async";
			script.src = src;
			script.onload = function() {
				var thisSrc = src;

				//for debug
				/* if (callback) {
					callback();
					return;
				} */
				console.log("GetScript onload. sceneIndex: " + sceneIndex + ". src: " + thisSrc);
				_loadedSceneScript++;
        if (!_loadFirstFinish) {
        	this.loadingProgress += _resourceBit;
        } 
				if (typeof _config.maxQueueLength === 'undefined' || _config.maxQueueLength === 0) {
					this.hideFirstLoading();
				} else {
					if (_loadedSceneScript <= this.currentScene + _config.maxQueueLength) {
						_loadScene.call(this, _loadedSceneScript);
					} else if(!_loadFirstFinish) {
						// TODO: fire a 'ready' event
						_loadFirstFinish = true;
						if (_startBtn) {
							_startBtn.show();
						}
						if (_autoBtn) {
							_autoBtn.show();
						}
					}
				}
		  }.bind(this);
		  //Load scripts to the bottom of body.
		  document.body.appendChild(script);
		};

		/* Privileged Methods */

		this.start = function() {
		  (_init.bind(this))();
	    };
    this.getContainer = function() {
  	  return _container;
    };
    this.setContainerWidth = function(width) {
      _container.css('width', width);
    };
    this.setContainerHeight = function(height) {
      _container.css('height', height);
    };
		this.getConfig = function(key) {
		  return _config[key];
		};
		this.setConfig = function(key, value) {
		  _config[key] = value;
		};
		// TODO: Use get/setConfig for the following:
		this.getBaseUrl = function() {
			return _config.baseUrl;
		};
		this.getResourceUrl = function() {
			return _config.resourceUrl;
		};
		this.getSceneQueueLength = function() {
			return _config.sceneQueue.length;
		};
		this.setSceneW = function(width) {
			if ( width !== undefined && width >= 0)  {
				_sceneW = width;
			}
		};
		this.setSceneH = function(height) {
			if ( height !== undefined && height >= 0)  {
				_sceneH = height;
			}
		};
		this.setCanvasW = function(width) {
			if ( width !== undefined && width >= 0)  {
				_canvasW = width;
			}
		};
		this.setCanvasH = function(height) {
			if ( height !== undefined && height >= 0)  {
				_canvasH = height;
			}
		};
		this.getSceneW = function() {
			return _sceneW;
		};
		this.getSceneH = function() {
			return _sceneH;
		};
		this.getCanvasW = function() {
			return _canvasW;
		};
		this.getCanvasH = function() {
			return _canvasH;
		};
    this.setBackgroundColor = function(color) {
			// this.canvas.css('background-color', color);
			// _container.css('background-color', color);
			$('body').css('background-color', color);
		}
		this.setSubtitle = function(text) {
			_subtitle.find('.subtitle').text(text);
			_subtitle.show();
		}
    this.getSubtitleCtn = function() {
    	return _subtitle;
    }
		this.config = function (config) {
			$.each(config, function (k,v) {
				if ($.isFunction(v)) {
					this[k] = v;
					// TODO : use prototype
				} else {
					_config[k] = v;
				}
			}.bind(this));
		};
		this.playScene = function (index){
			this.currentScene = index;
			console.log("---- PlayScene: " + index);
			var scene = this.scene[index];
			if (!scene) return;
		  if (index === 0) {// the first scene.
		    _prevBtn && _prevBtn.addClass('disabled');
		  } else {
		    _prevBtn && _prevBtn.removeClass('disabled');
		  }
		  if (index == this.sceneNumber - 1) {// the last scene.
		    _nextBtn && _nextBtn.addClass('disabled');
		  } else {
		    _nextBtn && _nextBtn.removeClass('disabled');
		  }
			scene.onInit && scene.onInit();//init scene
		  if (_config.autoPlay){     //autoplay
		    scene.onStart && scene.onStart(function () {
		       // auto play next scene if config.autoPlay is true
		      console.log("Autoplay scene.onStart");
		      if (index < this.sceneNumber - 1) {// not the last scene.
			    this.playNext();
			  }
			}.bind(this));
		  } else {
		    scene.onStart && scene.onStart(function (){});
		  }

		  if (_loadFirstFinish) {
		  	var next = index + _config.maxQueueLength;
		  	if (next < this.sceneNumber)  {
		      _loadScene.call(this, index + _config.maxQueueLength);
		    }
		  } else {
		    _loadScene.call(this, index + 1);//load next scene when playing current scene
		  }
		};

		/* Media functions */

		this.getAudio = function(res) {
		  	var audio = _audioList[res];
		  	if (audio){
		  		return audio;
		  	}
		};
	  // Returns a pre-loaded video element containing multiple <source>.
	  // Inline-play feature enabled on iOS browser.
	  // Fully compatible with modern browsers.
	  this.getVideo = function(res) {
	  	var video = _videoList.find("#" + res);
	  	return video[0];
	  };
	  // When finishing using the video element
	  // Be sure to putbackVideo before deleting the dom so it can be resued.
	  this.putbackVideo = function(res, video) {
	  	if (_videoList.find("#" + res)[0]) {
	  		return;
	  	}
	  	_videoList.append(video);
	  };
  }; // End of function Anole()

  /* Public Properties */

  Anole.prototype.scene = {};  // Scene queue: mapping from scene index to scene.
  Anole.prototype.isMuted = false;
  Anole.prototype.muteBtn = null;
  Anole.prototype.loadingProgress = 0;
  Anole.prototype.canvas = null;
  Anole.prototype.currentScene = -1;
  Anole.prototype.nextSceneIndexToPlay = 0; // the scene should be played once loaded (added onto anole scene)
  Anole.prototype.sceneNameIndexMap = {}; // mapping from scene js name to its index in the scene queue to play.
  Anole.prototype.bgmRes = null;
  Anole.prototype.bgm = null;
  Anole.prototype.updateLoadingProgress = function () {
  	/* abstract */
  }
  Anole.prototype.testScene = function(index) {
    for(i=0; i < this.sceneNumber && i != index; i++) {
      var scene = this.scene[i];
      scene.skipped = true;
     }
    if (i == index) {
     	this.skipped = false;
     }
     this.start();
  }


  Anole.prototype.playNext = function() {
    // console.log("---- PLAY NEXT, index: " + this.currentScene + ". Now play next");
	  if (!this.scene[this.currentScene + 1]) { // If next scene is not ready yet.
	  	this.nextSceneIndexToPlay = this.currentScene + 1;
	  	//console.log("playNext failed: scene is not added yet: " + (this.currentScene + 1) +
	  	//   ". nextSceneIndexToPlay: " + this.nextSceneIndexToPlay);
	  	this.showLoading();
	  	return;
	  }
	  // console.log("playNext: scene is ready: " + (this.currentScene+1));
	  /* if (this.currentScene >= this.playedScene) { // Already played.
	    this.playedScene = this.currentScene + 1;
	  } */
	  this.triggerForward(this.currentScene);
	  // console.log("PlayNext => playScene" + (this.currentScene+1));
	  ++this.currentScene;
	  
	  // For debug
	  var testScene = this.getConfig('testScene');
    if (testScene ) {
      while (this.currentScene < testScene && this.currentScene < this.sceneNumber) { 
      	this.playScene(this.currentScene);
      	this.currentScene++;
      };
      return;
    }
	  this.playScene(this.currentScene);
	};

	Anole.prototype.playPrev = function() {
	  console.log("playPrev: " + this.currentScene);
	  if (!this.currentScene) {
	  	return;
	  }
	  this.triggerBack(this.currentScene);
	};
  Anole.prototype.removeCanvas = function() {
	  this.canvas && this.canvas.remove();
  };
  Anole.prototype.clearCanvas = function() {
	  this.canvas && this.canvas.empty();
  };
	Anole.prototype.triggerBack = function (index) {
		if (index === 0) return;
		var scene = this.scene[index];
		scene.onBack && scene.onBack(function () {
			this.playScene(--this.currentScene);
		}.bind(this));
	};
  Anole.prototype.triggerForward = function(index) {
  	if ( index < 0 || index >= this.sceneNumber - 1) return;
  	var scene = this.scene[index];
    // scene.onEnd && scene.onEnd(); // TODO: change all onEnd to onForward
    scene.onForward && scene.onForward();
  };

	Anole.prototype.addScene = function(scene) {
		var addedSceneIndex = this.sceneNameIndexMap[scene.name];
    //console.log("addScene: name: " + scene.name + " index: " + addedSceneIndex + " Next scene to play: " + this.nextSceneIndexToPlay);
		this.scene[addedSceneIndex] = scene;
   
		// For debug
		var testScene = this.getConfig('testScene');
    if (testScene && addedSceneIndex != testScene) {
      scene.skipped = true;
    }
    //


		if (this.nextSceneIndexToPlay == addedSceneIndex) {
			// if addedSceneIndex == 0, play loading animation
		  // console.log("addScene: play nextSceneToPlay: " + addedSceneIndex);
		  // be sure to put this before playscene, as playscene might playnext inside
		  this.nextSceneIndexToPlay = -1;
		  this.hideLoading();
		  // console.log("addScene => playScene todo" + (this.currentScene + 1));
		  // do {
		  //  this.triggerForward(this.currentScene++);
		  //  } while (this.currentScene!=addedSceneIndex);
		  // this.playScene(addedSceneIndex);
		  this.playNext();
		  return;
		}
	};



	/* Media functions (audio/video) */
	// Start playing a certain media (both audio & video supported).
	// If anole.isMuted is set to true no sound will be played.
	Anole.prototype.playMedia = function (media){
	  	if (this.isMuted){
	  		media.muted = true;
	  	}
	  	media.play();
	};
	// Mute all media.
	Anole.prototype.muteAll = function(){
	  	this.isMuted = true;
	  	var currentMusic = this.scene[_currenScene].music;
	  	currentMusic && (currentMusic.muted = true);
	  	this.bgm && (this.bgm.muted = true);
	};
	  // Toggle all media's mute settings.
	Anole.prototype.toggleMuteAll = function() {
	  	this.toggleMute(this.scene[this.currentScene].music);
	};
	// Toggle global mute setting.
	// If media is provided, toggle media's mute setting
	// and set this.muted the same with it.
	Anole.prototype.toggleMute = function (media) {
    if (this.bgm) {
	  	console.log('Before mute: '+this.bgm.muted);
	  	this.bgm.muted = !this.bgm.muted;
	  	console.log('After mute: '+this.bgm.muted);
	  }
  	if (!media) {
  		this.isMuted = !this.isMuted;
  	} else {
  		if (media.muted){
  			media.muted = this.isMuted = false;
  			this.bgm && (this.bgm.muted = false);
  		} else {
  			media.muted = this.isMuted = true;
  			this.bgm && (this.bgm.muted = true);
  		}
  	}
	  this.muteBtn.toggleClass('muted');
	};

	// Add corresponding extension to the music file name
	// according to user agent.
	Anole.prototype.transfer2Media = function(name) {
		if (/\.music$/.test(name)) {
			var db = device.browser;
			var type;
			if (db.Chrome || db.IE || db.Safari){
				type = ".mp3";
			} else {
				type = ".ogg";
			}
			return (name.replace(".music", type));
		} else {
			return name;
		}
	};
  Anole.prototype.isMobile = function() {
	  	if (/(iPhone|iPod|Android|ios|SymbianOS)/i.test(navigator.userAgent)){
	  		return true;
	  	} else {
	  		return false;
	  	}
  };

  /**
  * Abstract Methods
  * To be implemented by instance.
  */

  Anole.prototype.showFirstLoading = function () { // Triggered when waiting for the first several scenes to be ready.
     /* abstract */
  }; 
	Anole.prototype.hideFirstLoading = function () {/* abstract */};// Triggered when the animation is ready to play.
	Anole.prototype.showLoading = function () {/* abstract */}; // it will be triggered when loading the resource of current scene
  Anole.prototype.hideLoading = function () {/* abstract */};// it will be triggered when resource loaded finished
	Anole.prototype.showError = function () {/* abstract */}; // it will be triggered when resource error
  /* Static Methods */


  // attach b's key-value pairs to a as properties.
  Anole.mix = function (a,b){
  		$.each(b, function (k,v){
  			a[k]=v;
  		});
  };

	  // Allow action to be called only once in a duration of 'delay'
	Anole.throttle = function(action, delay) {
	  	var last = 0;
	  	return function(){
	  		var curr = +new Date();
	  		if (curr - last > delay){
	  			action.apply(this, arguments);
	  			last = curr;
	  		}
	  	};
	  };
  // Find an existing node or create one under 'parent' with 'style' style
	// if it's not existed yet.
	// Returns a jQuery object instead of a dom node.
	Anole.getOrCreate = function (query, tag, parent, style){
		var target;
		target = $(query);
		if (!target[0]) {
			if ($.isFunction(tag)) {
				target = tag();
				if (!$.isObject(target)) {
					target = $(target);
				}
			} else {
				target = $(tag);
			}
			if (parent) {
				$(parent).append(target);
			}
		}
		if (style) {
			target.css(style);
		}
		return target;
	};

  Anole.prototype.replay = function() {
  	if (this.canvas) {
  		var doms = this.canvas.children(); // leaves the scene0 for this is the base of scene1
  		for (var i = 2; i < doms.length; i++) {
  	      dom = doms[i];
  	      dom.remove();
     	}
    }
    if (this.bgm && (!this.bgm.ended)) {
    	this.bgm.ended = true;
    	this.bgm.currentTime = 0;
    }
    this.currentScene = 0;
    this.nextSceneIndexToPlay = 1; 
    this.playNext();
  }



  var anole = new Anole();

  /* Scene Class */

  function Scene(id, canvas, inherit) {
  	this.id = id;
  	this.name = 'scene' + id + '.js';
	  this.musicName = 'vo' + id; // default voiceover file name.
	  this.canvas = canvas;
	  this.inherit = inherit;
	  this.element;
	  this.container;
	  this.fadeOut = false; // Default: not fadeOut
	  // List of dom elements that will be reused by other scenes afterwards.
	  // Note it's DOM not jQ Objects.
	  // this.export = [];

	  // All animations are trained by this main timeline.
	  this.tl = new TimelineLite({paused:true});
	  // Music file is registered as a resource.
	  /*if (id > 0) {
	    this.music = anole.getAudio(this.musicName);
	  }*/
	  this.skipped = false;
	  this.animation = function () {
	    // abstract
	  }; // must be implemented by instances.
  } // End of Scene Class

	// Methods list.
	//
	// Public:

	Scene.prototype.onInit = function() {
	  // Must initialize the container everytime when entering the scene.
	  // TODO: reuse scene content.
	  this.element = $("<div id='scene" + this.id + "' class='scene'></div>");
	  this.container = $("<div class='scene-content'></div>");
	  // Empty current scene div.
	  var old = this.canvas.find('#scene' + this.id);
	  if (old) {
	  	old.remove();
	  }
		console.log(this.id);
		this.tl.clear();
	  // When inherit is set to true,
	  // Current scene is initialed based on last scene.
	  // Copy previous scene's dom to current scene if it's present.
	  if (this.inherit) {
	  	var prev = this.canvas.find('#scene' + (this.id-1));
	  	if (prev) {
	  		var prev_content =  prev.find('.scene-content');
	  		if (prev_content && prev_content[0]) {
	  			this.container = prev_content.clone();
	  			this.container.appendTo(this.element);
	  		} else {
	  			prev.children().clone().appendTo(this.container);
		      // this.container.appendTo(this.element);
			    this.container.appendTo(this.element);
		    }
		    prev.hide();
		  } else {
			  console.log("Warning: scene" + (this.id-1) + "deleted unexpetedly.");
		  }
	  } else {
		  this.container.appendTo(this.element);
	  }
		this.element.show(); // container could be hidden if coming from next scene.
	  if (this.canvas) { // If parent dom is provided, append content html to it.
			this.createDom();
			this.canvas.append(this.element);
		}
	};

	// Register and Play animations here.
	// There must be a callback to indicate the finishing of the scene.
	Scene.prototype.onStart = function(callback) {
		if (this.skipped === true) {
		  callback();
		  return;
		}
		
		this.tl.clear(); // clear all tweens and calls in timeline before adding animations to it.
		this.animation(); // Add animations to this.tl;

		var voDelay = 500;
		this.tl.call(function() {
			if (this.music && (!this.music.ended)) {
				$(this.music).on('ended', function(){
					setTimeout(callback, voDelay);
				});
			} else {
				callback();
			}
		}.bind(this));

		this.music && anole.playMedia(this.music);
		this.tl.play();
	};
	// When button NEXT clicked/swipe down/scroll down.
	Scene.prototype.onForward = function() {
		if (this.music) {
			this.music.pause();
			this.music.currentTime = 0;
		}
		this.tl && this.tl.progress(1);
		var fadeOutTime = 0.5;
		if (this.fadeOut) {
			var tl = new TimelineLite();
			tl.to(this.element, fadeOutTime, {opacity:0})
			.set(this.element, {display: 'none'});
		} else {
			this.element && this.element.hide();
		}
		this.cleanup && this.cleanup();
	};
	// When button PREV clicked/swipe up/scroll up.
	Scene.prototype.onBack = function(callback) {
		if (this.music) {
			this.music.pause();
			this.music.currentTime = 0;
		}
		// this.tl.progress(0);
		this.cleanup && this.cleanup();
		this.element && this.element.remove();
		callback && callback();
	};



	anole.$$ = Anole.getOrCreate;
	anole.Scene = Scene;
	return anole;
});
