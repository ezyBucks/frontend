import React from 'react';
import renderer from 'react-test-renderer';
import { IndexView } from './IndexView';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MainReducer from '../../../store/rootReducer';

// Create a store to use in the test
const store = createStore(MainReducer);

it('renders without crashing', () => {
    shallow(<IndexView />);
});

/**
 * This may not be possible due to the redux containers
 */
it('fully renders without crashing', () => {
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <IndexView />
            </MemoryRouter>
        </Provider>
    );
    expect(wrapper.contains(<IndexView />)).toBe(true);
});

it('matches the snapshot', () => {
    const index = renderer
        .create(
            <Provider store={store}>
                <IndexView />
            </Provider>
        )
        .toJSON();
    expect(index).toMatchSnapshot();
});
