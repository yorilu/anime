;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(9, anole.canvas, true);
	scene.createDom = function() {
		this.marco = this.container.find('.marco-nomouth');
		this.money = $('<div></div>').addClass('money');
		this.money.appendTo(this.container);
		
		var random = function(start, end){
		    return Math.floor(Math.random() * (end - start) + start);
		};
		var genMoney = function(option,cls,prtNode){
			for(var i=0;i<option.length;i++){
				var opt=option[i];
				var l=opt.left-240;
				var t=opt.top+430;
				var n=opt.num;
				var moneyi = $('<div></div>').addClass(cls).css('left',l).css('top',t).css('z-index',zindex-i);
				for(var j=0;j<n;j++){
					$('<div></div>').appendTo(moneyi).addClass('bottom').css('top',20*j).css('left',-52).css('opacity',0.6);
				}
				moneyi.appendTo(prtNode);
			}
		};
		var genSatis = function(option,cls,prtNode){
			for(var i=0;i<option.length;i++){
				var opt=option[i];
				var l=opt.left;
				var t=opt.top;
				var satisi = $('<div></div>').addClass(cls).css('left',l).css('top',t);
				satisi.appendTo(prtNode);
			}
		};
		
		this.happyctn = $('<div></div>').addClass('happyctn').appendTo(this.container).css('opacity',0);
		this.happymoney = $('<div></div>').addClass('happymoney').appendTo(this.happyctn);
		this.happysatis = $('<div></div>').addClass('happysatis').appendTo(this.happyctn);
		this.happynum=$('<div>$3400</div>').addClass('money-num').addClass('happy-num').appendTo(this.happyctn);
		var zindex=608;
		var money_option=[{
			left:-150,top:750,num:8
		},{
			left:300,top:700,num:15
		},{
			left:650,top:650,num:8
		},{
			left:110,top:600,num:15
		},{
			left:40,top:480,num:8
		},{
			left:420,top:320,num:30
		}];
		genMoney(money_option,'flat-money',this.happymoney);
		
		var satis_option=[{
			left:-250,top:550
		},{
			left:260,top:500
		},{
			left:-100,top:400
		},{
			left:50,top:540
		},{
			left:145,top:300
		}];
		// satis_option=satis_option.concat(satis_option);
		// satis_option=satis_option.concat(satis_option);
		// var satis_option = [];
		for(var i=0;i<30;i++){
			var l=random(-250,250);
			var t=random(180,380);
			satis_option.push({left:l,top:t});
		}
		genSatis(satis_option,'happy',this.happysatis);

		this.sadctn = $('<div></div>').addClass('sadctn').appendTo(this.container).css('opacity',0);
		this.sadmoney = $('<div></div>').addClass('sadmoney').appendTo(this.sadctn);
		this.sadsatis = $('<div></div>').addClass('sadsatis').appendTo(this.sadctn);
		this.sadnum=$('<div>$1799</div>').addClass('money-num').addClass('sad-num').appendTo(this.sadctn);
		var money2_option=[{
			left:300,top:700,num:10
		},{
			left:650,top:650,num:5
		},{
			left:420,top:360,num:25
		},{
			left:200,top:520,num:5
		}];
		genMoney(money2_option,'flat-money',this.sadmoney);

		var satis2_option=[{
			left:100,top:440
		},{
			left:0,top:380
		},{
			left:50,top:460
		},{
			left:-50,top:300
		},{
			left:130,top:410
		},{
			left:250,top:320
		}];
		// var satis2_option = [];
		// for(var i=0;i<6;i++){
			// var l=random(-50,250);
			// var t=random(300,500);
			// satis2_option.push({left:l,top:t});
		// }
		genSatis(satis2_option,'sad',this.sadsatis);

	};
	
	scene.animation = function() {
		this.container.find('.shade').remove();
		var circle = this.container.find('.circle-ctn');
		var flat5=$(this.happymoney.find(".flat-money")[5]);
		var money = this.money;
		var money_scale=0.27;
		var satis_scale=0.36;
		var stagUp = function(){
			var t=flat5.css("top");
			t=t.replace("px","");
			flat5.css("top",t-10);
		};
		this.tl.addLabel('begin')
			.set(this.happynum,{opacity:0})
			.set(this.sadnum,{opacity:0})
			.set(this.happysatis.find(".happy"),{opacity:0})
			.set(this.sadsatis.find(".sad"),{opacity:0})
			.set(this.money, {scale:1.5})  //TODO: remove this and resize money svg.
			.set(this.container.find('.marco-shadow'), {background:'transparent'})
			.to([this.marco, circle], 0.1, {opacity:0, ease:Power2.easeOut}, 'begin')
			.call(function() {circle.remove()})
			.to(this.money, 0.4, {opacity:1, ease:Power2.easeIn}, 'begin-=0.2')
			.to(this.money, 0.4, {height: '+=180', width: '+=180'}, 'begin+=0.2')
			.to(this.money, 0.4, {backgroundSize: '234px 99px'}, 'begin+=0.5')
			.to(this.money, 0.3, {skewX:-35, scale:0.85, delay:0.1})
			.to(this.money, 0.2, {scale:0.3,x:"+=54",y:"+=50"})
			
			.addLabel("happymoney")
			.set(this.happymoney, {scale:money_scale, opacity:1})
			.set(flat5, {opacity:1})
			.to(this.money,0.02, {opacity:0},'happymoney')
			.set(flat5, {y:"+=300"})
			.staggerFromTo(flat5.find(".bottom"), 0.04, {opacity:0}, {opacity:0.6,ease:Power4.easeIn,onComplete:stagUp},0.04,'happymoney')
			.to(this.happymoney.find(".flat-money"),0.1,{opacity:1,ease:Power4.easeIn})
			
			.addLabel("happysatis","+=1.6")
			.staggerFromTo(this.happysatis.find(".happy"), 0.4, {scale:0, opacity:(480-this.top)/300,y:"-=100"}, {scale:satis_scale, opacity:1,y:"-=100"}, 0.2,'happysatis')
			.staggerFromTo(this.happysatis.find(".happy"), 0.4, {opacity:1}, {opacity:0,y:"-=100"}, 0.2,'happysatis+=0.35')
			.to(this.happynum, 0.8, {opacity:1},'happysatis+=2.8')
			
			.addLabel("sadmoney","happysatis+=3")
			.set(this.sadmoney,{scale:money_scale, opacity:1},'sadmoney')
			.to(this.sadmoney.find(".flat-money"), 0.1,{opacity:1},'sadmoney')
			
			.to(this.sadctn, 0.4, {left:"40%", ease:Elastic.easeIn},'sadmoney')
			.to(this.sadctn, 0.2, {left:"45%", ease:Elastic.easeIn},'sadmoney+=0.4')
			.to(this.happyctn, 0.2, {left:"5%"},'sadmoney+=0.5')
			
			.addLabel("sadsatis","sadmoney+=1")
			.staggerFromTo(this.sadsatis.find(".sad"), 0.8, {scale:0, opacity:0, y:"-=100"}, {scale:satis_scale, opacity:1,y:"-=100"}, 0.4,'sadsatis')
			.staggerFromTo(this.sadsatis.find(".sad"), 0.8, {opacity:1}, {opacity:0,y:"-=100"}, 0.4,'sadsatis+=0.75')
			.to(this.sadnum,0.8, {opacity:1},'sadsatis+=1')
			
			;
	};
	
	scene.cleanup = function() { // Called before entering next scene.
		this.container.find(".happyctn").remove();
		this.container.find(".sadctn").remove();
	};
	
	anole.addScene(scene);
})
