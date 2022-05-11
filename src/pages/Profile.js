import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Styles/Profile.css';
import iconLogout from '../images/iconLogout.svg';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

  function logout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <>
      <Header Title="Profile" />
      <section className="profile-container">
        <h1 data-testid="profile-email" className="profile-email">{userEmail}</h1>
        <button
          type="button"
          className="profile-done-btn"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          className="profile-favorite-btn"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          className="profile-logout-btn"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          <img src={ iconLogout } alt="iconPerfil" className="logoutIcon" />
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
