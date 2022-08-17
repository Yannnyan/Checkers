
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
        this.collum = colToMoveTo;
    }
    makeQueen() {
        this.role = "queen";
    }
    get getCollum()
    {
        return this.collum;
    }
    get getRow()
    {
        return this.row;
    }
    get getColor()
    {
        return this.color;
    }
    get getRole()
    {
        return this.role;
    }
}






