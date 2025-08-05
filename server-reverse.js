const http = require('http');
const url = require('url');

// Function to reverse a number
function reverseNumber(num) {
  const reversed = num.toString().split('').reverse().join('');
  return parseInt(reversed);
}

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Check if number is passed
  if (parsedUrl.pathname === '/reverse' && query.num) {
    const inputNumber = query.num;

    // Validate number
    if (!/^-?\d+$/.test(inputNumber)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid input. Please pass a valid integer as ?num=1234');
      return;
    }

    const reversed = reverseNumber(inputNumber);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ original: inputNumber, reversed }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Use /reverse?num=1234 to reverse a number');
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
