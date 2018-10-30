let STATE = {};
const CACHE = window.CACHE;
const HTTP = window.HTTP;
const RENDER = window.RENDER;

$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthUI();
  watchLogoutBtn();
  watchDemoBtn();
  toggleHamburgerMenu();
}

function updateAuthUI() {
  const authUser = CACHE.getAuthenticatedUser();
  if (authUser) {
    STATE.authUser = authUser;
    $('#authenticated-menu').css('display', 'block');
  } else {
    $('#unauthenticated-menu').css('display', 'block');
  }
}

// Logs user out when Logout button is clicked
function watchLogoutBtn() {
  $('#logout-btn').click(event => {
    CACHE.deleteAuthenticatedUser();
    window.open('/', '_self');
  });
}

// Logs user into demo account
function watchDemoBtn() {
  $('#demo-login').click(event => {
    const userData = {
      username: 'demouser1124',
      password: 'demopassword1124'
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
  })
}

function toggleHamburgerMenu() {
  $('.hamburger-icon').click(event => {
    $('.main-menu-link').toggleClass('toggle-links');
  });
}
