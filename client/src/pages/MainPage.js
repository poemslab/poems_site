import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

class MainPage extends Component {
  state = {
    poems: []
  }

  componentDidMount() {
    this.getPoems()
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

  render() {
    return (
      <div className="container">
        <div className="main_title">
          <h3>Список стихов</h3>
          <ol style={{marginTop: 30}}>
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
