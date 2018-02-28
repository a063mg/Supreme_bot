// var txt = '';

// var xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function(){

// 	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
// 		var txt = xmlhttp.responseText;
// 		obj = JSON.parse(localStorage["program"]) 
// 		if (txt == "wrong data"){
// 			window.location = "../Password/auth.html";
// 		}
// 		else{
// 			if (txt == "wrong login"){
// 				window.location = "../Password/auth.html";
// 			}
// 			else{
// 				if (txt == "complete"){

// 				}
// 				else{
// 					var token = obj["session_token"];
// 					obj["session_token"] = txt;
// 					localStorage["program"] = JSON.stringify(obj)
// 					xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/update/"+JSON.parse(localStorage["program"])["login"]+"/"+JSON.parse(localStorage["program"])["password"]+"/"+token+"/"+txt, true);
// 					xmlhttp.send();
// 				}
// 			}
// 		}
// 		console.log(txt)
// 	}
// }


// function checkdate(login, password){

// 	if (localStorage["program"] !== undefined && JSON.parse(localStorage["program"])["session_token"] !== undefined && password !== undefined && login !== undefined){
// 		token = JSON.parse(localStorage["program"])["session_token"] 
// 		xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/check/"+login+"/"+password+"/"+token, true);
// 		xmlhttp.send();
// 	}
	
// }

// checkdate(JSON.parse(localStorage["program"])["login"], JSON.parse(localStorage["program"])["password"])

Data = {
	fieldsShipping: ["name",
			"email",
			"phone",
			"address", 
			"address1",
			"address2",
			"city",
			"zip",
			'state'],
	fieldsBilling: ["card_type",
					"card_number",
					"card_month",
					"card_year",
					"cvv"], };

Data.fieldsShipping.forEach(function(input, i, arr) {
	if (JSON.parse(localStorage["customer_data"])[input] !== undefined){
		document.getElementById(input).value = JSON.parse(localStorage["customer_data"])[input];
		$('#'+input).css("border-color", "#ced4da"); 
		$('#input-'+input).css("color", "#23272b");
	}
});
Data.fieldsBilling.forEach(function(input, i, arr) {
	if (JSON.parse(localStorage["customer_data"])[input] !== undefined){
		document.getElementById(input).value = JSON.parse(localStorage["customer_data"])[input];
		$('#'+input).css("border-color", "#ced4da"); 
		$('#input-'+input).css("color", "#23272b");
	}
});

document.getElementById("removeCapcha").checked = JSON.parse(localStorage["customer_data"])["removeCapcha"];
document.getElementById("removeImages").checked = JSON.parse(localStorage["customer_data"])["removeImages"];
document.getElementById("preview").checked = JSON.parse(localStorage["customer_data"])["preview"];
document.getElementById("timer").checked = JSON.parse(localStorage["customer_data"])["timer"];
document.getElementById("delay").value = JSON.parse(localStorage["customer_data"])["delay"];


