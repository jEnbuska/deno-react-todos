import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";
import styles from './styles.module.css'

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return <button {...props} className={classNames(props.className, styles.button)}/>
}

export default Button
