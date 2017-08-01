$(document).ready(function () {
    var sudoku = new Sudoku([
        ["1", "", "6", "", "", "", "8", "", "9"],
        ["", "3", "", "", "", "", "", "7", ""],
        ["7", "", "", "9", "", "5", "", "", "3"],
        ["", "", "1", "7", "9", "4", "5", "", ""],
        ["", "", "", "5", "", "8", "", "", ""],
        ["", "", "8", "1", "3", "2", "9", "", ""],
        ["8", "", "", "3", "", "7", "", "", "6"],
        ["", "6", "", "", "", "", "", "8", ""],
        ["2", "", "3", "", "", "", "1", "", "7"]
    ], [
        ['1', '1', '1', '2', '2', '2', '3', '3', '3'],
        ['1', '1', '1', '2', '2', '2', '3', '3', '3'],
        ['1', '1', '1', '2', '2', '2', '3', '3', '3'],
        ['4', '4', '4', '5', '5', '5', '6', '6', '6'],
        ['4', '4', '4', '5', '5', '5', '6', '6', '6'],
        ['4', '4', '4', '5', '5', '5', '6', '6', '6'],
        ['7', '7', '7', '8', '8', '8', '9', '9', '9'],
        ['7', '7', '7', '8', '8', '8', '9', '9', '9'],
        ['7', '7', '7', '8', '8', '8', '9', '9', '9']
    ]);

    //sudoku.init();

    $('#next-button').on('click', function () {
        sudoku.next();
    });
});


class Sudoku {

    constructor(board, group) {
        this.board = new GameBoard(board, group);
        this.board.init();
    }


    updatePossibilities() {

        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                if ($.isArray(this.final_board[y][x])) {

                    var self = this;

                    this.final_board[y][x].forEach(function (number, index) {

                        if (self.inGroup(number, x, y) || self.inRow(number, x, y) || self.inCol(number, x, y)) {
                            console.log("removing: " + number + " ( " + x + ", " + y + " )");
                            self.final_board[y][x].splice(index, 1);
                        } else {
                            console.log("Keeping: " + number + " ( " + x + ", " + y + " )");
                        }

                    });
                }
            }
        }
    } // updatePossibilities()

    next() {
        //this.updatePossibilities();
        //this.updateBoard();
    } // end next()


    /**** Game Rules ****/

    inGroup(tn, tx, ty) {

        var target_group = this.group[ty][tx];

        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                if (this.group[y][x] == target_group) {
                    if (this.final_board[y][x] == tn) {
                        return true;
                    }
                }
            } // end for x
        } // end for y

        return false;
    } // end inGroup()

    inRow(tn, tx, ty) {

        for (var x = 0; x < 9; x++) {
            if (this.final_board[ty][x] == tn) {
                return true;
            }
        }

        return false;
    } // end inRow()

    inCol(tn, tx, ty) {

        for (var y = 0; y < 9; y++) {
            if (this.final_board[y][tx] == tn) {
                return true;
            }
        }

        return false;
    } // end inRow()

}


class GameBoard {

    constructor(board, group) {

        this.starting_board = board;
        this.group = group;
        this.current_board = [];
    }

    // draw the initial board
    init() {

        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {

                // selector for a box(game piece) on the board
                var selector = '.row_' + (y + 1) + ' .col_' + (x + 1);

                // add starting values to grid
                $(selector).html(this.starting_board[y][x]);

                // add game piece group class
                $(selector).addClass(this.group[y][x] % 2 === 0 ? 'even' : 'odd')
                    .addClass('starting-value');
            }
        }

    }

    setGamePiece(value, x, y) {
        var selector = '.row_' + (y + 1) + ' .col_' + (x + 1);

        if (this.final_board[y][x].length === 1) {
            $(selector).html(this.final_board[y][x]);
        }
    }

    getCurrentBoard(){
        return this.current_board;
    }
}