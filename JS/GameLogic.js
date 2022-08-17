


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
    getValidMoves(piece) {
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
                if (this.board.checkRelativeNotOccupied(piece, "left", "bottom"))
                {
                    validMoves.push(this.board.getRelativeCell(piece, "left", "bottom"));
                }
                if (this.board.checkRelativeNotOccupied(piece, "right", "bottom")) 
                {
                    validMoves.push(this.board.getRelativeCell(piece, "right", "bottom"));
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
                target = this.board.checkSoldierCanEat(piece);
                if (target) 
                {
                    return [target];
                }
                if(this.board.checkRelativeNotOccupied(piece, "left", "top"))
                {
                    validMoves.push(this.board.getRelativeCell(piece, "left", "top"));
                }
                if (this.board.checkRelativeNotOccupied(piece, "right", "top"))
                {
                    validMoves.push(this.board.getRelativeCell(piece, "right", "top"));
                }
            }
            // piece is queen
            else 
            {
                // add cases for queen.
            }
        }
        return validMoves;
       
        
    }


    /** Check soldier operations */

    /**
     * 
     * @param {*} piece 
     * @param {*} horizontal 
     * @param {*} vertical 
     * @returns {Piece | null} the piece that is can eat, null if it cannot eat.
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
            if (!this.board.checkRelativeNotOccupied(piece, horizontal, vertical)
            && this.board.getRelativePieceColor(piece, horizontal, vertical) === "blue")
            {
                var targetPiece = this.board.getRelativePiece(piece, horizontal, vertical);
                // can eat the target piece
                if (this.board.checkRelativeNotOccupied(targetPiece, horizontal, vertical))
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
            if (!this.board.checkRelativeNotOccupied(piece, horizontal, vertical)
            && this.board.getRelativePieceColor(piece, horizontal, vertical) === "red")
            {
                var targetPiece = this.board.getRelativePiece(piece, horizontal, vertical);
                // can eat the target piece
                if (this.board.checkRelativeNotOccupied(targetPiece, horizontal, vertical))
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
            target = this.board.checkSoldierCanEatRelative("left", "bottom");
            if (target)
            {
                return target;
            }
            target = this.board.checkSoldierCanEatRelative("right", "bottom");
            if(target)
            {
                return target;
            }
        }
        else 
        {
            target = this.board.checkSoldierCanEatRelative("left", "top");
            if (target)
            {
                return target;
            }
            target = this.board.checkSoldierCanEatRelative("right", "top");
            if(target)
            {
                return target;
            }
        }
        return null;
    }

    /** Checkers and getters for cells specifically */

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











