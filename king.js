class King extends SuperSuperClass {
	constructor(imgX, color, x, y, alive) {
		super(imgX, color, x, y, alive);
		this.inCheck = 0;
		this.checkPath = [];
		//checkPath means line of fire squares AND the checking pieces square
		//if inCheck == 1 then any line of fire piece or checking piece captured can get it out of check

		this.firstMove = 1;
		this.castlePossible = 0;
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

			x = this.x + xx*unit;
			y = this.y + yy*unit;
			
			if(checkBorderReached(x,y)){
				continue;
			}
			
			currentPiece = whichPieceAt(x,y);
			if(currentPiece == 0){
				//this.ifSquareOnFire(x,y);
				for(let j=(!this.color)*16 ; j<(!this.color)*16 + 16 ; j++){
					if(pieces[j].alive == 1){
						if(pieces[j].moves.length != 0){
							for(let k=0 ; k<pieces[j].moves.length ; k++){
								if(x == pieces[j].moves[k].x && y == pieces[j].moves[k].y){
									onFire++;
								}
							}
						}
					}
				}
				if(onFire == 0){
					this.moves.push({x:x,y:y});
				}
				onFire = 0;
			}
			else if(currentPiece.color == this.color){
				continue;
			}
			else if(currentPiece.color != this.color){
				console.log("execution 1");
				if(currentPiece.isProtected == 0){
					this.moves.push({x:x,y:y});
					console.log("execution came here 2");
				}
			}
		}

		/*
		//castling moves
		y = this.y;

		if(this.inCheck == 0){
			if(this.firstMove == 1){
				for(let u=-1 ; u<2 ; u+2){

					let r;
					if(u == -1){
						r = pieces[this.color*16 + 2];
					}
					else{
						r = pieces[this.color*16 + 3];
					}

					if(r.firstMove == 1){
						for(let v=1 ; v<=4; v++){
							x = this.x + unit*u*v;

							if(checkBorderReached(x,y) == 0){
								currentPiece = whichPieceAt(x,y);
								if(currentPiece == 0){
									for(let j=(!this.color)*16 ; j<(!this.color)*16 + 16 ; j++){
										if(pieces[j].alive == 1){
											if(pieces[j].moves.length != 0){
												for(let k=0 ; k<pieces[j].moves.length ; k++){
													if(x == pieces[j].moves[k].x && y == pieces[j].moves[k].y){
														onFire++;
													}
												}
											}
										}
									}
									if(onFire == 0){
										continue;
									}
									else{
										onFire = 0;
										break;
									}
								}
								else if(currentPiece == r){
									this.castlePossible = u;
									break;

								}
							}
						}
					}
				}
			}
		}
		*/
	}
	
	ifSquareOnFire(x,y){
		for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
			if(pieces[j].alive == 1){
				if(pieces[j].moves.length != 0){
					for(let k=0 ; k<pieces[j].moves.length ; k++){
						if(x != pieces[j].moves[k].x || y != pieces[j].moves[k].y){
							this.moves.push({x:x,y:y});
						}
					}
				}
			}
		}
	}

	/*
	findPossibleMoves(){
		let currentPiece;

		if(this.x != 0 && this.y != 0){
			currentPiece = whichPieceAt(this.x-unit,this.y-unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x-unit == pieces2[j].moves[k].x){
									if(this.y-unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x-unit,y:this.y-unit});
									}
								}
								else{
									this.moves.push({x:this.x-unit,y:this.y-unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x-unit,y:this.y-unit});
				}
			}
		}

		if(this.y != 0){
			currentPiece = whichPieceAt(this.x,this.y-unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x == pieces2[j].moves[k].x){
									if(this.y-unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x,y:this.y-unit});
									}
								}
								else{
									this.moves.push({x:this.x,y:this.y-unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x,y:this.y-unit});
				}
			}
		}

		if(this.x != unit*7 && this.y != 0){
			currentPiece = whichPieceAt(this.x+unit,this.y-unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x+unit == pieces2[j].moves[k].x){
									if(this.y-unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x+unit,y:this.y-unit});
									}
								}
								else{
									this.moves.push({x:this.x+unit,y:this.y-unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x+unit,y:this.y-unit});
				}
			}
		}

//

		if(this.x != 0){
			currentPiece = whichPieceAt(this.x-unit,this.y);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x-unit == pieces2[j].moves[k].x){
									if(this.y != pieces2[j].moves[k].y){
										this.moves.push({x:this.x-unit,y:this.y});
									}
								}
								else{
									this.moves.push({x:this.x-unit,y:this.y});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x-unit,y:this.y});
				}
			}
		}

		if(this.x != unit*7){
			currentPiece = whichPieceAt(this.x+unit,this.y);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x+unit == pieces2[j].moves[k].x){
									if(this.y != pieces2[j].moves[k].y){
										this.moves.push({x:this.x+unit,y:this.y});
									}
								}
								else{
									this.moves.push({x:this.x+unit,y:this.y});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x+unit,y:this.y});
				}
			}
		}

//
		if(this.x != 0 && this.y != unit*4){
			currentPiece = whichPieceAt(this.x-unit,this.y+unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x-unit == pieces2[j].moves[k].x){
									if(this.y+unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x-unit,y:this.y+unit});
									}
								}
								else{
									this.moves.push({x:this.x-unit,y:this.y+unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x-unit,y:this.y+unit});
				}
			}
		}

		if(this.y != unit*7){
			currentPiece = whichPieceAt(this.x,this.y+unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x == pieces2[j].moves[k].x){
									if(this.y+unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x,y:this.y+unit});
									}
								}
								else{
									this.moves.push({x:this.x,y:this.y+unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x,y:this.y+unit});
				}
			}
		}

		if(this.x != unit*7 && this.y != unit*7){
			currentPiece = whichPieceAt(this.x+unit,this.y+unit);
			if(currentPiece == 0){
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.x+unit == pieces2[j].moves[k].x){
									if(this.y+unit != pieces2[j].moves[k].y){
										this.moves.push({x:this.x+unit,y:this.y+unit});
									}
								}
								else{
									this.moves.push({x:this.x+unit,y:this.y+unit});
								}
							}
						}
					}
				}
			}
			else if(currentPiece.color != this.color){
				if(currentPiece.isProtected == 0){
					this.moves.push({x:this.x+unit,y:this.y+unit});
				}
			}
		}
	}

	movesEnemyEmpty(){
		let currentPiece;

		for(let i=0; i<this.moves.length; i++){
			currentPiece = whichPieceAt(this.moves[i].x,this.moves[i].y);
			if(currentPiece != 0){
				if(currentPiece.isProtected == 1){
					console.log(currentPiece.isProtected);
					this.moves.splice(i,1);
					console.log(this.moves);
				}
			}
			else{
				for(let j=(!this.color)*16; j<(!this.color)*16 + 16; j++){
					if(pieces2[j].alive == 1){
						if(pieces2[j].moves.length != 0){
							for(let k=0 ; k<pieces2[j].moves.length ; k++){
								if(this.moves[i].x == pieces2[j].moves[k].x){
									if(this.moves[i].y == pieces2[j].moves[k].y){
										this.moves.splice(i,1);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	*/
}
