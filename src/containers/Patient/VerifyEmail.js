import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import Header from '../HomePage/Header';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      token: null,
      doctorId: null,
    };
  }

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get('token');
    const doctorId = urlParams.get('doctorId');
    if (this.props.location && this.props.location.search) {
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          token: token,
          doctorId: doctorId,
        });
      } else {
        this.setState({
          statusVerify: true,
          token: token,
          doctorId: doctorId,
        });
      }
    }
  };

  render() {
    const { statusVerify, token, doctorId } = this.state;
    if (!token || !doctorId) {
      const { history } = this.props;
      history.push('/home'); 
    }
    return (
      <>
        <div className="verify-email-container">
          <Header isShowBanner={false} />
          {statusVerify === false ? (
            !token || !doctorId ? (
              ''
            ) : (
              <h3 className="container status-title">
                {this.props.language === languages.VI
                  ? 'Người dùng chỉ được xác nhận 1 duy nhất lần!'
                  : 'Certain user can only confirm/verify once!'}
              </h3>
            )
          ) : (
            <h3 className="container status-title">
              {this.props.language === languages.VI
                ? 'Xác nhận lịch khám thành công!'
                : 'Appointment confirmation successful!'}
            </h3>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
