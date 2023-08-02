import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Specialty.scss';
import '../../../styles/global-class.scss';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router-dom';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  componentDidMount = async () => {
    let res = await getAllSpecialty();
    if (res && res.data.length > 0) {
      this.setState({ dataSpecialty: res.data });
    }
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    // if (this.state.dataSpecialty !== prevState.dataSpecialty) {
    //   let res = await getAllSpecialty();
    //   if (res && res.data.length > 0) {
    //     this.setState({ dataSpecialty: res.data });
    //   }
    // }
  };

  handleViewDetailDoctor = (data) => {
    const { history } = this.props;
    history.push(`detail-specialty/${data.id}`);
  };

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
            {this.state.dataSpecialty &&
              this.state.dataSpecialty.length > 0 &&
              this.state.dataSpecialty.map((item, index) => {
                return (
                  <div
                    className="specialty-content-detail"
                    key={index}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="image-container">
                      <img src={item.image} default alt="" />
                    </div>
                    <h3 className="detail-title">{item.name}</h3>
                  </div>
                );
              })}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Specialty));
