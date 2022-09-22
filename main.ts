import {serve} from "https://deno.land/std@0.156.0/http/server.ts";
import {Todo, TodosClientMessage, TodosServerMessage} from "./todos-react/src/types.ts";

// To listen on port 4242.
serve(handler, {port: 4242});

const todos: Todo[] = [];

let sockets: WebSocket[] = [];

const send = (message: TodosClientMessage) => sockets.forEach(s => s.send(JSON.stringify(message)));

const onMessage = (e: MessageEvent) => {
	const message: TodosServerMessage = JSON.parse(e.data)
	switch (message.type) {
		case 'ADD':
			const todo: Todo = {id: Math.random().toString(36).substr(2, 9), title: message.payload, done: false}
			todos.push(todo);
			send({type: 'ADD', payload: todo});
			break;
		case 'REMOVE': {
			const index = todos.findIndex(todo => todo.id === message.payload);
			if (index !== -1) {
				todos.splice(index, 1);
				send({type: 'REMOVE', payload: message.payload});
			}
			break;
		}
		case 'TOGGLE': {
			const todo = todos.find(todo => todo.id === message.payload);
			if (todo) {
				todo.done = !todo.done;
				send({type: 'UPDATE', payload: todo});
			}
			break;
		}
	}
	;
}

function handler(req: Request): Response {
	const upgrade = req.headers.get("upgrade") || "";
	let response, socket: WebSocket;
	try {
		({response, socket} = Deno.upgradeWebSocket(req));
	} catch {
		return new Response("request isn't trying to upgrade to websocket.");
	}
	
	socket.onopen = () => {
		sockets = [...sockets, socket];
		send({type: 'INIT', payload: todos});
	};
	socket.onclose = () => {
		sockets = sockets.filter(s => s !== socket);
	}
	socket.onmessage = onMessage
	
	socket.onerror = (e) => console.log("socket errored:", e);
	socket.onclose = () => console.log("socket closed");
	
	return response;
}
