import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { createNewSpecialty } from '../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionMarkdown: '',
      descriptionHTML: '',
      previewImgUrl: '',
    };
  }

  handleOnchangeInput = (e) => {
    let stateCopy = { ...this.state };
    stateCopy[e.target.name] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };

  handleSubmit = async () => {
    let res = await createNewSpecialty({
      name: this.state.name,
      imageBase64: this.state.imageBase64,
      descriptionMarkdown: this.state.descriptionMarkdown,
      descriptionHTML: this.state.descriptionHTML,
    });

    if (res.errCode === 0) {
      this.setState({
        name: '',
        imageBase64: '',
        descriptionMarkdown: '',
        previewImgUrl: '',
      });
      this.resetFileInput();
      toast.success('Submit new specialty successfully!');
    } else {
      toast.error('Submit new specialty failure!');
    }
  };

  resetFileInput = () => {
    const fileInput = document.querySelector('.form-control-file');
    if (fileInput) {
      fileInput.value = null; // Đặt giá trị là null để reset input file
    }
  };

  componentDidMount = async () => {};

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    return (
      <>
        <div className="manage-specialty-container container">
          <div className="ms-title">quản lý chuyên khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group name-specialty">
              <label>Tên chuyên khoa</label>
              <input
                className="form-control"
                value={this.state.name}
                name="name"
                onChange={(e) => {
                  this.handleOnchangeInput(e);
                }}
              />
            </div>
            <div className="col-6 form-group image-specialty">
              <label>Ảnh chuyên khoa</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => {
                  this.handleOnChangeImage(event);
                }}
              />
            </div>
            <div className="col-12 form-group">
              <MdEditor
                style={{ height: '500px', margin: '50px 0 0 0' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary"
                onClick={() => this.handleSubmit()}
              >
                Lưu
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
