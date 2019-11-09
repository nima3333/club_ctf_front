import React from 'react';
import logo from '../logos/hacker.jpg'
import styles from './DropdownIcon.module.css'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';

class AvatarMenu extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  go(){

  }
  
  render() {
    return (
        <div className={styles.dropdown}>
        <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
              <img
                src={logo}
                width="40"
                height="40"
                className={`d-inline-block align-top ${styles.icon}`}
                alt="React Bootstrap logo"
              />        </DropdownToggle>
        <DropdownMenu left className={styles.menu}>
        {/*
            <DropdownItem  tag={Link} to="/lol">Test</DropdownItem>
            <DropdownItem divider/>
         */}
            <DropdownItem style={{backgroundColor: "#222222", color:"white"}} onClick={this.props.signOut} to="/">Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>

  </div>
    );
  }
}

export default AvatarMenu;