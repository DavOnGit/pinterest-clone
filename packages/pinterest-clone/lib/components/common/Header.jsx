import React from 'react'
import { Link } from 'react-router'
import { Components, withCurrentUser } from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
//import PicsNewForm from '../pics/PicsNewForm'
import { Navbar, Nav } from 'react-bootstrap'

// navigation bar component when the user is logged in

const NavLoggedIn = ({currentUser}) =>

  <div className="header-nav header-logged-in">

    <div className="header-accounts">

      <Link to={'/'}>Home</Link>

      <Link to={'/uploads'}>Uploads</Link>

      {Users.isAdmin(currentUser) ? <Link to={'/admin'}>Admin</Link> : null}

      <Components.ModalTrigger
        label={Users.getDisplayName(currentUser)}
        size="large"
        title={Users.getDisplayName(currentUser)}
      >
        <div>
          <Components.AccountsLoginForm />
        </div>
      </Components.ModalTrigger>

    </div>

  </div>

// navigation bar component when the user is logged out

const NavLoggedOut = ({currentUser}) =>

  <div className="header-nav header-logged-out">

    <Components.ModalTrigger
      label="Sign Up/Log In"
      size="large"
      title="Login or Signup:"
    >
      <Components.AccountsLoginForm />
    </Components.ModalTrigger>

  </div>

// Header component

const Header = ({currentUser}) => {
  return (

  <div className="header-wrapper">

    <Navbar inverse collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <img src="/packages/pinterest-clone/lib/static/pixy.png" alt="Pixy"/>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          {currentUser ?
            <NavLoggedIn currentUser={currentUser}/> :
            <NavLoggedOut currentUser={currentUser}/>
          }
        </Nav>
      </Navbar.Collapse>

    </Navbar>

  </div>)}

export default withCurrentUser(Header)
