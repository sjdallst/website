//Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46859810-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


//Navigation Menu, for Mobile
/*
$(function(){
	var pull		= $('#pull');
		menu        = $('nav');
		menuHeight	= menu.height();
		isPulled	= 0;

	$(pull).on('click', function(e){
		e.preventDefault();
		menu.slideToggle();
		isPulled = 1;
	});

	$('.nav-link').on('click', function(e){
		if(isPulled == 1){
			menu.slideToggle();
			isPulled = 0;
		}
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});
*/
(function(){
	function parallax(){
		var scrolled = $(window).scrollTop();
		$('#AboutPic').css('top', (scrolled * 0.2) + 'px');
		$('#ExtraSpace').css('top', (scrolled * 0.2) + 'px');
	}

	$(window).scroll(function(e){
		parallax();
	});
})();

(function () {
    function parallax() {
        var scrolled = $(window).scrollTop();
        $('#picture-slideshow').css('top', (scrolled * 0.4) + 'px');
        $('#rush_content_1').css('top', (scrolled * 0.2) + 'px');
    }

    $(window).scroll(function (e) {
        parallax();
    });
})();

$(document).ready(function () {
    $('.question_row_odd').click(function () {
        $(this).siblings().slideToggle("slow");
        $(this).find('i').toggleClass("fa-chevron-circle-down fa-chevron-circle-up");
    })
});

// JSSOR slider https://github.com/jssor/jquery-slider
jQuery(document).ready(function ($) {
    var jssor_slider1 = new $JssorSlider$("picture-slideshow", {
        $AutoPlay: true,
        $DragOrientation: 3
    });
});

