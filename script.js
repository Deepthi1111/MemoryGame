

const gameContainer = document.getElementById("game");
const startNewGame = document.getElementById("new-game");

startNewGame.addEventListener('click', startGame);

let open_card_event = null;

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
    
    newDiv.classList.add("flip");
    newDiv.setAttribute('data-color', color)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function startGame() {
  location.reload();
  createDivsForColors(shuffledColors);
}

// TODO: Implement this function!
function handleCardClick(event) {  
  // you can use event.target to see which element was clicked
  let curr_color = event.target.getAttribute('data-color');
  event.target.classList.add(curr_color);
  event.target.classList.remove("flip");
  if (open_card_event != null) {
    let prev_color = open_card_event.target.getAttribute('data-color');
    console.log(curr_color, prev_color);
    if (curr_color == prev_color) {
      event.target.classList.add("disable");
      open_card_event.target.classList.add("disable");
      open_card_event = null;

    }
    else { 
      setTimeout( function() {
        event.target.classList.add("flip");
        event.target.classList.remove(curr_color);
        open_card_event.target.classList.add("flip");
        open_card_event.target.classList.remove(prev_color);    
        open_card_event = null;   
      },1000)
     
    }
    
  } 
  else {  
    open_card_event = event;
  } 
  // let cards = gameContainer.children;
  // let alldisabled = true;
  // for (let card of cards) {
  //   if (!(card.classList.contains("disable"))) {
  //     alldisabled = false;
  //   }
  // }
  // if (alldisabled == true) {
  //   const h2 = document.createElement("h2");
  //   h2.innerText = "Congratulations";
  //   startNewGame.append(h2);
  // }
}

// when the DOM loads
createDivsForColors(shuffledColors);

