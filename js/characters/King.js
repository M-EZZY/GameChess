class King extends Piece {
	constructor(...args) {
		super(...args);

		this.directions = [
			// rook
			{x: -1, y: 0},
			{x: 1, y: 0},
			{x: 0, y: -1},
			{x: 0, y: 1},

			// bishop
			{x: 1, y: 1},
			{x: 1, y: -1},
			{x: -1, y: -1},
			{x: -1, y: 1},
		];

		this.inCheck = 0;
		this.checkPath = [];
		//checkPath means line of fire squares AND the checking pieces square
		//if inCheck == 1 then any line of fire piece or checking piece captured can get it out of check

		// for castling purposes
		this.hasMoved = false;
		this.castlePossible = [0, 0];
		
		this.castle = {
			left : {
				possible : 0,
				kingx : 2,
				rookx : 3,
			},
			right : {
				possible : 0,
				kingx : 6,
				rookx : 5,
			},
		};

		this.castleMoves = [
			{
				possible: false,
				king: {
					start: {
						x: 5,
						y: (this.color ? 1 : 8),
					},
					end: {
						x: 3,
						y: (this.color ? 1 : 8),
					},
				},
				rook: {
					start: {
						x: 1,
						y: (this.color ? 1 : 8),
					},
					end: {
						x: 4,
						y: (this.color ? 1 : 8),
					},
				},
			},
			{
				possible: false,
				y: (this.color ? 1 : 8),
				kingStartX: 5,
				kingEndX: 7,
				rookStartX: 8,
				rookEndX: 6,
			},
		];

		this.castleMoves = [
			{
				possible: false,
				y: (this.color ? 1 : 8),
				kingStartX: 5,
				kingEndX: 3,
				rookStartX: 1,
				rookEndX: 4,
			},
			{
				possible: false,
				y: (this.color ? 1 : 8),
				kingStartX: 5,
				kingEndX: 7,
				rookStartX: 8,
				rookEndX: 6,
			},
		];

		this.type = "king";
		this.value = 11;
		this.imgX = 1;
	}
	findMovesAfterMyTurn(squares, pieces) {
		this.directions.forEach(direction => {
			const position = {
				x: this.position.x + direction.x,
				y: this.position.y + direction.y,
			};

			if(this.borderReached(position)) { return; }

			let currentSquare = squares[position.x][position.y];
			let currentPiece = currentSquare.piece;
			
			currentSquare.isOnFire = true;

			if(currentPiece && currentPiece.color == this.color) {
				currentPiece.isProtected = true;
			}
		});
	}
	findMovesBeforeMyTurn(squares, pieces) {
		this.directions.forEach(direction => {
			let position = {
				x: this.position.x + direction.x,
				y: this.position.y + direction.y,
			};

			if(this.borderReached(position)) { return; }

			let currentSquare = squares[position.x][position.y];
			let currentPiece = currentSquare.piece;

			if(currentPiece == null && currentSquare.isOnFire == false) {
				this.moves.push(position);
			} else if( (currentPiece != null) && (currentPiece.color != this.color) && (currentPiece.isProtected == false) ) {
				this.moves.push(position);
			}
		});

		this.checkCastleMovePossible(squares, pieces);
	}
	checkCastleMovePossible(squares, pieces) {
		console.log(this.inCheck, this.hasMoved);

		if(this.inCheck || this.hasMoved) { return; }

		this.castleMoves.forEach(castle => {
			let rookSquare = squares[castle.rookStartX][this.position.y];
			let rook = rookSquare.piece;

			console.log(rookSquare, rook);
			
			if(rook && rook.type == "rook" && rook.color == this.color && rook.hasMoved == false) {
				let kingSquare = squares[castle.kingStartX][this.position.y]; // squares[this.position.x][this.position.y];
				let king = kingSquare.piece;
				
				let betweenSquares = [];

				let side = castle.kingStartX > castle.rookStartX ? -1 : 1;

				console.log(kingSquare, king, side);

				let i = this.position.x + side;
				while(i != 1 && i != 8) {
					let square = squares[i][this.position.y];

					if(square.piece == null && square.isOnFire == false) {
						betweenSquares.push(square);
					}
					i = i + side;

					console.log(square, square.piece, i);
				}

				console.log(betweenSquares, Math.abs(castle.kingStartX - castle.rookStartX));

				if(betweenSquares.length + 1 == Math.abs(castle.kingStartX - castle.rookStartX )) {
					castle.possible = true;
					this.moves.push({x: castle.kingEndX, y: this.position.y});
				}
			}
		});
	}
	squareIsOnFire(x, y) {
		let onFireBy = 0;
		let oc = this.color ? 0 : 1;

		for(let j = 0 ; j < piece[oc].length ; j++) {
			if(piece[oc][j].alive == 1) {
				if(piece[oc][j].moves.length != 0) {
					for(let k = 0 ; k < piece[oc][j].moves.length ; k++) {
						if(x == piece[oc][j].moves[k].x && y == piece[oc][j].moves[k].y) {
							onFireBy++;
						}
					}
				}
			}
		}
		return onFireBy;
		
		// there is no need for this. any move near king in checkpath is in onFire moves
	}
	resettingAfterMyTurn() {
		super.resettingAfterMyTurn();
		// this.moves = [];

		this.inCheck = 0;
		this.checkPath = [];
		this.castleMoves.forEach(castle => {
			castle.possible = false;
		});
		// this.castle.left.possible = 0;
		// this.castle.right.possible = 0;
	}
	update(position) {
		super.update(position);
		this.hasMoved = true;
	}
}
