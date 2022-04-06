const pieceCanvas = document.getElementById("gamePiece");
const ctxPiece = pieceCanvas.getContext("2d");

function printPosition(canvasX, canvasY){
    // Top Most Row
    if(canvasY <= 200){
        if(canvasX <= 200){
            console.log("position 1");
        }else if(200 < canvasX && canvasX <= 400){
            console.log("position 2");
        }else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 3");
        }
    }
    // Middle Row
    else if (200 < canvasY && canvasY <= 400){
        if(canvasX <= 200){
            console.log("position 4");
        }
        else if(200 < canvasX && canvasX <= 400){
            console.log("position 5");
        }
        else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 6");
        }
    }
    // Last Row
    else if (400 < canvasY && canvasY <= 600){
        if(canvasX <= 200){
            console.log("position 7");
        }
        else if(200 < canvasX && canvasX <= 400){
            console.log("position 8");
        }
        else if(400 < canvasX && 400 < canvasX <= 600){
            console.log("position 9");
        }
    }
}