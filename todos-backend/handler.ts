import {Todo, TodosClientMessage, TodosServerMessage} from "../todos-frontend/src/types.ts";
import {createTodo, getTodos, removeTodo, toggleTodo} from './todos.ts'

const todos: Todo[] = [];

let sockets: WebSocket[] = [];

const send = (message: TodosClientMessage) => sockets.forEach(s => s.send(JSON.stringify(message)));

const onMessage = async (e: MessageEvent) => {
	const message: TodosServerMessage = JSON.parse(e.data)
	console.log('daTA', message)
	switch (message.type) {
		case 'ADD':
			
			const todo = await createTodo(message.payload)
			send({type: 'ADD', payload: todo});
			break;
		case 'REMOVE': {
			await removeTodo(message.payload);
			send({type: 'REMOVE', payload: message.payload});
			break;
		}
		case 'TOGGLE': {
			const todo = await toggleTodo(message.payload);
			send({type: 'UPDATE', payload: todo});
			break;
		}
	}
	;
}

export default function handler(req: Request): Response {
	let response, socket: WebSocket;
	try {
		({response, socket} = Deno.upgradeWebSocket(req));
	} catch {
		return new Response("request isn't trying to upgrade to websocket.");
	}
	
	socket.onopen = async () => {
		sockets = [...sockets, socket];
		const todos = await getTodos()
		send({type: 'INIT', payload: todos});
	};
	socket.onclose = () => {
		sockets = sockets.filter(s => s !== socket);
	}
	socket.onmessage = onMessage
	socket.onerror = (e) => console.log("socket errored:", e);
	
	return response;
}
