import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.scss";
import "../../styles/global-class.scss";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
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

        <div className="home-header-masthead">
          <div className="slogan">
            <h1>
              Nền tảng y tế
              <br />
              <b>chăm sóc sức khỏe toàn diện</b>
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
                    require("../../assets/images/HomePage/app-store-badge-black.svg")
                      .default
                  }
                  alt=""
                />
              </a>
              <a href="#" className="gg-store">
                <img
                  src={
                    require("../../assets/images/HomePage/google-play-badge.svg")
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
                        require("../../assets/images/HomePage/133537-khamchuyenkhoa.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Khám
                    <br />
                    chuyên khoa
                  </span>
                </a>
              </div>
              <div className="remote-examination">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/133657-khamtuxa.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Khám
                    <br />
                    từ xa
                  </span>
                </a>
              </div>
              <div className="general-examination">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/133744-khamtongquat.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Khám
                    <br />
                    tổng quat
                  </span>
                </a>
              </div>
              <div className="medical-test">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/133744-dichvuxetnghiem.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Xét nghiệm
                    <br />y học
                  </span>
                </a>
              </div>
              <div className="mental-health">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/133744-suckhoetinhthan.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Sức khỏe
                    <br />
                    tinh thần
                  </span>
                </a>
              </div>
              <div className="dental-examination">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/104635-khamnhakhoa.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Khám
                    <br />
                    nha khoa
                  </span>
                </a>
              </div>
              <div className="surgery-package">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/151930-phau-thuat.jpg")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Gói
                    <br />
                    Phẩu thuật
                  </span>
                </a>
              </div>
              <div className="medical-products">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/133744-khamtainha.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Sản phẩm
                    <br />y tế
                  </span>
                </a>
              </div>
              <div className="health-test">
                <a href="#">
                  <div className="wrap-img">
                    <img
                      src={
                        require("../../assets/images/HomePage/160542-icon-bai-test-suc-khoe.png")
                          .default
                      }
                      alt=""
                    />
                  </div>
                  <span>
                    Bài test
                    <br />
                    sức khỏe
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="detail-container"></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
