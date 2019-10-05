import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import NavBars from './TopNavBar'
import SideNavBar from './SideNavBar'
import Dashboard from "./Dashboard"
import Hall_of_fame from "./Hall_of_fame"
import Hall_of_shame from "./Hall_of_shame"
import Events from "./Events"
import Wiki from "./Wiki"
import {Route, Switch} from 'react-router-dom';
import SignIn from '../auth/SignIn'
import Public from './publicPage'

class App extends Component {
  state = {
    isAuthenticated: true
  }

  authenticate = () => {
    this.setState({
      isAuthenticated: true
    })
    console.log(this.state)
    //setTimeout(cb, 100)
  }

  signout(cb) {
    this.setState({
      isAuthenticated: false
    })    
    setTimeout(cb, 100)
  }

  render() {
    if (this.state.isAuthenticated){
      return (
          <div className={`App ${styles.aaa}`}>
            <NavBars />
            <div className={styles.box}>
              <SideNavBar />
              <div>
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/hall_fame" component={Hall_of_fame} />
                <Route path="/hall_shame" component={Hall_of_shame} />
                <Route path="/events" component={Events} />
                <Route path="/wiki" component={Wiki} />
              </Switch>
              </div>
            </div>
            
          </div>          
      )}
    else{
      return(
        <Public authenticate = {this.authenticate}/>
      )
    }
  }
}

export default App;
