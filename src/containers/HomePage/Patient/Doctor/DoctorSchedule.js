import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../../utils';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              className="form-select"
              onChange={(event) => {}}
              value={null}
            >
              <option key={null} value={null}>
                1
              </option>
              <option key={null} value={null}>
                2
              </option>
              <option key={null} value={null}>
                3
              </option>
              <option key={null} value={null}>
                4
              </option>
            </select>
          </div>
          <div className="all-available-time">
            <p className="schedule">
              <i className="fa fa-calendar" style={{paddingRight: '5px'}} aria-hidden="true"></i>LỊCH KHÁM
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
