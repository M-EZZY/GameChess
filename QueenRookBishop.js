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
	/*
	findMovesAfterMyTurn() {
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

		for(let i = this.iStart ; i <= this.iEnd ; i++) {
			if(i <= 4) {
				if(i <= 2){
					xx = 0;
					yy = i%2 ? -1 : 1;
				}
				else{
					xx = i%2 ? -1 : 1;
					yy = 0;
				}
			}
			else if(i <= 8){
				if(i <= 6){
					xx = i%2 ? -1 : 1;
					yy = i%2 ? -1 : 1;
				}
				else{
					xx = i%2 ? -1 : 1;
					yy = i%2 ? 1 : -1;
				}
			}
			console.log(xx,yy);

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
	*/
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

	findMovesBeforeMyTurn(){
		let x;
		let y;
		let xx;
		let yy;
		
		let currentPiece;
		let currentPiece2;

		for(let i = 0 ; i <= 7 ; i++) {
			/*
			if(i <= 4){
				if(i <= 2){
					xx = 0;
					yy = i%2 ? -1 : 1;
				}
				else{
					xx = i%2 ? -1 : 1;
					yy = 0;
				}
			}
			else if(i <= 8){
				if(i <= 6){
					xx = i%2 ? -1 : 1;
					yy = i%2 ? -1 : 1;
				}
				else{
					xx = i%2 ? -1 : 1;
					yy = i%2 ? 1 : -1;
				}
			}
			*/

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
	
	/*
	findPossibleMoves(){
		let i;
		let currentPiece;

		//rook's moves
		//up
		for(i=0;i<7;i++){
			if(this.y-unit*i == 0){
				break;
			}

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


		//bishop's moves

		for(i=0;i<7;i++){
			if(this.x+unit*i == unit*7 || this.y+unit*i == unit*7){
				break;
			}
		
			currentPiece=whichPieceAt(this.x+unit*(i+1),this.y+unit*(i+1));

			if(currentPiece == 0){
				this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
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
						currentPiece.checkPath.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
					}
				}
				break;
			}

			if(currentPiece.color != this.color){
				this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
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

	findPossibleMoves(){
		let i;
		let currentPiece;

//        this.moves = [];

		//rook's moves
		for(i=0;i<7;i++){
			if(this.y-unit*i == 0){
				break;
			}

			currentPiece=whichPieceAt(this.x,this.y-unit*(i+1));
			if(currentPiece == 0){
				this.moves.push({x:this.x,y:this.y-unit*(i+1)});
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x,y:this.y-unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
				break;
			}
		}
		for(i=0;i<7;i++){
			if(this.y+unit*i == unit*7){
				break;
			}

			currentPiece=whichPieceAt(this.x,this.y+unit*(i+1));
			if(currentPiece == 0){
				this.moves.push({x:this.x,y:this.y+unit*(i+1)});
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x,y:this.y+unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
				break;
			}
		}
		for(i=0;i<7;i++){
			if(this.x-unit*i == 0){
				break;
			}

			currentPiece=whichPieceAt(this.x-unit*(i+1),this.y);
			if(currentPiece == 0){
				this.moves.push({x:this.x-unit*(i+1),y:this.y});
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x-unit*(i+1),y:this.y});
				break;
			}
			else{
				currentPiece.isProtected = 1;
				break;
			}
		}
		for(i=0;i<7;i++){
			if(this.x+unit*i == unit*7){
				break;
			}

			currentPiece=whichPieceAt(this.x+unit*(i+1),this.y);
			if(currentPiece == 0){
				this.moves.push({x:this.x+unit*(i+1),y:this.y});
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x+unit*(i+1),y:this.y});
				break;
			}
			else{
				currentPiece.isProtected = 1;
				break;
			}
		}

		//bishop's moves
		for(i=0;i<7;i++){
			if(this.x+unit*i == unit*7 || this.y+unit*i == unit*7){
				break;
			}
			
			currentPiece=whichPieceAt(this.x+unit*(i+1),this.y+unit*(i+1));
			if(currentPiece == 0){
				this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x+unit*(i+1),y:this.y+unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
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
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x+unit*(i+1),y:this.y-unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
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
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x-unit*(i+1),y:this.y+unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
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
			}
			else if(currentPiece.color != this.color){
				this.moves.push({x:this.x-unit*(i+1),y:this.y-unit*(i+1)});
				break;
			}
			else{
				currentPiece.isProtected = 1;
				break;
			}
		}
	}
	*/
}

/*
class Queen{
	constructor(x,y,color,alive){
		this.x=x;
		this.y=y;
		this.color=color;
		this.img={
			x:0,
			y:imgUnit*color,
		};
		this.selected;
		this.alive=alive;
		this.moves = [];
	}

	draw(){
		ctx.drawImage(p,this.img.x,this.img.y,imgUnit,imgUnit,this.x,this.y,unit,unit);
	}
	update(newx,newy){
		this.x=newx;
		this.y=newy;
	}
	findAll(){
		this.moves = [];
		let k;

		//rook's moves
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

		//bishop's moves
		for(k=1;k<=7;k++){
			this.moves.push({x:this.x+unit*k,y:this.y+unit*k});
		}
		for(k=1;k<=7;k++){
			this.moves.push({x:this.x+unit*k,y:this.y-unit*k});
		}
		for(k=1;k<=7;k++){
			this.moves.push({x:this.x-unit*k,y:this.y+unit*k});
		}
		for(k=1;k<=7;k++){
			this.moves.push({x:this.x-unit*k,y:this.y-unit*k});
		}
	}
	findmoves(){
		this.moves = [];
		let k;
		let currentPiece;

		//rook's moves
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

		//bishop's moves
		for(k=1;k<=7;k++){
			if(this.y == unit*7){
				break;
			}
			
			currentPiece=whichPieceAt(this.x+unit*k,this.y+unit*k);
			if(currentPiece == 0){
				this.moves.push({x:this.x+unit*k,y:this.y+unit*k});
			}
			else{
				if(currentPiece.color == this.color){
					break;
				}
				else{
					this.moves.push({x:this.x+unit*k,y:this.y+unit*k});
					break;
				}
			}
		}
		for(k=1;k<=7;k++){
			if(this.y == 0){
				break;
			}
			
			currentPiece=whichPieceAt(this.x+unit*k,this.y-unit*k);
			if(currentPiece == 0){
				this.moves.push({x:this.x+unit*k,y:this.y-unit*k});
			}
			else{
				if(currentPiece.color == this.color){
					break;
				}
				else{
					this.moves.push({x:this.x+unit*k,y:this.y-unit*k});
					break;
				}
			}
		}
		for(k=1;k<=7;k++){
			if(this.y == unit*7){
				break;
			}
			
			currentPiece=whichPieceAt(this.x-unit*k,this.y+unit*k);
			if(currentPiece == 0){
				this.moves.push({x:this.x-unit*k,y:this.y+unit*k});
			}
			else{
				if(currentPiece.color == this.color){
					break;
				}
				else{
					this.moves.push({x:this.x-unit*k,y:this.y+unit*k});
					break;
				}
			}
		}
		for(k=1;k<=7;k++){
			if(this.y == 0){
				break;
			}
			
			currentPiece=whichPieceAt(this.x-unit*k,this.y-unit*k);
			if(currentPiece == 0){
				this.moves.push({x:this.x-unit*k,y:this.y-unit*k});
			}
			else{
				if(currentPiece.color == this.color){
					break;
				}
				else{
					this.moves.push({x:this.x-unit*k,y:this.y-unit*k});
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