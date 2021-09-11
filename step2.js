const { default: axios } = require('axios');
const fs = require('fs');
const argv = process.argv;

function cat() {
    fs.readFile(argv[2], 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${process.argv[2]}:
        Error: ENOENT: no such file or directory, open '${process.argv[2]}'`);
            process.exit(1);
        }
        console.log(data);
    });
};

async function webCat() {
    try{
        let res = await axios.get(process.argv[2]);
        console.log(res.data);
    } catch (err) {     
        console.log(`Error fetching ${process.argv[2]}:
        Error: Request failed with status code 404`);
        process.exit(1);
    };
};

if (process.argv[2].includes("http")){
    webCat();
} else {
    cat();
}