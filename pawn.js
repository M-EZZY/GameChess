class Pawn extends SuperClass {

	findMovesAfterMyTurn(){
		let x;
		let y;
		
		let currentPiece;
		let currentPiece2;
		
		let ooo = this.color == 1?-1:1;
		
		//there is work to be done on this pawn straight moves, in both methods
		//straight moves are not onFire moves, and not checking piece capturing move

		/*
		//removed this moves because the king doesn't get threatened by this moves
		//only checkPath checking uses these moves, and they are not onFire
		//straight middle moves
		x = this.x;
		y = this.y + ooo*unit;
		
		if(checkBorderReached(x,y) == 0){
			currentPiece=whichPieceAt(x,y);
			if(currentPiece == 0){
				this.moves.push({x:x,y:y});
				if(this.y == unit*((this.color*7) + ooo)){
					currentPiece2=whichPieceAt(x,y + ooo*unit);
					if(currentPiece2 == 0){
						this.moves.push({x:x,y:y + ooo*unit});
					}
				}
			}
		}
		*/

		//side moves
		for(let i=0 ; i<2 ; i++){
			if(i == 0){
				x = this.x - unit;
			}
			else if(i == 1){
				x = this.x + unit;
			}
			
			y = this.y + ooo*unit;
			
			if(checkBorderReached(x,y) == 0){
				currentPiece=whichPieceAt(x,y);
				if(currentPiece == 0){
					this.moves.push({x:x,y:y});
					//this had to be added. this is a potential move of pawn against enemy king
					continue;
				}
				else if(currentPiece.color == this.color && currentPiece != pieces[this.color*16]){
					currentPiece.isProtected = 1;
				}
				else if(currentPiece == pieces[(!this.color)*16]){
					currentPiece.inCheck++;
					if(currentPiece.inCheck == 1){
						currentPiece.checkPath.push({x:this.x,y:this.y});
					}
				}
				else if(currentPiece.color != this.color){
					this.moves.push({x:x,y:y});
				}
			}
		}
	}
	findMovesBeforeMyTurn() {
		let x;
		let y;
		
		let currentPiece;
		let currentPiece2;
		
		let ooo = this.color == 1 ? -1 : 1;
		
		//straight middle moves
		x = this.x;
		y = this.y + ooo * unit;
		
		if(checkBorderReached(x, y) == 0) {
			currentPiece = whichPieceAt(x, y);
			if(currentPiece == 0){
				this.moves.push({x:x,y:y});

				if(this.y == unit*((this.color*7) + ooo)){
					currentPiece2 = whichPieceAt(x,y + ooo*unit);
					
					if(currentPiece2 == 0){
						this.moves.push({x:x,y:y + ooo*unit});
					}
				}
			}
		}

		//side moves
		for(let i=0 ; i<2 ; i++){
			if(i == 0){
				x = this.x - unit;
			}
			else if(i == 1){
				x = this.x + unit;
			}
			
			y = this.y + ooo*unit;
			
			if(checkBorderReached(x, y) == 0) {
				currentPiece = whichPieceAt(x, y);
				
				if(currentPiece != 0){
					if(currentPiece.color != this.color) {
						this.moves.push({x : x, y : y});
					}
				}
			}
		}
		if(this.isPinned) {
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
	}
}
