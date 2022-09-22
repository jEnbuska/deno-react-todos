import RemoveTodoButton from "../../components/RemoveTodoButton/RemoveTodoButton";
import {Todo} from "../../types";
import TodoListItem from "../TodoListItem/TodoListItem";
import styles from './styles.module.css'

type OwnProps = {
	todos: Todo[];
	toggleTodo: (id: string) => unknown;
	removeTodo: (id: string) => unknown;
}
const TodoList = ({toggleTodo, removeTodo, todos}: OwnProps) => {
	return (
		<ul className={styles.todoList}>
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					todo={todo}
					toggleTodo={toggleTodo}
					removeTodo={removeTodo}
				/>
			))}
		</ul>
	)
}

export default TodoList
