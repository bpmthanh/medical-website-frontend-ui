import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import {getScheduleDoctorByDate} from '../../../../services/userService';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }

  componentDidMount = async () => {
    this.setDaysArray();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let object = {};
        if (this.props.language === languages.VI) {
          // Sử dụng locale tiếng Việt
          moment.locale('vi');
          object.label = moment(new Date())
            .add(i, 'days')
            .format('dddd - DD/MM');
        } else {
          // Sử dụng locale tiếng Anh
          moment.locale('en');
          object.label = moment(new Date())
            .add(i, 'days')
            .format('dddd - DD/MM');
        }
        object.value = moment(new Date())
          .add(i, 'days')
          .startOf('day')
          .valueOf();
        arrDate.push(object);
      }
      this.setState({ allDays: arrDate });
    }
  }

  setDaysArray = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === languages.VI) {
        // Sử dụng locale tiếng Việt
        moment.locale('vi');
        object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
      } else {
        // Sử dụng locale tiếng Anh
        moment.locale('en');
        object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      arrDate.push(object);
    }
    this.setState({ allDays: arrDate });
  };

  render() {
    let { allDays } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select className="form-select" onChange={null} value={null}>
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
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
              <button className="btn btn-success">09:00</button>
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
