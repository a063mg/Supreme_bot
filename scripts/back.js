arr = document.getElementsByClassName('inner-article')
for (var i = 0; i < arr.length; i++) {
    var input = arr[i];
    if (input.querySelectorAll('div').length == 0){
    	if (input.querySelectorAll('h1')[0].querySelector('a').textContent == 'Sacred Hearts Work Pant'){
     		if (input.querySelectorAll('p')[0].querySelector('a').textContent == 'Light Burgundy'){
     			 result = input.querySelectorAll('p')[0].querySelector('a').href;
     		}
     	}
    }
}
// location.href = result;
// window.open(result);
console.log(result);
result
// chrome.runtime.sendMessage({text:result});

// add = document.querySelectorAll('input').getElementByName('commit')[0];

// add.click();

// console.log('Test...');

// window.open('https://www.supremenewyork.com/checkout');

// checkout = document.getElementById('cart').getElementsByClassName('checkout')[0];

// if (checkout.textContent == 'checkout now'){
// 	checkout = windowcheckout.href;
// }
