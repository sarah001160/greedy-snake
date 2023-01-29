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

function createaSnake(){
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
}

class Fruit{
    constructor(){
        this.x = Math.floor(Math.random()* column)*unit;
        this.y = Math.floor(Math.random()* row)*unit;
    }
    drawFruit(){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, unit, unit)
    }
    pickALocation(){ //選定一個新的隨機座標,不能跟蛇的位置重疊
        let overlapping = false;
        let new_x;
        let new_y;
    
        function checkOverlap(new_x, new_y){//用來檢查新果實的x,y座標是否重疊到蛇的xy座標
            for(let i = 0; i < snake.length; i++){
                if(new_x == snake[i].x && new_y == snake[i].y){
                    overlapping = true;
                    return;
                }else{
                    overlapping = false;
                }
            }
        }

        //do while loop邏輯是先做do,如果while()裡面的條件仍為True就要一直做do,直到while的條件變成false為止
        do{
            new_x = Math.floor(Math.random()*column)*unit
            new_y = Math.floor(Math.random()*row)*unit
            console.log("果實可能的新位置"+new_x,new_y)
            checkOverlap(new_x, new_y);
        }while(overlapping)//若overlapping是true要繼續做do
        this.x = new_x;
        this.y=new_y;
    }
}

//初始設定
createaSnake();
let myFruit = new Fruit();
window.addEventListener('keydown',changeDirection);//監聽鍵盤按下事件
let d = "Right"; //direction
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
    //每次按下上下左右鍵之後，在下一幀被畫出來之前
   //不接受任何keydown事件
   //這樣可以防止連續按鍵導致蛇在邏輯上自殺
    window.removeEventListener("keydown", changeDirection);

}

let score = 0;
let highestScore;
loadHighestScore()
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;


function draw(){
    //每次畫圖之前檢查蛇的頭[0]有沒有吃到自己身體
    for(let i = 1; i<snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            clearInterval(myGame);
            alert('遊戲結束')
            return; //return這個Draw function,所以後行的程式碼都不會執行
        }
    }

    //每100毫秒,背景黑色覆蓋掉前一幀,再重新畫出新座標蛇(這樣蛇才會有移動的感覺)
   ctx.fillStyle="black";
   ctx.fillRect(0,0, canvas.width, canvas.clientHeight);

    //畫果實Fruit
    myFruit.drawFruit();


   
   //畫出蛇
    for(let i=0; i<snake.length; i++){
        if(i ==0){
            ctx.fillStyle = "lightgreen";//實心顏色設定
        }else{
            ctx.fillStyle = "lightblue";//實心顏色設定
        }
        ctx.strokeStyle = "white";//外框顏色設定

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
    if(d == "Left"){ //d方向改變蛇頭[0]的座標
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

    //確認蛇是否有吃到果實(蛇頭座標是否等於果實座標)
    //如果蛇已吃到果實,要再畫一個新果實
    if(snake[0].x == myFruit.x && snake[0].y == myFruit.y){
        //重新選定一個新的隨機位置
        myFruit.pickALocation();
        //畫出新果實
        myFruit.drawFruit();
        //更新分數
        score++;
        setHighestScore(score) // 判斷score是否大於highestScore
        document.getElementById("myScore").innerHTML = "遊戲分數:" + score; //更新
        document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore; // 更新最高分數        
    }else{
        snake.pop(); //刪除snake[]陣列的最後一筆
    }
    snake.unshift(newHead); //snake[]陣列最前方增加一筆
    window.addEventListener("keydown", changeDirection)
}



//讓蛇自動移動
let myGame = setInterval(draw, 100) //每100毫秒，執行一次draw function //d的方向會讓蛇一直移動


function loadHighestScore(){//載入最高分數
   if( localStorage.getItem("highestScore") == null){
        highestScore = 0;
   }else{
        highestScore = Number(localStorage.getItem("highestScore"))
   }
}

function setHighestScore(score){ //判斷highestScore
    if(score > highestScore){
        localStorage.setItem("highestScore",score);
        highestScore = score;
    }
}

