import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMe } from '../../redux/actions/action'
import axios from 'axios'

class UserPage extends Component {

  componentWillMount() {
    this.props.getMe()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
