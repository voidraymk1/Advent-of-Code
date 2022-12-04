const fs = require('fs');
const path = require('path');
console.log('cum');


async function main() {

    // const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    let total = 0;

    for await (const line of file.readLines()) {

        const [assignmentRangeOne, assignmentRangeTwo] = line.split(',').map(assignment => assignment.split('-').map(n => Number(n)));

        if (assignmentRangeOne[0] <= assignmentRangeTwo[0]) {
            if(assignmentRangeOne[1] >= assignmentRangeTwo[0]) {
                total += 1;
                console.log('Found these two: ' + assignmentRangeOne + ', ' + assignmentRangeTwo)
                continue;
            }
        }

        if (assignmentRangeTwo[0] <= assignmentRangeOne[0]) {
            if(assignmentRangeTwo[1] >= assignmentRangeOne[0]) {
                total += 1;
                console.log('Found these two: ' + assignmentRangeOne + ', ' + assignmentRangeTwo)
                continue;
            }
        }

    }


    

    console.log(total)

}

main();

