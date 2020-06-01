import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import styles from './index.scss'
import Button from '../../components/Button'

class PoemaPage extends Component {
  state = {
    title: null,
    lyrics: null,
    message: null,
    color: null,
    creator: null,
    userLiked: false,
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
    this.props.history.push('/')
  }

  getInfo = async () => {
    const req = await axios({
      method: 'get',
      url: `/api/poems/get/${this.props.match.params.id}`,
      validateStatus: false
    })
    if (req.data.success) {
      this.setState({ title: req.data.data.title, likes: req.data.data.likes, thumbnail: req.data.data.thumbnail, success: true, lyrics: req.data.data.text, creator: req.data.data.creator, author: req.data.data.author })
      if(this.props.user && !!this.props.user.liked.find(r => r._id === this.props.match.params.id)) {
        this.setState({userLiked: true})
      }
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
          {this.state.lyrics ?
            this.state.lyrics.split(/(\n)|(↵)/g).map((r, i) => {
              if(r === '\n' || r === '↵' || r === undefined) return
              return <p key={i}>{r}</p>
            }) : null}
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
                  {/* {
                    !this.state.userLiked ? 
                    <Button onClick={this.like} type='orange' className={styles.btn}>Лайкнуть</Button>
                    : <Button onClick={this.like} type='orange' className={styles.btn}>Убрать лайк</Button>
                  } */}
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

export default connect(mapStateToProps)(withRouter(PoemaPage))
