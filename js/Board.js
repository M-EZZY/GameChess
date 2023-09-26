/*
board
squares
position
*/
class Board {
	constructor() {
		this.squares = [];
		// this.position = [];

		
		this.lightColor = "#cccccc";
		this.darkColor = "#333333";

		for (let x = 1; x <= 8; x++) {
			this.squares[x] = [];
			for (let y = 1; y <= 8; y++) {
				let color = (x % 2 ? (y % 2 ? this.darkColor : this.lightColor) : (y % 2 ? this.lightColor : this.darkColor));
				this.squares[x][y] = new Square(color, x, y);
			}
		}
	}
	init() {
	}
	draw(ctx) { //drawing the chess board
		for(let y = 0; y < 8; y++) {
			// let flip = i % 2 == 0 ? 0 : 1;
			for(let x = 0; x < 8; x++) {
				/*
				y even x even = light
				y even x odd  = dark
				y odd  x even = dark
				y odd  x odd  = light
				*/
				// ctx.fillStyle = (j % 2 == flip) ? lightColor : darkColor;
				//ctx.fillRect(unit * j, unit * i, unit * (j + 1), unit * (i + 1));
				//works like this, starting coordinates and the length and width of rectangle



				// this.ctx.fillStyle = (y % 2 ? (x % 2 ? this.lightColor : this.darkColor) : (x % 2 ? this.darkColor : this.lightColor));
				// this.ctx.fillRect(this.unit * y, this.unit * x, this.unit, this.unit);



				/*
				ctx.strokeStyle="black";
				ctx.moveTo(unit*j,unit*i);
				ctx.lineTo(unit*(j+1),unit*i);
				ctx.lineWidth=unit;
				ctx.stroke();
				*/
			}
		}

		/*
		//drawing the chess board in efficient way
		ctx.fillStyle = lightColor;
		ctx.fillRect(0, 0, unit * 8, unit * 8);

		ctx.fillStyle = darkColor;
		for(let i = 0 ; i < 8 ; i++) {
			let flip = i % 2 == 0 ? 0 : 1;
			for(let j = 0 ; j < 8 ; j++) {
				if (j % 2 == flip) {
					continue;
				}
				ctx.fillRect(unit * j, unit * i, unit, unit);
			}
		}*/



		for (let x = 1; x <= 8; x++) {
			for (let y = 1; y <= 8; y++) {
				this.squares[x][y].draw(ctx);
			}
		}
	}
	update() {
	}
	check() {
	}
	whichColorSquareIs(x, y) {
		return (y % 2 ? (x % 2 ? this.lightColor : this.darkColor) : (x % 2 ? this.darkColor : this.lightColor));
	}
	bothPositionAreSame(position1, position2) {
		return (position1.x == position2.x && position1.y == position2.y);
	}
	getSquare(position) { //getSquareByPosition
		return this.squares[position.x][position.y];
	}
	getSquareByXY(x, y) {
		return this.squares[x][y];
	}
	getPiece(position) { //getPieceByPosition
		return this.squares[position.x][position.y].piece;
	}
	resettingAfterEveryTurn() { //resettingAfterMove
		this.squares.forEach((row) => {
			row.forEach((square) => {
				square.isOnFire = false;
			});
		});
	}
}
