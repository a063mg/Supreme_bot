
      var xmlhttp = new XMLHttpRequest();
      var txt = '';
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
          var txt = xmlhttp.responseText;
          var arr = txt.split('\n');
          for(var i = 0; i < arr.length; i++){
              var data = arr[i].split(';');
              console.log(arr[i]);
              document.getElementById('row').innerHTML += '<div class="card"><img src='+data[0]+' /><p class="card-text">'+data[1]+'</p><p class="hidden category">'+data[3]+'</p><h1 class="card-price">'+data[2]+'</h1><button class="btn1">Add</button></div>';
          }
        }
      };
      xmlhttp.open("GET","test.csv",true);
      xmlhttp.send();

  		var input1 = document.getElementById("input-size");
  		var lert = document.getElementsByClassName("alert")[0];
  		var input2 = document.getElementById("input-color");
  		var close = document.getElementById("close");
  		var layer = document.getElementById("layer");

  		// layer.onclick = function() { $("#layer").fadeOut("slow") }

  		close.onclick = function() { $("#layer").fadeOut("slow") }

  		input1.oninput = function() {
  			if (input1.value == ""){
  				input1.style.borderColor = "rgb(255, 0, 84)";
  			}
  			else{
  				input1.style.borderColor = "#28a745";
  			}
  		};
  		input2.oninput = function() {
  			if (input2.value == ""){
  				input2.style.borderColor = "rgb(255, 0, 84)";
  			}
  			else{
  				input2.style.borderColor = "#28a745";
  			}
  		};

      $(document).ready(function(){
        $('.btn1').click(function(elem){
        console.log(1);
        var id = elem.target.parentElement;
            
        lert.style.display = 'none';
        input1.value = "";
        input1.style.borderColor = "rgb(255, 0, 84)";
        input2.value = "";
        input2.style.borderColor = "rgb(255, 0, 84)";
        
        var text = id.getElementsByClassName("card-text")[0].innerText;
        var price = id.getElementsByClassName("card-price")[0].innerText;
        var category  = id.getElementsByClassName("category")[0].innerText;
        var url = id.getElementsByTagName("img")[0].src;

        console.log(url);

        document.getElementsByClassName("preview-card-text")[0].innerText = text;
        document.getElementsByClassName("preview-card-text")[1].innerText = category;
        document.getElementsByClassName("preview-image")[0].src = url;
        document.getElementsByClassName("preview-card-price")[0].innerText = price;

        $("#layer").fadeIn("slow")
      });

       $('.add-button').click(function(elem){ 
            if (input2.value == "" ||  input1.value == ""){
                lert.style.display = 'block';
            }
       });
    });

