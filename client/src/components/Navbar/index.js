import React from 'react'
import styles from './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function Navbar({ logged }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.flex}>
        <div className={styles.circle}>
          +
        </div>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faBell} size='sm' />
        </div>
        <NavLink to={logged ? '/me' : '/'}><img className={styles.avatar} src={'https://i.imgur.com/LSegXUK.jpg'} /></NavLink>
      </div>
    </div>
  )
}
