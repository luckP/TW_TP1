const PLUS_INFINITE = 1000;
const MINUS_INFINITE = -1000;

const depthLimit = 4;



function bestMoveAB(currentState) {
	let children = currentState.makeDescendants();
	// debugger;
	let max = children[0];
	
	for(let i = 0; i < children.length; i++) {
		// debugger;
		let temp = alphabeta(children[i], false, 1, MINUS_INFINITE, PLUS_INFINITE);
		children[i].utility = temp;
		if(max.compareTo(children[i]) < 0)
			max = children[i];
	}
	
	return max;
	
}

function alphabeta(node, isMax, depth, alpha, beta) {
	// debugger;
	let boolVal = isTerminal(node.cells)[0];
	// debugger;
	if(boolVal || (depth == depthLimit))
			return utility(node.cells, isMax, node.getToken(), node.getEnemyToken()) - depth;
	
	if(isMax) {
		let best = MINUS_INFINITE;
		let tempAux = node.makeDescendants();
		for(let ci = 0; ci < tempAux.length; ci++) {

			let v = alphabeta(tempAux[ci], false, depth + 1, alpha, beta);
			// if(depth == 1)
			// 	System.out.println("	" + v);
			best = Math.max(best, v);
			alpha = Math.max(best, alpha);
			if(best >= beta) {
				return best;
			}
		}
		return best;
	}
	else {
		let best = PLUS_INFINITE;
		let tempAux = node.makeDescendants();
		for(let ci = 0; ci < tempAux.length; ci++) {
			// debugger;
			let v = alphabeta(tempAux[ci], true, depth + 1, alpha, beta);
			// if(depth == 1)
			// 	System.out.println("	" + v);
			best = Math.min(best, v);
			beta = Math.min(best, beta);
			if(best <= alpha) {
				return best;
			}
		}
		return best;
	}
}


