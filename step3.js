const { default: axios } = require('axios');
const fs = require('fs');
const argv = process.argv;

function cat(path, new_file_path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}:
        Error: ENOENT: no such file or directory, open '${path}'`);
            process.exit(1);
        };
        if (new_file_path){
            fs.writeFile(new_file_path, data, 'utf8', (err) => {
                if (err) {
                    console.log(`Couldn't write ${new_file_path}:
        Error: ENOENT: no such file or directory, open ${new_file_path}`);
                    process.exit(1);
                }
                return;
            });
        } else {
            console.log(data);
        };
    });
};


async function webCat(url, new_file_path) {
    try{
        let res = await axios.get(url);
        if (new_file_path){
            fs.writeFile(new_file_path, res.data, 'utf8', (err) =>{
                if (err) {
                    console.log(`Couldn't write ${new_file_path}:
        Error: ENOENT: no such file or directory, open ${new_file_path}`);
                    process.exit(1);
                }
                return;
            });
        } else {
            console.log(res.data);
        };
    } catch (err) {     
        console.log(`Error fetching ${url}:
        Error: Request failed with status code 404`);
        process.exit(1);
    };
};



if (argv[2] == '--out') {
    if (argv[4].includes("http")){
        webCat(argv[4], argv[3]);
    } else{
        cat(argv[4], argv[3]);
    };
} else if (argv[2].includes("http")){
    webCat(argv[2]);
} else {
    cat(argv[2]);
};