import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from './Header';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

it('renders without crashing', () => {
    shallow(<Header />);
});

it('fully renders without crashing', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
    expect(wrapper.contains(<Header />)).toBe(true);
});

it('matches the snapshot', () => {
    const header = renderer
        .create(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        .toJSON();
    expect(header).toMatchSnapshot();
});
