class RegularPiece extends Piece {
	constructor(...args) {
		super(...args);
		
		this.isProtected = false;
		this.isPinned = false; //pinned //isPinned //isInPinnedPath //isInLineOfFire
		this.pinnedPath = [];
	}
	resettingAfterMyTurn() {
		if(this.isAlive) {
			super.resettingAfterMyTurn();
			
			this.isProtected = false;
			this.isPinned = false;
			this.pinnedPath = [];
		}
	}
}
