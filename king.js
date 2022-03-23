class King extends SuperSuperClass {
	constructor(imgX, color, x, y, alive) {
		super(imgX, color, x, y, alive);
		this.inCheck = 0;
		this.checkPath = [];
		//checkPath means line of fire squares AND the checking pieces square
		//if inCheck == 1 then any line of fire piece or checking piece captured can get it out of check

		this.firstMove = 1;
		this.castlePossible = [0, 0];
		this.castle = {
			left : {
				possible : 0,
				kingx : unit * 2,
				rookx : unit * 3,
			},
			right : {
				possible : 0,
				kingx : unit * 6,
				rookx : unit * 5,
			},
		};
	}
	findMovesAfterMyTurn(){
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;

		for(let i=1 ; i<=8 ; i++){
			//rook's moves
			if(i == 1){
				xx = 0;
				yy = -1;
			}
			else if(i == 2){
				xx = 0;
				yy = 1;
			}
			else if(i == 3){
				xx = -1;
				yy = 0;
			}
			else if(i == 4){
				xx = 1;
				yy = 0;
			}
			
			//bishop's moves
			else if(i == 5){
				xx = -1;
				yy = -1;
			}
			else if(i == 6){
				xx = 1;
				yy = 1;
			}
			else if(i == 7){
				xx = -1;
				yy = 1;
			}
			else if(i == 8){
				xx = 1;
				yy = -1;
			}

			x = this.x + xx*unit;
			y = this.y + yy*unit;
			
			if(checkBorderReached(x, y)) {
				continue;
			}
			currentPiece = whichPieceAt(x, y);
			if(currentPiece == 0){
				this.moves.push({x : x, y : y});
			}
			else if(currentPiece.color == this.color){
				currentPiece.isProtected = 1;
			}
			else if(currentPiece.color != this.color && currentPiece != pieces[(!this.color)*16]){
				this.moves.push({x:x,y:y});
			}
		}
	}
	findMovesBeforeMyTurn(){
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		
		let onFire = 0;

		for(let i=1 ; i<=8 ; i++){
			//rook's moves
			if(i == 1){
				xx = 0;
				yy = -1;
			}
			else if(i == 2){
				xx = 0;
				yy = 1;
			}
			else if(i == 3){
				xx = -1;
				yy = 0;
			}
			else if(i == 4){
				xx = 1;
				yy = 0;
			}
			
			//bishop's moves
			else if(i == 5){
				xx = -1;
				yy = -1;
			}
			else if(i == 6){
				xx = 1;
				yy = 1;
			}
			else if(i == 7){
				xx = -1;
				yy = 1;
			}
			else if(i == 8){
				xx = 1;
				yy = -1;
			}

			x = this.x + xx * unit;
			y = this.y + yy * unit;
			
			if(checkBorderReached(x, y)) {
				continue;
			}
			currentPiece = whichPieceAt(x, y);
			if(currentPiece == 0) {
				if(this.squareIsOnFire(x,y) == 0) {
					log("69");
					this.moves.push({x : x, y : y});
				}
			} else if(currentPiece.color == this.color) {
				continue;
			} else if(currentPiece.color != this.color) {
				log("70");
				if(currentPiece.isProtected == 0) {
					this.moves.push({x:x,y:y});
					log("71");
				}
			}
		}
	}
	checkCastleMovePossible() {
		if(this.inCheck == 0) {
			if(this.firstMove == 1) {
				//first rook
				if(piece[this.color][2].alive == 1) {
					if(piece[this.color][2].firstMove == 1) {
						let x = [this.x - unit, this.x - unit * 2, this.x - unit * 3];

						if(whichPieceAt(x[0], this.y) == 0) {
							if(whichPieceAt(x[1], this.y) == 0) {
								if(whichPieceAt(x[2], this.y) == 0) {
									if(this.squareIsOnFire(x[0], this.y) == 0) {
										if(this.squareIsOnFire(x[1], this.y) == 0) {
											this.castle.left.possible = 1;
											this.moves.push({x : unit * 2, y : this.y});
										}
									}
								}
							}
						}
					}
				}
				//second rook
				if(piece[this.color][3].alive == 1) {
					if(piece[this.color][3].firstMove == 1) {
						let x = [this.x + unit, this.x + unit * 2];

						if(whichPieceAt(x[0], this.y) == 0) {
							if(whichPieceAt(x[1], this.y) == 0) {
								if(this.squareIsOnFire(x[0], this.y) == 0) {
									if(this.squareIsOnFire(x[1], this.y) == 0) {
										this.castle.right.possible = 1;
										this.moves.push({x : unit * 6, y : this.y});
									}
								}
							}
						}
					}
				}
			}
		}
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
	}
}
