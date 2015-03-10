require('./members')
require('./pledges')


// for header

$('[data-click="profileDropdown"]').click(function() {
	$('[data-toggle="profileDropdown"]').toggle()
});