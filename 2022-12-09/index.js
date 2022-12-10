const fs = require('fs');
const path = require('path');
console.log('cum');

let allTailPositions = new Set()

let positionHead = [0,0]
let positionTail = [0,0]
let prevPositionHead = [0,0]

let currentPositionRope = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
let prevPositionRope = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]


async function main() {
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    allTailPositions.add(positionTail[0] + '-' + positionTail[1])

    for await (const line of file.readLines()) {
        let motion = line.split(' ');
        let direction = motion[0];
        let steps = parseInt(motion[1]);

        if (direction == 'U') {            
            for (let i = 0; i < steps; i++) {
                prevPositionHead[0] = positionHead[0];
                prevPositionHead[1] = positionHead[1];
                positionHead[0] += 1;
                checkTailPos()
            }
            
        }

        if (direction == 'D') {
            for (let i = 0; i < steps; i++) {
                prevPositionHead[0] = positionHead[0];
                prevPositionHead[1] = positionHead[1];
                positionHead[0] -= 1;
                checkTailPos()
            }
        }

        if (direction == 'L') {
            for (let i = 0; i < steps; i++) {
                prevPositionHead[0] = positionHead[0];
                prevPositionHead[1] = positionHead[1];
                positionHead[1] -= 1;
                checkTailPos()
            }
        }

        if (direction == 'R') {
            for (let i = 0; i < steps; i++) {
                prevPositionHead[0] = positionHead[0];
                prevPositionHead[1] = positionHead[1];
                positionHead[1] += 1;
                checkTailPos()
            }
        }
    }

    console.log(allTailPositions.size)
}

async function main2() {
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    for await (const line of file.readLines()) {
        let motion = line.split(' ');
        let direction = motion[0];
        let steps = parseInt(motion[1]);

        if (direction == 'U') {            
            for (let i = 0; i < steps; i++) {
                for (let r = 0; r < currentPositionRope.length; r++) {
                    prevPositionRope[r][0] = currentPositionRope[r][0]
                    prevPositionRope[r][1] = currentPositionRope[r][1]
                }

                currentPositionRope[0][0] += 1;

                for (let k = 0; k < currentPositionRope.length - 1; k++) {
                    checkRopePos(currentPositionRope[k], currentPositionRope[k+1], prevPositionRope[k], k)
                }
            }
        }

        if (direction == 'D') {
            for (let i = 0; i < steps; i++) {
                for (let r = 0; r < currentPositionRope.length; r++) {
                    prevPositionRope[r][0] = currentPositionRope[r][0]
                    prevPositionRope[r][1] = currentPositionRope[r][1]
                }

                currentPositionRope[0][0] -= 1;
            
                for (let k = 0; k < currentPositionRope.length - 1; k++) {
                    checkRopePos(currentPositionRope[k], currentPositionRope[k+1], prevPositionRope[k], k)
                }
            }
        }

        if (direction == 'L') {
            for (let i = 0; i < steps; i++) {
                for (let r = 0; r < currentPositionRope.length; r++) {
                    prevPositionRope[r][0] = currentPositionRope[r][0]
                    prevPositionRope[r][1] = currentPositionRope[r][1]
                }

                currentPositionRope[0][1] -= 1;

                for (let k = 0; k < currentPositionRope.length - 1; k++) {
                    checkRopePos(currentPositionRope[k], currentPositionRope[k+1], prevPositionRope[k], k)
                }
            }
        }

        if (direction == 'R') {
            for (let i = 0; i < steps; i++) {
                for (let r = 0; r < currentPositionRope.length; r++) {
                    prevPositionRope[r][0] = currentPositionRope[r][0]
                    prevPositionRope[r][1] = currentPositionRope[r][1]
                }

                currentPositionRope[0][1] += 1;

                for (let k = 0; k < currentPositionRope.length - 1; k++) {
                    checkRopePos(currentPositionRope[k], currentPositionRope[k+1], prevPositionRope[k], k)
                }
            }
        }
    }

    console.log(allTailPositions.size)
}

// Function for Part 1

function checkTailPos() {

    let yDifference = Math.abs(positionHead[0] - positionTail[0])
    let xDifference = Math.abs(positionHead[1] - positionTail[1])

    if (yDifference > 1) {
        positionTail[0] = prevPositionHead[0];
        positionTail[1] = prevPositionHead[1];
        allTailPositions.add(positionTail[0] + '-' + positionTail[1])
    }

    if (xDifference > 1) {
        positionTail[0] = prevPositionHead[0];
        positionTail[1] = prevPositionHead[1];
        allTailPositions.add(positionTail[0] + '-' + positionTail[1])
    }
}

// Function for Part 2

function checkRopePos(inFrontCurrent, inBackCurrent, inFrontPrev, currentKnot) {

    let yDifference = inFrontCurrent[0] - inBackCurrent[0]
    let xDifference = inFrontCurrent[1] - inBackCurrent[1]

    // left-right-up-down only

    if (yDifference > 1 && xDifference == 0) {
        inBackCurrent[0] += 1
    }

    if (yDifference < -1 && xDifference == 0) {
        inBackCurrent[0] -= 1
    }

    if (yDifference == 0 && xDifference > 1) {
        inBackCurrent[1] += 1
    }

    if (yDifference == 0 && xDifference < -1) {
        inBackCurrent[1] -= 1
    }

    // diagonal

    if (yDifference > 1 && xDifference > 1) { // up right
        inBackCurrent[0] += 1 // up
        inBackCurrent[1] += 1 // right
    }

    if (yDifference < -1 && xDifference > 1) { // down right
        inBackCurrent[0] -= 1 // down
        inBackCurrent[1] += 1 // right
    }

    if (yDifference > 1 && xDifference < -1) { // up left
        inBackCurrent[0] += 1 // up
        inBackCurrent[1] -= 1 // left
    }

    if (yDifference < -1 && xDifference < -1) {
        inBackCurrent[0] -= 1 // down
        inBackCurrent[1] -= 1 // left
    }

    // diagonal horse

    if ((yDifference > 1 && xDifference == 1) || (yDifference == 1 && xDifference > 1)) { // up right
        inBackCurrent[0] += 1 // up
        inBackCurrent[1] += 1 // right
    }

    if ((yDifference < -1 && xDifference == 1) || (yDifference == -1 && xDifference > 1)) { // down right
        inBackCurrent[0] -= 1 // down
        inBackCurrent[1] += 1 // right
    }

    if ((yDifference == 1 && xDifference < -1) || (yDifference > 1 && xDifference == -1)) { // up left
        inBackCurrent[0] += 1 // up
        inBackCurrent[1] -= 1 // left
    }

    if ((yDifference == -1 && xDifference < -1) || (yDifference < -1 && xDifference == -1)) { // down left
        inBackCurrent[0] -= 1 // down
        inBackCurrent[1] -= 1 // left
    }

    if (currentKnot == 8) {
        allTailPositions.add(inBackCurrent[0] + '|' + inBackCurrent[1])
    }
}

// main();
main2();
