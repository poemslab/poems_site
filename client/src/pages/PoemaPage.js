import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Button, Alert } from 'react-bootstrap'

class PoemaPage extends Component {
  state = {
    title: null,
    lyrics: null,
    message: null,
    color: null,
    creator: null,
    userLiked: false
  }

  componentDidMount() {
    this.getInfo()
  }

  like = async () => {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'post',
      url: `/api/poems/like/${this.props.match.params.id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState(state => ({ message: req.data.message, color: 'success', userLiked: !state.userLiked }))
  }

  delete = async () => {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'delete',
      url: `/api/poems/delete/${this.props.match.params.id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState({ message: req.data.message, color: 'success' })
  }

  getInfo = async () => {
    const req = await axios({
      method: 'get',
      url: `/api/poems/get/${this.props.match.params.id}`,
      validateStatus: false
    })
    if (req.data.success) {
      this.setState({ title: req.data.data.title, lyrics: req.data.data.text, creator: req.data.data.creator })
    }
    if(!!this.props.user.liked.find(r => r._id === this.props.match.params.id)) {
      this.setState({userLiked: true})
    }
  }

  render() {
    return (
      <div style={{ marginTop: 30 }} className="container">
        <Helmet>
          <title>{this.state.title}</title>
        </Helmet>
        {
          this.state.message ?
            <Alert variant={this.state.color}>
              {this.state.message}
            </Alert> : null
        }
        <div>
          <h1>{this.state.title}</h1>
          {this.state.lyrics ?
            this.state.lyrics.split('\n').map((r, i) => {
              return <p key={i}>{r}</p>
            }) : null}
        </div>
        {
          this.props.loged && !this.state.userLiked ?
            <Button variant="outline-dark" onClick={this.like} >
              Нравится
          </Button> : <Button variant="outline-dark" onClick={this.like} >
              Не Нравится
          </Button>
        }
        {
          this.props.user && this.props.user._id === this.state.creator ?
            <Button style={{paddingLeft: 30}} variant="outline-danger" onClick={this.delete} >
              Удалить
          </Button> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loged: state.user.loged,
  user: state.user.user
})

export default connect(mapStateToProps)(withRouter(PoemaPage))
