import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { PancakeCreator } from './PancakeCreator';
import Controls from '../../components/Pancake/Controls/Controls';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<PancakeCreator />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PancakeCreator onAddInsSet={() => {}} />);
  });

  it('should render <Controls /> component when fetching ingredients', () => {
    wrapper.setProps({ addIns: { butter: 1 } });
    expect(wrapper.find(Controls)).toHaveLength(1);
  });
});
