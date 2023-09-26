class Bishop extends QueenRookBishop {
	constructor(...args) {
		super(...args);

		this.type = "bishop";
		this.value = 5;
		this.imgX = 4;

		this.directions = [
			// bishop
			{x: 1, y: 1},
			{x: 1, y: -1},
			{x: -1, y: -1},
			{x: -1, y: 1},
		];
	}
}
