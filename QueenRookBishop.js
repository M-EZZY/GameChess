class QueenRookBishop extends SuperClass {
	constructor(imgX, color, x, y, alive, whatAmI){
		super(imgX, color, x, y, alive);
		//this.iStart = iStart;
		//this.iEnd = iEnd;

		this.directions = [];
		if(whatAmI == 1) {
			this.directions = [1, 1, 1, 1, 1, 1, 1, 1];
		} else if(whatAmI == 2) {
			this.directions = [1, 0, 1, 0, 1, 0, 1, 0];
		} else if(whatAmI == 3) {
			this.directions = [0, 1, 0, 1, 0, 1, 0, 1];
		}

		//this.firstMove = 1; for the rook class
	}
	//new iteration with new direction array implementation and if guard clauses
	findMovesAfterMyTurn() {
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

		for(let i = 0 ; i <= 7 ; i++) {
			if(this.directions[i] == 0) {
				continue;
			}
			//console.log(piece[this.color][0]);
			if(i == 0) {
				xx = 0;
				yy = -1;
			} else if(i == 1) {
				xx = 1;
				yy = -1;
			} else if(i == 2) {
				xx = 1;
				yy = 0;
			} else if (i == 3){
				xx = 1;
				yy = 1;
			} else if(i == 4) {
				xx = 0;
				yy = 1;
			} else if(i == 5) {
				xx = -1;
				yy = 1;
			} else if(i == 6) {
				xx = -1;
				yy = 0;
			} else if(i == 7) {
				xx = -1;
				yy = -1;
			}
			//console.log(xx,yy);
			for(let j = 1 ; j <= 7 ; j++) {
				x = this.x + xx * unit * j;
				y = this.y + yy * unit * j;
				
				if(checkBorderReached(x, y)) {
					break;
				}
				currentPiece = whichPieceAt(x, y);
				if(currentPiece == 0) {
					this.moves.push({x : x, y : y});
					continue;
				}
				if(currentPiece == piece[this.color][0]) {
					break;
				}
				if(currentPiece.color == this.color) {
					currentPiece.isProtected = 1;
					break;
				}
				let oc = this.color ? 0 : 1;
				if(currentPiece == piece[oc][0]) {
					currentPiece.inCheck++;
					if(currentPiece.inCheck != 1) {
						break;
					}
					for(let k = 0 ; k < j ; k++) {
						currentPiece.checkPath.push({x : this.x + xx*unit*k, y : this.y + yy*unit*k});
					}
					let xxx = this.x + xx * unit * (j+1);
					let yyy = this.y + yy * unit * (j+1);

					if(checkBorderReached(xxx, yyy)) {
						break;
					}
					currentPiece2 = whichPieceAt(xxx, yyy);
					if(currentPiece2 == 0){
						this.moves.push({x : xxx, y : yyy});
						break;
					}
					if(currentPiece2.color != this.color || currentPiece2 == piece[this.color][0]) {
						break;
					}
					if(currentPiece2.color == this.color) {
						currentPiece2.isProtected = 1;
						break;
					}
					break;
				}
				if(currentPiece.color != this.color) {
					this.moves.push({x : x, y : y});
					
					for(let k = j+1 ; k <= 7 ; k++) {
						let xxx = this.x + xx * unit * k;
						let yyy = this.y + yy * unit * k;
						
						if(checkBorderReached(xxx, yyy)) {
							break;
						}
						currentPiece2 = whichPieceAt(xxx, yyy);
						if(currentPiece2 == 0) {
							continue;
						}
						let oc = this.color ? 0 : 1;
						if(currentPiece2 == piece[oc][0]) {
							currentPiece.isPinned++;
							if(currentPiece.isPinned != 1){
								break;
							}
							for(let l=0 ; l<k ; l++){
								if(l != j){
									currentPiece.pinnedPath.push({x:this.x + xx*unit*l,y:this.y + yy*unit*l});
								}
							}
							break;
						} else {
							break;
						}
					}
					break;
				}
			}
		}
	}
	findAllMoves() {
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

		for(let i = 0 ; i <= 7 ; i++) {
			if(this.directions[i] == 0) {
				continue;
			}
			if(i == 0) {
				xx = 0;
				yy = -1;
			} else if(i == 1) {
				xx = 1;
				yy = -1;
			} else if(i == 2) {
				xx = 1;
				yy = 0;
			} else if (i == 3){
				xx = 1;
				yy = 1;
			} else if(i == 4) {
				xx = 0;
				yy = 1;
			} else if(i == 5) {
				xx = -1;
				yy = 1;
			} else if(i == 6) {
				xx = -1;
				yy = 0;
			} else if(i == 7) {
				xx = -1;
				yy = -1;
			}
			console.log(xx,yy);

			for(let j = 1 ; j <= 7 ; j++) {
				x = this.x + xx * unit * j;
				y = this.y + yy * unit * j;
				
				if(checkBorderReached(x,y)){
					break;
				}
				currentPiece = whichPieceAt(x,y);
				if(currentPiece == 0){
					this.moves.push({x:x,y:y});
				}
				else if(currentPiece.color == this.color){
					break;
				}
				else if(currentPiece == pieces[(!this.color)*16]){
					break;
				}
				else if(currentPiece.color != this.color){
					this.moves.push({x:x,y:y});
					break;
				}
			}
		}
	}
	OnlyMovesThatDoesNotPutKingInCheck() {
		let temp = [];
		temp = this.moves;
		this.moves = [];

		for(let i = 0 ; i < temp.length ; i++) {
			for(let j = 0 ; j < this.pinnedPath.length ; j++) {
				if(temp[i].x == this.pinnedPath[j].x) {
					if(temp[i].y == this.pinnedPath[j].y) {
						this.moves.push({x : temp[i].x, y : temp[i].y});
					}
				}
			}
		}
	}
	OnlyMovesThatCanGetKingOutOfCheck() {
		let temp = [];
		temp = this.moves;
		this.moves = [];

		for(let j = 0 ; j < temp.length ; j++) {
			for(let k = 0 ; k < piece[this.color][0].checkPath.length ; k++) {
				if(temp[j].x == piece[this.color][0].checkPath[k].x) {
					if(temp[j].y == piece[this.color][0].checkPath[k].y) {
						this.moves.push({x : temp[j].x, y : temp[j].y});
						//totalPossibleMoves++;
					}
				}
			}
		}
	}
	findMovesBeforeMyTurn() {
		if(piece[this.color][0].inCheck == 0) {
			this.findAllMoves();
			if(this.isPinned) {
				this.OnlyMovesThatDoesNotPutKingInCheck();
			}
		} else if(piece[this.color][0].inCheck == 1 && this.isPinned == 0) {
			this.findAllMoves();
			this.OnlyMovesThatCanGetKingOutOfCheck();
		} else {
			this.moves = [];
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
