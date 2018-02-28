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
		var input=$('#inputToken');
		var re = /^[0-9]*$/;
		var is_name=re.test(input.val());
		var first_ok = true;
		if(is_name && $('#inputToken').val().length == 8){
			$('#inputToken').removeClass("invalid1")
		}
		else{
			first_ok = false;
			$('#shake-block0').effect("shake", "slow")
			$('#inputToken').addClass("invalid1")
			$('#inputToken').tooltipster({position: 'top',}).tooltipster('show')
		}
		var input=$('#inputLogin');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		var second_ok = false;
		if(is_name && $('#inputLogin').val().length < 32 && $('#inputLogin').val().length !== 0){
			$('#inputLogin').removeClass("invalid1")
			second_ok = true;
		}
		else if(first_ok == true){
			$('#shake-block1').effect("shake", "slow")
			$('#inputLogin').addClass("invalid1")
			$('#inputLogin').tooltipster({position: 'top',}).tooltipster('show')
		}
		var input=$('#inputPassword');
		var re = /^[A-za-z0-9.+@_-]*$/;
		var is_name=re.test(input.val());
		if(is_name && $('#inputPassword').val().length < 32 && $('#inputPassword').val().length !== 0 && second_ok == true){
			$('#inputPassword').removeClass("invalid1")
			if ( $("#inputPassword-repeat").val() == $('#inputPassword').val()){
				$("#inputPassword-repeat").removeClass("invalid1")
				adduser($('#inputLogin').val(), $('#inputPassword').val(), $('#inputToken').val())

			}
			else if(second_ok == true){
				$('#shake-block3').effect("shake", "slow")
				$("#inputPassword-repeat").addClass("invalid1")
				$("#inputPassword-repeat").tooltipster({position: 'top',}).tooltipster('show')
			}
		}
		else if(second_ok == true) {
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
	$('#inputPassword-repeat').on('input', function() {
		var input=$('#inputPassword-repeat');
		var input1=$('#inputPassword');
		if( input.val() == input1.val()){
			$('#inputPassword-repeat').removeClass("invalid1")
		}
		else{
			$('#inputPassword-repeat').addClass("invalid1")
		}
	});
	$('#inputToken').on('input', function() {
		var re = /^[0-9]*$/;
		var input=$('#inputToken');
		var is_name=re.test(input.val());
		if(is_name && $('#inputToken').val().length == 8){
			$('#inputToken').removeClass("invalid1")
		}
		else{
			$('#inputToken').addClass("invalid1")
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

var xmlhttp = new XMLHttpRequest();

var txt = '';

xmlhttp.onreadystatechange = function(){

	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
		var txt = xmlhttp.responseText;
		if (txt == "Login already in use."){
			document.getElementById("header-text").innerText = "Login already in use.";
			$('#inputLogin').addClass("invalid1")
		}
		else{
			if (txt == "Wrong token"){
				document.getElementById("header-text").innerText = "Wrong token";
				$('#inputToken').addClass("invalid1")
			}
			else{
				obj = JSON.parse(localStorage["program"]) 
				obj["session_token"] = txt;
				localStorage["program"] = JSON.stringify(obj)
				window.location = "auth.html";
			}
		}
	}

}

function adduser(login, password, token){

	xmlhttp.open("GET","http://tranquil-tundra-12245.herokuapp.com/adduser/"+login+"/"+password+"/"+token+"/",true);
	xmlhttp.send();
	
}

