import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import styles from './index.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <h1 className={styles.title}>poems-lab.ru</h1>
        <p className={styles.subtitle}>лаборатория стихов</p>
      </div>
      <div>
        <h2 className={styles.title}>Ссылки</h2>
        <div className={styles.list}>
          <a target="_blank" rel="noopener noreferrer" href='https://play.google.com/store/apps/details?id=com.poemslab'><FontAwesomeIcon icon={faGooglePlay} size="2x" /></a>
          <a target="_blank" rel="noopener noreferrer" href='https://github.com/poemslab/poems_site'><FontAwesomeIcon icon={faGithub} size="2x" /></a>
        </div>
      </div>
    </div>
  )
}
