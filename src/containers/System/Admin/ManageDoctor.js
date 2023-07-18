import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      descriptionDoctor: '',
      selectedDoctor: '',
    };
  }

  componentDidMount = () => {};

  componentDidUpdate = (prevProps, prevState, snapshot) => {};

  handleEditorChange = ({ html, text }) => {
    // console.log('handleEditorChange', html, text);
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSave = () => {
    // console.log("Check state: ", this.state)
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      descriptionDoctor: event.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({ selectedDoctor: e.target.value });
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
              class="form-select"
              onChange={(event) => this.handleChange(event)}
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
