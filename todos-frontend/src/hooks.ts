import {useCallback, useEffect, useReducer, useRef} from "react";
import todosReducer from "./todos-reducer";
import {TodosClientMessage, TodosServerMessage} from "./types";

export const useTodos = () => {
	const [todos, dispatchTodosMessage] = useReducer(todosReducer, []);
	
	const send = useRef<(message: TodosServerMessage) => void>()
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:4242");
		ws.onmessage = (event) => {
			const data: TodosClientMessage = JSON.parse(event.data);
			dispatchTodosMessage(data);
		}
		send.current = ((message: TodosServerMessage) => ws.send(JSON.stringify(message)));
		return () => {
			ws.close();
		}
	}, []);
	
	const addTodo = useCallback((text: string) => {
		send.current?.({type: 'ADD', payload: text});
	}, [])
	const removeTodo = useCallback((id: string) => {
		send.current?.({type: 'REMOVE', payload: id});
	}, [])
	const toggleTodo = useCallback((id: string) => {
		send.current?.({type: 'TOGGLE', payload: id});
	}, [])
	
	return [todos, {addTodo, removeTodo, toggleTodo}] as const;
}
