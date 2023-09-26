class Queen extends QueenRookBishop {
	constructor(...args) {
		super(...args);

		this.type = "queen";
		this.value = 9;
		this.imgX = 0;

		this.directions = [
			// rook
			{x: -1, y: 0},
			{x: 1, y: 0},
			{x: 0, y: -1},
			{x: 0, y: 1},

			// bishop
			{x: 1, y: 1},
			{x: 1, y: -1},
			{x: -1, y: -1},
			{x: -1, y: 1},
		];
	}
}
