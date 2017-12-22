addToCart = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var data = Object.keys(obj).length;
	var index = Object.keys(obj)[0];
	if (data > 1){
		var next_url = 'http://www.supremenewyork.com/shop/all/' + obj[Object.keys(obj)[1]]["category"];
	}
	chrome.tabs.executeScript(tabId, { file: "jquery-3.2.1.min.js"});
	chrome.tabs.executeScript(tabId, { file: "addtocart.js"}, function(){
	chrome.tabs.executeScript(tabId, {
			code: 'submitForm('+tabId+','+data+','+'"'+next_url+'"'+');'
		});
	});
	if (data > 1){
		delete obj[index];
		localStorage["data"] = JSON.stringify(obj);
	}
}

updateTab = (tabId, url, callback) => {
	chrome.tabs.update(tabId, { url: url }, () => {
		chrome.tabs.onUpdated.addListener(function listenTab(tabnumber, info, tab) {
			if (tab.url.indexOf(url) > -1 && info.status == "complete") {
				chrome.tabs.onUpdated.removeListener(listenTab)
				callback(tabId);
			}
		})
	})
};
check = (tabId) => {
	data = localStorage["customer_data"];
	chrome.tabs.executeScript(tabId, { file: "checkout.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'checkout('+data+');'
		});
	});
};
item = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj)[0];
	items_size = obj[index]["size"];
	chrome.tabs.executeScript(tabId, { file: "choose.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'found('+'"'+items_size+'"'+');'
		});
	});
};

find = (tabId) => {
	var obj = JSON.parse(localStorage["data"]);
	var index = Object.keys(obj)[0];
	var data = JSON.stringify(obj[index]);
		chrome.tabs.executeScript(tabId, { file: "finditem.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'finditem('+data+');'
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
				updateTab(tabId, request.url, find);
  				sendResponse(request.url);
        		break
        	case 'error':
        		sendResponse(request.error);
        		break
       	}
});