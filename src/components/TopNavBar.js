import logo from '../logos/logo.png';
import styles from './TopNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import Dropdown from '../misc/DropdownIcon'
import { NavLink } from 'react-router-dom';
const navbar = {backgroundColor: '#282F3C'};

class NavBars extends Component {

  render() {
      return (
          <div className={`sidenavbar ${styles.aaa}`}>
            <Navbar style={navbar} expand="lg" sticky="top" className={styles.no_border}>

            <NavItem className="logo_container">
            <NavLink exact to="/" className={`nav-link ${styles.main_logo}`} activeClassName="active_no-action">              
              <img
                src={logo}
                width="40"
                height="40"
                className={`d-inline-block align-top ${styles.main_logo_img} ${styles.image}`}
                alt="React Bootstrap logo"
              /></NavLink>
            </NavItem>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className={styles.white}/>
            <Navbar.Collapse id="responsive-navbar-nav">
              
              <Nav className="mr-auto">
                <NavItem className="link_container">
                  <NavLink exact to="/dashboard" className={`nav-link ${styles.topbar_link}`} activeClassName={styles.active}>Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/hall_fame" className={`nav-link ${styles.topbar_link}`} activeClassName={styles.active}>Hall of Fame</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/hall_shame" className={`nav-link ${styles.topbar_link}`} activeClassName={styles.active}>Hall of Shame</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/events" className={`nav-link ${styles.topbar_link}`} activeClassName={styles.active}>Events</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/wiki" className={`nav-link ${styles.topbar_link}`} activeClassName={styles.active}>Wiki</NavLink>
                </NavItem>
              </Nav>

              <Nav>
                <Dropdown signOut={this.props.signOut}/>
              </Nav>

            </Navbar.Collapse>
            </Navbar>
          </div>
      )
  }
}

export default NavBars;
