import React from 'react'
import styles from './index.scss'
import { NavLink } from 'react-router-dom'

export default function Bubble(props) {
  const {
    to,
    children,
    className
  } = props
  return (
    <NavLink to={to} className={`${styles.bubble} ${className || ''}`}>
      <span className={styles.text}>
        { children }
      </span>
    </NavLink>
  )
}
