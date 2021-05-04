const { exec } = require('child_process');
const http = require('http');
const nodeStatic = require('node-static');

module.exports = () => {
  const fileServer = new nodeStatic.Server('./build');
  http
    .createServer(function (req, res) {
      fileServer.serve(req, res);
    })
    .listen(3000, () => {
      console.log('Starting bugsfunny server');
      exec('xdg-open http://localhost:3000/', (err) => {
        if (err) throw err;
        console.log('Bugsfunny server listening on port 3000');
      });
    });
};
