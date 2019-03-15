
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

var gameContainer = document.getElementById("gameContainer");
var playerOne = document.getElementById("playerOne");
var poHeight = playerOne.offsetHeight;
gameContainer.style.height = window.innerHeight;
gameContainer.style.width = window.innerWidth;
var conHeight = gameContainer.offsetHeight;
playerOne.style.marginTop = ((conHeight - poHeight)/2) + 'px';

var playerTwo = document.getElementById("playerTwo");
var poHeight = playerTwo.offsetHeight;
gameContainer.style.height = window.innerHeight;
gameContainer.style.width = window.innerWidth;
var conHeight = gameContainer.offsetHeight;
playerTwo.style.marginTop = ((conHeight - poHeight)/2) + 'px';

