


// for profile submit on edit

$('#submitProfile').click(function() {
	// alert("submitted profile!")

	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	    	console.log(this.name);
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};



	var data = $('#profileEdit').serializeObject();

	alert(JSON.stringify(data));

	$.post('/profile/update', data, function (res) { 
		window.location.replace("/app/profile");
	});

	
});