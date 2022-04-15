/**
 * ctx.moveTo(x,y) - Move the cursor to the position
 * ctx.lineTo(x, y) - Start from that cursor position and end at this new position
 * ctx.stroke() - Draw the line
 *  
 * The main reason I use values 200, 400 is I need to draw 4 lines (2 vertical/2 horizontal) in a perfect square (600 by 600).
 * In the event, you want to make the square bigger it would be easier to keep it a perfect square.
 * EX: 900 by 900, you could use values 300, 600 since that would divide it equally without decimals.
 */

 const canvas = document.getElementById("canvas");
 const ctx = canvas.getContext("2d");
 import AIPlayer from './AIPlayer.js';
 import HumanPlayer from './HumanPlayer.js';

 function makeBoard(){
     const yMax = 600;
     const xMax = 600;
 
     canvas.style.left = "30%";
     canvas.style.top = "25%";
     canvas.style.position = "absolute";
     canvas.width = yMax;
     canvas.height = xMax;
     canvas.style.border = "5px solid";
     ctx.beginPath();
     ctx.strokeStyle = 'blue';

     // Vertical Line One (from left to right)
     ctx.moveTo(200, 0);
     ctx.lineTo(200, yMax);
 
     // Vertical Line Two (from left to right)
     ctx.moveTo(400, 0);
     ctx.lineTo(400, yMax);
 
     // Horizontal Line One (from top to bottom)
     ctx.moveTo(0, 200);
     ctx.lineTo(xMax, 200);
 
     // Horizontal Line Two (from top to bottom)
     ctx.moveTo(0, 400);
     ctx.lineTo(xMax, 400);
     
     ctx.stroke();
 }

 let playerObj;
 function pvp(){
    makeBoard();
    playerObj = new HumanPlayer("p1", "p2");
    playerObj.restart();
    playerObj.play();
 }

 function pvai(){
    makeBoard();
    playerObj = new AIPlayer("p1", "p2");
    playerObj.restart();
    playerObj.AIplay();
 }


let pvpbtn = document.getElementById("newgame");
pvpbtn.addEventListener("click", function() {
    pvp()}, false);

let restartbtn = document.getElementById("pvp");
restartbtn.addEventListener("click", function() {
    pvp()}, false);

let aibtn = document.getElementById("pvai");
aibtn.addEventListener("click", function() {
    pvai()}, false);