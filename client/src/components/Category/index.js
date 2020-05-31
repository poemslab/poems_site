import React from 'react'
import styles from './index.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Category(props) {

  const {
    color,
    title,
    subtitle,
    to,
    className
  } = props

  const style = [styles.category, className || '']

  return (
    <NavLink to={to || '/'} className={style.join(' ')}>
      <div style={{backgroundColor: color || '#73B1F4'}} className={styles.category_logo}>

      </div>
      <div className={styles.category_body}>
        <div>
          <p className={styles.category_title}> {title} </p>
          <p className={styles.category_subtitle}> {subtitle} </p>
        </div>
        <div style={{backgroundColor: color || '#73B1F4'}} className={styles.category_circle}>
          <FontAwesomeIcon icon={faChevronRight} size='2x' color='#fff' />
        </div>
      </div>
    </NavLink>
  )
}
