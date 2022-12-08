const fs = require('fs');
const path = require('path');
console.log('cum');

let grid = []
let treeSet = new Set();

async function main() {
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    for await (const line of file.readLines()) {
        grid.push(line.split('').map((c) => parseInt(c)));
    }

    let gridSizeX = grid[0].length;
    let gridSizeY = grid.length;


    // Part 1
    checkLeftToRight(grid, gridSizeX, gridSizeY);
    checkTopToBottom(grid, gridSizeX, gridSizeY);
    checkRightToLeft(grid, gridSizeX, gridSizeY);
    checkBottomToTop(grid, gridSizeX, gridSizeY);
    // console.log(treeSet.size)

    // Part 2
    const result2 = checkTreeScore(grid, gridSizeX, gridSizeY);
    console.log(result2)

    
}

function checkLeftToRight(g, xLength, yLength) {
    for (let row = 0; row < yLength; row++) { // for every row
        let currentNumber = -1;

        for (let column = 0; column < xLength; column++) { // for every number
            if (g[row][column] > currentNumber) {
                treeSet.add(row + '-' + column)
                currentNumber = g[row][column]
            }
        }
    }
}

function checkTopToBottom(g, xLength, yLength) {
    for (let column = 0; column < xLength; column++) { // for every row
        let currentNumber = -1;

        for (let row = 0; row < yLength; row++) { // for every number
            if (g[row][column] > currentNumber) {
                treeSet.add(row + '-' + column)
                currentNumber = g[row][column]
            }
        }
    }
}

function checkRightToLeft(g, xLength, yLength) {
    for (let row = 0; row < yLength; row++) { // for every row
        let currentNumber = -1;

        for (let column = xLength; column > 0; column--) { // for every number
            if (g[row][column] > currentNumber) {
                treeSet.add(row + '-' + column)
                currentNumber = g[row][column]
            }
        }
    }
}

function checkBottomToTop(g, xLength, yLength) {
    for (let column = 0; column < xLength; column++) { // for every row
        let currentNumber = -1;

        for (let row = yLength - 1; row > 0; row--) { // for every number
            if (g[row][column] > currentNumber) {
                treeSet.add(row + '-' + column)
                currentNumber = g[row][column]
            }
        }
    }
}

function checkTreeScore(g, xLength, yLength) {
    let bestView = 0;

    for (let row = 0; row < yLength; row++) { // for every row
        for (let column = 0; column < xLength; column++) { // for every number
            let rightScore = 0;
            let bottomScore = 0;
            let leftScore = 0;
            let topScore = 0;
            let score = 0;

            // Check right
            for (let i = column + 1; i < xLength; i++) {

                if (g[row][i] >= g[row][column]) {
                    rightScore += 1;
                    break;
                }
                rightScore += 1;
            }


            // Check bottom
            for (let i = row + 1; i < yLength; i++) {
                if (g[i][column] >= g[row][column]) {
                    bottomScore += 1;

                    break;
                }
                bottomScore += 1;
            }

            // Check left
            for (let i = column - 1; i >= 0; i--) {
                if (g[row][i] >= g[row][column]) {
                    leftScore += 1;

                    break;
                }
                leftScore += 1;
            }

            // Check Top
            for (let i = row - 1; i >= 0; i--) {
                if (g[i][column] >= g[row][column]) {
                    topScore += 1;
                    break;
                }
                topScore += 1;
            }

            score = rightScore * bottomScore * leftScore * topScore;

            if (score > bestView) {
                bestView = score;
            }
        }
    }

    return bestView
}

main();
