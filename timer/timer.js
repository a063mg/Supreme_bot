start = document.getElementById("start");
timer_block = document.getElementById("timer");
text = document.getElementById("text");
comment = document.getElementById("comment");
close = document.getElementById("close");

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

		var time = hours*3600 + minutes*60 + seconds;

		function startTimer() {
			if (stop == false){
				time -= 1;
				if (time == 0){
					document.getElementById("txt").innerText = "00:00:00";
					cop();
				}
				else{
					var h = String(Math.floor(time/3600));
					var m = String(checkTime(Math.floor((time%3600)/60)));
					var s = String(checkTime(Math.floor(time%60)));

					document.getElementById("txt").innerText = h+':'+m+':'+s;

			    	setTimeout(startTimer, 1000);
				}
			}
		}

		console.log(time);

		startTimer(time);
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