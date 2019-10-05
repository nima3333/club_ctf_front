import styles from './SideNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import ReactBootstrap, {Navbar, NavItem, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import prog from '../icons/001-curly-brackets.png';
import terminal from '../icons/003-terminal-windows.png'
import loupe from '../icons/004-search.png'
import key from '../icons/005-key.png'
import ethernet from '../icons/006-ethernet.png'
const navbar = {backgroundColor: '#202225'};
 
const items = [
  {
    link:"/dashboard",
    image:prog
  },
  {
    link:"/dunno",
    image:terminal
  },
  {
    link:"/events",
    image:loupe
  },
  {
    link:"/wiki",
    image:key
  },
  {
    link:"/other",
    image:ethernet
  }
]

const itemObjects = items.map(item => {
  return(
    <NavItem>
      <NavLink exact to={item.link} className="nav-link" activeClassName={styles.active}> 
        <div className={styles.icon}>
        <img className={styles.test}
          src={item.image}
          alt="React Bootstrap logo"
          title="test"
        />
        </div>
      </NavLink>
    </NavItem>
  )
})

class NavBars extends Component {

  render() {
      return (
          <div className={`sidenavbar ${styles.bbb}`}>
            <Navbar style={navbar} defaultActiveKey="/home" className={`flex-column ${styles.main_logo} ${styles.bbb}`}>
            <Navbar.Collapse id="responsive-navbar-nav" className="flex-column bbb">
              <Nav className="mr-auto" className={`flex-column ${styles.bbb}`}>

              {itemObjects}

              </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
      )
  }
}

export default NavBars;
