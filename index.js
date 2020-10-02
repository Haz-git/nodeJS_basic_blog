//Importing modules:
const http = require('http');
const fs = require('fs');
const url = require('url');

//Extracting data from HTML files synchronously to prevent constant re-rendering of files:
const landingPage = fs.readFileSync(`${__dirname}/templates/landing.html`,'utf-8');
const blogPage = fs.readFileSync(`${__dirname}/templates/blog.html`,'utf-8');
const blogList = fs.readFileSync(`${__dirname}/templates/blogList.html`,'utf-8');

//Creating the Server

const server = http.createServer((req, res) => {

    const { pathname, query } = url.parse(req.url, true);
    //I think the purpose of 'true' is to look for queries?

    if (pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        res.end(landingPage);
    } else if (pathname === '/bloglist') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        res.end(blogList);
    } else if (pathname === '/blog') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        
        res.end(blogPage);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });

        res.end('<h1>404 Not Found!</h1>');
    }
});


//Making the server listen to port 8000:
server.listen(8000, 'localhost', () => {

    console.log('server is listening on port 8000...');
});

