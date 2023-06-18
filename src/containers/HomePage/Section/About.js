import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './About.scss';
import '../../../styles/global-class.scss';

const abouts = [
  {
    image: require('../../../assets/images/HomePage/truyen-thong/ictnews.png')
      .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image:
      require('../../../assets/images/HomePage/truyen-thong/suckhoedoisong.png')
        .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image: require('../../../assets/images/HomePage/truyen-thong/vnexpress.png')
      .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image: require('../../../assets/images/HomePage/truyen-thong/vtv1.png')
      .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
  },
  {
    image: require('../../../assets/images/HomePage/truyen-thong/vtcnews.png')
      .default,
    title: 'Bệnh viện Hữu nghị Việt Đức',
    className: 'vtc-news',
  },
];

class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="container-layout">
          <h2 className="about-title">Truyền thông nói về BookingCare</h2>
          <div className="about-content">
            <div className="about-left">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1&modestbranding=1"
                title="W3Schools Free Online Web Tutorials"
                width="500"
                height="300"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div className="about-right">
              {abouts.map((about, index) => (
                <a href="#" className="link-icon" key={index}>
                  <img
                    className={`link-img ${
                      about.className ? about.className : ''
                    }`}
                    src={about.image}
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
