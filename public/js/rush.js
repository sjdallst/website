$(document).ready(function(){
	$('.carousel').carousel({
		interval: 3500
	});
});

$('#nl-form').submit( function () {
    console.log('called')
    $.post('/interest', $('#nl-form').serialize(), function (data) {
    });
});
