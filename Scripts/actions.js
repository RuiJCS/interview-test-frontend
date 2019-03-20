const state = {
	player_pick: true,
	player_turn: 0,
	board_size: 3,
	board: Array(9).fill(null),
	pc_wins: 0,
	player_wins: 0,
	saved_player_wins: 0,
	saved_pc_wins: 0,
	wins : [],
	needed_wins: 1,
	max_length: 9,
	starting_time: 0,
	accumulated_time: 0,
	started: false,
	timer: null,
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

function onclickboard(index) {
	var date = new Date();
	if(!state.started) {
		state.started = true;
		state.starting_time = date.getTime();
		state.timer = setInterval(updateClock,1000);
	}
	var valid = registerUser(index);
	if (!valid)
		return;
	var win = detectWin(state.player_pick);
	if(!win[0]) {
		registerPC();
		win = detectWin(!state.player_pick);
		if(win[0]){
			drawWinLine(win[1],win[2]);
			var cell = document.getElementById('winsTwo');
			cell.textContent = ++state.pc_wins;
			if (state.pc_wins >= state.needed_wins) {
				window.alert("PC wins, congrats!!!");
				state.saved_pc_wins++;
				if(state.wins.length >= state.max_length)
					state.wins.shift();
				state.wins.push("P2");
				gameWin();
				updateStats();
				scrollDiv("statistics");
			}
			else {
				window.alert("This round goes to PC!!!");
				clearBoard();
			}
		}
	}
	else{
		drawWinLine(win[1],win[2]);
		var cell = document.getElementById('winsOne');
		cell.textContent = ++state.player_wins;
		if(state.player_wins >= state.needed_wins) {
			window.alert("Player 1 wins, congrats!!!");
			state.saved_player_wins++;
			if(state.wins.length >= state.max_length)
				state.wins.shift();
			state.wins.push("P1");
			gameWin();
			updateStats();
			scrollDiv("statistics");
		}
		else {
			window.alert("This round goes to Player 1");
			clearBoard();
		}
	}
}

function registerUser(index) {
	if(state.board[index-1]===null){
		var cell = document.getElementById(cells[index - 1])
		state.board[index-1] = state.player_pick;
		var img = document.createElement('img');
		img.src = "assets/images/X_dark.svg"
		img.style.height = 75 + '%';
		img.style.width = 75 + '%';
		cell.appendChild(img)
		return true;
	}
	else
		return false;
}

function registerPC() {
	var index = 0;
	for (; index < state.board_size * state.board_size; index++) {
		if(state.board[index]===null)
			break;
	}
	if (state.board[index]===null) {
		var cell = document.getElementById(cells[index])
		state.board[index] = !state.player_pick;
		var img = document.createElement('img');
		img.src = "assets/images/O_dark.svg"
		img.style.height = 75 + '%';
		img.style.width = 75 + '%';
		cell.appendChild(img)
	}
	else 
		{
			return;
		}
}

function detectWin(lookup) {
	//check lines
	for (let i = 0; i < state.board_size; i++) {
		var j = 0;
		for (; j < state.board_size; j++) {
			if(state.board[i*state.board_size + j] != lookup)
				break;
		}


		if (j==state.board_size)
			return [true,i,-1];
	}

	// check columns
	for (let i = 0; i < state.board_size; i++) {
		var j = 0;
		for (; j < state.board_size; j++) {
			if(state.board[j*state.board_size + i] != lookup)
				break;
		}

		if (j==state.board_size)
			return [true,-1,i];
	}

	var j = 0, i = 0;
	for (; i < state.board_size; i++, j++) {
			if(state.board[i*state.board_size + j] != lookup)
				break;

	}
	if (j==state.board_size)
		return [true,state.board_size,j];

	var j = 0, i = state.board_size - 1;
	for (; i >= 0 ; i--, j++) {
			if(state.board[i*state.board_size + j] != lookup)
				break;

	}
	if (j==state.board_size)
		return [true,0,j];
	return false;
}

function drawWinLine(rows,columns) {
	if (rows > -1) {
		if(columns == -1) {
			for (let j = 0; j < state.board_size; j++) {
				drawWinSymbol(rows, j);
			}
		}
		else {
			if(rows==state.board_size){
				var j = 0;
				for (let index = 0; index < state.board_size; index++, j++) {
					drawWinSymbol(index, j);
				}
			}
			else if (rows == 0) {
				var j = 0;
				for (let index = state.board_size-1; index >= 0; index--, j++) {
					drawWinSymbol(index, j);
				}
			}
		}
	} else {
		for (let index = 0; index < state.board_size; index++) {
			drawWinSymbol(index,columns)
			
		}
	}
}

function drawWinSymbol(rows, j) {
	var cell = document.getElementById(cells[rows * state.board_size + j]);
	cell.innerHTML = '';
	var img = document.createElement('img');
	if (state.board[rows * state.board_size + j] != state.player_pick)
		img.src = "assets/images/O_bright.svg";
	else
		img.src = "assets/images/X_bright.svg";
	img.style.height = 75 + '%';
	img.style.width = 75 + '%';
	cell.appendChild(img);
}

function clearBoard() {
	cells.forEach(element => {
		var cell = document.getElementById(element);
		cell.innerHTML='';
	});

	state.board = Array(9).fill(null);
}

function gameWin() {
	var date = new Date();
	var cell = document.getElementById('winsOne');
	cell.textContent = 0;
	state.player_wins = 0;
	var cell = document.getElementById('winsTwo');
	cell.textContent = 0;
	state.pc_wins = 0;
	state.started = false;
	state.accumulated_time += date.getTime() - state.starting_time;
	clearInterval(state.timer);
	state.starting_time = 0;
	var timer = document.getElementById("currTimer");
	timer.textContent = "00:00:00";
	clearBoard();
}

var svgTexts = [
	"svgText1",
	"svgText2",
	"svgText3",
	"svgText4",
	"svgText5",
	"svgText6",
	"svgText7",
	"svgText8",
	"svgText9",
]

var svgCircles = [
	"svgCircle1",
	"svgCircle2",
	"svgCircle3",
	"svgCircle4",
	"svgCircle5",
	"svgCircle6",
	"svgCircle7",
	"svgCircle8",
	"svgCircle9",
]

var svgSquares = [
	"svgSquare1",
	"svgSquare2",
	"svgSquare3",
	"svgSquare4",
	"svgSquare5",
	"svgSquare6",
	"svgSquare7",
	"svgSquare8",
	"svgSquare9",
]


function updateStats() {
	if(state.saved_player_wins + state.saved_pc_wins > 0){
		var plWins = Math.round((state.saved_player_wins/(state.saved_player_wins + state.saved_pc_wins)) * 100);
		var pcWins = Math.round((state.saved_pc_wins/(state.saved_player_wins + state.saved_pc_wins)) * 100);
		var winText = document.getElementById("svgTextP1V");
		winText.textContent = plWins + "%";
		var looseText = document.getElementById("svgTextP1L");
		looseText.textContent = 100 - plWins + "%";
		var winText = document.getElementById("svgTextP2V");
		winText.textContent = pcWins + "%";
		var looseText = document.getElementById("svgTextP2L");
		looseText.textContent = 100 - pcWins + "%";

		for (let index = 0; index < svgTexts.length; index++) {
			var text = document.getElementById(svgTexts[index]);
			text.textContent = state.wins[index];			
			// text.style.fontSize= "30px";
			if (state.wins[index]!=null) {
				var circ = document.getElementById(svgCircles[index]);
				circ.setAttribute('fill',"#d8d8d8");
			}
		}
	}

	var time = document.getElementById("time");
	time.textContent = msToTime(state.accumulated_time);

}

function msToTime(duration) {
	var milliseconds = parseInt((duration % 1000) / 100),
	  seconds = Math.floor((duration / 1000) % 60),
	  minutes = Math.floor((duration / (1000 * 60)) % 60),
	  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
	  
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
  
	return hours + ":" + minutes + ":" + seconds;
}

function scrollDiv(id) {
	var div = document.getElementById(id);
	div.scrollIntoView();
}

function updateClock() {
	var date = new Date();
	var timer = document.getElementById("currTimer");
	timer.textContent = msToTime(date.getTime() - state.starting_time);
}
