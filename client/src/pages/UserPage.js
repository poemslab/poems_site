import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMe } from '../redux/actions/action'
import { NavLink } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

class UserPage extends Component {

  state = {
    title: '',
    lyrics: '',
    message: null,
    color: null,
    author: ''
  }

  componentWillMount() {
    this.props.getMe()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendRequest = async () => {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'put',
      url: '/api/poems/create',
      data: {
        title: this.state.title,
        text: this.state.lyrics,
        author: this.state.author
      },
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState({ title: '', lyrics: '', author: '', message: req.data.message, color: 'success' })
  }

  render() {
    return (
      <div className="user_container">
        <div>
          <h1 style={{ marginBottom: 10 }}>
            Добавить стих на сайт
          </h1>
          {
            this.state.message ?
              <Alert variant={this.state.color}>
                {this.state.message}
              </Alert> : null
          }
          <div>
            <Form.Group>
              <Form.Label>Введите текст стиха</Form.Label>
              <Form.Control as="textarea" rows="3" name="lyrics" value={this.state.lyrics} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Введите автора</Form.Label>
              <Form.Control type="text" placeholder="Автор" name="author" value={this.state.author} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Введите заголовок</Form.Label>
              <Form.Control type="text" placeholder="Заголовок" name="title" value={this.state.title} onChange={this.handleChange} />
            </Form.Group>
          </div>
          <Button variant="outline-dark" onClick={this.sendRequest} >
            Добавить стих на сайт
          </Button>
        </div>
        <hr />
        <h1>
          Ваши любимые стихи
        </h1>
        <div>
          <ol>
            {this.props.user.liked.length === 0 ? <span>Тут ничего нет...</span> : this.props.user.liked.map((r, i) => {
              return (
                <li key={i}><NavLink to={`/poema/${r._id}`}>{r.title}</NavLink></li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
