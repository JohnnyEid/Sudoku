$(document).ready(function () {
    var gameBoard = new GameBoard([
        ["1","","6","","","","8","","9"],
        ["","3","","","","","","7",""],
        ["7","","","9","","5","","","3"],
        ["","","1","7","9","4","5","",""],
        ["","","","5","","8","","",""],
        ["","","8","1","3","2","9","",""],
        ["8","","","3","","7","","","6"],
        ["","6","","","","","","8",""],
        ["2","","3","","","","1","","7"]
    ],[
        ['1','1','1','2','2','2','3','3','3'],
        ['1','1','1','2','2','2','3','3','3'],
        ['1','1','1','2','2','2','3','3','3'],
        ['4','4','4','5','5','5','6','6','6'],
        ['4','4','4','5','5','5','6','6','6'],
        ['4','4','4','5','5','5','6','6','6'],
        ['7','7','7','8','8','8','9','9','9'],
        ['7','7','7','8','8','8','9','9','9'],
        ['7','7','7','8','8','8','9','9','9']
    ] );

    gameBoard.init();

    $('#next-button').on('click', function(){
    	gameBoard.next();
    });
});




class GameBoard {

    constructor(board, group) {
        
        this.base_board 	= board;
        this.group 			= group;
        this.final_board 	= [];
        this.start_board 	= true;
        
        for (var y = 0; y < 9; y++){
    		this.final_board[y] = [];    	
	        
	        for (var x = 0; x < 9; x++){
	        	if ($.isNumeric(this.base_board[y][x])){
	    			//this.final_board[y][x] = [this.base_board[y][x]];
	    			this.final_board[y][x] = this.base_board[y][x];
	    		} else {
	    			this.final_board[y][x] = [1,2,3,4,5,6,7,8,9];    	
	        	}
	        }	
        }
    }

    init(){

    	this.drawBoard();
    } // end init()

    updatePossibilities(){
   	
    	for (var y = 0; y < 9; y++){
    		for (var x = 0; x < 9; x++){
	        	if ($.isArray(this.final_board[y][x])){
                    
                    var self = this;

	        		this.final_board[y][x].forEach(function(number, index){
	        		
                    	if (self.inGroup(number, x, y) || self.inRow(number, x, y) || self.inCol(number, x, y)){
		        			console.log("removing: " + number + " ( " + x + ", " + y + " )");
							self.final_board[y][x].splice(index,1);
	        			} else {
		        			console.log("Keeping: " + number + " ( " + x + ", " + y + " )");
	        			}
	        		
	        		});
    			}
	        }	
        }
    } // updatePossibilities()

    inGroup(tn, tx, ty){

    	var target_group = this.group[ty][tx];

    	for (var y = 0; y < 9; y++) {
        	for (var x = 0; x < 9; x++) {
        		if (this.group[y][x] == target_group){
        			if (this.final_board[y][x] == tn){
        				return true;
        			}
        		}
			} // end for x
		} // end for y

		return false;
    } // end inGroup()


    inRow(tn, tx, ty){
    	
    	for (var x = 0; x < 9; x++) {
        	if (this.final_board[ty][x] == tn){
        		return true;
        	}
    	}

    	return false;
    } // end inRow()

    inCol(tn, tx, ty){
		
		for (var y = 0; y < 9; y++) {
        	if (this.final_board[y][tx] == tn){
        		return true;
        	}
    	}

    	return false;
    } // end inRow()
    

    next(){
    	this.updatePossibilities();
    	this.drawBoard();
    } // end next()


    drawBoard(){
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {

               	var box = '.row_' + (y + 1) + ' .col_' + (x + 1);
                
                // add starting values to grid
                if (this.final_board[y][x].length == 1){
                	
                	$(box).html(this.final_board[y][x]);
                }

                $(box).addClass(this.group[y][x] % 2 == 0? 'even' : 'odd');

                if (!this.start_board){
	                $(box).addClass('new-number');
                }
            }
        }

        this.start_board = false;
    }
}