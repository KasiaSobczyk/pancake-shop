import React, { Component } from 'react';
import Button from '../../../components/Utilities/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axios-conf';
import Loader from '../../../components/Utilities/Loader/Loader';

class ContactData extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
    loading: false,
  };

  sumUpHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const completeOrder = {
      addIns: this.props.addIns,
      price: this.props.totalPrice,
      orderer: {
        name: 'John Doe',
        address: {
          street: '123 Main St',
          zipCode: '54341',
          country: 'USA',
        },
        email: 'john32423@gmail.com',
      },
      deliveryMethod: 'personal pickup',
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
    let userForm = (
      <form>
        <input type="text" className={style.input} name="name" placeholder="Name" />
        <input type="text" className={style.input} name="surname" placeholder="Surname" />
        <input type="email" className={style.input} name="email" placeholder="Email" />
        <input type="text" className={style.input} name="street" placeholder="Street" />
        <input type="text" className={style.input} name="city" placeholder="City" />
        <input type="text" className={style.input} name="zipCode" placeholder="ZIP code" />
        <Button clicked={this.sumUpHandler} class="success">
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

export default ContactData;
