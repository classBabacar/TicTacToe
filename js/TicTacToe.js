
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
        ctx.strokeStyle = 'red';
        
        if(moveNumber % 2 == 0){
            // This makes an O.
            ctx.arc(startingX + 100, startingY + 100, 75, 0, Math.PI * 2, true); // Outer circle
        }else if(moveNumber % 2 == 1){
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
                console.log("Winner", playerSymbol)
                return true;
            }
            if(board[0][i] == playerSymbol && board[1][i] == playerSymbol && board[2][i] == playerSymbol){
                console.log("Winner", playerSymbol)
                return true;
            }
        }

        if(board[0][0] == playerSymbol && board[1][1] == playerSymbol && board[2][2] == playerSymbol){
            console.log("Winner", playerSymbol)
            return true;
        }

        if(board[2][0] == playerSymbol && board[1][1] == playerSymbol && board[0][2] == playerSymbol){
            console.log("Winner", playerSymbol)
            return true;
        }
        return this.isTie(this.board);
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
            console.log("Tie")
            return true;
        }

        return false;
    }

    getPlayerTurnResponse(moveNumber){
        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = "It's Your Turn: " +  playerSymbol;
    }

    showWinner(moveNumber){
        const playerSymbol = moveNumber % 2 == 0 ? 'O' : 'X';
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = "YOU ARE THE WINNER: " +  playerSymbol;
    }

    showTie(){
        const playerResponse = document.getElementById("playerReponse");
        playerResponse.innerHTML = "THIS IS TIE...REMATCH!!!!!!!!!!!";
    }

    restart(){
        this.board = [
            ['#', '#', '#'],
            ['#', '#', '#'],
            ['#', '#', '#']
        ];
        this.moveNumber = 0;
    }
}
