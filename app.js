// Grab a couple of things we need
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playersLives = 6;

const correctSound = new Audio('./sounds/correct.wav'); 
const wrongSound = new Audio('./sounds/wrong.wav'); 
const flipSound = new Audio('./sounds/flip.wav'); 


// link text
playerLivesCount.textContent = playersLives;

// Generate the data that we are going to use for the cards.
const getData = () => [
  { imgSrc: "./images/p1.png", name: "evee" },
  { imgSrc: "./images/p2.png", name: "ash" },
  { imgSrc: "./images/p3.png", name: "gengar" },
  { imgSrc: "./images/p4.png", name: "charizard" },
  { imgSrc: "./images/p5.png", name: "pikachu" },
  { imgSrc: "./images/p6.png", name: "bulbasaur" },
  { imgSrc: "./images/p7.png", name: "charmander" },
  { imgSrc: "./images/p8.png", name: "squirtle" },
  { imgSrc: "./images/p1.png", name: "evee" },
  { imgSrc: "./images/p2.png", name: "ash" },
  { imgSrc: "./images/p3.png", name: "gengar" },
  { imgSrc: "./images/p4.png", name: "charizard" },
  { imgSrc: "./images/p5.png", name: "pikachu" },
  { imgSrc: "./images/p6.png", name: "bulbasaur" },
  { imgSrc: "./images/p7.png", name: "charmander" },
  { imgSrc: "./images/p8.png", name: "squirtle" },
];

//function that randomize the cards
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();
  // Generate the HTML
  cardData.forEach((item) =>  {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    
    // add class to html
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    // Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    

    // Attach the cards to the section 
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);  

    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        
        checkCards(e);
    });
  });
};
// check the cards

const checkCards = (e) => {
  
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  flipSound.play();
  const flippedCards = document.querySelectorAll('.flipped');

  if ( flippedCards.length === 2) {
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      setTimeout(() => correctSound.play(), 500 );
      
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else{
      setTimeout(() => wrongSound.play(), 500);
      
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1400);
      });
      playersLives--;
      playerLivesCount.textContent = playersLives;
      if (playersLives === 0) {
        setTimeout(() => restart(), 1200);

        
      }
    }
  }; 
};

// restart the game
const restart = () => {

  if (confirm("Out of lifes..., wanna play again?")) {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {
      cards[index].classList.remove('toggleCard');
      //Randomize
      setTimeout(() => {
        cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      }, 1000);
      
    });
    playersLives = 6;
    playerLivesCount.textContent = playersLives;
  } else {

  }
  
};

cardGenerator();
