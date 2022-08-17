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
        // array that contains all the valid moves for the targeted piece
        this.validMoves = null;
        this.logic = new GameLogic(this);
        
        
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
            this.validMoves = this.logic.getValidMoves(this.targetedPiece);
    }
    
    /** Event Listeners */

        /** This is the event listener that activates when the user clicks on a piece.
         * 
         * @param {string} pieceId 
         * 
         */
    #targetThePiece(pieceId) {
        var tPiece = this.getPieceById(pieceId);
        this.targetedPiece = tPiece;
        this.#addValidMoves();

    }
    /** This is the event listener that activates when the user clicks on a cell
     * 
     * @param {string} cellId 
     */
    #clickTheCell(Id) {        
        // the target is a cell
        if (Id.indexOf("c") === 0)
        {
            var cell = this.getCellById(Id);
            if (this.targetedPiece) // piece not null
            {
                console.log(this.validMoves);
                if (this.validMoves.length != 0)
                {
                    // iterates through each valid move
                    for(let i = 0; i < this.validMoves.length; i++)
                        if (cell.row === this.validMoves[i][0] && cell.col === this.validMoves[i][1])
                        {
                            this.movePiece(this.targetedPiece, cell);
                            // check eat flag, if it's on then delete the eaten piece
                            if (this.validMoves[i][2] === "eat")
                            {
                                this.deletePiece(this.getPiece(this.validMoves[i][3], this.validMoves[i][4]));
                            }
                            break;
                        }
                }
            }
            this.targetedPiece = null;
        }
        // the target is a piece
        else
        {
            this.#targetThePiece(Id);
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
        changeBoard.delPiece(cell.row, cell.col); // update view.
        cell.unoccupy();
     }

}


