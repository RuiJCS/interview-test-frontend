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

/**
 * 
 * This function receives the player intent and verifies if it is possible.
 * In case it isn't the board stays unchanged otherwise it register the user play.
 * 
 * @param {Number} index Board Cell that was pressed.
 */
function onclickboard(index) {
	var date = new Date();
	if(!state.started) { // Check if the timer as started
		state.started = true;
		state.starting_time = date.getTime();
		// Setting the clock update event
		state.timer = setInterval(updateClock,1000);
	}
	// Verifies if the user play is valid
	var valid = registerUser(index);
	if (!valid)
		return;
	// Detects if the user won the game with this round
	var win = detectWin(state.player_pick,state.board);
	// Detects if there are any available cells
	var avMoves = getFreeCells(state.board.slice(0,state.board.length));
	if(avMoves.length==0 && !win[0]){ // Defines behaviour in case of draw
		window.alert("This round is a draw!!!");
		clearBoard();
		return;
	}
	if(!win[0]) { // Defines the behaviour in case the user didn't win this round
		// AI play calculation
		registerPC();
		// Detects if the AI won the round
		win = detectWin(!state.player_pick,state.board);
		if(win[0]){ // Behaviour in case the AI won the round
			// Colors the winning round
			drawWinLine(win[1],win[2]);
			// Changes the needed variables to reflect he AI victory
			var cell = document.getElementById('winsTwo');
			cell.textContent = ++state.pc_wins;
			if (state.pc_wins >= state.needed_wins) { // Behaviour in case the AI won the game
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

/**
 * 
 * @param {Number} index Registers the user play
 * @return {Boolean} Returns if the play was valid and therefore registered
 */
function registerUser(index) {
	if(state.board[index-1]===null){
		var cell = document.getElementById(cells[index - 1]);
		state.board[index-1] = state.player_pick;
		var img = document.createElement('img');
		img.src = "assets/images/X_dark.svg";
		img.style.height = 75 + '%';
		img.style.width = 75 + '%';
		cell.appendChild(img);
		return true;
	}
	else
		return false;
}


/**
 * Calculates and registers the next AI play
 */
function registerPC() {
	var index = 0;
	index = pcMove(state.board.slice(0,state.board.length),0,true)
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

/**
 * Checks a board for a set of flags to verify a win
 * @param {Boolean} lookup The flag to search to determine if a victory happened
 * @param {Array} board The board on where to look for the victory
 */
function detectWin(lookup,board) {
	//check lines
	for (let i = 0; i < state.board_size; i++) {
		var j = 0;
		for (; j < state.board_size; j++) {
			if(board[i*state.board_size + j] != lookup)
				break;
		}


		if (j==state.board_size)
			return [true,i,-1];
	}

	// check columns
	for (let i = 0; i < state.board_size; i++) {
		var j = 0;
		for (; j < state.board_size; j++) {
			if(board[j*state.board_size + i] != lookup)
				break;
		}

		if (j==state.board_size)
			return [true,-1,i];
	}

	//Check diagonal starting at (0,0) and ending at(board_size-1,board_size-1)
	var j = 0, i = 0;
	for (; i < state.board_size; i++, j++) {
			if(board[i*state.board_size + j] != lookup)
				break;

	}
	if (j==state.board_size)
		return [true,state.board_size,j];

	//Check diagonal starting at (board_size-1,0) and ending at(0,board_size-1)
	var j = 0, i = state.board_size - 1;
	for (; i >= 0 ; i--, j++) {
			if(board[i*state.board_size + j] != lookup)
				break;

	}
	if (j==state.board_size)
		return [true,0,j];
	return false;
}

/**
 * Function to highlit the winning sequence.
 * @param {Number} rows Row to be highlited
 * @param {Number} columns Column to be hightlited
 */
function drawWinLine(rows,columns) {
	if (rows > -1) {
		if(columns == -1) {
			for (let j = 0; j < state.board_size; j++) {
				drawWinSymbol(rows, j);
			}
		}
		else {
			if(rows==state.board_size){ //Check diagonal starting at (0,0) and ending at(board_size-1,board_size-1)
				var j = 0;
				for (let index = 0; index < state.board_size; index++, j++) {
					drawWinSymbol(index, j);
				}
			}
			else if (rows == 0) { //Check diagonal starting at (board_size-1,0) and ending at(0,board_size-1)
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


/**
 * Function to highlit individual cells of the winning sequence
 * @param {Number} rows row of the winning element to be drawn
 * @param {Number} j Column of the winning element to be drawn
 */
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

/**
 * Function to clear the game state, returning it to its original state.
 * Mostly used after a round, but can also be after a game win
 */
function clearBoard() {
	cells.forEach(element => {
		var cell = document.getElementById(element);
		cell.innerHTML='';
	});

	state.board = Array(9).fill(null);
}

/**
 * Function that sets the behaviour when a game is won by one of the players
 */
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

var svgSCircles = [
	"svgSCircle1",
	"svgSCircle2",
	"svgSCircle3",
	"svgSCircle4",
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

/**
 * Function that updates all the game statistics
 */
function updateStats() {
	if(state.saved_player_wins + state.saved_pc_wins > 0){
		//User win percentage
		var plWins = Math.round((state.saved_player_wins/(state.saved_player_wins + state.saved_pc_wins)) * 100);
		//AI win percentage
		var pcWins = Math.round((state.saved_pc_wins/(state.saved_player_wins + state.saved_pc_wins)) * 100);
		var winText = document.getElementById("svgTextP1V");
		winText.textContent = plWins + "%";
		var looseText = document.getElementById("svgTextP1L");
		looseText.textContent = 100 - plWins + "%";
		var winTextPC = document.getElementById("svgTextP2V");
		winTextPC.textContent = pcWins + "%";
		var looseTextPC = document.getElementById("svgTextP2L");
		looseTextPC.textContent = 100 - pcWins + "%";

		var circles = []
		svgSCircles.forEach(element => {
			circles.push(document.getElementById(element));
		});

		//Win feedback
		if(plWins > 70) { //Good win percentage
			circles[0].setAttribute('stroke','#00DCA4');
			circles[0].setAttribute('fill','#00DCA4');
			circles[1].setAttribute('stroke','#00DCA4');
			circles[1].setAttribute('fill','#00DCA4');
			circles[2].setAttribute('stroke','red');
			circles[2].setAttribute('fill','red');
			circles[3].setAttribute('stroke','red');
			circles[3].setAttribute('fill','red');
		}
		else if (plWins > 30 && plWins < 70) { //Mediocre win percentage
			circles[0].setAttribute('stroke','#F1C40F');
			circles[0].setAttribute('fill','#F1C40F');
			circles[1].setAttribute('stroke','#F1C40F');
			circles[1].setAttribute('fill','#F1C40F');
			circles[2].setAttribute('stroke','#F1C40F');
			circles[2].setAttribute('fill','#F1C40F');
			circles[3].setAttribute('stroke','#F1C40F');
			circles[3].setAttribute('fill','#F1C40F');
		}
		else { //Bad win percentage
			circles[0].setAttribute('stroke','red');
			circles[0].setAttribute('fill','red');
			circles[1].setAttribute('stroke','red');
			circles[1].setAttribute('fill','red');
			circles[2].setAttribute('stroke','#00DCA4');
			circles[2].setAttribute('fill','#00DCA4');
			circles[3].setAttribute('stroke','#00DCA4');
			circles[3].setAttribute('fill','#00DCA4');
		}

		//Setting the circles (games played) and squares (win records) states
		for (let index = 0; index < svgTexts.length; index++) {
			var text = document.getElementById(svgTexts[index]);
			if (!isMobile) text.style.fontSize= "30px";
			if (state.wins[index]!=null) {
				var circ = document.getElementById(svgCircles[index]);
				circ.setAttribute('fill',"#d8d8d8");
				text.textContent = state.wins[index];		
			}
			else {
				text.textContent = '';
			}
		}
	}

	// updating the total timer
	var time = document.getElementById("time");
	time.textContent = msToTime(state.accumulated_time);

}

/**
 * Converts a milliseconds input into a hours format
 * @param {Number} duration Milliseconds duration to be converted to hours format
 * @return {String} String with the last recorded total time
 */
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

/**
 * Function that scrolls to the requested division
 * @param {String} id Division name to scroll to
 */
function scrollDiv(id) {
	var div = document.getElementById(id);
	div.scrollIntoView();
}

/**
 * Function used to update the game timer
 */
function updateClock() {
	var date = new Date();
	var timer = document.getElementById("currTimer");
	timer.textContent = msToTime(date.getTime() - state.starting_time);
}

/**
 * Function to search for available cells in a board
 * @param {Array} board Array on wich free cells must be searched
 */
function getFreeCells(board) {
	var res = [];
	board.forEach((item,index) => {
		if(item == null) 
			res.push(index);
	});
	return res;
}

/**
 * Function that searchs the board for the best next AI play. This function implements the Minimax algorithm.
 * @param {Array} board Game board
 * @param {Number} depth The depth of recursion
 * @param {Boolean} maximizing To check if the search is minimizing or maximizing
 */
function pcMove(board,depth, maximizing) {
	var nodesValues = Array(9).fill(-101);
	var winPc = detectWin(!state.player_pick,board);
	var winPl = detectWin(state.player_pick,board);

	var availableMoves = getFreeCells(board.slice(0,board.length));
	if(availableMoves.length==0 || depth >= 8) {
		if(winPc[0]) 
			return 100 - depth;
		if(winPl[0])
			return -100 + depth;
		
		return 0;
	}


	if(maximizing) {
		var best = -100;
		var best_index = -1;
		availableMoves.forEach(element => {
			var currBoard = board.slice(0,board.length);
			currBoard[element] = !state.player_pick;
			var value = pcMove(currBoard,depth+1,false);
			best = Math.max(value,best);
			if(value == best)
			best_index = element;
			if(depth == 0) {
				nodesValues[element] = value;
			}
		});
		
		if(depth == 0) {
			console.log('Nodes ' + nodesValues);
			return best_index;
		}
		else 
		return best;
	}
	else {
		var best = 100;
		var best_index = -1;
		availableMoves.forEach(element => {
			var currBoard = board.slice(0,board.length);
			currBoard[element] = state.player_pick;
			var value = pcMove(currBoard,depth+1,true);
			best = Math.min(value,best);
			if(value == best)
				best_index = element;
			if(depth == 0) {
				nodesValues[element] = value;
			}
		});

		if(depth == 0) {
			return best_index;
		}
		else 
			return best;
	}
	
}