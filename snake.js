/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
Develop by Michael Wong
*/
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create unit
const box = 32;

//load images
//Playing match : 17x15
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
let dead = new Audio();
dead.src = "audio/dead.mp3";

let eat = new Audio();
eat.src = "audio/eat.mp3";

let move = new Audio();
move.src = "audio/move.mp3";

//create the snake
let snake = [];

//init the position
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//create the score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        move.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        move.play();
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        move.play();
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        move.play();
        d = "DOWN";
    } else if (key == 82){
        d = "Re";
    }
}

//check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//draw to the canvas
function draw() {
    //create map
    ctx.drawImage(ground, 0, 0);

    //create food
    ctx.drawImage(foodImg, food.x, food.y);

    //create snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;
    if (d == "Re") console.log(d);


    //the snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();

        //recreate food
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    //score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}
// document.addEventListener("keydown", rematch);
// function rematch(event) {
//     let key = event.keyCode;
//     if(key == 82){
//         snake[0] = {
//             x: 9 * box,
//             y: 10 * box
//         };
//     }
//     game = setInterval(draw,100);
// }

let game = setInterval(draw, 150);

