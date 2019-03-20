
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

var svgs = [
	'victoriesPlayerOne',
	'lossesPlayerOne',
	'victoriesPlayerTwo',
	'lossesPlayerTwo',
]

var Pstrings = [
	'pOneString',
	'pTwoString',
]

var Bstrings = [
	'gameVS',
]
var svgOCircles = [
	"svgOCircle1",
	"svgOCircle2",
	"svgOCircle3",
	"svgOCircle4",
	"svgOCircle5",
	"svgOCircle6",
	"svgOCircle7",
	"svgOCircle8",
	"svgOCircle9",
]

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if( isMobile) {
	var content = document.getElementById('game');
	var parent = content.parentNode;
	var pTwo = document.getElementById('playerTwo');
	var timer = document.getElementById('timer');
	timer.firstElementChild.style.fontSize = '20px';
	parent.insertBefore(content, parent.firstChild);
	parent.insertBefore(timer,pTwo);
	svgs.forEach(element => {
		var svg = document.getElementById(element);
		var circle = svg.firstElementChild;
		var text = svg.lastElementChild;
		svg.setAttribute('height',60);
		svg.setAttribute('width',60);
		circle.setAttribute('r',25);
		circle.setAttribute('cy',30);
		circle.setAttribute('cx',30);
		text.setAttribute('x', 30);
		text.setAttribute('y',37);
		text.style.fontSize = '18px';
	});
	Pstrings.forEach(element => {
		var string = document.getElementById(element);
		string.style.fontSize = '20px';
	});

	Bstrings.forEach(element => {
		var string = document.getElementById(element);
		string.style.fontSize = '15px';
	});

	svgOCircles.forEach(element => {
		var svg = document.getElementById(element);
		var svgCircle = svg.firstElementChild;
		svg.setAttribute('height',26);
		svg.setAttribute('width',26);
		svgCircle.setAttribute('r',12);
		svgCircle.setAttribute('cy',13);
		svgCircle.setAttribute('cx',13);
	});

	svgSquares.forEach (element => {
		var svg = document.getElementById(element);
		var square = svg.firstElementChild;
		var text = svg.lastElementChild;
		svg.setAttribute('height',30);
		svg.setAttribute('width',30);
		square.setAttribute('width',30);
		square.setAttribute('height',30);
		text.setAttribute('x', "55%");
		text.setAttribute('y', "75%");
		text.style.fontSize = '20px';
	});

	var totalTimer = document.getElementById('totalTime');
	totalTimer.style.fontSize = '12px';
	var timer = document.getElementById('time');
	timer.style.fontSize = '18px';
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

function facebook() {
	window.open("https://www.facebook.com/"); 
}

function instagram() {
	window.open("https://www.instagram.com/");
}

function twitter() {
	window.open("https://twitter.com/");
}