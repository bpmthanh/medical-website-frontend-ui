import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import "@fortawesome/fontawesome-free/css/all.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    const eyeHandle = document.querySelector(".eye-handle");
    if (event.target.value !== "") {
      eyeHandle.style.visibility = "visible";
    } else {
      eyeHandle.style.visibility = "hidden";
    }
  };

  handleLogin = () => {};

  handleShowHidePassword = (event) => {
    this.setState(
      (prevState) => ({
        isShowPassword: !prevState.isShowPassword,
      }),
      () => {
        const eyeHandle = document.querySelector(".eye-handle");
        if (this.state.isShowPassword) {
          eyeHandle.classList.replace("fa-eye-slash", "fa-eye");
        } else {
          eyeHandle.classList.replace("fa-eye", "fa-eye-slash");
        }
      }
    );
  };

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
              value={this.state.userName}
              onChange={(event) => this.handleOnchangeUsername(event)}
            />
            <div className="custom-input-password">
              <input
                type={this.state.isShowPassword ? "text" : "password"}
                className="login-input"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={(event) => this.handleOnchangePassword(event)}
              />
              <i
                className="fa-regular fa-eye-slash eye-handle"
                onClick={(event) => this.handleShowHidePassword(event)}
              ></i>
            </div>
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={() => {
              this.handleLogin();
            }}
          >
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
