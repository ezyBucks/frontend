import React from 'react';
import renderer from 'react-test-renderer';
import { IndexView } from './IndexView';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

it('renders without crashing', () => {
    shallow(<IndexView />);
});

it('fully renders without crashing', () => {
    const wrapper = mount(
        <MemoryRouter>
            <IndexView />
        </MemoryRouter>
    );
    expect(wrapper.contains(<IndexView />)).toBe(true);
});

it('matches the snapshot', () => {
    const index = renderer.create(<IndexView />).toJSON();
    expect(index).toMatchSnapshot();
});
