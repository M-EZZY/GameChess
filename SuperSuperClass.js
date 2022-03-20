class SuperSuperClass {
	constructor(imgX, color, x, y, alive) {
		this.img = {
			x:imgUnit*imgX,
			y:imgUnit*color,
		};
		this.alive = alive;
		this.color = color;
		this.x = x;
		this.y = y;
		this.moves = [];
	}
	draw() {
		ctx.drawImage(p, this.img.x, this.img.y, imgUnit, imgUnit, this.x, this.y, unit, unit);
	}
	update(newx, newy) {
		this.x = newx;
		this.y = newy;
	}
	isNewInMoves(newx, newy) {
		for(let i=0 ; i<this.moves.length ; i++) {
			if(this.moves[i].x == newx && this.moves[i].y == newy) {
				return 1;
			}
		}
		return 0;
	}
	drawPossibleMoves() {
		let half = unit/2;

		//for(let i=0;i<this.moves.length;i++) {
		this.moves.forEach(m => {
			ctx2.beginPath();
			ctx2.fillStyle = circleColor;
			ctx2.arc(m.x + half, m.y + half, half/2, 0, Math.PI*2);
			ctx2.fill();
		});
	}
}
