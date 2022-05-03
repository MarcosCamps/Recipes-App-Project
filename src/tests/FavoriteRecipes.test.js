import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import setLocalStorage from './mocks/localStorageMocks';

const FILTER_BY_ALL = 'filter-by-all-btn';
const FILTER_BY_FOOD_BTN = 'filter-by-food-btn';
const HORIZONTAL_SHARE_BTN_0 = '0-horizontal-share-btn';
const HORIZONTAL_TOP_TEXT_1 = '1-horizontal-top-text';
const favoriteRecipesPAth = '/favorite-recipes';

describe('Tela de Receitas Favoritas', () => {
  beforeEach(() => {
    setLocalStorage();
    const { history } = renderWithRouter(<App />);
    history.push(favoriteRecipesPAth);
  });
  afterEach(() => {
    window.localStorage.clear();
  });
  describe('Desenvolva a tela de maneira que, caso a receita do card seja uma comida, el'
    + 'a deve possuir: a foto da receita, o nome, a categoria, a nacionalidade, um botão '
    + ' de compartilhar e um de "desfavoritar', () => {
    it('Implemente os elementos da tela de receitas favoritas (cumulativo com os atribut'
      + 'os em comum com a tela de receitas feitas) respeitando os atributos descritos no'
      + 'protótipo', async () => {
      const filterByAll = screen.getByTestId(FILTER_BY_ALL);
      const filterByFood = screen.getByTestId(FILTER_BY_FOOD_BTN);
      const filterByDrink = screen.getByTestId('filter-by-drink-btn');
      const firstFavImage = await screen.findByTestId('0-horizontal-image');
      const firstFavTopText = await screen.findByTestId('0-horizontal-top-text');
      const firstFavName = await screen.findByTestId('0-horizontal-name');
      const firstFavShareBtn = await screen.findByTestId(HORIZONTAL_SHARE_BTN_0);
      const secondFavImage = await screen.findByTestId('1-horizontal-image');
      const secondFavTopText = await screen.findByTestId(HORIZONTAL_TOP_TEXT_1);
      const secondFavName = await screen.findByTestId('1-horizontal-name');
      const secondFavShareBtn = await screen.findByTestId('1-horizontal-share-btn');

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

  describe('A tela deve exibir os cards com a foto, nome um botão de'
    + ' compartilhar e um de "desfavoritar" quando for uma receita do '
      + 'tipo comida',
  () => {
    it('O card de comida deve conter os atributos corretos de uma comida', async () => {
      setLocalStorage();
      const { history } = renderWithRouter(<App />);
      history.push(favoriteRecipesPAth);
      const imageElement = await screen.findByTestId('0-horizontal-image');
      expect(imageElement).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

      const textElement = await screen.findAllByTestId('0-horizontal-top-text');
      expect(textElement[0]).toHaveTextContent('Italian - Vegetarian');

      const nameElement = screen.getAllByTestId('0-horizontal-name');
      expect(nameElement[0]).toHaveTextContent('Spicy Arrabiata Penne');

      const shareElement = screen.getAllByTestId(HORIZONTAL_SHARE_BTN_0);
      expect(shareElement[0]).toHaveAttribute('src', 'shareIcon.svg');

      const unFavElement = screen.getAllByTestId('0-horizontal-favorite-btn');
      expect(unFavElement[0]).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
  });

  describe('A tela deve exibir os cards com a foto, nome, o tipo de bebida (alcoólica ou '
      + 'não), um botão de compartilhar e um de "desfavoritar" quando for uma receita do '
      + 'tipo bebida',
  () => {
    it('O card de bebida deve conter os atributos corretos de uma bebida', async () => {
      const imageElement = await screen.findByTestId('1-horizontal-image');
      expect(imageElement).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

      const textElement = screen.getByTestId('1-horizontal-top-text');
      expect(textElement).toHaveTextContent('Alcoholic');

      const nameElement = screen.getByTestId('1-horizontal-name');
      expect(nameElement).toHaveTextContent('Aquamarine');

      const shareElement = screen.getByTestId('1-horizontal-share-btn');
      expect(shareElement).toHaveAttribute('src', 'shareIcon.svg');

      const unFavElement = screen.getByTestId('1-horizontal-favorite-btn');
      expect(unFavElement).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
  });
  describe('Desenvolva a solução de maneira que o botão de compartilhar deve copiar a '
    + 'URL da tela de detalhes da receita para o clipboard', () => {
    it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"',
      async () => {
        const shareElement = await screen.findByTestId(HORIZONTAL_SHARE_BTN_0);
        userEvent.click(shareElement);
        const copyText = screen.getAllByText(/Link copied!/i);
        expect(copyText[0]).toBeInTheDocument();
      });
  });
  describe('Desenvolva a solução de maneira que o botão de "desfavoritar" deve remover a'
    + ' receita da lista de receitas favoritas do `localStorage` e da tela', () => {
    it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida da tela',
      () => {

      });
  });
});
