/**
 * This class is the event handling for the component inside the board.
 */
class Board {
    /** constructors */

    constructor() {
        this.rows = 8;
        this.cols = 8;
        // number of pieces for each team
        this.sizeTeam = 12;
        // containers for the pieces && attaches them to event listeners
        this.cells = this.#createCells();
        // creates the pieces && attaches them to event listeners
        this.redPieces = this.#fillPieces("red");
        this.bluePieces = this.#fillPieces("blue");
        // occupies the cells with the red and blue pieces
        this.#ocupyCells();
        // it is selected if the user has clicked on the piece
        this.targetedPiece = null;
        this.logic = new GameLogic(this);
    }

    /** Constructor helpers */

    // fills an array with pieces of certain color matched for the board specifications.
    // and attaches each piece to a corresponding object.
    #fillPieces(color) {
        var pieces = [];
        var startRow = color === "red" ? 0 : 5;
        var startColForSpaced = color === "red" ? 0 : -1;
        var startColForNotSpaced = color === "red" ? 0 : 1;
        for(var i = 0; i < this.sizeTeam; i++) {
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
    /**
     * 
     * @returns double dimensional array filled with cells
     */
    #createCells() {
        var cells = new Array(this.rows);
        var i,j;
        for(i = 0; i < this.rows; i++) 
        {
            cells[i] = new Array(this.cols);
        }
        for (i = 0; i < this.rows; i++) 
        {
            for (j = 0; j < this.cols; j++) 
            {
                cells[i][j] = new Cell(i,j);
                this.#attachCell(i, j);
            }
        }
        return cells;
    }
    #ocupyCells() {
        var i;
        var piece;
        for (i = 0; i < this.redPieces.length; i++) 
        {
            piece = this.redPieces[i];
            this.cells[piece.row][piece.collum].occupy(piece);
        }
        for (i = 0; i < this.bluePieces.length; i++) {
            piece = this.bluePieces[i];
            this.cells[piece.row][piece.collum].occupy(piece);
        }
    }
    /** Event Listeners */

        /**
         * 
         * @param {string} pieceId 
         */
    #targetThePiece(pieceId) {
        var tPiece = this.#getPieceById(pieceId);
        this.targetedPiece = tPiece;
    }
    /**
     * 
     * @param {string} cellId 
     */
    #clickTheCell(cellId) {
        alert("You clicked on a cell " + cellId);
        var cell = this.#getCellById(cellId);


    }
    /**private auxilary functions */
    /**
     * 
     * @param {Cell} cell 
     */
    #attachCell(row, col) {
        var table = document.getElementById("board");
        // notice that the first line is just characters
        // that's why skip it
        var rows = table.getElementsByTagName("tr");
        // notice that the first collum is just numbers
        // but it is titled with th not td. so the first col is indexed 0 in td elements of the row actually
        var cells = rows[row + 1].getElementsByTagName("td");
        var cell = cells[col];
        cell.addEventListener("click", e => { // inserting event listener
            this.#clickTheCell(e.target.id);
        });
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
        // pass the piece and the board to the anon func
        pieceSpan.addEventListener("click", e => {
            console.log(e.target.id + " has been clicked.");
            this.#targetThePiece(e.target.id);
            
        });
        // pieceSpan.onclick = p.movePiece;
    }
    /**
     * 
     * @param {string} pieceId 
     * @return {Piece} piece identified with the id of the circle 
     */
    #getPieceById(pieceId) {
        var index;
        // red
        if (pieceId.indexOf("red") !== -1) {
           index = parseInt(pieceId.slice(9)); // redCircle 
           if(!isNaN(index)) {
            return this.redPieces[index];
           }
        }
        // blue
        else{
            
            index = parseInt(pieceId.slice(10)); // blueCircle
            if(!isNaN(index)) {
                return this.bluePieces[index];   
            }
        }
        return NaN;
    }
    /**
     * 
     * @param {string} cellId 
     * @returns 
     */
    #getCellRowById(cellId)
    {
        return parseInt(cellId.charAt(1));
    }
    #getCellColById(cellId)
    {
        return parseInt(cellId.charAt(2));
    }
    #getCellById(cellId)
    {
        var row = this.#getCellRowById;
        var col = this.#getCellColById;
        return this.cells[row][col];
    }
    

}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        // assigned null if no piece is on this particular cell
        // assigned the piece if the piece is on this particular cell
        this.occupied = null;
    }
    /**
     * Occupies the cell by the piece
     * @param {Piece} piece 
     */
    occupy(piece) {
        this.occupied = piece;
    }
    /**
     * Unocupies the cell from the piece
     */
    unoccupy() {
        this.occupied = null;
    }
    /**
     * 
     * @returns {Boolean} is the object occupied
     */
    isOccupied() {
        return this.occupied != null;
    }
}
