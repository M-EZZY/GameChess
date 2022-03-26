//function main(){
//let canvas=document.createElement("canvas");
//document.body.appendChild(canvas);

//ctx.drawImage(1,2,3,4,5,6,7,8,9);
//1 parameter is the image object
//2 and 3 parameter are for coordinates within image
//4 and 5 are for ending coordinates in image relative to 2 and 3. so origin at 2 and 3
//6 and 7 are for coordinates in canvas to print the image
//8 and 9 are for setting the width and height of image

//canvas to draw board and pieces
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//canvas to draw possible moves
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

//canvas to draw dead pieces outside the board
//let canvas3 = document.getElementById("canvas3");
//let ctx3 = canvas3.getContext("2d");

let messageDIV = document.getElementById("message");

//board color
const lightColor="#cccccc";
const darkColor="#333333";

//possible moves circle color
const circleColor = "#207e40";

const redColor = "#cd3737";

//based on screen width and height
let unit;

//based on image width and height
let imgUnit=60;

let pieces = [];

//setting position of chess board
if(innerWidth >= innerHeight){
	unit = Math.floor(innerHeight/8);
	canvas.style.left = (innerWidth-innerHeight)/2 + "px";
	canvas.style.top = 0 + "px";

	canvas2.style.left = (innerWidth-innerHeight)/2 + "px";
	canvas2.style.top = 0 + "px";
}
else{
	unit = Math.floor(innerWidth/8);
	canvas.style.top = (innerHeight-innerWidth)/2 + "px";
	canvas.style.left = 0 + "px";

	canvas2.style.top = (innerHeight-innerWidth)/2 + "px";
	canvas2.style.left = 0 + "px";
}

//setting size of chess board
canvas.width = unit*8;
canvas.height = unit*8;

canvas2.width = unit*8;
canvas2.height = unit*8;
/*
//canvas 3
canvas3.style.top = 0 + "px";
canvas3.style.left = 0 + "px";

canvas3.width = innerWidth;
canvas3.height = innerHeight;
*/


//creating pieces
let wk = new King(1,1,unit*4,unit*7,1);
let bk = new King(1,0,unit*4,0,1);

let wq = new QueenRookBishop(0,1,unit*3,unit*7,1,1);
let bq = new QueenRookBishop(0,0,unit*3,0,1,1);

let wr1 = new Rook2(2,1,0,unit*7,1,2);
let wr2 = new Rook2(2,1,unit*7,unit*7,1,2);
let br1 = new Rook2(2,0,0,0,1,2);
let br2 = new Rook2(2,0,unit*7,0,1,2);

let wb1 = new QueenRookBishop(4,1,unit*2,unit*7,1,3);
let wb2 = new QueenRookBishop(4,1,unit*5,unit*7,1,3);
let bb1 = new QueenRookBishop(4,0,unit*2,0,1,3);
let bb2 = new QueenRookBishop(4,0,unit*5,0,1,3);

let wn1 = new Knight(3,1,unit,unit*7,1);
let wn2 = new Knight(3,1,unit*6,unit*7,1);
let bn1 = new Knight(3,0,unit,0,1);
let bn2 = new Knight(3,0,unit*6,0,1);

let wp = []
for(let i=0;i<8;i++){
	wp.push(new Pawn(5,1,unit*i,unit*6,1));
}

let bp = []
for(let i=0;i<8;i++){
	bp.push(new Pawn(5,0,unit*i,unit,1));
}

//pieces = [wk,bk,wq,bq,wr1,wr2,br1,br2,wb1,wb2,bb1,bb2,wn1,wn2,bn1,bn2,wp,bp];

pieces = [bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7],wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]];

//new better piece organization, you can easily push new piece at end and king position won't change at all
let bpiece = [];
bpiece = [bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7]];

let wpiece = [];
wpiece = [wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]];

let piece = [];
//piece = [bpiece, wpiece];
//piece.push(bpiece);
//piece.push(wpiece);
piece = [
	[bk,bq,br1,br2,bb1,bb2,bn1,bn2,bp[0],bp[1],bp[2],bp[3],bp[4],bp[5],bp[6],bp[7]],
	[wk,wq,wr1,wr2,wb1,wb2,wn1,wn2,wp[0],wp[1],wp[2],wp[3],wp[4],wp[5],wp[6],wp[7]],
];

//array to hold dead pieces so i don't have to constantly check if a piece is alive or not in piece array
let pieceOut = [[]];


