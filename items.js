var obj = JSON.parse(localStorage["data"]);
var index = Object.keys(obj).length;
document.getElementById('items_info').innerText = "Item #"+String(index+1);

document.getElementById('back').onclick = () => window.location = 'popup.html';

document.getElementById('submit').onclick = () => {
	var size = document.getElementById('size').value;
	var keyword = document.getElementById('keyword').value;
	var color = document.getElementById('color').value;
	var category = document.getElementById('category').value;
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj).length;
	if (size == "" || keyword == "" || color == ""){
		alert('Required');
	}
	else{
		if (index < 3){
			var index = index+1;
			obj[index] = {"keyword": keyword, "category": category, "color": color, "size": size};
			localStorage["data"] = JSON.stringify(obj);
			document.getElementById('size').value = ""
			document.getElementById('keyword').value = "";
			document.getElementById('color').value = "";
			document.getElementById('category').value = 'jackets';
			document.getElementById('items_info').innerText = "Item #"+String(index+1);
		}
		else{
			console.log('Limited');
		}
	}
};

document.getElementById('clear').onclick = () => { 
	localStorage["data"] = JSON.stringify({});
	document.getElementById('size').value = ""
	document.getElementById('keyword').value = "";
	document.getElementById('color').value = "";
	document.getElementById('category').value = 'jackets';
	document.getElementById('items_info').innerText = "Item #1";

};