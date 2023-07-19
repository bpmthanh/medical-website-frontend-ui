import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './Header.scss';

import { changeLanguageApp } from '../../store/actions';

import '../../styles/global-class.scss';

import { languages } from '../../utils';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnHome = () => {
    const { history } = this.props;
    history.push('/home');
  };
  render() {
    let language = this.props.language;
    // console.log(language);
    return (
      <React.Fragment>
        <div className="container-layout home-header-container">
          <div className="home-header-content">
            <div className="home-header-content__left-content">
              <i className="fa-solid fa-bars"></i>
              <div
                className="home-header-content__left-content--menu-icon"
                onClick={() => this.returnHome()}
              ></div>
            </div>
            <div className="home-header-content__center-content">
              <div className="menu-list">
                <a href="#">
                  <FormattedMessage id="home-header.specialty.title" />
                  <span>
                    <FormattedMessage id="home-header.specialty.des" />
                  </span>
                </a>
              </div>
              <div className="menu-list">
                <a href="#">
                  <FormattedMessage id="home-header.healthcare-facility.title" />
                  <span>
                    <FormattedMessage id="home-header.healthcare-facility.des" />
                  </span>
                </a>
              </div>
              <div className="menu-list">
                <a href="#">
                  <FormattedMessage id="home-header.doctor.title" />
                  <span>
                    <FormattedMessage id="home-header.doctor.des" />
                  </span>
                </a>
              </div>
              <div className="menu-list">
                <a href="#">
                  <FormattedMessage id="home-header.health-check-package.title" />
                  <span>
                    <FormattedMessage id="home-header.health-check-package.des" />
                  </span>
                </a>
              </div>
            </div>
            <div className="home-header-content__right-content">
              <div className="support-container">
                <a className="support" href="#">
                  <i className="fas fa-phone-square"></i>
                  <span>
                    <FormattedMessage id="home-header.support.title" />
                  </span>
                </a>
                <a className="support" href="#">
                  024-7301-2468
                </a>
              </div>

              <div className="language-container">
                <span
                  className={
                    language === languages.VI
                      ? 'language-vi action'
                      : 'language-vi'
                  }
                  onClick={() => this.changeLanguage(languages.VI)}
                >
                  VI
                </span>
                <span> / </span>
                <span
                  className={
                    language === languages.EN
                      ? 'language-en action'
                      : 'language-en'
                  }
                  onClick={() => this.changeLanguage(languages.EN)}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-masthead">
            <div className="slogan">
              <h1>
                <FormattedMessage id="banner.slogan.title" />
                <br />
                <b>
                  <FormattedMessage id="banner.slogan.des" />
                </b>
              </h1>
            </div>

            <div className="search-container">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Tìm bác sĩ" />
              </div>
            </div>

            <div className="app-container">
              <div className="app">
                <a href="#" className="app-store">
                  <img
                    src={
                      require('../../assets/images/HomePage/app-store-badge-black.svg')
                        .default
                    }
                    alt=""
                  />
                </a>
                <a href="#" className="gg-store">
                  <img
                    src={
                      require('../../assets/images/HomePage/google-play-badge.svg')
                        .default
                    }
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className="menu-container">
              <div className="menu">
                <div className="specialist-examination">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133537-khamchuyenkhoa.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_1" />
                      <br />
                      <FormattedMessage id="banner.services.des_1" />
                    </span>
                  </a>
                </div>
                <div className="remote-examination">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133657-khamtuxa.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_2" />
                      <br />
                      <FormattedMessage id="banner.services.des_2" />
                    </span>
                  </a>
                </div>
                <div className="general-examination">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133744-khamtongquat.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_3" />
                      <br />
                      <FormattedMessage id="banner.services.des_3" />
                    </span>
                  </a>
                </div>
                <div className="medical-test">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133744-dichvuxetnghiem.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_4" />
                      <br />
                      <FormattedMessage id="banner.services.des_4" />
                    </span>
                  </a>
                </div>
                <div className="mental-health">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133744-suckhoetinhthan.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_5" />
                      <br />
                      <FormattedMessage id="banner.services.des_5" />
                    </span>
                  </a>
                </div>
                <div className="dental-examination">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/104635-khamnhakhoa.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_6" />
                      <br />
                      <FormattedMessage id="banner.services.des_6" />
                    </span>
                  </a>
                </div>
                <div className="surgery-package">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/151930-phau-thuat.jpg')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_7" />
                      <br />
                      <FormattedMessage id="banner.services.des_7" />
                    </span>
                  </a>
                </div>
                <div className="medical-products">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/133744-khamtainha.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_8" />
                      <br />
                      <FormattedMessage id="banner.services.des_8" />
                    </span>
                  </a>
                </div>
                <div className="health-test">
                  <a href="#">
                    <div className="wrap-img">
                      <img
                        src={
                          require('../../assets/images/HomePage/160542-icon-bai-test-suc-khoe.png')
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <span>
                      <FormattedMessage id="banner.services.title_9" />
                      <br />
                      <FormattedMessage id="banner.services.des_9" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="detail-container"></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
