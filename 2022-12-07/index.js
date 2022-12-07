const fs = require('fs');
const path = require('path');
console.log('cum');

let result = 0;
let results = []

async function main() {

    const file = await fs.promises.open(path.join(__dirname, 'input.txt'));

    let fileSystem = {};

    let currentPath = [];

    const updateFilesystem = (fileSys, currDir, dir) => {
        let temp = fileSys;

        if (currentPath.length == 0) {
            fileSys[dir] = {}
            return
        }

        for (let i = 0; i < currDir.length; i++) {
            temp = temp[currDir[i]];

            if (i == currDir.length - 1) {
                temp[dir] = {};
            }
        }
    }

    const addFile = (fileSys, currDir, size, name) => {
        let temp = fileSys;

        if (currentPath.length == 0) {
            fileSys[name] = parseInt(size)
            return
        }

        for (let i = 0; i < currDir.length; i++) {
            temp = temp[currDir[i]];

            if (i == currDir.length - 1) {
                temp[name] = parseInt(size);
            }
        }
    }

    for await (const line of file.readLines()) {
        let command = line.split(' ');

        if (command[0] == '$') {
            if (command[1] == 'cd') {
                if (command[2] == '/') {
                    currentPath = [];
                    continue
                }

                if (command[2] == '..') {
                    currentPath.pop()
                    continue   
                }
                
                currentPath.push(command[2])
            }
            continue
        }

        if (command[0] == 'dir') {
            updateFilesystem(fileSystem, currentPath, command[1])
            continue
        }

        addFile(fileSystem, currentPath, command[0], command[1]);

    }

    const usedSpace = recursion(fileSystem)

    let maxSpace = 70000000
    let neededSpace = 30000000

    const directories = results.filter(number => usedSpace - (maxSpace - neededSpace) < number)
    const sortedDir = directories.sort((a, b) => a - b)
    const result2 = sortedDir[0]
    console.log(result2)


}

function recursion(fileSys){
    let keys = Object.keys(fileSys);

    let total = 0;

    keys.forEach((key) => {
        let nextDirOrFile = fileSys[key]

        if (typeof nextDirOrFile === 'number') {
            total += nextDirOrFile;

        } else {
             total += recursion(nextDirOrFile)
        }

        console.log(key, nextDirOrFile)

    })

    if (total < 100000) {
        result += total;
    }

    results.push(total);

    return total
}

main();
