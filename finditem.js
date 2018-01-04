function finditem(data){
	console.log(data);
	dic = {"/": 1, "-": 1, "™": 1,"®": 1, "a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 1, "h": 1, "i": 1, "j": 1, "k": 1, "l": 1, "m": 1, "n": 1, "o": 1, "p": 1, "q": 1, "r": 1, "s": 1, "t": 1, "u": 1, "v": 1, "w": 1, "x": 1, "y": 1, "z": 1};

	var items_color = data['color'].toLowerCase();
	var items_name = data['keyword'].toLowerCase();

	var name = "";

	for (var j= 0; j < items_name.length; j++){ 
		if (items_name[j] in dic){
			name = name + items_name[j];
		}
	}

	var color = "";

	for (var j= 0; j < items_color.length; j++){ 
		if (items_color[j] in dic){
			color = color + items_color[j];
		}
	}

	if (document.getElementById("container") !== null){
		
		var articles = document.getElementById("container").childNodes;

		var no_item = true;
		var no_color = true;

		for (var i= 0; i < articles.length; i++){ 

			var item = articles[i];
			var text = item.innerText.toLowerCase();
			var edited_text = "";

			console.log(text);

			for (var j= 0; j < text.length; j++){ 
				if (text[j] in dic){
					edited_text = edited_text + text[j];
				}
			}

			if (edited_text.indexOf(name) > -1){

				var no_item = false;

				if (edited_text.indexOf(color) > -1 || color == "any" || color == "none"){

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
	}
	else{
		console.log('error');
	}
}

