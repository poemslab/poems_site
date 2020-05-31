import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLogOut } from '../../redux/actions/action'
import styles from './index.scss'

function AppNavbar(props) {
  const history = useHistory()
  function logOut() {
    props.setLogOut()
    history.push('/')
  }
  return (
    <div className={styles.sidebar}>
      <NavLink to='/'><img src={require('../../assets/logo.png')} /></NavLink>
      <p>
        Главное меню
      </p>
      <ul>
        <li><NavLink className='active' to="/">Главная</NavLink></li>
        <li><NavLink to="/">Категории</NavLink></li>
        <li><NavLink to="/">Все текста</NavLink></li>
        {
          props.logged ? 
          <li><NavLink to="/createpoema">Добавить стих</NavLink></li>
          : null
        }
      </ul>
      <p>
        Мой профиль
      </p>
      <ul>
        <li><NavLink to="/">Редактировать</NavLink></li>
      </ul>
      <div className={styles.bottom}>
        {
          props.logged ? 
          <a onClick={logOut}>Выйти</a>
          : <NavLink to='/login'>Войти</NavLink>
        }
      </div>
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
