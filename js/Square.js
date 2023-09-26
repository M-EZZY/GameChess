class Square {
	constructor(color, x, y) {
		this.color = color;
		this.position = {x: x, y: y};
		this.piece = null;
		this.isOnFire = false;
		this.hasSelectedPiece = false;
		this.possibleMove = false; //selectedPieceCanComeHere

		this.redColor = "#cd3737";
	}
	draw(ctx, red) { //fillColor
		ctx.beginPath();
		ctx.lineWidth = unit;
		ctx.strokeStyle = red ? this.redColor : this.color;
		ctx.moveTo((this.position.x - 1) * unit, (9 - this.position.y - 0.5) * unit);
		ctx.lineTo((this.position.x) * unit, (9 - this.position.y - 0.5) * unit);
		ctx.stroke();
		// ctx.closePath();

		// if(this.piece && this.piece.isAlive && this.piece.type == "king" && this.piece.inCheck) {
		// 	color = "red";
		// }
	}
	whichPieceAt(x, y) {
		for(let i = 0; i < pieces.length; i++) {
			if(pieces[i].alive) {
				if(pieces[i].x == x && pieces[i].y == y) {
					return pieces[i];
				}
			}
		}
		/*
		piece.forEach(p => {
			p.forEach(e => {
				if(e.alive && e.x == x && e.y == y) {
					return e;
				}
			});
		});
		*/
		return 0;
	}
}
