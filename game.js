// Code Starts Here 
const startbtn = document.querySelector(".startbtn");
const messageElement = document.querySelector(".message");
const scoreElement = document.querySelector(".score");

var isGameStarted = false;
var score = 0; 

// Generate the Grid Layout Dynamically //
function makeGrid() {
    const container = document.querySelector('.grid-container');
    
    for(let i = 1; i <= 400; i++){
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.classList.add(`cell-${i}`);
        container.appendChild(div);
    }
}

makeGrid();

// Start of Game Logic //
startbtn.addEventListener("click",() => {
    if(!isGameStarted){
        startbtn.style.display = 'none';
        messageElement.textContent = "";

        score = 0;
        snakePath.length = 0;
        snakePath.push(33,34,35);
        headDirection = "left"; 
        isGameStarted = true;

        startGame();
        startSnakeMovement();
    }
})

// Updates Score //
function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
}

// Starts Game //
function startGame() {
    document.querySelectorAll('.apple').forEach(apple => apple.remove()); 
    document.querySelectorAll('.snake-path').forEach(cell => {
        cell.classList.remove('snake-path');
        cell.classList.add('grid-item');
        cell.textContent = "";
    });

    setTimeout(() => {
        showSnake();
        food();
        updateUI();
    },1000);
}

// Food Logic //

// Making food visible //
var currentFoodCell;

function food(){
    let randomCell;
    
    do {
        randomCell = Math.floor(Math.random()*400) + 1;
    } while (snakePath.includes(randomCell));
    
    currentFoodCell = randomCell;

    const foodCell = document.querySelector(`.cell-${randomCell}`);
    const apple = document.createElement('img');
    apple.src = "Images/red apple.jpg";
    apple.alt = "apple Image"
    apple.className = 'apple';
    foodCell.append(apple);
}

// Start of Snake Logic //
var snakePath = [];
snakePath.push(33,34,35);

var headDirection = "left"; 
var countDown; 

// starts snake movements //
function startSnakeMovement() {
    countDown = setInterval(() => {
        moveSnake();
    }, 200);
}

// Make Snake Visible //
function showSnake() {
    for(let i=0; i < snakePath.length; i++){
        let cell = document.querySelector('.cell-' + snakePath[i]);
        cell.classList.remove('grid-item');
        cell.classList.add('snake-path');

        if(i == 0){
            cell.textContent = "H";
        }
        else if(i == snakePath.length-1){
            cell.textContent = "T";
        }else{
            cell.textContent = "";
        }
    }
}

// Snake Movement //
function moveSnake() {
    let newHead;

    switch (headDirection) {
        case "left":
            if (snakePath[0] % 20 === 1) return gameOver(); 
            newHead = snakePath[0] - 1;
            break;
        case "right":
            if (snakePath[0] % 20 === 0) return gameOver(); 
            newHead = snakePath[0] + 1;
            break;
        case "up":
            if (snakePath[0] <= 20) return gameOver(); 
            newHead = snakePath[0] - 20;
            break;
        case "down":
            if (snakePath[0] > 380) return gameOver();
            newHead = snakePath[0] + 20;
            break;
    }

    if (snakePath.includes(newHead)) return gameOver();

    snakePath.unshift(newHead);
    updateSnake();
    showSnake();
}


// Update Snake //
function updateSnake(){
    if(snakePath[0] == currentFoodCell) {
        score += 1;
        food();
        updateUI();
    }else{
        var removedCell = snakePath.pop();
        let cell = document.querySelector('.cell-' + removedCell);
        
        cell.classList.remove('snake-path');
        cell.classList.add('grid-item'); 
        cell.textContent = "";      
    }
}

// Change Direction when any key is pressed //
document.addEventListener("keydown",(e) => {
    if (e.key === 'a' && headDirection != "right") {
        headDirection = "left";
    } else if(e.key == 'w' && headDirection != "down") { 
        headDirection = "up";
    } else if(e.key == 'd' && headDirection != "left") {
        headDirection = "right";
    } else if(e.key == 's' && headDirection != "up") {
        headDirection = "down";
    }
});

// Game over Logic //
function gameOver() {
    clearInterval(countDown);

    messageElement.textContent = `Game Over! Final Score: ${score}`;
    messageElement.style.color = "firered";
    startbtn.style.display = 'block';
    snakePath.length = 0;
    isGameStarted = false;
}