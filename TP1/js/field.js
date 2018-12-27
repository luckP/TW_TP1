class Room {
	constructor(n_rows, n_cols) {
		this.gameover = false;
		this.turn = true;
		this.n_rows = n_rows;
		this.n_cols = n_cols;
		this.setupCells();
	}

	setupCells() {
		this.col_count = new Array();
		for(let i = 0; i < this.n_cols; i++)
			this.col_count.push(0);
		this.cells = new Array();
		for(let i = 0; i < this.n_rows; i++) {
			let aux = new Array();
			for(let i = 0; i < this.n_cols; i++)
				aux.push('-');
			this.cells.push(aux.slice());
		}
	}
}

function openCfg() {
	document.getElementById("menu-card").style.display = "none";
	document.getElementById("config-card").style.display = "block";
}

var room;
// var room = {
// 	gameover: false,
// 	turn: true,
// 	col_count: [0,0,0,0,0,0,0],
// 	cells: [
// 		['-','-','-','-','-','-','-'],
// 		['-','-','-','-','-','-','-'],
// 		['-','-','-','-','-','-','-'],
// 		['-','-','-','-','-','-','-'],
// 		['-','-','-','-','-','-','-'],
// 		['-','-','-','-','-','-','-']
// 	]
// }

function initField() {

	let y = document.getElementById("row").value;
	let x = document.getElementById("col").value;

	room = new Room(y,x);

	{
		document.getElementById("menu-card").style.display = "none";
		document.getElementById("config-card").style.display = "none";
		document.getElementById("game-card").style.display = "block";
	}

	let field = document.getElementById("field");

	let fieldStr = "";
	
	for(let i = 0; i < x; i++) {
		fieldStr += '<div class="column" onclick="play(' + i + ', room)">';
		for(let j = 0; j < y; j++) {
			fieldStr += '<div id="' + i + ',' + (y - 1 -j) + '" class="cell"></div>';
		}
		fieldStr += "</div>";
	}
	
	
	field.innerHTML = fieldStr;
	
	let cellWH = (600-4*x)/x;
	
	if(cellWH > (600-4*y)/y)
		cellWH = (600-4*y)/y;
	
	let cells_ = document.getElementsByClassName("cell");
	for(let i = 0; i < cells_.length; i++) {
		cells_[i].style.height = cellWH;
		cells_[i].style.width = cellWH;
	}
}

var aiBot = true;
var aiTurn = false;

function play(n, game) {
	if(game.gameover) {
		// alert("The game is over");
	}
	else {

		// let gameLog = document.getElementById("game-log");

		if((x = document.getElementById((n) + "," + (game.col_count[n]))) != null) { 
			if(game.turn) {
				// gameLog.value = gameLog.value + "Red plays: column "+n+"\n";
				// gameLog.scrollTop = gameLog.scrollHeight;
				x.style.backgroundColor = "#18BC9C";
				// x.style.backgroundColor = "#FF0000";
				// x.style.animationName = "turnRed";
				game.cells[game.col_count[n]][n] = 'X';

				if(aiBot)
					aiTurn = true;

			}
			else {
				// gameLog.value = gameLog.value + "Blue plays: column "+n+"\n";
				// gameLog.scrollTop = gameLog.scrollHeight;
				x.style.backgroundColor = "#2C3E50";
				// x.style.backgroundColor = "#FFFF00";
				// x.style.animationName = "turnBlue";
				game.cells[game.col_count[n]][n] = 'O';

				if(aiBot)
					aiTurn = false;
			}
			game.col_count[n]++;
			game.turn = !game.turn;

			let curr = isTerminal(game.cells);
			// var curr = false;

			// console.log(curr[1]);

			game.gameover = curr[0];
			let sequence = curr[1];

			if(game.gameover) {

				fd = document.getElementsByClassName("cell");

				for (let i = 0; i < fd.length; i++) {
					fd[i].style.opacity = 0.2;
					// fd[i].style.animationName = "partialFadeOut";
				}

				for (let i = 0; i < sequence.length; i++) {
					temp = document.getElementById(sequence[i]);
					// temp.style.borderColor = "yellow";
					// temp.style.boxShadow = "0px 0px 50px grey";
					temp.style.animationName = "winner"
					temp.style.opacity = 1;
				}

				if(!game.turn) {
					// gameLog.value = gameLog.value + "Red wins!\n";
					// gameLog.scrollTop = gameLog.scrollHeight;
					alert("Red wins!");
				}
				else {
					// gameLog.value = gameLog.value + "Blue wins!\n";
					// gameLog.scrollTop = gameLog.scrollHeight;
					alert("Blue wins!");
				}
			
			}

		}
		else {
			alert("Invalid play");
		}
	}

	if(aiTurn) {
		let bestMove = bestMoveAB(new Node(game.cells, true, game.col_count, 1, 8, 'O')).move;
		play(bestMove, game);
	}

}

function isTerminal(cells) {

	let count = 0;

	for(let i = 0; i < cells.length; i++) { 
		for(let j = 0; j < cells[0].length; j++) { 
			if(cells[i][j] != '-') {
				// if(j < 4) {
				if(j < (cells[0].length - 3)) {
					if(cells[i][j] == cells[i][j + 1] && 
					   cells[i][j] == cells[i][j + 2] && 
					   cells[i][j] == cells[i][j + 3]) {
						return [true, [j+","+i, (j+1)+","+i, (j+2)+","+i, (j+3)+","+i]];
					}
				}
				if(i < cells.length - 3) {
					if(cells[i][j] == cells[i + 1][j] && 
					   cells[i][j] == cells[i + 2][j] && 
					   cells[i][j] == cells[i + 3][j]) {
						return [true, [j+","+(i), (j)+","+(i+1), (j)+","+(i+2), (j)+","+(i+3)]];
					}
				}
				// if(i < 3 && j < 4) {
				if(i < cells.length - 3 && j < (cells[0].length - 3)) {
					if(cells[i][j] == cells[i + 1][j + 1] && 
					   cells[i][j] == cells[i + 2][j + 2] && 
					   cells[i][j] == cells[i + 3][j + 3]) {
						return [true, [j+","+i, (j+1)+","+(i+1), (j+2)+","+(i+2), (j+3)+","+(i+3)]];
					}

					
				}
			}
			else
				count++;
			if(cells[i][cells.length - j] != '-') {
				// if(j < 4 && i < 3)
				if(j < (cells[0].length - 3) && i < 3)
				if(cells[i][cells.length - j] == cells[i + 1][cells.length - j - 1] && 
				   cells[i][cells.length - j] == cells[i + 2][cells.length - j - 2] && 
				   cells[i][cells.length - j] == cells[i + 3][cells.length - j - 3]) {
					return [true, [(cells.length-j)+","+i, (cells.length-j-1)+","+(i+1), (cells.length-j-2)+","+(i+2), (cells.length-j-3)+","+(i+3)]];
				}
			}
			else
				count++;
		}
	}
		
	if(count == 0) {
		tie = true;
		return [true, []];
	}
		
	return [false, []];

}

