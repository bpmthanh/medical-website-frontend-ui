import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctorRedux: '',
      contentMarkdown: '',
      contentHTML: '',
      descriptionDoctor: '',
      doctorId: '',
      actionSaveData: true,
      action: CRUD_ACTIONS.CREATE,
    };
  }

  componentDidMount = () => {
    this.props.fetchAllDoctors();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        allDoctorRedux: this.props.allDoctors.reverse(),
        doctorId: this.props.allDoctors[0].id,
      });
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
    });

    this.setState({
      actionSaveData: true,
      // descriptionDoctor: '',
      // contentMarkdown: '',
      // doctorId: this.state.allDoctorRedux[0].id,
      action: CRUD_ACTIONS.CREATE,
    });
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      descriptionDoctor: event.target.value,
    });
  };

  handleChange = async (e) => {
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

  render() {
    return (
      <div className="container manage-doctor-container">
        <p className="manage-doctor-title">
          <FormattedMessage id="manage-doctor.title" />
        </p>
        <div className="more-info">
          <div className="content-left form-group">
            <label className="choose-doctor-title">
              <FormattedMessage id="manage-doctor.doctor-choose" />
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
          <div className="content-right form-group">
            <label className="choose-doctor-title">
              <FormattedMessage id="manage-doctor.doctor-info" />
            </label>
            <textarea
              className="doctor-info"
              value={this.state.descriptionDoctor}
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
