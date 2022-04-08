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
 
 function makeBoard(){
     const yMax = 600;
     const xMax = 600;
 
     canvas.style.left = "30%";
     canvas.style.top = "25%";
     canvas.style.position = "absolute";
     canvas.width = yMax;
     canvas.height = xMax;
 
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
 
 canvas.addEventListener("click", function(e){
     var cRect = canvas.getBoundingClientRect();
     var canvasX = Math.round(e.clientX - cRect.left);        // Subtract the 'left' of the canvas from the X/Y
     var canvasY = Math.round(e.clientY - cRect.top);         // positions to get make (0,0) the top left of the canvas 
     boxSelection(canvasX, canvasY);
 })
 
function boxSelection(canvasX, canvasY){
    // Top Most Row
    if(canvasY <= 200){
        if(canvasX <= 200){
            makeMoveHelper(1);
            console.log("position 1");
        }else if(200 < canvasX && canvasX <= 400){
            console.log("position 2");
            makeMoveHelper(2);
        }else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 3");
            makeMoveHelper(3);
        }
    }
    // Middle Row
    else if (200 < canvasY && canvasY <= 400){
        if(canvasX <= 200){
            console.log("position 4");
            makeMoveHelper(4);
        }
        else if(200 < canvasX && canvasX <= 400){
            console.log("position 5");
            makeMoveHelper(5);
        }
        else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 6");
            makeMoveHelper(6);
        }
    }
    // Last Row
    else if (400 < canvasY && canvasY <= 600){
        if(canvasX <= 200){
            console.log("position 7");
            makeMoveHelper(7);
        }
        else if(200 < canvasX && canvasX <= 400){
            console.log("position 8");
            makeMoveHelper(8);
        }
        else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 9");
            makeMoveHelper(9);
        }
    }
}

// this function might be useless
function makeMoveHelper(position){
    switch(position){
        case 1:
            makeMove (1, 2);
            break;
        case 2:
            makeMove (2, 1);
            break;
        case 3:
            makeMove (3, 1);
            break;
        case 4:
            makeMove (4, 2);
            break;
        case 5:
            makeMove (5, 1);
            break;
        case 6:
            makeMove (6, 2);
            break;
        case 7:
            makeMove (7, 2);
            break;
        case 8:
            makeMove (8, 1);
            break;   
        case 9:
            makeMove (9, 2);
            break;
    }
}

function makeMove(position, moveNumber){
    let startingX = 0;
    let startingY = 0;
    for(i = 1; i < position; ++i){
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
}

makeBoard();