const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {

    // GET Request
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>Node.js HTTP Request Demo</h1>
            <p>GET request handled successfully.</p>
            <p>Server is running.</p>
        `);
    }

    // POST Request
    else if (req.method === 'POST' && req.url === '/data') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                method: 'POST',
                message: 'Data received successfully',
                data: body
            }));
        });
    }

    // PUT Request
    else if (req.method === 'PUT' && req.url === '/data') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                method: 'PUT',
                message: 'Data updated successfully',
                data: body
            }));
        });
    }

    // DELETE Request
    else if (req.method === 'DELETE' && req.url === '/data') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            method: 'DELETE',
            message: 'Data deleted successfully'
        }));
    }

    // Invalid Request
    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page Not Found');
    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});