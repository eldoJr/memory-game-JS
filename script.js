/*copywrite.eldodev
  &copy; eldo.dev
*/

const cards = document.querySelectorAll(".card");
const timerElement = document.getElementById("time");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let time = 0;
let timer;

// Start the timer when the game starts
function startTimer() {
  timer = setInterval(() => {
    time++;
    timerElement.textContent = time;
  }, 1000);
}

// Stop the timer when the game ends
function stopTimer() {
  clearInterval(timer);
}

// Flip card logic
function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

// Check for a match
function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === 8) {
      stopTimer();
      setTimeout(() => {
        alert(`You won in ${time} seconds!`);
        shuffleCard();
      }, 500);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
    return;
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

// Shuffle and restart the game
function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  time = 0;
  timerElement.textContent = time;
  stopTimer();
  startTimer();

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
