import React from 'react'
import { useRoutes } from './routes';
import AppNavbar from './components/Navbar';
import { connect } from 'react-redux';
import { getMe } from './redux/actions/action';
import ReactGA from 'react-ga';
import MainPage from './pages/MainPage';

ReactGA.initialize('UA-161987514-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App(props) {
  props.getMe()
  const isAuthenticated = props.loged
  const router = useRoutes(isAuthenticated)
  return (
    <>
      <AppNavbar />
      {router}
    </>
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
