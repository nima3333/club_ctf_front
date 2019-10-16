import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard"
import Challenges from './Challenges'
const SideNavBar = React.lazy(() => import( './SideNavBar'));
const HallOfFame = React.lazy(() => import( "./HallOfFame"));
const HallOfShame = React.lazy(() => import( "./HallOfShame"));
const Events = React.lazy(() => import( "./Events"));
const Wiki = React.lazy(() => import( "./Wiki"));
const SignIn = React.lazy(() => import('../auth/SignIn'));
const Public = React.lazy(() => import('./publicPage'));
const TopNavBar = React.lazy(() => import('./TopNavBar'));

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
