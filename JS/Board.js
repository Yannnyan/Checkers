/**
 * This class is the event handling for the component inside the board.
 */
class Board extends BoardRaw{
    /** constructors */

    constructor() {
        super();
        this.view = new changeBoard();
        this.#attachCells();
        this.#attachPieces();   
        // it is selected if the user has clicked on the piece
        this.targetedPiece = null;
        this.logic = new GameLogic(this);
        
    }
    /**
     * attaches the pieces to event listeners
     */
    #attachPieces() 
    {
        for (var i = 0; i < this.redPieces.length; i++)
        {
            this.#attachPiece(this.redPieces[i], i);
        }
        for (var i = 0; i < this.bluePieces.length; i++)
        {
            this.#attachPiece(this.bluePieces[i], i);
        }
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

    }
    /** This is the event listener that activates when the user clicks on a cell
     * 
     * @param {string} cellId 
     */
    #clickTheCell(cellId) {
        // alert("You clicked on a cell " + cellId);
        var cell = this.getCellById(cellId);
        if (this.targetedPiece) // piece not null
        {
            console.log(this.targetedPiece);
            this.movePiece(this.targetedPiece, cell);
        }
        this.targetedPiece = null;
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
    
    /**
     * Attaches the span circle in the html to the js object
     * @param {Piece} p 
     * @param {Int} index 
     */
    #attachPiece(p, index) {
        this.validateIndex(index);
        var pieceSpan = changeBoard.getPieceElement(p, index);
        pieceSpan.addEventListener("click", e => {
            e.stopPropagation();
            console.log(e.target.id + " has been clicked.");
            this.#targetThePiece(e.target.id);
            
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
         console.log(cell);
         changeBoard.movePiece(piece.row, piece.collum, cellToMoveTo.row, cellToMoveTo.col);
         
         cell.unoccupy();
         cellToMoveTo.occupy(piece);
         piece.movePiece(cellToMoveTo.row, cellToMoveTo.col);
         // update view
         
     }

}


