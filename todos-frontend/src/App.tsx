import {useTodos} from "./hooks";
import AddTodoForm from "./views/AddTodoForm/AddTodoForm";
import TodoList from "./views/TodoList/TodoList";

function App() {
	const [todos, {toggleTodo, addTodo, removeTodo}] = useTodos()
	return (
		<div className="App">
			<h1>Todos</h1>
			<TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
			<AddTodoForm addTodo={addTodo}/>
		</div>
	)
}

export default App
