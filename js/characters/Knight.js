class Knight extends RegularPiece {
	constructor(...args) {
		super(...args);

		this.type = "knight";
		this.value = 3;
		this.imgX = 3;
	}

	//write 'let' in for loops initialization part
	//otherwise lot of problems that you cannot trace origin of

	findAllMoves() {
		let moves = [];

		let signs = [
			{x: -2, y: -1},
			{x: -2, y: 1},
			{x: -1, y: -2},
			{x: -1, y: 2},
			{x: 1, y: -2},
			{x: 1, y: 2},
			{x: 2, y: -1},
			{x: 2, y: 1},
		];
		
		signs.forEach(sign => {
			const position = {
				x: this.position.x + sign.x,
				y: this.position.y + sign.y
			};
			if( this.borderReached(position) == false ) {
				moves.push(position);
			}
		});

		return moves;
	}
	findMovesAfterMyTurn(squares, pieces) { //analyzing after my turn so opponent can assess it's possible moves before it's turn
		const moves = this.findAllMoves();
		
		moves.forEach(move => {
			let currentSquare = squares[move.x][move.y];
			let currentPiece = currentSquare.piece;

			// if(currentPiece) {
			// 	if(currentPiece.color == this.color) {
			// 		if(currentPiece != pieces[this.color][0]) {
			// 			// currentSquare.isOnFire = true;
			// 			currentPiece.isProtected = true;
			// 		}
			// 	} else {
			// 		if(currentPiece == pieces[this.oppositeColor()][0]) {
			// 			currentPiece.inCheck++;
		
			// 			if(currentPiece.inCheck == 1) {
			// 				currentPiece.checkPath.push({x: this.x, y: this.y});
			// 			}
			// 		}
			// 	}
			// } else {
			// 	currentSquare.isOnFire = true;
			// 	// this.moves.push(move);
			// }



			// all possible moves will put empty square on fire and protect friend pieces
			if(!currentPiece) {
				currentSquare.isOnFire = true;
			} else if(currentPiece.color == this.color && currentPiece != pieces[this.color][0]) {
				currentPiece.isProtected = true;
			} else if(currentPiece == pieces[this.oppositeColor()][0]) {
				currentPiece.inCheck++;
				
				if(currentPiece.inCheck == 1) {
					currentPiece.checkPath.push(this.position);
				}
			}



			// all possible moves will put square on fire
			// currentSquare.isOnFire = true;
			// if(currentPiece && currentPiece.color != this.color && currentPiece == pieces[this.oppositeColor()][0]) {
			// 	currentPiece.inCheck++;

			// 	if(currentPiece.inCheck == 1) {
			// 		currentPiece.checkPath.push({x: this.x, y: this.y});
			// 	}
			// }
    });
	}
	findMovesBeforeMyTurn(squares, pieces) {
		//if knight is pinned then it's moves will never match with pinned path
		//so no meaning of comparing it's moves with pinned path

		if(pieces[this.color][0].inCheck > 1 || this.isPinned) {
			
			this.moves = [];
		} else {
			const moves = this.findAllMoves();

			if(pieces[this.color][0].inCheck == 1) {
				
				moves.forEach(move => {
					for(let i = 0; i < pieces[this.color][0].checkPath.length; i++) {
						if(move.x == pieces[this.color][0].checkPath[i].x && move.y == pieces[this.color][0].checkPath[i].y) {
							this.moves.push(move);
							break;
						}
					}
				});
			} else {
				// all moves except my pieces
				moves.forEach(move => {
					let currentPiece = squares[move.x][move.y].piece;

					if( !currentPiece || (currentPiece && currentPiece.color != this.color && currentPiece != pieces[this.oppositeColor()][0]) ) {
						this.moves.push(move);
					}
					/*
					if(currentPiece) {
						if(currentPiece.color != this.color) {
							if(currentPiece != pieces[this.oppositeColor()][0]) {
								this.moves.push(move);
							}
						}
					} else {
						this.moves.push(move);
					}*/
				});
			}
		}
  }
	onlyMovesThatCanGetKingOutOfCheck() {
	}
	onlyMovesThatHasEmptyOrEnemy() {
	}
}
