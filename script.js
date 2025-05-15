const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info"); 
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// INITIALISE THE GAME
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "auto"; // ✅ Fixed value
        box.classList.remove("win"); // Remove winning highlight
    });
}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") { 
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapturn();
        checkGameOver();
    }
}

function swapturn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameInfo.innerText = `Current Player - ${currentPlayer}`; 
}

function checkGameOver() {
   let answer = "";

   winningPosition.forEach((position) => {
       if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
           (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

           answer = gameGrid[position[0]];

           boxes.forEach((box) => {
               box.style.pointerEvents = "none"; 
           });

           boxes[position[0]].classList.add("win");
           boxes[position[1]].classList.add("win");
           boxes[position[2]].classList.add("win");

           gameInfo.innerText = `Winner Player - ${answer}`;
           newGamebtn.classList.add("active");
           return;  // Stop execution once a winner is found
       }
   });
     let fillcount=0;
     gameGrid.forEach((box)=>{
        if(box!=="")
            fillcount++;
     });
   // Check for a draw
   if(fillcount===9)
   {
    gameInfo.innerText="Game Tied";
    newGamebtn.classList.add("active");
   }

}

newGamebtn.addEventListener("click", initGame);
