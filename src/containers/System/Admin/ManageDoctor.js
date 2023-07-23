import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import {
  getDetailInfoDoctor,
  getAllCodeService,
} from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctorRedux: [],
      contentMarkdown: '',
      contentHTML: '',
      descriptionDoctor: '',
      doctorId: '',
      actionSaveData: true,
      action: CRUD_ACTIONS.CREATE,
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
    };
  }

  componentDidMount = async () => {
    this.props.fetchAllDoctors();
    this.fetchMoreInforDoctor();
  };

  fetchMoreInforDoctor = async () => {
    let resPriceFetch = await getAllCodeService('price');
    let resPaymentFetch = await getAllCodeService('payment');
    let resProvinceFetch = await getAllCodeService('province');
    this.setState({
      listPrice: resPriceFetch.data,
      listPayment: resPaymentFetch.data,
      listProvince: resProvinceFetch.data,
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        allDoctorRedux: this.props.allDoctors.reverse(),
        doctorId: this.props.allDoctors[0].id,
      });
    }
    if (
      prevState.resPriceFetch !== this.state.resPriceFetch ||
      prevState.resPaymentFetch !== this.state.resPaymentFetch ||
      prevState.resProvinceFetch !== this.state.resProvinceFetch
    ) {
      this.fetchMoreInforDoctor();
    }
  };

  handleEditorChange = ({ html, text }) => {
    // console.log('handleEditorChange', html, text);
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSave = () => {
    // console.log('Check state: ', this.state);
    let { actionSaveData } = this.state;
    this.props.saveDetailDoctor({
      doctorId: this.state.doctorId,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.descriptionDoctor,
      action: actionSaveData === true ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,
      
      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvince: this.state.selectedProvince,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });

    this.setState({
      actionSaveData: true,
      descriptionDoctor: '',
      contentMarkdown: '',
      doctorId: this.state.allDoctorRedux[0].id,
      action: CRUD_ACTIONS.CREATE,

      // selectedPrice: ,
      // selectedPayment: ,
      // selectedProvince: ,
      // nameClinic: '',
      // addressClinic: '',
      // note: '',
    });
  };

  handleOnchangeDesc = (event) => {
    let stateCopy = { ...this.state };
    stateCopy[event.target.name] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDoctor = async (e) => {
    this.setState({
      doctorId: e.target.value,
    });
    let res = await getDetailInfoDoctor(e.target.value);
    if (res.data.Markdown) {
      this.setState({
        descriptionDoctor: res.data.Markdown.description,
        contentMarkdown: res.data.Markdown.contentMarkdown,
        contentHTML: res.data.Markdown.contentHTML,
        doctorId: res.data.Markdown.doctorId,
        action: CRUD_ACTIONS.EDIT,
        actionSaveData: false,
      });
    } else {
      this.setState({
        descriptionDoctor: '',
        contentMarkdown: '',
        contentHTML: '',
        action: CRUD_ACTIONS.CREATE,
        actionSaveData: true,
      });
    }
  };

  handleOnchangeSelectedInfor = (event) => {
    const selectedObject = JSON.parse(
      event.target.selectedOptions[0].getAttribute('data-item')
    );
    let stateCopy = { ...this.state };
    stateCopy[event.target.name] = selectedObject.keyMap;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeText = (event) => {
    let stateCopy = { ...this.state };
    stateCopy[event.target.name] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    console.log('check state:', this.state);
    return (
      <div className="container manage-doctor-container">
        <p className="manage-doctor-title">
          <FormattedMessage id="manage-doctor.title" />
        </p>
        <div className="more-info">
          <div className="content-left form-group">
            <label className="choose-doctor-title col-12">
              <FormattedMessage id="manage-doctor.doctor-choose" />
            </label>
            <select
              className="form-select"
              onChange={(event) => this.handleOnchangeDoctor(event)}
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

            <div className="col-12 choose-price">
              <label>
                <FormattedMessage id="patient.detail-doctor.choose-price" />
              </label>
              <select
                className="form-select"
                onChange={(event) => this.handleOnchangeSelectedInfor(event)}
                value={null}
                name="selectedPrice"
              >
                {this.state.listPrice &&
                  this.state.listPrice.length > 0 &&
                  this.state.listPrice.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.keyMap}
                        data-item={JSON.stringify(item)}
                      >
                        {this.props.language === languages.VI
                          ? `${item.value_vi} VND`
                          : `${item.value_en} USD`}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 choose-payment-method">
              <label>
                <FormattedMessage id="patient.detail-doctor.payment-method" />
              </label>
              <select
                className="form-select"
                onChange={(event) => this.handleOnchangeSelectedInfor(event)}
                value={null}
                name="selectedPayment"
              >
                {this.state.listPayment &&
                  this.state.listPayment.length > 0 &&
                  this.state.listPayment.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.keyMap}
                        data-item={JSON.stringify(item)}
                      >
                        {this.props.language === languages.VI
                          ? item.value_vi
                          : item.value_en}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 choose-province">
              <label>
                <FormattedMessage id="patient.detail-doctor.province" />
              </label>
              <select
                className="form-select"
                onChange={(event) => this.handleOnchangeSelectedInfor(event)}
                value={null}
                name="selectedProvince"
              >
                {this.state.listProvince &&
                  this.state.listProvince.length > 0 &&
                  this.state.listProvince.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.keyMap}
                        data-item={JSON.stringify(item)}
                      >
                        {this.props.language === languages.VI
                          ? item.value_vi
                          : item.value_en}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 clinic-name">
              <label>
                <FormattedMessage id="patient.detail-doctor.clinic-name" />
              </label>
              <input
                className="form-control"
                name="nameClinic"
                onChange={(e) => this.handleOnchangeText(e)}
              />
            </div>
            <div className="col-12 clinic-address">
              <label>
                <FormattedMessage id="patient.detail-doctor.clinic-address" />
              </label>
              <input
                className="form-control"
                name="addressClinic"
                onChange={(e) => this.handleOnchangeText(e)}
              />
            </div>
            <div className="col-12 note">
              <label>
                <FormattedMessage id="patient.detail-doctor.note" />
              </label>
              <input
                className="form-control"
                name="note"
                onChange={(e) => this.handleOnchangeText(e)}
              />
            </div>
          </div>
          <div className="content-right form-group">
            <label className="choose-doctor-title">
              <FormattedMessage id="manage-doctor.doctor-info" />
            </label>
            <textarea
              className="doctor-info"
              value={this.state.descriptionDoctor}
              name="descriptionDoctor"
              onChange={(event) => this.handleOnchangeDesc(event)}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '500px', margin: '50px 0 0 0' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <div
          className={
            this.state.actionSaveData === true
              ? 'btn btn-primary'
              : 'btn btn-warning'
          }
          style={{ padding: '0 15px', margin: '10px 0 0 0' }}
          onClick={() => this.handleSave()}
        >
          {this.state.actionSaveData === true ? (
            <FormattedMessage id="manage-doctor.save" />
          ) : (
            <FormattedMessage id="manage-doctor.edit" />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorRedux(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
