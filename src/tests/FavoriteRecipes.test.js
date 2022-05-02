import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import setLocalStorage from './mocks/localStorageMocks';

describe('', () => {
  beforeEach(() => {
    setLocalStorage();
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
  });
  it('Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos'
    + ' em comum com a tela de receitas feitas) respeitando os atributos descritos no pro'
    + 'tótipo', () => {
    const filterByAll = screen.findByTestId('filter-by-all-btn');
    const filterByFood = screen.getByTestId('filter-by-food-btn');
    const filterByDrink = screen.getByTestId('filter-by-food-btn');
    const firstFavImage = screen.getByTestId('0-horizontal-image');
    const firstFavTopText = screen.getByTestId('0-horizontal-top-text');
    const firstFavName = screen.getByTestId('0-horizontal-name');
    const firstFavShareBtn = screen.getByTestId('0-horizontal-top-text');
    const secondFavImage = screen.getByTestId('1-horizontal-image');
    const secondFavTopText = screen.getByTestId('1-horizontal-top-text');
    const secondFavName = screen.getByTestId('1-horizontal-name');
    const secondFavShareBtn = screen.getByTestId('1-horizontal-top-text');

    expect(filterByAll).toBeInTheDocument();
    expect(filterByFood).toBeInTheDocument();
    expect(filterByDrink).toBeInTheDocument();
    expect(firstFavImage).toBeInTheDocument();
    expect(firstFavTopText).toBeInTheDocument();
    expect(firstFavName).toBeInTheDocument();
    expect(firstFavShareBtn).toBeInTheDocument();
    expect(secondFavImage).toBeInTheDocument();
    expect(secondFavTopText).toBeInTheDocument();
    expect(secondFavName).toBeInTheDocument();
    expect(secondFavShareBtn).toBeInTheDocument();
  });
});
