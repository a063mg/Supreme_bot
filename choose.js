// document.getElementsByName('size')[0].value='41784';

function found(item_size){

	var url = window.location.href;

	button = document.getElementById('add-remove-buttons');

	if (button !== null && button !== undefined){
		if (button.getElementsByClassName('button sold-out') !== null && button.getElementsByClassName('button sold-out') !== undefined){
			if (button.getElementsByClassName('button sold-out').length !== 0){

				chrome.runtime.sendMessage({msg:'error', error: 'Item is sold out!'}, function sendResponse(error){ 
					console.log(error); 
					alert(error);
				});

			}
			else{
				no_size = true;

				articles = document.getElementById('size');
				if (articles == null || articles.options == undefined  || item_size.toLowerCase() == 'none' || item_size.toLowerCase() == 'any'){
					chrome.runtime.sendMessage({msg:'add', url: url}, function submitForm(par){  
						console.log(par); 
					});
				}
				else{

					for (var i = 0; i < articles.options.length; i++){ 
						if (articles.options[i].innerText.toLowerCase() == item_size.toLowerCase()){
							var value = articles.options[i].value;
							no_size = false;
						}
					}

					if (no_size == false){

						document.getElementsByName('size')[0].value = value;

						chrome.runtime.sendMessage({msg:'add', url: url}, function submitForm(par){  
							console.log(par); 
						});
					}
					else{
						chrome.runtime.sendMessage({msg:'error', error: 'No size.'}, function sendResponse(error){ 
							console.log(error); 
							alert(error);
						});
					}
				}
			}
		}
	}
}