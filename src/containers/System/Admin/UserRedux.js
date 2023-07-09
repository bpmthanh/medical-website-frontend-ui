import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllCodeService } from '../../../services/userService';
import { languages } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';

class UserRedux extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      previewImgUrl: null,
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   const fetchData = async () => {
    //     const res = await getAllCodeService('gender');
    //     if (res && res.errCode === 0) {
    //       this.setState({
    //         genderArr: res.data,
    //       });
    //     }
    //   };
    //   fetchData();
    // } catch (error) {
    //   console.error('Error occurred while fetching gender data:', error);
    // Thực hiện các xử lý khác tùy thuộc vào yêu cầu của bạn
    // }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    console.log('Check event: ', data);
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      console.log('Check object url: ', objectUrl);
      this.setState({
        previewImgUrl: objectUrl,
      });
    }
  };

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    let genderRedux = this.props.genderRedux;
    let positionRedux = this.props.positionRedux;
    let roleRedux = this.props.roleRedux;
    // console.log('Check gender redux: ', genderRedux);
    // console.log('Check position redux: ', positionRedux);
    // console.log('Check role redux: ', roleRedux);
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.title" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.phone" />
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.gender.title" />
                    </label>
                    <select id="inputGenderState" className="form-control">
                      {genderRedux &&
                        genderRedux.length > 0 &&
                        genderRedux.map((gender, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? gender.value_vi
                                : gender.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="">
                      <FormattedMessage id="manage-user.position.title" />
                    </label>
                    <select id="inputPositionState" className="form-control">
                      {positionRedux &&
                        positionRedux.length > 0 &&
                        positionRedux.map((position, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? position.value_vi
                                : position.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="">
                      <FormattedMessage id="manage-user.role-id.title" />
                    </label>
                    <select id="inputRoleState" className="form-control">
                      {roleRedux &&
                        roleRedux.length > 0 &&
                        roleRedux.map((role, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? role.value_vi
                                : role.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div className="wrap-img">
                      <input
                        type="file"
                        id="previewImg"
                        hidden
                        onChange={(event) => {
                          this.handleOnChangeImage(event);
                        }}
                      />
                      <div className="img-upload">
                        <label className="label-upload" htmlFor="previewImg">
                          Tải ảnh <i className="fa-solid fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0 15px', margin: '10px 0 0 0' }}
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
