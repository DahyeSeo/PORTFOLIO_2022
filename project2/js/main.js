$(function(){
	AOS.init({
		easing: "ease-in-out-sine",
		duration:800,
		once: true
	});
	var $swiper = $(".swiper-container");
	var $bottomSlide = null;
	var $bottomSlideContent = null;
	var mySwiper = new Swiper(".swiper-container", {
		spaceBetween: 0,
		slidesPerView: 1,
		roundLengths: true,
		loop: true,
		loopAdditionalSlides: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints : {
			900: {
				slidesPerView: 3,
				centeredSlides: true,
			},
		}
	});
	$("#header .menu a.tab").click(
		function(e){
			if($("#header").hasClass("active") == false){
				e.preventDefault();
				$("#header").addClass("active");
				$("body").addClass("fixed");
			}
			else{
				e.preventDefault();
				$("#header").removeClass("active");
				$("body").removeClass("fixed");
			}	
		}
	);
	$(".dim").click(
		function(){
			$("#header").removeClass("active");
			$("body").removeClass("fixed");
		}
	);
	$(window).resize(function(){
		w=$(window).width();

		if(w >= 940){
			if($("#header").hasClass("active")){
				$(".dim").trigger("click");
			}
		}
	});
	$("#mo_gnb li").click(function(e){
		e.preventDefault();
		$(".dim").trigger("click");
	});
	
	var t=0;
	var n=0;
	var w;
	var winHalf; 
	var topPos=0;
	var categoryFlag=false;

	$("#pc_gnb li").eq(n).find("a").addClass("active");
	$("#mo_gnb li").eq(n).find("a").addClass("active");

	$(window).scroll(function(){
    	t=$(window).scrollTop();

		if(t < $("#page1").offset().top-winHalf){
			n=0;
		}
		else if(t < $("#page2").offset().top-winHalf){
			n=1;
		}
		else if(t < $("#page3").offset().top-winHalf){
			n=2;
		}
		else if(t < $("#page4").offset().top-winHalf){
			n=3;
		}
		else if(t < $("#page5").offset().top-winHalf){
			n=4;
		}
		else if(t < $("#page6").offset().top-winHalf){
			n=5;
		}
		else{
			n=6;
		}
		
		if(t > 100){
			$(".on_top").addClass("active");
			$(".menu").addClass("active");
		}
		else{
			$(".on_top").removeClass("active");
			$(".menu").removeClass("active");
		}

		$("#pc_gnb li a").removeClass("active");
		$("#pc_gnb li").eq(n).find("a").addClass("active");
		$("#mo_gnb li a").removeClass("active");
		$("#mo_gnb li").eq(n).find("a").addClass("active");


		if(categoryFlag){
			return;
		}
		else{
			$("#page"+n).addClass("active");

			if(n == 5){
			categoryFlag=true;
			}
		}
	});

	$(window).resize(function(){
		w=window.innerWidth;
		winHalf=$(window).height()/2;
	});
	$(window).trigger("resize");

	$("#pc_gnb li").click(function(e){
		e.preventDefault();
		topPos=$(this).find("a").attr("href");
		topPos=$(topPos).offset().top;
		$("html").animate({scrollTop:topPos}, 400);
	});
	$("#mo_gnb li").click(function(e){
		e.preventDefault();
		$(".dim").trigger("click");
		topPos=$(this).find("a").attr("href");
		topPos=$(topPos).offset().top;
		$("html").delay(400).animate({scrollTop:topPos}, 400);
	});	
	$(".on_top").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop:0}, 400);
	});
	$(window).resize(function(){
		w=window.innerWidth;
		winHalf=$(window).height()/2;

		if(w > 940){
			if($(".mobile").hasClass("active")){
				$(".dim").trigger("click");
			}
		}
		$(window).trigger("scroll");
	});
	$(window).trigger("resize");

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	$({ val : 0 }).animate({ val : 1200 }, {
		duration: 1500,
		step: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".place").text(num);
		},
		complete: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".place").text(num);
		}
	});
	$({ val : 0 }).animate({ val : 4638 }, {
		duration: 1500,
		step: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".people").text(num);
		},
		complete: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".people").text(num);
		}
	});
	$({ val : 0 }).animate({ val : 48 }, {
		duration: 1500,
		step: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".year").text(num);
		},
		complete: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$(".year").text(num);
		}
	});
});