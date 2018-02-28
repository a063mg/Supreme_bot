var txt = '';

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function(){

	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
		var txt = xmlhttp.responseText;
		obj = JSON.parse(localStorage["program"]) 
		if (txt == "Wrong data"){
			document.getElementById("header-text").innerText = "Wrong login or password";
			$('.circle-loader').toggleClass('load-complete');
        	$('.checkmark').toggle();
			$("#full-screen").fadeOut(750);
		}
		else{
			if (txt == "Wrong login"){
				document.getElementById("header-text").innerText = "Wrong login";
				$('.circle-loader').toggleClass('load-complete');
				$('#inputLogin').addClass("invalid1")
       			$('.checkmark').toggle();
				$("#full-screen").fadeOut(750);
			}
			else{
				if (txt !== "Complete"){
					var token = obj["session_token"];
					console.log(token)
					console.log(txt)
					obj["session_token"] = txt;
					localStorage["program"] = JSON.stringify(obj)
					xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/update/"+JSON.parse(localStorage["program"])["login"]+"/"+JSON.parse(localStorage["program"])["password"]+"/"+token+"/"+txt, true);
					xmlhttp.send();
				}
				else
				{
					$('.circle-loader').toggleClass('load-complete');
        			$('.checkmark').toggle();
					$("#full-screen").fadeOut(750)
					window.location = "../popup.html";
				}
			}
		}
		console.log(txt)
	}

}

function checkdate(login, password){

	if (localStorage["program"] !== undefined && JSON.parse(localStorage["program"])["session_token"] !== undefined && JSON.parse(localStorage["program"])["login"] !== undefined && JSON.parse(localStorage["program"])["password"]){
		token = JSON.parse(localStorage["program"])["session_token"] 
		xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/check/"+login+"/"+password+"/"+token, true);
		xmlhttp.send();
	}
	else{
		$('.circle-loader').toggleClass('load-complete');
        $('.checkmark').toggle();
		$("#full-screen").fadeOut(750)
		document.getElementById("header-text").innerText = "Wrong login or password."
	}
	
}


if (localStorage["program"] !== undefined){
	if (JSON.parse(localStorage["program"])["error"] == undefined){
		obj = JSON.parse(localStorage["program"]) 
		obj["error"] = "Log in please.";
		localStorage["program"] = JSON.stringify(obj)
		document.getElementById("header-text").innerText = JSON.parse(localStorage["program"])["error"];
	}
	document.getElementById("header-text").innerText = JSON.parse(localStorage["program"])["error"];
	obj = JSON.parse(localStorage["program"]) 
	obj["error"] = "Log in please.";
	localStorage["program"] = JSON.stringify(obj)
}
else{
	localStorage["program"] = JSON.stringify({"login": "", "password": "", "error": "Log in please"})
}

checkdate(JSON.parse(localStorage["program"])["login"], JSON.parse(localStorage["program"])["password"])

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
		if(is_name && $('#inputLogin').val().length < 32 && $('#inputLogin').val().length !== 0){
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
		if(is_name && $('#inputPassword').val().length < 32 && $('#inputPassword').val().length !== 0 && first_ok == true){
			$('#inputPassword').removeClass("invalid1")

			obj = JSON.parse(localStorage["program"])
			obj["login"] = $('#inputLogin').val();
			obj["password"] = $('#inputPassword').val();
			obj["remember-me"] = $("#remember-me").prop('checked')
			localStorage["program"] = JSON.stringify(obj)

			checkdate($('#inputLogin').val(), $('#inputPassword').val());

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
		if(is_name && $('#inputPassword').val().length < 32 && $('#inputPassword').val().length !== 0){
			$('#inputPassword').removeClass("invalid1")
		}
		else{
			$('#inputPassword').addClass("invalid1")
		}
	});
});

