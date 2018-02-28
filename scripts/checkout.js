function checkout(data){
	if (data["removeCapcha"] == true){
		$(".g-recaptcha").remove()
	}
	$('#order_billing_name').val(data['name'])
	$('#order_email').val(data['email'])
	$('#order_tel').val(data['phone'])
	$('#bo').val(data['address'])
	$('#oba3').val(data['address1'])
	$('#order_billing_address_3').val(data['address2'])
	$('#order_billing_zip').val(data['zip'])
	$('#order_billing_city').val(data['city'])
	$('#order_billing_country').val(data["state"])
	$('#credit_card_type').val(data['card_type'])
	$('#cnb').val(data['card_number'])
	$('#vval').val(data['cvv'])
	$('#credit_card_month').val(data['card_month'])
	$('#credit_card_year').val(data['card_year'])
	$(".icheckbox_minimal").click()
	$(".checkout").delay(data["delay"]).click()
}