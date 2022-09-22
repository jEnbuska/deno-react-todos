import {Todo, TodosClientMessage} from "./types";

export default function todosReducer(todos: Todo[], message: TodosClientMessage) {
	switch (message.type) {
		case "INIT":
			return message.payload;
		case "ADD":
			return [...todos, message.payload];
		case "UPDATE":
			return todos.map((todo) => {
					if (todo.id === message.payload.id) {
						return message.payload;
					}
					return todo;
				}
			);
		case "REMOVE":
			return todos.filter((todo) => todo.id !== message.payload);
		default:
			throw new Error(`Invalid message: ${JSON.stringify(message ?? null)}`);
	}
	
}
