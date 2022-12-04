const fs = require('fs');
const path = require('path');
console.log('cum');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

const calorieArray = input.split('\r\n');
let elvesArray = [];
let currentElf = 0;

calorieArray.forEach((item) => {

    if(item == '') {
        console.log('current line is empty! result of current elf: ' + currentElf);
        elvesArray.push(currentElf)
        currentElf = 0;
        console.log('continuing with next elf');
        return;
    }

    currentElf += parseInt(item);
    console.log('current line is ' + item + '!')
});

// console.log('result: ' + Math.max(...elvesArray));

// Part 2

const sortedElvesArray = elvesArray.sort((a, b) => b - a);
const bestThreeElves = sortedElvesArray[0] + sortedElvesArray[1] + sortedElvesArray[2]

console.log('result 2: ' + bestThreeElves);