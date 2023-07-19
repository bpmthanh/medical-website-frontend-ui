import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';

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
    console.log('Check state: ', this.state);
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.descriptionDoctor,
      doctorId: this.state.doctorId,
    });

    this.setState({
      descriptionDoctor: '',
    });
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      descriptionDoctor: event.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({ doctorId: e.target.value });
  };

  render() {
    // console.log("Check all doctor: ",this.state.allDoctorRedux);
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
          />
        </div>
        <div
          className="btn btn-primary"
          style={{ padding: '0 15px', margin: '10px 0 0 0' }}
          onClick={() => this.handleSave()}
        >
          <FormattedMessage id="manage-doctor.save" />
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
