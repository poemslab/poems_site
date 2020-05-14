import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLogOut } from '../redux/actions/action'
import Button from './Button'

function AppNavbar(props) {
  const history = useHistory()
  function logOut() {
    props.setLogOut()
    history.push('/')
  }
  return (
    <div className='navbar container'>
      <div>
        <a href="/">
          <img src={require('../assets/logo.png')}/>
        </a>
      </div>
      <div className='list'>
        <ul>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.poemslab">Скачать приложение</a>
          </li>
          <li>
            <a href="#">О нас</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
          <li>
            <Button>Создать аккаунт</Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loged: state.user.loged
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogOut: () => dispatch(setLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)
