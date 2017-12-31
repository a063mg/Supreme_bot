<!DOCTYPE html>
<html>
<head>
	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
	 
	 <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="album text-muted">
      <div class="container">
        <div class="row">
	    <?php
            $a = fopen('test.csv', 'r');
            while (($data = fgetcsv($a, 1000, ";")) == TRUE) {
                echo '<div class="card">';
                echo '<img src='.$data[0].' />';
                echo '<p class="card-text">'.$data[1].'</p>';
                echo '<h1 class="card-price">'.$data[2].'</h1>';
                echo '<button class="btn1">Add</button>';
                echo '</div>';
                }
        ?>
	    </div>
	  </div>
    </div>
    
    <div id="layer" class="layer">
    	<div class="preview" >
    		<p class="preview-card-text">Hooded Logo Half Zip Pullover</p>
    			<div class="preview-card">
        			<img class="rounded preview-image" />
        			<h1 class="preview-card-price"></h1>
        			<div class="block">
	        			<img class="color-sprite" src="photos/eyedropper.svg" />
	        			<input type="text" placeholder="Color" class="input" id="input-color" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
	        			<input type="text" placeholder="Size" class="input" id="input-size" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
	        			<img class="color-sprite" src="photos/resize-both.svg">
        			</div>
        			<button class="add">Add</button><button id="close" class="close1">Close</button>
       			</div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  	<script type="text/javascript">
  		var input1 = document.getElementById("input-size");
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

  		$('.btn1').click(function(elem){
  			var id = elem.target.parentElement;

  			input1.value = "";
  			input1.style.borderColor = "rgb(255, 0, 84)";
  			input2.value = "";
  			input2.style.borderColor = "rgb(255, 0, 84)";
  			
  			var text = id.getElementsByClassName("card-text")[0].innerText;
  			var price = id.getElementsByClassName("card-price")[0].innerText;
  			var url = id.getElementsByTagName("img")[0].src;

  			console.log(url);

  			document.getElementsByClassName("preview-card-text")[0].innerText = text;
  			document.getElementsByClassName("preview-image")[0].src = url;
  			document.getElementsByClassName("preview-card-price")[0].innerText = price;

  			$("#layer").fadeIn("slow")
  		});
  	</script>

</body>
</html>