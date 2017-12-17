var items_color = 'Woodbine';
var items_name = 'Supreme®/Hanes® Realtree® Boxer Briefs (2 Pack)';

var articles = document.getElementById("container").childNodes;

var no_item = true;
var no_color = true;

for (var i= 0; i < articles.length; i++){ 

	var item = articles[i];
	var name = item.innerText;

	if (name.toLowerCase().indexOf(items_name.toLowerCase()) > -1){
		var no_item = false;

		if (name.toLowerCase().indexOf(items_color.toLowerCase()) > -1){
			var no_color = false;
			if (item.getElementsByClassName('sold_out_tag').length == 0){

				var url = item.getElementsByTagName('a')[0].href;

				chrome.runtime.sendMessage({msg:'goitem', url: url}, function submitForm(par){  
					console.log(par); 
				});
			} 
			else{
				chrome.runtime.sendMessage({msg:'error', error: 'Item is sold out!'}, function sendResponse(error){ 
					console.log(error); 
					alert(error);
				});
			}
		}
	} 
}

if (no_item == true) {
	chrome.runtime.sendMessage({msg:'error', error: 'No item!'}, function sendResponse(error){ 
		console.log(error); 
		alert(error);
	});
}
else{
	if (no_color == true) {
		chrome.runtime.sendMessage({msg:'error', error: 'No color!'}, function sendResponse(error){ 
			console.log(error); 
			alert(error);
		});
	}
}

