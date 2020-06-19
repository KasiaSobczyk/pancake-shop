import React, { Component } from 'react';
import Button from '../../components/Utilities/Button/Button';
import Input from '../../components/Utilities/Input/Input';
import styles from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Loader from '../../components/Utilities/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { updateObjHelper, checkIsValid } from '../../shared/helper';

class Auth extends Component {
  state = {
    controls: {
      email: {
        inputType: 'input',
        inputConfig: {
          type: 'email',
          placeholder: 'Type your email',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
        },
        touched: false,
        valid: false,
      },
      password: {
        inputType: 'input',
        inputConfig: {
          type: 'password',
          placeholder: 'Type password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
        valid: false,
      },
    },
    isRegistered: true,
  };

  componentDidMount() {
    if (this.props.redirectPath !== '/' && !this.props.inProgress) {
      this.props.onSetPath();
    }
  }

  inputHandler = (event, name) => {
    const updatedConrols = updateObjHelper(this.state.controls, {
      [name]: updateObjHelper(this.state.controls[name], {
        value: event.target.value,
        valid: checkIsValid(event.target.value, this.state.controls[name].validation),
        touched: true,
      }),
    });
    this.setState({ controls: updatedConrols });
  };

  switchMode = (e) => {
    this.setState((prev) => {
      return {
        isRegistered: !prev.isRegistered,
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onUserAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isRegistered
    );
  };

  render() {
    let formElem = [];
    let errorMsg = null;
    let redirect = null;
    for (let i in this.state.controls) {
      formElem.push({
        id: i,
        inputConfig: this.state.controls[i],
      });
    }
    let formControl = formElem.map((el) => (
      <Input
        inputel={el.inputConfig.inputType}
        inputConfig={el.inputConfig.inputConfig}
        touched={el.inputConfig.touched}
        changed={(event) => this.inputHandler(event, el.id)}
        isValidation={el.inputConfig.validation}
        invalid={!el.inputConfig.valid}
        value={el.inputConfig.value}
        key={el.id}
      />
    ));

    if (this.props.isAuth) {
      redirect = <Redirect to={this.props.redirectPath} />;
    }

    let btn = (
      <Button clicked={this.submitHandler} class="success">
        SUBMIT
      </Button>
    );

    if (this.props.loading) {
      formControl = <Loader />;
    }

    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={styles.auth}>
        {redirect}
        <Button clicked={this.switchMode} class="success">
          {this.state.isRegistered ? 'register' : 'login'}
        </Button>
        <form onSubmit={this.submitHandler}>
          {formControl}
          {btn}
        </form>
        {errorMsg}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserAuth: (email, password, isAuth) => dispatch(actions.auth(email, password, isAuth)),
    onSetPath: () => dispatch(actions.setRedirect('/')),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    inProgress: state.pancake.inProgress,
    loading: state.auth.loading,
    error: state.auth.error,
    redirectPath: state.auth.redirectPath,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
