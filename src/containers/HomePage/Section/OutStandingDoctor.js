import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OutStandingDoctor.scss';
import '../../../styles/global-class.scss';
import * as actions from '../../../store/actions';
import { languages } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      isFirstSlide: true,
      isLastSlide: false,
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.props.getTopDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('Previous props: ', prevProps.doctors);
    // console.log('Current props: ', this.props.doctors);
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({ arrDoctors: this.props.doctors.reverse() });
    }
  }

  handleAfterChange = (currentSlide) => {
    const slider = this.sliderRef.current;
    // console.log(currentSlide)
    if (slider) {
      const slick = slider.innerSlider;
      this.setState({
        isFirstItem: currentSlide === 0,
        isLastItem: currentSlide === slick.props.children.length - 1,
      });
    }
  };

  render() {
    const { arrDoctors, isFirstItem, isLastItem } = this.state;
    // console.log(isFirstItem, isLastItem);
    let language = this.props.language;
    let settings = {
      dots: true,
      infinite: false,
      speed: 2000,
      autoplay: false,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 4,
      slidesToShow: 4,
      adaptiveHeight: true,
      nextArrow: !isFirstItem && <NextArrow />,
      prevArrow: !isLastItem && <PrevArrow />,
      afterChange: this.handleAfterChange,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
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
            <h2 className="specialty-header-title">
              <FormattedMessage id="homepage.out-standing-doctor" />
            </h2>
            <button className="specialty-header-des">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <Slider ref={this.sliderRef} {...settings}>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64;
                if (item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString(
                    'binary'
                  );
                }
                let nameVi = `${item.positionData.value_vi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="specialty-content-wrap" key={index}>
                    <div className="specialty-content-detail">
                      <div className="image-container">
                        <img src={imageBase64} alt="" />
                      </div>
                      <div className="detail-title-wrap">
                        <h3 className="detail-title">
                          {language === languages.VI ? nameVi : nameEn}
                        </h3>
                        <span className="detail-des">{item.address}</span>
                      </div>
                    </div>
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
  <button
    className={`slick-next${props.isLastItem ? ' slick-disabled' : ''}`}
    onClick={props.onClick}
  >
    Next
  </button>
);

const PrevArrow = (props) => (
  <button
    className={`slick-prev${props.isFirstItem ? ' slick-disabled' : ''}`}
    onClick={props.onClick}
  >
    Prev
  </button>
);

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctors: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
