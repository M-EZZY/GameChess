class Rook extends QueenRookBishop {
	constructor(...args) {
		super(...args);

		this.type = "rook";
		this.value = 7;
		this.imgX = 2;

		this.directions = [
			// rook
			{x: -1, y: 0},
			{x: 1, y: 0},
			{x: 0, y: -1},
			{x: 0, y: 1},
		];

		this.hasMoved = false; //isMyFirstMove //firstMove
	}
	update(position) {
		super.update(position);
		this.hasMoved = true;
	}
}
