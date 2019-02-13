import React from 'react';
import renderer from 'react-test-renderer';
import { LoginView } from './LoginView';
import { MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme';

const DummyLogin = (
    <LoginView onChange={() => undefined} submit={() => undefined} />
);

it('renders without crashing', () => {
    shallow(<MemoryRouter>{DummyLogin}</MemoryRouter>);
});

it('fully renders without crashing', () => {
    const wrapper = mount(<MemoryRouter>{DummyLogin}</MemoryRouter>);
    expect(wrapper.contains(DummyLogin)).toBe(true);
});

it('matches the snapshot', () => {
    const login = renderer
        .create(<MemoryRouter>{DummyLogin}</MemoryRouter>)
        .toJSON();
    expect(login).toMatchSnapshot();
});
