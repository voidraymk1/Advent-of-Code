const fs = require('fs');
const path = require('path');
console.log('cum');

async function main() {
    const file = await fs.promises.readFile(path.join(__dirname, 'input.txt'), 'utf-8');
    let size = 4;

    for (let i = 0; i < file.length; i++) {
        const uniqueCharacters = new Set(file.slice(i, size + i));

        if(uniqueCharacters.size == size) {
            console.log(i + size);
            break;
        }
    }
}

main();
