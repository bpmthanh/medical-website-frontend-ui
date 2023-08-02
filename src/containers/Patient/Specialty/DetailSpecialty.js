import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getDetailSpecialtyById } from '../../../services/userService';
import Header from '../../../containers/HomePage/Header';
import { withRouter } from 'react-router-dom';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      res: {},
    };
  }

  componentDidMount = async () => {
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const value = urlParts[urlParts.length - 1];
    let res = await getDetailSpecialtyById(value, '');
    console.log(res);
    this.setState({
      arrDoctorId: res.data.arrDoctorId,
      res: res,
    });
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};
  
  handleViewDetailDoctor = (data) => {
    const { history } = this.props;
    history.push(`/detail-top-doctor/${data}`);
  };

  render() {
    return (
      <>
        <div className="detail-specialty-container ">
          <Header banner={false} />
          <div className="detail-specialty-contain">
            <div className="description-specialty">
              <title>{this.state.res.data && this.state.res.data.name}</title>
              {this.state.res.data && this.state.res.data.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.res.data.descriptionHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="each-doctor">
              {this.state.arrDoctorId &&
                this.state.arrDoctorId.length > 0 &&
                this.state.arrDoctorId.map((item, index) => {
                  return (
                    <div className="schedule-doctor" key={index}>
                      <div className="content-left">
                        <ProfileDoctor
                          doctorId={item.doctorId}
                          dataSchedule={this.props.dataSchedule}
                          isShowDescriptionDoctor={true}
                          isShowScheduleDoctor={true}
                          isShowPriceDoctor={true}
                        />
                        <div
                          className="watch-more"
                          onClick={() =>
                            this.handleViewDetailDoctor(item.doctorId)
                          }
                        >
                          Xem thêm
                        </div>
                      </div>
                      <div className="content-right">
                        <DoctorSchedule doctorId={item.doctorId} />
                        <DoctorExtraInfo doctorId={item.doctorId} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <HomeFooter />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailSpecialty));
