//Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-46859810-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function () {
    function parallax() {
        var scrolled = $(window).scrollTop();
		$('#AboutPic').css('top', (scrolled * 0.2) + 'px');
		$('#ExtraSpace').css('top', (scrolled * 0.2) + 'px');
        $('#picture-slideshow').css('top', (scrolled * 0.4) + 'px');
        $('#rush_content_1').css('top', (scrolled * 0.2) + 'px');
        $('#shadow').css('opacity', ((scrolled/300)*1));
    }
    $(window).scroll(function (e) {
        parallax();
    });
})();

$(document).ready(function () {
    $('.question_row_odd,.question_row_even').click(function () {
        $(this).siblings().slideToggle("slow");
        $(this).find('i').toggleClass("fa-chevron-circle-down fa-chevron-circle-up");
    })
});

// JSSOR slider https://github.com/jssor/jquery-slider
jQuery(document).ready(function ($) {
    $('.slider').sss({
        slideShow : true, 
        speed : 3500, // Slideshow speed in milliseconds.
        showNav : false // Set to false to hide navigation arrows.
    });
});

$('#nl-form').submit( function (evt) {
    evt.preventDefault();
    $.post('/interest', $('#nl-form').serialize(), function (data) {
    });
});


