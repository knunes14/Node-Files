const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
        } else {
            console.log(`File contents of ${path}:\n ${data}`);
        }
    });
}

function webCat(url) {
    axios.get(url)
        .then(response => {
            console.log(`Contents of URL ${url}:\n ${response.data}`);
        })
        .catch(error => {
            console.error(`Error fetching URL ${url}:\n ${error}`);
        });
}

function writeFile(path, filename) {
    fs.writeFile(path, filename, 'utf8', (err) => {
        if (err) {
            console.error(`Couldn't write ${path}:\n ${err}`);
        } else {
            console.log(`Data written to ${path}`);
        }
    })
}

// Check if the command line argument for the file path is provided
if (process.argv.length < 3) {
    console.error('Usage: node step3.js [--out output-filename.txt] <file-path-or-url>');
} else {

    let outputPath = null;
    let input = null;
    
    if (process.argv[2] === '--out') {
        if (process.argv.length < 5) {
            console.error('Usage: node step3.js --out output-filename.txt <file-path-or-url>');
        } else {
            outputPath = process.argv[3];
            input = process.argv[4];
        }
    } else {
        input = process.argv[2];
    }

    if (input.startsWith('http://') || input.startsWith('https://')) {
        webCat(input); // It's a URL
    } else {
        cat(input); // It's a file path
    }

    if (outputPath) {
        // If outputPath is provided, write the content to the specified file
        if (input.startsWith('http://') || input.startsWith('https://')) {
            axios.get(input)
                .then(response => {
                    writeFile(outputPath, response.data);
                })
                .catch(error => {
                    console.error(`Error fetching URL ${input}:\n  ${error}`);
                });
        } else {
            fs.readFile(input, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading ${input}:\n  ${err}`);
                } else {
                    writeFile(outputPath, data);
                }
            });
        }
    }
}