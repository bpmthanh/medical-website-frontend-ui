import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-logo">
            <img
              src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg"
              alt="Booking care Logo"
            />
          </div>
          <div className="login-input-group">
            <input
              type="text"
              className="login-input"
              placeholder="Email hoặc số điện thoại"
            />
            <input
              type="password"
              className="login-input"
              placeholder="Mật khẩu"
            />
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
          <div className="social-login">
            <div className="social-login-title">Hoặc đăng nhập với:</div>
            <div className="social-login-icons">
              <a href="#" className="social-login-icon facebook-icon">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social-login-icon twitter-icon">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="social-login-icon google-icon">
                <i className="fab fa-google" />
              </a>
            </div>
          </div>
          <div className="login-links">
            <a href="#" className="login-link">
              Quên mật khẩu?
            </a>
            <span className="login-divider">·</span>
            <a href="#" className="login-link">
              Tạo tài khoản mới
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
