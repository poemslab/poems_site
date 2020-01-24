import React from 'react'
import { useRoutes } from './routes';
import AppNavbar from './components/Navbar';
import { connect } from 'react-redux';
import { getMe } from './redux/actions/action';

function App(props) {
  props.getMe()
  const isAuthenticated = props.loged
  const router = useRoutes(isAuthenticated)
  return (
    <div>
      <AppNavbar/>
      {router}
    </div>
  )
}

const mapStateToProps = state => ({
  loged: state.user.loged
})

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
