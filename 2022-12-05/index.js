const fs = require('fs');
const path = require('path');
console.log('cum');


async function main() {

    // const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    let stacks = []
    let stacksAsArray = []
    let movements = []

    for await (const line of file.readLines()) {

        if (line.includes('[')) {
            let crates = []

            for(let i = 1; i <= line.length; i += 4) {
                crates.push(line[i]);
            }

            stacks.push(crates);
        } 

        if (line.includes('move', 0)) {
            const movement = line.split(' ');
            movements.push([parseInt(movement[1]), parseInt(movement[3]), parseInt(movement[5])])
        }

    }

    for (let i = 0; i < stacks[0].length; i++) {
        let array = []

        for (let j = 0; j < stacks.length; j++) {
            if(stacks[j][i] == ' ') {
                continue
            }

            array.unshift(stacks[j][i]);
        }

        stacksAsArray.push(array);
    }

    // Part 1 (uncomment this and comment Part 2)
    // console.log(stacks.join('\r\n'));
    // console.log(stacksAsArray.join('\r\n'));
    // console.log(movements)

    // movements.forEach((movement) => {
    //     let ammount = movement[0];
    //     let from = movement[1] - 1;
    //     let to = movement[2] - 1;

    //     // console.log(ammount, from, to)

    //     for(let i = 0; i < ammount; i++) {
    //         let currentCrate = stacksAsArray[from].pop();
    //         stacksAsArray[to].push(currentCrate);

    //         // console.log('Moving crate ' + currentCrate + ' from stack ' + from + ' to stack ' + to);
    //     }

    // })


    // Part 2

    movements.forEach((movement) => {
        let ammount = movement[0];
        let from = movement[1] - 1;
        let to = movement[2] - 1;

        console.log(ammount, from, to)

        let crateStack = stacksAsArray[from].slice(-Math.abs(ammount))

        for(let i = 0; i < ammount; i++) {
            stacksAsArray[from].pop()
        }
        

        crateStack.forEach((crate) => {
            stacksAsArray[to].push(crate);
        })
        

        console.log('Moving Stack ' + crateStack + ' from ' + from + ' to ' + to)
        console.log(stacksAsArray.join('\r\n'));

    })

    let result = [];

    stacksAsArray.forEach((stack) => {
        result.push(stack.pop());
    })
    
    // console.log(stacksAsArray.join('\r\n'));
    console.log(result.join(''))
}

main();

