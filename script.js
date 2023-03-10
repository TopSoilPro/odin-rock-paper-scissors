// Constants representing the strings for each possible choice
const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

const ROCK_EMOTE = String.fromCodePoint(0x1FAA8);
const PAPER_EMOTE = String.fromCodePoint(0x1F4C4);
const SCISSOR_EMOTE = String.fromCodePoint(0x2702);

// Constants representing the possible win states
const DRAW = 0;
const PLAYER_WIN = 1;
const COMPUTER_WIN = 2;

function setupButtons() {
    const buttons = document.querySelectorAll('#playButton');

    // Creates an event listener for each button to play a round of rock-paper-scissors
    buttons.forEach(button => {
        button.addEventListener('click', makeChoice)
    })

    const replayButton = document.querySelector('#replay');
    replayButton.addEventListener('click', function(e) {
        resetGame();
    })

    roundNumber = 1;
}

// Plays a round with selected choice
function makeChoice(e) {
    playOneRound(`${e.target.className}`, getComputerChoice());
}

// Resets the game
function resetGame() {
    document.body.innerHTML = defaultDOMState;
    setupButtons();
}

// Randomly generated a random choice for the computer to play
function getComputerChoice() {
    // Constants associating the values of random with the string to return
    const ROCK_VALUE = 0;
    const PAPER_VALUE = 1;
    const SCISSORS_VALUE = 2;
    // The random number value for selecting which type to play
    let random = Math.floor(Math.random() * 3);

    // Return type to play based on the random value
    if (random == ROCK_VALUE) {
        return ROCK;
    }
    if (random == PAPER_VALUE) {
        return PAPER;
    }
    if (random == SCISSORS_VALUE) {
        return SCISSORS;
    }
}

// Play one round of rock-paper-scissors between the player and the computer
function playOneRound(playerSelection, computerSelection) {
    // Comparing types chosen and declaring outcome
    // A draw
    if (playerSelection == computerSelection) {
        updateResults(DRAW, playerSelection);
    }
    // Player wins
    else if (playerSelection == ROCK && computerSelection == SCISSORS || playerSelection == PAPER && computerSelection == ROCK || 
    playerSelection == SCISSORS && computerSelection == PAPER ) {
        updateResults(PLAYER_WIN, playerSelection);
    }
    // Player loses
    else {
        updateResults(COMPUTER_WIN, computerSelection);
    }
}

// Updates the previous round result and scores
function updateResults(result, winningType) {
    const resultMsg = document.querySelector('.resultText');
    const playerScore = document.querySelector('.playerScore');
    const computerScore = document.querySelector('.computerScore');

    // Assign emojis for result message
    const emojis = determineEmojis(winningType);
    let winEmoji = emojis[0];
    let loseEmoji = emojis[1];

    if (resultMsg.textContent === "First To 5 - Click A Button To Play") {
        resultMsg.textContent = "Round 1: ";
    }
    else resultMsg.textContent = `Round ${roundNumber}: `;

    // Draw
    if (result === DRAW) {
        resultMsg.textContent += `Draw! Both players played ${winEmoji}`;
    }
    // Player Wins
    else if (result === PLAYER_WIN) {
        resultMsg.textContent += `You Win! ${winEmoji} beats ${loseEmoji}`;
        playerScore.textContent = (Number.parseInt(playerScore.textContent) + 1)
    }
    // Player Loses
    else {
        resultMsg.textContent += `You Lose! ${winEmoji} beats ${loseEmoji}`;
        computerScore.textContent = (Number.parseInt(computerScore.textContent) + 1)
    }

    checkWinner(Number.parseInt(playerScore.textContent), Number.parseInt(computerScore.textContent));
    roundNumber += 1;
}

// Returns an array of emojis for the winner and the loser
function determineEmojis(winningType) {
    let winEmoji;
    let loseEmoji;

    if (winningType === ROCK) {
        winEmoji = ROCK_EMOTE;
        loseEmoji = SCISSOR_EMOTE;
    }
    else if (winningType === SCISSORS) {
        winEmoji = SCISSOR_EMOTE;
        loseEmoji = PAPER_EMOTE;
    }
    else {
        winEmoji = PAPER_EMOTE;
        loseEmoji = ROCK_EMOTE;
    }

    return [winEmoji, loseEmoji];
}

// Checks for a winner
function checkWinner(playerScore, computerScore) {
    const winner = document.querySelector('h1');
    const MAX_SCORE = 5;

    if (playerScore === MAX_SCORE) {
        winner.textContent = "Player Wins! Press Play Again";
        winner.classList.add('victor');
        endGame();
    }
    else if (computerScore === MAX_SCORE) {
        winner.textContent = "Computer Wins! Press Play Again";
        winner.classList.add('victor');
        endGame();
    }
}

// Ends playability when game ends
function endGame() {
    // Stops the play buttons from working
    const buttons = document.querySelectorAll('#playButton');

    buttons.forEach(button => {
        button.removeEventListener('click', makeChoice);
    })
}

let defaultDOMState = document.body.innerHTML;
setupButtons();