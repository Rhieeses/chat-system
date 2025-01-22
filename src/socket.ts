// socket.ts
import { Server as IOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

export const socketIOserver = (server: HTTPServer): void => {
	const io = new IOServer(server, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('message', (message) => {
			console.log(message);
			io.emit('message', `${message}`);
		});
	});
};

/**
 * export const setupSocketIO = (server: HTTPServer): void => {
	const io = new IOServer(server);

	io.on('connection', (socket: Socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on('sendMessage', (data: string) => {
			console.log(`Message received: ${data}`);
			io.emit('newMessage', data);
		});

		socket.on('disconnect', () => {
			console.log(`User disconnected: ${socket.id}`);
		});
	});
};

 */
