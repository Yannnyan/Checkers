
class Board {
    constructor() {
        this.rows = 8;
        this.cols = 8;
        this.sizeTeam = 12;
        this.redPieces = this.#fillPieces("red");
        this.bluePieces = this.#fillPieces("blue");
    }
    // fills an array with pieces of certain color matched for the board specifications.
    #fillPieces(color) {
        var pieces = [];
        var startRow = color === "red" ? 0 : 5;
        var startColForSpaced = color === "red" ? 0 : -1;
        var startColForNotSpaced = color === "red" ? 0 : 1;
        for(var i = 0; i < sizeTeam; i++) {
            // base case
            // 1 3 5 7
            if (i < 4) {
                var piece = new Piece(0 + startRow, i*2 + 1 + startColForSpaced, color);
                this.#attachPiece(piece, i);
                pieces.push(piece); 
                continue;
            }
            // treat as a base case but every element has to shift one left
            // 0 2 4 6
            if (i < 8) {
                var piece = new Piece(1 + startRow, (i-4)*2 + startColForNotSpaced, color);
                this.#attachPiece(piece, i);
                pieces.push(piece);
                continue;
            }
            // 1 3 5 7
            if (i < 12) {
                var piece = new Piece(2 + startRow, (i-8)*2 + 1 + startColForSpaced, color);
                this.#attachPiece(piece, i);
                pieces.push(piece);
            }
        }
        return pieces;
    }
    #validateIndex(index) {
        if (index >= this.sizeTeam || index < 0) {
            throw("Invalid index");
        }
    }
    /**
     * Attaches the span circle in the html to the js object
     * @param {Piece} p 
     * @param {Int} index 
     */
    #attachPiece(p, index) {
        this.#validateIndex(index);
        var idNamePref = p.color + "Circle" + index;
        var pieceSpan = document.getElementById(idNamePref);
        pieceSpan.onclick = p.movePiece();
    }
    

}