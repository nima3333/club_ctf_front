import React, {Component} from 'react';
import {Redirect, Switch} from 'react-router-dom';

class Public extends React.Component {
  render(){return(
    <div className="public">
      Page de présention du site.
      <button onClick={this.props.authenticate}>Login</button>
    </div>
  )
  }
}

export default Public