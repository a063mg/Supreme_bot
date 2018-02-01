$(document).ready(function(){

	$('.cb-value').click(function() {
		var mainParent = $(this).parent('.toggle-btn');
		if($(mainParent).find('input.cb-value').is(':checked')) {
			$(mainParent).addClass('active');
		} else {
			$(mainParent).removeClass('active');
		}
	})

	$('#submit').on('click', function() {
		var input=$('#inputLogin');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		var first_ok = true;
		if(is_name && $('#inputLogin').val().length < 32&& $('#inputLogin').val().length !== 0){
			$('#inputLogin').removeClass("invalid1")
		}
		else{
			first_ok = false;
			$('#shake-block1').effect("shake", "slow")
			$('#inputLogin').addClass("invalid1")
			$('#inputLogin').tooltipster({position: 'top',}).tooltipster('show')
		}
		var input=$('#inputPassword');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		if(is_name && $('#inputPassword').val().length < 32&& $('#inputPassword').val().length !== 0 && first_ok == true){
			$('#inputPassword').removeClass("invalid1")
			alert('ok')
			if ($("#remember-me").prop('checked') == true){
				//Remeber user
			}
		}
		else if(first_ok == true) {
			$('#shake-block2').effect("shake", "slow")
			$('#inputPassword').addClass("invalid1")
			$('#inputPassword').tooltipster({position: 'top',}).tooltipster('show')
		}
	});


	$('#inputLogin').on('input', function() {
		var input=$('#inputLogin');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		if(is_name && $('#inputLogin').val().length < 32 && $('#inputLogin').val().length !== 0){
			$('#inputLogin').removeClass("invalid1")
		}
		else{
			$('#inputLogin').addClass("invalid1")
		}
	});
	$('#inputPassword').on('input', function() {
		var input=$('#inputPassword');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		if(is_name && $('#inputPassword').val().length < 32&& $('#inputPassword').val().length !== 0){
			$('#inputPassword').removeClass("invalid1")
		}
		else{
			$('#inputPassword').addClass("invalid1")
		}
	});
});