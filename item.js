var obj = JSON.parse(localStorage["data"]);
var index = Object.keys(obj).length;
document.getElementById('items_info').innerText = "Item #"+String(index+1);

document.getElementById('back').onclick = () => window.location = 'popup.html';

document.getElementById('submit').onclick = () => {
	var size = document.getElementById('size').value;
	var keyword = document.getElementById('keyword').value;
	var color = document.getElementById('color').value;
	var color2 = document.getElementById('extra_color').value;
	var category = document.getElementById('category').value;
	if (localStorage["data"] == undefined) {
		localStorage["data"] = JSON.stringify({});
	}
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj).length;
	if (index > 3){
		clear();
	}
	if (size == "" || keyword == "" || color == ""){
		if (size == ""){
			$('#size').addClass("invalid1")
		}
		if (keyword == ""){
			$('#keyword	').addClass("invalid1")
		}
		if (color == ""){
			$('#color').addClass("invalid1")
		}
	}
	else{
		if (index < 3){
			var index = index+1;
			obj[index] = {"keyword": keyword, "category": category, "color": color, "color2": color2, "size": size};
			localStorage["data"] = JSON.stringify(obj);
			document.getElementById('size').value = ""
			document.getElementById('keyword').value = "";
			document.getElementById('color').value = "";
			document.getElementById('extra_color').value = "";
			document.getElementById('category').value = 'jackets';
			document.getElementById('items_info').innerText = "Item #"+String(index+1);
		}
		else{
			console.log('Limited');
		}
	}
};

$(document).ready(function(){
	$('#size').on('input', function() {
		var input=$('#size');
		if($('#size').val().length !== 0){
			$('#size').removeClass("invalid1")
		}
		else{
			$('#size').addClass("invalid1")
		}
	});
	$('#keyword').on('input', function() {
		var input=$('#keyword');
		if($('#keyword').val().length !== 0){
			$('#keyword').removeClass("invalid1")
		}
		else{
			$('#keyword').addClass("invalid1")
		}
	});
	$('#color').on('input', function() {
		var input=$('#color');
		if($('#color').val().length !== 0){
			$('#color').removeClass("invalid1")
		}
		else{
			$('#color').addClass("invalid1")
		}
	});
});

function clear() {
	localStorage["data"] = JSON.stringify({});
	document.getElementById('size').value = ""
	document.getElementById('keyword').value = "";
	document.getElementById('color').value = "";
	document.getElementById('category').value = 'jackets';
	document.getElementById('items_info').innerText = "Item #1";
}

document.getElementById('clear').onclick = () => { 
	clear();

};