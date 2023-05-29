import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";

import userIcon from "../../src/assets/images/user.svg";
import passIcon from "../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import adminService from "../services/adminService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  render() {
    const { username, password, loginError } = this.state;
    const { lang } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="form_login">
            <h2 className="title">
              <FormattedMessage id="login.login" />
            </h2>
            <div className="form-group icon-true">
              <img className="icon" src={userIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.username",
                  lang
                )}
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>

            <div id="phone-input-container" className="form-group icon-true">
              <img className="icon" src={passIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.password",
                  lang
                )}
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>

            {loginError !== "" && (
              <div className="login-error">
                <span className="login-error-message">{loginError}</span>
              </div>
            )}

            <div className="form-group login">
              <input
                ref={this.btnLogin}
                id="btnLogin"
                type="submit"
                className="btn"
                value={LanguageUtils.getMessageByKey("login.login", lang)}
                onClick={this.processLogin}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
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
