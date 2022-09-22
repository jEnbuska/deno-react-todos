import classNames from "classnames";
import RemoveTodoButton from "../../components/RemoveTodoButton/RemoveTodoButton";
import {Todo} from "../../types";
import styles from "./styles.module.css";

type OwnProps = {
	todo: Todo;
	toggleTodo: (id: string) => unknown;
	removeTodo: (id: string) => unknown;
}

const TodoListItem = ({todo, toggleTodo, removeTodo}: OwnProps) => {
	return <li className={styles.todoListItem}>
		<input type="checkbox" checked={Boolean(todo.done)} onChange={() => toggleTodo(todo.id)}/>
		<span
			className={classNames(styles.todoListItemTitle, todo.done && styles.todoListItemTitleDone)}>{todo.title}</span>
		<RemoveTodoButton onClick={() => removeTodo(todo.id)}/>
	</li>
}

export default TodoListItem
