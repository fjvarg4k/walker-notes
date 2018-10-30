const CACHE = window.CACHE;
const HTTP = window.HTTP;
const RENDER = window.RENDER;

$(document).ready(onPageLoad);

function onPageLoad() {
  watchSignUpForm();
  watchLoginForm();
  toggleHamburgerMenu();
}

function watchSignUpForm() {
  $('#sign-up-form').submit(event => {
    event.preventDefault();
    const userData = {
      firstName: $('#firstName-signup').val(),
      lastName: $('#lastName-signup').val(),
      username: $('#username-signup').val(),
      password: $('#password-signup').val()
    };

    HTTP.signUpUser({
      userData,
      onSuccess: user => {
        window.open('/auth/login.html', '_self');
      },
      onError: err => {
        $('#error-message').html(`
          <p>Please enter valid info.</p>
        `);
      }
    });
  });
}

function watchLoginForm() {
  $('#login-form').submit(event => {
    event.preventDefault();
    const userData = {
      username: $('#username-login').val(),
      password: $('#password-login').val()
    };

    HTTP.loginUser({
      userData,
      onSuccess: res => {
        const authUser = res.user;
        authUser.jwtToken = res.jwtToken;
        CACHE.saveAuthenticatedUser(authUser);
        window.open('/user/hub.html', '_self');
      },
      onError: err => {
        $('#error-message').html(`
          <p>Your username and/or password were incorrect.</p>
        `);
      }
    });
  });
}

function toggleHamburgerMenu() {
  $('.hamburger-icon').click(event => {
    $('.main-menu-link').toggleClass('toggle-links');
  });
}
