const fs = require('fs');
const path = require('path');
console.log('cum');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const games = input.replaceAll('A', 1).replaceAll('B', 2).replaceAll('C', 3).replaceAll('X', 1).replaceAll('Y', 2).replaceAll('Z', 3).split('\r\n');
console.log(games)

let myScore = 0;

games.forEach((game) => {

    const elvesGuess = parseInt(game[0]);
    const myGuess = parseInt(game[2]);

    if(elvesGuess == myGuess) { // Draw
        myScore += myGuess;
        myScore += 3;
        return
    }

    if(elvesGuess == 1) { // Rock (1) loses to Paper (2)
        myScore += myGuess;
        if(myGuess == 2) {
            myScore += 6;
        }
    }

    if(elvesGuess == 2) { // Paper (2) loses to Scissors (3)
        myScore += myGuess;
        if(myGuess == 3) {
            myScore += 6;
        }
    }

    if(elvesGuess == 3) { // Scissors (3) loses to Rock (1)
        myScore += myGuess;
        if(myGuess == 1) {
            myScore += 6;
        }
    }

})

console.log(myScore);

// Part 2

// X (1) = lose, Y (2) = draw, Z (3) = win

myScore = 0;

games.forEach((game) => {

    const elvesGuess = parseInt(game[0]);
    const myGuess = parseInt(game[2]);

    if(myGuess == 1) {
        if(elvesGuess == 1) {
            myScore += 3;
            return
        }
        if(elvesGuess == 2) {
            myScore += 1;
            return
        }
        if(elvesGuess == 3) {
            myScore += 2;
            return
        }
    }

    if(myGuess == 2) {
        myScore += elvesGuess;
        myScore += 3;
        return
    }

    if(myGuess == 3) {
        myScore += 6;
        if(elvesGuess == 3) {
            myScore += 1;
            return
        }
        if(elvesGuess == 1) {
            myScore += 2;
            return
        }
        if(elvesGuess == 2) {
            myScore += 3;
            return
        }
    }
})

console.log(myScore);