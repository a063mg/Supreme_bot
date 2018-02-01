function check(){
	var File = new XMLHttpRequest();
	File.open("GET", "pass.json", false);
}
File.onreadystatechange = function (){
	if(rawFile.readyState === 4){
		if(rawFile.status === 200 || rawFile.status == 0){
			var allText = rawFile.responseText;
			JSON.parse(allText)[0]
		}
	}
}

var page = document.getElementById("button");

if(page){
  page.addEventListener("click", cop, false);
}

function loadItems(){
	if (localStorage["data"] == undefined) {
		localStorage["data"] = JSON.stringify({});
	}
	else{
		var obj = JSON.parse(localStorage["data"]);
		var index = Object.keys(obj).length;

		table = document.getElementById('table')

		if (index > 0){
			table.style.display = "block";
		}
		Object.keys(obj).forEach(function(item, i, arr) {
			var sep = '';
			if(obj[item]['color2'] !== ''){
				var sep = '/ \n ';
			}
			document.getElementById('items_table').innerHTML += '<tr id="'+item+'"><td>'+item+'</td><td>'+obj[item]["keyword"]+'</td><td>'+obj[item]["color"]+sep+obj[item]["color2"]+'</td><td>'+obj[item]["size"]+'</td><td>'+obj[item]["category"]+'</td><td id="delete" name="'+item+'" style="color: rgb(255, 0, 84); border-top: 1px solid rgb(255, 0, 84); cursor: pointer; vertical-align: inherit; margin: auto; transition: 0.5s color, 0.5s background-color;" >Remove</td></tr>';
				// document.getElementById('tr').innerHTML += '<th style="text-align: center;" scope="col">X</th>'
		});
	}
}

function clear() {
	localStorage["data"] = JSON.stringify({});
	window.location = 'popup.html';
}

loadItems();

$('[id=delete]').click(function(elem){
	if (localStorage["data"] == undefined) {
		localStorage["data"] = JSON.stringify({});
	}
	else{
		var obj = JSON.parse(localStorage["data"]);
		var id = elem.target.getAttribute('name');
		delete obj[id];
		new_list = {}
		Object.keys(obj).forEach(function(item, i, arr) { 
			new_list[i+1] = obj[item];
		});
		localStorage["data"] = JSON.stringify(new_list);
		window.location = 'popup.html';
	}
});


document.getElementById('settings').onclick = () => window.open('/settings/settings.html');
// document.getElementById('items').onclick = () => window.location = 'items.html';
document.getElementById('view').onclick = () => {
	window.open("/droplist/droplist.html");
};
document.getElementById('submit').onclick = () => window.location = 'Password/auth.html';

document.getElementById('clear').onclick = () => { 
	clear();
 };
//chrome.tabs.create({ url: location.href.replace("popup", "settings") })

function cop(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	  	chrome.runtime.sendMessage({msg:'go', id: tabs[0].id}, function submitForm(par){  console.log(par); });
	  	console.log(1);
  });
}
