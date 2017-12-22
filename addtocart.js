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
}
submitForm();
