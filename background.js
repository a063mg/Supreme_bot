addToCart = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var data = Object.keys(obj).length;
	var index = Object.keys(obj)[0];
	if (data > 1){
		var next_url = 'http://www.supremenewyork.com/shop/all/' + obj[Object.keys(obj)[1]]["category"];
	}
	chrome.tabs.executeScript(tabId, { file: "src/jquery-3.2.1.min.js"});
	chrome.tabs.executeScript(tabId, { file: "scripts/addtocart.js"}, function(){
	chrome.tabs.executeScript(tabId, {
			code: 'submitForm('+tabId+','+data+');'
		});
	});
	if (data > 0){
		delete obj[index];
		localStorage["data"] = JSON.stringify(obj);
	}
}

var listenerHandle = function() {
	return { cancel: true }
}

function removeImages() {
	chrome.webRequest.onBeforeRequest.addListener(
		listenerHandle,
		{
			urls: [
			   '*://*.cloudfront.net/*.jpg',
			   '*://*.cloudfront.net/*.png'
			]
		},
		['blocking']
	)
}



updateTab = (tabId, url, callback) => {
	chrome.tabs.update(tabId, { url: url }, () => {
		chrome.tabs.onUpdated.addListener(function listenTab(tabnumber, info, tab) {
			if (tab.url.indexOf(url) > -1 && info.status == "complete") {
				if (JSON.parse(localStorage["customer_data"])["removeImages"] == true){
					// chrome.tabs.executeScript(tabId, { file: "scripts/replaceImages.js"});
					removeImages();
				}
				else{
					chrome.webRequest.onBeforeRequest.removeListener(listenerHandle);
				}
				chrome.tabs.onUpdated.removeListener(listenTab);
				callback(tabId);
			}
		})
	})
};

check = (tabId) => {
	data = localStorage["customer_data"];
	chrome.tabs.executeScript(tabId, { file: "scripts/checkout.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'checkout('+data+');'
		});
	});
};

item = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj)[0];
	items_size = obj[index]["size"];
	chrome.tabs.executeScript(tabId, { file: "src/jquery-3.2.1.min.js"});
	chrome.tabs.executeScript(tabId, { file: "scripts/choose.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'found('+'"'+items_size+'"'+');'
		});
	});
};

find = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj)[0];
	var data = JSON.stringify(obj[index]);
		chrome.tabs.executeScript(tabId, { file: "scripts/finditem.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'finditem('+data+');'
		});
	});
	items_size = obj[index]["size"];
	chrome.tabs.executeScript(tabId, { file: "scripts/choose.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'found('+'"'+items_size+'"'+');'
		});
	});
};

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.msg) {
        	case 'checkout':
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        			tabId = tabs[0].id;
        		});
        		updateTab(tabId, request.url, check);
				sendResponse(request.url);
				break
        	case 'goitem':
        		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        			tabId = tabs[0].id;
        		});
				updateTab(tabId, request.url, item);
				sendResponse(request.url);
				break
        	case 'add':
        		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        			tabId = tabs[0].id;
        		});
				addToCart(tabId);
  				sendResponse(request.url);
        		break
        	case 'go':
    			tabId = request.id;

			  	if (localStorage["data"] == undefined){
			  		chrome.runtime.sendMessage({msg:'error', error: 'you have no items'}, function submitForm(par){  
  				  	console.log(par); 
  			  		});
			  	}
				else{
					var obj = JSON.parse(localStorage["data"]);
					var index = Object.keys(obj).length;
					if (index > 3){
						localStorage["data"] = JSON.stringify({});
					}
					else{
						if (index !== 0){
							localStorage["repeat"] = JSON.stringify(0);
							var url = 'http://www.supremenewyork.com/shop/all/' + obj[Object.keys(obj)[0]]["category"];
							updateTab(tabId, url, find);
	        			}
        			}
        		}
        		sendResponse();
        		break
        	case 'repeat':
        		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        			tabId = tabs[0].id;
        		});

        		var i = JSON.parse(localStorage["repeat"]);

        		var obj = JSON.parse(localStorage["data"]);

        		if (i < 3){
        			i = i + 1;
        			localStorage["repeat"] = JSON.stringify(i);
        			var url = 'http://www.supremenewyork.com/shop/all/' + obj[Object.keys(obj)[0]]["category"];
					updateTab(tabId, url, find);
        		}
        		else{
        			chrome.runtime.sendMessage({msg:'error', error: 'No item!'}, function sendResponse(error){ 
					console.log("No item"); 
					alert("No item");
					});
        		}
        		

        	case 'error':
        		sendResponse(request.error);
        		break
       	}
});


