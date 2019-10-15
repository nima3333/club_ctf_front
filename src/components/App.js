import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
const SideNavBar = React.lazy(() => import( './SideNavBar'));
const Dashboard = React.lazy(() => import( "./Dashboard"));
const Challenges = React.lazy(() => import( "./Challenges"));
const HallOfFame = React.lazy(() => import( "./HallOfFame"));
const HallOfShame = React.lazy(() => import( "./HallOfShame"));
const Events = React.lazy(() => import( "./Events"));
const Wiki = React.lazy(() => import( "./Wiki"));
const SignIn = React.lazy(() => import('../auth/SignIn'));
const Public = React.lazy(() => import('./publicPage'));
const TopNavBar = React.lazy(() => import('./TopNavBar'));

class App extends Component {
  state = {
    isAuthenticated: false
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
              <Suspense fallback={<div>Chargement...</div>}>
                <TopNavBar signOut={this.signout}/>
              </Suspense>
            <div className={styles.box}>
              <Suspense fallback={<div>Chargement...</div>}>
                <SideNavBar />
              </Suspense>
              <Suspense fallback={<div>Chargement...</div>}>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/challenges" exact component={Challenges} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/hall_fame" component={HallOfFame} />
                  <Route path="/hall_shame" component={HallOfShame} />
                  <Route path="/events" component={Events} />
                  <Route path="/wiki" component={Wiki} />
                </Switch>
              </Suspense>
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
