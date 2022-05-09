import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import setLocalStorage, { oneFavoriteArray,
  favoriteRecipes } from './mocks/localStorageMocks';

const FILTER_BY_ALL = 'filter-by-all-btn';
const FILTER_BY_FOOD_BTN = 'filter-by-food-btn';
const FILTER_BY_DRINK_BTN = 'filter-by-drink-btn';
const HORIZONTAL_SHARE_BTN_0 = '0-horizontal-share-btn';
const HORIZONTAL_NAME_0 = '0-horizontal-name';
const HORIZONTAL_NAME_1 = '1-horizontal-name';
const HORIZONTAL_TOP_TEXT_0 = '0-horizontal-top-text';
const HORIZONTAL_TOP_TEXT_1 = '1-horizontal-top-text';
const HORIZONTAL_FAV_BTN_0 = '0-horizontal-favorite-btn';
const HORIZONTAL_FAV_BTN_1 = '1-horizontal-favorite-btn';
const HORIZONTAL_IMG_0 = '0-horizontal-image';
const HORIZONTAL_IMG_1 = '1-horizontal-image';
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
      const filterByDrink = screen.getByTestId(FILTER_BY_DRINK_BTN);
      const firstFavImage = await screen.findByTestId(HORIZONTAL_IMG_0);
      const firstFavTopText = await screen.findByTestId(HORIZONTAL_TOP_TEXT_0);
      const firstFavName = await screen.findByTestId(HORIZONTAL_NAME_0);
      const firstFavShareBtn = await screen.findByTestId(HORIZONTAL_SHARE_BTN_0);
      const secondFavImage = await screen.findByTestId(HORIZONTAL_IMG_1);
      const secondFavTopText = await screen.findByTestId(HORIZONTAL_TOP_TEXT_1);
      const secondFavName = await screen.findByTestId(HORIZONTAL_NAME_1);
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

      const nameElement = screen.getAllByTestId(HORIZONTAL_NAME_0);
      expect(nameElement[0]).toHaveTextContent('Spicy Arrabiata Penne');

      const shareElement = screen.getAllByTestId(HORIZONTAL_SHARE_BTN_0);
      expect(shareElement[0]).toHaveAttribute('src', 'shareIcon.svg');

      const unFavElement = screen.getAllByTestId(HORIZONTAL_FAV_BTN_0);
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

      const textElement = screen.getByTestId(HORIZONTAL_TOP_TEXT_1);
      expect(textElement).toHaveTextContent('Alcoholic');

      const nameElement = screen.getByTestId(HORIZONTAL_NAME_1);
      expect(nameElement).toHaveTextContent('Aquamarine');

      const shareElement = screen.getByTestId('1-horizontal-share-btn');
      expect(shareElement).toHaveAttribute('src', 'shareIcon.svg');

      const unFavElement = screen.getByTestId(HORIZONTAL_FAV_BTN_1);
      expect(unFavElement).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
  });
  describe('Ao clicar no ícone de compartilhar, a url da página de detalhes da receita '
    + 'deve ser salva no clipboard, e uma mensagem escrito "Link copied!" deve surgir no'
    + ' card da receita', () => {
    beforeEach(() => {
      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation((text) => Promise.resolve(text)),
        },
      });
    });
    it('O texto Link copied! deve aparecer no card da receita copiada',
      async () => {
        const shareElement = await screen.findByTestId(HORIZONTAL_SHARE_BTN_0);
        userEvent.click(shareElement);
        const copyText = screen.getAllByText(/Link copied!/i);
        expect(copyText[0]).toBeInTheDocument();
      });
    it('A URL da tela de detalhes da receita é copiada para o clipboard quando o ícone'
      + ' de compartilhamento for clicado', async () => {
      const shareElement = await screen.findByTestId(HORIZONTAL_SHARE_BTN_0);
      userEvent.click(shareElement);
      expect(window.navigator.clipboard.writeText)
        .toHaveBeenCalledWith('http://localhost:3000/foods/52771');
    });
  });
  describe('Desenvolva a solução de maneira que o botão de "desfavoritar" deve remover a'
    + ' receita da lista de receitas favoritas do `localStorage` e da tela', () => {
    it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida da tela',
      async () => {
        const unfavoriteElement = await screen.findByTestId(HORIZONTAL_FAV_BTN_0);
        const unfavoriteElement2 = await screen.findByTestId(HORIZONTAL_FAV_BTN_1);
        userEvent.click(unfavoriteElement);
        expect(unfavoriteElement).not.toBeInTheDocument();
        expect(unfavoriteElement2).toBeInTheDocument();
      });
    it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida da chave'
      + '  favoriteRecipes do localStorage', async () => {
      const unfavoriteElement = await screen.findByTestId(HORIZONTAL_FAV_BTN_0);
      userEvent.click(unfavoriteElement);
      const favValueOnStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favValueOnStorage).toStrictEqual(oneFavoriteArray);
    });
  });
  describe('Implemente 2 botões que filtram as receitas por comida ou bebida e um ter'
    + 'ceiro que remove todos os filtros', () => {
    it('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas',
      async () => {
        const filterByFood = screen.getByTestId(FILTER_BY_FOOD_BTN);
        userEvent.click(filterByFood);

        const firstFavName = await screen.findByTestId(HORIZONTAL_NAME_0);
        expect(firstFavName).toHaveTextContent(favoriteRecipes[0].name);
      });
    it('Ao clicar no botão "Drink" as receitas devem ser filtradas por bebidas',
      async () => {
        const filterByDrink = screen.getByTestId(FILTER_BY_DRINK_BTN);
        userEvent.click(filterByDrink);

        const firstFavName = await screen.findByTestId(HORIZONTAL_NAME_0);
        expect(firstFavName).toHaveTextContent(favoriteRecipes[1].name);
      });
    it('Ao clicar no botão all, o filtro deve ser removido', async () => {
      const noFilter = screen.getByTestId(FILTER_BY_ALL);
      userEvent.click(noFilter);

      const firstFavName = await screen.findByTestId(HORIZONTAL_NAME_0);
      expect(firstFavName).toHaveTextContent(favoriteRecipes[0].name);

      const secondFavName = await screen.findByTestId(HORIZONTAL_NAME_1);
      expect(secondFavName).toHaveTextContent(favoriteRecipes[1].name);
    });
  });
  describe('Ao clicar no nome ou na foto da receita o usuário deve ser redirecionado '
    + 'para a tela de detalhes da receita', () => {
    it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela '
    + 'receita', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(favoriteRecipesPAth);

      const firstElemntImg = await screen.findByTestId(HORIZONTAL_IMG_0);
      userEvent.click(firstElemntImg);

      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52771');
    });
    it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela '
    + 'receita', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(favoriteRecipesPAth);

      const firstElemnName = await screen.findByTestId(HORIZONTAL_NAME_0);
      userEvent.click(firstElemnName);

      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52771');
    });
  });
});
