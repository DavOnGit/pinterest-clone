import React from 'react'
import { Link, IndexLink } from 'react-router'
import { Components, withCurrentUser } from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import { Navbar, Nav } from 'react-bootstrap'
import MyModalTrigger from './MyModalTrigger.jsx'

// navigation link wrapper (prevent invalid props on 'li' tags)

const NavLinkWrapper = (props) => <li role='presentation'>{props.children}</li>

// navigation bar component when the user is logged in

const NavLoggedIn = ({currentUser}) =>

  <Nav className='header-nav header-logged-in' pullRight>

    <NavLinkWrapper>
      <IndexLink to={'/'} activeClassName='active'>Home</IndexLink>
    </NavLinkWrapper>

    <NavLinkWrapper>
      <Link to={'/uploads'} activeClassName='active'>Uploads</Link>
    </NavLinkWrapper>

    {Users.isAdmin(currentUser) ?
      <NavLinkWrapper>
        <Link to={'/admin'} activeClassName='active'>Admin</Link>
      </NavLinkWrapper> :
      null
    }

    <MyModalTrigger
      className='header-accounts'
      label={Users.getDisplayName(currentUser)}
      size='large'
      title={Users.getDisplayName(currentUser)}
      role='presentation'
    >
      <Components.AccountsLoginForm />
    </MyModalTrigger>

  </Nav>

// navigation bar component when the user is logged out

const NavLoggedOut = ({currentUser}) =>

    <Nav className='header-nav header-logged-out' pullRight>

      <MyModalTrigger
        className='header-accounts'
        label='Sign Up/Log In'
        size='large'
        title='Login or Signup:'
        role='presentation'
      >
        <Components.AccountsLoginForm />
      </MyModalTrigger>
      
    </Nav>

// Header component

const Header = ({currentUser}) => {
  return (

    <div className='header-wrapper'>

      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <img src='/packages/pinterest-clone/lib/static/whatapic_text.png' alt='Pixy'/>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          {currentUser ?
            <NavLoggedIn currentUser={currentUser}/> :
            <NavLoggedOut currentUser={currentUser}/>
          }
        </Navbar.Collapse>

      </Navbar>

    </div>
  )
}

export default withCurrentUser(Header)
