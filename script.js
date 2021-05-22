//alert("Js connected");
let x=true;
let y=true;
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftpaddle=document.querySelector(".left");
let rightpaddle=document.querySelector(".right");
let boardBounds=board.getBoundingClientRect();
let leftPlayerLives=3;
let rightPlayerLives=3;
document.addEventListener("keydown",function(e){
    console.log("key is there");
    if(e.key=="w"){
        movePaddle(leftpaddle,-window.innerHeight*0.1)
    }else if(e.key=="s"){
        movePaddle(leftpaddle,window.innerHeight*0.1)
    }else if(e.key=="ArrowUp"){
        movePaddle(rightpaddle,-window.innerHeight*0.1)
    }else if(e.key=="ArrowDown"){
        movePaddle(rightpaddle,window.innerHeight*0.1)
    }
})

function setColor(idx){
let allicons= document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color="#686de0";
}

function movePaddle(cPaddle,change){
    let cPaddleBounds=cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change>=boardBounds.top && cPaddleBounds.bottom+change<=boardBounds.bottom){
    cPaddle.style.top=cPaddleBounds.top+change+"px";
    }
}

function moveBall(){
    let ballcord=ball.getBoundingClientRect();
    let ballTop=ballcord.top;
    let ballLeft=ballcord.left;
    let ballBottom=ballcord.bottom;
    let ballRight=ballcord.right;

    let hasTouchedLeft=ballLeft<boardBounds.left;
    let hasTouchedRight=ballRight>boardBounds.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives==0){
                alert("Game over Player B won ✌ ");
                document.location.reload();
            }
          else{
                return resetgame();
            }
        }else{
            rightPlayerLives--;
            setColor(3+rightPlayerLives);
            if(rightPlayerLives==0){
                alert("Game over Player A won ✌ ");
                document.location.reload();
            }
            else{
                return resetgame();
            }
        }

    }

function resetgame(){
    ball.style.top=window.innerHeight*0.45+"px";
    ball.style.left=window.innerWidth*0.45+"px";
    requestAnimationFrame(moveBall);

}


    //checking bound
    //vertical
    if(ballTop<=boardBounds.top || ballBottom>=boardBounds.bottom){
        y=!y;
    }

    //horizontal
    //if(ballLeft<=boardBounds.left || ballRight>=boardBounds.right){
     //   x=!x;
   // }
    //collision
    let leftpaddleBounds=leftpaddle.getBoundingClientRect();
    let rightpaddleBounds=rightpaddle.getBoundingClientRect();

    if(ballLeft<=leftpaddleBounds.right && ballRight>=leftpaddleBounds.left && ballTop+30>=leftpaddleBounds.top&& ballBottom+30<=leftpaddleBounds.bottom){
        x=!x;
    }
    if(ballLeft<=rightpaddleBounds.right && ballRight>=rightpaddleBounds.left && ballTop+30>=rightpaddleBounds.top&& ballBottom+30<=rightpaddleBounds.bottom){
        x=!x;
    }
    //collisionends
    ball.style.top= y==true?ballTop+4+"px":ballTop-4+"px";
    ball.style.left= x==true?ballLeft+6+"px":ballLeft-6+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);

