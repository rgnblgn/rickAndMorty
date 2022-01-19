import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import CharDetail from '../components/char-detail'
import HomePage from '../components/home'
import thunk from 'redux-thunk'
import {charPro,mockdata} from "./mock.js"

const middlewares = [thunk]

  const mockStore = configureMockStore(middlewares)
  const store = mockStore(mockdata)
  const wrapper = <Provider store={store} ><MemoryRouter><HomePage /></MemoryRouter></Provider>

  it('should render char-detail correctly', () => {
    const tree = renderer
    .create(<MemoryRouter><CharDetail charProfile={charPro} /></MemoryRouter>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render homepage correctly', () => {
    const tree = renderer
    .create(wrapper)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

