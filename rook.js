class Rook extends SuperClass {

    findMovesAfterMyTurn(){
        let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

        for(let i=1 ; i<=4 ; i++){
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
                else if(currentPiece == pieces[(!this.color)*16]) {
					currentPiece.inCheck++;
                    if(currentPiece.inCheck == 1) {
                        for(let k = 0 ; k <= j+1 ; k++) {
                            if(k < j) {
								currentPiece.checkPath.push({x:this.x + xx*unit*k, y:this.y + yy*unit*k});
							}
							else if(k > j) {
								if(checkBorderReached(this.x + xx*unit*k, this.y + yy*unit*k)){
									break;
								}
								
								currentPiece2 = whichPieceAt(this.x + xx*unit*k, this.y + yy*unit*k);
								if(currentPiece2 == 0) {
									this.moves.push({x:this.x + xx*unit*k, y:this.y + yy*unit*k});
								}
								else if(currentPiece2.color == this.color) {
									if(currentPiece2 != pieces[this.color*16]) {
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

            for(j=1 ; j<=7 ; j++){
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
        let currentPiece;
        //let checkingIfPinned = 0;

        //up
        for(i=0;i<7;i++){
            if(this.y-unit*i == 0){
                break;
            }

            this.movesToFind(this.x,this.y-unit*(i+1));

            currentPiece=whichPieceAt(this.x,this.y-unit*(i+1));
            if(currentPiece == 0){
                this.moves.push({x:this.x,y:this.y-unit*(i+1)});
            }
            else if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }
            else if(currentPiece != pieces2[(!this.color)*16]){
                this.moves.push({x:this.x,y:this.y-unit*(i+1)});

                //check if piece is pinned

                break;
            }
            else if(currentPiece == pieces2[(!this.color)*16]){
                if(currentPiece.inCheck == 0){
                    currentPiece.inCheck++;
                    currentPiece.checkPath.push({x:this.x,y:this.y});
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x,y:this.y-unit*(i+1)});
                    }
                }
                break;
            }
        }

        //down
        for(i=0;i<7;i++){
            if(this.y+unit*i == unit*7){
                break;
            }

            currentPiece=whichPieceAt(this.x,this.y+unit*(i+1));
            if(currentPiece == 0){
                this.moves.push({x:this.x,y:this.y+unit*(i+1)});
            }
            else if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }
            else if(currentPiece != pieces2[(!this.color)*16]){
                this.moves.push({x:this.x,y:this.y+unit*(i+1)});
                break;
            }
            else if(currentPiece == pieces2[(!this.color)*16]){
                if(currentPiece.inCheck == 0){
                    currentPiece.inCheck++;
                    currentPiece.checkPath.push({x:this.x,y:this.y});
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x,y:this.y+unit*(i+1)});
                    }
                }
                break;
            }
        }

        //left
        for(i=0;i<7;i++){
            if(this.x-unit*i == 0){
                break;
            }

            currentPiece=whichPieceAt(this.x-unit*(i+1),this.y);
            if(currentPiece == 0){
                this.moves.push({x:this.x-unit*(i+1),y:this.y});
            }
            else if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }
            else if(currentPiece != pieces2[(!this.color)*16]){
                this.moves.push({x:this.x-unit*(i+1),y:this.y});
                break;
            }
            else if(currentPiece == pieces2[(!this.color)*16]){
                if(currentPiece.inCheck == 0){
                    currentPiece.inCheck++;
                    currentPiece.checkPath.push({x:this.x,y:this.y});
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x-unit*(i+1),y:this.y});
                    }
                }
                break;
            }
        }

        //right
        for(i=0;i<7;i++){
            if(this.x+unit*i == unit*7){
                break;
            }

            currentPiece=whichPieceAt(this.x+unit*(i+1),this.y);
            if(currentPiece == 0){
                this.moves.push({x:this.x+unit*(i+1),y:this.y});
            }
            else if(currentPiece.color == this.color){
                currentPiece.isProtected = 1;
                break;
            }
            else if(currentPiece != pieces2[(!this.color)*16]){
                this.moves.push({x:this.x+unit*(i+1),y:this.y});
                break;
            }
            else if(currentPiece == pieces2[(!this.color)*16]){
                if(currentPiece.inCheck == 0){
                    currentPiece.inCheck++;
                    currentPiece.checkPath.push({x:this.x,y:this.y});
                    for(j=0 ; j<i ; j++){
                        currentPiece.checkPath.push({x:this.x+unit*(i+1),y:this.y});
                    }
                }
                break;
            }
        }
    }

    movesBoardIsLimit(){
        for(i=0;i<7;i++){
            if(this.y-unit*i != 0){
                this.moves.push({x:this.x,y:this.y-unit*(i+1)});
            }
            else{
                break;
            }
        }
        for(i=0;i<7;i++){
            if(this.y+unit*i != unit*7){
                this.moves.push({x:this.x,y:this.y+unit*(i+1)});
            }
            else{
                break;
            }
        }
        for(i=0;i<7;i++){
            if(this.x-unit*i != 0){
                this.moves.push({x:this.x-unit*(i+1),y:this.y});
            }
            else{
                break;
            }
        }
        for(i=0;i<7;i++){
            if(this.x+unit*i != unit*7){
                this.moves.push({x:this.x+unit*(i+1),y:this.y});
            }
            else{
                break;
            }
        }
    }

    isEnemyKingInPath(){
        let i,j;
        let currentPiece;

        for(i=0;i<7;i++){
            if(this.y-unit*i != 0){
                currentPiece=whichPieceAt(this.x,this.y-unit*(i+1));
                if(currentPiece != 0){
                    if(currentPiece.color != this.color){
                        if(pieces[this.color].y == this.y-unit*i && pieces[this.color].x == this.x){
                            for(j=0;j<i;j++){
                                pieces[this.color].checkPath.push({x:this.x,y:this.y-unit*j});
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
        for(i=0;i<7;i++){
            if(this.y+unit*i != 0){
                currentPiece=whichPieceAt(this.x,this.y+unit*(i+1));
                if(currentPiece != 0){
                    if(currentPiece.color != this.color){
                        if(pieces[this.color].y == this.y+unit*i && pieces[this.color].x == this.x){
                            for(j=0;j<i;j++){
                                pieces[this.color].checkPath.push({x:this.x,y:this.y+unit*j});
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
        for(i=0;i<7;i++){
            if(this.x-unit*i != 0){
                currentPiece=whichPieceAt(this.x-unit*(i+1),this.y);
                if(currentPiece != 0){
                    if(currentPiece.color != this.color){
                        if(pieces[this.color].y == this.y && pieces[this.color].x == this.x-unit*i){
                            for(j=0;j<i;j++){
                                pieces[this.color].checkPath.push({x:this.x-unit*j,y:this.y});
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
        for(i=0;i<7;i++){
            if(this.x+unit*i != 0){
                currentPiece=whichPieceAt(this.x+unit*(i+1),this.y);
                if(currentPiece != 0){
                    if(currentPiece.color != this.color){
                        if(pieces[this.color].y == this.y && pieces[this.color].x == this.x+unit*i){
                            for(j=0;j<i;j++){
                                pieces[this.color].checkPath.push({x:this.x+unit*j,y:this.y});
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
    }
    gettingKingOutOfCheck(){
        //jh
    }
    compareSquares(){
        let i;
        let holder=[];
        for(i=0;i<this.moves.length;i++){
            for(j=0;j<pieces[this.color].checkPath.length;j++){
                if(this.moves[i].x == pieces[this.color].checkPath[j].x && this.moves[i].y == pieces[this.color].checkPath[j].y){
                    holder.push({x:this.moves[i].x,y:this.moves[i].y});
                }
            }
        }
        this.moves=[];
        for(i=0;i<holder.length;i++){
            this.findmoves.push({x:holder[i].x,y:holder[i].y});
        }
    }
    */
}

/*
class Rook{
    constructor(x,y,color,alive){
        this.x=x;
        this.y=y;
        this.color=color;
        this.img={
            x:imgUnit*2,
            y:imgUnit*color,
        };
        this.selected;
        this.alive=alive;
        this.moves = [];
    }
    update(newx,newy){
        this.x=newx;
        this.y=newy;
    }
    draw(){
        ctx.drawImage(p,this.img.x,this.img.y,imgUnit,imgUnit,this.x,this.y,unit,unit);
    }
    findAll(){
        this.moves = [];
        let k;
        for(k=1;k<=7;k++){
            this.moves.push({x:this.x,y:this.y-unit*k});
        }
        for(k=1;k<=7;k++){
            this.moves.push({x:this.x,y:this.y+unit*k});
        }
        for(k=1;k<=7;k++){
            this.moves.push({x:this.x-unit*k,y:this.y});
        }
        for(k=1;k<=7;k++){
            this.moves.push({x:this.x+unit*k,y:this.y});
        }
    }
    findmoves(){
        this.moves = [];
        let k;
        let currentPiece;

        for(k=1;k<=7;k++){
            if(this.y == 0){
                break;
            }

            currentPiece=whichPieceAt(this.x,this.y-unit*k);
            if(currentPiece == 0){
                this.moves.push({x:this.x,y:this.y-unit*k});
            }
            else{
                if(currentPiece.color == this.color){
                    break;
                }
                else{
                    this.moves.push({x:this.x,y:this.y-unit*k});
                    break;
                }
            }
        }
        for(k=1;k<=7;k++){
            if(this.y == unit*7){
                break;
            }
            
            currentPiece=whichPieceAt(this.x,this.y+unit*k);
            if(currentPiece == 0){
                this.moves.push({x:this.x,y:this.y+unit*k});
            }
            else{
                if(currentPiece.color == this.color){
                    break;
                }
                else{
                    this.moves.push({x:this.x,y:this.y+unit*k});
                    break;
                }
            }
        }
        for(k=1;k<=7;k++){
            if(this.x == 0){
                break;
            }
            
            currentPiece=whichPieceAt(this.x-unit*k,this.y);
            if(currentPiece == 0){
                this.moves.push({x:this.x-unit*k,y:this.y});
            }
            else{
                if(currentPiece.color == this.color){
                    break;
                }
                else{
                    this.moves.push({x:this.x-unit*k,y:this.y});
                    break;
                }
            }
        }
        for(k=1;k<=7;k++){
            if(this.x == unit*7){
                break;
            }
            
            currentPiece=whichPieceAt(this.x+unit*k,this.y);
            if(currentPiece == 0){
                this.moves.push({x:this.x+unit*k,y:this.y});
            }
            else{
                if(currentPiece.color == this.color){
                    break;
                }
                else{
                    this.moves.push({x:this.x+unit*k,y:this.y});
                    break;
                }
            }
        }
    }
    isPossible(newx,newy){
        let k;
        for(k=0;k<this.moves.length;k++){
            if(this.moves[k].x == newx && this.moves[k].y == newy){
                return 1;
            }
        }
        return 0;
    }
    drawAllMoves(){
        let k;
        let half=unit/2;
        for(k=0;k<this.moves.length;k++){
            ctx2.beginPath();
            ctx2.fillStyle=circleColor;
            ctx2.arc(this.moves[k].x + half,this.moves[k].y + half,half/2,0,Math.PI*2);
            ctx2.fill();
        }
    }
}
*/