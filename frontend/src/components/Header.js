import React, { Component } from 'react';
import logo from '../logo.svg';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
class Header extends Component {

  navTo(uri) {
    window.location.href = window.location.origin + uri;
  }

  render() {
    return (
      <div className="App-header">
        <h1 onClick={() => { this.navTo('') }}>QuizApp</h1>
        <div >
          <LoginButton />
          <LogoutButton />
        </div>
      </div>

    );
  }
}

export default Header;
