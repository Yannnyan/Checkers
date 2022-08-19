


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
     * Returns all the valid moves for the piece in an array, if there aren't then return an empty array
     * @param {Piece} piece 
     */
    getValidMoves(piece) {
        var validMoves = []
        // piece is blue, and it's blue's turn
        if (this.#checkRedPiece(piece) && this.turnHandler.isRedTurn() ||
        !this.#checkRedPiece(piece) && !this.turnHandler.isRedTurn())
        {
            console.log("hello");
            // piece is soldier
            if (this.#checkSoldier(piece))
            {
                validMoves = this.#soldierMoves(piece);
                console.log(validMoves);
            }
            // piece is queen
            else 
            {
                // add cases for queen.
            }
        }
        return validMoves;
       
        
    }

    #soldierMoves(piece)
    {
        var validMoves = [];
        let eatingPieces = this.#checkHasToEat(); 
        if (eatingPieces.indexOf(piece) !== -1) // not null, and eat piece is the piece that is targeted
        {
            return [this.#checkSoldierCanEat(piece)];
        }
        else if (eatingPieces.indexOf(piece) === -1 && eatingPieces.length != 0) // must eat the piece
        {
            return [];
        }
        if (this.#checkRedPiece(piece))
        {
            if (this.board.checkRelativeNotOccupied(piece, "left", "bottom"))
            {
                validMoves.push(this.board.getRelativeCell(piece, "left", "bottom"));
            }
            if (this.board.checkRelativeNotOccupied(piece, "right", "bottom")) 
            {
                validMoves.push(this.board.getRelativeCell(piece, "right", "bottom"));
            }
        }
        else
        {
            if(this.board.checkRelativeNotOccupied(piece, "left", "top"))
            {
                validMoves.push(this.board.getRelativeCell(piece, "left", "top"));
            }
            if (this.board.checkRelativeNotOccupied(piece, "right", "top"))
            {
                validMoves.push(this.board.getRelativeCell(piece, "right", "top"));
            }
        }
        return validMoves;

    }


    /** Check soldier operations */

    /**
     * Checks if one of the pieces of the current team color has to eat
     * @returns {[Piece] | null}the pieces that have to eat or null;
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
        // determine the piece color, throws exception if not red or blue
        var targetColor = this.#checkRedPiece(piece) ? "blue" : "red";

        // backwards eat
        if (vertical === "top" && piece.color === "red" ||
            vertical === "bottom" && piece.color === "blue")
        {
            throw("cannot eat backwards.");
        }
        // bottom-left occupied by a blue piece
        if (!this.board.checkRelativeNotOccupied(piece, horizontal, vertical))
        {
            if (this.board.getRelativePieceColor(piece, horizontal, vertical) === targetColor)
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
        var horizontal = ["left", "right"];
        var vertical = ["top", "bottom"];
        for(let i = 0; i < 2; i++)
        {
            try
            {
                // if red, check if the piece can eat downwards
                if (this.#checkRedPiece(piece))
                {
                    target = this.#checkSoldierCanEatRelative(piece, horizontal[i], vertical[1]);
                    if (target) return target;
                }
                // if blue, check if the piece can eat upwards
                else
                {
                    target = this.#checkSoldierCanEatRelative(piece, horizontal[i], vertical[0]);
                    if (target) return target;
                }
            }
            catch (e) // expecting out of bounds, if so it cannot eat so no need to do anything.
            {
                if (!(e === "out-of-bounds")) throw(e);
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






