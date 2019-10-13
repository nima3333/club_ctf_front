import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import TopNavBar from './TopNavBar'
import SideNavBar from './SideNavBar'
import Dashboard from "./Dashboard"
import HallOfFame from "./HallOfFame"
import HallOfShame from "./HallOfShame"
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

  signout= () => {
    this.setState({
      isAuthenticated: false
    })    
    //setTimeout(cb, 100)
  }

  render() {
    if (this.state.isAuthenticated){
      return (
          <div className={`App ${styles.aaa}`}>
            <TopNavBar signOut={this.signout}/>
            <div className={styles.box}>
              <SideNavBar />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/hall_fame" component={HallOfFame} />
                <Route path="/hall_shame" component={HallOfShame} />
                <Route path="/events" component={Events} />
                <Route path="/wiki" component={Wiki} />
              </Switch>
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
