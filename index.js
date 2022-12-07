// SELECTIN VARIABLES
const navbar = document.querySelector('.mobile');
const nav = document.querySelector('nav');
const navMenu = document.querySelector(".main-header");
const contactHeader = document.querySelector(".contact-header");
// SELECTING COMPONENTS FOR SECTION ONE SLIDES
const sectionOneSlides = document.querySelectorAll(".banners-section-one");
let slideOneCounter = 0;
const slideOneMaxLength = sectionOneSlides.length;
const slideOneArrowRight = document.querySelector(".arrow-right");
const slideOneArrowLeft = document.querySelector(".arrow-left");

// SELECTING ELEMEBNTS FOR SECTION FIVE SLIDER

const sectionFiveSliderImages = document.querySelectorAll('.section-five-slider div');
const allCards = document.querySelector('.cards')
const sectionFiveSliderContainer = document.querySelector('.section-five-slider');

// Keep track of user's mouse down and mouse up
let isPressdDown = false;
// Horizontal space of cursor from inner container
let cursorXSpace;

// Temporary code position
// Implementing mouse drag slider
sectionFiveSliderContainer.addEventListener('mousedown', (e) => {
  isPressdDown = true;
  cursorXSpace = e.offsetX - allCards.offsetLeft;
});

document.addEventListener('mouseup', () => {
  isPressdDown = false;
});

function changeCursor(x, y) {
  sectionFiveSliderContainer.addEventListener(y, () => {
    sectionFiveSliderContainer.style.cursor = x;
  });
};

changeCursor('grabbing', 'mousedown');
changeCursor("grab", "mouseup");


sectionFiveSliderContainer.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (!isPressdDown) return;
  allCards.style.left = `${e.offsetX - cursorXSpace}px`;
  // Bounding cards
  boundCards()
});

// Function to bound cards
function boundCards() {
  const container_rec = sectionFiveSliderContainer.getBoundingClientRect()
  const cards_rec = allCards.getBoundingClientRect();

  if (parseInt(allCards.style.left) > 0) {
    allCards.style.left = 0;
  } else if (cards_rec.right < container_rec.right) {
    allCards.style = `-${cards_rec.width - container_rec.width}px`
  }
}

// SELECTING SECTIONS

const sectionOne = document.querySelector(".section-one");


// ADDING EVENT LISTENERS

// Code to remove and add navbar in smaller screen
navbar.addEventListener('click', () => {
  // Adding and removing nav active class
  nav.classList.toggle('active')
});

// SLIDE ONE SECTION ONE

slideOneArrowRight.addEventListener('click', () => {
  scrollRight()
});

slideOneArrowLeft.addEventListener('click', () => {
  scrollLeft()
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    scrollRight()
  } else if (e.key === 'ArrowLeft') {
    scrollLeft
  }
});




// FUNCTIONS



// SLIDE ONE SECTION ONE

// 
function addTranslateProperty(data) {
  data.forEach((mov, i) => {
    mov.style.transform = `translate(${100 * i}%)`
  });
};

// Slide left

function scrollLeft() {
  if (slideOneCounter > 0 && slideOneCounter < slideOneMaxLength -1 ) {
    slideOneCounter++;
  } else {
    slideOneCounter = 0;
  }

  sectionOneSlides.forEach((mov, i) => {
    mov.style.transform = `translate(${100 * (i + slideOneCounter)}%)`;
  });
};


// Slide right
function scrollRight() {

  // Increasing slide one, section one counter
  if (slideOneCounter < slideOneMaxLength -1) {
    slideOneCounter++;
  } else {
    slideOneCounter = 0
  }

  sectionOneSlides.forEach((mov, i) => {
    mov.style.transform = `translate(${100 * (i - slideOneCounter)}%)`;
  });
}


// CALLING FUNCTIONS
// Calling function for section one slide one /Translate property
addTranslateProperty(sectionOneSlides);
// addTranslateProperty(sectionFiveSliderImages)

// Setting time interval

setInterval(() => {
  scrollRight()
}, 10000);


// INTERSECTION OBSERVERS


// MAKING NAVBAR STICKY
const stickyOp = {
  root: null,
  threshold: 1
};

function stickyCall(entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    navMenu.classList.remove('sticky')
  } else {
    navMenu.classList.add("sticky");
  }
}

const navObserverSticky = new IntersectionObserver(stickyCall, stickyOp);
navObserverSticky.observe(contactHeader);
