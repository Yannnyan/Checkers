/** This is a raw class implementation for a board that contains functions for managin' the board */


class BoardRaw {
    constructor() 
    {
        this.rows = 8;
        this.cols = 8;
        this.sizeTeam = 12;
        this.cells = this.#createCells();
        // creates the pieces
        this.redPieces = this.#fillPieces("red");
        this.bluePieces = this.#fillPieces("blue");
        this.#ocupyCells();

    }
    /** Constructor helpers */

    // fills an array with pieces of certain color matched for the board specifications.
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
                pieces.push(piece); 
                continue;
            }
            // treat as a base case but every element has to shift one left
            // 0 2 4 6
            if (i < 8) {
                var piece = new Piece(1 + startRow, (i-4)*2 + startColForNotSpaced, color);
                pieces.push(piece);
                continue;
            }
            // 1 3 5 7
            if (i < 12) {
                var piece = new Piece(2 + startRow, (i-8)*2 + 1 + startColForSpaced, color);
                pieces.push(piece);
            }
        }
        return pieces;
    }
    

    /**
     * 
     * @returns {Array[Array[Cell]]}double dimensional array filled with cells
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

    /** getters and setters */

    /////// Piece related

    /**
     * 
     * @param {string} pieceId 
     * @return {Piece} piece identified with the id of the circle 
     */
    getPieceById(pieceId) {
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
     * @param {int} row 
     * @param {int} col 
     * @returns the piece by specifying row and collum
     */
    getPiece(row, col)
    {
        if (row > this.board.rows || col > this.board.cols
            || row < 0 || col < 0)
        {
            return null;
        }
        return this.board.cells[row][col].occupied;
    }

    /**
     * 
     * @param {Piece} piece 
     * @param {string} horizontal 
     * @param {string} vertical 
     * @returns {Piece} returns the piece relative to the specifications on the board
     */
     getRelativePiece(piece, horizontal, vertical)
     {
         var cellLocation = this.getRelativeCell(piece, horizontal, vertical);
         var targetRow = cellLocation[0];
         var targetCol = cellLocation[1];
         return this.getPiece(targetRow, targetCol);
         
     }

     /**
     * 
     * @param {Piece} piece 
     * @param {string} horizontal "left", "right"
     * @param {string} vertical "top", "bottom" 
     * @returns the color of the piece specified at the horizontal and vertical positions
     */
    getRelativePieceColor(piece, horizontal, vertical) 
    {
        var cellLocation = this.getRelativeCell(piece, horizontal, vertical);
        var cellRow = cellLocation[0];
        var cellCol = cellLocation[1];
        var color = this.getPiece(cellRow, cellCol).color;
        return color;
    }
    /////// Cell related

    /**
     * 
     * @param {Piece} piece 
     * @param {string} horizontal "left", "right"
     * @param {string} vertical "top", "bottom"
     * @returns if the bottom left cell is not occupied
     */
    checkRelativeNotOccupied(piece, horizontal, vertical) 
     {
         if (horizontal === "left" && vertical === "top")
         {
             return this.checkCellNotOccupied(piece.row - 1, piece.col - 1);
         }
         else if (horizontal === "right" && vertical === "top")
         {
             return this.checkCellNotOccupied(piece.row - 1, piece.col + 1);
         }
         else if (horizontal === "left" && vertical === "bottom")
         {
             return this.checkCellNotOccupied(piece.row + 1, piece.col - 1);
         }
         else if (horizontal === "right" && vertical === "bottom")
         {
             return this.checkCellNotOccupied(piece.row + 1, piece.col + 1);
         }
         throw("invalid horizontal or vertical argument");
         
     }
    getRelativeCell(piece, horizontal, vertical) 
    {
        if (horizontal === "left" && vertical === "top")
        {
            return [piece.row - 1, piece.collum - 1];
        }
        else if (horizontal === "right" && vertical === "top")
        {
            return [piece.row - 1, piece.collum + 1];
        }
        else if (horizontal === "left" && vertical === "bottom")
        {
            return [piece.row + 1, piece.collum - 1];
        }
        else if (horizontal === "right" && vertical === "bottom")
        {
            return [piece.row + 1, piece.collum + 1];
        }
        throw("invalid horizontal or vertical argument");
    }

    checkCellNotOccupied(row, col) 
    {
        if (row > this.board.rows || col > this.board.cols ||
            row < 0 || col < 0)
        {
            return null;
        }
        return !this.board.cells[row][col].isOccupied();
    }

    /**
     * 
     * @param {string} cellId 
     * @returns integer for the row
     */
    #getCellRowById(cellId)
    {
        return parseInt(cellId.charAt(1));
    }
    #getCellColById(cellId)
    {
        return parseInt(cellId.charAt(2));
    }
    /**
     * 
     * @param {string} cellId 
     * @returns {Cell} cell that matches the specified id
     */
    getCellById(cellId)
    {
        var row = this.#getCellRowById(cellId);
        var col = this.#getCellColById(cellId);
        return this.cells[row][col];
    }
    /**
     * 
     * @param {*} row 
     * @param {*} col 
     * @returns {Cell} the cell specified at row and col
     */
    getCell(row, col)
    {
        return this.cells[row][col];
    }

    /**
     * Validating methods
     */
    /** Validates whether the index of the piece is valid
     *  otherwise throws exception
     * 
     * @param {Int} index 
     */
    validateIndex(index) {
        if (index >= this.sizeTeam || index < 0) {
            throw("Invalid index");
        }
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
    get getRow()
    {
        return this.row;
    }
    get getCol() 
    {
        return this.col;
    }
}

