import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OutStandingDoctor.scss';
import '../../../styles/global-class.scss';

const specialtyData = [
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/090559-pgs-nguyen-thi-hoai-an.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/103841-bs-tuan.png')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/105401-bsckii-tran-minh-khuyen.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/114430-bshung.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/155650-gs-ha-van-quyet.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
  {
    image:
      require('../../../assets/images/HomePage/bac-si-noi-bat/180640bac-si-vu-thai-ha.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    description: 'Sức khỏe tâm thần, Tư vấn, trị liệu Tâm lý',
  },
];

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
      <div className="section-medical-doctor-outstanding">
        <div className="container-layout specialty-content">
          <div className="specialty-header">
            <h2 className="specialty-header-title">Bác sĩ nổi bật tuần qua</h2>
            <button className="specialty-header-des">Xem thêm</button>
          </div>
          <Slider {...settings}>
            {specialtyData.map((specialty, index) => (
              <div className="specialty-content-wrap">
                <div className="specialty-content-detail" key={index}>
                  <div className="image-container">
                    <img src={specialty.image} alt="" />
                  </div>
                  <div className="detail-title-wrap">
                    <h3 className="detail-title">{specialty.title}</h3>
                    <span className="detail-des">{specialty.description}</span>
                  </div>
                </div>
              </div>
            ))}
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
