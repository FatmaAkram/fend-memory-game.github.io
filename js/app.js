//Global Variables
let deck = document.querySelector('.deck');
let fragment = document.createDocumentFragment();
let childCard = deck.children;
let cards =shuffle( ["fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt",
"fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb"
]);
let openCards = [];
let countMatch = 0;
let prevCard = '';
let currentCard = '';
let moves = 0;
let countMoves = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let seconds = 0;
let timerSpan = document.querySelector('.timer');
let fullTimer = '00:00:00';
var timer;
let firstClick = true;
let reset = document.querySelector('.restart');
let modal = document.querySelector('.modal');
let time = document.querySelector('#time-spent');
let rate = document.querySelector('#rate');
let movesMessage = document.querySelector('#moves');
let playAgain = document.querySelector('#play-again');



// Staring Game
generateCards();

// Generate Cards
function generateCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        fragment.appendChild(card);
    }
    deck.appendChild(fragment);
    handClick();
}

// Handle click Event
function handClick() {
    for (let i = 0; i < childCard.length; i++) {
        childCard[i].addEventListener("click", function (e) {
            const currentCard = e.target;
            const prevCard = openCards[0];

            // Start the timer is it is the first click
            if (firstClick) {
                startTimer();
                firstClick = false;
            }

            if (openCards.length === 1) {
                currentCard.classList.add('show', 'open', 'noClick');
                openCards.push(currentCard);
                /*
                 * Comparing two cards :
                 * if equal, match them 
                 * if not, show them for 500ms and then hide them
                 */
                compareCards(prevCard, currentCard);
                openCards = [];

            } else {

                currentCard.classList.add('show', 'open', 'noClick');
                openCards.push(currentCard);
            }
            countMoves.textContent = moves;

        });

    }
}

function compareCards(prevCard, currentCard) {

    // Cards are matched 
    if (prevCard.innerHTML === currentCard.innerHTML) {
        currentCard.classList.add('match');
        prevCard.classList.add('match');
        openCards = [];
        countMatch++;
        checkWin(countMatch);

        // Cards doesn't match
    } else {
        setTimeout(function () {
            currentCard.classList.remove('show', 'open', 'noClick');
            prevCard.classList.remove('show', 'open', 'noClick');

        }, 500)
        openCards = [];

    }
    increamentMoves();
}

function checkWin(countMatch) {
    if (countMatch === cards.length / 2) {
        stopTimer();
        displayWinningWindow();

    }
}

// Shuffle function 
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function increamentMoves() {
    moves++;
    rating(moves);
}

function rating(moves) {
    if (moves > 30) {
        stars.innerHTML = '	<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
    } else if (moves > 20) {
        stars.innerHTML = '	<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>';
    }
}

function startTimer() {
    timer = setInterval(function () {
        seconds++;
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        fullTimer = ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);


        timerSpan.textContent = fullTimer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

reset.addEventListener('click', resetGame);

function resetGame() {
    deck.innerHTML = "";
    countMatch = 0;
    moves = 0;
    openCards = [];
    generateCards();
    countMoves.textContent = moves;

    stars.innerHTML = '	<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    stopTimer();
    firstClick = true;
    seconds = 0;
    timerSpan.textContent = '00:00:00';

}

function displayWinningWindow() {
    modal.style.display = 'block';
    time.textContent = fullTimer;
    rate.innerHTML = stars.innerHTML;
    movesMessage.innerHTML = moves + 1;
}
playAgain.addEventListener('click', function () {
    modal.style.display = 'none';
    resetGame();


});
