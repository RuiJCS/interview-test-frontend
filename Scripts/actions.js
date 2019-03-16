const state = {
	player_pick: true,
	player_turn: 0,
	board_size: 3,
	board: Array(9).fill(null),
	pc_wins: 0,
	player_wins: 0,
	saved_player_wins: 0,
	saved_pc_wins: 0,
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
	var valid = registerUser(index);
	if (!valid)
		return;
	var win = detectWin(state.player_pick);
	if(!win) {
		registerPC();
		win = detectWin(!state.player_pick);
		if(win){
			console.log('I win');
			var cell = document.getElementById('winsTwo');
			cell.textContent = ++state.pc_wins;
			if (state.pc_wins > 2) {
				window.alert("PC wins, congrats!!!");
				state.saved_pc_wins++;
				gameWin();
			}
			else {
				window.alert("This round goes to PC!!!");
				clearBoard();
			}
		}
	}
	else{
		console.log('You win');
		var cell = document.getElementById('winsOne');
		cell.textContent = ++state.player_wins;
		if(state.player_wins > 2) {
			window.alert("Player 1 wins, congrats!!!");
			state.saved_player_wins++;
			gameWin();
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
			console.log(index);
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
			return true;
	}

	// check columns
	for (let i = 0; i < state.board_size; i++) {
		var j = 0;
		for (; j < state.board_size; j++) {
			if(state.board[j*state.board_size + i] != lookup)
				break;
		}

		if (j==state.board_size)
			return true;
	}

	var j = 0;
	for (let i = 0; i < state.board_size; i++, j++) {
			if(state.board[j*state.board_size + i] != lookup)
				break;

	}
	if (j==state.board_size)
		return true;

	var j = 0;
	for (let i = 2; i >= 0 ; i--, j++) {
			if(state.board[j*state.board_size + i] != lookup)
				break;

	}
	if (j==state.board_size)
		return true;
	return false;
}

function clearBoard() {
	cells.forEach(element => {
		var cell = document.getElementById(element);
		cell.innerHTML='';
	});

	state.board = Array(9).fill(null);
}

function gameWin() {
	var cell = document.getElementById('winsOne');
	cell.textContent = 0;
	state.player_wins = 0;
	var cell = document.getElementById('winsTwo');
	cell.textContent = 0;
	state.player_wins = 0;
	clearBoard();
}