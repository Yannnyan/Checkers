
class Piece {
    /** Red blue pieces, board size - 8 x 8*/
    constructor(row, collum, color) {
        this.row = row;
        this.collum = collum;
        this.color = color;
        this.role = "normal";
    }
    movePiece(rowToMoveTo, colToMoveTo) {
        this.row = rowToMoveTo;
        this.col = colToMoveTo;
    }
    makeQueen() {
        this.role = "queen";
    }
}






