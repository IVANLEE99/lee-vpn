const TCPRelay = require('./tcprelay').TCPRelay;
const local = require('commander');
const constants = require('./constants');

local
    .version(constants.VERSION)
    .option('-m --method <method>', 'encryption method, default: aes-256-cfb')
    .option('-k --password <password>', 'password')
    .option('-s --server-address <address>', 'server address')
    .option('-p --server-port <port>', 'server port, default: 8388')
    .option('-b --local-address <address>', 'local binding address, default: 127.0.0.1')
    .option('-l --local-port <port>', 'local port, default: 1080')
    .option('--log-level <level>', 'log level(debug|info|warn|error|fatal)', /^(debug|info|warn|error|fatal)$/i, 'info')
    .option('--log-file <file>', 'log file')
    .parse(process.argv);

var relay = new TCPRelay({
    localAddress: process.env['LOCALADDRESS'] || local.localAddress || '127.0.0.1',
    // localPort: process.env['LOCALPORT'] || local.localPort || 1080,
    localPort: process.env.PORT || local.localPort || 5000,
    serverAddress: process.env['SERVERADDRESS'] ||local.serverAddress || 'leevpn.herokuapp.com' ||'127.0.0.1',
    serverPort: process.env['SERVERPORT'] ||local.serverPort || 8388,
    password: process.env['PASSWORD'] || local.password || 'woshilixiang' || 'shadowsocks-over-websocket',
    method: process.env['METHOD'] || local.method || 'aes-256-cfb'
}, true);
// process.env['METHOD']
relay.setLogLevel(local.logLevel);
relay.setLogFile(local.logFile);
relay.bootstrap();