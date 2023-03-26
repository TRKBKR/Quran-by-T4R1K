// Get references to DOM elements
const playerImage = document.querySelector('.player__image');
const playerTitle = document.querySelector('.player__title');
const playerArtist = document.querySelector('.player__ainfo');
const previousButton = document.querySelector('#previous-button');
const playButton = document.querySelector('#play-button');
const nextButton = document.querySelector('#next-button');
const progressBar = document.querySelector('.player__progress');
const playlist = document.querySelector('.playlist__list');
const currentime = document.querySelector('.player__current');
const fulltime = document.querySelector('.player__full');

const list = document.querySelectorAll('.playlist__item');
const audio = new Audio();

// Add Click event listner
list.forEach(function(item){item.addEventListener('click', function() {
	play(item);
	//console.log(item);
	});
});

// Play UI update
function play(item){
	list.forEach(items => {items.classList.remove('active');});
	item.classList.add('active');
	playerTitle.innerHTML=item.dataset['title'];
	playerArtist.innerHTML=item.dataset['info'];
	audioplayer(item.dataset['src'])
	//console.log(item.dataset);
}

// audioplayer

function audioplayer(srcc){
	audio.src=srcc;
	playTrack();
}


// Format time in minutes and seconds
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


// Handle audio time update
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  currentime.innerHTML=formatTime(audio.currentTime);
  fulltime.innerHTML=formatTime(audio.duration);
  progressBar.value = percent;
});

// Progress Click and use
function testprogress(){
	audio.currentTime=(progressBar.value/100)*audio.duration;
}



// Play current track
function playTrack() {
  audio.play();
  setcookies(audio.src.split('/')[audio.src.split('/').length-1].split(".")[0]);
  playButton.innerHTML = '<i class="material-icons">pause</i>';
}

// Pause current track
function pauseTrack() {
  audio.pause();
  playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
}
// Handle play/pause button click
playButton.addEventListener('click', () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

audio.addEventListener('ended', () => {
	index=parseInt(audio.src.split('/')[audio.src.split('/').length-1].split(".")[0]);
	play(list[index]);
});


// Use Cookies To play old Quran
// Cookie Reader/writer 
function getcookies(){
	ck=decodeURIComponent(document.cookie).split("; ");cookies={};ck.forEach(ckk => {d=ckk.split('=');cookies[d[0]]=d[1];});if(cookies["index"]){console.log(cookies["index"]);return cookies["index"];}else{return "";}}
function setcookies(all){
	const expire = new Date();expire.setTime(expire.getTime() + (1000*24*60*60*1000));document.cookie = "index="+all+";"+"expires = "+expire.toUTCString()+";SameSite=Lax";
}
function firstplayer(){
	
	if(getcookies().length > 1 ){
		item=list[parseInt(getcookies())-1];
	}else {item=list[0];}
	item.classList.add('active');
	playerTitle.innerHTML=item.dataset['title'];
	playerArtist.innerHTML=item.dataset['info'];
	audio.src=item.dataset['src'];
}

firstplayer();
