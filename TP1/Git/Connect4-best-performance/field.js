class Room {
	constructor(n_rows, n_cols, vsBot, playFirst) {
		this.gameover = false;
		this.turn = playFirst;
		this.n_rows = n_rows;
		this.n_cols = n_cols;
		this.vsBot = vsBot;
		this.setupCells();
		this.isDraw = false;
	}

	setupCells() {
//		this.col_count = {};
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

var room;

function initField() {

	let y = document.getElementById("row").value;
	let x = document.getElementById("col").value;
    
    if(x > 15 || y > 15) {
        room.vsBot = false;
    }
    
	room = new Room(y,x, document.getElementById("vsBot").checked, document.getElementById("first").checked);

	flipCard('game-card');

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
    
    
    if(x > 7) { //518
        for(let i of document.getElementsByClassName("cell")) {
            i.style.height = Number.parseInt(550/x) + "px";
            i.style.width = Number.parseInt(550/x) + "px";
        }
    }

    if(!room.turn && room.vsBot) {
    	let bestMove = bestMoveAB(new Node(room.cells, true, room.col_count, 1, 8, 'O')).move;
		play(bestMove, room);
    }
}


/**
 * Make the move
 * 
 * @param {number} n Column number
 * @param {Room} game The active room
 */
function play(n, game) {
	if(game.gameover) {
		let endGame = document.getElementById("end-game");
		if(game.isDraw) {
            endGame.innerHTML = "Draw!";
		}
        else if(!game.turn)
            endGame.innerHTML = "Player wins!";
        else
            endGame.innerHTML = "Computer wins!";
        flipCard('pop-up-card');

	}
	else {

		// if(!game.turn && game.vsBot) {
		// 	let bestMove = bestMoveAB(new Node(game.cells, true, game.col_count, 1, 8, 'O')).move;
		// 	n = bestMove;
		// }
		if(!(n in game.col_count))
		 	game.col_count[n] = 0;

		if((x = document.getElementById((n) + "," + (game.col_count[n]))) != null) { 
			if(game.turn) {
				x.style.backgroundColor = "#18BC9C";
				game.cells[game.col_count[n]][n] = 'X';
			}
			else {
				x.style.backgroundColor = "#2C3E50";
				game.cells[game.col_count[n]][n] = 'O';
			}
			game.col_count[n]++;
			game.turn = !game.turn;

			// let curr = isTerminal(game.cells);
			let curr = isTerminal(game.cells, game.col_count);

			game.gameover = curr[0];
			let sequence = curr[1];

			if(game.gameover) {

				let fd = document.getElementsByClassName("cell");

				for (let i of fd) {
					i.style.opacity = 0.2;
				}

				for (let i of sequence) {
					temp = document.getElementById(i);
					temp.style.animationName = "winner"
					temp.style.opacity = 1;
				}
			
			}

		}
		else {
			alert("Invalid play");
		}

		if(!game.turn && game.vsBot) {
			let bestMove = bestMoveAB(new Node(game.cells, true, game.col_count, 1, 8, 'O')).move;
			play(bestMove, game);
		}
	}
	
}


function isTerminal(cells, cols) {

	let count = 0;

//	debugger;
 
//	for(let j in cols) {
	for(let j = 0; j < cols.length; j++) {
		for(let i = 0; i < cols[j]; i++) {
			
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
				if(i < cells.length - 3 && j < (cells[0].length - 3)) {
					if(cells[i][j] == cells[i + 1][j + 1] && 
					   cells[i][j] == cells[i + 2][j + 2] && 
					   cells[i][j] == cells[i + 3][j + 3]) {
						return [true, [j+","+i, (j+1)+","+(i+1), (j+2)+","+(i+2), (j+3)+","+(i+3)]];
					}
				}
				if(i >= 3 & j < (cells[0].length - 3)) {
					if(cells[i][j] == cells[i - 1][j + 1] && 
					   cells[i][j] == cells[i - 2][j + 2] && 
					   cells[i][j] == cells[i - 3][j + 3]) {
						return [true, [j+","+i, (j+1)+","+(i-1), (j+2)+","+(i-2), (j+3)+","+(i-3)]];
					}

					
				}
			
			
				count++;
		}
	}
	
//	debugger;

	if(count == cells.length*cells[0].length) {
		room.isDraw = true;
		return [true, []];
	}
		
	return [false, []];

}