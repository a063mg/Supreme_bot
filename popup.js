var page = document.getElementById("button");

if(page){
  page.addEventListener("click", cop, false);
}

document.getElementById('settings').onclick = () => window.location = 'settings.html';
//chrome.tabs.create({ url: location.href.replace("popup", "settings") })

function cop(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  	chrome.runtime.sendMessage({msg:'go', url: 'http://www.supremenewyork.com/shop/all/accessories', id: tabs[0].id}, function submitForm(par){  console.log(par); });
  	console.log(1);
  });
}
