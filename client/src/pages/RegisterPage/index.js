import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendRegister, sendLogin } from '../../redux/actions/action'
import styles from './index.scss'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { NavLink } from 'react-router-dom'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    message: null,
    color: 'success'
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendRegister = async () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email.toLowerCase())) {
      this.setState({
        message: 'Неверные данные при авторизации',
        color: 'danger'
      })
      return
    }
    this.props.sendRegister({email: this.state.email, password: this.state.password})
  }

  render() {
    return (
      <div className={styles.auth}>
        <div>
          <div className={styles.block}>
            <h1>Зарегистрироваться</h1>
            {
              this.state.message || this.props.message ?
              <div style={{backgroundColor: this.state.color || this.props.color === 'danger' ? '#F25C5C' : '#27AE60'}} className={styles.alert}>
                { this.state.message || this.props.message }
              </div> : null
            }
            <Input onChange={this.handleChange} name='email' id='email' type='email' placeholder='Email' />
            <Input onChange={this.handleChange} name='password' min='6' id='password' type='password' placeholder='Password' />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button type='dark' onClick={this.sendRegister}>
                Зарегистрироваться
              </Button>
            </div>
            <p style={{marginTop: '10px'}}>Есть аккаунт? <NavLink to='/login' className={styles.btn}>Авторизоваться</NavLink></p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.user.message,
  color: state.user.color
})

const mapDispatchToProps = (dispatch) => {
  return {
    sendRegister: data => dispatch(sendRegister(data)),
    sendLogin: data => dispatch(sendLogin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
