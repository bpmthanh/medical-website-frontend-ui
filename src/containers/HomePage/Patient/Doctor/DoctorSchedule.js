import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../../services/userService';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  componentDidMount = async () => {
    let allDays = this.setDaysArray();
    // console.log(allDays);
    if (allDays && allDays.length > 0) {
      let date = allDays[0].label;
      let parts = date.split('-');
      date = parts[1].trim();
      let [ngay, thang, nam] = date
        .split('/')
        .map((part) => parseInt(part, 10));
      let ngayDaDinhDang = new Date(nam, thang - 1, ngay);
      let doctorId = this.props.doctorId;

      let res = await getScheduleDoctorByDate(
        doctorId,
        ngayDaDinhDang.getTime()
      );
      this.setState({
        allAvailableTime: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setDaysArray();
    }
  }

  setDaysArray = () => {
    let arrDate = [];
    const viFormattingHook = {
      // Định nghĩa hook cho tiếng Việt
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
        // Tùy chỉnh cách định dạng "dddd"
        dddd: function (format) {
          return format.charAt(0).toUpperCase() + this.format(format.slice(1));
        },
      },
    };

    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === languages.VI) {
        moment.updateLocale('vi', viFormattingHook);
        object.label = moment(new Date())
          .add(i, 'days')
          .format('dddd - DD/MM/YYYY')
          .replace(/^t/g, 'T')
          .replace('chủ nhật', 'Chủ nhật');
      } else {
        moment.locale('en'); // Sử dụng locale tiếng Anh
        object.label = moment(new Date())
          .add(i, 'days')
          .format('dddd - DD/MM/YYYY');
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      arrDate.push(object);
    }
    this.setState({ allDays: arrDate });
    return arrDate;
  };

  handleOnchangeSelect = async (event) => {
    let date = event.target.value;
    let parts = date.split('-');
    date = parts[1].trim();
    let [ngay, thang, nam] = date.split('/').map((part) => parseInt(part, 10));
    let ngayDaDinhDang = new Date(nam, thang - 1, ngay);
    let doctorId = this.props.doctorId;

    let res = await getScheduleDoctorByDate(doctorId, ngayDaDinhDang.getTime());
    console.log('Check response: ', res);

    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res.data,
      });
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              className="form-select"
              onChange={(event) => this.handleOnchangeSelect(event)}
              value={null}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={null}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <p className="schedule">
              <i
                className="fa fa-calendar"
                style={{ paddingRight: '5px' }}
                aria-hidden="true"
              ></i>
              LỊCH KHÁM
            </p>
            <div className="time">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  return (
                    <button key={index} className="btn btn-success">
                      {this.props.language === languages.VI
                        ? item.timeTypeData.value_vi
                        : item.timeTypeData.value_en}
                    </button>
                  );
                })
              ) : (
                <p style={{ color: 'red' }}>
                  {this.props.language === languages.VI
                    ? 'Không có lịch hẹn trong thời gian này, vui lòng chọn khoảng thời gian khác!'
                    : 'No appointments available at this time, please choose a different time slot!'}
                </p>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
