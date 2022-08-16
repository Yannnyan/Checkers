


class GameLogic {
    /**
     * 
     * @param {Board} board 
     */
    constructor (board) {
        this.board = board;
    }
    /**
     * 
     * @param {Piece} piece 
     */
    checkValidMoves(piece) {
        var validMoves = []
        // piece is red
        if (this.#checkRedPiece(piece))
        {
            // piece is soldier
            if (this.#checkSoldier(piece)) 
            {
    
                if (this.#checkRelativeNotOccupied(piece, "left", "bottom"))
                {
                    validMoves.push(this.#getRelativeCell(piece, "left", "bottom"));
                }
                if (this.#checkRelativeNotOccupied(piece, "right", "bottom")) 
                {
                    validMoves.push(this.#getRelativeCell(piece, "right", "bottom"));
                }
            
            }
            // piece is queen
            else
            {
                // add cases for queen
            }
        }
        // piece is blue
        else
        {
            // piece is soldier
            if (this.#checkSoldier(piece))
            {
                if(this.#checkRelativeNotOccupied(piece, "left", "top"))
                {
                    validMoves.push(this.#getRelativeCell(piece, "left", "top"));
                }
                if (this.#checkRelativeNotOccupied(piece, "right", "top"))
                {
                    validMoves.push(this.#getRelativeCell(piece, "right", "top"));
                }
            }
            // piece is queen
            else 
            {
                // add cases for queen.
            }
        }
       
        

    }


    /** Check soldier operations */

    /**
     * 
     * @param {Piece} piece 
     * @returns {Piece | null} if the piece can eat returns the piece location, otherwise return null.
     */
    checkCanEat(piece) 
    {
        // piece is red soldier
        if (this.#checkRedPiece(piece) && this.#checkSoldier(piece)) 
        {
            // bottom-left occupied by a blue piece
            if (!this.#checkRelativeNotOccupied(piece, "left", "bottom")
            && this.#getRelativePieceColor(piece, "left", "bottom") === "blue")
            {
                var targetLocation = this.#getRelativeCell(piece,"left", "bottom");
                var targetRow = targetLocation[0];
                var targetCol = targetLocation[1];
                var targetPiece = this.#getPiece(targetRow, targetCol);
                if (this.#checkRelativeNotOccupied("left", "bottom"))
                {
                    return targetPiece;
                }
            }
            // bottom-right occupie by a blue piece
            
        }
        // piece is blue
        else
        {

        }
    }

    /** Checkers and getters for cells specifically */

    #checkCellNotOccupied(row, col) 
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
     * @param {Piece} piece 
     * @param {string} horizontal "left", "right"
     * @param {string} vertical "top", "bottom"
     * @returns if the bottom left cell is not occupied
     */
    #checkRelativeNotOccupied(piece, horizontal, vertical) 
    {
        if (horizontal === "left" && vertical === "top")
        {
            return this.#checkCellNotOccupied(piece.row - 1, piece.col - 1);
        }
        else if (horizontal === "right" && vertical === "top")
        {
            return this.#checkCellNotOccupied(piece.row - 1, piece.col + 1);
        }
        else if (horizontal === "left" && vertical === "bottom")
        {
            return this.#checkCellNotOccupied(piece.row + 1, piece.col - 1);
        }
        else if (horizontal === "right" && vertical === "bottom")
        {
            return this.#checkCellNotOccupied(piece.row + 1, piece.col + 1);
        }
        throw("invalid horizontal or vertical argument");
        
    }
    /**
     * 
     * @param {Piece} piece 
     * @param {string} horizontal "left", "right"
     * @param {string} vertical "top", "bottom" 
     * @returns the color of the piece specified at the horizontal and vertical positions
     */
    #getRelativePieceColor(piece, horizontal, vertical) 
    {
        var cellLocation = this.#getRelativeCell(piece, horizontal, vertical);
        var cellRow = cellLocation[0];
        var cellCol = cellLocation[1];
        var color = this.#getPiece(cellRow, cellCol).color;
        return color;
    }
    #getRelativeCell(piece, horizontal, vertical) 
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
    #getPiece(row, col)
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
     */
    #getRelativePiece(piece, horizontal, vertical)
    {
        var cellLocation = this.#getRelativeCell(piece, horizontal, vertical);
        var targetRow = cellLocation[0];
        var targetCol = cellLocation[1];
        return 
        
    }
    /**
     * 
     * @param {Piece} piece 
     * @returns if the piece is a soldier
     */
    #checkSoldier(piece) {
        if (piece.role !== "normal" && piece.role !== "queen")
        {
            throw("Piece role is not normal or queen");
        }
        return piece.role === "normal";
    }
    /**
     * 
     * @param {Piece} piece 
     * @returns if the piece is red or not
     */
    #checkRedPiece(piece) 
    {
        if (piece.color !== "red" && piece.color !== "blue")
        {
            throw("piece color is not red or blue.");
        }
        return piece.color === "red";
    }
}











