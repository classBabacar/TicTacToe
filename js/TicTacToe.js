
 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");

class TicTacToe {
    constructor(p1, p2){
        this.board = [
            ['#', '#', '#'],
            ['#', '#', '#'],
            ['#', '#', '#']
        ];
        this.player1 = p1;
        this.player2 = p2;
        this.moveNumber = 0;
    }

    isValidMove(position, board){
        const [arrayRow, arrayCol] = this.getPositionArrayIndex(position);
        if(board[arrayRow][arrayCol] == '#'){
            return true;
        }
        return false;
    }

    storeMove(moveNumber, position){
        const [arrayRow, arrayCol] = this.getPositionArrayIndex(position);
        this.board[arrayRow][arrayCol] = moveNumber % 2 == 0 ? 'O' : 'X';
    }

    getPositionArrayIndex(position){
        switch(position){
            case 1:
                return [0, 0];
            case 2:
                return [0, 1];
            case 3:
                return [0, 2];
            case 4:
                return [1, 0];
            case 5:
                return [1, 1];
            case 6:
                return [1, 2];
            case 7:
                return [2, 0];
            case 8:
                return [2, 1];  
            case 9:
                return [2, 2];
        }
    }
    
    makeMove(position, moveNumber){
        let startingX = 0;
        let startingY = 0;
        for(let i = 1; i < position; ++i){
            startingX += 200;
            if(startingX >= 600){
                startingX = 0;
                startingY += 200;
            }
        }
        ctx.beginPath();
        ctx.lineWidth = 12;

        if(moveNumber % 2 == 0){
            // This makes an O.
            ctx.strokeStyle = 'green';
            ctx.arc(startingX + 100, startingY + 100, 75, 0, Math.PI * 2, true); // Outer circle
        }else if(moveNumber % 2 == 1){
            ctx.strokeStyle = 'red';

            // Top Left to Bottom Right Line
            ctx.moveTo(startingX + 25, startingY + 25);
            ctx.lineTo(startingX + 200 - 25, startingY + 200 - 25);
    
            // Top Right to Bottom Left Line
            ctx.moveTo(startingX + 200 -25, startingY + 25);
            ctx.lineTo(startingX + 25, startingY + 200 - 25);
    
            // This makes an X
        }
        ctx.stroke();
        this.moveNumber++;
    }

    boxSelection(canvasX, canvasY){
        // Top Most Row
        if(canvasY <= 200 && canvasY >= 0){
            if(canvasX <= 200){
                return 1;
            }else if(200 < canvasX && canvasX <= 400){
                return 2;
            }else if(400 < canvasX && 400 < canvasX <= 600){
                return 3;
            }
        }
        // Middle Row
        else if (200 < canvasY && canvasY <= 400){
            if(canvasX <= 200){
                return 4;
            }
            else if(200 < canvasX && canvasX <= 400){
                return 5;
            }
            else if(400 < canvasX && 400 < canvasX <= 600){
                return 6;
            }
        }
        // Last Row
        else if (400 < canvasY && canvasY <= 600){
            if(canvasX <= 200){
                return 7;
            }
            else if(200 < canvasX && canvasX <= 400){
                return 8;
            }
            else if(400 < canvasX && 400 < canvasX <= 600){
                return 9;
            }
        }
        return 0;
    }

    isGameOver(board, moveNumber){
        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        for(let i = 0; i < 3; ++i){
            if(board[i][0] == playerSymbol && board[i][1] == playerSymbol && board[i][2] == playerSymbol){
                return true;
            }
            if(board[0][i] == playerSymbol && board[1][i] == playerSymbol && board[2][i] == playerSymbol){
                return true;
            }
        }

        if(board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol){
            return true;
        }

        if(board[2][0] == playerSymbol && board[1][1] == playerSymbol && board[0][2] == playerSymbol){
            return true;
        }
        return false;
    }

    isTie(board){
        let pieceCount = 0;
        for(let row = 0; row < 3; ++row){
            for(let col = 0; col < 3; ++col){
                if(board[row][col] == 'X' || board[row][col] == 'O'){
                    pieceCount++;
                }
            }
        }
        if(pieceCount == 9){
            return !this.isGameOver(board, 1) && !this.isGameOver(board, 0) ;
        }

        return false;
    }

    whereToDrawWinningLine(board, moveNumber){
        // 3 ways to win horizontally so rowIndexStart can return 0, 1, 2
        let rowIndexStart = 0;

        // 3 ways to win vertically but its after rowIndexStart can return 3, 4, 5
        let colIndexStart = 3;

        // 2 ways to win diagonally but after colIndexStart can return 6, 7
        let topLeftToBottomRight = 6;
        let topRightToBottomLeft = 7;

        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        for(let i = 0; i < 3; ++i){
            if(board[i][0] == playerSymbol && board[i][1] == playerSymbol && board[i][2] == playerSymbol){
                return this.drawWinningLine(rowIndexStart);
            }
            if(board[0][i] == playerSymbol && board[1][i] == playerSymbol && board[2][i] == playerSymbol){
                return this.drawWinningLine(colIndexStart);
            }

            rowIndexStart++;
            colIndexStart++;
        }

        if(board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol){
            return this.drawWinningLine(topLeftToBottomRight);
        }

        if(board[2][0] == playerSymbol && board[1][1] == playerSymbol && board[0][2] == playerSymbol){
            return this.drawWinningLine(topRightToBottomLeft);
        }
    }

    drawWinningLine(indexToDrawLine){
        ctx.beginPath();

        let startingX = 0;
        let startingY = 0;

        if(indexToDrawLine <= 2){ // Horizontal Lines
            startingY = 100;
            for(let i = 0; i < indexToDrawLine; ++i){
                startingY += 200;
            }
            ctx.moveTo(startingX, startingY);
            ctx.lineTo(startingX + 600, startingY);
        }else if(indexToDrawLine > 2 && indexToDrawLine <= 5){ // Vertical Lines
            startingX = 100;
            for(let i = 3; i < indexToDrawLine; ++i){
                startingX += 200;
            }
            ctx.moveTo(startingX, startingY);
            ctx.lineTo(startingX, startingY + 600);
        }else if(indexToDrawLine == 6){ // Top Left to Bottom Right Diagonal
            ctx.moveTo(startingX, startingY);
            ctx.lineTo(startingX + 600, startingY + 600);
        }else if(indexToDrawLine == 7){ // Top Right to Bottom Left Diagonal
            startingX = 600;
            startingY = 0;
            ctx.moveTo(startingX, startingY);
            ctx.lineTo(startingX - 600, startingY + 600);
        }
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 10;

        ctx.stroke();
    }

    drawTieLine(){
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 15;

        // Unit Cirle (2*Math.PI = 2π) -- Using this you can draw a cicle with correct radians
        ctx.arc(300, 300, 275, (Math.PI)/6, (11 * Math.PI)/6, false);
        ctx.stroke();
    }

    getPlayerTurnResponse(moveNumber){
        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = `Who's Turn: ${playerSymbol}`;
    }

    showWinner(moveNumber){
        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = `Congratulations! ${playerSymbol}, you are the winner! `;
    }

    showTie(){
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = "This is a Tie. Play Another Game!";
    }

    restart(){
        this.board = [
            ['#', '#', '#'],
            ['#', '#', '#'],
            ['#', '#', '#']
        ];
        this.moveNumber = 0;
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = "";
    }
}
