class Pawn extends RegularPiece {
	constructor(...args) {
		super(...args);

		this.justMovedTwoSquares = false;

		this.type = "pawn";
		this.value = 1;
		this.imgX = 5;
	}
	findMovesAfterMyTurn(squares, pieces) {
		let allX = [this.position.x - 1, this.position.x + 1];
		let y = this.position.y + (this.color == 0 ? -1 : 1);

		allX.forEach(x => {
			if(this.borderReached({x: x, y: y})) { return; }

			let currentSquare = squares[x][y];
			let currentPiece = currentSquare.piece;

			if(!currentPiece || currentPiece.color != this.color) {
				currentSquare.isOnFire = true;
			}

			if(currentPiece) {
				if(currentPiece.color == this.color && currentPiece != pieces[this.color][0]) {
					currentPiece.isProtected = true;
				} else if(currentPiece == pieces[this.oppositeColor()][0]) {
					currentPiece.inCheck++;
					
					if(currentPiece.inCheck == 1) {
						currentPiece.checkPath.push(this.position);
					}
				}
			}
		});
	}
	findMovesBeforeMyTurn(squares, pieces) {
		if(pieces[this.color][0].inCheck <= 1) {
			let moves = this.findAllMoves(squares, pieces);

			if(this.isPinned) {
				moves = this.getCommonMoves(moves, this.pinnedPath);
			}
			if(pieces[this.color][0].inCheck == 1) {
				moves = this.getCommonMoves(moves, pieces[this.color][0].checkPath);
			}
			this.moves = moves;

			this.checkEnPassantMovePossible(squares, pieces);
		}
	}
	findAllMoves(squares, pieces) {
		let moves = [];

		//side moves
		let allX = [this.position.x - 1, this.position.x + 1];
		let y = this.position.y + (this.color == 0 ? -1 : 1);

		allX.forEach(x => {
			if(this.borderReached({x: x, y: y})) { return; }

			let currentSquare = squares[x][y];
			let currentPiece = currentSquare.piece;

			if(currentPiece && currentPiece.color != this.color) {
				moves.push({x: x, y: y});
			}
		});

		//straight moves
		let x2 = this.position.x;
		let y2 = this.position.y + (this.color == 0 ? -1 : 1);

		if(this.borderReached({x: x2, y: y2})) { return; }

		let currentSquare2 = squares[x2][y2];
		let currentPiece2 = currentSquare2.piece;

		if(!currentPiece2) {
			moves.push({x: x2, y: y2});

			if(this.position.y == (this.color == 0 ? 7 : 2)) {
				let x3 = this.position.x;
				let y3 = this.position.y + (this.color == 0 ? -2 : 2);

				let currentSquare3 = squares[x3][y3];
				let currentPiece3 = currentSquare3.piece;

				if(!currentPiece3) {
					moves.push({x: x3, y: y3});
				}
			}
		}

		return moves;
	}
	checkEnPassantMovePossible(squares, pieces) {
		if(this.position.y != (this.color ? 5 : 4)) { return; }

		[this.position.x - 1, this.position.x + 1].forEach(x => {
			if(this.borderReached({x: x, y: this.position.y})) { return; }

			let currentSquare = squares[x][this.position.y];
			let currentPiece = currentSquare.piece;

			if(currentPiece && currentPiece.type == "pawn" && currentPiece.color != this.color && currentPiece.justMovedTwoSquares) {
				this.moves.push({x: x, y: this.position.y + (this.color ? 1 : -1), enPassant: true});
			}
		});
	}
	resettingAfterMyTurn() {
		super.resettingAfterMyTurn();
		// this.justMovedTwoSquares = false;
	}
}
