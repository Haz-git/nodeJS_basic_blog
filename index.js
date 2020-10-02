//Importing modules:
const http = require('http');
const fs = require('fs');
const url = require('url');
const { red } = require('color-name');

//Extracting data from HTML files synchronously to prevent constant re-rendering of files:
const landingPage = fs.readFileSync(`${__dirname}/templates/landing.html`,'utf-8');
const blogPage = fs.readFileSync(`${__dirname}/templates/blog.html`,'utf-8');
const blogList = fs.readFileSync(`${__dirname}/templates/blogList.html`,'utf-8');

//Extracting JSON data async:

const data = fs.readFileSync(`${__dirname}/json-data/data.json`,'utf-8');
const dataObjs = JSON.parse(data);


//Helper function:

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%BLOGTITLE%}/g, product.blogTitle);
    output = output.replace(/{%BLOGDESCRIPTION%}/g, product.blogDescription);

    return output;
}

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
        //Map json data to HTML to blog format for each JSON object. (use map);
        //then, replace '{%BLOGLIST%}' with the array of html!
        const render = dataObjs.map(el => replaceTemplate(blogPage, el)).join('');
        //.join prevents rendering of comma-- map returns array.
        const output = blogList.replace('{%BLOGLIST%}', render);
        res.end(output);

    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        res.end(dataObjs);
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