//initializing
wn1.moves = [{x:0,y:unit*5},{x:unit*2,y:unit*5}];
wn2.moves = [{x:unit*5,y:unit*5},{x:unit*7,y:unit*5}];

for(let i=0;i<8;i++){
	wp[i].moves.push({x:wp[i].x,y:wp[i].y - unit});
	wp[i].moves.push({x:wp[i].x,y:wp[i].y - unit*2});
}



//drawing the chess board
for(let i = 0 ; i < 8 ; i++) {
	let flip = i % 2 == 0 ? 0 : 1;
	for(let j = 0 ; j < 8 ; j++) {
		ctx.fillStyle = (j % 2 == flip) ? lightColor : darkColor;
		ctx.fillRect(unit * j, unit * i, unit * (j + 1), unit * (i + 1));
	
		/*
		ctx.strokeStyle="black";
		ctx.moveTo(unit*j,unit*i);
		ctx.lineTo(unit*(j+1),unit*i);
		ctx.lineWidth=unit;
		ctx.stroke();
		*/
	}
}

//drawing all pieces for the first time in their initial position
p.onload = function() {
	for(let i = 0 ; i < pieces.length ; i++) {
		for(let j = 0 ; j < piece[i].length ; j++) {
			piece[i][j].draw();
		}
	}
}



let playerTurn=1;
let selectOrMove = 1;

let color1; //square color of selected piece
let color2; //square color where selected piece is gonna go
let square1; //selected piece's square coordinates
let square2; //coordinates of square where piece will go

let selectedPiece;
let capturedPiece;
let isNewInMoves;

let redSquare = {};

let numberOfPiecesCaptured = [0,0];

canvas2.addEventListener("click",clickedOnBoard);

