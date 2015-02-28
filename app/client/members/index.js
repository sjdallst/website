

$('.memberBox').click(function() {
	console.log("hereee")
	var id = $(this).data('click');
	$('[data-toggle="'+id+'"]').toggle();
})