import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.scss";
import "../../styles/global-class.scss";


class Header extends Component {
  render() {
    return (
      <div className="container-layout home-header-container">
        <div className="home-header-content">
          <div className="home-header-content__left-content">
            <i className="fa-solid fa-bars"></i>
            <div className="home-header-content__left-content--menu-icon"></div>
          </div>
          <div className="home-header-content__center-content">
            <div className="menu-list">
              <a href="#">
                Chuyên khoa
                <span>Tìm bác sĩ theo chuyên khoa</span>
              </a>
            </div>
            <div className="menu-list">
              <a href="#">
                Cơ sở y tế
                <span>Chọn bệnh viện phòng khám</span>
              </a>
            </div>
            <div className="menu-list">
              <a href="#">
                Bác sĩ
                <span>Chọn bác sĩ giỏi</span>
              </a>
            </div>
            <div className="menu-list">
              <a href="#">
                Gói khám
                <span>Khám sức khỏe tổng quát</span>
              </a>
            </div>
          </div>
          <div className="home-header-content__right-content">
            <a className="support" href="#">
              <i class="fas fa-phone-square"></i>
              <span>Hỗ trợ</span>
            </a>
            <a className="support" href="#">
              024-7301-2468
            </a>
          </div>
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
