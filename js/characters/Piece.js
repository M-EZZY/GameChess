class Piece {
	static image = new Image();

	// points:
	// 1 pawn
	// 3 knight
	// 5 bishop
	// 7 rook
	// 9 queen
	// 11 king

	constructor(color, x, y) {
		this.color = color;

		this.position = {
			x: x,
			y: y
		};

		this.square = null; //square that the piece is on right now //calculated from it's x and y

		this.isAlive = true; //alive //dead //isAlive //isDead //isCaptured

		this.moves = [];

		this.circleColor = "#207e40"; //possible moves circle color

		Piece.image.src = "images_chess/pieces.png";
	}
	draw(ctx) {
		const length = 60; //imageUnit //based on image width and height

		//ctx.drawImage(1, 2, 3, 4, 5, 6, 7, 8, 9);
		//1 parameter is the image object
		//2 and 3 parameter are for coordinates within image
		//4 and 5 are for ending coordinates in image relative to 2 and 3. so origin at 2 and 3
		//6 and 7 are for coordinates in canvas to print the image
		//8 and 9 are for setting the width and height of image
		ctx.drawImage(Piece.image, this.imgX * length, this.color * length, length, length, (this.position.x - 1) * unit, (8 - this.position.y) * unit, unit, unit);
	}
	update(position) {
		this.position = position; //position is an object with x and y

		// get square object from piece position
		// this.square = squares[this.position.x][this.position.y];
	}
	isNewInMoves(newx, newy) {
		for(let i = 0; i < this.moves.length; i++) {
			if(this.moves[i].x == newx && this.moves[i].y == newy) {
				return true;
			}
		}
		return false;
	}
	drawPossibleMoves(ctx) {
		this.moves.forEach(move => {
			ctx.beginPath();
			ctx.fillStyle = this.circleColor;
			ctx.arc((move.x - 0.5) * unit, (8.5 - move.y) * unit, unit/4, 0, Math.PI*2);
			ctx.fill();
		});
	}
	borderReached(position) {
		return (position.x < 1 || position.x > 8 || position.y < 1 || position.y > 8);
	}
	resettingAfterMyTurn() {
		this.moves = [];
	}
	oppositeColor() {
		// return (this.color == 0) ? 1 : 0;
		return (Number(!this.color));
		// return Number(!Boolean(this.color));
	}
	getCommonMoves(moves, path) {
		let temp = [];
		moves.forEach(move => {
			path.forEach(pathMove => {
				if(move.x == pathMove.x && move.y == pathMove.y) {
					temp.push(move);
				}
			});
		});
		return temp;
	}
	/*
	onlyMovesThatAreInPinnedPath(moves) {
		// onlyMovesThatDoesNotPutKingInCheck() {
		let temp = [];
	
		moves.forEach(move => {
			this.pinnedPath.forEach(pinnedPathMove => {
				if(move.x == pinnedPathMove.x && move.y == pinnedPathMove.y) {
					temp.push(move);
				}
			});
		});
		return temp;
	}*/
	/*
	onlyMovesThatAreInCheckPath(pieces, moves) {
	// onlyMovesThatCanGetKingOutOfCheck(pieces, moves) {
		let temp = [];

		moves.forEach(move => {
			pieces[this.color][0].checkPath.forEach(checkPathMove => {
				if(move.x == checkPathMove.x && move.y == checkPathMove.y) {
					temp.push(move);
				}
			});
		});
		return temp;
	}*/
}
