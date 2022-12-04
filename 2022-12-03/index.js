const fs = require('fs');
const path = require('path');
console.log('cum');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const rucksacks = input.split('\r\n');

const itemPriorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let myScore = 0;

rucksacks.forEach((rucksack) => {
    let middle = rucksack.length / 2;
    const firstCompartment = rucksack.substring(0, middle);
    const secondCompartment = rucksack.substring(middle);

    for(let i = 0; i < firstCompartment.length; i++) {
        const item = firstCompartment[i]

        if(secondCompartment.includes(item)) {
            myScore += itemPriorities.indexOf(item) + 1;
            // console.log('both contain ' + item + ' (' + (itemPriorities.indexOf(item) + 1) + ')');
            return;
        }
    }
});

// console.log(myScore);
// 8039

// Part 2
let itemCache;
myScore = 0;

for (let i = 0; i < (rucksacks.length - 2); i += 3) {
    const firstElf = rucksacks[i];
    const secondElf = rucksacks[i+1];
    const thirdElf = rucksacks[i+2];

    for (let j = 0; j < firstElf.length; j++) {
        const item = firstElf[j]

        if (secondElf.includes(item)) {
            itemCache = item;
            // console.log(itemCache);

            if (thirdElf.includes(itemCache)) {
                myScore += itemPriorities.indexOf(item) + 1;
                break;
            }
        }
    }
}

console.log(myScore);