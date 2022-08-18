


class GameLogic {
    /**
     * 
     * @param {Board} board 
     */
    constructor (board) {
        this.board = board;
        this.turnHandler = new TurnHandler();
    }
    /**
     * 
     * @param {Piece} piece 
     */
    getValidMoves(piece) {
        var validMoves = []
        var targetCell;

        // piece is red and it's red's turn
        if (this.#checkRedPiece(piece) && this.turnHandler.isRedTurn())
        {
            // must eat mechanism

            // this is the piece that is eating the other piece
            // i.e the one that the user should select
            let eatingPieces = this.#checkHasToEat(); 
            if (eatingPieces.indexOf(piece) !== -1) // not null, and eat piece is the piece that is targeted
            {
                return [this.#checkSoldierCanEat(piece)];
            }
            else if (eatingPieces.indexOf(piece) === -1 && eatingPieces.length !== 0) // one exists that must eat the piece
            {
                return [];
            }

            // piece is soldier
            if (this.#checkSoldier(piece)) 
            {
                targetCell = this.#checkSoldierCanEat(piece);
                if (targetCell) 
                {
                    return [targetCell];
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
        // piece is blue, and it's blue's turn
        else if (!this.#checkRedPiece(piece) && !this.turnHandler.isRedTurn())
        {
            // must eat mechanism

            // this is the piece that is eating the other piece
            // i.e the one that the user should select
            let eatingPieces = this.#checkHasToEat(); 
            if (eatingPieces.indexOf(piece) !== -1) // not null, and eat piece is the piece that is targeted
            {
                return [this.#checkSoldierCanEat(piece)];
            }
            else if (eatingPieces.indexOf(piece) === -1 && eatingPieces.length != 0) // must eat the piece
            {
                return [];
            }

            // piece is soldier
            if (this.#checkSoldier(piece))
            {
                targetCell = this.#checkSoldierCanEat(piece);
                if (targetCell) 
                {
                    return [targetCell];
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
     * Checks if one of the pieces of the current team color has to eat
     * @returns {[Piece] | null}the piece that has to eat or null;
     */
    #checkHasToEat()
    {
        var mustEatPieces = [];
        var map = this.turnHandler.isRedTurn() ? this.board.redPieces : this.board.bluePieces;
        for (let i = 0; i < this.board.sizeTeam; i++)
        {
            if (map.has(i))
            if (this.#checkSoldierCanEat(map.get(i)))
            {
                // returns the piece that has to eat
                mustEatPieces.push(map.get(i));
            }
        }
        return mustEatPieces;
    }
    /**
     * 
     * @param {*} piece 
     * @param {*} horizontal 
     * @param {*} vertical 
     * @returns [row, col, "eat"] | null the cell that must be occupied after eat, null if it cannot eat.
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
                    var ret = this.board.getRelativeCell(targetPiece, horizontal, vertical);
                    ret[2] = "eat";
                    ret[3] = targetPiece.row;
                    ret[4] = targetPiece.collum;
                    return ret;
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
                    var ret = this.board.getRelativeCell(targetPiece, horizontal, vertical);
                    ret[2] = "eat";
                    ret[3] = targetPiece.row;
                    ret[4] = targetPiece.collum;
                    return ret;
                }
            }
        }
        return null;
    }
    
    /**
     * 
     * @param {Piece} piece 
     * @returns [dest-row, dest-col, "eat", eat-row, eat-col] | null 
     * if the piece can eat returns the cell that must be occupied after the eat, and the cell that must be eaten
     *  otherwise return null.
     */
    #checkSoldierCanEat(piece) 
    {
        var target;
        if (this.#checkRedPiece(piece))
        {
            try
            {
                target = this.#checkSoldierCanEatRelative(piece, "left", "bottom");
                if (target)
                {
                    return target;
                }
            }
            // expecting exception for out of bounds
            catch(e)
            {
                if (!(e === "out-of-bounds")) // if it's not out of bounds
                {
                    throw(e);
                }
            }
            try
            {
                target = this.#checkSoldierCanEatRelative(piece, "right", "bottom");
                if(target)
                {
                    return target;
                }
            }
            catch(e)
            {
                if (!(e === "out-of-bounds")) // if it's not out of bounds
                {
                    throw(e);
                }
            }
        }
        else 
        {
            // expecting exception for out of bounds
            try
            {
                target = this.#checkSoldierCanEatRelative(piece, "left", "top");
                if (target)
                {
                    return target;
                }
            }
            catch(e)
            {
                if (!(e === "out-of-bounds")) // if it's not out of bounds
                {
                    throw(e);
                }
            }
            try
            {
                target = this.#checkSoldierCanEatRelative(piece, "right", "top");
                if(target)
                {
                    return target;
                }
            }
            catch(e)
            {
                if (!(e === "out-of-bounds")) // if it's not out of bounds
                {
                    throw(e);
                }
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
            throw("piece color is not red nor blue.");
        }
        return piece.color === "red";
    }
}




class TurnHandler{
    constructor() 
    {
        this.turn = "blue";
    }
    // makes a turn, switching the current turn to opposite color
    makeTurn()
    {
        switch (this.turn)
        {
            case "red":
                this.turn = "blue";
                break;
            case "blue":
                this.turn = "red";
                break;
            default:
                throw("invalid color");
        }
    }
    /**
     * 
     * @returns if the current turn is red's
     */
    isRedTurn()
    {
        return this.turn === "red";
    }

}






