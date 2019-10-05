import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import styles from './HallOfFame.module.css'

class HallOfFame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount(){
    const api_data= [
        {
          rank: 1,
          pseudo: "Alice",
          score: 123
        },
        {
          rank: 2,
          pseudo: "Bob",
          score: 12
        },
        {
          rank: 3,
          pseudo: "Charlie",
          score: 1
        } 
      ]
    this.setState({
      data : api_data.map(item => {
        return(
          <tr>
            <td>{item.rank}</td>
            <td>{item.pseudo}</td>
            <td>{item.score}</td>
          </tr>
        )})
      })
    }

  render() {
      return (
          <div className={`hallOfFame  ${styles.full_width}`}>
            <Table striped bordered hover variant="dark" >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Pseudo</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data}
              </tbody>
            </Table>         
          </div>
      )
  }
}

export default HallOfFame;
