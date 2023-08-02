import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getDetailInfoDoctor } from '../../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoDoctor: [],
    };
  }

  componentDidMount = async () => {
    let res = await getDetailInfoDoctor(this.props.doctorId);
    this.setState({ infoDoctor: res.data });
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ modal: this.props.isOpen });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      const res = await getDetailInfoDoctor(this.props.doctorId);
      this.setState({ infoDoctor: res.data });
    }
  };

  formatDateVi = (timestamp) => {
    const daysOfWeek = [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ];
    const date = new Date(parseInt(timestamp));
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  };

  formatDateEn = (timestamp) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(parseInt(timestamp));
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  };

  render() {
    let { infoDoctor } = this.state;
    let { dataSchedule } = this.props;

    return (
      <>
        <div className="profile-doctor-container">
          <div className="avatar">
            <img src={infoDoctor.image} alt="" />
          </div>
          <div className="doctor-info">
            <div className="doctor-name">
              {this.props.language === languages.VI
                ? `${
                    infoDoctor.positionData && infoDoctor.positionData.value_vi
                  }, ${infoDoctor.lastName} ${infoDoctor.firstName}`
                : `${
                    infoDoctor.positionData && infoDoctor.positionData.value_en
                  }, ${infoDoctor.firstName} ${infoDoctor.lastName}`}
            </div>
            {this.props.isShowDescriptionDoctor && (
              <div className="doctor-des">
                {infoDoctor.Markdown && infoDoctor.Markdown.description}
              </div>
            )}

            {this.props.isShowScheduleDoctor || (
              <div className="doctor-schedule">
                <FormattedMessage
                  id={'patient.modal-schedule-doctor.modal-time'}
                />
                &nbsp;
                {this.props.language === languages.VI
                  ? `${
                      dataSchedule.timeTypeData &&
                      dataSchedule.timeTypeData.value_vi
                    }, ${this.formatDateVi(dataSchedule.date)}`
                  : `${
                      dataSchedule.timeTypeData &&
                      dataSchedule.timeTypeData.value_en
                    }, ${this.formatDateEn(dataSchedule.date)}`}
              </div>
            )}

            {this.props.isShowPriceDoctor || (
              <div className="doctor-price">
                <FormattedMessage
                  id={'patient.modal-schedule-doctor.modal-price'}
                />
                :&nbsp;
                {infoDoctor &&
                  (this.props.language === languages.VI ? (
                    <NumberFormat
                      value={
                        infoDoctor.Doctor_Infor &&
                        infoDoctor.Doctor_Infor.priceTypeData.value_vi
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' VND'}
                    />
                  ) : (
                    <NumberFormat
                      value={
                        infoDoctor.Doctor_Infor &&
                        infoDoctor.Doctor_Infor.priceTypeData.value_en
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' USD'}
                    />
                  ))}
              </div>
            )}

          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
