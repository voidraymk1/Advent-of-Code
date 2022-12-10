const fs = require('fs');
const path = require('path');
console.log('cum');

let x = 1;
let cycle = 0;
let cycleToLog = 20;
let allLogs = []
let result1 = 0;

let crtRow = []
let crtScreen = []
let drawEnd = 40;
let drawCycle = 0;

async function main() {
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    for await (const line of file.readLines()) {
        let instruction = line.split(' ');
        let type = instruction[0];
        let ammount = parseInt(instruction[1]);

        if (type == 'noop') {
            instructionCycle()
            drawPixel()
            continue
        }

        if(type == 'addx') {
            for (let i = 0; i < 2; i++) {
                instructionCycle()
                drawPixel()
            }
            x += ammount
        }
    }

    allLogs.forEach((log) => {
        result1 += log
    })

    console.log('Part 1:', result1)

    console.log(crtScreen)
}

function instructionCycle() {
    cycle += 1
    drawCycle += 1
    
    if (cycle == cycleToLog) {
        allLogs.push(cycleToLog * x)
        cycleToLog += 40
    }
}

function drawPixel() {

    if (drawCycle == x || drawCycle == x+1 || drawCycle == x+2) {
        crtRow.push('#');
    } else {
        crtRow.push('.')
    }

    if (crtRow.length == drawEnd) {
        let row = []
        for (let i = 0; i < drawEnd; i++) {
            row.push(crtRow.shift())
        }
        console.log(row.join(''), row.length)
        drawCycle = 0
    }

}
 
main();
