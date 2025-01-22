import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import express, { Request, Response } from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { socketIOserver } from './socket.ts';

import connectionDB from './backend/config/connection';
import authRoute from './backend/routes/auth-route.ts';
import userRoute from './backend/routes/user-routes.ts';
import convoRoute from './backend/routes/convo-route.ts';
import messageRoute from './backend/routes/message-route.ts';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

app.prepare().then(() => {
	const server = express();
	const serverSSocket = createServer(server);
	const io = new SocketIOServer(serverSSocket, {
		cors: {
			origin: 'http://localhost:3000',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		console.log('A user connected');
		socket.on('message', (message) => {
			console.log(`Message received: ${JSON.stringify(message, null, 2)}`);
			io.emit('message', message);
		});
	});

	server.use(cookieParser());

	server.use(
		cors({
			origin: 'http://localhost:3000',
			credentials: true,
		}),
	);

	server.use(express.json());

	//api routes
	server.use('/api/auth', authRoute);
	server.use('/api/user', userRoute);
	server.use('/api/convo', convoRoute);
	server.use('/api/message', messageRoute);

	server.all('*', (req: Request, res: Response) => {
		return handle(req, res);
	});

	//socketIOserver(serverSocket);

	connectionDB().then(() => {
		serverSSocket.listen(port, () => {
			console.log(`> Ready on http://localhost:${port}`);
		});
	});
});
