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

// Check if the command line argument for the file path is provided
if (process.argv.length < 3) {
    console.error('Usage: node step1.js <file-path>');
} else {
    const filePath = process.argv[2];
    
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
        webCat(filePath);
    } else {
        cat(filePath);
    }
}
