class SetPieces {
	constructor() {
		this.black = {
			king: new King(0, 4, 0, 1),
			queen: new Queen(0, 3, 0, 0, 1),
			rook1: new Rook(0, 0, 0, 2, 2),
			rook2: new Rook(0, 7, 0, 2, 2),
			bishop1: new Bishop(0, 2, 0, 4, 3),
			bishop2: new Bishop(0, 5, 0, 4, 3),
			knight1: new Knight(0, 1, 0, 3),
			knight2: new Knight(0, 6, 0, 3),
		};
		this.white = {
			king: new King(1, 4, 7, 1),
			queen: new Queen(1, 3, 7, 0, 1),
			rook1: new Rook(1, 0, 7, 2, 2),
			rook2: new Rook(1, 7, 7, 2, 2),
			bishop1: new Bishop(1, 2, 7, 4, 3),
			bishop2: new Bishop(1, 5, 7, 4, 3),
			knight1: new Knight(1, 1, 7, 3),
			knight2: new Knight(1, 6, 7, 3),
		};

		this.pieces = [this.black, this.white];
	}
}
