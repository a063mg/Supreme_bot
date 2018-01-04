
      var xmlhttp = new XMLHttpRequest();
      var txt = '';
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
          var txt = xmlhttp.responseText;
          var arr = txt.split('\n');
          for(var i = 0; i < arr.length; i++){
              if (arr[i] !== ''){
                var data = arr[i].split(';');
                document.getElementById('row').innerHTML += '<div class="card"><img src='+data[0]+' /><p class="card-text">'+data[1]+'</p><p class="hidden category">'+data[3]+'</p><h1 class="card-price">'+data[2]+'</h1><button class="btn1">Add</button></div>';
              }
          }
        }
      };
      xmlhttp.open("GET","test.csv",true);
      xmlhttp.send();

  		var size = document.getElementById("input-size");
  		var danger = document.getElementsByClassName("alert-danger")[0];
      var danger1 = document.getElementsByClassName("alert-danger")[1];
      var success = document.getElementsByClassName("alert-success")[0];
      var lert1 = document.getElementsByClassName("not")[0];
  		var color = document.getElementById("input-color");
  		var close = document.getElementById("close");
  		var layer = document.getElementById("layer");

  		// layer.onclick = function() { $("#layer").fadeOut("slow") }

  		close.onclick = function() { $("#layer").fadeOut("slow") }

  		size.oninput = function() {
  			if (size.value == ""){
  				size.style.borderColor = "rgb(255, 0, 84)";
  			}
  			else{
  				size.style.borderColor = "#28a745";
  			}
  		};
  		color.oninput = function() {
  			if (color.value == ""){
  				color.style.borderColor = "rgb(255, 0, 84)";
  			}
  			else{
  				color.style.borderColor = "#28a745";
  			}
  		};

    $(document).ready(function(){
        $('.btn1').click(function(elem){
          var id = elem.target.parentElement;
              
          danger.style.display = 'none';
          success.style.display = 'none';
          danger1.style.display = 'none';
          size.value = "";
          size.style.borderColor = "rgb(255, 0, 84)";
          color.value = "";
          color.style.borderColor = "rgb(255, 0, 84)";
          
          var text = id.getElementsByClassName("card-text")[0].innerText;
          var price = id.getElementsByClassName("card-price")[0].innerText;
          var category  = id.getElementsByClassName("category")[0].innerText;
          var url = id.getElementsByTagName("img")[0].src;

          document.getElementsByClassName("preview-card-text")[0].innerText = text;
          document.getElementsByClassName("preview-categoty")[0].innerText = category;
          document.getElementsByClassName("preview-image")[0].src = url;
          document.getElementsByClassName("preview-card-price")[0].innerText = price;

          $("#layer").fadeIn("slow")
        });
       $('.add-button').click(function(elem){ 
            if (color.value == "" ||  size.value == ""){
                danger.style.display = 'block';
                success.style.display = 'none';
                danger1.style.display = 'none';
            }
            else{
              if (localStorage["data"] == undefined) {
                localStorage["data"] = JSON.stringify({});
              }
              var obj = JSON.parse(localStorage["data"]);
              var index = Object.keys(obj).length;

              if (index > 3){
                localStorage["data"] = JSON.stringify({});
              }
              if (index < 3){
                var id = elem.target.parentElement;

                var keyword = id.getElementsByClassName("preview-card-text")[0].innerText;
                var category  = id.getElementsByClassName("preview-categoty")[0].innerText;

                var index = index+1;

                obj[index] = {"keyword": keyword, "category": category, "color": color.value, "size": size.value};
                localStorage["data"] = JSON.stringify(obj);
                danger.style.display = 'none';
                danger1.style.display = 'none';
                success.style.display = 'block';
                $('.alert-success').delay(1000).fadeOut("slow");
              }
              else{
                danger1.style.display = 'block';
                danger.style.display = 'none';
                success.style.display = 'none';
              }
          }
       });
    });
