//製作蛇
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
//getContext()method會回傳一個drawing context
//drawing context可以用來在canvas畫圖

const unit = 20;
const row = canvas.height / unit; // 320/20=16
const column = canvas.width / unit; // 320/20=16

let snake = [];//array中的每個元素，都是一個物件
//物件的工作是，儲存身體的x,y座標
snake[0]={
    x:80,
    y:0,
};

snake[1]={
    x:60,
    y:0,
};

snake[2]={
    x:40,
    y:0,
};

snake[3]={
    x:20,
    y:0,
}

let d = "Right"; //direction
window.addEventListener('keydown',changeDirection);
function changeDirection(e){
    console.log(e);
    if(e.key == "ArrowRight" && d!="Left"){
        d= "Right"
    }else if(e.key == "ArrowLeft" && d!="Right"){
        d="Left"
    }else if(e.key == "ArrowUp" && d!="Down"){
        d="Up"
    }else if(e.key == "ArrowDown" && d!="Up"){
        d="Down"
    }

}


function draw(){
    //背景全設定為黑色(這樣蛇才會有移動的感覺)
   ctx.fillStyle="black";
   ctx.fillRect(0,0, canvas.width, canvas.clientHeight);
   
   //畫出蛇
    // console.log("it is running draw()")
    for(let i=0; i<snake.length; i++){
        if(i ==0){
            ctx.fillStyle = "lightgreen";//實心顏色設定
        }else{
            ctx.fillStyle = "lightblue";//實心顏色設定
        }
        ctx.strokeStyle = "white";//畫外框

        //蛇 穿牆
        if(snake[i].x >= canvas.width){
            snake[i].x = 0
        }
        if(snake[i].x < 0){
            snake[i].x = canvas.width-unit;
        }
        
        if(snake[i].y >= canvas.height){
            snake[i].y = 0;
        }
        if(snake[i].y < 0){
            snake[i].y = canvas.height-unit;
        }


        //x,y,width, height
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit) //畫實心長方形(X座標,y座標,寬度,高度)
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);//畫空心方形(X座標,y座標,寬度,高度)
    } 

    //以目前的d變數方向,來決定蛇的下一帧數要放在哪一個座標
    let snakeX = snake[0].x;// snake[0]是一個物件,但snake[0].x是個number
    //這邊snakeX複製的是一個基本型別(primitive)值的陣列,所以不會傳reference,不會更動到原本的snake陣列內容
    let snakeY = snake[0].y;
    if(d == "Left"){
        snakeX -= unit;
    }else if (d == "Up"){
        snakeY -= unit;
    }else if (d == "Right"){
        snakeX +=unit;
    }else if( d =="Down"){
        snakeY += unit;
    }

    let newHead ={
        x:snakeX,
        y:snakeY,
    }

    //確認蛇是否有吃到果實
    snake.pop();
    snake.unshift(newHead);

}



//讓貪食蛇自動移動
let myGame = setInterval(draw, 100) //每100毫秒，不斷地執行一次draw function //d的方向會讓蛇一直移動

