import React from 'react'
import { useRoutes } from './routes'
import SideBar from './components/SideBar'
import { connect } from 'react-redux'
import { getMe } from './redux/actions/action'
import ReactGA from 'react-ga'
import AppNavbar from './components/Navbar'
import styles from './index.scss'

ReactGA.initialize('UA-161987514-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App(props) {
  props.getMe()
  const isAuthenticated = props.loged
  const router = useRoutes(isAuthenticated)
  return (
    <>
      <SideBar />
      <div className={styles.app}>
        {/* {
          isAuthenticated ?
          <AppNavbar logged={isAuthenticated} />
          : null
        } */}
        {router}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  loged: state.user.loged
})

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(getMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
