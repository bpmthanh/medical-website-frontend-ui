import React, { Component, isValidElement } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      previewImgUrl: null,
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      password: '',
      gender: 'M',
      position: 'P0',
      role: 'R1',
      avatar: '',
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      console.log('Check object url: ', objectUrl);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: file,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValid = () => {
    let arrCheck = [
      'email',
      'firstName',
      'lastName',
      'address',
      'phone',
      'password',
      'gender',
      'position',
      'role',
      'avatar',
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        if (arrCheck[i] === 'email') {
          arrCheck[i] = 'Email';
        } else if (arrCheck[i] === 'firstName') {
          arrCheck[i] = 'First name';
        } else if (arrCheck[i] === 'lastName') {
          arrCheck[i] = 'Last name';
        } else if (arrCheck[i] === 'address') {
          arrCheck[i] = 'Address';
        } else if (arrCheck[i] === 'phone') {
          arrCheck[i] = 'Phone number';
        } else if (arrCheck[i] === 'password') {
          arrCheck[i] = 'Password';
        } else if (arrCheck[i] === 'gender') {
          arrCheck[i] = 'Gender';
        } else if (arrCheck[i] === 'position') {
          arrCheck[i] = 'Position';
        } else if (arrCheck[i] === 'role') {
          arrCheck[i] = 'Role';
        } else if (arrCheck[i] === 'avatar') {
          arrCheck[i] = 'Avatar';
        }
        alert('This input is required: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSubmit = () => {
    let checkIsValid = this.checkValid();
    if (checkIsValid === false) {
      return;
    }
    //fire action redux
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phone: this.state.phone,
      gender: this.state.gender,
      role: this.state.role,
      position: this.state.position,
      avatar: this.state.avatar,
    });

    setTimeout(() => {
      this.props.fetchAllUsers();
    }, 100);

    // this.setState({
    //   email: '',
    //   password: '',
    //   firstName: '',
    //   lastName: '',
    //   address: '',
    //   phone: '',
    //   gender: '',
    //   role: '',
    //   position: '',
    //   avatar: '',
    //   previewImgUrl: '',
    // });
  };

  render() {
    let language = this.props.language;
    let genderRedux = this.props.genderRedux;
    let positionRedux = this.props.positionRedux;
    let roleRedux = this.props.roleRedux;
    let {
      email,
      firstName,
      lastName,
      address,
      phone,
      password,
      gender,
      position,
      role,
      avatar,
    } = this.state;
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
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder=""
                      value={email}
                      onChange={(event) => this.onChangeInput(event, 'email')}
                    />
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-FirstName"
                      placeholder=""
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, 'firstName')
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-LastName"
                      placeholder=""
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, 'lastName')
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-Address"
                      placeholder=""
                      value={address}
                      onChange={(event) => this.onChangeInput(event, 'address')}
                    />
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.phone" />
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder=""
                      value={phone}
                      onChange={(event) => this.onChangeInput(event, 'phone')}
                    />
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      value={password}
                      onChange={(event) =>
                        this.onChangeInput(event, 'password')
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.gender.title" />
                    </label>
                    <select
                      id="inputGenderState"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, 'gender')}
                    >
                      {genderRedux &&
                        genderRedux.length > 0 &&
                        genderRedux.map((gender, index) => {
                          return (
                            <option
                              key={index}
                              value={gender.key}
                              defaultValue={index === 0}
                            >
                              {language === languages.VI
                                ? gender.value_vi
                                : gender.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.position.title" />
                    </label>
                    <select
                      id="inputPositionState"
                      className="form-control"
                      onChange={(event) =>
                        this.onChangeInput(event, 'position')
                      }
                    >
                      {positionRedux &&
                        positionRedux.length > 0 &&
                        positionRedux.map((position, index) => {
                          return (
                            <option
                              key={index}
                              value={position.key}
                              selected={index === 0}
                            >
                              {language === languages.VI
                                ? position.value_vi
                                : position.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <FormattedMessage id="manage-user.role-id.title" />
                    </label>
                    <select
                      id="inputRoleState"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, 'role')}
                    >
                      {roleRedux &&
                        roleRedux.length > 0 &&
                        roleRedux.map((role, index) => {
                          return (
                            <option
                              key={index}
                              value={role.key}
                              selected={index === 0}
                            >
                              {language === languages.VI
                                ? role.value_vi
                                : role.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label>
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
                <div
                  className="btn btn-primary"
                  style={{ padding: '0 15px', margin: '10px 0 0 0' }}
                  onClick={() => this.handleSubmit()}
                >
                  <FormattedMessage id="manage-user.save" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <TableManageUser />
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
    checkNewUser: state.admin.checkNewUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUsers: () => dispatch(actions.fetchAllUSersStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
