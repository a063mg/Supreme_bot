var txt = '';

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function(){

	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
		var txt = xmlhttp.responseText;
		obj = JSON.parse(localStorage["program"]) 
		if (txt == "Wrong data"){
			window.location = "../Password/auth.html";
		}
		else{
			if (txt == "Wrong login"){
				window.location = "../Password/auth.html";
			}
			else{
				if (txt == "Complete"){

				}
				else{
					var token = obj["session_token"];
					obj["session_token"] = txt;
					localStorage["program"] = JSON.stringify(obj)
					xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/update/"+JSON.parse(localStorage["program"])["login"]+"/"+JSON.parse(localStorage["program"])["password"]+"/"+token+"/"+txt, true);
					xmlhttp.send();
				}
			}
		}
		console.log(txt)
	}
}


function checkdate(login, password){

	if (localStorage["program"] !== undefined && JSON.parse(localStorage["program"])["session_token"] !== undefined && password !== undefined && login !== undefined){
		token = JSON.parse(localStorage["program"])["session_token"] 
		xmlhttp.open("GET", "http://tranquil-tundra-12245.herokuapp.com/check/"+login+"/"+password+"/"+token, true);
		xmlhttp.send();
	}
	
}

checkdate(JSON.parse(localStorage["program"])["login"], JSON.parse(localStorage["program"])["password"])


start = document.getElementById("start");
timer_block = document.getElementById("timer");
text = document.getElementById("text");
comment = document.getElementById("comment");
close = document.getElementById("close");

if (JSON.parse(localStorage["customer_data"])["timer"] == true){
	document.getElementById("startTime").style.display = "none";
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function cop(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

	  	chrome.runtime.sendMessage({msg:'go', id: tabs[0].id}, function submitForm(par){  console.log(par); });
	  	console.log(1);
  });
}

start.onclick = function() {
	stop = false;

	startTime = document.getElementById("startTime");

	if (startTime.value !== ""){
		timer_block.style.display = "none";
		text.innerText = "Timer is started."
		comment.style.display = "block";
		close.style.display = "block";

		var date = new Date('1970-01-01T' + startTime.value);

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var days = 0;

		if (JSON.parse(localStorage["customer_data"])["timer"] == true){
			var d = new Date();
			var days = 4 - d.getDay()
			if (days < 0){
				days = 7+days
			}
			var hours = 13 - d.getHours() 
			if (hours < 0){
				hours = 24+hours
				days -= 1
			}
			var minutes = 59 - d.getMinutes()
			var seconds = 59 - d.getSeconds()
		}

		var distance = days*86400 + hours*3600 + minutes*60 + seconds;

		var days = Math.floor(distance / 86400);
	    var hours = Math.floor(distance % 86400 / 3600);
	    var minutes = Math.floor(distance % 3600 / 60);
	    var seconds = Math.floor(distance % 60);
	    if (days == 0){
	    	document.getElementById("txt").innerText = String(checkTime(hours)) + ":" + String(checkTime(minutes)) + ":" + String(checkTime(seconds));
	    }
	    else{
	    	document.getElementById("txt").innerText = days + ":" + String(checkTime(hours)) + ":" + String(checkTime(minutes)) + ":" + String(checkTime(seconds));
		}

		var x = setInterval(function() {
			if (stop !== true){

				  // Get todays date and time

				  // Find the distance between now an the count down date
				  distance = distance-1;

				  // Time calculations for days, hours, minutes and seconds

				var days = Math.floor(distance / 86400);
			    var hours = String(checkTime(Math.floor(distance % 86400 / 3600)));
			    var minutes = String(checkTime(Math.floor(distance % 3600 / 60)));
			    var seconds = String(checkTime(Math.floor(distance % 60)));
			    if (days == 0){
			    	document.getElementById("txt").innerText = hours + ":" + minutes + ":" + seconds;
				}
				else{
					document.getElementById("txt").innerText = days + ":" + hours + ":" + minutes + ":" + seconds;
				}

				  // If the count down is finished, write some text 
				  if (distance < 0) {
				    clearInterval(x);
				    document.getElementById("txt").innerText = "00:00:00";
				    cop();
				  }
			}
			else{
				clearInterval(x);
			}
		}, 1000);
	}
}

close.onclick = function() {
	timer_block.style.display = "block";
	text.innerText = "Timer";
	comment.style.display = "none";
	close.style.display = "none";
	document.getElementById("txt").innerText = "";
	stop = true;
	time = 0;
}
