import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header';
import './DoctorDetail.scss';
import { getDetailInfoDoctor } from '../../../../services/userService';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../../utils';

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let res = await getDetailInfoDoctor(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('Previous props: ', prevProps.doctors);
    // console.log('Current props: ', this.props.doctors);
    if (prevState.detailDoctor !== this.state.detailDoctor) {
      console.log(this.state.detailDoctor);
    }
  }

  render() {
    let detailDoctor = this.state.detailDoctor;
    return (
      <>
        <Header isShowBanner={false} />
        <div className="doctor-detail-container container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor.image && detailDoctor.image
                    ? detailDoctor.image
                    : ''
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {this.props.language === languages.VI
                  ? `${
                      detailDoctor.positionData &&
                      detailDoctor.positionData.value_vi
                    }, ${detailDoctor.lastName} ${detailDoctor.firstName}`
                  : `${
                      detailDoctor.positionData &&
                      detailDoctor.positionData.value_en
                    }, ${detailDoctor.firstName} ${detailDoctor.lastName}`}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-info-doctor"></div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
