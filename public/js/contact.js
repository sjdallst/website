$(document).ready(function(){

	// Initial setup
	$('#if_student').hide();
	$('#if_representative').hide();
	$('#closing').hide();

	//Dynamic form elements
	$('select[name="role"]').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('select[name="role"] option:selected').text());
		$(this).width($("#width_tmp").width());
		if ($('select[name="role"] option:selected').val() == 'student') {
			$('#if_student').show();
			$('#if_representative').hide();
			$('#closing').show();
		}
		if ($('select[name="role"] option:selected').val() == 'representative') {
			$('#if_student').hide();
			$('#if_representative').show();
			$('#closing').show();
		}
	});

	//Adjusting select field widths
	$('select[name="role"]').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('select[name="role"] option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});

	$('select[name="major"]').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('select[name="major"] option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});

	$('select[name="if_student_intent"]').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('select[name="if_student_intent"] option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});

	$('select[name="if_representative_intent"]').change(function(){
		$("#width_tmp").html($('').text());
		$("#width_tmp").html($('select[name="if_representative_intent"] option:selected').text());
		$(this).width($("#width_tmp").width()+7);
	});

	//Adjust text and email field widths
	// function resizeInput() {
	//     $(this).attr('size', $(this).val().length);
	// }

	// $('input[type="text"]')
	//     // event handler
	//     .keyup(resizeInput)
	//     // resize on page load
	//     .each(resizeInput);

	// $('input[type="email"]')
	//     // event handler
	//     .keyup(resizeInput)
	//     // resize on page load
	//     .each(resizeInput);

	$('input[type="text"]').keypress(function(e) {
	    if (e.which !== 0 && e.charCode !== 0) { // only characters
	        var c = String.fromCharCode(e.keyCode|e.charCode);
	        $span = $(this).siblings('span').first();
	        $span.text($(this).val() + c) ; // the hidden span takes the value of the input
	        $inputSize = $span.width() ; 
	        $(this).css("width", $inputSize) ; // apply width of the span to the input
	    }
	});

	$('input[type="email"]').keypress(function(e) {
	    if (e.which !== 0 && e.charCode !== 0) { // only characters
	        var c = String.fromCharCode(e.keyCode|e.charCode);
	        $span = $(this).siblings('span').first();
	        $span.text($(this).val() + c) ; // the hidden span takes the value of the input
	        $inputSize = $span.width() ; 
	        $(this).css("width", $inputSize) ; // apply width of the span to the input
	    }
	});

	});