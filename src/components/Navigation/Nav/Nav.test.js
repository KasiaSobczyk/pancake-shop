import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Nav from './Nav';
import Item from './NavItem/NavItem';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it('should render 2 <Nav /> elements if not authenticated', () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it('should render 3 <Nav /> elements if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(Item)).toHaveLength(3);
  });

  it('should render 3 <Nav /> elements if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toEqual(true);
  });
});
