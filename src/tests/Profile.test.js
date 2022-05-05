// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
// import App from '../App';
// import { setLocalStorage } from './mocks/localStorageMocks';

// describe(
//   'Verifica se a tela de Perfil possui um elemento email, um botão '
//     + 'de receitas favoritas, um botão de receitas feitas e um botão de logout',
//   () => {
//     beforeEach(() => {
//       setLocalStorage();
//       const { history } = renderWithRouter(<App />);
//       history.push('/profile');
//     });

//     it('Contém um elemento de email possuindo o atributo data-testid="profile-email"',
//       () => {
//         const emailElement = screen.getByTestId('profile-email');
//         expect(emailElement).toBeInTheDocument();
//       });
//     it('Contém um botão para Done Recipes com o atributo data-testid="profile-done-btn"',
//       () => {
//         const doneBtnElement = screen.getByTestId('profile-done-btn');
//         expect(doneBtnElement).toBeInTheDocument();
//       });
//     it('Contém um botão para Favorite Recipes com o atributo'
//      + 'data-testid="profile-favorite-btn"',
//     () => {
//       const favoriteBrnElement = screen.getByTestId('profile-favorite-btn');
//       expect(favoriteBrnElement).toBeInTheDocument();
//     });
//     it('Contém um botão para o Logout com o atributo'
//      + 'data-testid="profile-logout-btn"',
//     () => {
//       const logoutBtnElement = screen.getByTestId('profile-logout-btn');
//       expect(logoutBtnElement).toBeInTheDocument();
//     });
//   },
// );

// describe('O email a ser exibido deve ser resgatado do local storage.', () => {
//   beforeEach(() => {
//     setLocalStorage();
//   });
//   it('O email armazenado no local storage deve ser exibido no elemento de email', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/profile');
//     const emailElement = screen.getByTestId('profile-email');
//     expect(emailElement).toHaveTextContent('email@test.com');
//   });
// });

// describe('Implemente a função dos botões de Receitas feitas, favoritas'
//   + ' e de logout', () => {
//   beforeEach(() => {
//     setLocalStorage();
//   });
//   it('O botão de "Done Recipes" deve levar o usuário a rota /'
//   + 'done-recipes ao ser clicado', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/profile');

//     const doneBtnElement = screen.getByTestId('profile-done-btn');
//     userEvent.click(doneBtnElement);

//     const { pathname } = history.location;
//     expect(pathname).toBe('/done-recipes');
//   });
//   it('O botão de "Favorite Recipes" deve levar o usuário a rota /'
//   + 'favorite-recipes ao ser clicado', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/profile');

//     const favoriteBtnElement = screen.getByTestId('profile-favorite-btn');
//     userEvent.click(favoriteBtnElement);

//     const { pathname } = history.location;
//     expect(pathname).toBe('/favorite-recipes');
//   });
//   it('Ao clickar no botão de "Logout", o usario deve ser redirecionado para tela de '
//   + 'login e os dados do localStorage devem ser limpos', () => {
//     const { history } = renderWithRouter(<App />);
//     history.push('/profile');

//     const logoutBtnElement = screen.getByTestId('profile-logout-btn');

//     userEvent.click(logoutBtnElement);
//     const { pathname } = history.location;
//     expect(pathname).toBe('/');

//     const email = window.localStorage.getItem('user');
//     const mealsToken = window.localStorage.getItem('mealsToken');
//     const cocktailsToken = window.localStorage.getItem('cocktailsToken');
//     const doneRecipes = window.localStorage.getItem('doneRecipes');
//     const favoriteRecipes = window.localStorage.getItem('favoriteRecipes');
//     const inProgressRecipes = window.localStorage.getItem('inProgressRecipes');

//     expect(email).toBeNull();
//     expect(mealsToken).toBeNull();
//     expect(cocktailsToken).toBeNull();
//     expect(doneRecipes).toBeNull();
//     expect(favoriteRecipes).toBeNull();
//     expect(inProgressRecipes).toBeNull();
//   });
// });
