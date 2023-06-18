import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Handbook.scss';
import '../../../styles/global-class.scss';

const handbookData = [
  {
    image:
      require('../../../assets/images/HomePage/cam-nang/174013-review-nha-khoa-hoa-hong-phuong-dong.png')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image:
      require('../../../assets/images/HomePage/cam-nang/165157-dia-chi-kham-nhi-quan-7.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image:
      require('../../../assets/images/HomePage/cam-nang/152546-kham-mat-quan5.jpg')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image:
      require('../../../assets/images/HomePage/cam-nang/142734-top-dia-chi-kham-tai-mui-hong-hai-ba-trung-uy-tin.png')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
];

class Handbook extends Component {
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
      <div className="section-handbook">
        <div className="container-layout specialty-content">
          <div className="specialty-header">
            <h2 className="specialty-header-title">Cẩm nang</h2>
            <button className="specialty-header-des">Xem thêm</button>
          </div>
          <Slider {...settings}>
            {handbookData.map((specialty, index) => (
              <div className="specialty-content-wrap">
                <div className="specialty-content-detail" key={index}>
                  <div className="image-container">
                    <img src={specialty.image} alt="" />
                  </div>
                  <div className="detail-title-wrap">
                    <h3 className="detail-title">{specialty.title}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
