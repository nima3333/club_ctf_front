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
import cog from '../icons/006-settings.png'
import {withRouter} from 'react-router-dom';

const navbar = {backgroundColor: '#1D252B'};

const items = [
  {
    link:"Dev",
    image:prog
  },
  {
    link:"Web",
    image:terminal
  },
  {
    link:"Forensics",
    image:loupe
  },
  {
    link:"Crypto",
    image:key
  },
  {
    link:"Reseau",
    image:ethernet
  },
  {
    link:"Reverse",
    image:cog
  }
]


class NavBars extends Component {

  constructor(props){
    super(props)
    this.state={active:""}
  }

  onClick = (link) => {
    this.props.changeChallenge(link)
    this.setState({active: link})
    console.dir(this.state)
  }

  render() {
    this.itemObjects = items.map(item => {
      let active_class = ""
      if(item.link === this.state.active && this.props.location.pathname === "/challenges"){
        active_class = styles.active_style
      }
      return(
        <NavItem>
          <NavLink exact to="/challenges" className="nav-link" onClick={()=>this.onClick(item.link) } activeClassName={styles.active} >
            <div className={`${styles.icon} ${active_class}`}>
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
      return (
          <div className={`sidenavbar ${styles.bbb}`}>
            <Navbar style={navbar} defaultActiveKey="/home" className={`flex-column ${styles.main_logo} ${styles.bbb}`}>
            <Navbar.Collapse id="responsive-navbar-nav" className="flex-column bbb">
              <Nav className={`mr-auto flex-column ${styles.bbb}`}>

              {this.itemObjects}

              </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
      )
  }
}

export default withRouter(NavBars);
