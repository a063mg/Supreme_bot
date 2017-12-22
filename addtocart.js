<<<<<<< HEAD
function submitForm(tabId, data, next_url){  
  $.ajax({ type: 'POST', url: $('#cart-addf').attr('action'), dataType: 'json', data: $('#cart-addf').serialize(), success: function(rep) { 
    			if (rep && rep.length) { 
            if (data == 1){
              chrome.runtime.sendMessage({msg:'checkout', url: 'https://www.supremenewyork.com/checkout'}, function submitForm(par){  
                console.log(par); 
              });
            }
            else{
              chrome.runtime.sendMessage({msg:'go', url: next_url, id: tabId}, function submitForm(par){  
                console.log(par); 
              });
            }
    		} 
    		},error: function() { 
    			submitForm();
    			chrome.runtime.sendMessage({msg:'error', error: 'Error while adding item...'}, function submitForm(par){  
  				  console.log(par); 
  			  });
    		}
  });
=======
function submitForm(){
$.ajax({ type: 'POST', url: $('#cart-addf').attr('action'), dataType: 'json', data: $('#cart-addf').serialize(), success: function(rep) { 
  			if (rep && rep.length) { 
				console.log('success');
  			} 
  		},error: function() { 
  			submitForm();
  			chrome.runtime.sendMessage({msg:'error', error: 'Error while adding item...'}, function submitForm(par){  
				console.log(par); 
			});
  		}
  		});
>>>>>>> 39b6e6f245fc944449253bbdb17eb8c4b837bb71
}
