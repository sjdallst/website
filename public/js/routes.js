page.base();
page('/',function(ctx) {
		if(ctx.init){
				$('.page').hide();
				$('#home').show();
				$('#home').css('opacity',1);
				updateTweets();
		}
		else showPage('home');
});
page('/:section', function (ctx) {
		var section = ctx.params.section.toLowerCase();
		if(ctx.init){
				$('.page').hide();
				$('#'+section).show();
				$('#'+section).css('opacity',1);  
		} 
		else showPage(section);
});
page();

$('.nav-link').click(function (evt) {
		var section = evt.target.textContent.toLowerCase();
		if (section == 'apply') {
			window.location.href = 'application.html'
			return
		}
		showPage(section.toLowerCase());
		if (section == 'home') {
			section = ''; 
		}
			
		window.history.pushState(section,section,'/'+section);
		$('.nav-link').removeClass('nav-link-selected');
		$(this).addClass('nav-link-selected');
});

function showPage(section) {
		$('.page').stop().animate({opacity:0},500, function() {
				window.scrollTo(0,0);
				$('.page').hide();
				$('#'+section).show();
				$('#'+section).stop().animate({opacity:1},500, function() {
					if(section == 'about') {
						typeIt();
						console.log("meow");

					}
				});
		});
}


var $el = $('.writer'),
    txt = $el.text(),
    txtLen = txt.length,
    timeOut,
    char = 0;

$el.text('|');    

function typeIt() {   	
    var humanize = Math.round(Math.random() * (200 - 30)) + 30;
		timeOut = setTimeout(function() {
				char++;
				var type = txt.substring(0, char);
				$el.text(type + '|');
				typeIt();

				if (char == txtLen) {
						$el.text($el.text().slice(0, -1)); // remove the '|'
						clearTimeout(timeOut);
				}

		}, humanize);
};




var firstBtn = ["Network", "Collaborate", "Friendship"];
var secondBtn = ["Develop", "Code", "Innovation"];
var thirdBtn = ["Socialize", "Consume", "Brotherhood"];

function rotateTerm() {
	var ct = $("#rotate1").data("term") || 0;
	$("#rotate1").data("term", ct == firstBtn.length -1 ? 0 : ct + 1).text(firstBtn[ct]).fadeIn()
							.delay(3000).fadeOut(200, rotateTerm);
}
$(rotateTerm);

function rotateTerm2() {
	var ct = $("#rotate2").data("term") || 0;
	$("#rotate2").data("term", ct == secondBtn.length -1 ? 0 : ct + 1).text(secondBtn[ct]).fadeIn()
							.delay(3000).fadeOut(200, rotateTerm2);
}
$(rotateTerm2);

function rotateTerm3() {
	var ct = $("#rotate3").data("term") || 0;
	$("#rotate3").data("term", ct == thirdBtn.length -1 ? 0 : ct + 1).text(thirdBtn[ct]).fadeIn()
							.delay(3000).fadeOut(200, rotateTerm3);
}
$(rotateTerm3);






var tweeets = [];
function updateTweets() {
	$.get('/api/fetch-tweets', function (tweets) {
			console.log(tweets);
			tweeets = tweets;
	});
}

function rotateTweets() {
	var ct = $("#tweetRotate").data("term") || 0;
	$("#tweetRotate").data("term", ct == tweeets.length -1 ? 0 : ct + 1).text(tweeets[ct]).fadeIn()
							.delay(3000).fadeOut(200, rotateTweets);
}
$(rotateTweets);