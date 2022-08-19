
 /** This class represents the logic and mechanisms that reside in the game */

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
        // piece is blue, and it's blue's turn for example
        if (this.#checkRedPiece(piece) && this.turnHandler.isRedTurn() ||
        !this.#checkRedPiece(piece) && !this.turnHandler.isRedTurn())
        {
            let eatingPieces = this.#checkHasToEat();
            if (eatingPieces.indexOf(piece) !== -1) // not null, and eat piece is the piece that is targeted
            {
                return this.#checkSoldier(piece) ? [this.checkSoldierCanEat(piece)] : [this.#checkQueenCanEat(piece)];
            }
            else if (eatingPieces.indexOf(piece) === -1 && eatingPieces.length != 0) // must eat the piece
            {
                return [];
            }
            // piece is soldier
            if (this.#checkSoldier(piece))
            {
                validMoves = this.#soldierMoves(piece);
            }
            // piece is queen
            else 
            {
                validMoves = this.#queenMoves(piece);
            }
        }
        return validMoves;
       
        
    }

    #queenMoveRelative(piece, horizontal, vertical)
    {
        var validMovesRelative = [];
        var addRow, addCol;
        addRow = vertical === "top" ? -1 : 1;
        addCol = horizontal === "left" ? -1 : 1;
        var row = piece.row + addRow;
        var col = piece.collum + addCol;
        try
        {
            // untill the cell checked is occupied continues to add valid moves
            while (this.board.checkCellNotOccupied(row, col))
            {
                validMovesRelative.push([row, col]);
                row += addRow;
                col += addCol;
            }
        }
        catch (e) {if (e !== "out-of-bounds") throw e;}
       return validMovesRelative;
    }
    #queenMoves(piece)
    {
        var validMoves = [];
        var horizontal = ["left", "right"];
        var vertical = ["top", "bottom"];
        for (let i = 0; i < 2; i++)
            for (let j = 0; j < 2; j++)
            {
                validMoves = validMoves.concat(this.#queenMoveRelative(piece, horizontal[j], vertical[i]));
            }
        return validMoves;
    }

    #soldierMoves(piece)
    {
        var validMoves = [];
        var horizontal = ["left", "right"];
        var vertical = ["top", "bottom"];
        for (let i = 0; i < 2; i++)
        {
            try
            {
                if (this.#checkRedPiece(piece)) // red piece
                {
                if (this.board.checkRelativeNotOccupied(piece, horizontal[i], vertical[1])) // check if bottom right or left is avail
                    validMoves.push(this.board.getRelativeCell(piece, horizontal[i], vertical[1]));
                }
                else // blue piece
                if (this.board.checkRelativeNotOccupied(piece, horizontal[i], vertical[0]))  //check if top right or left is avail
                    validMoves.push(this.board.getRelativeCell(piece, horizontal[i], vertical[0]));
            } // expecting out of bounds, at this case we are not doing anything, since that move is invalid.
            catch (e) {if(e !== "out-of-bounds") throw(e);}
            
        }
        return validMoves;

    }

    /** Check queen operations */


    /**
     * return the location which must be occupied when eating the piece relatively
     * @param {Piece} piece 
     * @param {string} horizontal 
     * @param {string} vertical 
     * @returns {[] | null} [dest-row, dest-col, "eat", target-piece-Row, target-piece-Col]
     */
    #checkQueenCanEatRelative(piece, horizontal, vertical)
    {
        var eatColor = piece.color === "red" ? "blue" : "red";
        var row = piece.row;
        var col = piece.collum;
        var addRow = vertical === "top" ? -1 : 1;
        var addCol = horizontal === "left" ? -1 : 1;
        row += addRow;
        col += addCol;
        try // expecting to go out of bounds
        {
            while (this.board.checkCellNotOccupied(row, col))
            {row += addRow; col += addCol;} // continue untill find a cell occupied with a piece, or go out of bound
            let cell = this.board.getCell(row, col);
            let targetPiece = cell.occupied;
            if (targetPiece.color === eatColor)
            if (this.board.checkRelativeNotOccupied(targetPiece, horizontal, vertical))
                return [row + addRow, col + addCol, "eat", targetPiece.row, targetPiece.collum];
        }
        catch (e) {if (e !== "out-of-bounds") throw (e);}
        return null;
    }
    /**
     * @param queen
     * @returns array where each member is location which must be occupied when eating the piece
     */
    #checkQueenCanEat(piece)
    {
        var eatMoves = [];
        var horizontal = ["left", "right"];
        var vertical = ["top", "bottom"];
        var i,j;
        var eatLocation;
        for (i = 0; i < vertical.length; i++)
        {
            for (j = 0; j < horizontal.length; j++)
            {
                eatLocation = this.#checkQueenCanEatRelative(piece, horizontal[j], vertical[i]);
                if (eatLocation)
                {
                    eatMoves = eatMoves.concat(eatLocation);
                }
            }
        }
        return eatMoves;

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
        var piece;
        for (let i = 0; i < this.board.sizeTeam; i++)
        {
            if (map.has(i)) // map contains the piece
            {
                piece = map.get(i);
                if (this.#checkSoldier(piece)) // if soldier
                {
                    if (this.checkSoldierCanEat(piece))
                    {
                        // returns the piece that has to eat
                        mustEatPieces.push(piece);
                    }
                }
                else // if queen
                {
                    if (this.#checkQueenCanEat(piece).length !== 0)
                    {
                        mustEatPieces.push(piece);
                    }
                }
            }
            
        }
        return mustEatPieces;
    }
    /**
     * 
     * @param {*} piece 
     * @param {*} horizontal 
     * @param {*} vertical 
     * @returns [dest-row, dest-col, "eat", target-piece-row, target-piece-col] | null 
     * the cell that must be occupied after eat, null if it cannot eat.
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
    checkSoldierCanEat(piece) 
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
                if (e !== "out-of-bounds") throw(e);
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
    // 
    /** Makes a turn, switching the current turn to opposite color
     * 
     * @param {Piece} piece that made the last eat, if the piece aet, then it will eat again because
     *  of the must eat mechanism.
     * @param {GameLogic} logic of the board
     * @param {Boolean} eat did the piece eat in that turn.
     */
    makeTurn(piece, logic, eat)
    {
        if (eat && logic.checkSoldierCanEat(piece))
        {
            // soldier can still eat, don't switch turns
            return;
        }
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






