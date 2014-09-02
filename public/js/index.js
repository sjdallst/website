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

// DOM's api
function makeElt(e,t){var n=document.createElement(e);n.appendElt=function(e,t){return this.appendChild(makeElt(e,t))};if(t==undefined)return n;if(t.class!=undefined)n.className=t.class;if(t.text!=undefined)n.textContent=t.text;for(var r in t){n[r]=t[r]}return n}

$('#nl-form').submit( function (evt) {
    evt.preventDefault();
    $.post('/interest', $('#nl-form').serialize(), function (data) {
        $('#contact').animate({
            opacity: 0
        },500, function () {
            var div = makeElt('div',{                
                id:'contact',
                class:'page'
            })
            div.appendElt('h1',{
                class:'nl-form',
                text:'Thanks! We\'ll be in touch!',
                style:'position:absolute;top:30%;text-align:center;opacity:0;'
            })
            $('#contact').replaceWith(div)
            $('#contact').animate({
                opacity: 1
            },1000)
        })
    });
});


