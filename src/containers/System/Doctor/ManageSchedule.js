import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctorRedux: [],
      doctorId: '',
      currentDate: '',
      rangeTime: [],
    };
  }

  componentDidMount = () => {
    this.props.fetchAllDoctors();
    this.props.fetchAllCodeScheduleStart();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        allDoctorRedux: this.props.allDoctors.reverse(),
        doctorId: this.props.allDoctors[0].id,
      });
    }
    if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
      this.setState({
        rangeTime: this.props.doctorSchedule.reverse(),
      });
    }
  };

  handleChange = async (e) => {
    this.setState({
      doctorId: e.target.value,
    });
    // let res = await getDetailInfoDoctor(e.target.value);
    // if (res.data.Markdown) {
    //   this.setState({
    //     descriptionDoctor: res.data.Markdown.description,
    //     contentMarkdown: res.data.Markdown.contentMarkdown,
    //     contentHTML: res.data.Markdown.contentHTML,
    //     doctorId: res.data.Markdown.doctorId,
    //     action: CRUD_ACTIONS.EDIT,
    //     actionSaveData: false,
    //   });
    // } else {
    //   this.setState({
    //     descriptionDoctor: '',
    //     contentMarkdown: '',
    //     contentHTML: '',
    //     action: CRUD_ACTIONS.CREATE,
    //     actionSaveData: true,
    //   });
    // }
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    let rangeTime = this.state.rangeTime;
    console.log(rangeTime);
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="title">
            <FormattedMessage id="menu.doctor.manage-schedule-title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="choose-wrap col-12">
                <div className="choose-doctor">
                  <label>
                    <FormattedMessage id="menu.doctor.choose-doctor" />
                  </label>
                  <select
                    className="form-select"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.doctorId}
                  >
                    {this.state.allDoctorRedux &&
                      this.state.allDoctorRedux.length > 0 &&
                      this.state.allDoctorRedux.map((doctor, index) => {
                        return (
                          <option key={index} value={doctor.id}>
                            {this.props.language === languages.VI
                              ? `${doctor.lastName} ${doctor.firstName}`
                              : `${doctor.firstName} ${doctor.lastName}`}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="choose-date">
                  <label>
                    <FormattedMessage id="menu.doctor.choose-date" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    minDate={new Date()}
                    value={this.state.currentDate}
                  />
                </div>
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button className="btn btn-outline-dark" key={index}>
                        {this.props.language === languages.VI
                          ? item.value_vi
                          : item.value_en}
                      </button>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary"
                style={{ padding: '0 15px', margin: '10px 0 0 0', width: '8%' }}
              >
                <FormattedMessage id="menu.doctor.save" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    doctorSchedule: state.admin.scheduleHours,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllCodeScheduleStart: () =>
      dispatch(actions.fetchAllCodeScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
