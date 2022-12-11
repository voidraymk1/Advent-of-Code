const fs = require('fs');
const path = require('path');
console.log('cum');

let monkeys = []
let results = []
let result;

class Monkey {
    counter = 0;

    constructor(currentMonkey, startingItems, operation, test, ifTrue, ifFalse) {
        this.monkey = currentMonkey;
        this.items = startingItems;
        this.operation = operation;
        this.test = test;
        this.isTrue = ifTrue;
        this.isFalse = ifFalse;
    }

    inspectItems(lcmNumber) {
        // console.log('Monkey', this.monkey)
        for (let i = 0; i < this.items.length; i++) {
            this.counter += 1
            
            // console.log('Monkey inspects an item with a worry level of', this.items[i])
            if (this.operation[0] == '+') {
                if (this.operation[1] == 'old') {
                    this.items[i] = this.items[i] + this.items[i] % lcmNumber;
                    // console.log('Worry level increases by', this.operation[1], 'to', parseInt(this.items[i]))
                } else {
                    this.items[i] = this.items[i] + parseInt(this.operation[1]) % lcmNumber;
                    // console.log('Worry level increases by', parseInt(this.operation[1]), 'to', parseInt(this.items[i]))
                }
            }

            if (this.operation[0] == '*') {
                if (this.operation[1] == 'old') {
                    this.items[i] = this.items[i] * this.items[i] % lcmNumber;
                    // console.log('Worry level is multiplied by', this.operation[1], 'to', parseInt(this.items[i]))
                } else {
                    this.items[i] = this.items[i] * parseInt(this.operation[1]) % lcmNumber;
                    // console.log('Worry level is multiplied by', parseInt(this.operation[1]), 'to', parseInt(this.items[i]))
                }
            }

            // this.items[i] = Math.floor(this.items[i] / 3)

            if ((this.items[i] % this.test) == 0) {
                monkeys[this.isTrue].items.push(this.items[i]);
            } else {
                monkeys[this.isFalse].items.push(this.items[i]);
            }
        }
        this.items = []
    }
}

async function main() {
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));
    let currentMonkey, startingItems, operation, test, ifTrue, ifFalse;
    let round = 0;

    for await (const line of file.readLines()) {
        const currentLine = line.split(' ').filter(Boolean)

        switch (currentLine[0]) {
            case 'Monkey':
                currentMonkey = parseInt(currentLine[1][0]);
                break;
            case 'Starting':    
                startingItems = currentLine.filter(item => parseInt(item)).map(item => parseInt(item));
                break;
            case 'Operation:': 
                operation = currentLine.slice(4);
                break;
            case 'Test:': 
                test = parseInt(currentLine.slice(3));
                break;
        }  

        switch (currentLine[1]) {
            case 'true:': 
                ifTrue = parseInt(currentLine.pop());
                break;
            case 'false:':
                ifFalse = parseInt(currentLine.pop());
                break;
        }

        if (currentLine[1] == 'false:') {
            monkeys.push(new Monkey(currentMonkey, startingItems, operation, test, ifTrue, ifFalse));
            currentMonkey = startingItems = operation = test = ifTrue = ifFalse = undefined
        }
    }

    let lcmArray = []
    let lcmNumber = monkeys[0].test;

    monkeys.forEach((monkey) => {
        lcmArray.push(monkey.test);
    })

    for (let i = 1; i < lcmArray.length; i++) {
        lcmNumber *= monkeys[i].test;
    }

    console.log(lcmNumber)

    while (round != 10000) {
        round += 1;

        monkeys.forEach((monkey) => {
            monkey.inspectItems(lcmNumber)
        })
    }

    monkeys.forEach((monkey) => {
        results.push(monkey.counter);
    })

    results.sort((a, b) => b - a)
    result = results[0] * results[1];

    console.log(result)
}
 
main();
