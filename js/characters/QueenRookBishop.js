class QueenRookBishop extends RegularPiece {
	constructor(color, x, y) {
		super(color, x, y);
	}
	findAllMoves(squares, pieces) {
		let moves = [];

		this.directions.forEach(direction => {
			let i = 1;

			while(true) {
				const position = {
					x: this.position.x + (direction.x * i),
					y: this.position.y + (direction.y * i),
				};

				if(this.borderReached(position)) { break; }
				
				let currentPiece = squares[position.x][position.y].piece;
				if(currentPiece == null || currentPiece.color != this.color) {
					moves.push(position);
				}
				if(currentPiece) { break; }
				i++;
			}
		});
		return moves;
	}
	//new iteration with new direction array implementation and if guard clauses
	findMovesAfterMyTurn(squares, pieces) {
		this.directions.forEach(direction => {

			let i = 1;

			while(true) {
				const position = {
					x: this.position.x + (direction.x * i),
					y: this.position.y + (direction.y * i),
				};

				/*
				//to draw which squares are being calculated in possible moves
				let a = [x, y];
				setTimeout(() => {
					log("2000");
					ctx2.beginPath();
					ctx2.fillStyle = "rgba(0, 0, 150, 0.5)";
					ctx2.fillRect(a[0], a[1], a[0] + unit, a[1] + unit);
				}, 1000 * ((i*8) + j), a);
				*/

				//3 ways to do this procedural coding
				//1. if guard clauses
				//2. nested if else
				//3. switch case / if & else if

				if(this.borderReached(position)) {
					break;
				}

				const currentSquare = squares[position.x][position.y];
				const currentPiece = currentSquare.piece;

				if(currentPiece == null) {

					currentSquare.isOnFire = true;
					// this.moves.push(position);
				} else if(currentPiece.color == this.color && currentPiece != pieces[this.color][0]) {

					currentSquare.isOnFire = true;
					currentPiece.isProtected = true;
					break;
				} else if(currentPiece.color != this.color && currentPiece != pieces[this.oppositeColor()][0]) {

					// see if piece is pinned
					this.checkIfPieceIsPinned(squares, pieces, direction, i, currentPiece);
					break;
				} else if(currentPiece == pieces[this.oppositeColor()][0]) {

					this.encounteredEnemyKing(squares, pieces, direction, i, currentPiece);
					break;
				}

				i++;
			}
		});
	}
	checkIfPieceIsPinned(squares, pieces, direction, i, currentPiece) {
		let j = i + 1;
		// let accomplished = false;
		while(true) {
			const position = {
				x: this.position.x + (direction.x * j),
				y: this.position.y + (direction.y * j),
			};
			
			if(this.borderReached(position)) { break; }
			
			const currentSquare2 = squares[position.x][position.y];
			const currentPiece2 = currentSquare2.piece;
			
			if(currentPiece2 == null) {
				// j++;
				// continue;
			} else if(currentPiece2.color == this.color && currentPiece2 == pieces[this.color][0]) {
				break;
			} else if(currentPiece2.color == this.color && currentPiece2 != pieces[this.color][0]) {
				currentPiece2.isProtected = true;
				break;
			} else if(currentPiece2.color != this.color && currentPiece2 == pieces[this.oppositeColor()][0]) {
				currentPiece.isPinned = true;
				
				for(let k = 0; k < j; k++) {
					currentPiece.pinnedPath.push({x: this.x + (direction.x * k), y: this.y + (direction.y * k)});
				}
				break;
			} else if(currentPiece2.color != this.color && currentPiece2 != pieces[this.oppositeColor()][0]) {
				break;
			}

			j++;
		}
	}
	encounteredEnemyKing(squares, pieces, direction, i, currentPiece) {
		currentPiece.inCheck++;

		if(currentPiece.inCheck == 1) {
			for(let j = 0; j < i; j++) {
				currentPiece.checkPath.push({x: this.position.x + (direction.x * j), y: this.position.y + (direction.y * j)});
			}
		}
		
		//protect pieces behind enemy king
		let nextPosition = {
			x: currentPiece.position.x + direction.x,
			y: currentPiece.position.y + direction.y,
		};
		if( !this.borderReached(nextPosition) ) {
			let nextSquare = squares[nextPosition.x][nextPosition.y];
			let nextPiece = nextSquare.piece;

			if(!nextPiece) {
				nextSquare.isOnFire = true;
			} else if(nextPiece.color == this.color) {
				nextPiece.isProtected = true;
			}
		}
	}
	findMovesBeforeMyTurn(squares, pieces) {
		// if(pieces[this.color][0].inCheck > 1) {
			// this.moves = [];
		// } else {
		if(pieces[this.color][0].inCheck <= 1) {
			let moves = this.findAllMoves(squares, pieces);

			if(this.isPinned) {
				moves = this.getCommonMoves(moves, this.pinnedPath);
			}

			if(pieces[this.color][0].inCheck == 1) {
				this.moves = this.getCommonMoves(moves, pieces[this.color][0].checkPath);
			} else {
				this.moves = moves;
				// this.OnlyMovesThatDoesNotPutKingInCheck();
			}
		}

		//this does not look good, upper one looks better, easily readable
		/*
		if(piece[this.color][0].inCheck == 0, 1) {
			this.findAllMoves();

			if(piece[this.color][0].inCheck == 0) {
				if(this.isPinned) {
					this.removeMovesThatPutsKingInCheck();
				}
			} else {
				if(this.isPinned == 0) {
					this.removeMovesThatCannotGetKingOutOfCheck();
				} else {
					this.moves = [];
				}
			}
		} else {
			this.moves = [];
		}*/
	}
}
