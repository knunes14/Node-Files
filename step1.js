const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
        } else {
            console.log(`File contents of ${path}:\n ${data}`);
        }
    });
}

// Check if the command line argument for the file path is provided
if (process.argv.length < 3) {
    console.error('Usage: node step1.js <file-path>');
} else {
    const filePath = process.argv[2];
    cat(filePath);
}