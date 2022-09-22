import {ChangeEvent, FormEvent, useState} from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from './styles.module.css'

type OwnProps = {
	addTodo(title: string): unknown
}

const AddTodoForm = ({addTodo}: OwnProps) => {
	const [title, setTitle] = useState('')
	
	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addTodo(title)
		setTitle('')
	}
	
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<Input
				type="text"
				placeholder="Todo title"
				value={title}
				onChange={handleTitleChange}
				className={styles.input}
			/>
			<Button type="submit">Add</Button>
		</form>
	)
}


export default AddTodoForm
