const game = new Game()
game.start()





/*
initialize
draw
check
update
repeat
*/


/* clicking the board
selecting piece
moving piece
*/

/* after turn 
reset your pieces properties
reset opponent pieces properties
reset board properties
reset game properties
if opponent king in check
your pieces that are protected
pinned pieces of opponent
squares that are on fire, so king can't step there
*/

/* before turn
check if your king is in check
check if your king is in checkmate
check if your king is in stalemate
all possible moves of your pieces considering pinnedPath and squaresOnFire
*/




//function main(){

//canvas to draw board and pieces
//canvas to draw possible moves
//canvas to draw dead pieces outside the board









let redSquare = {};

let numberOfPiecesCaptured = [0,0];

/*
//to draw light blue squares of possible moves
//not working. fix it
canvas2.addEventListener("mousemove",onMouseMove);
function onMouseMove(event) {
	if(selectedPiece) {
		return;
	}
	
	ctx2.clearRect(0, 0, unit * 8, unit * 8);

	let ex = event.offsetX;
	let ey = event.offsetY;

	let square = whichSquare(ex, ey);
	let x = square[0];
	let y = square[1];

	let ppp = whichPieceAt(x, y);
	if(ppp != 0) {
		if(ppp.moves.length != 0) {
			ppp.moves.forEach(m => {
				ctx2.beginPath();
				ctx2.fillStyle = "rgba(0, 0, 250, 0.5)";
				ctx2.fillRect(m.x, m.y, unit, unit);
				ctx2.closePath();
			});
		}
	}
}
*/



function log(message) {
	//messageDIV.innerHTML += "<div>" + message + "</div>";
	console.log(message);
}
