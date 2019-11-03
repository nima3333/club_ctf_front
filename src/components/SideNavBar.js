import styles from './SideNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import prog from '../icons/001-curly-brackets.png';
import terminal from '../icons/003-terminal-windows.png'
import loupe from '../icons/004-search.png'
import key from '../icons/005-key.png'
import ethernet from '../icons/006-ethernet.png'
const navbar = {backgroundColor: '#1D252B'};

const items = [
  {
    link:"Programmation",
    image:prog
  },
  {
    link:"Euh",
    image:terminal
  },
  {
    link:"Forensic",
    image:loupe
  },
  {
    link:"Crypto",
    image:key
  },
  {
    link:"Reseau",
    image:ethernet
  }
]



class NavBars extends Component {

  itemObjects = items.map(item => {
    return(
      <NavItem>
        <NavLink exact to="/challenges" className="nav-link" onClick={()=>this.props.changeChallenge(item.link) } activeClassName={styles.active} >
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

  render() {
      return (
          <div className={`sidenavbar ${styles.bbb}`}>
            <Navbar style={navbar} defaultActiveKey="/home" className={`flex-column ${styles.main_logo} ${styles.bbb}`}>
            <Navbar.Collapse id="responsive-navbar-nav" className="flex-column bbb">
              <Nav className="mr-auto" className={`flex-column ${styles.bbb}`}>

              {this.itemObjects}

              </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
      )
  }
}

export default NavBars;
