var page = document.getElementById("button");

if(page){
  page.addEventListener("click", cop, false);
}

function updateItems(){
	var obj = JSON.parse(localStorage["data"]);
	Object.keys(obj).forEach(function(item, i, arr) {
		document.getElementById('items_table').innerHTML += '<tr id="'+item+'"><td>'+item+'</td><td>'+obj[item]["keyword"]+'</td><td>'+obj[item]["color"]+'</td><td>'+obj[item]["size"]+'</td><td>'+obj[item]["category"]+'</td><td id="delete" name="'+item+'" style="background: red;">Delete</td></tr>';
	});
}

function clear() {
	localStorage["data"] = JSON.stringify({});
	window.location = 'popup.html';
}

updateItems();

$('[id=delete]').click(function(elem){
	var obj = JSON.parse(localStorage["data"]);
	var id = elem.target.getAttribute('name');
	document.getElementById(id).remove();
	delete obj[id];
	localStorage["data"] = JSON.stringify(obj);
});


document.getElementById('settings').onclick = () => window.location = 'settings.html';
document.getElementById('items').onclick = () => window.location = 'items.html';
document.getElementById('view').onclick = () => window.location = 'view.html';
document.getElementById('clear').onclick = () => { 
	clear();
 };
//chrome.tabs.create({ url: location.href.replace("popup", "settings") })

function cop(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var obj = JSON.parse(localStorage["data"]);
  	var url = 'http://www.supremenewyork.com/shop/all/' + obj[Object.keys(obj)[0]]["category"];
  	chrome.runtime.sendMessage({msg:'go', url: url, id: tabs[0].id}, function submitForm(par){  console.log(par); });
  	console.log(1);
  });
}
