import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Navbar, Button, Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setLogOut } from '../redux/actions/action'

function AppNavbar(props) {
  const history = useHistory()
  function logOut() {
    props.setLogOut()
    history.push('/')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <NavLink to="/" ><Navbar.Brand>Стихи</Navbar.Brand></NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

        </Nav>
        {
          props.loged ?
            <NavDropdown title="Меню" id="basic-nav-dropdown">
              <NavLink to="/me" ><NavDropdown.Item as="div" >Ваши стихи</NavDropdown.Item></NavLink>
              <NavDropdown.Divider /> 
              <NavDropdown.Item onClick={() => logOut()}>Выйти</NavDropdown.Item>
            </NavDropdown> : <NavLink to="/auth"><Button variant="light">Войти</Button></NavLink>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => ({
  loged: state.user.loged
})

const mapDispatchToProps = (dispatch) => {
  return {
    setLogOut: () => dispatch(setLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)
