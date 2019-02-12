import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
    shallow(<App />);
});

it('fully renders without crashing', () => {
    const wrapper = mount(<App />);
    expect(wrapper.contains(<App />)).toBe(true);
});

it('matches the snapshot', () => {
    const app = renderer.create(<App />).toJSON();
    expect(app).toMatchSnapshot();
});
