
window.onscroll = function () {backgroundTranparency()};
window.onresize = function () {mobileCheck()};
window.onload = function () {mobileCheck()};

var header = document.getElementById('myHeader');


/**
 * Functions that changes the header transparency
 */
function backgroundTranparency() {
    if (window.pageYOffset > 150) {
        header.style.backgroundColor= 'transparent';
    }
    else {
        header.style.backgroundColor = '#d8d8d8';
    }
}

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

/**
 * Function that fixes the grid depending on what browser it is being read
 */
function gridFix() {
	var gameContainer = document.getElementById("game");
	var boxHeight = gameContainer.clientHeight / 3;
	var boxWidth = gameContainer.clientWidth /3;
	
	//setting game cells aspect
	cells.forEach(element => {
		var box = document.getElementById(element);
		box.style.height = boxHeight + "px";
		box.style.maxHeight = boxHeight + "px";
		box.style.width = boxWidth + "px";
		box.style.maxWidth = boxWidth + "px";
	});
	
	if(isMobile) { // if on mobile center game box
		var gameContainer = document.getElementById('gameDiv');
		var game = document.getElementById('game');
		var marginW = gameContainer.clientWidth - game.clientWidth;
		console.log('GC ' + gameContainer.clientWidth + ' G ' + game.clientWidth + ' M ' + Math.round(marginW /  3));
		game.style.marginLeft = Math.round(marginW/3) + 'px';
		game.style.marginRight = Math.round(marginW/3) + 'px';

	}
}

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

//Var that checks what type of browser is being used
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/**
 * Function that defines some behaviours based on the type of browser in use
 */
function mobileCheck() {
	
	if( isMobile) { // if the browser is mobile
		//changing the main division childs order
		var content = document.getElementById('game');
		var parent = content.parentNode;
		var pTwo = document.getElementById('playerTwo');
		var timer = document.getElementById('timer');
		timer.firstElementChild.style.fontSize = '20px';
		parent.insertBefore(content, parent.firstChild);
		parent.insertBefore(timer,pTwo);

		// Changing all the game percentage elements
		svgs.forEach(element => {
			var svg = document.getElementById(element);
			var circle = svg.firstElementChild;
			var text = circle.nextElementSibling;
			var letter = svg.lastElementChild;
			svg.setAttribute('height',90);
			svg.setAttribute('width',60);
			circle.setAttribute('r',20);
			circle.setAttribute('cy',30);
			circle.setAttribute('cx',30);
			text.setAttribute('x', 30);
			text.setAttribute('y',37);
			text.style.fontSize = '18px';
			letter.setAttribute('x',30);
			letter.setAttribute('y', 75);
			letter.style.fontSize = '20px';
		});

		// Changing Player one and player two Strings font size
		Pstrings.forEach(element => {
			var string = document.getElementById(element);
			string.style.fontSize = '20px';
		});
	
		// Changing game played circles sizes for mobile
		svgOCircles.forEach(element => {
			var svg = document.getElementById(element);
			var svgCircle = svg.firstElementChild;
			svg.setAttribute('height',26);
			svg.setAttribute('width',26);
			svgCircle.setAttribute('r',12);
			svgCircle.setAttribute('cy',13);
			svgCircle.setAttribute('cx',13);
		});

		// Changing wins records squares sizes for mobile
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
	
		// Changing timers font size for mobile
		var totalTimer = document.getElementById('totalTime');
		totalTimer.style.fontSize = '12px';
		var timer = document.getElementById('time');
		timer.style.fontSize = '18px';
	
	}
	else {
		// Centering Player One and Player Two Strings on desktop Version
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

	gridFix();
	
}

//Opens Facebook Link
function facebook() {
	window.open("https://www.facebook.com/"); 
}

//Opens Instagram Link
function instagram() {
	window.open("https://www.instagram.com/");
}

//Opens Twitter Link
function twitter() {
	window.open("https://twitter.com/");
}

// 
function emailInput() {
	var input = document.getElementById('input');
	input.value = '';
}

// Email box lost focus
function emailLost() {
	var input = document.getElementById('input');
	input.value = 'Subscribe our games!';
}

//Action for pressing the send icon press.
function sendPress() {
	alert('this does nothing');
}