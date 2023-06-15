import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MedicalFacility.scss';
import '../../../styles/global-class.scss';

class MedicalFacility extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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
      <div className="section-medical-facilities">
        <div className="container-layout specialty-content">
          <div className="specialty-header">
            <h2 className="specialty-header-title">Cơ sở y tế nổi bật</h2>
            <button className="specialty-header-des">Xem thêm</button>
          </div>
          <Slider {...settings}>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/083122lo-go-viet-duc.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/085056logobenhvien108.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/152704logo-bvcr-moi.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/153236-logo-hung-viet.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/155206-logo-y-duoc-1.jpg')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
            </div>
            <div className="specialty-content-detail">
              <div className="image-container">
                <img
                  src={
                    require('../../../assets/images/HomePage/co-so-y-te-noi-bat/104922-logo-med-tai-ha-noi--01.png')
                      .default
                  }
                  alt=""
                />
              </div>
              <h3 className="detail-title">Bệnh viện Hữu nghị Việt Đức</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
