
class changeBoard {
    constructor()
    {
    }

    static movePiece(row , col, rowToMoveTo, colToMoveTo)
    {
        console.log("Moving piece with the coordinates: ");
        console.log(row + " " + col + " " + rowToMoveTo + " " + colToMoveTo)
        console.log(this.getCellElement(row, col));
        console.log(this.getCellElement(rowToMoveTo, colToMoveTo));
        var cellhtml = this.getPieceBySpec(row, col);
        this.getCellElement(rowToMoveTo, colToMoveTo).innerHTML = cellhtml;
        this.getCellElement(row, col).innerHTML = "";
        
    }
    /**
     * Deletes the piece from the board
     * @param {int} row 
     * @param {int} col 
     */
    static delPiece(row, col)
    {
        console.log("Eating the piece with coordinates: ");
        console.log(row +" " + col);
        this.getCellElement(row, col).innerHTML = "";
    }
    /**
     * 
     * @param {int} row 
     * @param {int} col
     * @returns {string} the contents of the html <td> of the specified cell. 
     */
    static getPieceBySpec(row, col)
    {
        return this.getCellElement(row, col).innerHTML;
    }
    /**
     * 
     * @param {int} row 
     * @param {int} col 
     * @returns {string} the id of the piece specified
     */
    static getPieceIdBySpec(row, col)
    {
        // span with the property of the 
        var pieceSpan = this.getCellElement(row, col).childNodes[0];
        console.log(pieceSpan);
        return pieceSpan.getAttribute("id");
    }
    /**
     * 
     * @param {int} row 
     * @param {int} col
     * @returns {Element} the contents of the html element of the td specified.
     */
    static getCellElement(row, col)
    {
        // console.log(row + " " + col);
        var table = document.getElementById("board");
        // notice that the first line is just characters
        // that's why skip it
        var rows = table.getElementsByTagName("tr");
        // notice that the first collum is just numbers
        // but it is titled with th not td. so the first col is indexed 0 in td elements of the row actually
        var rowCells = rows[row + 1].getElementsByTagName("td");
        return rowCells[col];
    }
    /**
     * 
     * @param {Piece} piece 
     * @param {} index 
     * @returns {Element} span that represents a piece
     */
    static getPieceElement(piece, index)
    {
        var idNamePref = piece.color + "Circle" + index;
        return document.getElementById(idNamePref);
    }


}









