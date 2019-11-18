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
import Public from'./publicPage'
import TopNavBar from'./TopNavBar'
import ChallPage from './ChallPage'
import {withRouter} from 'react-router-dom';

require('dotenv').config();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      challenge: false,
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }  
  
  state = {
    isAuthenticated: true,
    challenge: false,
    width: 0,
    height: 0
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
    // Reset the url
    this.props.history.push('/')
    //setTimeout(cb, 100)
  }

  changeChallenge= (chall) => {
    this.setState({
      challenge : chall
    })
    //console.dir(this.state.challenge)
  }

  ChallengePage = (props) => {
    if(this.state.challenge !== false){
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
            <TopNavBar signOut={this.signout}/>
            <div className={styles.box}>
                <SideNavBar changeChallenge={this.changeChallenge}/>
                <div className={styles.scrollable_area} style={{height: `${this.state.height-64}px`}}>
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/challenges" exact render={this.ChallengePage}/>}
                    <Route path="/hall_fame" component={HallOfFame} />
                    <Route path="/wiki" component={Wiki} />
                    <Route path="/hall_shame" component={HallOfShame} />
                    <Route path="/events" component={Events} />
                    <Route path="/challenges/:id(\d+)" component={ChallPage} />
                  </Switch>
                </div>
            </div>
          </div>
      )}
    else{
      //if the url is ./ , change it
      if(this.props.location.pathname !== "/"){
        this.props.history.push('/')
      }
      return(
        <Suspense fallback={<div>Chargement...</div>}>
          <Public authenticate = {this.authenticate}/>
        </Suspense>
      )
    }
  }
}



export default withRouter(App);
