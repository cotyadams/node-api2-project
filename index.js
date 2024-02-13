// require your server and launch it here
const server = require('./api/server')

// define port
const port = 8000;

// initialize server on specified port
server.listen(port, () => {console.log(`server running on port ${port}`)})