document.getElementById('back').onclick = () => window.location = 'popup.html';

document.getElementById('submit').onclick = () => {

localStorage["size"] = document.getElementById('size').value;
// localStorage["name"] = document.getElementById('name').value

var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var phone = document.getElementById('phone').value;
var address = document.getElementById('address').value;
var address2 = document.getElementById('address2').value;
var address3 = document.getElementById('address3').value;
var city = document.getElementById('city').value;
var postcode = document.getElementById('postcode').value;
var country = document.getElementById('country').value;
var card_type = document.getElementById('credit_card_type').value;
var card_number = document.getElementById('card_number').value;
var cvv = document.getElementById('cvv').value;
var card_month = document.getElementById('card_month').value;
var card_year = document.getElementById('card_year').value;

var JsonObj = {"name": name, "email": email, "phone": phone, "address": address, "address2": address2, "address3": address3, "city": city, "postcode": postcode, "country": country, "card_type": card_type, "card_number": card_number, "cvv": cvv, "card_month": card_month, "card_year": card_year};

localStorage["customer_data"] = JSON.stringify(JsonObj);

};