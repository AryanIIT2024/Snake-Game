//Gmae constants & variables 
let inputDir={x : 0,y : 0 };
let FoodSound = new Audio("food.mp3") ;
let GameOverSound = new Audio("gameover.mp3") ;
let MoveSound = new Audio("move.mp3") ;
let MusicSound = new Audio("music.mp3") ;
let speed =3;
let score = 0;
let LastPaintTime = 0;
let snakeArr = [
    {x:12,y:15}   //array
]
let food = {x:6,y:7}; //not an array


//game functions  
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - LastPaintTime)/1000 < 1/speed){ //to control the sppedd of the programm evalues in fps
        return;
    }
    //consol.log(ctime);
    LastPaintTime = ctime;
    gameEngine(); 
}
function isCollide(snake){
    //if you bump into yourself
    for(let i = 1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall 
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
            

        }
    }



function gameEngine(){
    MusicSound.play();
    //part-1:Updating the snake array and food
    if(isCollide(snakeArr)){
        GameOverSound.play();
        MusicSound.pause();
         inputDir={x : 0,y : 0 };
        alert("Game over, Press any key to press again! ")
        snakeArr ={x:13,y:15};
        score = 0;
    }
    //if you have eaten the food incerease the score by 1 and regulsrizeses the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
         FoodSound.play();
         score +=1;
        snakeArr.unshift( {x:snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y });
       let a  = 2;
       let b =16;
       food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
      //moving the snake
    for(let i =snakeArr.length -2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}; //for creating the new object with ...snakeArr[i]

    } 
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

    //part -2: Display the snake and food
    //display the snake 
     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;//vertical 
        snakeElement.style.gridColumnStart = e.x;//horizontal
        if(index ===0){
            snakeElement.classList.add("head");
        } 
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
     });
     //display the food
     foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;//vertical 
        foodElement.style.gridColumnStart = food.x;//horizontal
        foodElement.classList.add("food"); 
        board.appendChild(foodElement);
     

    
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir ={x:0,y:1}//game starts
    MoveSound.play();
    switch(e.key){
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y =  -1;
        break;
        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y =  1;
        break;
        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y =  0;
        break;
        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y =  0;
        break;
        default:
            break;

    }

});




