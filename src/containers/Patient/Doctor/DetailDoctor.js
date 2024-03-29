import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../containers/HomePage/Header';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import HomeFooter from '../../HomePage/HomeFooter';

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
    // if (prevState.detailDoctor !== this.state.detailDoctor) {
    // console.log(this.state.detailDoctor);
    // }
  }

  render() {
    let detailDoctor = this.state.detailDoctor;
    return (
      <>
        <Header isShowBanner={false} />
        <div className="doctor-detail-container">
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
          <div className="schedule-doctor vung-bao">
            <div className="content-left">
              <DoctorSchedule doctorId={this.props.match.params.id} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo doctorId={this.props.match.params.id} />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
        </div>
        <HomeFooter />
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
