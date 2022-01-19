import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import CharDetail from '../components/char-detail'
import HomePage from '../components/home'
import thunk from 'redux-thunk'
import { screen } from '@testing-library/react'
import {charPro,charPro2,mockdata} from "./mock.js"


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(mockdata)
const homeWrapper = <Provider store={store} ><MemoryRouter><HomePage /></MemoryRouter></Provider>
const charDetailWrapper = <MemoryRouter><CharDetail charProfile={charPro} /></MemoryRouter>
const charDetailWrapperWithEpisodes = <MemoryRouter><CharDetail charProfile={charPro2} /></MemoryRouter>

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('should be equal content number to listed element at homepage', () => {
    ReactDOM.render(homeWrapper, container);
    const characters = screen.getAllByTestId('characters')
    expect(characters.length).toBe(mockdata.charsReducer.allChars.length)
});

it('should display correct name of character at homepage', () => {
    ReactDOM.render(homeWrapper, container);
    const characters = screen.getAllByTestId('characters')
    expect(characters[0].textContent).toBe(mockdata.charsReducer.allChars[0].name)
});

it('should set correct id of character at homepage', () => {
    ReactDOM.render(homeWrapper, container);
    const characters = screen.getAllByTestId('characters')
    expect(characters[0].id).toBe(mockdata.charsReducer.allChars[0].id.toString())
});

it('should display correct name of character at detail', () => {
    ReactDOM.render(charDetailWrapper, container);
    const char = screen.getByTestId('charDetail')
    expect(char.childNodes[1].firstElementChild.textContent).toBe(charPro.name)
});

it('should display correct location of character at detail', () => {
    ReactDOM.render(charDetailWrapper, container);
    const char = screen.getByTestId('charDetail')
    expect(char.childNodes[1].childNodes[1].textContent).toBe("Location : "+charPro.location.name)
});

it('should display correct episode number of character at detail if episode number is smaller than 5', () => {
    ReactDOM.render(charDetailWrapper, container);
    const episodes = screen.getAllByTestId('episodes')
    expect(episodes.length).toBe(charPro.episode.length)
});

it('should display correct episode number of character at detail if episode number is bigger than 5', () => {
    ReactDOM.render(charDetailWrapperWithEpisodes, container);
    const episodes = screen.getAllByTestId('episodes')
    expect(episodes.length).toBe(5)
});