document.getElementById('save-button').onclick = () => {

	var success = true;

	Data.fieldsShipping.forEach(function(input, i, arr) { 
			if (document.getElementById(input).value == ""){
				$('#'+input).css("border-color", "#dc3545"); 
				$('#input-'+input).css("color", "#dc3545"); 
				success = false;
			}
			else{
				$('#'+input).css("border-color", "#ced4da"); 
				$('#input-'+input).css("color", "#23272b"); 
			}
		});

	Data.fieldsBilling.forEach(function(input, i, arr) {
		if(document.getElementById("card_type").value !== "paypal"){ 
			if (document.getElementById(input).value == ""){
				$('#'+input).css("border-color", "#dc3545"); 
				$('#input-'+input).css("color", "#dc3545"); 
				success = false;
			}
			else{
					$('#'+input).css("border-color", "#ced4da"); 
					$('#input-'+input).css("color", "#23272b");
				}
		}
	});

	if (success == true){
		var obj = {};
		Data.fieldsShipping.forEach((data, index, array) => {
			obj[data] = document.getElementById(data).value;
		});
		Data.fieldsBilling.forEach((data, index, array) => {
			obj[data] = document.getElementById(data).value;
		});

		obj["removeCapcha"] = document.getElementById("removeCapcha").checked;
		obj["removeImages"] = document.getElementById("removeImages").checked;
		obj["preview"] = document.getElementById("preview").checked;
		obj["delay"] = parseFloat(document.getElementById("delay").value)
		obj["timer"] = document.getElementById("timer").checked;

		localStorage["customer_data"] = JSON.stringify(obj);

		$(".alert-danger").css("display", "none");
		$(".alert-success").css("display", "block"); 
		$('.alert-success').delay(1000).fadeOut("slow");
	}
	else{
		$(".alert-danger").css("display", "block");
		$(".alert-success").css("display", "none");
		$('.alert-danger').delay(2000).fadeOut("slow");
	}

};

$('input').focus(
    function(){
        $(this).css('border-color','#ced4da');
        $('.alert-danger').delay(500).fadeOut("slow");
});

if(document.getElementById("card_type").value == "paypal"){
	$("#for-card-number").css("display", "none");
	$("#for-card-number1").css("display", "none");
	Data.fieldsBilling.forEach(function(input, i, arr) {
		if (input !== "card_type"){
			document.getElementById(input).value = "";
			$('#'+input).css("display", "none"); 
			$('#input-'+input).css("display", "none");
		}
	});
}
else{
	$("#for-card-number").css("display", "inline-block");
	$("#for-card-number1").css("display", "inline-block");
	Data.fieldsBilling.forEach(function(input, i, arr) {
		if (input !== "card_type"){
			if (JSON.parse(localStorage["customer_data"])[input] !== undefined){
				document.getElementById(input).value = "";
				$('#'+input).css("display", "inline-block"); 
				document.getElementById(input).value = JSON.parse(localStorage["customer_data"])[input];
				$('#'+input).css("border-color", "#ced4da"); 
				$('#input-'+input).css("display", "inline-block");
				$('#input-'+input).css("color", "#23272b");
			}
		}
	});
}

$('#card_type').change(function() {
	if(document.getElementById("card_type").value == "paypal"){
		$("#for-card-number").css("display", "none");
		$("#for-card-number1").css("display", "none");
		Data.fieldsBilling.forEach(function(input, i, arr) {
			if (input !== "card_type"){
				document.getElementById(input).value = "";
				$('#'+input).css("display", "none"); 
				$('#input-'+input).css("display", "none");
			}
		});
	}
	else{
		$("#for-card-number").css("display", "inline-block");
		$("#for-card-number1").css("display", "inline-block");
		Data.fieldsBilling.forEach(function(input, i, arr) {
			if (input !== "card_type"){
				if (JSON.parse(localStorage["customer_data"])[input] !== undefined){
					document.getElementById(input).value = "";
					$('#'+input).css("display", "inline-block"); 
					document.getElementById(input).value = JSON.parse(localStorage["customer_data"])[input];
					$('#'+input).css("border-color", "#ced4da"); 
					$('#input-'+input).css("display", "inline-block");
					$('#input-'+input).css("color", "#23272b");
				}
			}
		});
	}
});

$("input").on("input", function(e) {
  if ($(e.target).val() !== ""){
  	$('#input-' + $(e.target).attr('id')).css('color','#23272b');
  }
  else{
  	$('#input-' + $(e.target).attr('id')).css("color", "#dc3545"); 
  }
});
$('img').click(
    function(){
        document.getElementById($(this).attr('alt')).value = "";
});

$('.nav-link').on('click',function(){

  //Remove any previous active classes
  $('.nav-link').removeClass('active');

  //Add active class to the clicked item
  $(this).addClass('active');
});

$("body").fadeIn(1500);