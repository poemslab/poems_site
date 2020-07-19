import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { getMe } from '../../redux/actions/action'
import axios from 'axios'
import styles from './index.scss'
import Button from '../../components/Button'

class PoemaPage extends Component {
  state = {
    _id: null,
    title: null,
    lyrics: null,
    message: null,
    color: null,
    creator: null,
    author: null,
    thumbnail: null,
    likes: 0,
    disabled: false
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

    this.getInfo() // Update likes count
    this.props.getMe() // Update user for get new likes array
    this.setState(state => ({ message: req.data.message, color: 'success' }))
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
    this.props.history.push('/')
  }

  getInfo = async () => {
    const req = await axios({
      method: 'get',
      url: `/api/poems/get/${this.props.match.params.id}`,
      validateStatus: false
    })
    if (req.data.success) {
      this.setState({ _id: req.data.data._id, title: req.data.data.title, likes: req.data.data.likes, thumbnail: req.data.data.thumbnail, success: true, lyrics: req.data.data.text, creator: req.data.data.creator, author: req.data.data.author })
    }
  }

  render() {
    return (
      <div className={styles.page}>
        {
          this.state.success ? 
          <Helmet>
            <title> {this.state.author} - {this.state.title}</title>
          </Helmet> : null

        }
        <div className={styles.lyrics}>
          {
            this.state.lyrics ?
            this.state.lyrics.split(/(\n)|(↵)/g).map((r, i) => {
              if(r === '\n' || r === '↵' || r === undefined) return null
              return <p key={i}>{r}</p>
            }) 
            : null
          }
        </div>
        <div className={styles.sticky}>
          <div className={styles.info}>
            <img alt='alt' src={this.state.thumbnail || 'https://i.imgur.com/u7otRoX.png'} />
            <div className={styles.info_body}>
              <div>
                <p className={styles.title}>{this.state.author}</p>
                <p className={styles.subtitle}>{this.state.title}</p>
                <p className={styles.subtitle}>Лайков: <span>{this.state.likes}</span></p>
              </div>
              {
                this.props.loged ? 
                <div className={styles.btn_block}>
                  {
                    !(this.props.user && this.props.user.liked.includes(this.state._id)) ? 
                    <Button onClick={this.like} type='orange' className={styles.btn}>Лайкнуть</Button>
                    : <Button onClick={this.like} type='orange' className={styles.btn}>Убрать лайк</Button>
                  }
                  {
                    this.props.user && this.props.user.id === this.state.creator || this.props.user && this.props.user.mod ? 
                    <Button onClick={this.delete} type='dark'>Удалить</Button> : null
                  }
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loged: state.user.loged,
  user: state.user.user
})

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PoemaPage))
