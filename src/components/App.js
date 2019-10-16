import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard"
import Challenges from './Challenges'
import SideNavBar from './SideNavBar'
import HallOfFame from "./HallOfFame"
import HallOfShame from "./HallOfShame"
import Events from "./Events"
import Wiki from "./Wiki"
import SignIn from'../auth/SignIn'
import Public from'./publicPage'
import TopNavBar from'./TopNavBar'

class App extends Component {
  state = {
    isAuthenticated: true,
    challenge: false
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

  changeChallenge= (chall) => {
    this.setState({
      challenge : chall
    })
    //console.dir(this.state.challenge)
  }

  ChallengePage = (props) => {
    if(this.state.challenge != false){
    return (
      <Challenges 
        chall={this.state.challenge}
        {...props}
      />
    );}
    else{
      return(
        <Dashboard/>
      )
    }
  }

  render() {
    if (this.state.isAuthenticated){
      return (
          <div className={`App ${styles.aaa}`}>
              <Suspense fallback={<div>Chargement...</div>}>
                <TopNavBar signOut={this.signout}/>
              </Suspense>
            <div className={styles.box}>
              <Suspense fallback={<div>Chargement...</div>}>
                <SideNavBar changeChallenge={this.changeChallenge}/>
              </Suspense>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/challenges" exact render={this.ChallengePage}/>}
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
        <Suspense fallback={<div>Chargement...</div>}>
          <Public authenticate = {this.authenticate}/>
        </Suspense>
      )
    }
  }
}



export default App;
