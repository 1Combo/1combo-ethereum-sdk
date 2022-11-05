const fs = require('fs');
const path = require('path');

const files = [
    'ICollectionProxy',
    'ICombo',
    'IComboProxy',
    'IComboFactory',
];

function run() {
    const directory = process.argv[2];
    let result = {};
    fs.readdirSync(directory).forEach(file => {
        if (path.extname(file) == ".json") {
            let name = path.basename(file, ".json");
            if (files.includes(name)) {
                try {
                    const data = fs.readFileSync(path.join(directory, file));
                    const contract = JSON.parse(data);
                    result[name] = contract['abi'];
                } catch (err) {
                    console.error(err);
                }
            }
        }
    });
    try {
        let output;
        if (process.argv.length > 3) {
            output = process.argv[3];
        } else {
            output = path.join(process.cwd(), "../abi/ABI.json");
        }
        fs.writeFileSync(output, JSON.stringify(result, null, 4));
    } catch (err) {
        console.error(err);
    }
}

run();