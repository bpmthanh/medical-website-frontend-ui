import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getDoctorInfoById } from '../../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenTableContainer: true,
      dataRes: {},
    };
  }

  componentDidMount = async () => {
    let res = await getDoctorInfoById(this.props.doctorId);
    console.log(res);
    this.setState({
      dataRes: res.data,
    });
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevState.dataRes !== this.state.dataRes) {
      let res = await getDoctorInfoById(this.props.doctorId);
      this.setState({
        dataRes: res.data,
      });
    }
  };

  showTableContainer = () => {
    this.setState((prevState) => ({
      hiddenTableContainer: !prevState.hiddenTableContainer,
    }));
  };

  render() {
    let dataRes = this.state.dataRes;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage
                id={'patient.extra-info-doctor.clinic-address'}
              />
            </div>
            <div className="name-clinic">{dataRes.nameClinic}</div>
            <div className="detail-address">{dataRes.addressClinic}</div>
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
                {dataRes &&
                  dataRes.priceTypeData &&
                  (this.props.language === languages.VI ? (
                    <NumberFormat
                      value={dataRes.priceTypeData.value_vi}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' VND'}
                    />
                  ) : (
                    <NumberFormat
                      value={dataRes.priceTypeData.value_en}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' USD'}
                    />
                  ))}
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
                <div className="right">
                  {dataRes &&
                    dataRes.priceTypeData &&
                    (this.props.language === languages.VI ? (
                      <NumberFormat
                        value={dataRes.priceTypeData.value_vi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' VND'}
                      />
                    ) : (
                      <NumberFormat
                        value={dataRes.priceTypeData.value_en}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' USD'}
                      />
                    ))}
                </div>
              </div>
              <div className="table-price-des">
                {dataRes &&
                  dataRes.note &&
                  (this.props.language === languages.VI
                    ? dataRes.note
                    : dataRes.note)}
              </div>
              <div className="table-payment">
                <FormattedMessage
                  id={'patient.extra-info-doctor.payment-method'}
                />
                <span className="table-payment-method">
                  {dataRes &&
                    dataRes.paymentTypeData &&
                    (this.props.language === languages.VI
                      ? dataRes.paymentTypeData.value_vi
                      : dataRes.paymentTypeData.value_en)}
                </span>
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
