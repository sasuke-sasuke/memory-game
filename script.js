const gameContainer = document.getElementById("game");
let newScore;
const h1 = document.querySelector('h1');
const highScoreDiv = document.createElement('div');
const button = document.querySelector('#game-over');
const scoreDiv = document.querySelector('#score');
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

if(!isNaN(localStorage.highScore)){
  highScoreDiv.innerText = 'High Score: ' + localStorage.highScore;
  h1.appendChild(highScoreDiv);
  highScoreDiv.className = 'high-score';
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardsPicked = []
const cardsFlipped = []
let score = 0;
let gameOver = false;
scoreDiv.innerText = 'Score: ' + score;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const card = event.target;
  const color = card.className;
  card.style.backgroundColor = color;
  cardsPicked.push(card);
  const firstCard = cardsPicked[0];
  addRemoveCardClick(firstCard, 'remove');
  const secondCard = cardsPicked[1];
  addRemoveCardClick(secondCard, 'remove');

  if (cardsPicked.length == 2){

    
    if (firstCard.className !== secondCard.className){
      setTimeout(function(){
        firstCard.style.backgroundColor = 'white';
        firstCard.addEventListener('click', handleCardClick)
        secondCard.style.backgroundColor = 'white';
        secondCard.addEventListener('click', handleCardClick)
      }, 1000)
    } else {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        cardsFlipped.push(firstCard, secondCard);
    }
    cardsPicked = [];
    score++;
    scoreDiv.innerText = 'Score: ' + score;
  }
  const cardsOnBoard = 10;
  if(cardsFlipped.length === cardsOnBoard){
    setTimeout(function(e){
      gameContainer.style.display = 'none';
      button.style.display = 'unset';
    }, 500)
    gameOver = true;
    newScore = score;
    if(localStorage.highScore === undefined && gameOver){
      setHighScore();
    }
    else if (parseInt(localStorage.highScore) > newScore && gameOver){
      setHighScore();
    }
  } 
}

function setHighScore(){
  localStorage.setItem('highScore', newScore);
  highScoreDiv.innerText = 'High Score: ' + localStorage.highScore;
  h1.appendChild(highScoreDiv)
  highScoreDiv.className = 'high-score';
}

function addRemoveCardClick(card, value){
  if (value === 'add'){
    card.addEventListener('click', handleCardClick)
  } else {
    card.removeEventListener('click', handleCardClick)
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
