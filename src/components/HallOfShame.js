import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap'
import styles from './HallOfShame.module.css'
import Loading from '../misc/Loading'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class HallOfShame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: <Loading/>,
    };
  }

  componentDidMount(){
    sleep(500).then(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => this.setState({
        data : json.map(item => {
          return(
            <Jumbotron> 
              <h2>{item.title}</h2>
              <h3>{item.userId}</h3>
              <p>{item.body}</p>
            </Jumbotron>
            )
          })
        }));
    })
  }
    

  render() {
      return (
          <div className={`hallOfShame ${styles.full_width}`}>
            {this.state.data}            
          </div>
      )
  }
}

export default HallOfShame;
