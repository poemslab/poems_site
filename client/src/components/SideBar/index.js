import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { setLogOut } from '../../redux/actions/action'
import styles from './index.scss'

function AppNavbar(props) {
  const history = useHistory()
  function logOut() {
    props.setLogOut()
    history.push('/')
  }
  const [open, setOpen] = useState(true)
  const sidebarRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if(window.innerWidth < 1050 && open) {
          setOpen(false)
        }
      }
    }

    function resize() {
      if(window.innerWidth > 1050) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', resize)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div>
      {
        open ?
          <div ref={sidebarRef} className={styles.sidebar}>
            <NavLink to='/'><img src={require('../../assets/logo.png')} /></NavLink>
            <p>
              Главное меню
            </p>
            <ul>
              <li><NavLink className='active' to='/'>Главная</NavLink></li>
              <li><NavLink to='/categories'>Категории</NavLink></li>
              {/* <li><NavLink to='/'>Все текста</NavLink></li> */}
              {
                props.logged ?
                  <li><NavLink to='/createpoema'>Добавить стих</NavLink></li>
                  : null
              }
            </ul>
            <p>
              Мой профиль
            </p>
            <ul>
              <li><NavLink to='/'>Редактировать</NavLink></li>
            </ul>
            <div className={styles.bottom}>
              {
                props.logged ?
                  <a onClick={logOut}>Выйти</a>
                  : <NavLink to='/login'>Войти</NavLink>
              }
            </div>
          </div>
          : null
      }
      {
        window.innerWidth < 1050 ?
        <div className={styles.mobile}>
          <FontAwesomeIcon onClick={() => setOpen(true)} icon={faBars} size='2x' color='#000' />
        </div>
        : null
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  logged: state.user.loged,
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogOut: () => dispatch(setLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)
