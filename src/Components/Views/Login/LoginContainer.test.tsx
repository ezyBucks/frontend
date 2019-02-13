import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { LoginContainer } from './LoginContainer';
import { ControlledInput } from '../../Common/ControlledInput';

it('renders without crashing', () => {
    shallow(
        <LoginContainer
            authenticated={false}
            setAuthenticated={() => ({ authenticated: true, type: 'test' })}
        />
    );
});

it('fully renders without crashing', () => {
    // Mock the function here for consistency
    const test = jest.fn();
    const wrapper = mount(
        <MemoryRouter>
            <LoginContainer authenticated={false} setAuthenticated={test} />
        </MemoryRouter>
    );
    expect(
        wrapper.contains(
            <LoginContainer authenticated={false} setAuthenticated={test} />
        )
    ).toBe(true);
});

it('matches the snapshot', () => {
    const index = renderer
        .create(
            <MemoryRouter>
                <LoginContainer
                    authenticated={false}
                    setAuthenticated={() => ({
                        authenticated: true,
                        type: 'test'
                    })}
                />
            </MemoryRouter>
        )
        .toJSON();
    expect(index).toMatchSnapshot();
});

// Need to test the setState on the input change
xit('sets the state correctly when the username field changes', () => {
    const test = jest.fn();
    const wrapper = mount(
        <MemoryRouter>
            <LoginContainer authenticated={false} setAuthenticated={test} />
        </MemoryRouter>
    );
    const input = wrapper.findWhere(node => (node.name() === 'ControlledInput' && node.props().id === 'email'));
    console.log(input.debug());
    input.simulate('change', { target: { value: 'test' } });
    expect(wrapper.state('email')).toBe('test');
});
