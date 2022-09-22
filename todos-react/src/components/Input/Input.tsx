import classNames from "classnames";
import {HTMLProps} from "react";
import styles from './styles.module.css'
const Input = (props: HTMLProps<HTMLInputElement>) => {
	return <input {...props} className={classNames(props.className, styles.input)}/>
}

export default Input
