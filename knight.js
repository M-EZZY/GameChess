class Knight extends SuperClass {
	
	//write 'let' in for loops initialization part
	//otherwise lot of problems that you cannot trace origin of

	findMovesAfterMyTurn(){
        let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;

        for(let i=1 ; i<=8 ; i++){
            if(i == 1){
                xx = -1;
                yy = -2;
            }
            else if(i == 2){
				xx = 1;
                yy = -2;
            }
            else if(i == 3){
                xx = 2;
                yy = -1;
            }
            else if(i == 4){
				xx = 2;
                yy = 1;
            }
			//
			else if(i == 5){
                xx = 1;
                yy = 2;
            }
            else if(i == 6){
				xx = -1;
                yy = 2;
            }
            else if(i == 7){
                xx = -2;
                yy = 1;
            }
            else if(i == 8){
				xx = -2;
                yy = -1;
            }

			x = this.x + xx*unit;
            y = this.y + yy*unit;
				
			if(checkBorderReached(x,y)){
				continue;
			}
            
			currentPiece = whichPieceAt(x,y);
            if(currentPiece == 0){
                this.moves.push({x:x,y:y});
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
	
	findMovesBeforeMyTurn(){
        let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;

        for(let i=1 ; i<=8 ; i++){
            if(i == 1){
                xx = -1;
                yy = -2;
            }
            else if(i == 2){
				xx = 1;
                yy = -2;
            }
            else if(i == 3){
                xx = 2;
                yy = -1;
            }
            else if(i == 4){
				xx = 2;
                yy = 1;
            }
			//
			else if(i == 5){
                xx = 1;
                yy = 2;
            }
            else if(i == 6){
				xx = -1;
                yy = 2;
            }
            else if(i == 7){
                xx = -2;
                yy = 1;
            }
            else if(i == 8){
				xx = -2;
                yy = -1;
            }

			x = this.x + xx*unit;
            y = this.y + yy*unit;

			if(checkBorderReached(x,y)){
				continue;
			}
			
			currentPiece = whichPieceAt(x,y);
            if(currentPiece == 0 || currentPiece.color != this.color){
                this.moves.push({x:x,y:y});
            }
        }
    }
	
	/*
	findPossibleMoves(){
        let currentPiece;

        //
        if(this.x != 0 && this.y >= 2){
            currentPiece = whichPieceAt(this.x-unit,this.y-unit*2);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x-unit,y:this.y-unit*2});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        if(this.x != unit*7 && this.y >= 2){
            currentPiece = whichPieceAt(this.x+unit,this.y-unit*2);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x+unit,y:this.y-unit*2});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        //
        if(this.x != 0 && this.y <= unit*5){
            currentPiece = whichPieceAt(this.x-unit,this.y+unit*2);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x-unit,y:this.y+unit*2});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        if(this.x != unit*7 && this.y <= unit*5){
            currentPiece = whichPieceAt(this.x+unit,this.y+unit*2);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x+unit,y:this.y+unit*2});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        //
        if(this.x >= unit*2 && this.y != 0){
            currentPiece = whichPieceAt(this.x-unit*2,this.y-unit);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x-unit*2,y:this.y-unit});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        if(this.x >= unit*2 && this.y != unit*7){
            currentPiece = whichPieceAt(this.x-unit*2,this.y+unit);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x-unit*2,y:this.y+unit});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        //
        if(this.x <= unit*5 && this.y != 0){
            currentPiece = whichPieceAt(this.x+unit*2,this.y-unit);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x+unit*2,y:this.y-unit});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }

        if(this.x <= unit*5 && this.y != unit*7){
            currentPiece = whichPieceAt(this.x+unit*2,this.y+unit);
            if(currentPiece == 0){
                if(currentPiece.color != this.color){
                    this.moves.push({x:this.x+unit*2,y:this.y+unit});
                }
                else{
                    currentPiece.isProtected = 1;
                }
            }
        }
    }
	*/
}
