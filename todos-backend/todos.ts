import {Todo} from "../todos-frontend/src/types.ts";
import db from './db.ts'

const rowToTodo = ([id, title, done]: any[]): Todo => ({id, title, done});
export const createTodo = async (title: string): Promise<Todo> => {
	const id = globalThis.crypto.randomUUID();
	await db.query("INSERT INTO todo (id, title, done) VALUES ($1, $2, $3)", [id, title, false]);
	return {id, title, done: 0};
}

export const getTodos = async (): Promise<Todo[]> => {
	const res = await db.query("SELECT * FROM todo");
	const todos = res.map(rowToTodo)
	return todos
}

export const removeTodo = async (id: string): Promise<void> => {
	const res = await db.query("DELETE FROM todo WHERE id = $1", [id]);
}
export const toggleTodo = async (id: string): Promise<Todo> => {
	await db.query("UPDATE todo SET done = NOT done WHERE id = $1", [id]);
	const [res] = db.query("SELECT * FROM todo WHERE id = $1", [id]);
	return rowToTodo(res);
	
}


