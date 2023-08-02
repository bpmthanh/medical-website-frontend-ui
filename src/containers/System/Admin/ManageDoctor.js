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
  saveDetailDoctor,
  getAllSpecialty,
} from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      allDoctorRedux: [],
      contentMarkdown: '',
      contentHTML: '',
      descriptionDoctor: '',
      doctorId: '',
      selectedSpecialty: '',
      listSpecialty: [],
      selectedClinic: '',
      listClinic: [],
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
      clinicId: '',
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
    let resSpecialtyFetch = await getAllSpecialty();
    // let resClinicFetch = await getAllCodeService();
    this.setState({
      listPrice: resPriceFetch.data,
      listPayment: resPaymentFetch.data,
      listProvince: resProvinceFetch.data,
      listSpecialty: resSpecialtyFetch.data,
    });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        allDoctorRedux: this.props.allDoctors.reverse(),
        // doctorId: this.props.allDoctors[0].id,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSave = async () => {
    let { actionSaveData } = this.state;
    let res = await saveDetailDoctor({
      doctorId: this.state.doctorId,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.descriptionDoctor,

      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvince: this.state.selectedProvince,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic || '',
      specialtyId: this.state.selectedSpecialty || this.state.specialtyId,

      action: actionSaveData === true ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,
    });
    if (res.errCode === 1) {
      toast.error('Lack of parameter!');
      return;
    } else {
      if (this.state.actionSaveData === true) {
        toast.success('Create doctor information successfully!');
      } else {
        toast.success('Edit doctor information successfully!');
      }
      this.setState({
        actionSaveData: true,
        descriptionDoctor: '',
        contentMarkdown: '',
        doctorId: '',

        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedSpecialty: '',
        specialtyId: '',
        nameClinic: '',
        addressClinic: '',
        note: '',

        action: CRUD_ACTIONS.CREATE,
      });
    }
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
        detailDoctor: res.data,
        descriptionDoctor: res.data.Markdown.description,
        contentMarkdown: res.data.Markdown.contentMarkdown,
        contentHTML: res.data.Markdown.contentHTML,
        doctorId: res.data.Markdown.doctorId,

        selectedPrice:
          res.data.Doctor_Infor && res.data.Doctor_Infor.priceTypeData.keyMap,
        selectedPayment:
          res.data.Doctor_Infor && res.data.Doctor_Infor.paymentTypeData.keyMap,
        selectedProvince:
          res.data.Doctor_Infor &&
          res.data.Doctor_Infor.provinceTypeData.keyMap,
        nameClinic: res.data.Doctor_Infor && res.data.Doctor_Infor.nameClinic,
        addressClinic:
          res.data.Doctor_Infor && res.data.Doctor_Infor.addressClinic,
        note: res.data.Doctor_Infor && res.data.Doctor_Infor.note,

        specialtyId: res.data.Doctor_Infor && res.data.Doctor_Infor.specialtyId,
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
    stateCopy[event.target.name] = selectedObject.keyMap || selectedObject.id;
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
    console.log(this.state.detailDoctor);
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
              <option value="" disabled selected>
                {this.props.language === languages.VI
                  ? 'Chọn bác sĩ'
                  : 'Choose doctor'}
              </option>
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
                value={this.state.selectedPrice}
                name="selectedPrice"
              >
                <option value="" disabled selected>
                  {this.props.language === languages.VI
                    ? 'Chọn giá khám bệnh'
                    : 'Choose price'}
                </option>
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
                value={this.state.selectedPayment}
                name="selectedPayment"
              >
                <option value="" disabled selected>
                  {this.props.language === languages.VI
                    ? 'Chọn phương thức thanh toán'
                    : 'Choose payment method'}
                </option>
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
                value={this.state.selectedProvince}
                name="selectedProvince"
              >
                <option value="" disabled selected>
                  {this.props.language === languages.VI
                    ? 'Chọn tỉnh thành'
                    : 'Choose province'}
                </option>
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
            <div className="col-12 choose-specialty">
              <label>Chọn chuyên khoa</label>
              <select
                className="form-select"
                onChange={(event) => this.handleOnchangeSelectedInfor(event)}
                name="selectedSpecialty"
                value={this.state.selectedSpecialty || this.state.specialtyId}
              >
                <option value="" disabled selected>
                  {this.props.language === languages.VI
                    ? 'Chọn chuyên khoa'
                    : 'Choose specialty'}
                </option>
                {this.state.listSpecialty &&
                  this.state.listSpecialty.length > 0 &&
                  this.state.listSpecialty.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.id}
                        data-item={JSON.stringify(item)}
                      >
                        {this.props.language === languages.VI
                          ? item.name
                          : item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 choose-clinic">
              <label>Chọn phòng khám</label>
              <select
                className="form-select"
                onChange={(event) => this.handleOnchangeSelectedInfor(event)}
                value={this.state.selectedClinic}
                name="selectedClinic"
              >
                <option value="" disabled selected>
                  {this.props.language === languages.VI
                    ? 'Chọn phòng khám'
                    : 'Choose clinic'}
                </option>
                {this.state.listClinic &&
                  this.state.listClinic.length > 0 &&
                  this.state.listClinic.map((item, index) => {
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
                value={this.state.nameClinic}
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
                value={this.state.addressClinic}
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
                value={this.state.note}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
