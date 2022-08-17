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
    
    /** Event Listeners */

        /** This is the event listener that activates when the user clicks on a piece.
         * 
         * @param {string} pieceId 
         * 
         */
    #targetThePiece(pieceId) {
        var tPiece = this.getPieceById(pieceId);
        this.targetedPiece = tPiece;
        console.log(this.targetedPiece);
        console.log("piece targeted");
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
                
                this.movePiece(this.targetedPiece, cell);
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
            console.log(e.target.id + "has been clicked ")
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

}


