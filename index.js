//Importing modules:
const http = require('http');
const fs = require('fs');
const url = require('url');

//Extracting data from HTML files synchronously to prevent constant re-rendering of files:
fs.readFileSync(`${__dirname}/templates/landing.html`,'utf-8');

//Creating the Server

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end('Hello World!');
});


//Making the server listen to port 8000:
server.listen(8000, 'localhost', () => {

    console.log('server is listening on port 8000...');
});

