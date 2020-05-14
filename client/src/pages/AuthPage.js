import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, InputGroup, Button, Alert } from 'react-bootstrap'
import { sendRegister, sendLogin } from '../redux/actions/action'

class AuthPage extends Component {
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
    this.props.sendRegister({email: this.state.email, password: this.state.password})
  }

  sendLogin = async () => {
    this.props.sendLogin({email: this.state.email, password: this.state.password})
  }

  render() {
    return (
      <div className="auth_container">
        {
          this.props.message ?
          <Alert variant={this.props.color}>
            {this.props.message}
          </Alert> : null
        }
        <div className="auth_header">
          <h3>Авторизуйтесь</h3>
        </div>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </InputGroup>
        <div className="auth_buttons">
          <Button onClick={this.sendLogin} className="auth_button" variant="dark">
            Войти
          </Button>
          <Button variant="dark" onClick={this.sendRegister}>
              Зарегистрироваться
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
