addToCart = (tabId) => {
	chrome.tabs.executeScript(tabId, { file: "jquery-3.2.1.min.js"});
	chrome.tabs.executeScript(tabId, { file: "addtocart.js"});
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
	items_size = JSON.parse(localStorage["items_data"])["size"];
	chrome.tabs.executeScript(tabId, { file: "choose.js"}, function(){
		chrome.tabs.executeScript(tabId, {
			code: 'found('+'"'+items_size+'"'+');'
		});
	});
};

find = (tabId) => {
	data = localStorage["items_data"];
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
    			tabId = request.id
				updateTab(tabId, request.url, find);
  				sendResponse(request.url);
        		break
        	case 'error':
        		sendResponse(request.error);
        		break
       	}
});