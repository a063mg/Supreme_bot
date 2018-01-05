function replaceImages(){
	var url = 'https://pp.userapi.com/c837436/v837436664/615b7/PuuPR20_jQI.jpg';

	images = document.getElementsByTagName('img');

	for(var i = 0; i<images.length; i++){
		images[i].src = url;
	}
}
replaceImages()