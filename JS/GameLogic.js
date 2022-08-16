


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
        var target;
        // piece is red
        if (this.#checkRedPiece(piece))
        {
            // piece is soldier
            if (this.#checkSoldier(piece)) 
            {
                target = this.#checkSoldierCanEat(piece);
                if (target) 
                {
                    return [target];
                }
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
                target = this.#checkSoldierCanEat(piece);
                if (target) 
                {
                    return [target];
                }
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
     * @param {*} piece 
     * @param {*} horizontal 
     * @param {*} vertical 
     */
    #checkSoldierCanEatRelative(piece, horizontal, vertical)
    {
        // piece is red soldier
        if (this.#checkRedPiece(piece)) 
        {
            if (vertical === "top")
            {
                throw("cannot eat backwards.");
            }
            // bottom-left occupied by a blue piece
            if (!this.#checkRelativeNotOccupied(piece, horizontal, vertical)
            && this.#getRelativePieceColor(piece, horizontal, vertical) === "blue")
            {
                var targetPiece = this.#getRelativePiece(piece, horizontal, vertical);
                // can eat the target piece
                if (this.#checkRelativeNotOccupied(targetPiece, horizontal, vertical))
                {
                    return targetPiece;
                }
            }
        }
        // piece is blue soldier
        else 
        {
            if (vertical === "bottom")
            {
                throw("cannot eat backwards");
            }
            // bottom-left occupied by a blue piece
            if (!this.#checkRelativeNotOccupied(piece, horizontal, vertical)
            && this.#getRelativePieceColor(piece, horizontal, vertical) === "red")
            {
                var targetPiece = this.#getRelativePiece(piece, horizontal, vertical);
                // can eat the target piece
                if (this.#checkRelativeNotOccupied(targetPiece, horizontal, vertical))
                {
                    return targetPiece;
                }
            }
        }
        return null;
    }
    
    /**
     * 
     * @param {Piece} piece 
     * @returns {Piece | null} if the piece can eat returns the piece location, otherwise return null.
     */
    #checkSoldierCanEat(piece) 
    {
        var target;
        if (this.#checkRedPiece(piece))
        {
            target = this.#checkSoldierCanEatRelative("left", "bottom");
            if (target)
            {
                return target;
            }
            target = this.#checkSoldierCanEatRelative("right", "bottom");
            if(target)
            {
                return target;
            }
        }
        else 
        {
            target = this.#checkSoldierCanEatRelative("left", "top");
            if (target)
            {
                return target;
            }
            target = this.#checkSoldierCanEatRelative("right", "top");
            if(target)
            {
                return target;
            }
        }
        return null;
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
        return this.#getPiece(targetRow, targetCol);
        
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











