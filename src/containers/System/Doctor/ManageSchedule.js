import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import {
  languages,
  CRUD_ACTIONS,
  CommonUtils,
  dateFormat,
} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctorRedux: [],
      doctorId: '',
      currentDate: new Date(),
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
      let data = this.props.doctorSchedule;
      if (data && data.length > 0) {
        data.map((item, index) => {
          item.isSelected = false;
        });
      }
      this.setState({
        rangeTime: this.props.doctorSchedule,
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

  handleBtnTime = (time) => {
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item) => {
        if (time.id === item.id) {
          item.isSelected = !item.isSelected;
        }
      });
      this.setState({ rangeTime });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, doctorId, currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let selectedTime;
    let result = [];

    if (!moment(currentDate).isValid()) {
      toast.error('Lack of date!');
      return;
    }
    if (!doctorId) {
      toast.error('Lack of doctor!');
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime.length === 0) {
        toast.error('Lack of time!');
        return;
      }
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = doctorId;
          object.date = formattedDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: doctorId,
      date: formattedDate,
    });
    toast.success('Save successfully!');
  };

  render() {
    let rangeTime = this.state.rangeTime;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
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
                    minDate={yesterday}
                    value={this.state.currentDate}
                  />
                </div>
              </div>
              <div className="col-12 pick-hour-container">
                <p className="choose-time">
                  <FormattedMessage id="menu.doctor.choose-hour" />
                </p>
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? 'btn btn-success'
                            : 'btn btn-outline-dark'
                        }
                        key={index}
                        onClick={() => {
                          this.handleBtnTime(item);
                        }}
                      >
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
                onClick={this.handleSaveSchedule}
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
