import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="home-header-content__left-content">
            <i class="fa-solid fa-bars"></i>
            <div className="home-header-content__left-content--menu-icon"></div>
          </div>
          <div className="home-header-content__center-content"></div>
          <div className="home-header-content__right-content"></div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
