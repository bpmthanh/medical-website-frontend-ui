import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Specialty.scss';
import '../../../styles/global-class.scss';

class Specialty extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 1200,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 4,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      slidesToShow: 4, // Hiển thị 4 thẻ trên một slide
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="container-layout section-specialty">
        <div className="specialty-content">
          <div className="specialty-header">
            <h2 className="specialty-header-title">Chuyên khoa phổ biến</h2>
            <button className="specialty-header-des">Xem thêm</button>
          </div>
          <Slider {...settings}>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/chuyen-khoa-pho-bien/120331-co-xuong-khop.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Cơ xương khớp</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/chuyen-khoa-pho-bien/120741-tim-mach.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Cơ xương khớp</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/chuyen-khoa-pho-bien/121146-tai-mui-hong.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Cơ xương khớp</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/chuyen-khoa-pho-bien/120933-tieu-hoa.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Cơ xương khớp</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/chuyen-khoa-pho-bien/121042-than-kinh.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Cơ xương khớp</h3>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const NextArrow = (props) => (
  <button className="slick-next" onClick={props.onClick}>
    Next
  </button>
);

const PrevArrow = (props) => (
  <button className="slick-prev" onClick={props.onClick}>
    Prev
  </button>
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
