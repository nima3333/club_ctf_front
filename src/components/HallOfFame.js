import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import styles from './HallOfFame.module.css'
import Loading from '../misc/Loading'
import ErrorMessage from '../misc/ErrorMessage'

var env = require('../misc/env.js');

class HallOfFame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    var api_data;
    var data = null;
    var xhr = new XMLHttpRequest();
    const setErrorFunction = this.setError
    const postProcessFunction = this.postProcess
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          api_data = JSON.parse(this.responseText).records;
          postProcessFunction(api_data)

        } else if (this.status === 503) {
          setErrorFunction("Erreur de chargement du leaderboard");
        }

      }
    });
    xhr.open("GET", env.server_url + "/api/v1/user/rankAll.php", false);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    try {
      xhr.send(data);
    }
    catch (e) {
      this.setError("Erreur de connexion")
    }
  }

  postProcess = (api_data) => {
    var i = 0;
    this.setState({
      data: api_data.map(item => {
        i++;
        return (
          <tr>
            <td>{i}</td>
            <td>{item.pseudo}</td>
            <td>{item.score}</td>
          </tr>
        )
      })
    })
  }

  setError = (message) => {
    this.setState({
      showError: true,
      errorMessage: message,
    })
  }

  handleClose = () => {
    this.setState({
      showError: false,
    })
  }

  render() {
    if (this.state.loading === true) {
      return (<div><Loading></Loading><ErrorMessage showError={this.state.showError} handleClose={this.handleClose} errorMessage={this.state.errorMessage}></ErrorMessage>
      </div>)
    }
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