function clickedOnBoard(event) {
	if(selectOrMove == 1) {
		selectingPiece(event.offsetX, event.offsetY);
	} else if(selectOrMove == 2) {
		square2 = whichSquare(event.offsetX, event.offsetY);

		if(square2[0] != square1[0] || square2[1] != square1[1]) {
			isNewInMoves = selectedPiece.isNewInMoves(square2[0], square2[1]);

			log("20");
			if(isNewInMoves != 0) {
				if(selectedPiece == piece[playerTurn][2] || selectedPiece == piece[playerTurn][3]) {
					selectedPiece.firstMove = 0;
				}
				if(selectedPiece == piece[playerTurn][0]) {
					checkIfCastleIsToBeDone();
					selectedPiece.firstMove = 0;
				} else {
					movingSelectedPiece();
				}
				log("30");
				resettingPreviousThings();
				log("31");
				analyzingAfterMyTurn();
				log("32");
				//Now we change player turn, after previous things need to be done with same player turn
				playerTurn = playerTurn ? 0 : 1;
				
				//if king in check, draw red color square
				if(piece[playerTurn][0].inCheck >= 1){
					redSquare = {
						x : piece[playerTurn][0].x,
						y : piece[playerTurn][0].y,
					};
					fillColor(piece[playerTurn][0].x, piece[playerTurn][0].y, redColor);
					piece[playerTurn][0].draw();
					
					/*
					there is no need for this. any move near king in checkpath is in onFire moves
					//eliminating check path moves from king possible moves
					for(let j=0 ; j<pieces[playerTurn*16].moves.length ; j++){
						temp.push({x:pieces[playerTurn*16].moves[j].x,y:pieces[playerTurn*16].moves[j].y});
					}
					pieces[playerTurn*16].moves = [];

					for(let j=0 ; j<temp.length ; j++){
						for(let k=0 ; k<pieces[playerTurn*16].checkPath.length ; k++){
							if(temp[j].x == pieces[playerTurn*16].checkPath[k].x){
								if(temp[j].y == pieces[playerTurn*16].checkPath[k].y){
									pieces[i].moves.push({x:temp[j].x,y:temp[j].y});
								}
							}
							temp = [];
						}
					}
					*/
				}

				let totalPossibleMoves = 0;

				//now analyzing board, finding moves of opposite player, player whose turn is now if it is not checkmated
				for(let i = 1 ; i < piece[playerTurn].length ; i++) {
					if(piece[playerTurn][i].alive) {
						piece[playerTurn][i].findMovesBeforeMyTurn();
						totalPossibleMoves += piece[playerTurn][i].moves.length;
					}
				}
				log("33");

				piece[playerTurn][0].findMovesBeforeMyTurn();

				if(piece[playerTurn][0].inCheck >= 1) {
					if(totalPossibleMoves + piece[playerTurn][0].moves.length == 0) {
						weHaveAWinner(!playerTurn);
						return;
					}
				}

				piece[playerTurn][0].checkCastleMovePossible();

				/*first check for check path then pinned path
				also these needs to be done in findMovesBeforeMyTurn()*/

				//finding total possible moves by comparing pieces move with check path of king
				//let temp = []; already declared up
				/*
				let totalPossibleMoves = 0;

				if(piece[playerTurn][0].inCheck == 1){
					totalPossibleMoves = 0;

					for(let i = playerTurn*16 + 1; i<playerTurn*16 + 16 ; i++){
						if(pieces[i].alive){
							
							temp = pieces[i].moves;
							pieces[i].moves = [];

							for(let j=0 ; j<temp.length ; j++){
								for(let k=0 ; k<pieces[playerTurn*16].checkPath.length ; k++){

									if(temp[j].x == piece[playerTurn][0].checkPath[k].x){
										if(temp[j].y == piece[playerTurn][0].checkPath[k].y){
											pieces[i].moves.push({x:temp[j].x,y:temp[j].y});
											totalPossibleMoves++;
										}
									}
								}
							}
							temp = [];
						}
					}
					if(totalPossibleMoves + pieces[playerTurn*16].moves.length == 0){
						weHaveAWinner(!playerTurn);
						return;
					}
				}
				else if(piece[playerTurn][0].inCheck > 1) {
					for(let i = playerTurn*16 + 1; i<playerTurn*16 + 16 ; i++) {
						pieces[i].moves = [];
					}
					if(pieces[playerTurn*16].moves.length == 0) {
						weHaveAWinner(!playerTurn);
						return;
					}
				}
				*/
				//is king in check
				//can it get out of check?
				//capture attacking piece
				//king to move to safe square
				//block the line of fire
				//analyze possible moves of other pieces
				//if no moves then game over
				//results here will determine the possible moves of pieces
			} else {
				log("you tapped a square that is not in selected piece's moves");
			}
		} else {
			log("you deselected your selected piece");
			ctx2.clearRect(0, 0, canvas.width, canvas.height);
			selectOrMove = 1;
		}
	}
}
function selectingPiece(ex, ey) {
	square1 = whichSquare(ex, ey);
	let x = square1[0];
	let y = square1[1];
	
	selectedPiece = whichPieceAt(x, y);
	if(selectedPiece != 0) {
		if(selectedPiece.color == playerTurn) {
			if(selectedPiece.moves.length != 0) {
				selectedPiece.drawPossibleMoves();
				selectOrMove = 2;
			} else {
				log("selected piece has no possible moves");
			}
		} else {
			log("select one of your own pieces");
		}
	} else {
		log("you selected an empty square");
	}
}
function movingSelectedPiece() {
	capturedPiece = whichPieceAt(square2[0], square2[1]);

	if(capturedPiece != 0) {
		log("piece was captured");
		capturedPiece.alive = 0;

		color2 = whichColorSquare(square2[0], square2[1]);
		fillColor(square2[0], square2[1],color2);

		/*
		//drawing captured piece outside the board
		numberOfPiecesCaptured[(!playerTurn)]++;
		capturedPiece.update((!playerTurn)*unit*12,numberOfPiecesCaptured[(!playerTurn)]*unit);
		ctx3.drawImage(p,capturedPiece.img.x,capturedPiece.img.y,imgUnit,imgUnit,capturedPiece.x,capturedPiece.y,unit,unit);
		*/
	}
	ctx2.clearRect(0, 0, canvas.width, canvas.height);

	color1 = whichColorSquare(square1[0], square1[1]);
	fillColor(square1[0],square1[1], color1);

	selectedPiece.update(square2[0], square2[1]);
	selectedPiece.draw();

	selectOrMove = 1;
}
function checkIfCastleIsToBeDone() {
	if(selectedPiece.castle.left.possible) {
		if(square2[0] == selectedPiece.castle.left.kingx) {
			if(square2[1] == selectedPiece.y) {
				ctx2.clearRect(0, 0, canvas.width, canvas.height);

				let color1 = whichColorSquare(square1[0], square1[1]);
				fillColor(square1[0],square1[1], color1);

				selectedPiece.update(square2[0], square2[1]);
				selectedPiece.draw();

				selectOrMove = 1;

				let color2 = whichColorSquare(0, selectedPiece.y);
				fillColor(0, selectedPiece.y, color2);

				piece[playerTurn][2].update(selectedPiece.castle.left.rookx, selectedPiece.y);
				piece[playerTurn][2].draw();

				return;
			}
		}
	} else if(selectedPiece.castle.right.possible) {
		if(square2[0] == selectedPiece.castle.right.kingx) {
			if(square2[1] == selectedPiece.y) {
				ctx2.clearRect(0, 0, canvas.width, canvas.height);

				let color1 = whichColorSquare(square1[0], square1[1]);
				fillColor(square1[0],square1[1], color1);

				selectedPiece.update(square2[0], square2[1]);
				selectedPiece.draw();

				selectOrMove = 1;

				let color2 = whichColorSquare(unit * 7, selectedPiece.y);
				fillColor(unit * 7, selectedPiece.y, color2);

				piece[playerTurn][3].update(selectedPiece.castle.right.rookx, selectedPiece.y);
				piece[playerTurn][3].draw();

				return;
			}
		}
	}
	movingSelectedPiece();
}
function resettingPreviousThings() {
	/*if player king was in check then remove red square*/
	if(piece[playerTurn][0].inCheck >= 1) {
		let c = whichColorSquare(redSquare.x, redSquare.y);
		fillColor(redSquare.x, redSquare.y, c);

		if(redSquare.x == piece[playerTurn][0].x) {
			piece[playerTurn][0].draw();
		}
	}
	/*resetting some properties of all pieces*/
	for(let i = 0 ; i < piece.length ; i++) { //piece.length always = 2 unless you are playing 4 player chess
		for(let j = 0 ; j < piece[i].length ; j++) {
			piece[i][j].moves = [];
			if(j == 0) {
				piece[i][j].inCheck = 0;
				piece[i][j].checkPath = [];
				piece[i][j].castle.left.possible = 0;
				piece[i][j].castle.right.possible = 0;
			} else {
				piece[i][j].isPinned = 0;
				piece[i][j].isProtected = 0;
				piece[i][j].pinnedPath = [];
			}
		}
	}
}
function analyzingAfterMyTurn() {
	/*this does many things, player whose turn just ended will check it's every piece path
	set isProtected property of friends
	check if enemy king is put in check, set check path
	check if enemy piece is pinned, set their pinned path
	*/
	log("51");
	piece[playerTurn][0].findMovesAfterMyTurn();
	
	log("52");
	for(let i = 1 ; i < piece[playerTurn].length ; i++) {
		if(piece[playerTurn][i].alive) {
			piece[playerTurn][i].findMovesAfterMyTurn();

			log("53");
		}
	}
}
function whichSquare(x,y){
	let fx,fy;
	for(let j = 0 ; j <= 8 ; j++) {
		if(unit * j - x <= unit) {
			fx = unit * (j-1);
		}
		if(unit*j - y <= unit) {
			fy = unit * (j-1);
		}
	}
//	console.log(fx,fy);
	return [fx, fy];
}
function whichColorSquare(x,y) {
	let thei,thej;

	for(i=0;i<8;i++) {
		if(x == unit*i) {
			thei = i%2;
		}
		if(y == unit*i) {
			thej = i%2;
		}
	}
	if(thei == 0) {
		if(thej == 0) {
			return lightColor;
		} else {
			return darkColor;
		}
	} else {
		if(thej == 0) {
			return darkColor;
		} else {
			return lightColor;
		}
	}
}
function whichPieceAt(x,y) {
	for(let i=0 ; i<pieces.length ; i++){
		if(pieces[i].alive){
			if(pieces[i].x == x && pieces[i].y == y){
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
function checkBorderReached(x,y){
	if(x < 0 || x > unit*7 || y < 0 || y > unit*7){
		return 1;
	}
	return 0;
}
function fillColor(x,y,color){
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(x,y + unit/2);
	ctx.lineTo(x+unit,y + unit/2);
	ctx.lineWidth=unit;
	ctx.stroke();
}
function log(message) {
	//messageDIV.innerHTML += "<div>" + message + "</div>";
	console.log(message);
}
function weHaveAWinner(player){
	let color = player ? "White" : "Black";
	ctx2.textAlign = "center";
	ctx2.font = unit*1.3 + "px georgia";
	ctx2.fillStyle = "grey";
	ctx2.fillText(color + " Wins!",unit*4,unit*4);

}
