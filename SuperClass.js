class SuperClass extends SuperSuperClass {
	constructor(imgX,color,x,y,alive){
		super(imgX,color,x,y,alive);
		this.isPinned = 0;
		this.isProtected = 0;
		this.pinnedPath = [];
	}

	/*
	movesToFind(iii,x,y){
		let currentPiece;

		//if(pieces[this.color*16].inCheck == 0){
			currentPiece=whichPieceAt(x,y);
			if(currentPiece == 0){
				this.moves.push({x:x,y:y});
			}
			else if(currentPiece.color == this.color && currentPiece != pieces[this.color*16]){
				currentPiece.isProtected = 1;
			}
			else if(currentPiece != pieces[(!this.color)*16]){
				this.moves.push({x:x,y:y});
				//check if piece is pinned
			}
			else if(currentPiece == pieces[(!this.color)*16]){
				currentPiece.inCheck++;
				if(currentPiece.inCheck == 1){
					currentPiece.checkPath.push({x:this.x,y:this.y});
					for(j=0 ; j<iii ; j++){
						currentPiece.checkPath.push({x:this.x,y:this.y});
					}
				}
			}
		//}
	}
	*/

	/*
	movesEnemyKingIsLimit(){
		for(i=0 ; i<this.possibleMoves.length ; i++){
			if(this.possibleMoves[i].x == pieces2[(!this.color)*16].x){
				if(this.possibleMoves[i].y == pieces2[(!this.color)*16].y){
					this.possibleMoves.splice(i,1);
					pieces2[(!this.color)*16].isInCheckBy++;
				}
			}
		}
	}

	isProtectedOrNot(){
		for(let i=this.color*16 ; i<(16 + this.color*16); i++){
			for(let j=0 ; j<pieces2.possibleMoves.length ; i++){
				if(this.x == pieces2[i].possibleMoves[j].x){
					if(this.y == pieces2[i].possibleMoves[j].y){
						this.isProtected = 1;
						break;
					}
				}
			}
		}
	}

	/*
	movesFriendIsLimit(){
		let currentPiece;

		for(i=0; i<this.possibleMoves.length; i++){
			currentPiece = whichPieceAt(this.possibleMoves[i].x,this.possibleMoves[i].y);
			if(currentPiece != 0){
				if(currentPiece.color == this.color){
					this.possibleMoves.splice(i,1);
				}
			}
		}
	}

	movesEnemyIsLimit(){
		let currentPiece;

		for(i=0; i<this.possibleMoves.length; i++){
			currentPiece = whichPieceAt(this.possibleMoves[i].x,this.possibleMoves[i].y);
			if(currentPiece != 0){
				if(currentPiece.color != this.color){
					for(let j=0;j<currentPiece.possibleMoves.length;j++){
						if(currentPiece.possibleMoves[j].x == this.x){
							
						}
					}
				}
			}
		}
	}
	*/
}
