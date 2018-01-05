document.getElementById('save-button').onclick = () => {

	var success = true;

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

	if (success == true){
		var obj = {};
		Data.fieldsShipping.forEach((data, index, array) => {
			obj[data] = document.getElementById(data).value;
		});
		Data.fieldsBilling.forEach((data, index, array) => {
			obj[data] = document.getElementById(data).value;
		});

		obj["removeCapcha"] = document.getElementById("reCapcha").checked;
		obj["removeImages"] = document.getElementById("removeImages").checked;

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