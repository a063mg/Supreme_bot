$('.nav-link').on('click',function(){

//Remove any previous active classes
$('.nav-link').removeClass('active');

//Add active class to the clicked item
$(this).addClass('active');
});
 
      var xmlhttp = new XMLHttpRequest();
      var txt = '';
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
          var txt = xmlhttp.responseText;
          var arr = txt.split('\n');
          for(var i = 0; i < arr.length; i++){
              if (arr[i] !== ""){
                var data = arr[i].split(';');
                document.getElementById('row').innerHTML += '<div class="card '+data[3]+'"><img src='+data[0]+' /><p class="card-text">'+data[1]+'</p><p class="hidden category">'+data[3]+'</p><h1 class="card-price">'+data[2]+'</h1><button class="btn1">Add</button></div>';
              }
          }
          $(document).ready(function(){
              $("body").fadeIn(1500);

              // $("body").click(function(elem){
              //   $('.row').isotope({ filter: '.jackets' });
              //   resize()
              // });
              
              if (JSON.parse(localStorage["customer_data"])["preview"] == true){
                $('.card img').click(function(elem){
                  console.log(elem.target.src);
                  document.getElementById("prelook-image").src = elem.target.src;
                 $('#g').fadeIn("slow");
                });

                $('#g').click(function(elem){
                  $('#g').fadeOut("slow");
                });
              }

              $('.close-preview-look').click(function(elem){
                  $('#g').fadeOut("slow");
              });

              $('.btn1').click(function(elem){

                var id = elem.target.parentElement;
                    
                danger.style.display = 'none';
                success.style.display = 'none';
                danger1.style.display = 'none';
                size.value = "";
                borderSize.style.width = "0";
                size.style.borderBottom = "3px solid rgb(255, 0, 84)";
                borderColor1.style.width = "0";
                color.style.borderBottom = "3px solid rgb(255, 0, 84)";
                borderColor2.style.width = "0";
                extraColor.style.borderBottom = "3px solid rgb(255, 0, 84)";
                // size.style.borderColor = "rgb(255, 0, 84)";
                color.value = "";
                // color.style.borderColor = "rgb(255, 0, 84)";
                extraColor.value = "";
                // extraRemove.style.borderColor = "rgb(255, 0, 84)";
                
                var text = id.getElementsByClassName("card-text")[0].innerText;
                var price = id.getElementsByClassName("card-price")[0].innerText;
                var category  = id.getElementsByClassName("category")[0].innerText;
                var url = id.getElementsByTagName("img")[0].src;

                document.getElementsByClassName("preview-card-text")[0].innerText = text;
                document.getElementsByClassName("preview-card-text")[0].alt = category;
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
                      var category  = id.getElementsByClassName("preview-card-text")[0].alt;

                      var index = index+1;

                      obj[index] = {"keyword": keyword, "category": category, "color": color.value, "size": size.value, "color2": extraColor.value};

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
        }
      };

      xmlhttp.open("GET","http://tranquil-tundra-12245.herokuapp.com/droplist",true);
      xmlhttp.send();

  		var size = document.getElementById("input-size");
  		var danger = document.getElementsByClassName("alert-danger")[0];
      var danger1 = document.getElementsByClassName("alert-danger")[1];
      var success = document.getElementsByClassName("alert-success")[0];
      var lert1 = document.getElementsByClassName("not")[0];
  		var color = document.getElementById("input-color");
      var extraColor = document.getElementById("extra-input-color");
  		var close = document.getElementById("close");
  		var layer = document.getElementById("layer");
      var extra = document.getElementsByClassName("extra-img")[0];
      var extraRemove = document.getElementById("extra-remove");
      var borderColor1 = document.getElementById("color_border1");
      var borderColor2 = document.getElementById("color_border2");
      var borderSize = document.getElementById("size_border");
  		// layer.onclick = function() { $("#layer").fadeOut("slow") }

  		extra.onclick = function() {  document.getElementById("extra-block").style.display = "inline-block"; extra.style.display = "none";}

      extraRemove.onclick = function() { document.getElementById("extra-block").style.display = "none"; extra.style.display = "inline-block";}

      close.onclick = function() { $("#layer").fadeOut("slow") }

  		size.oninput = function() {
  			if (size.value == ""){
          borderSize.style.width = "0";
  				size.style.borderBottom = "3px solid rgb(255, 0, 84)";
  			}
  			else{
  				// size.style.borderColor = "#28a745";
          size.style.border = "0";
          borderSize.style.width = "100%";
  			}
  		};
  		color.oninput = function() {
  			if (color.value == ""){
          borderColor1.style.width = "0";
          color.style.borderBottom = "3px solid rgb(255, 0, 84)";
  				// color.style.borderColor = "rgb(255, 0, 84)";
  			}
  			else{
  				// color.style.borderColor = "#28a745";
          borderColor1.style.width = "100%";
          color.style.borderBottom = "0";
  			}
      };
      extraColor.oninput = function() {
        if (extraColor.value == ""){
          // extraColor.style.borderColor = "rgb(255, 0, 84)";
          borderColor2.style.width = "0";
          extraColor.style.borderBottom = "3px solid rgb(255, 0, 84)";
        }
        else{
          // extraColor.style.borderColor = "#28a745";
          extraColor.style.borderBottom = "0";
          borderColor2.style.width = "100%";
        }
  		};

function resize(){
  $(".row").removeAttr( 'style' );

  $(".card:visible").each(function(){
    $(this).removeAttr( 'style' );
  });
}
