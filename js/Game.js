// import King from "./characters/king.js";

class Game {
	constructor() {
		this.players = ["Player 0", "Player 1"];

		this.turn = 1; //playerTurn
		
		this.action = "select"; //move //selectOrMove

		this.selectedSquare = null; //selected piece's square coordinates
		this.moveToSquare = null; //coordinates of square where piece will go
		
		this.selectedPiece = null;
		this.capturedPiece = null;

		this.winner = null;

		/*
		let color1; //square color of selected piece
		let color2; //square color where selected piece is gonna go
		*/

		this.padding = {x: 0, y: 0};

		this.board = new Board();
		// this.board.init();

		this.squares = this.board.squares; //for convenience

		//based on screen width and height
		this.unit = Math.floor(window.innerWidth < window.innerHeight ? window.innerWidth / 8 : window.innerHeight / 8);

		this.canvas = document.createElement("canvas");

		this.canvas.addEventListener("click", this.handleClickSquare.bind(this));

		this.ctx = this.canvas.getContext("2d");

		document.getElementById("root").appendChild(this.canvas);

		this.canvas.width = this.unit * 8;
		this.canvas.height = this.unit * 8;


		//creating pieces
		//new better piece organization, you can easily push new piece at end and king position won't change at all

		// this.pieces = new SetPieces();

		this.p = { // this can be array so you can use this.color in array
			black: {
				king: new King(0, 5, 8),
				queen: new Queen(0, 4, 8),
				rook1: new Rook(0, 1, 8),
				rook2: new Rook(0, 8, 8),
				bishop1: new Bishop(0, 3, 8),
				bishop2: new Bishop(0, 6, 8),
				knight1: new Knight(0, 2, 8),
				knight2: new Knight(0, 7, 8),
				// knights: [],
				// pawns: [],
			},
			white: {
				king: new King(1, 5, 1),
				queen: new Queen(1, 4, 1),
				rook1: new Rook(1, 1, 1),
				rook2: new Rook(1, 8, 1),
				bishop1: new Bishop(1, 3, 1),
				bishop2: new Bishop(1, 6, 1),
				knight1: new Knight(1, 2, 1),
				knight2: new Knight(1, 7, 1),
			}
		}

		for(let x = 1; x <= 8; x++) {
			this.p.black["pawn" + x] = new Pawn(0, x, 7);
			this.p.white["pawn" + x] = new Pawn(1, x, 2);
		}

		this.pieces = [[], []];

		// this.pieces = [];
		// this.pieces[0] = [];
		// this.pieces[1] = [];

		this.pieces[0].push(this.p.black.king);
		this.pieces[0].push(this.p.black.queen);
		this.pieces[0].push(this.p.black.rook1);
		this.pieces[0].push(this.p.black.rook2);
		this.pieces[0].push(this.p.black.bishop1);
		this.pieces[0].push(this.p.black.bishop2);
		this.pieces[0].push(this.p.black.knight1);
		this.pieces[0].push(this.p.black.knight2);
		this.pieces[0].push(this.p.black.pawn1);
		this.pieces[0].push(this.p.black.pawn2);
		this.pieces[0].push(this.p.black.pawn3);
		this.pieces[0].push(this.p.black.pawn4);
		this.pieces[0].push(this.p.black.pawn5);
		this.pieces[0].push(this.p.black.pawn6);
		this.pieces[0].push(this.p.black.pawn7);
		this.pieces[0].push(this.p.black.pawn8);

		this.pieces[1].push(this.p.white.king);
		this.pieces[1].push(this.p.white.queen);
		this.pieces[1].push(this.p.white.rook1);
		this.pieces[1].push(this.p.white.rook2);
		this.pieces[1].push(this.p.white.bishop1);
		this.pieces[1].push(this.p.white.bishop2);
		this.pieces[1].push(this.p.white.knight1);
		this.pieces[1].push(this.p.white.knight2);
		this.pieces[1].push(this.p.white.pawn1);
		this.pieces[1].push(this.p.white.pawn2);
		this.pieces[1].push(this.p.white.pawn3);
		this.pieces[1].push(this.p.white.pawn4);
		this.pieces[1].push(this.p.white.pawn5);
		this.pieces[1].push(this.p.white.pawn6);
		this.pieces[1].push(this.p.white.pawn7);
		this.pieces[1].push(this.p.white.pawn8);



		//initializing
		this.p.white.knight1.moves = [
			{x: 1, y: 3},
			{x: 3, y: 3}
		];
		this.p.white.knight2.moves = [
			{x: 6, y: 3},
			{x: 8, y: 3}
		];

		for(let i=8; i<16; i++) {
			this.pieces[this.turn][i].moves.push(
				{x: this.pieces[this.turn][i].position.x, y: this.pieces[this.turn][i].position.y + 1},
				{x: this.pieces[this.turn][i].position.x, y: this.pieces[this.turn][i].position.y + 2},
			);
		}



		// arranging all pieces on board in their initial position
		// this.board.squares[8][1].piece = this.pieces.black.rook1;
		// this.board.squares[8][2].piece = this.pieces.black.knight1;
		// this.board.squares[8][3].piece = this.pieces.black.bishop1;
		// this.board.squares[8][4].piece = this.pieces.black.queen;
		// this.board.squares[8][5].piece = this.pieces.black.king;
		// this.board.squares[8][6].piece = this.pieces.black.bishop2;
		// this.board.squares[8][7].piece = this.pieces.black.knight2;
		// this.board.squares[8][8].piece = this.pieces.black.rook2;

		// this.board.squares[7][1].piece = this.pieces.black.pawn1;
		// this.board.squares[7][2].piece = this.pieces.black.pawn2;
		// this.board.squares[7][3].piece = this.pieces.black.pawn3;
		// this.board.squares[7][4].piece = this.pieces.black.pawn4;
		// this.board.squares[7][5].piece = this.pieces.black.pawn5;
		// this.board.squares[7][6].piece = this.pieces.black.pawn6;
		// this.board.squares[7][7].piece = this.pieces.black.pawn7;
		// this.board.squares[7][8].piece = this.pieces.black.pawn8;

		// this.board.squares[1][1].piece = this.pieces.white.rook1;
		// this.board.squares[1][2].piece = this.pieces.white.knight1;
		// this.board.squares[1][3].piece = this.pieces.white.bishop1;
		// this.board.squares[1][4].piece = this.pieces.white.queen;
		// this.board.squares[1][5].piece = this.pieces.white.king;
		// this.board.squares[1][6].piece = this.pieces.white.bishop2;
		// this.board.squares[1][7].piece = this.pieces.white.knight2;
		// this.board.squares[1][8].piece = this.pieces.white.rook2;

		// this.board.squares[2][1].piece = this.pieces.white.pawn1;
		// this.board.squares[2][2].piece = this.pieces.white.pawn2;
		// this.board.squares[2][3].piece = this.pieces.white.pawn3;
		// this.board.squares[2][4].piece = this.pieces.white.pawn4;
		// this.board.squares[2][5].piece = this.pieces.white.pawn5;
		// this.board.squares[2][6].piece = this.pieces.white.pawn6;
		// this.board.squares[2][7].piece = this.pieces.white.pawn7;
		// this.board.squares[2][8].piece = this.pieces.white.pawn8;

		this.pieces.forEach(oneColorPieces => {
			oneColorPieces.forEach(piece => {
				this.board.squares[piece.position.x][piece.position.y].piece = piece;
			});
		});
	}
	init() {
	}
	start() {
		// this.board.draw();
		// this.pieces.draw();

		this.board.draw(this.ctx);
		// this.pieces.draw();

		//drawing all pieces for the first time in their initial position
		setTimeout(() => {
			this.pieces.forEach((oneColorPieces) => {
				oneColorPieces.forEach((piece) => {
					piece.draw(this.ctx);
				});
			});
		}, 200);
	}
	draw() {
	}
	findSquareFromCoordinates(ex, ey) { //whichSquare
		let x = 1, y = 1;
		while(this.padding.x + (x * this.unit) <= ex) {
			x++;
		}
		while(this.padding.y + (y * this.unit) <= ey) {
			y++;
		}
		return {x, y};
		// return this.board.squares[9 - y][x];
	}
	handleClick() {
	}
	handleClickSquare(event) {
		let position = this.findSquareFromCoordinates(event.offsetX, event.offsetY);
		let square = this.board.squares[position.x][9 - position.y];
		// square.handleClick();

		if(this.action == "select") {
			this.handleSelect(square);
		} else if(this.action == "move") {
			this.handleMove(square);
		}
	}
	handleSelect(square) { //selectingPiece
		const selectedPiece = square.piece;

		if(selectedPiece) {

			if(selectedPiece.color == this.turn) {

				if(selectedPiece.moves.length != 0) {

					this.doingEverythingAfterSelect(square);
				} else {
					console.log("that piece has no possible moves, select another piece");
				}
			} else {
				console.log("that is not your piece, select one of your own pieces");
			}
		} else {
			console.log("you selected an empty square, select a square with a piece");
		}
	}
	handleMove(square) {
		if(square.position.x != this.selectedSquare.position.x || square.position.y != this.selectedSquare.position.y) {
		// if( !this.moveToSquareIsSameAsSelectedSquare() ) {

			if(this.selectedPiece.isNewInMoves(square.position.x, square.position.y)) {
			// if( this.moveToSqaureIsInPossibleMoves() ) {

				this.doingEverythingAfterMove(square);
			} else {
				log("you tapped a square that is not in selected piece's moves");
			}
		} else {
			log("you deselected your selected piece, select a piece");

			this.deselectingAPiece();
		}
	}
	doingEverythingAfterSelect(square) {
		this.selectedSquare = square;
		this.selectedPiece = square.piece;
		this.selectedPiece.drawPossibleMoves(this.ctx);
		this.action = "move";
	}
	doingEverythingAfterMove(square) {
		this.moveToSquare = square;

		this.movingSelectedPiece();

		// this.deselectingAPiece();

		this.checkIfPawnJustMovedTwoSquares();

		this.checkIfEnPassantIsToBeDone();

		this.checkIfCastleIsToBeDone();

		this.checkIfPromotionIsToBeDone();

		// if(this.selectedPiece == this.pieces[this.turn][0] || this.selectedPiece == this.pieces[this.turn][2] || this.selectedPiece == this.pieces[this.turn][3]) {
		// 	this.selectedPiece.hasMoved = true;
		// }

		this.removeRedSquare();

		this.resettingPreviousThings();

		this.analyzingAfterMyTurn();

		this.changePlayerTurn();

		this.drawRedSquare();

		this.analyzingBeforeMyTurn();
		
		this.checkIfGameIsOver();
	}
	movingSelectedPiece() {
		this.capturedPiece = this.moveToSquare.piece;

		if(this.capturedPiece) {
			this.capturePiece(this.capturedPiece);
		}

		// ctx2.clearRect(0, 0, canvas.width, canvas.height);
		this.selectedPiece.moves.forEach(move => {
			this.board.squares[move.x][move.y].draw(this.ctx);
			this.board.squares[move.x][move.y].piece?.draw(this.ctx);
		});

		// this.moveToSquare.draw(this.ctx); //this is included in moves, so no need

		this.movePiece(this.selectedSquare, this.moveToSquare, this.selectedPiece);

		this.action = "select";
	}
	analyzingAfterAnyTurn() {
		//is king in check
		//can it get out of check?
		//capture attacking piece
		//king to move to safe square
		//block the line of fire
		//analyze possible moves of other pieces
		//if no moves then game over
		//results here will determine the possible moves of pieces
	}
	removeRedSquare() {
		/*if player king was in check then remove red square*/
		if(this.pieces[this.turn][0].inCheck || this.redSquare) {
			this.redSquare.draw(this.ctx);
			if(this.redSquare.piece) {
				this.redSquare.piece.draw(this.ctx);
			}
			this.redSquare = null;
		}
	}
	drawRedSquare() {
		//if king in check, draw red color square
		if(this.pieces[this.turn][0].inCheck) {
			const king = this.pieces[this.turn][0];
			this.redSquare = this.board.squares[king.position.x][king.position.y];
			this.redSquare.draw(this.ctx, "red");
			king.draw(this.ctx);
		}
	}
	changingToMove(square) {
	}
	changingToSelect(square) { //resettingToSelect
	}
	deselectingAPiece() {
		// ctx2.clearRect(0, 0, canvas.width, canvas.height);
		this.selectedPiece.moves.forEach(move => {
			this.board.squares[move.x][move.y].draw(this.ctx);
			this.board.squares[move.x][move.y].piece?.draw(this.ctx);
		});
		this.selectedSquare = null;
		this.selectedPiece = null;
		this.action = "select";
	}
	resettingPreviousThings() {
		this.selectedSquare = null;
		this.selectedPiece = null;
		this.moveToSquare = null;
		this.capturedPiece = null;

		this.board.resettingAfterEveryTurn();

		// piece.length always = 2 unless you are playing 4 player chess
		this.pieces[this.turn].forEach((piece) => {
			piece.resettingAfterMyTurn();
		});

		this.pieces[this.oppositeTurn()].forEach((piece) => {
			if(piece.type == "king") {
				piece.inCheck = 0;
			} else if(piece.type == "pawn") {
				piece.justMovedTwoSquares = false;
			}
			if(piece.isAlive) {
				piece.isProtected = false;
			}
		});
	}
	analyzingAfterMyTurn() {
		/*
		this does many things, player whose turn just ended will check it's every piece path
		set isProtected property of friends
		check if enemy king is put in check, set check path
		check if enemy piece is pinned, set their pinned path
		*/
		this.pieces[this.turn].forEach((piece) => {
			if(piece.isAlive) {
				piece.findMovesAfterMyTurn(this.squares, this.pieces);
			}
		});
	}
	changePlayerTurn() {
		//Now we change player turn, after previous things need to be done with same player turn
		this.turn = this.turn ? 0 : 1;
	}
	analyzingBeforeMyTurn() {
		//now analyzing board, finding moves of opposite player, player whose turn is now if it is not checkmated
		this.pieces[this.turn].forEach((piece) => {
			if(piece.isAlive) {
				piece.findMovesBeforeMyTurn(this.squares, this.pieces);
			}
		});
	}
	checkIfPawnJustMovedTwoSquares() {
		if(this.selectedPiece.type == "pawn") {
			if( Math.abs(this.selectedSquare.position.y - this.moveToSquare.position.y) == 2 ) {
				this.selectedPiece.justMovedTwoSquares = true;
			}
		}
	}
	checkIfEnPassantIsToBeDone() {
		if(this.selectedPiece.type == "pawn") {
			
			this.selectedPiece.moves.forEach((move, index) => {

				if(move.enPassant && move.x == this.moveToSquare.position.x && move.y == this.moveToSquare.position.y) {

					let capturedPiece = this.squares[move.x][move.y + (this.selectedPiece.color ? -1 : 1)].piece;
					this.capturePiece(capturedPiece);
					this.movePiece(this.selectedSquare, this.moveToSquare, this.selectedPiece);
				}
			});
		}
	}
	checkIfCastleIsToBeDone() {
		if(this.selectedPiece == this.pieces[this.turn][0]) {
			
			if(!this.selectedPiece.hasMoved) {

				let side = (this.selectedSquare.position.x - this.moveToSquare.position.x) < 0 ? 1 : 0;

				if( Math.abs(this.selectedSquare.position.x - this.selectedPiece.position.x ) >= 2) {

					let rookStartX = this.selectedPiece.castleMoves[side].rookStartX;
					let rookEndX = this.selectedPiece.castleMoves[side].rookEndX;

					let rookSquareStart = this.squares[rookStartX][this.selectedPiece.position.y];
					let rookSquareEnd = this.squares[rookEndX][this.selectedPiece.position.y];

					let rook = rookSquareStart.piece;

					rook.update({x: rookEndX, y: this.selectedPiece.position.y});

					rookSquareStart.piece = null;
					rookSquareEnd.piece = rook;
					// this.squares[rook.position.x][rook.position.y].piece = rook;

					rookSquareStart.draw(this.ctx);
					rook.draw(this.ctx);
				}
			}
			// if(this.moveToSquare.position.x == this.selectedPiece.castleMoves.)
			// if(this.selectedPiece.castle.left.possible || this.selectedPiece.castle.right.possible)
		}
	}
	checkIfPromotionIsToBeDone() {
		if(this.selectedPiece.type == "pawn") {
			if(this.moveToSquare.position.y == 1 || this.moveToSquare.position.y == 8) {
				// this.selectedPiece.prototype = Queen.prototype;

				let newPiece = new Queen(this.selectedPiece.color, this.moveToSquare.position.x, this.moveToSquare.position.y);

				this.pieces[this.turn].forEach((piece, index) => {
					if(piece == this.selectedPiece) {
						this.pieces[this.turn].splice(index, 1);
					}
				});

				this.pieces[this.turn].push(newPiece);

				this.moveToSquare.piece = newPiece;

				this.moveToSquare.draw(this.ctx);

				newPiece.draw(this.ctx);
			}
		}
	}
	checkIfGameIsOver() {
		let totalMoves = 0;

		this.pieces[this.turn].forEach(piece => {
			if(piece.isAlive) {
				totalMoves += piece.moves.length;
			}
		});

		if( totalMoves + this.pieces[this.turn][0].moves.length == 0) {
			if( this.pieces[this.turn][0].inCheck ) {
				this.declareWinner("checkmate", this.oppositeTurn());
			} else {
				this.declareWinner("stalemate");
			}
		}
	}
	declareWinner(type, player) {
		alert(type + " - " + player + " wins!")
		/*
		let color = player ? "White" : "Black";
		ctx2.textAlign = "center";
		ctx2.font = unit * 1.3 + "px georgia";
		ctx2.fillStyle = "grey";
		ctx2.fillText(color + " Wins!", unit * 4, unit * 4);
		*/
	}
	oppositeTurn() {
		return (this.turn ? 0 : 1);
		// return Number(!this.turn);
	}
	movePiece(fromSquare, toSquare, piece) {
		// let fromSquare = this.squares[piece.position.x][piece.position.y];

		fromSquare.piece = null;
		toSquare.piece = piece;
		piece.update(toSquare.position);

		fromSquare.draw(this.ctx);
		// toSquare.draw(this.ctx);
		piece.draw(this.ctx);
	}/*
	movePiece(fromPosition, toPosition, piece) {
		let fromSquare = this.squares[fromPosition.x][fromPosition.y];
		let toSquare = this.squares[toPosition.x][toPosition.y];

		fromSquare.piece = null;
		toSquare.piece = piece;
		piece.update(toSquare.position);

		fromSquare.draw(this.ctx);
		// toSquare.draw(this.ctx);
		piece.draw(this.ctx);
	}*/
	capturePiece(piece) { // (piece, square)
		console.log("a piece was captured");

		let square = this.squares[piece.position.x][piece.position.y];
		piece.isAlive = false;
		square.piece = null;
		square.draw(this.ctx);

		// draw captured piece outside the board
	}
}
