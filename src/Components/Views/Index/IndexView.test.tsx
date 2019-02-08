import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { IndexView } from './IndexView';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<IndexView />, div);
});

// Snapshot testing
it('matches the snapshot', () => {
    const index = renderer
    .create(<IndexView />)
    .toJSON();
    expect(index).toMatchSnapshot();
});

// Also check if we can use enzyme for these
