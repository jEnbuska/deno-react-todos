export type Todo = {
	id: string;
	title: string;
	done: 0 | 1;
}

export type TodosClientInitMessage = {
	type: 'INIT', payload: Todo[]
}

export type TodosServerAddMessage = { type: 'ADD', payload: string }

export type TodosClientAddMessage = {
	type: 'ADD', payload: Todo
}

export type TodosServerToggleMessage = {
	type: 'TOGGLE', payload: string
}

export type TodosClientUpdateMessage = {
	type: 'UPDATE', payload: Todo
}

export type TodosRemoveMessage = {
	type: 'REMOVE', payload: string
}

export type TodosServerMessage = TodosServerAddMessage | TodosServerToggleMessage | TodosRemoveMessage;

export type TodosClientMessage =
	TodosClientInitMessage
	| TodosClientAddMessage
	| TodosClientUpdateMessage
	| TodosRemoveMessage;

