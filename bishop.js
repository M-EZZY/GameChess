class Bishop extends SuperClass {
	
	findMovesAfterMyTurn(){
        let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

        for(let i=1 ; i<=4 ; i++){
            if(i == 1){
                xx = -1;
                yy = -1;
            }
            else if(i == 2){
				xx = 1;
                yy = 1;
            }
            else if(i == 3){
                xx = -1;
                yy = 1;
            }
            else if(i == 4){
				xx = 1;
                yy = -1;
            }

            for(let j=1 ; j<=7 ; j++){
				x = this.x + xx*unit*j;
                y = this.y + yy*unit*j;
				
				if(checkBorderReached(x,y)){
					break;
				}
            
				currentPiece = whichPieceAt(x,y);
                if(currentPiece == 0){
                    this.moves.push({x:x,y:y});
                }
                else if(currentPiece == pieces[this.color*16]){
                    break;
                }
				else if(currentPiece.color == this.color){
					currentPiece.isProtected = 1;
					break;
				}
                else if(currentPiece == pieces[(!this.color)*16]){
					currentPiece.inCheck++;
                    if(currentPiece.inCheck == 1){
                        for(let k=0 ; k<=j+1 ; k++){
                            if(k < j){
								currentPiece.checkPath.push({x:this.x + xx*unit*k,y:this.y + yy*unit*k});
							}
							else if(k > j){
								if(checkBorderReached(this.x + xx*unit*k,this.y + yy*unit*k)){
									break;
								}
								
								currentPiece2 = whichPieceAt(this.x + xx*unit*k,this.y + yy*unit*k);
								if(currentPiece2 == 0){
									this.moves.push({x:this.x + xx*unit*k,y:this.y + yy*unit*k});
								}
								else if(currentPiece2.color == this.color){
									if(currentPiece2 != pieces[this.color*16]){
										currentPiece2.isProtected = 1;
									}
								}
							}
                        }
                    }
					break;
                }
				else if(currentPiece.color != this.color){
					this.moves.push({x:x,y:y});
					
					for(let k=j+1 ; k<=7 ; k++){
						if(checkBorderReached(this.x + xx*unit*k,this.y + yy*unit*k) == 0){
							
							currentPiece2 = whichPieceAt(this.x + xx*unit*k,this.y + yy*unit*k);
							if(currentPiece2 != 0){
								if(currentPiece2 == pieces[(!this.color)*16]){
									currentPiece.isPinned++;
									if(currentPiece.isPinned == 1){
										for(let l=0 ; l<k ; l++){
											if(l != j){
												currentPiece.pinnedPath.push({x:this.x + xx*unit*l,y:this.y + yy*unit*l});
											}
										}
										break;
									}
									else{
										break;
									}
								}
								else{
									break;
								}
							}
						}
						else{
							break;
						}
					}
					break;
				}
            }
        }
    }
	
	findMovesBeforeMyTurn(){
        let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

        for(let i=1 ; i<=4 ; i++){
            if(i == 1){
                xx = -1;
                yy = -1;
            }
            else if(i == 2){
				xx = 1;
                yy = 1;
            }
            else if(i == 3){
                xx = -1;
                yy = 1;
            }
            else if(i == 4){
				xx = 1;
                yy = -1;
            }

            for(let j=1 ; j<=7 ; j++){
				x = this.x + xx*unit*j;
                y = this.y + yy*unit*j;
				
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
	
	/*
    findPossibleMoves(){
        let i;
		let x;
		let y;
        let currentPiece;

        for(i=0;i<7;i++){
			x = this.x + unit*i;
        	y = this.y + unit*i;
        	
            if(this.checkBorderReached(x,y)){
                break;
            }
        
            currentPiece=whichPieceAt(this.x+unit*(i+1),this.y+unit*(i+1));

            if(currentPiece == 0){
                this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
                continue;
            }

            if(currentPiece.color == this.color && currentPiece != pieces[this.color*16]){
                currentPiece.isProtected = 1;
                break;
            }

            if(currentPiece == pieces[(!this.color)*16]){
                currentPiece.inCheck++;
                currentPiece.checkPath.push({x:this.x,y:this.y});
                if(currentPiece.inCheck == 1){
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
                    }
                }
                break;
            }

            if(currentPiece.color != this.color){
                this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
                for(j=i+1;j<7;j++){
                	currentPiece2 = whichPieceAt(this.x+unit*j,this.y+unit*j);
                	if(currentPiece2 == pieces[(!this.color)*16]){
                		currentPiece.isPinned++;
                		if(currentPiece.isPinned == 1){
                			for(k=0;k<=j;k++){
                				if(k != i){
                					currentPiece.pinnedPath.push({x:this.x+unit*k,y:this.y+unit*k});
                				}
                			}
                		}
                	}
                }
                break;
            }
        }

        for(i=0;i<7;i++){
            if(this.x+unit*i == unit*7 || this.y-unit*i == 0){
                break;
            }
        
            currentPiece=whichPieceAt(this.x+unit*(i+1),this.y-unit*(i+1));

            if(currentPiece == 0){
                this.moves.push({x:this.x+unit*(i+1),y:this.y-unit*(i+1)});
                continue;
            }

            if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }

            if(currentPiece == pieces2[(!this.color)*16]){
                currentPiece.inCheck++;
                currentPiece.checkPath.push({x:this.x,y:this.y});
                if(currentPiece.inCheck == 1){
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x+unit*(i+1),y:this.y-unit*(i+1)});
                    }
                }
                break;
            }

            if(currentPiece.color != this.color){
                this.moves.push({x:this.x+unit*(i+1),y:this.y-unit*(i+1)});
                break;
            }
        }

        for(i=0;i<7;i++){
            if(this.x-unit*i == 0 || this.y+unit*i == unit*7){
                break;
            }
        
            currentPiece=whichPieceAt(this.x-unit*(i+1),this.y+unit*(i+1));

            if(currentPiece == 0){
                this.moves.push({x:this.x-unit*(i+1),y:this.y+unit*(i+1)});
                continue;
            }

            if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }

            if(currentPiece == pieces2[(!this.color)*16]){
                currentPiece.inCheck++;
                currentPiece.checkPath.push({x:this.x,y:this.y});
                if(currentPiece.inCheck == 1){
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x-unit*(i+1),y:this.y+unit*(i+1)});
                    }
                }
                break;
            }

            if(currentPiece.color != this.color){
                this.moves.push({x:this.x-unit*(i+1),y:this.y+unit*(i+1)});
                break;
            }
        }

        for(i=0;i<7;i++){
            if(this.x-unit*i == 0 || this.y-unit*i == 0){
                break;
            }
        
            currentPiece=whichPieceAt(this.x-unit*(i+1),this.y-unit*(i+1));

            if(currentPiece == 0){
                this.moves.push({x:this.x-unit*(i+1),y:this.y-unit*(i+1)});
                continue;
            }

            if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }

            if(currentPiece == pieces2[(!this.color)*16]){
                console.log(currentPiece);
                currentPiece.inCheck++;
                currentPiece.checkPath.push({x:this.x,y:this.y});
                if(currentPiece.inCheck == 1){
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x-unit*(i+1),y:this.y-unit*(i+1)});
                    }
                }
                break;
            }

            if(currentPiece.color != this.color){
                this.moves.push({x:this.x-unit*(i+1),y:this.y-unit*(i+1)});
                break;
            }
        }
    }
	
    movesBoardIsLimit(){
        for(i=0;i<7;i++){
            if(this.x+unit*i == unit*7){
                break;
            }
            if(this.y+unit*i == unit*7){
                break;
            }
            this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
        }
        for(i=0;i<7;i++){
            if(this.x+unit*i == unit*7){
                break;
            }
            if(this.y-unit*i == 0){
                break;
            }
            this.moves.push({x:this.x+unit*(i+1),y:this.y-unit*(i+1)});
        }
        for(i=0;i<7;i++){
            if(this.x-unit*i == 0){
                break;
            }
            if(this.y+unit*i == unit*7){
                break;
            }
            this.moves.push({x:this.x-unit*(i+1),y:this.y+unit*(i+1)});
        }
        for(i=0;i<7;i++){
            if(this.x-unit*i == 0){
                break;
            }
            if(this.y-unit*i == 0){
                break;
            }
            this.moves.push({x:this.x-unit*(i+1),y:this.y-unit*(i+1)});
        }
    }

    movesFriendIsLimit(){
        let currentPiece;

        for(i=0; i<this.moves.length; i++){
            currentPiece = whichPieceAt(this.moves[i].x,this.moves[i].y);
            if(currentPiece != 0){
                if(currentPiece.color == this.color){
                    currentPiece.isProtected = 1;
                    this.moves.splice(i,1);
                }
            }
        }
    }

    movesEnemyIsLimit(){
        let currentPiece;

        for(i=0; i<this.moves.length; i++){
            currentPiece = whichPieceAt(this.moves[i].x,this.moves[i].y);
            if(currentPiece != 0){
                if(currentPiece.color != this.color)
                    for(let j=0;j<currentPiece.moves.length;j++){
                        if(this.x == currentPiece.moves[j].x){
                            if(this.y == currentPiece.moves[j].y){
                                this.isInCheckByHowMany++;
                                this.isInCheckBy.push(currentPiece);
                                
                                if(currentPiece.protected == 1){
                                    this.moves.splice(j,1);
                                }
                                
                            }
                        }
                    }
                    currentPiece.isProtectedOrNot();
                    if(currentPiece.isProtected){
                        this.moves.splice(i,1);
                    }
//                }
            }
        }
    }
    */
}
