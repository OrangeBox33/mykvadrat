import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { KEYS_OPTIONS, MAX_HISTORY_SIZE } from './constants.js';
import { createGrid, replacer, reviver } from './helpers.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const server = https.createServer(KEYS_OPTIONS, app);
const server2 = http.createServer(app);

server.listen(443);
server2.listen(80);

let grid = createGrid();
let history = new Map();
let historyIndex = 1;

const data = fs.readFileSync('./save.txt', { encoding: 'utf8', flag: 'r' });
const parsedData = JSON.parse(data, reviver);
grid = parsedData.grid;
history = parsedData.history;
historyIndex = parsedData.historyIndex;

const clients = new Set();
const wsServer = new WebSocketServer({ server });
wsServer.on('connection', onConnect);

function onConnect(ws) {
	console.log('подключился');
	clients.add(ws);

	ws.on('message', function (message) {
		const { type, id, color } = JSON.parse(message);

		console.log(type);

		if (type === 'draw') {
			history.set(historyIndex, { id, color: grid[id] });

			if (historyIndex === MAX_HISTORY_SIZE) {
				historyIndex = 1;
			} else {
				historyIndex++;
			}

			grid[id] = color;

			for (let client of clients) {
				if (client !== ws) {
					client.send(JSON.stringify({ type, id, color }));
				}
			}
		}

		if (type === 'getGrid') {
			ws.send(JSON.stringify({ type: 'getGrid', grid }));
		}

		if (type === 'history') {
			const oldGrid = { ...grid };
			const historyForClientReverse = [];

			for (let i = historyIndex - 1; i > 0; i--) {
				const { id, color } = history.get(i);

				oldGrid[id] = color;
				historyForClientReverse.push({ id, color });
			}

			if (history.size > historyIndex) {
				for (let i = MAX_HISTORY_SIZE; i >= historyIndex; i--) {
					const { id, color } = history.get(i);

					oldGrid[id] = color;
					historyForClientReverse.push({ id, color });
				}
			}

			const historyForClient = historyForClientReverse.reverse();

			ws.send(JSON.stringify({ type: 'history', oldGrid, history: historyForClient }));
		}
	});

	ws.on('close', function () {
		console.log('отключился');
		clients.delete(ws);
	});
}

console.log('Сервер запущен на 80 порту');

setInterval(() => {
	fs.writeFileSync('save.txt', JSON.stringify({ grid, history, historyIndex }, replacer), 'utf-8');
}, 60000);
