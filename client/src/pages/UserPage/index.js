import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMe } from '../../redux/actions/action'
import { NavLink } from 'react-router-dom'
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
        В разработке
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
