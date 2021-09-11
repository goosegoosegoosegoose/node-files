const fs = require('fs');
const argv = process.argv;

function cat() {
    try{
        fs.readFile(argv[2], 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(data);
        });
    } catch (err) {
        console.log(`Error reading ${process.argv[2]}:
            Error: ENOENT: no such file or directory, open '${process.argv[2]}'`)
    };
};

cat();