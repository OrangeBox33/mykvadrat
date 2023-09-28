const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const options = {
	key: fs.readFileSync('./ssl/privateKey.key'), // PRIVATE KEY
	cert: fs.readFileSync('./ssl/cerfKey.pem'), // CERTIFICATE
};

const server = https.createServer(options, app);
const server2 = http.createServer(app);

server.listen(443);
server2.listen(80);

const DEFAULT_COLOR = '#303030';
const DEFAULT_X = 16;
const DEFAULT_Y = 16;

const createGrid = size => {
	const grid = {};
	for (let i = 0; i < size; i++) {
		grid[i] = DEFAULT_COLOR;
	}

	return grid;
};

let grid = createGrid(DEFAULT_X * DEFAULT_Y);
let history = [];

const data = fs.readFileSync('./save.txt', { encoding: 'utf8', flag: 'r' });
const parsedData = JSON.parse(data);
grid = parsedData.grid;
history = parsedData.history;

const clients = new Set();

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', onConnect);

function onConnect(ws) {
	console.log('подключился');
	clients.add(ws);

	ws.on('message', function (message) {
		const { type, id, color } = JSON.parse(message);

		console.log(type);

		if (type === 'draw') {
			grid[id] = color;

			for (let client of clients) {
				if (client !== ws) {
					client.send(JSON.stringify(mess));
				}
			}
		}

		if (type === 'getGrid') {
			ws.send(JSON.stringify({ type: 'getGrid', grid }));
		}
	});

	ws.on('close', function () {
		console.log('отключился');
		clients.delete(ws);
	});
}

console.log('Сервер запущен на 80 порту');

setInterval(() => {
	fs.writeFileSync('save.txt', JSON.stringify({ grid, history }), 'utf-8');
}, 60000);
