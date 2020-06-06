import React, { Component } from 'react';
import Button from '../../../components/Utilities/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axios-conf';
import Loader from '../../../components/Utilities/Loader/Loader';
import Input from '../../../components/Utilities/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    order: {
      name: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        touched: false,
        valid: false,
      },
      surname: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your surname',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        touched: false,
        valid: false,
      },
      street: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
      },
      zipCode: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your ZIP code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 6,
        },
        touched: false,
        valid: false,
      },
      country: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        touched: false,
        valid: false,
      },
      email: {
        inputType: 'input',
        inputConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        touched: false,
        valid: false,
      },
      deliveryMethod: {
        inputType: 'select',
        inputConfig: {
          options: [
            { value: 'personal', displayValue: 'personal reception' },
            { value: 'home', displayValue: 'home delivery' },
          ],
        },
        value: '',
        validation: {},
        valid: true,
      },
    },
    loading: false,
    isFormValid: false
  };

  inputHandler = (e, id) => {
    let updatedOrder = { ...this.state.order };
    let updatedElement = { ...updatedOrder[id] };
    let isFormValid = true;
    updatedElement.value = e.target.value;
    updatedElement.valid = this.checkIsValid(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedOrder[id] = updatedElement;
    for(let i in updatedOrder){
      isFormValid = updatedOrder[i].valid && isFormValid;
    }
    this.setState({ order: updatedOrder, isFormValid: isFormValid });
  };

  checkIsValid(value, rule) {
    let isValid = true;
    if (rule.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }
    return isValid;
  }

  sumUpHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const form = {};
    for (let i in this.state.order) {
      form[i] = this.state.order[i].value;
    }
    const completeOrder = {
      addIns: this.props.addIns,
      price: this.props.totalPrice,
      order: form,
    };
    axios
      .post('/orders.json', completeOrder)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let formElem = [];
    for (let i in this.state.order) {
      formElem.push({
        id: i,
        inputConfig: this.state.order[i],
      });
    }
    let userForm = (
      <form onSubmit={this.sumUpHandler}>
        {formElem.map((el) => (
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
        ))}
        <Button clicked={this.sumUpHandler} class="success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      userForm = <Loader />;
    }
    return (
      <div className={style.contact}>
        <h4>Enter your Contact Data</h4>
        {userForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addIns: state.addIns,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);