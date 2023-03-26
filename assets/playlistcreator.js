// dom container
const container = document.querySelector('.playlist__list');

function ltcreator(){
	var lists="";
	listQuran.forEach(item => {
		if(item['id'].toString().length < 2){file='./assets/audio/00'+item['id'].toString()+".mp3";}
		else if(item['id'].toString().length == 2){file='./assets/audio/0'+item['id'].toString()+".mp3";}
		else if(item['id'].toString().length > 2){file='./assets/audio/'+item['id'].toString()+".mp3";}
		
		info = item["transliteration"]+' - '+item["total_verses"];
		lists=lists+'<li class="playlist__item" data-info="'+info+'" data-src="'+file+'" data-title="'+item["name"]+'"><div class="playlist__info"><h2 class="playlist__title">'+item["name"]+'</h2><p class="playlist__artist">'+info+'</p></div><div class="playlist__image-container"><img class="playlist__image" src="quran-lst.png" alt="Art"></div></li>';
		});
	container.innerHTML=lists;
}
ltcreator();
