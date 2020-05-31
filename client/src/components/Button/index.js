import React from 'react'
import styles from './index.scss'

export default function Button(props) {

  const {
    onClick,
    children,
    type,
    className
  } = props

  const style = [className]

  switch (type) {
    case 'dark':
      style.push(styles.btn_dark)
      break;
    case 'orange':
      style.push(styles.btn_orange)
      break;
    default:
      style.push(styles.btn)
      break;
  }

  return (
    <button onClick={onClick} className={style.join(' ')}>
      { children }
    </button>
  )
}
