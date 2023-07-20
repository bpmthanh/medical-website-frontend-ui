import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import './Login.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { handleLoginAPI } from '../../services';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isShowPassword: false,
      errMessage: '',
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
    const eyeHandle = document.querySelector('.eye-handle');
    if (event.target.value !== '') {
      eyeHandle.style.visibility = 'visible';
    } else {
      eyeHandle.style.visibility = 'hidden';
    }
  };

  handleLogin = async () => {
    this.setState({ errMessage: '' });
    try {
      let userData = await handleLoginAPI(
        this.state.userName,
        this.state.password
      );
      if (userData && userData.errCode !== 0) {
        this.setState({ errMessage: userData.message });
      }
      if (userData && userData.errCode === 0) {
        this.props.userLoginSuccess(userData);
      }
    } catch (e) {
      console.log(e.response.data.message);
      this.setState({ errMessage: e.response.data.message });
    }
  };

  handleShowHidePassword = (event) => {
    this.setState(
      (prevState) => ({
        isShowPassword: !prevState.isShowPassword,
      }),
      () => {
        const eyeHandle = document.querySelector('.eye-handle');
        if (this.state.isShowPassword) {
          eyeHandle.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
          eyeHandle.classList.replace('fa-eye', 'fa-eye-slash');
        }
      }
    );
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleLogin();
    }
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
              placeholder="Email or phone"
              value={this.state.userName}
              onChange={(event) => this.handleOnchangeUsername(event)}
            />
            <div className="custom-input-password">
              <input
                type={this.state.isShowPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => this.handleOnchangePassword(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
              <i
                className="fa-regular fa-eye-slash eye-handle"
                onClick={(event) => this.handleShowHidePassword(event)}
              ></i>
            </div>
          </div>
          <div className="text-danger">{this.state.errMessage}</div>
          <button
            type="submit"
            className="login-button"
            onClick={() => {
              this.handleLogin();
            }}
          >
            Login
          </button>
          <div className="social-login">
            <div className="social-login-title">Or login with:</div>
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
              Forgot password?
            </a>
            <span className="login-divider">·</span>
            <a href="#" className="login-link">
              Create a new account
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
    userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
