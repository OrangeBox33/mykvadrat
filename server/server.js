import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
	ARDUINO_ACTIONS,
	KEYS_OPTIONS,
	HISTORY_SIZE,
	CHAT_SIZE,
	CHAT_MESSAGE_SIZE,
} from './constants.js';
import { createGrid, hexToRgb, convertIdForArduino } from './helpers.js';

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
let oldGrid = createGrid();
let history = [];
let historyIndex = 0;
let notFirstCycle = false;
let chat = [];

const data = fs.readFileSync('./save.txt', { encoding: 'utf8', flag: 'r' });
const parsedData = JSON.parse(data);
grid = parsedData.grid;
oldGrid = parsedData.oldGrid;
history = parsedData.history;
historyIndex = parsedData.historyIndex;
notFirstCycle = parsedData.notFirstCycle;
chat = parsedData.chat;

const clients = new Set();
const arduinoClient = { client: null };

const wssServer = new WebSocketServer({ server });
const wsServer = new WebSocketServer({ port: 81 });

wsServer.on('connection', onConnectArduino);
wssServer.on('connection', onConnect);

function onConnectArduino(ws) {
	console.log('Arduino login');

	arduinoClient.client = ws;
	arduinoClient.client.isAlive = true;

	const arrForArduino = [ARDUINO_ACTIONS.GRID];

	for (let id = 0; id < grid.length; id++) {
		const rgbArr32 = hexToRgb(grid[convertIdForArduino(id)]).map((value) => Math.floor(value / 8));
		arrForArduino.push(id, ...rgbArr32);
	}

	arduinoClient.client.send(new Uint8Array(arrForArduino));

	arduinoClient.client.on('close', function () {
		console.log('Arduino closed');

		arduinoClient.client = null;
	});

	arduinoClient.client.on('ping', function () {
		console.log('arduino ping');

		if (arduinoClient.client) {
			arduinoClient.client.pong();
		}
	});

	arduinoClient.client.on('pong', function () {
		console.log('arduino pong');

		if (arduinoClient.client) {
			arduinoClient.client.isAlive = true;
		}
	});
}

function onConnect(ws) {
	clients.add(ws);
	ws.send(JSON.stringify({ type: 'getGrid', grid }));

	ws.on('message', function (message) {
		const { type, pixels, chatMsg } = JSON.parse(message);

		if (type === 'getChat') {
			ws.send(JSON.stringify({ type, chat }));
		}

		if (type === 'sendToChat') {
			if (chat.length > CHAT_SIZE) {
				chat.shift();
			}

			if (chatMsg?.userName && chatMsg?.text) {
				const slicedText = text.slice(0, CHAT_MESSAGE_SIZE);

				chat.push({ userName, slicedText });

				for (const client of clients) {
					client.send(JSON.stringify({ type, chatMsg: { userName, text: slicedText } }));
				}
			}
		}

		if (type === 'draw') {
			if (notFirstCycle) {
				const historyPixels = history[historyIndex];

				for (const pixel of historyPixels) {
					const { id, color } = pixel;
					oldGrid[id] = color;
				}
			}

			history[historyIndex] = [...pixels];

			if (historyIndex === HISTORY_SIZE) {
				historyIndex = 1;
				notFirstCycle = true;
			} else {
				historyIndex++;
			}

			const arrForArduino = [ARDUINO_ACTIONS.DRAW];

			for (const pixel of pixels) {
				const { id, color } = pixel;

				grid[id] = color;

				const rgbArr32 = hexToRgb(color).map((value) => Math.floor(value / 8));
				arrForArduino.push(convertIdForArduino(id), ...rgbArr32);
			}

			for (const client of clients) {
				if (client !== ws) {
					client.send(JSON.stringify({ type, pixels }));
				}
			}

			if (arduinoClient.client) {
				arduinoClient.client.send(new Uint8Array(arrForArduino));
			}
		}

		if (type === 'getGrid') {
			ws.send(JSON.stringify({ type: 'getGrid', grid }));
		}

		if (type === 'history') {
			const historyForClient = [];

			if (notFirstCycle) {
				for (let i = historyIndex; i < HISTORY_SIZE; i++) {
					const pixels = history[i];

					historyForClient.push(pixels);
				}
			}

			for (let i = 0; i < historyIndex; i++) {
				const pixels = history[i];

				historyForClient.push(pixels);
			}

			ws.send(JSON.stringify({ type: 'history', oldGrid, history: historyForClient }));
		}

		if (type === 'resetHistory') {
			history = [];
			oldGrid = [...grid];
			historyIndex = 0;
			notFirstCycle = false;
		}
	});

	ws.on('close', function () {
		console.log('отключился');
		if (clients.has(ws)) {
			clients.delete(ws);
		}

		if (ws === arduinoClient.client) {
			arduinoClient.client = null;
		}
	});
}

console.log('Сервер запущен на 80 порту');

setInterval(() => {
	if (arduinoClient.client) {
		if (!arduinoClient.client.isAlive) {
			console.log('Arduino соединение прервано');
			arduinoClient.client.terminate();
			arduinoClient.client = null;

			return;
		}

		arduinoClient.client.isAlive = false;
		arduinoClient.client.ping();
	}
}, 30000);

setInterval(() => {
	fs.writeFileSync(
		'save.txt',
		JSON.stringify({ grid, oldGrid, history, historyIndex, notFirstCycle, chat }),
		'utf-8'
	);
}, 60000);
