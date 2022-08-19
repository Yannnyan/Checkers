/**
 * This class is the event handling for the component inside the board.
 */
class Board extends BoardRaw{
    /** constructors */

    constructor() {
        super();
        this.view = new changeBoard();
        this.#attachCells();
        // it is selected if the user has clicked on the piece
        this.targetedPiece = null;
        this.lastTargetedPiece = null;
        // array that contains all the valid moves for the targeted piece
        this.validMoves = null;
        this.logic = new GameLogic(this);
        this.movesDisplayed = false;
        this.makeQueen(this.bluePieces.get(0));
        // this.makeQueen(this.redPieces.get(11));
        
    }
    /**
     * attaches the cells to event listeners
     */
    #attachCells() {
        var i, j;
        var cell;
        for (i = 0; i < this.cells.length; i++)
        {
            for (j = 0; j < this.cells.length; j++)
            {
                cell = this.cells[i][j];
                this.#attachCell(cell.row, cell.col);
            }
                
        }
    }
    /**
     * adds valid moves to the targeted piece.
     * later add function to display the relevant spots on the board
     */
    #addValidMoves()
    {       
        if (this.targetedPiece)
        {
            this.validMoves = this.logic.getValidMoves(this.targetedPiece);
        }
    }
    
    /** Event Listeners */

        /** This is the event listener that activates when the user clicks on a piece.
         * 
         * @param {string} pieceId 
         * 
         */
    #targetThePiece(pieceId) {
        var tPiece = this.getPieceById(pieceId);
        this.lastTargetedPiece = this.targetedPiece;
        this.targetedPiece = tPiece;
        this.#addValidMoves();

    }
    /**
     * Show the indicator moves on the board
     */
    #showMoves()
    {
        if (this.movesDisplayed === false && this.validMoves)
        {
            this.movesDisplayed = true;
            changeBoard.showIndicators(this.validMoves);
        }  
        
    }
    /**
     * Clears the indicator moves from the board
     */
    #clearMoves()
    {
        // console.log(this.validMoves);
        if (this.validMoves)
        {
            changeBoard.delPieces(this.validMoves);
            this.movesDisplayed = false;
        }
        
    }
    /**
     * Assumes that the piece is selected.
     * This function makes the user move happen if it's valid.
     * @param {Cell} cell 
     */
    #pieceMovementByValid(cell)
    {
        var didEat = false;
        if (this.validMoves.length != 0)
        {
            // iterates through each valid move
            for(let i = 0; i < this.validMoves.length; i++)
            // user selected cell is in valid moves array, then move it
            if (cell.row === this.validMoves[i][0] && cell.col === this.validMoves[i][1])
            {
                this.movePiece(this.targetedPiece, cell);
                // check eat flag, if it's on then delete the eaten piece
                if (this.validMoves[i][2] === "eat")
                {
                    this.deletePiece(this.getPiece(this.validMoves[i][3], this.validMoves[i][4]));
                    this.validMoves = null;
                    didEat = true;
                }
                // makes a turn after moving a piece
                this.logic.turnHandler.makeTurn(this.getPiece(cell.row, cell.col), this.logic, didEat);
                break;
            }
        }
    }
    /** This is the event listener that activates when the user clicks on a cell
     * 
     * @param {string} cellId 
     */
    #clickTheCell(Id) {
        // the target is a cell
        if (Id.indexOf("c") === 0)
        {
            this.#clearMoves();
            var cell = this.getCellById(Id);
            if (this.targetedPiece) // piece not null
            {
                console.log(this.validMoves);
                this.#pieceMovementByValid(cell);
            }
            this.targetedPiece = null;
            this.validMoves = null;
        }
        // the target is a piece
        else
        {
            // if the last user pick was different then remove the last display and display new moves
            if (this.movesDisplayed)
            {
                this.#clearMoves();
            }
            this.#targetThePiece(Id);
            // if valid moves are not displayed, display them
            if (!this.movesDisplayed)
            {
                this.#showMoves();
            }
        }
        
        
    }
    /**private auxilary functions */
    /**
     * 
     * @param {Cell} cell 
     */
    #attachCell(row, col) {
        var cell = changeBoard.getCellElement(row, col);
        cell.addEventListener("click", e => { // inserting event listener
            e.stopPropagation();
            this.#clickTheCell(e.target.id);
        });
    }
    /** Promotion */
    /**
     * Makes the piece a queen
     * @param {Piece} piece 
     */
    makeQueen(piece)
    {
        piece.makeQueen();
        changeBoard.changeAppearence(piece, this.getPieceKey(piece), "queen");
    }

    /** Relocation functions */

    /**
     * 
     * @param {Piece} piece 
     * @param {Cell} cellToMoveTo 
     * @param {int} row 
     * @param {int} col 
     */
     movePiece(piece, cellToMoveTo)
     {
         var cell = this.getCell(piece.row, piece.collum);
         changeBoard.movePiece(piece.row, piece.collum, cellToMoveTo.row, cellToMoveTo.col);
         
         cell.unoccupy();
         cellToMoveTo.occupy(piece);
         piece.movePiece(cellToMoveTo.row, cellToMoveTo.col);
         // update view
         
     }
     /**
      * Deletes the specified piece from the board.
      * @param {Piece} piece 
      */
     deletePiece(piece)
     {
        var cell = this.getCell(piece.row, piece.collum);
        var row = cell.row;
        var col = cell.col;
        cell.unoccupy();
        if (piece.color === "red")
        {
            this.redPieces.delete(this.getPieceKey(piece));
            console.log(this.redPieces);
        }
        else 
        {
            this.bluePieces.delete(this.getPieceKey(piece));
            console.log(this.bluePieces);
        }
        changeBoard.delPiece(row, col); // update view.
        
     }

}


