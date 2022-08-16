

/** Red blue pieces, board size - 8 x 8*/
function validateRow(row) {
    if (row >= 8 || row < 0) {
        throw("Illigal row.");
    }
}

function validateCollum(collum) {
    if (collum >= 8 || collum < 0) {
        throw("Illigal collum.");
    }
}
function validateColor(color) {
    if (color !== "red" && color !== "blue") {
        throw("Cannot instantiate not blue and not red pieces.");
    }
}

var board = new Board();
