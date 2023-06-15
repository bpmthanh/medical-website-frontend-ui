import React, { Component } from 'react';

import { connect } from 'react-redux';

import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';

import Header from './Header';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Specialty />
        <MedicalFacility />
        <OutStandingDoctor />
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
