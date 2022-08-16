
class Piece {
    constructor(row, collum, color) {
        validateRow(row);
        validateCollum(collum);
        validateCollum(color);
        this.row = row;
        this.collum = collum;
        this.color = color;
        this.role = "normal";
    }

    movePiece(rowToMoveTo, colToMoveTo) {
        validateCollum(colToMoveTo);
        validateRow(rowToMoveTo);
        alert("Thanks for clicking me " + this.row + " " + this.collum);
    }
}






