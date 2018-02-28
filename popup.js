var txt = '';

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function(){

	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){

		if (option == "date"){
			var txt = xmlhttp.responseText;
			console.log(txt)
			document.getElementById("time-to-end").innerText = txt + " days."
			if (JSON.parse(localStorage["program"])["remember-me"] == false){
				obj = JSON.parse(localStorage["program"]);
				obj["login"] = undefined;
				obj["password"] = undefined;
				localStorage["program"] = JSON.stringify(obj);
			}
		}
		else{
			var txt = xmlhttp.responseText;
			obj = JSON.parse(localStorage["program"]) 
			if (txt == "Wrong data"){
				window.location = "Password/auth.html";
			}
			else{
				if (txt == "Wrong login"){
					window.location = "Password/auth.html";
				}
				else{
					if (txt == "Complete"){
						option = "date"
						xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/date/"+JSON.parse(localStorage["program"])["login"]+"/"+JSON.parse(localStorage["program"])["password"]+"/", true);
						xmlhttp.send();
					}
					else{
						var token = obj["session_token"];
						obj["session_token"] = txt;
						localStorage["program"] = JSON.stringify(obj)
						xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/update/"+JSON.parse(localStorage["program"])["login"]+"/"+JSON.parse(localStorage["program"])["password"]+"/"+token+"/"+txt, true);
						xmlhttp.send();
					}
				}
			}
		}
	}
}


function checkdate(login, password, f){

	if (f == "check" && localStorage["program"] !== undefined && JSON.parse(localStorage["program"])["session_token"] !== undefined && password !== undefined && login !== undefined){
		// var option = "check";
		token = JSON.parse(localStorage["program"])["session_token"] 
		xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/check/"+login+"/"+password+"/"+token, true);
		xmlhttp.send();
	}

	
}

var option = "check";

checkdate(JSON.parse(localStorage["program"])["login"], JSON.parse(localStorage["program"])["password"], option);



// var page = document.getElementById("timer");

// if(page){
//   page.addEventListener("click", cop, false);
// }

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
document.getElementById('timer').onclick = () => {
	window.open("/timer/timer.html");
};
document.getElementById('back').onclick = () => { 
		obj = JSON.parse(localStorage["program"])
		obj["login"] = undefined
		obj["password"] = undefined
		localStorage["program"] = JSON.stringify(obj)
		window.location = 'Password/auth.html';
	};

document.getElementById('clear').onclick = () => { 
	clear();
 };
 document.getElementById('add').onclick = () => { 
	window.location = 'add.html';
 };
//chrome.tabs.create({ url: location.href.replace("popup", "settings") })

function cop(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	  	chrome.runtime.sendMessage({msg:'go', id: tabs[0].id}, function submitForm(par){  console.log(par); });
	  	console.log(1);
  });
}
