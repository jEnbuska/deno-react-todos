import Button from "../Button/Button";
import styles from './styles.module.css'

type OwnProps = {
	onClick: () => unknown
}
const RemoveTodoButton = ({onClick}: OwnProps) => {
	return (
		<Button
			onClick={onClick}
			className={styles.removeTodoButton}
			title={'Remove todo'}
		/>
	)
}

export default RemoveTodoButton
