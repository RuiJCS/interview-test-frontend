
window.onscroll = function () {backgroundTranparency()};

var header = document.getElementById('myHeader');

function backgroundTranparency(params) {
    if (window.pageYOffset > 150) {
        header.style.backgroundColor= 'transparent';
    }
    else {
        header.style.backgroundColor = '#d8d8d8';
    }
}

var gameContainer = document.getElementById("game");
var boxHeight = gameContainer.clientHeight / 3;
var boxWidth = gameContainer.clientWidth /3;
var cells = [
	"topleft",
	"topcenter",
	"topright",
	"middleleft",
	"middlecenter",
	"middleright",
	"botleft",
	"botcenter",
	"botright",
]

cells.forEach(element => {
	var box = document.getElementById(element);
	box.style.height = boxHeight + "px";
	box.style.maxHeight = boxHeight + "px";
	box.style.width = boxWidth + "px";
	box.style.maxWidth = boxWidth + "px";
});



var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if( isMobile) {
	console.log("YOLO")
	var content = document.getElementById('game');
	var parent = content.parentNode;
	var pTwo = document.getElementById('playerTwo');
	var timer = document.getElementById('timer')
	parent.insertBefore(content, parent.firstChild);
	parent.insertBefore(timer,pTwo);
}
else {
	var gameContainer = document.getElementById("gameContainer");
	var playerOne = document.getElementById("playerOne");
	var poHeight = playerOne.offsetHeight;
	gameContainer.style.height = window.innerHeight;
	gameContainer.style.width = window.innerWidth;
	var conHeight = gameContainer.offsetHeight;
	playerOne.style.marginTop = ((poHeight)/2) + 'px';
	
	var playerTwo = document.getElementById("playerTwo");
	var poHeight = playerTwo.offsetHeight;
	gameContainer.style.height = window.innerHeight;
	gameContainer.style.width = window.innerWidth;
	var conHeight = gameContainer.offsetHeight;
	playerTwo.style.marginTop = ((poHeight)/2) + 'px';

}