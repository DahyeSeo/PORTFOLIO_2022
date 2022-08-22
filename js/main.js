$(function(){
	window.onload = function(){
		setTimeout(function(){
			scrollTo(0,0);
		}, 100);
	}

	$("#page2 ul li a").click(function(e){
		e.preventDefault();
	});
	
	let scrollT = 0;
	let pageN = 0;
	let targetY = 0;
	let transition = false;
	let winHalf;
	let categoryFlag = false;

	$(".loading").addClass("active");
	$("#header").addClass("active");
	$(".controller").addClass("active");
	$(".ver").addClass("active");
	
	$("body").addClass("fixed");
	
	setTimeout(function(){
		$("body").removeClass("fixed");
	}, 3300);

	$(".floating_menu .text ul li").eq(pageN).addClass("on");
	$(".controller ul li").eq(pageN).addClass("active");
	$("#header .menu .global nav ul li").eq(pageN).addClass("active");

	$(".tab").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active")){
			$("body").removeClass("fixed");
			$(this).removeClass("active");
			$(".floating_menu").removeClass("active");
		}
		else{
			$("body").addClass("fixed");
			$(window).off('wheel');
			$(this).addClass("active");
			$(".floating_menu").addClass("active");
			$(".container").off("mousewheel");
		}
	});

	$(window).scroll(function(){
		scrollT = $(window).scrollTop();
		winHalf=$(window).height()/2;
		
		if(scrollT <= $("#page1").offset().top - winHalf){
			pageN = 0;
		}
		else if(scrollT <= $("#page2").offset().top - winHalf){
			pageN = 1;
		}
		else if(scrollT <= $("#page3").offset().top - winHalf){
			pageN = 2;
		}
		else if(scrollT <= $("#page4").offset().top - winHalf){
			pageN = 3;

			if((scrollT + $(window).height()) == $(document).height()){
				pageN = 4;
			}
		}
		else{
			pageN = 4;
		}

		$(".floating_menu .text ul li").removeClass("on");
		$(".floating_menu .text ul li").eq(pageN).addClass("on");

		$("#header .menu .global nav ul li").removeClass("active");
		$("#header .menu .global nav ul li").eq(pageN).addClass("active");

		$(".controller ul li").removeClass("active");
		$(".controller ul li").eq(pageN).addClass("active");

		if(pageN == 0){
			$(".controller ul li").removeClass("color");
		}
		else{
			$(".controller ul li").addClass("color");
		}

		if(categoryFlag){
			return
		}
		else{
			if(pageN == 0){
				$("header").addClass("active");
			}
			else{
				$("#page"+pageN).addClass("active");
			}
		}

		if(scrollT < 400){
			$(window).off('wheel');

			if(scrollY > 0){
				$("#header .menu").addClass("on");
				$(".tab").addClass("on");
				document.getElementById("logo_img").src="images/logo_active.svg";
			}
			else{
				$("#header .menu").removeClass("on");
				$(".tab").removeClass("on");
				document.getElementById("logo_img").src="images/logo.svg";
			}
		}
		else{
			if($(".floating_menu").hasClass("active")){
				return
			}
			else{
				$(window).on("wheel", function(e){
					if(e.originalEvent.deltaY < 0){
						$("#header .menu").removeClass("up");
						$(".tab").removeClass("up");
					}
					else{
						$("#header .menu").addClass("up");
						$(".tab").addClass("up");
					}
				});
			}
		}
	});

	$(".controller ul li, #gnb ul li").click(function(e){
		e.preventDefault();
		pageN = $(this).index();

		if(pageN == 0){
			targetY = 0;
		}
		else{
			targetY = $("#page" + pageN).offset().top;
		}

		$("html").animate({"scrollTop":targetY}, 400);
	});
	$(".floating_menu .text li").click(function(e){
		e.preventDefault();
		pageN = $(this).index();

		if(pageN == 0){
			targetY = 0;
		}
		else{
			targetY = $("#page" + pageN).offset().top;
		}

		transition=true;
		$("body").removeClass("fixed");
		$(".tab").removeClass("active");
		$(".floating_menu").removeClass("active");
	});
	$(".floating_menu").on("transitionend", function(){
		if($(this).hasClass("active") == false && transition){
			transition = false;
			$("html").animate({"scrollTop":targetY}, 500);
		}
	});

	let videoUrl = ["video1", "video2", "video3"];
	let videoTotal = videoUrl.length - 1;
	let videoN = 0;
	let videoPath = "";
	let video = document.getElementById("my_video");
	video.muted = true;
	video.play();

	function videoDimmed(){
		$(".media video").hide().css({opacity : 0});

		setTimeout(function(){
			$(".media video").show().animate({opacity : 1}, 300);
		}, 100);
	}

	videoDimmed();

	video.addEventListener("ended", function(){
		if(videoN < videoTotal){
			videoN += 1;
		}
		else{
			videoN = 0;
		}
		
		video.pause();
		videoPath="video/" + videoUrl[videoN] + ".mp4";
		$("#my_video").attr({src:videoPath});
		video.play();
		videoDimmed();
	});

	$("#project1").addClass("active");
	$(".project .summary").click(
		function(e){
			let portY;
			e.preventDefault();
			$(".project").removeClass("active");
			$(this).parents(".project").addClass("active");

			portY = $(this).parents(".project").offset().top;
			$("html").animate({scrollTop : portY}, 800);
		}
	);

	function wheelUI(target){
		let maskH=$("#"+target+" .view").height();
		let img=$("#"+target+" .view img");
		let imgH=img.height();
		let able=imgH-maskH;
		let scrollAmount=parseInt(img.css("top"));

		$("#"+target).mousewheel(function(e, delta){
			if(delta > 0){
				if(scrollAmount > 0){
					scrollAmount-=12;
				}
				else{
					scrollAmount=0;
				}
			}
			else{
				if(scrollAmount < able){
					scrollAmount+=12;
				}
				else{
					scrollAmount=able;
				}
			}
			img.css({top:-1*scrollAmount});
			
			$(".container").mousewheel(function(e, delta){
				if(e.target.className === "dim"){
					return false;
				}
			});
		});
	}

	wheelUI("pc1");
	wheelUI("mo1");	
	wheelUI("pc2");
	wheelUI("mo2");	

	function mobileLink(){
		if(isMobile){
			$("#project1 .content .shortcut a").attr({href: "project1/mobile/index.html"});
			$("#project2 .content .shortcut a").attr({href: "project2/index.html"});
		}
		else{
			$("#project1 .content .shortcut a").attr({href: "project1/pc/index.html"});
			$("#project2 .content .shortcut a").attr({href: "project2/index.html"});
		}
	}

	mobileLink();
});