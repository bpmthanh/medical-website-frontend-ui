import React, { Component } from 'react';

import { connect } from 'react-redux';

import Specialty from './Section/Specialty';

import Header from './Header';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Specialty />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
