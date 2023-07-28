import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { savePatientBooking } from '../../../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import ProfileDoctor from '../ProfileDoctor';
import { valuesIn } from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { toast } from 'react-toastify';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.isOpen,
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      timeType: '',
      selectedGender: 'M',
      doctorId: this.props.doctorId,
      birthday: new Date(),
      genders: [],
    };
  }

  checkValid = () => {
    let arrCheck = [
      'birthday',
      'selectedGender',
      'fullName',
      'phoneNumber',
      'email',
      'address',
      'reason',
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (
        !this.state[arrCheck[i]] ||
        this.state[arrCheck[0]].getDay() === new Date().getDay()
      ) {
        isValid = false;
        if (arrCheck[i] === 'email') {
          arrCheck[i] = 'Email';
        } else if (arrCheck[i] === 'fullName') {
          arrCheck[i] = 'Full name';
        } else if (arrCheck[i] === 'birthday') {
          arrCheck[i] = 'day of birth';
          alert('Please choose ' + arrCheck[i]);
          break;
        } else if (arrCheck[i] === 'fullName') {
          arrCheck[i] = 'Full name';
        } else if (arrCheck[i] === 'phoneNumber') {
          arrCheck[i] = 'Phone number';
        } else if (arrCheck[i] === 'address') {
          arrCheck[i] = 'Address';
        } else if (arrCheck[i] === 'reason') {
          arrCheck[i] = 'Reason';
        } else if (arrCheck[i] === 'selectedGender') {
          arrCheck[i] = 'Gender';
        }
        alert('This input is required: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.sendDataToParent(this.state.modal);
  };

  sendDataToParent = (data) => {
    this.props.sendDataToParent(data);
  };

  handleConfirmBooking = async () => {
    let checkIsValid = this.checkValid();
    if (checkIsValid === false) {
      return;
    }
    let res = await savePatientBooking({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      selectedGender: this.state.selectedGender,
      doctorId: this.props.doctorId,
      birthday: this.state.birthday,
      date: this.props.dataSchedule.date,
      timeType: this.props.dataSchedule.timeType,
    });
    if (res.errCode === 0) {
      this.toggle();
      toast.success('Submit booking successfully!');
      this.setState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        selectedGender: 'M',
        doctorId: this.props.doctorId,
        birthday: new Date(),
      });
    } else {
      toast.error('Submit booking failure!');
    }
  };

  closeBtn = (
    <button className="close" onClick={this.toggle} type="button">
      &times;
    </button>
  );

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ modal: this.props.isOpen });
    }
    if (this.props.genderRedux !== prevProps.genderRedux) {
      this.setState({ genders: this.props.genderRedux });
    }
  };

  componentDidMount() {
    this.props.getGenderStart();
  }

  handleOnchangeInput(event, inputName) {
    this.setState({
      [inputName]: event.target.value,
    });
  }

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className={`booking-modal-container`}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={this.toggle} close={this.closeBtn}>
          <FormattedMessage id={'patient.modal-schedule-doctor.modal-title'} />
        </ModalHeader>
        <ModalBody>
          <div className="doctor-info">
            <ProfileDoctor
              doctorId={this.props.doctorId}
              dataSchedule={this.props.dataSchedule}
              isShowDescriptionDoctor={true}
            />
          </div>
          <div className="doctor-price">
            <div className="row">
              <div className="col-6 form-group birthday">
                <label>
                  <FormattedMessage
                    id={'patient.modal-schedule-doctor.birthday'}
                  />
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  // minDate={
                  //   new Date(new Date().setDate(new Date().getDate() - 1))
                  // }
                  value={this.state.birthday}
                />
              </div>
              <div className="col-6 form-group gender">
                <FormattedMessage id={'patient.modal-schedule-doctor.gender'} />
                <select
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, 'selectedGender')
                  }
                  value={this.state.selectedGender}
                >
                  {this.state.genders &&
                    this.state.genders.length > 0 &&
                    this.state.genders.map((gender, index) => {
                      return (
                        <option key={index} value={gender.keyMap}>
                          {this.props.language === languages.VI
                            ? gender.value_vi
                            : gender.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-6 form-group name">
                <label>
                  <FormattedMessage id={'patient.modal-schedule-doctor.name'} />
                </label>
                <input
                  className="form-control"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, 'fullName')
                  }
                />
              </div>
              <div className="col-6 form-group phone-number">
                <label>
                  <FormattedMessage
                    id={'patient.modal-schedule-doctor.phone'}
                  />
                </label>
                <input
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, 'phoneNumber')
                  }
                />
              </div>
              <div className="col-6 form-group email">
                <label>
                  <FormattedMessage id={'patient.modal-schedule-doctor.mail'} />
                </label>
                <input
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeInput(event, 'email')}
                />
              </div>
              <div className="col-6 form-group address">
                <label>
                  <FormattedMessage
                    id={'patient.modal-schedule-doctor.address'}
                  />
                </label>
                <input
                  name="address"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, 'address')
                  }
                />
              </div>
              <div className="col-12 form-group reason">
                <label>
                  <FormattedMessage
                    id={'patient.modal-schedule-doctor.reason'}
                  />
                </label>
                <input
                  name="reason"
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, 'reason')
                  }
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleConfirmBooking}>
            <FormattedMessage id={'patient.modal-schedule-doctor.save'} />
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            <FormattedMessage id={'patient.modal-schedule-doctor.cancel'} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
