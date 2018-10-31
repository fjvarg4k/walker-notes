const CACHE = window.CACHE;
const HTTP = window.HTTP;
const RENDER = window.RENDER;

$(document).ready(onPageLoad);

function onPageLoad() {
  watchSignUpForm();
  watchLoginForm();
  watchDemoBtn();
  toggleHamburgerMenu();
}

// Waits for signup form to be submitted, saves the provided data
function watchSignUpForm() {
  $('#sign-up-form').submit(event => {
    event.preventDefault();
    const userData = {
      firstName: $('#firstName-signup').val(),
      lastName: $('#lastName-signup').val(),
      username: $('#username-signup').val(),
      password: $('#password-signup').val()
    };

    // Takes provided data, creates a new user
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

// Waits for login form to be submitted, saves the provided data
function watchLoginForm() {
  $('#login-form').submit(event => {
    event.preventDefault();
    const userData = {
      username: $('#username-login').val(),
      password: $('#password-login').val()
    };

    // Verifies provided data, signs user in if data is valid
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

// Logs user into demo account
function watchDemoBtn() {
  $('#demo-login').click(event => {
    const userData = {
      username: 'demouser1124',
      password: 'demopassword1124'
    };

    // Verifies provided data, signs user in if data is valid
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
  })
}

// Toggles hamburger menu on and off
function toggleHamburgerMenu() {
  $('.hamburger-icon').click(event => {
    $('.main-menu-link').toggleClass('toggle-links');
  });
}