function utility(nodeCells, isMax, token, enemyToken) {
	let acc = 0;
	let count = 0;
	let count2 = 0;
	
	// debugger;

	for(let i = 0; i < nodeCells.length; i++) {
		for(let j = 0; j < nodeCells[0].length; j++) {
			if(j < (nodeCells[0].length - 3)) {
				if(nodeCells[i][j] == token)
					count++;
				else if(nodeCells[i][j] == enemyToken)
					count2++;
				if(nodeCells[i][j + 1] == token)
					count++;
				else if(nodeCells[i][j + 1] == enemyToken)
					count2++;
				if(nodeCells[i][j + 2] == token)
					count++;
				else if(nodeCells[i][j + 2] == enemyToken)
					count2++;
				if(nodeCells[i][j + 3] == token)
					count++;
				else if(nodeCells[i][j + 3] == enemyToken)
					count2++;
			
				if(count2 == 0) {
					switch(count) {
						case 1:
							acc+=1;
							break;
						case 2:
							acc+=10;
							break;
						case 3:
							acc+=50;
							break;
						case 4:
							return 512;
					}
				}
				else if(count == 0) {
					switch(count2) {
						case 1:
							acc-=1;
							break;
						case 2:
							acc-=10;
							break;
						case 3:
							acc-=50;
							break;
						case 4:
							return -512;
					}
				}
			
				count = 0;
				count2 = 0;
			}
			
			if(i < nodeCells.length - 3) {
				if(nodeCells[i][j] == token)
					count++;
				else if(nodeCells[i][j] == enemyToken)
					count2++;
				if(nodeCells[i + 1][j] == token)
					count++;
				else if(nodeCells[i + 1][j] == enemyToken)
					count2++;
				if(nodeCells[i + 2][j] == token)
					count++;
				else if(nodeCells[i + 2][j] == enemyToken)
					count2++;
				if(nodeCells[i + 3][j] == token)
					count++;
				else if(nodeCells[i + 3][j] == enemyToken)
					count2++;
				
				if(count2 == 0) {
					switch(count) {
						case 1:
							acc+=1;
							break;
						case 2:
							acc+=10;
							break;
						case 3:
							acc+=50;
							break;
						case 4:
							return 512;
					}
				}
				else if(count == 0) {
					switch(count2) {
					case 1:
						acc-=1;
						break;
					case 2:
						acc-=10;
						break;
					case 3:
						acc-=50;
						break;
					case 4:
						return -512;
					}
				}
				
				count = 0;
				count2 = 0;
			}
			
			if(i < (nodeCells.length - 3) && j < (nodeCells[0].length - 3)) {
				if(nodeCells[i][j] == token)
					count++;
				else if(nodeCells[i][j] == enemyToken)
					count2++;
				if(nodeCells[i + 1][j + 1] == token)
					count++;
				else if(nodeCells[i + 1][j + 1] == enemyToken)
					count2++;
				if(nodeCells[i + 2][j + 2] == token)
					count++;
				else if(nodeCells[i + 2][j + 2] == enemyToken)
					count2++;
				if(nodeCells[i + 3][j + 3] == token)
					count++;
				else if(nodeCells[i + 3][j + 3] == enemyToken)
					count2++;
				
				if(count2 == 0) {
					switch(count) {
						case 1:
							acc+=1;
							break;
						case 2:
							acc+=10;
							break;
						case 3:
							acc+=50;
							break;
						case 4:
							return 512;
					}
				}
				else if(count == 0) {
					switch(count2) {
					case 1:
						acc-=1;
						break;
					case 2:
						acc-=10;
						break;
					case 3:
						acc-=50;
						break;
					case 4:
						return -512;
					}
				}
				
				count = 0;
				count2 = 0;
				
				if(nodeCells[i][nodeCells.length - j] == token)
					count++;
				else if(nodeCells[i][nodeCells.length - j] == enemyToken)
					count2++;
				if(nodeCells[i + 1][nodeCells.length - j - 1] == token)
					count++;
				else if(nodeCells[i + 1][nodeCells.length - j - 1] == enemyToken)
					count2++;
				if(nodeCells[i + 2][nodeCells.length - j - 2] == token)
					count++;
				else if(nodeCells[i + 2][nodeCells.length - j - 2] == enemyToken)
					count2++;
				if(nodeCells[i + 3][nodeCells.length - j - 3] == token)
					count++;
				else if(nodeCells[i + 3][nodeCells.length - j - 3] == enemyToken)
					count2++;
				
				if(count2 == 0) {
					switch(count) {
						case 1:
							acc+=1;
							break;
						case 2:
							acc+=10;
							break;
						case 3:
							acc+=50;
							break;
						case 4:
							return 512;
					}
				}
				else if(count == 0) {
					switch(count2) {
					case 1:
						acc-=1;
						break;
					case 2:
						acc-=10;
						break;
					case 3:
						acc-=50;
						break;
					case 4:
						return -512;
					}
				}
				
				count = 0;
				count2 = 0;
			}
		}
	}
	
	if(isMax)
		acc += 16;
	else
		acc -= 16;	
	
	return acc;
}

// function isTerminal_(cells) {

//     let count = 0;
	
// 	// debugger;

//     for(let i = 0; i < 6; i++) { 
//         for(let j = 0; j < 7; j++) {
//             if(cells[i][j] != '-') {
//                 if(j < 4) {
//                     if(cells[i][j] == cells[i][j + 1] && 
//                        cells[i][j] == cells[i][j + 2] && 
//                        cells[i][j] == cells[i][j + 3]) {
//                         return true;
//                     }
//                 }
//                 if(i < 3) {
//                     if(cells[i][j] == cells[i + 1][j] && 
//                        cells[i][j] == cells[i + 2][j] && 
//                        cells[i][j] == cells[i + 3][j]) {
//                         return true;
//                     }
//                 }
//                 if(i < 3 && j < 4) {
//                     if(cells[i][j] == cells[i + 1][j + 1] && 
//                        cells[i][j] == cells[i + 2][j + 2] && 
//                        cells[i][j] == cells[i + 3][j + 3]) {
//                         return true;
//                     }
//                 }
//             }
//             else
//                 count++;
//             if(cells[i][6 - j] != '-') {
//                 if(j < 4 && i < 3)
//                 if(cells[i][6 - j] == cells[i + 1][6 - j - 1] && 
//                    cells[i][6 - j] == cells[i + 2][6 - j - 2] && 
//                    cells[i][6 - j] == cells[i + 3][6 - j - 3]) {
//                     return true;
//                 }
//             }
//             else
//                 count++;
//         }
//     }
        
//     if(count == 0)
//         return true;
//     return false;

// }
