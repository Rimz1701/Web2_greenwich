const http = require('http'); //Import Node.js core module
const server = http.createServer(function(req,res){  //creating server 
    if(req.url == '/') {  //check the URL of the current request
        //set response header
        res.writeHead(200,{'Content-Type' :'text/html' });
        //set response content
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    else if(req.url == "/student"){
        res.writeHead(200,{'Content-Type' :'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    }
    else if(req.url == "/admin"){
        res.writeHead(200,{'Content-Type' :'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    }
    else if(req.url == "/data"){
        res.writeHead(200,{'Content-Type' :'application/json' });
        res.write(JSON.stringify({ message:"Hello World Json"}));
        res.end();
    }
    else
        res.end('Invalid Request!');
});
server.listen(8000);  //listen for any incoming requests
console.log('Node.js web server at port 8000 is running..');