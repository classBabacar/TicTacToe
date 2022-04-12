export default class HumanPlayer extends TicTacToe{
    constructor(p1, p2){
        super(p1, p2)
    }

    async getHumanMove(){
        return new Promise(function (resolve) {
            canvas.addEventListener("click", function(user){
                canvas.removeEventListener("click", user);
                const cRect = canvas.getBoundingClientRect();
                const canvasX = Math.round(user.clientX - cRect.left);        // Subtract the 'left' of the canvas from the X/Y
                const canvasY = Math.round(user.clientY - cRect.top);
                resolve([canvasX, canvasY]);
            })
        })
    }
    
    async play(){
        while(!this.isGameOver(this.board, this.moveNumber - 1)  && !this.isTie(this.board)){
            this.getPlayerTurnResponse(this.moveNumber);
            let [x,y] = await this.getHumanMove();
            let position = this.boxSelection(x, y);
            if(position > 0 && this.moveNumber % 2 == 0 && this.isValidMove(position, this.board)){
                this.storeMove(this.moveNumber, position);
                this.makeMove(this.boxSelection(x, y), this.moveNumber);
            }else if (position > 0 && this.moveNumber % 2 == 1 && this.isValidMove(position, this.board)){
                this.storeMove(this.moveNumber, position);
                this.makeMove(this.boxSelection(x, y), this.moveNumber);
            }
        }
        if(this.isTie(this.board)){
            this.showTie()
        }else{
            this.showWinner(this.moveNumber - 1);
        }
    }
}
