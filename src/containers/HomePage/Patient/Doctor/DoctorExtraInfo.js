import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { languages } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getScheduleDoctorByDate } from '../../../../services/userService';

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenTableContainer: true,
    };
  }

  componentDidMount = async () => {};

  componentDidUpdate(prevProps, prevState, snapshot) {}

  showTableContainer = () => {
    this.setState((prevState) => ({
      hiddenTableContainer: !prevState.hiddenTableContainer,
    }));
  };

  render() {
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage
                id={'patient.extra-info-doctor.clinic-address'}
              />
            </div>
            <div className="name-clinic">
              Phòng khám Bệnh viện Đại học Y Dược 1
            </div>
            <div className="detail-address">
              20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM
            </div>
          </div>
          <div className="content-down">
            <div className="price">
              <FormattedMessage id={'patient.extra-info-doctor.clinic-price'} />
              <span
                className="icon"
                style={{
                  display: this.state.hiddenTableContainer
                    ? 'inline-block'
                    : 'none',
                }}
              >
                :&nbsp;
              </span>
              <span
                className="price-detail"
                style={{
                  display: this.state.hiddenTableContainer
                    ? 'inline-block'
                    : 'none',
                }}
              >
                250000đ.
              </span>
              <span
                className="watch-detail"
                style={{
                  display: this.state.hiddenTableContainer
                    ? 'inline-block'
                    : 'none',
                }}
                onClick={this.showTableContainer}
              >
                &nbsp;&nbsp;
                <FormattedMessage id={'patient.extra-info-doctor.detail'} />
              </span>
            </div>
            <div
              className="table-container"
              style={{
                display: this.state.hiddenTableContainer ? 'none' : 'block',
              }}
            >
              <div className="table-price">
                <div className="left">
                  <FormattedMessage
                    id={'patient.extra-info-doctor.clinic-price'}
                  />
                </div>
                <div className="right">250.000đ</div>
              </div>
              <div className="table-price-des">
                Người bệnh được ưu tiên khám qua BookingCare. Giá khám cho người
                nước ngoài là 30 USD
              </div>
              <div className="table-payment">
                Người bệnh có thể thanh toán chi phí bằng phương thức tiền mặt
                và quẹt thẻ
              </div>
            </div>
            <div
              className="hidden"
              style={{
                display: this.state.hiddenTableContainer ? 'none' : 'block',
              }}
              onClick={this.showTableContainer}
            >
              <FormattedMessage id={'patient.extra-info-doctor.hidden'} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
