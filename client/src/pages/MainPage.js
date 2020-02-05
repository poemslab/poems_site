import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

class MainPage extends Component {
  state = {
    poems: [],
    showModal: false
  }

  componentDidMount() {
    this.getPoems()
    function detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /BlackBerry/i,
        /Windows Phone/i
      ];

      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    }
    if(detectMob()) {
      this.setState({showModal: true})
    }
  }

  async getPoems() {
    const request = await axios({
      method: 'get',
      url: '/api/poems/list',
      validateStatus: false
    })
    if (request.data.success) {
      this.setState({ poems: request.data.data })
    }
  }

  handleClose = () => {
    this.setState({showModal: false})
  }

  render() {
    return (
      <div className="container">
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Уважаемый пользователь!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Рекомендуем вам установить нашу мобильную версию сайта. Скачать можете <a rel="noopener noreferrer" target="_blank" href="/builds/app.apk">тут</a> (только для android)</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Хорошо
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="main_title">
          <h3>Список стихов</h3>
          <ol style={{ marginTop: 30 }}>
            {
              this.state.poems.map((r, i) => {
                return (
                  <li key={i}>
                    <NavLink to={`/poema/${r._id}`}>{r.title}</NavLink>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
